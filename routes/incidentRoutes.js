const express = require('express');
const router = express.Router();
const { 
  getIncidents, 
  getIncident, 
  createIncident, 
  deleteIncident 
} = require('../controllers/incidentController');

// Get all incidents and create new incident
router
  .route('/')
  .get(getIncidents)
  .post(createIncident);

// Get and delete incident by id
router
  .route('/:id')
  .get(getIncident)
  .delete(deleteIncident);

module.exports = router;