const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullname: String,
  location: String,
  description: String,
  courses: [String],
  cutoffmark: Number
});

module.exports = mongoose.model('Student', StudentSchema);
