const express = require('express');
const { getJobs, createJob, updateJob, deleteJob } = require('../controllers/jobController');
const router = express.Router();

router.get('/',    getJobs);
router.post('/',   createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;
