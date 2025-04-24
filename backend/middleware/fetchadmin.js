const jwt = require("jsonwebtoken");
const JWT_SECRET = "Susanisagood$"; // Replace with your secret key

// Middleware to fetch admin from the JWT token
const fetchadmin = (req, res, next) => {
  const token = req.header("auth-token"); // Get the token from the header

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const data = jwt.verify(token, JWT_SECRET); 

    // Attach the decoded user (admin) information to the request object
    req.admin = data;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(400).json({ error: "Invalid token" });
  }
};
module.exports = fetchadmin;
 