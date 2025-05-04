const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  severity: {
    type: String,
    required: [true, 'Severity is required'],
    enum: {
      values: ['Low', 'Medium', 'High'],
      message: '{VALUE} is not a valid severity level'
    }
  },
  reported_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;