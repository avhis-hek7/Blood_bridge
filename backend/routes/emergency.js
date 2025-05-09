const express = require('express');
const router = express.Router();
const EmergencyRequest = require('../models/emergencyRequest');
const fetchUser = require('../middleware/fetchuser');
const fetchAdmin = require('../middleware/fetchadmin');
const Inventory = require('../models/bloodinventory');

// User: Submit emergency request
router.post('/', fetchUser, async (req, res) => {
  try {
    const { bloodType, unitsRequired, reason, contactNumber } = req.body;
    if (!bloodType || !unitsRequired || !contactNumber) {
      return res.status(400).json({ msg: 'Required fields missing' });
    }

    const request = new EmergencyRequest({
      userId: req.user.id,
      bloodType,
      unitsRequired,
      reason,
      contactNumber
    });

    await request.save();
    res.json({ msg: 'Request submitted successfully', request });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Admin: Get all emergency requests
router.get('/', fetchAdmin, async (req, res) => {
  try {
    const requests = await EmergencyRequest.find(); // Returns raw userId as ObjectId
    res.json(requests);
  } catch (err) {
    console.error("Error fetching emergency requests:", err);
    res.status(500).send('Server Error');
  }
});

// User: Check blood availability

router.post('/check-availability', fetchUser, async (req, res) => {
  try {
    const { bloodType, unitsRequired } = req.body;

    if (!bloodType || !unitsRequired) {
      return res.status(400).json({ msg: 'Blood type and required units are mandatory' });
    }

    const availableHospitals = await Inventory.find({
      bloodType,
      quantity: { $gte: unitsRequired }
    }).select('hospitalName hospitalLocation quantity');

    if (availableHospitals.length === 0) {
      return res.status(404).json({ msg: 'Blood not available in required quantity at any hospital' });
    }

    res.json({
      msg: 'Blood available',
      hospitals: availableHospitals
    });

  } catch (err) {
    console.error('Error checking blood availability:', err);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
