const express = require('express');
const cors = require('cors');
const connectToMongo = require('./database');
const userRoutes = require('./routes/auth'); // Ensure your Auth.js file is in the routes folder
const bodyParser = require('body-parser');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());  // To parse incoming JSON data
app.use(bodyParser.urlencoded({ extended: true }));  // For form data submission

// Connect to MongoDB
connectToMongo();

// Routes
app.use('/api/auth', userRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to the Blood Donation API");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
