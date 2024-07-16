const express = require('express');
const router = express.Router();
const { viewCollegesByMarks, getAllColleges, fetchCollegesByMarks } = require('../controllers/collegeController');
const { protect } = require('../middleware/authMiddleware');
const { fetchCollegesByCutoff } = require('../controllers/collegeController');

// Route to fetch colleges by cutoff mark
router.get('/colleges', fetchCollegesByCutoff);
// Route to view colleges based on marks
router.get('/colleges/view/:marks', protect, viewCollegesByMarks);

// Route to fetch colleges by marks (POST request)
router.post('/collegesByMarks', fetchCollegesByMarks);

// Route to fetch all colleges (GET request)
router.get('/', getAllColleges);

const { fetchCollegesforcollege } = require('../controllers/collegePageController');

// Route to fetch colleges
router.get('/colleges',protect, fetchCollegesforcollege);

module.exports = router;

module.exports = router;
