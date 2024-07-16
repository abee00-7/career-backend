

const express = require('express');
const router = express.Router();



const { fetchColleges, fetchStudents, deleteStudent, deleteCollege,adminLogin, fetchAptitudeQuestions } = require('../controllers/adminController');

// Route: GET /api/admin/colleges
// Description: Fetch all colleges
router.get('/colleges', fetchColleges);

// Route: GET /api/admin/students
// Description: Fetch all students
router.get('/students', fetchStudents);

router.get('/questions', fetchAptitudeQuestions);


// Route: DELETE /api/admin/students/:id
// Description: Delete a student by ID
router.delete('/students/:id', deleteStudent);

// Route: DELETE /api/admin/colleges/:id
// Description: Delete a college by ID
router.delete('/colleges/:id', deleteCollege);

module.exports = router;


// Route: POST /api/admin/login
// Description: Admin login
router.post('/login', adminLogin);

module.exports = router;
