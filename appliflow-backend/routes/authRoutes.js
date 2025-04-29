// backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const authMiddleware            = require('../middleware/authMiddleware');
const { getAuthUrl, setCredentials, drive } = require('../config/drive');
const User = require('../models/User');

// Public authentication routes
router.post('/register', register);
router.post('/login',    login);

// Protected: get current user profile
router.get('/me', authMiddleware, getMe);

/**
 * GET /api/auth/google/url
 * Returns the Google OAuth URL (with state) as JSON.
 * Protected so it can read req.user.id for state.
 */
router.get(
  '/google/url',
  authMiddleware,
  (req, res) => {
    const url = getAuthUrl(req.user.id);
    res.json({ url });
  }
);

/**
 * GET /api/auth/oauth2callback
 * Handles Google’s OAuth2 callback.
 * Expects `code` and `state` (user ID) in query.
 */
router.get(
  '/oauth2callback',
  async (req, res) => {
    try {
      const { code, state: userId } = req.query;
      if (!code) throw new Error('Missing code parameter');
      if (!userId) throw new Error('Missing state parameter');

      // Exchange code for tokens
      const tokens = await setCredentials(code);

      // Lookup user and persist tokens
      const user = await User.findById(userId);
      if (!user) throw new Error(`User not found: ${userId}`);
      user.googleAccessToken = tokens.access_token;
      if (tokens.refresh_token) {
        user.googleRefreshToken = tokens.refresh_token;
      }

      // Create root folder if not present
      if (!user.appliFlowFolderId) {
        const folder = await drive.files.create({
          requestBody: {
            name: 'AppliFlow docs',
            mimeType: 'application/vnd.google-apps.folder'
          }
        });
        user.appliFlowFolderId = folder.data.id;
      }

      await user.save();
      res.send('✅ Google Drive connected! You can close this window.');
    } catch (err) {
      console.error('OAuth callback error:', err);
      res.status(500).send(`OAuth failed: ${err.message}`);
    }
  }
);

module.exports = router;
