// backend/controllers/adminController.js
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Question = require('../models/Question'); // Assuming you have a Question model


const fetchColleges = async (req, res) => {
  try {
    const colleges = await User.find({ userType: 'college' });
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Fetch all students
const fetchStudents = async (req, res) => {
  try {
    const students = await User.find({ userType: 'student' });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const addAptitudeQuestion = async (req, res) => {
  try {
    const { question, options, answer } = req.body;
    const newQuestion = new Question({ question, options, answer });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ message: 'Failed to add question', error });
  }
};

// Delete a question by ID
const deleteAptitudeQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json({ message: 'Question deleted successfully', deletedQuestion });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ message: 'Failed to delete question', error });
  }
};

const fetchAptitudeQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

// Delete a student by ID
const deleteStudent = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a college by ID
const deleteCollege = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'College deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin by email
    const admin = await User.findOne({ email });

    // Check if admin exists and if password matches
    if (!admin || admin.userType !== 'admin' || !await admin.isValidPassword(password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If credentials are valid, generate a token or session as needed
    // For example, using JWT:
    const token = admin.generateAuthToken();

    // Return token or session details
    res.json({ token });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { fetchColleges, addAptitudeQuestion,adminLogin, fetchColleges,
  fetchStudents,
  fetchAptitudeQuestions,
 
  deleteAptitudeQuestion,
  deleteStudent,
  deleteCollege, };
