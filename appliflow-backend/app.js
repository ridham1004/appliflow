// app.js
// Load environment variables from .env file
require('dotenv').config();

// Import required modules and configuration
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes and middleware
const authRoutes      = require('./routes/authRoutes');
const jobRoutes       = require('./routes/jobRoutes');
const authMiddleware  = require('./middleware/authMiddleware');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Public routes (no auth required)
app.use('/api/auth', authRoutes);

// Protected routes (must pass authMiddleware)
app.use('/api/jobs', authMiddleware, jobRoutes);

// A simple health-check or landing route
app.get('/', (req, res) => {
  res.send('AppliFlow API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
