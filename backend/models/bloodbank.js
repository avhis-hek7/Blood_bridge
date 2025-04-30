const mongoose = require("mongoose");

const bloodBankSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    landmark: String,
    city: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    image: String,
    website: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("bloodbank", bloodBankSchema);
