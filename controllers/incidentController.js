const Incident = require('../models/Incident');

// @desc    Get all incidents
// @route   GET /incidents
// @access  Public
exports.getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ reported_at: -1 });
    res.status(200).json({
      success: true,
      count: incidents.length,
      data: incidents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get single incident
// @route   GET /incidents/:id
// @access  Public
exports.getIncident = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    
    if (!incident) {
      return res.status(404).json({
        success: false,
        error: 'Incident not found'
      });
    }

    res.status(200).json({
      success: true,
      data: incident
    });
  } catch (error) {
    // Check if error is due to invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Incident not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create new incident
// @route   POST /incidents
// @access  Public
exports.createIncident = async (req, res) => {
  try {
    const incident = await Incident.create(req.body);
    
    res.status(201).json({
      success: true,
      data: incident
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete incident
// @route   DELETE /incidents/:id
// @access  Public
exports.deleteIncident = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    
    if (!incident) {
      return res.status(404).json({
        success: false,
        error: 'Incident not found'
      });
    }

    await incident.deleteOne();
    
    res.status(204).send();
  } catch (error) {
    // Check if error is due to invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Incident not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};