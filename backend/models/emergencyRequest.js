// const mongoose = require("mongoose");

// const EmergencyRequestSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   bloodType: { type: String, required: true },
//   unitsRequired: { type: Number, required: true },
//   reason: { type: String },
//   contactNumber: { type: String, required: true },
//   adminNote: String,
//   hospitalName: String,
//   hospitalLocation: String,
//     status: {
//     type: String,
//     enum: ["pending", "available", "not available", "collected"],
//     default: "pending",
//   },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("EmergencyRequest", EmergencyRequestSchema);

const mongoose = require("mongoose");

const EmergencyRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bloodType: { type: String, required: true },
  unitsRequired: { type: Number, required: true },
  reason: { type: String },
  contactNumber: { type: String, required: true },
  adminNote: String,
  hospitalName: String,
  hospitalLocation: String,
  status: {
    type: String,
    enum: ["pending", "available", "not available", "collected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  responses: [
    {
      responderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: { type: String, enum: ["available", "not available"] },
      respondedAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("EmergencyRequest", EmergencyRequestSchema);
