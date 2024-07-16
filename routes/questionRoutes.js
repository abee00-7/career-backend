const express = require('express');
const router = express.Router();
const questionController = require('../controllers/adminController');

// POST /api/questions
// Add a new question with multiple options
router.post('/questions', questionController.addAptitudeQuestion);

// DELETE /api/questions/:id
// Delete a question by ID
router.delete('/questions/:id', questionController. deleteAptitudeQuestion,);

module.exports = router;
