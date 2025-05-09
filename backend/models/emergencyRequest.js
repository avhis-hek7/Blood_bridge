const mongoose = require('mongoose');

const EmergencyRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bloodType: { type: String, required: true },
  unitsRequired: { type: Number, required: true },
  reason: { type: String },
  contactNumber: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EmergencyRequest', EmergencyRequestSchema);
