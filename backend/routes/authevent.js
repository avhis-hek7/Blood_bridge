const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const adminAuth = require('../middleware/fetchadmin');
const getEvent = require('../middleware/fetchevent');
const Notification = require('../models/Notification');
const User = require('../models/user'); 
const Participation = require('../models/participation');
// const { fetchParticipationById, fetchAllParticipations } = require('../middleware/fetchparticipation');
// const fetchParticipations = require('../middleware/fetchparticipation');

// // Add Event (POST /api/authevent)
// router.post('/', adminAuth, async (req, res) => {
//   const { title, description, date, location, organizer } = req.body;
//   try {
//     const newEvent = new Event({ title, description, date, location, organizer });
//     await newEvent.save();
//     res.status(201).json(newEvent);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });


router.post('/', adminAuth, async (req, res) => {
  const { title, description, date, location, organizer } = req.body;
  try {
    // 1. Create the event
    const newEvent = new Event({ title, description, date, location, organizer });
    await newEvent.save();

    // 2. Fetch all users
    const users = await User.find();

    // 3. Prepare notification message
    const eventMessage = `📢 Upcoming Event: "${title}" on ${new Date(date).toLocaleDateString()} at ${location}.`;

    // 4. Create notification for each user
    const notifications = users.map(user => ({
      userId: user._id,
      message: eventMessage
    }));

    // 5. Save notifications
    await Notification.insertMany(notifications);

    res.status(201).json({
      event: newEvent,
      message: 'Event created and notifications sent to all users.'
    });
  } catch (err) {
    console.error('Error creating event and sending notifications:', err.message);
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

