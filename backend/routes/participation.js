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

console.log('📦 Participation routes file loaded');



router.post('/check-participants', fetchParticipations, async (req, res) => {
  console.log('📬 POST /check route hit');

  try {
    const { email } = req.body;

    if (!email) {
      console.log('⚠️ Email missing in request body');
      return res.status(400).json({ error: 'Email is required' });
    }

    const emailToCheck = email.trim().toLowerCase();
    console.log('🔍 Checking participation for:', emailToCheck);

    console.log('📦 All participations:', req.participations);

    const participant = req.participations.find(p => {
      const participantEmail = p.user?.email?.trim().toLowerCase();
      console.log('👤 Checking participant:', participantEmail);
      return participantEmail === emailToCheck;
    });

    if (participant) {
      console.log('✅ Participation match found:', participant);

      res.json({
        hasParticipated: true,
        event: participant.event,
        participatedAt: participant.participatedAt, // optional if you want
        user: participant.user // sending user details too
      });
    } else {
      res.json({ hasParticipated: false });
    }

  } catch (err) {
    console.error('❌ Error in participation check:', err.message);
    res.status(500).send('Server Error');
  }
});



module.exports = router;
