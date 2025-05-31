
// const mongoose = require('mongoose');

// const eventSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   description: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   date: {
//     type: Date,
//     required: true
//   },
//   location: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   organizer: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   duration: {
//     hours: {
//       type: Number,
//       required: true,
//       min: 0
//     },
//     minutes: {
//       type: Number,
//       required: true,
//       min: 0,
//       max: 59
//     }
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Event', eventSchema);

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  organizer: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    hours: {
      type: Number,
      required: true,
      min: 0
    },
    minutes: {
      type: Number,
      required: true,
      min: 0,
      max: 59
    }
  },
  isExpired: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
