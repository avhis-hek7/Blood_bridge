const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const adminAuth = require('../middleware/fetchadmin');
const getEvent = require('../middleware/fetchevent');
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

// GET /events/summary
router.get('/events/summary', async (req, res) => {
  try {
    const events = await Event.find({}, 'date'); // only fetch the `date` field
    const count = events.length;
    const eventDates = events.map(event => event.date);

    res.json({
      count,
      eventDates,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/events-by-month', async (req, res) => {
  try {
    const result = await Event.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1
        }
      },
      {
        $project: {
          _id: 0,
          month: {
            $concat: [
              { $toString: '$_id.month' },
              '/',
              { $toString: '$_id.year' }
            ]
          },
          count: 1
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', getEvent, (req, res) => {
  res.json(req.event);
});
module.exports = router;

