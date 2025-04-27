const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  organizer: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true }); // Adds createdAt and updatedAt

// ✅ Prevent OverwriteModelError in dev
module.exports = mongoose.models.Event || mongoose.model('Event', eventSchema);
