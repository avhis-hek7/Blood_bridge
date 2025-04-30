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

// console.log('📦 Participation routes file loaded');



router.post('/check-participants', fetchParticipations, async (req, res) => {
  // console.log('📬 POST /check route hit');

  try {
    const { email } = req.body;

    if (!email) {
      // console.log('⚠️ Email missing in request body');
      return res.status(400).json({ error: 'Email is required' });
    }

    const emailToCheck = email.trim().toLowerCase();
    // console.log('🔍 Checking participation for:', emailToCheck);

    // console.log('📦 All participations:', req.participations);

    const participant = req.participations.find(p => {
      const participantEmail = p.user?.email?.trim().toLowerCase();
      // console.log('👤 Checking participant:', participantEmail);
      return participantEmail === emailToCheck;
    });

    if (participant) {
      // console.log('✅ Participation match found:', participant);

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

router.post('/get-all-participations', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    console.log('Fetching participations for email:', email);

    // Find participations where user.email matches
    const participations = await Participation.find({ 'user.email': email }).lean();

    console.log('Participations found:', participations.length);

    if (participations.length === 0) {
      return res.status(404).json({ message: 'No participation history found for this user.' });
    }

    res.json(participations);
  } catch (error) {
    console.error('Error fetching participations:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route: GET /api/particpation/count
router.get('/count', fetchParticipations, (req, res) => {
  try {
    const participations = req.participations || [];

    // Correctly extract nested email field
    const uniqueEmails = new Set(participations.map(p => p.user.email));

    res.json({ count: uniqueEmails.size });
  } catch (error) {
    console.error("Error calculating participation count:", error.message);
    res.status(500).json({ error: "Failed to calculate participation count." });
  }
});

router.get('/event-counts', async (req, res) => {
  try {
    const participationCounts = await Participation.aggregate([
      {
        $group: {
          _id: '$eventId',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'events',
          localField: '_id',
          foreignField: '_id',
          as: 'event'
        }
      },
      { $unwind: '$event' },
      {
        $project: {
          eventName: '$event.name',
          count: 1
        }
      }
    ]);

    res.json(participationCounts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
