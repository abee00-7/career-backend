const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  getProfile,
  updateProfile,
  getCollegeProfile,
  updateCollegeProfile,
 
  
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const{ fetchTestQuestions,
  submitTestAnswers}=require('../controllers/testController')
  const{viewCollegesByMarks}=require('../controllers/collegeController')
// Authentication routes
router.post('/signup', signup);
router.post('/login', login);

// Profile routes
router.get('/profile', protect, getProfile);
router.put('/profile/update', protect, updateProfile);

// College profile routes
router.get('/college/profile', protect, getCollegeProfile);
router.put('/college/profile/update', protect, updateCollegeProfile);



// Colleges routes
router.get('/colleges/view/:marks', protect, viewCollegesByMarks);

module.exports = router;
