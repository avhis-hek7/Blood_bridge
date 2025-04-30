const express = require("express");
const router = express.Router();
const BloodBank = require("../models/bloodbank");
const fetchBloodBank = require("../middleware/fetchbloodbank");

// Get all blood banks
router.get("/", async (req, res) => {
  try {
    const banks = await BloodBank.find();
    res.json(banks);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add a blood bank (Admin only)
router.post("/", async (req, res) => {
  try {
    const newBank = new BloodBank(req.body);
    await newBank.save();
    res.status(201).json(newBank);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a blood bank using middleware
router.delete("/:id", fetchBloodBank, async (req, res) => {
  try {
    await req.bloodBank.deleteOne();
    res.json({ message: "Blood bank deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
});

// POST /api/bloodbank/count - Count blood banks in a given city from request body
router.post("/count", async (req, res) => {
    try {
      const { city } = req.body;
      if (!city) {
        return res.status(400).json({ error: "City name is required" });
      }
  
      const count = await BloodBank.countDocuments({ city });
  
      res.json({ city, count });
    } catch (err) {
      res.status(500).json({ error: "Failed to count blood banks" });
    }
  });
  
module.exports = router;
