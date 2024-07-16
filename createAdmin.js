// createAdmin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('./configs'); // Import configuration file
const connectDB = require('./config/db'); // Import database connection function
const User = require('./models/User'); // Import User model

// Establish MongoDB connection
connectDB();

// Define admin user creation function
const createAdmin = async () => {
  try {
    // Check if admin user exists
    const admin = await User.findOne({ userType: 'admin' });

    if (admin) {
      console.log('Admin user already exists.');
      return;
    }

    // Create a new admin user
    const hashedPassword = await bcrypt.hash(config.adminPassword, 10);

    const newAdmin = new User({
      username: 'admin',
      email: config.adminEmail,
      password: hashedPassword,
      userType: 'admin',
      // Add other fields as needed (fullname, location, etc.)
    });

    await newAdmin.save();
    console.log('Admin user created successfully.');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.disconnect(); // Disconnect from MongoDB after operation
  }
};

// Run the function to create admin user
createAdmin();
