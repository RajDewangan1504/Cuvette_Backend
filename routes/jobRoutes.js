const express = require('express');
const { postJob, sendJobAlert, getJobs, getJobById } = require('../controllers/jobController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to post a job (Authenticated)
router.post('/post', verifyToken, postJob);

// Route to send job alerts via email (Authenticated)
router.post('/send-job-alert', verifyToken, sendJobAlert);

// Route to get all job posts (Public)
router.get('/all', getJobs);

// Route to get a specific job post by ID (Public)
router.get('/:jobId', getJobById);

module.exports = router;
