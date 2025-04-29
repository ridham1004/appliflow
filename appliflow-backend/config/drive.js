// backend/config/drive.js
require('dotenv').config();
const { google } = require('googleapis');

// Initialize OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const SCOPES = ['https://www.googleapis.com/auth/drive'];

/**
 * Generate the Google OAuth consent URL, including a state parameter.
 * @param {string} state – user ID to round-trip through the OAuth flow
 */
function getAuthUrl(state) {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
    state,
  });
}

/**
 * Exchange the OAuth code for tokens and set them on the client.
 * @param {string} code – the code from Google’s callback
 */
async function setCredentials(code) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
}

const drive = google.drive({ version: 'v3', auth: oauth2Client });

module.exports = {
  getAuthUrl,
  setCredentials,
  drive,
};
