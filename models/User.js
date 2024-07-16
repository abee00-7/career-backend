// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  fullname: { type: String },
  location: { type: String },
  phonenumber: { type: String },
  cutoffmark: { type: Number } ,
  courses: { type: [String] }, // Array of courses
  description: { type: String },
  testScore: {
    type: Number,
    default: null, // Default value can be set as per your requirement
  },
  isAdmin: { type: Boolean, default: false },
  
});


module.exports = mongoose.model('User', userSchema);
