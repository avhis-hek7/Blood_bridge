// // middleware/fetchevent.js
// const Event = require('../models/event');

// async function getEvent(req, res, next) {
//   let event;
//   try {
//     event = await Event.findById(req.params.id);
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }

//   req.event = event;
//   next();
// }

// module.exports = getEvent;

const Event = require('../models/event');
const mongoose = require('mongoose');

async function getEvent(req, res, next) {
  const id = req.params.id;

  // Check if id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Event ID' });
  }

  let event;
  try {
    event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  req.event = event;
  next();
}

module.exports = getEvent;
