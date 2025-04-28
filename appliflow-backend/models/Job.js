const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  postingLink: { type: String, required: true },
  title:       { type: String, required: true },
  company:     { type: String, required: true },
  appliedDate: { type: Date,   required: true },
  docsUsed:    { type: String },
  status:      { type: String, enum: ['Applied','Interview','Cancelled','Offer'], default: 'Applied' },
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Job', JobSchema);
