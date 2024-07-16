// backend/controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup
const signup = async (req, res) => {
  const { username, email, password, userType } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      userType,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare hashed passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h' // Example: Token expires in 1 hour
    });

    // Return token and user details
    res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        userType: user.userType
        // Add other user details as needed
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  login
};

// Update Profile
const updateProfile = async (req, res) => {
  const { fullname, location, phonenumber } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { fullname, location, phonenumber },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
const getCollegeProfile = async (req, res) => {
  try {
    const college = await User.findById(req.user._id).select('-password');
    if (college.userType !== 'college') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json(college);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update College Profile
const updateCollegeProfile = async (req, res) => {
  const { fullname, email, location, description, courses, cutoffmark } = req.body;

  try {
    const college = await User.findById(req.user._id);

    if (college.userType !== 'college') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    college.fullname = fullname || college.fullname;
    college.email = email || college.email;
    college.location = location || college.location;
    college.description = description || college.description;
    college.courses = courses || college.courses;
    college.cutoffmark = cutoffmark || college.cutoffmark;


    const updatedCollege = await college.save();
    res.json(updatedCollege);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Export all methods
module.exports = {
  signup,
  login,
  getProfile,
  updateProfile,
  getCollegeProfile,
  updateCollegeProfile
  
};