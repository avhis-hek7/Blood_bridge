const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        unique: true,
        match: [/^9\d{9}$/, "Please enter a valid 10-digit phone number"], // Validates phone number
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email"], // Validates email
      },
      password: {
        type: String,
        required: true,
        trim: true, // Removes spaces before and after the password
        minlength: 6, // Ensures a minimum length for security
        select: true, // Prevents password from being returned in queries
      },
      dob: {
        type: Date,
        required: true,
      },
      gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
      },
      bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        required: true,
      },
      address: {
        type: String,
        required: true,
        trim: true,
      },
      terms: {
        type: Boolean,
        required: true,
        default: false
      }
  }
);

module.exports=mongoose.model('user',UserSchema)