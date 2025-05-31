// const express = require('express');
// const router = express.Router();
// const Event = require('../models/event');
// const adminAuth = require('../middleware/fetchadmin');
// const getEvent = require('../middleware/fetchevent');
// const Notification = require('../models/Notification');
// const User = require('../models/user');
// const Participation = require('../models/participation');
// const nodemailer = require('nodemailer');
// const emailTemplates = require('../utils/emailTemplates');

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   auth: {
//       user: "asushant603@gmail.com",
//       pass: "keax hacx nque facy"
//   }
// });

// // POST /api/authevent — Create event and notify users
// router.post('/', adminAuth, async (req, res) => {
// const { title, description, date, location, organizer } = req.body;

// try {
//   // 1. Create new event
//   const newEvent = new Event({ title, description, date, location, organizer });
//   await newEvent.save();

//   // 2. Get all users
//   const users = await User.find();

//   // 3. Create and save in-app notifications
//   const eventMessage = `📢 Upcoming Event: "${title}" on ${new Date(date).toLocaleDateString()} at ${location}.`;
//   const notifications = users.map(user => ({
//     userId: user._id,
//     message: eventMessage
//   }));
//   await Notification.insertMany(notifications);

//   // 4. Send styled email notifications
//   await sendEventEmails(users, newEvent);

//   res.status(201).json({
//     event: newEvent,
//     message: 'Event created and notifications sent to all users.'
//   });
// } catch (err) {
//   console.error('Error creating event and sending notifications:', err.message);
//   res.status(400).json({ message: err.message });
// }
// });

// // 📩 Send event emails using new HTML template
// async function sendEventEmails(users, event) {
// const { subject, html, text } = emailTemplates.getEventTemplate(event);

// const emailPromises = users.map(async (user) => {
//   if (user.email) {
//     try {
//       await transporter.sendMail({
//         from: `"Blood Bridge" <asushant603@gmail.com>`,
//         to: user.email,
//         subject,  // ✅ Styled subject
//         html,     // ✅ Styled HTML template
//         text      // ✅ Plain text fallback
//       });
//     } catch (emailError) {
//       console.error(`Failed to send email to ${user.email}:`, emailError);
//     }
//   }
// });

// await Promise.all(emailPromises);
// }
// router.delete('/:id', adminAuth, getEvent, async (req, res) => {
//   try {
//     await req.event.deleteOne();
//     res.json({ message: 'Event deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get All Events (GET /api/authevent)
// router.get('/', async (req, res) => {
//   try {
//     const events = await Event.find().sort({ date: 1 });
//     res.json(events);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // GET /events/summary
// router.get('/events/summary', async (req, res) => {
//   try {
//     const events = await Event.find({}, 'date'); // only fetch the `date` field
//     const count = events.length;
//     const eventDates = events.map(event => event.date);

//     res.json({
//       count,
//       eventDates,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// router.get('/events-by-month', async (req, res) => {
//   try {
//     const result = await Event.aggregate([
//       {
//         $group: {
//           _id: {
//             year: { $year: '$date' },
//             month: { $month: '$date' }
//           },
//           count: { $sum: 1 }
//         }
//       },
//       {
//         $sort: {
//           '_id.year': 1,
//           '_id.month': 1
//         }
//       },
//       {
//         $project: {
//           _id: 0,
//           month: {
//             $concat: [
//               { $toString: '$_id.month' },
//               '/',
//               { $toString: '$_id.year' }
//             ]
//           },
//           count: 1
//         }
//       }
//     ]);

//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// router.get('/:id', getEvent, (req, res) => {
//   res.json(req.event);
// });
// module.exports = router;

const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const adminAuth = require("../middleware/fetchadmin");
const getEvent = require("../middleware/fetchevent");
const Notification = require("../models/Notification");
const User = require("../models/user");
const Participation = require("../models/participation");
const nodemailer = require("nodemailer");
const emailTemplates = require("../utils/emailTemplates");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "asushant603@gmail.com",
    pass: "keax hacx nque facy",
  },
});

// POST /api/authevent — Create event and notify users
router.post("/", adminAuth, async (req, res) => {
  const { title, description, date, location, organizer, duration } = req.body;

  try {
    // 1. Create new event with duration
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      organizer,
      duration, // { hours: Number, minutes: Number }
    });
    await newEvent.save();

    // 2. Get all users
    const users = await User.find();

    // 3. Create and save in-app notifications
    const eventMessage = `📢 Upcoming Event: "${title}" on ${new Date(
      date
    ).toLocaleDateString()} at ${location}.`;
    const notifications = users.map((user) => ({
      userId: user._id,
      message: eventMessage,
    }));
    await Notification.insertMany(notifications);

    // 4. Send styled email notifications
    await sendEventEmails(users, newEvent);

    res.status(201).json({
      event: newEvent,
      message: "Event created and notifications sent to all users.",
    });
  } catch (err) {
    console.error(
      "Error creating event and sending notifications:",
      err.message
    );
    res.status(400).json({ message: err.message });
  }
});

// 📩 Send event emails using new HTML template
async function sendEventEmails(users, event) {
  const { subject, html, text } = emailTemplates.getEventTemplate(event);

  const emailPromises = users.map(async (user) => {
    if (user.email) {
      try {
        await transporter.sendMail({
          from: `"Blood Bridge" <asushant603@gmail.com>`,
          to: user.email,
          subject,
          html,
          text,
        });
      } catch (emailError) {
        console.error(`Failed to send email to ${user.email}:`, emailError);
      }
    }
  });

  await Promise.all(emailPromises);
}

// GET /api/authevent — Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/authevent/events/summary
router.get("/events/summary", async (req, res) => {
  try {
    const events = await Event.find({}, "date");
    const count = events.length;
    const eventDates = events.map((event) => event.date);

    res.json({
      count,
      eventDates,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/authevent/events-by-month
router.get("/events-by-month", async (req, res) => {
  try {
    const result = await Event.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $concat: [
              { $toString: "$_id.month" },
              "/",
              { $toString: "$_id.year" },
            ],
          },
          count: 1,
        },
      },
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/expired", async (req, res) => {
  try {
    const now = new Date();

    // Get all events
    const events = await Event.find();

    // Filter expired events
    const expiredEvents = events.filter((event) => {
      const eventStart = new Date(event.date);
      const durationMs =
        (event.duration.hours || 0) * 60 * 60 * 1000 +
        (event.duration.minutes || 0) * 60 * 1000;
      const eventEnd = new Date(eventStart.getTime() + durationMs);
      return eventEnd < now;
    });

    res.json({ expiredEvents });
  } catch (err) {
    console.error("Error fetching expired events:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});
// GET /api/authevent/:id — Get single event
router.get("/:id", getEvent, (req, res) => {
  res.json(req.event);
});
// DELETE /api/authevent/:id — Delete event
router.delete("/:id", adminAuth, getEvent, async (req, res) => {
  try {
    await req.event.deleteOne();
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
