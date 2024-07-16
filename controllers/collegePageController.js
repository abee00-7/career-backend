const User = require('../models/User'); // Assuming User model is defined

const fetchCollegesforcollege = async (req, res) => {
  try {
    const colleges = await User.find({ userType: 'college' }, 'fullname location courses'); // Adjust fields as per your User schema
    res.json(colleges);
  } catch (error) {
    console.error('Error fetching colleges:', error);
    res.status(500).json({ error: 'Failed to fetch colleges' });
  }
};

module.exports = {
  fetchCollegesforcollege,
};
