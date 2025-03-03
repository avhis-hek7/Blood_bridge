const express = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "Susanisagood$";

// Create a User using: Post "/api/auth". Doesn't require Auth
router.post(
  "/", 
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("phone")
      .notEmpty()
      .withMessage("Phone number is required")
      .isMobilePhone()
      .withMessage("Invalid phone number"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("dob")
      .notEmpty()
      .withMessage("Date of Birth is required")
      .isDate()
      .withMessage("Invalid Date format"),
    body("gender")
      .notEmpty()
      .withMessage("Gender is required")
      .isIn(["Male", "Female", "Other"])
      .withMessage("Invalid gender selection"),
    body("bloodGroup")
      .notEmpty()
      .withMessage("Blood Group is required")
      .isIn(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"])
      .withMessage("Invalid blood group"),
    body("address").notEmpty().withMessage("Address is required"),
    body("terms")
      .equals("true")
      .withMessage("You must accept the terms and conditions"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [{ phone: req.body.phone }, { email: req.body.email }],
      });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create new user and save
      const newUser = new User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword,
        dob: req.body.dob,
        gender: req.body.gender,
        bloodGroup: req.body.bloodGroup,
        address: req.body.address,
        terms: req.body.terms,
      });

      await newUser.save();

      // Send response
      res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
);

// Create a User using: Post "/api/auth/login". Doesn't require login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if the user exists in MongoDB
      const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });  // 'i' makes it case-insensitive
      console.log("User found:", user);  

      if (!user) {
        return res.status(401).json({ error: "Invalid email" });
      }

      // Ensure the user has a stored password
      if (!user.password) {
        return res.status(500).json({ error: "User password is missing" });
      }

      // Compare entered password with hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }

      // Create JWT payload
      const payload = { user: { id: user._id.toString() } };

      // Generate token without expiration
      const authToken = jwt.sign(payload, JWT_SECRET);

      res.json({ authToken, message: "Login successful" });
    } catch (error) {
      console.error("Error in login route:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
//Route:3 Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});



module.exports = router;
