const express = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const Admin = require("../models/admin");
const router = express.Router();
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const fetchadmin = require("../middleware/fetchadmin");
const verifyEmailDomain = require("../utils/emailVerifier");
const JWT_SECRET = "Susanisagood$";
const { generateOTP, sendOTP } = require('../utils/otpSender');

// Request OTP
router.post('/request-otp', async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        // Check if email already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // In a real app, you might want to store this in a temporary collection
        // For simplicity, we'll just return it to the client
        // In production, you should hash the OTP before storing
        
        const sent = await sendOTP(email, otp);
        if (!sent) {
            return res.status(500).json({ error: "Failed to send OTP" });
        }

        res.json({ 
            success: true, 
            message: "OTP sent successfully",
            otp, // Remove this in production - only for testing
            otpExpires // Remove this in production - only for testing
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
        return res.status(400).json({ error: "Email and OTP are required" });
    }

    try {
        // In a real app, you would verify against stored OTP
        // For this example, we'll assume the client sends the correct OTP
        
        // Check if OTP is valid (in production, verify against stored/hashed OTP)
        // const user = await User.findOne({ email, otp, otpExpires: { $gt: new Date() } });
        // if (!user) {
        //     return res.status(400).json({ error: "Invalid or expired OTP" });
        // }
        
        // For now, just return success
        res.json({ 
            success: true, 
            message: "OTP verified successfully",
            verified: true
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Verify email domain
router.post("/verify-email", async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const result = await verifyEmailDomain(email);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// In your auth route file create-superadmin
router.post("/create-superadmin", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let admin = await Admin.findOne({ $or: [{ email }, { username }] });
    if (admin) {
      return res.status(400).json({ error: "Superadmin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    admin = new Admin({
      username,
      email,
      password: hashedPassword,
      role: "superadmin",
    });

    await admin.save();
    res.status(201).json({ message: "Superadmin created successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});
// superAdmin Login
router.post(
  "/superadmin-login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").exists().withMessage("Password cannot be empty"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // Find admin by username
      const admin = await Admin.findOne({ username });

      if (!admin || admin.role !== "superadmin") {
        return res.status(403).json({ error: "Access denied: Not a superadmin" });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Create JWT payload
      const payload = {
        admin: {
          id: admin.id,
          role: admin.role
        }
      };

      const authToken = jwt.sign(payload, JWT_SECRET, {
        expiresIn: "30d"
      });

      res.json({
        success: true,
        authToken,
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role
        }
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get("/get-superadmin", fetchadmin, async (req, res) => {
  try {
    if (req.admin.role !== "superadmin") {
      return res.status(403).json({ error: "Access denied. Not a superadmin." });
    }

    // Optionally fetch full admin data from DB
    const admin = await Admin.findById(req.admin.id).select("-password");

    res.json({ superadmin: admin });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a User using: Post "/api/auth". Doesn't require Auth
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("phone")
      .notEmpty().withMessage("Phone number is required")
      .isMobilePhone().withMessage("Invalid phone number"),
    body("email")
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Invalid email address"),
    body("password")
      .notEmpty().withMessage("Password is required")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("dob")
      .notEmpty().withMessage("Date of Birth is required")
      .isDate().withMessage("Invalid Date format"),
    body("gender")
      .notEmpty().withMessage("Gender is required")
      .isIn(["Male", "Female", "Other"]).withMessage("Invalid gender selection"),
    body("bloodGroup")
      .notEmpty().withMessage("Blood Group is required")
      .isIn(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]).withMessage("Invalid blood group"),
    body("address").notEmpty().withMessage("Address is required"),
    body("terms")
      .equals("true").withMessage("You must accept the terms and conditions"),
  ],
  async (req, res) => {
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

      // Hash password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Generate OTP and expiration
      const otp = generateOTP();
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Create new user with OTP fields
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
        isVerified: false,
        otp,
        otpExpires
      });

      await newUser.save();

      // Send OTP via email
      await sendOTP(newUser.email, otp);

      res.status(201).json({
        message: "User created successfully. Please verify your email with the OTP sent.",
        userId: newUser._id
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error: " + err.message });
    }
  }
);


//Finalize verification of OTP 
router.post('/finalize-verification', async (req, res) => {
  const { userId, otp } = req.body;
  
  if (!userId || !otp) {
      return res.status(400).json({ error: "User ID and OTP are required" });
  }

  try {
      const user = await User.findOne({ 
          _id: userId,
          otp,
          otpExpires: { $gt: new Date() } 
      });
      
      if (!user) {
          return res.status(400).json({ error: "Invalid or expired OTP" });
      }

      // Mark user as verified and clear OTP fields
      user.isVerified = true;
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();

      res.json({ 
          success: true, 
          message: "Email verified successfully",
          user: {
              id: user._id,
              name: user.name,
              email: user.email,
              isVerified: user.isVerified
          }
      });

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
});
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
      res.json({
        authToken,
        userId: user._id, // ✅ Send the _id to frontend
        message: "Login successful"
      });
      
    } catch (error) {
      console.error("Error in login route:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Create Admin Route - Only superadmin can create new admins
// router.post(
//   "/create-admin",
//   fetchadmin,
//   [
//     body("username").notEmpty().withMessage("Username is required"),
//     body("email").isEmail().withMessage("Please enter a valid email"),
//     body("password")
//       .isLength({ min: 6 })
//       .withMessage("Password must be at least 6 characters long"),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       // Check if the requesting admin is a superadmin
//       const requestingAdmin = await Admin.findById(req.admin.id);
//       if (!requestingAdmin || requestingAdmin.role !== "admin") {
//         return res.status(403).json({ error: "Only admin can create new admins" });
//       }

//       const { username, email, password } = req.body;

//       // Check if admin with same username or email exists
//       const existingAdmin = await Admin.findOne({
//         $or: [{ username }, { email }],
//       });

//       if (existingAdmin) {
//         return res.status(400).json({
//           error: "Admin with this username or email already exists",
//         });
//       }

//       // Hash the password
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);

//       // Create new admin
//       const admin = new Admin({
//         username,
//         email,
//         password: hashedPassword,
//         role: "admin", // Default role is admin
//       });

//       await admin.save();

//       res.status(201).json({
//         success: true,
//         message: "Admin created successfully",
//         admin: {
//           id: admin.id,
//           username: admin.username,
//           email: admin.email,
//           role: admin.role,
//         },
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// );
router.post(
  "/create-admin",
  fetchadmin, // Middleware that fetches admin from JWT
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if the requesting user is a superadmin
      const requestingAdmin = await Admin.findById(req.admin.id);
      if (!requestingAdmin || requestingAdmin.role !== "superadmin") {
        return res.status(403).json({ 
          error: "Only superadmin can create new admins" 
        });
      }

      const { username, email, password } = req.body;

      // Check if admin with same username or email exists
      const existingAdmin = await Admin.findOne({
        $or: [{ username }, { email }],
      });

      if (existingAdmin) {
        return res.status(400).json({
          error: "Admin with this username or email already exists",
        });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new admin
      const admin = new Admin({
        username,
        email,
        password: hashedPassword,
        role: "admin", // Default role is admin (not superadmin)
      });

      await admin.save();

      res.status(201).json({
        success: true,
        message: "Admin created successfully",
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
); 
// Admin Login Route
router.post(
  "/admin-login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").exists().withMessage("Password cannot be empty"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // Find admin by username
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Compare password
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Create JWT payload
      const payload = {
        admin: {
          id: admin.id,
          role: admin.role
        }
      };

      // Generate token
      const authToken = jwt.sign(payload, JWT_SECRET, {
        expiresIn: "30d"
      });

      res.json({
        success: true,
        authToken,
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role
        }
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Get Admin Profile - Protected Route
router.get(
  "/admins",
  fetchadmin, // Your authentication middleware
  async (req, res) => {
    try {
      // Check if requester is superadmin
      const requestingAdmin = await Admin.findById(req.admin.id);
      if (!requestingAdmin || requestingAdmin.role !== "superadmin") {
        return res.status(403).json({ 
          error: "Only superadmin can view all admins" 
        });
      }

      // Fetch only regular admins (excluding superadmins and password field)
      const admins = await Admin.find(
        { role: "admin" }, // Only get users with role "admin"
        { password: 0 }   // Exclude password field
      );

      res.status(200).json({
        success: true,
        count: admins.length,
        admins
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Delete Admin Route
router.delete(
  "/delete-admin/:id",
  fetchadmin, // Middleware that fetches admin from JWT
  async (req, res) => {
    try {
      // Check if the requesting user is a superadmin
      const requestingAdmin = await Admin.findById(req.admin.id);
      if (!requestingAdmin || requestingAdmin.role !== "superadmin") {
        return res.status(403).json({ 
          error: "Only superadmin can delete admins" 
        });
      }

      // Check if admin ID is provided
      const adminId = req.params.id;
      if (!adminId) {
        return res.status(400).json({ 
          error: "Admin ID is required" 
        });
      }

      // Prevent superadmin from deleting themselves
      if (adminId === req.admin.id) {
        return res.status(403).json({ 
          error: "Superadmin cannot delete themselves" 
        });
      }

      // Find and delete the admin (only regular admins can be deleted)
      const deletedAdmin = await Admin.findOneAndDelete({
        _id: adminId,
        role: "admin" // Only allow deletion of regular admins, not other superadmins
      });

      if (!deletedAdmin) {
        return res.status(404).json({ 
          error: "Admin not found or cannot be deleted" 
        });
      }

      res.status(200).json({
        success: true,
        message: "Admin deleted successfully",
        deletedAdmin: {
          id: deletedAdmin.id,
          username: deletedAdmin.username,
          email: deletedAdmin.email
        }
      });

    } catch (error) {
      console.error(error);
      // Handle CastError for invalid ObjectId format
      if (error.name === 'CastError') {
        return res.status(400).json({ error: "Invalid admin ID format" });
      }
      res.status(500).json({ error: "Internal Server Error" });
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

// Get all users - Requires auth
router.get("/users", fetchadmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get single user - Requires auth
router.get("/user/:id", fetchadmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update user - Requires auth
router.put("/user/:id", fetchadmin, async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone, email, address },
      { new: true }
    ).select("-password");
    
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete user - Requires auth
router.delete("/user/:id", fetchadmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get the count of all users - Requires auth
router.get("/users/count", fetchadmin, async (req, res) => {
  try {
    const userCount = await User.countDocuments(); // Counts the number of users in the collection
    res.json({ count: userCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/bloodgroup', async (req, res) => {
  try {
    const users = await User.find({}, 'bloodGroup'); // Only fetch bloodGroup field
    const distribution = {};

    users.forEach(user => {
      const group = user.bloodGroup || 'Unknown';
      distribution[group] = (distribution[group] || 0) + 1;
    });

    // Format as array for charts
    const result = Object.entries(distribution).map(([bloodGroup, count]) => ({
      bloodGroup,
      count,
    }));

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
