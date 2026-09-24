const express = require('express');
const router = express.Router();
const { createLead, getLeads, updateLeadStatus } = require('../controllers/leadController');

// Routes for /api/leads
router.route('/')
  .post(createLead)
  .get(getLeads);

// Routes for /api/leads/:id/status
router.route('/:id/status')
  .patch(updateLeadStatus);

module.exports = router;
