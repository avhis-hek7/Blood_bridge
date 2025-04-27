const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const adminAuth = require('../middleware/fetchadmin');
const getEvent = require('../middleware/fetchevents');
const Participation = require('../models/participation');
// const { fetchParticipationById, fetchAllParticipations } = require('../middleware/fetchparticipation');
const fetchParticipations = require('../middleware/fetchparticipation');

// Add Event (POST /api/authevent)
router.post('/', adminAuth, async (req, res) => {
  const { title, description, date, location, organizer } = req.body;
  try {
    const newEvent = new Event({ title, description, date, location, organizer });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Event (DELETE /api/authevent/:id)
router.delete('/:id', adminAuth, getEvent, async (req, res) => {
  try {
    await req.event.deleteOne();
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Events (GET /api/authevent)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Single Event (GET /api/authevent/:id)
router.get('/:id', getEvent, (req, res) => {
  res.json(req.event);
});
// router.post('/participation', async (req, res) => {
//   try {
//     const { user, event } = req.body;

//     if (!user || !event) {
//       return res.status(400).json({ error: 'User and event info required.' });
//     }

//     const participation = new Participation({
//       user: {
//         name: user.name,
//         email: user.email,
//       },
//       event: {
//         title: event.title,
//         description: event.description,
//         date: event.date,
//         location: event.location,
//         organizer: event.organizer,
//       },
//     });

//     await participation.save();
//     res.status(201).json({ success: true, message: 'Participation saved.' });
//   } catch (err) {
//     console.error('Error saving participation:', err.message);
//     res.status(500).json({ error: 'Server error while saving participation.' });
//   }
// });



module.exports = router;
