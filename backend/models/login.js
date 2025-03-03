const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email"], // Email validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: true, 
  },
});

module.exports = mongoose.model("Login", LoginSchema);
