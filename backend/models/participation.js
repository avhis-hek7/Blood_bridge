const mongoose = require("mongoose");

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
  certificateIssued: {
    type: Boolean,
    default: false,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Participation", ParticipationSchema);
