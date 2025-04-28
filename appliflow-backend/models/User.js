// backend/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name:               { type: String, required: true },
  email:              { type: String, required: true, unique: true, lowercase: true },
  password:           { type: String, required: true },
  googleId:           { type: String },
  appliFlowFolderId:  { type: String },     // Google Drive folder ID
  createdAt:          { type: Date,   default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
