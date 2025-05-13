// routes/participation.js
const express = require("express");
const router = express.Router();
const Participation = require("../models/participation");
const Event = require("../models/event"); // Ensure this is imported
const fetchParticipations = require("../middleware/fetchparticipation");
const generateCertificate = require("../utils/generateCertificate");
const sendCertificateEmail = require("../utils/sendCertificate");

// POST participation
router.post("/", async (req, res) => {
  try {
    const { user, event } = req.body;
    if (!user || !event) {
      return res.status(400).json({ error: "User and event info required." });
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
    res.status(201).json({ success: true, message: "Participation saved." });
  } catch (err) {
    console.error("Error saving participation:", err.message);
    res.status(500).json({ error: "Server error while saving participation." });
  }
});

// GET participation list
router.get("/", fetchParticipations, (req, res) => {
  res.status(200).json({ success: true, data: req.participations });
});

// console.log('📦 Participation routes file loaded');

router.post("/check-participants", fetchParticipations, async (req, res) => {
  // console.log('📬 POST /check route hit');

  try {
    const { email } = req.body;

    if (!email) {
      // console.log('⚠️ Email missing in request body');
      return res.status(400).json({ error: "Email is required" });
    }

    const emailToCheck = email.trim().toLowerCase();
    // console.log('🔍 Checking participation for:', emailToCheck);

    // console.log('📦 All participations:', req.participations);

    const participant = req.participations.find((p) => {
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
        user: participant.user, // sending user details too
      });
    } else {
      res.json({ hasParticipated: false });
    }
  } catch (err) {
    console.error("❌ Error in participation check:", err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/get-all-participations", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    console.log("Fetching participations for email:", email);

    // Find participations where user.email matches
    const participations = await Participation.find({
      "user.email": email,
    }).lean();

    console.log("Participations found:", participations.length);

    if (participations.length === 0) {
      return res
        .status(404)
        .json({ message: "No participation history found for this user." });
    }

    res.json(participations);
  } catch (error) {
    console.error("Error fetching participations:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route: GET /api/particpation/count
router.get("/count", fetchParticipations, (req, res) => {
  try {
    const participations = req.participations || [];

    // Correctly extract nested email field
    const uniqueEmails = new Set(participations.map((p) => p.user.email));

    res.json({ count: uniqueEmails.size });
  } catch (error) {
    console.error("Error calculating participation count:", error.message);
    res.status(500).json({ error: "Failed to calculate participation count." });
  }
});

router.get("/event-counts", async (req, res) => {
  try {
    const participationCounts = await Participation.aggregate([
      {
        $group: {
          _id: "$event.title", // group by embedded event title
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          eventName: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    res.json(participationCounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
// router.post("/issue-certificate", async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) {
//       return res.status(400).json({ error: "Email is required." });
//     }

//     const userEmail = email.trim().toLowerCase();
//     const participations = await Participation.find({
//       "user.email": userEmail,
//     });

//     if (participations.length < 2) {
//       return res.status(200).json({
//         eligible: false,
//         message: `Only ${participations.length} participations. Need more than 1 participation for certificate.`,
//       });
//     }

//     const user = participations[0].user;
//     const filePath = await generateCertificate(user.name, user.email);
//     await sendCertificateEmail(user.email, user.name, filePath);

//     res.status(200).json({
//       success: true,
//       message: "Certificate generated and emailed successfully!",
//     });
//   } catch (error) {
//     console.error("Error issuing certificate:", error.message);
//     res.status(500).json({ error: "Server error while issuing certificate." });
//   }
// });


router.post("/issue-certificate", async (req, res) => {
  try {
    const { email, eventTitle } = req.body;

    if (!email || !eventTitle) {
      return res
        .status(400)
        .json({ error: "Email and Event Title are required." });
    }

    const userEmail = email.trim().toLowerCase();

    // Find the participation record for this user and event title
    const participation = await Participation.findOne({
      "user.email": userEmail,
      "event.title": eventTitle,
    });

    if (!participation) {
      return res
        .status(404)
        .json({ error: "No participation found for this event." });
    }

    if (participation.certificateIssued) {
      return res.status(200).json({
        eligible: false,
        message: "Certificate already issued for this event.",
      });
    }

    const { user, event } = participation;

    // Generate the certificate using user and event details
    const filePath = await generateCertificate(
      user.name,
      user.email,
      event.title,
      event.date,
      event.location
    );

    // Send the certificate via email
    await sendCertificateEmail(user.email, user.name, filePath, event);

    // Mark certificate as issued
    participation.certificateIssued = true;
    await participation.save();

    res.status(200).json({
      success: true,
      message: "Certificate generated and emailed successfully!",
    });
  } catch (error) {
    console.error("Error issuing certificate:", error.message);
    res.status(500).json({ error: "Server error while issuing certificate." });
  }
});

module.exports = router;

module.exports = router;
