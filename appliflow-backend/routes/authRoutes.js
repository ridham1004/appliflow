// backend/routes/authRoutes.js

const express = require('express');
const router  = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const authMiddleware             = require('../middleware/authMiddleware');
const { getAuthUrl, setCredentials } = require('../config/drive');

// Public: register and login
router.post('/register', register);
router.post('/login',    login);

// Google Drive OAuth flow
router.get('/google',       (req, res) => res.redirect(getAuthUrl()));
router.get('/oauth2callback', async (req, res) => {
  try {
    await setCredentials(req.query.code);
    // TODO: associate tokens with the logged-in user in DB
    res.send('Google Drive connected! You can close this window.');
  } catch (err) {
    console.error('OAuth callback error:', err);
    res.status(500).send('OAuth failed');
  }
});

// Protected: get current user
router.get('/me', authMiddleware, getMe);

module.exports = router;
