const mongoose = require('mongoose');

const ParticipationSchema = new mongoose.Schema({
  user: {
    name: String,
    email: String,
  },
  event: {
    title: String,
    description: String,
    date: Date,
    location: String,
    organizer: String,
  },
  participatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Participation', ParticipationSchema);
