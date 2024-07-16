const College = require('../models/College');
const User = require('../models/User');

const getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find({
      fullname: { $ne: null },
      location: { $ne: null },
      description: { $ne: null },
      courses: { $ne: null },
      cutoffMark: { $ne: null }
    });

    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch colleges', error });
  }
};

const viewCollegesByMarks = async (req, res) => {
  const { marks } = req.params;

  try {
    const colleges = await College.find({ cutoffMark: { $lte: marks } });
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const fetchCollegesByMarks = async (req, res) => {
  const { marks } = req.body;
  try {
    const colleges = await College.find({ cutoffMark: { $lte: marks } });
    res.status(200).json(colleges);
  } catch (error) {
    console.error('Error fetching colleges by marks:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const fetchCollegesByCutoff = async (req, res) => {
  try {
    const colleges = await User.find({
      userType: 'college',
      cutoffMark: { $ne: null }
    });

    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch colleges by cutoff mark', error });
  }
};

module.exports = { getAllColleges, viewCollegesByMarks, fetchCollegesByMarks, fetchCollegesByCutoff };
