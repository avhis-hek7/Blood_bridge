// middleware/fetchevent.js
const Event = require('../models/event');

async function getEvent(req, res, next) {
  let event;
  try {
    event = await Event.findById(req.params.id);
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