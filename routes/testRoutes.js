const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');
const { protect } = require('../middleware/authMiddleware');
// POST endpoint to submit test score
router.post('/submit',protect ,testController.submitTestAnswers);

module.exports = router;
