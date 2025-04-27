// middleware/fetchParticipations.js
const Participation = require('../models/participation');

const fetchParticipations = async (req, res, next) => {
  try {
    const participations = await Participation.find();
    req.participations = participations;
    next();
  } catch (err) {
    console.error('Error fetching participations:', err.message);
    res.status(500).json({ error: 'Failed to fetch participation data.' });
  }
};

module.exports = fetchParticipations;