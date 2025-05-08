const mongoose = require('mongoose');

const BloodInventorySchema = new mongoose.Schema({
  bloodType: { type: String, required: true },
  quantity: { type: Number, required: true },
  hospitalName: { type: String, required: true },
  hospitalLocation: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BloodInventory', BloodInventorySchema);
