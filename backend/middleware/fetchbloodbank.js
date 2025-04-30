const BloodBank = require("../models/bloodbank");

const fetchBloodBank = async (req, res, next) => {
  try {
    const bloodBank = await BloodBank.findById(req.params.id);
    if (!bloodBank) {
      return res.status(404).json({ error: "Blood bank not found" });
    }
    req.bloodBank = bloodBank; // Attach to request for later use
    next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid blood bank ID" });
  }
};

module.exports = fetchBloodBank;
