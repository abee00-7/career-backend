// controllers/testController.js

const User = require('../models/User');
const Question = require('../models/Question'); // Assuming you have a Question model

exports.submitTestAnswers = async (req, res) => {
  const { id } = req.user; // Decoded user ID from the token
  const testAnswers = req.body; // Ensure this is an array of answers

  console.log('Received request to submit test answers');
  console.log('testAnswers:', testAnswers); // For debugging

  if (!Array.isArray(testAnswers) || testAnswers.length === 0) {
    return res.status(400).json({ message: 'Test answers are required' });
  }

  try {
    let score = 0;

    // Fetch all questions from the database
    const questions = await Question.find({
      _id: { $in: testAnswers.map(answer => answer.questionId) }
    });

    // Calculate the score
    testAnswers.forEach(answer => {
      const question = questions.find(q => q._id.toString() === answer.questionId);
      if (question && question.answer === answer.answer) {
        score += 10; // Or any scoring logic you have
      }
    });

    // Update the user's test score in the database
    await User.findByIdAndUpdate(id, { testScore: score });

    res.json({ score });
  } catch (error) {
    console.error('Error submitting test answers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
