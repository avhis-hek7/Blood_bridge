// models/Organization.js
const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['hospital', 'bloodbank'], required: true },
  location: { type: String, required: true },
  contact: { type: String, required: true }
});

module.exports = mongoose.model('Organization', OrganizationSchema);
