// routes/participation.js
const express = require('express');
const router = express.Router();
const Participation = require('../models/participation');
const fetchParticipations = require('../middleware/fetchparticipation');

// POST participation
router.post('/', async (req, res) => {
  try {
    const { user, event } = req.body;
    if (!user || !event) {
      return res.status(400).json({ error: 'User and event info required.' });
    }

    const participation = new Participation({
      user: { name: user.name, email: user.email },
      event: {
        title: event.title,
        description: event.description,
        date: event.date,
        location: event.location,
        organizer: event.organizer,
      },
    });

    await participation.save();
    res.status(201).json({ success: true, message: 'Participation saved.' });
  } catch (err) {
    console.error('Error saving participation:', err.message);
    res.status(500).json({ error: 'Server error while saving participation.' });
  }
});

// GET participation list
router.get('/', fetchParticipations, (req, res) => {
  res.status(200).json({ success: true, data: req.participations });
});

module.exports = router;
