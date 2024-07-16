const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const questionRouter = require('./routes/questionRoutes');
const app = express();
const testRoutes = require('./routes/testRoutes');
// Middleware
app.use(express.json());
app.use(cors());

// Routesconst adminRoutes = require('./routes/adminRoutes');

const authRoutes = require('./routes/authRoutes');

const collegeRoutes = require('./routes/collegeRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use('/api', testRoutes);
// Use routes
app.use('/api', authRoutes);
app.use('/api', questionRouter); 
app.use('/api/college', collegeRoutes);
app.use('/api', adminRoutes);
app.use('/api/auth', authRoutes);
 // Use admin routes with '/api/admin' prefix

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
