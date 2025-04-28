// controllers/jobController.js

const Job   = require('../models/Job');
const User  = require('../models/User');
const { drive } = require('../config/drive');

/**
 * @route   GET /api/jobs
 * @desc    Get all jobs for the authenticated user
 * @access  Private
 */
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id });
    res.json(jobs);
  } catch (err) {
    console.error('getJobs error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * @route   POST /api/jobs
 * @desc    Create a new job (and optional Drive subfolder)
 * @access  Private
 */
exports.createJob = async (req, res) => {
  try {
    // 1) Create the job record
    const job = new Job({
      ...req.body,
      user: req.user.id
    });
    await job.save();

    // 2) Try to create a Drive subfolder under the user's root folder
    try {
      const userRecord = await User.findById(req.user.id);
      if (userRecord && userRecord.appliFlowFolderId) {
        const sub = await drive.files.create({
          requestBody: {
            name: `${job.title} – ${job.company}`,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [ userRecord.appliFlowFolderId ]
          }
        });
        // 3) Save the subfolder URL back to the job
        job.docsUsed = `https://drive.google.com/drive/folders/${sub.data.id}`;
        await job.save();
      }
    } catch (driveErr) {
      console.error('Drive integration error (non-fatal):', driveErr);
      // we continue—job was already created
    }

    // 4) Return the (possibly updated) job
    res.status(201).json(job);

  } catch (err) {
    console.error('createJob error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * @route   PUT /api/jobs/:id
 * @desc    Update an existing job
 * @access  Private
 */
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!job) return res.status(404).json({ msg: 'Job not found' });
    res.json(job);
  } catch (err) {
    console.error('updateJob error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * @route   DELETE /api/jobs/:id
 * @desc    Delete a job
 * @access  Private
 */
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    if (!job) return res.status(404).json({ msg: 'Job not found' });
    res.json({ msg: 'Job removed' });
  } catch (err) {
    console.error('deleteJob error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
