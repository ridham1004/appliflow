const Job = require('../models/Job');

exports.getJobs = async (req, res) => {
  const jobs = await Job.find({ user: req.user.id });
  res.json(jobs);
};

exports.createJob = async (req, res) => {
  const job = new Job({ ...req.body, user: req.user.id });
  await job.save();
  res.status(201).json(job);
};

exports.updateJob = async (req, res) => {
  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  if (!job) return res.status(404).json({ msg: 'Job not found' });
  res.json(job);
};

exports.deleteJob = async (req, res) => {
  const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!job) return res.status(404).json({ msg: 'Job not found' });
  res.json({ msg: 'Job removed' });
};
