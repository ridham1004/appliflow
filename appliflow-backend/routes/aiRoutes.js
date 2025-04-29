// backend/routes/aiRoutes.js
const express = require('express');
const router  = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const aiController   = require('../controllers/aiController');

// Protect all AI routes
router.use(authMiddleware);

// ATS optimization score
// POST /api/ai/ats
router.post('/ats', aiController.atsScore);

// Generate impact statements
// POST /api/ai/impact
router.post('/impact', aiController.generateImpact);

// Generate a cover letter
// POST /api/ai/coverletter
router.post('/coverletter', aiController.generateCoverLetter);

module.exports = router;
