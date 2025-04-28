// backend/controllers/authController.js

require('dotenv').config();
const User   = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const { drive } = require('../config/drive');

/**
 * Register a new user, create their root Drive folder, and return a JWT.
 */
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // 1) Prevent duplicate emails
    if (await User.findOne({ email })) {
      return res.status(400).json({ msg: 'Email already in use' });
    }

    // 2) Hash password
    const salt   = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // 3) Create user record
    const user = new User({ name, email, password: hashed });
    await user.save();

    // 4) Create "AppliFlow docs" folder in Drive
    const folder = await drive.files.create({
      requestBody: {
        name: 'AppliFlow docs',
        mimeType: 'application/vnd.google-apps.folder'
      }
    });

    // 5) Save folder ID on user
    user.appliFlowFolderId = folder.data.id;
    await user.save();

    // 6) Issue JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token });
  } catch (err) {
    console.error('AuthController.register error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * Log in an existing user and return a JWT.
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    console.error('AuthController.login error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * Return the current user's profile (requires authMiddleware).
 */
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error('AuthController.getMe error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
