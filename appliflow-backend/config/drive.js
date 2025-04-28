// backend/config/drive.js

const { google } = require('googleapis');

// OAuth2 client setup
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Scopes for Drive access
const SCOPES = ['https://www.googleapis.com/auth/drive'];

/**
 * Get a URL to redirect the user for Google OAuth consent.
 */
function getAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  });
}

/**
 * Exchange the OAuth2 code for tokens and configure the client.
 * @param {string} code 
 */
async function setCredentials(code) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  // TODO: persist tokens for this user in DB so you can refresh them later
}

// Drive API client
const drive = google.drive({ version: 'v3', auth: oauth2Client });

module.exports = {
  drive,
  getAuthUrl,
  setCredentials,
};
