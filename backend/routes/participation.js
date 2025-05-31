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

// router.post("/check-participants", fetchParticipations, async (req, res) => {
//   // console.log('📬 POST /check route hit');

//   try {
//     const { email } = req.body;

//     if (!email) {
//       // console.log('⚠️ Email missing in request body');
//       return res.status(400).json({ error: "Email is required" });
//     }

//     const emailToCheck = email.trim().toLowerCase();
//     // console.log('🔍 Checking participation for:', emailToCheck);

//     // console.log('📦 All participations:', req.participations);

//     const participant = req.participations.find((p) => {
//       const participantEmail = p.user?.email?.trim().toLowerCase();
//       // console.log('👤 Checking participant:', participantEmail);
//       return participantEmail === emailToCheck;
//     });

//     if (participant) {
//       // console.log('✅ Participation match found:', participant);

//       res.json({
//         hasParticipated: true,
//         event: participant.event,
//         participatedAt: participant.participatedAt, // optional if you want
//         user: participant.user, // sending user details too
//       });
//     } else {
//       res.json({ hasParticipated: false });
//     }
//   } catch (err) {
//     console.error("❌ Error in participation check:", err.message);
//     res.status(500).send("Server Error");
//   }
// });
//Option1
// router.post("/check-participants", fetchParticipations, async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ error: "Email is required" });
//     }

//     const emailToCheck = email.trim().toLowerCase();
//     const now = new Date();

//     // First, filter out any expired event participations
//     const validParticipations = req.participations.filter(participation => {
//       if (!participation.event) return false;
      
//       const eventDate = new Date(participation.event.date);
//       const durationMs = 
//         (participation.event.duration?.hours || 0) * 60 * 60 * 1000 +
//         (participation.event.duration?.minutes || 0) * 60 * 1000;
//       const endTime = new Date(eventDate.getTime() + durationMs);
      
//       return now <= endTime;
//     });

//     // Delete expired participations from database
//     const expiredParticipations = req.participations.filter(p => !validParticipations.includes(p));
//     if (expiredParticipations.length > 0) {
//       await Participation.deleteMany({
//         _id: { $in: expiredParticipations.map(p => p._id) }
//       });
//     }

//     // Now check for active participations
//     const participant = validParticipations.find((p) => {
//       const participantEmail = p.user?.email?.trim().toLowerCase();
//       return participantEmail === emailToCheck;
//     });

//     if (participant) {
//       res.json({
//         hasParticipated: true,
//         event: participant.event,
//         participatedAt: participant.participatedAt,
//         user: participant.user,
//       });
//     } else {
//       res.json({ hasParticipated: false });
//     }
//   } catch (err) {
//     console.error("❌ Error in participation check:", err.message);
//     res.status(500).send("Server Error");
//   }
// });
router.post("/check-participants", fetchParticipations, async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const emailToCheck = email.trim().toLowerCase();
    const now = new Date();

    // Find all participations for this user
    const userParticipations = req.participations.filter((p) => {
      const participantEmail = p.user?.email?.trim().toLowerCase();
      return participantEmail === emailToCheck;
    });

    // Check if user has any active participations
    const activeParticipation = userParticipations.find(participation => {
      if (!participation.event) return false;
      
      const eventDate = new Date(participation.event.date);
      const durationMs = 
        (participation.event.duration?.hours || 0) * 60 * 60 * 1000 +
        (participation.event.duration?.minutes || 0) * 60 * 1000;
      const endTime = new Date(eventDate.getTime() + durationMs);
      
      return now <= endTime;
    });

    if (activeParticipation) {
      res.json({
        hasParticipated: true,
        event: activeParticipation.event,
        participatedAt: activeParticipation.participatedAt,
        user: activeParticipation.user,
        isActive: true
      });
    } else if (userParticipations.length > 0) {
      // User has past participations but no current ones
      res.json({
        hasParticipated: false,
        pastParticipations: userParticipations.map(p => ({
          event: p.event,
          participatedAt: p.participatedAt
        })),
        message: "You have past participations but no current ones"
      });
    } else {
      // No participations at all
      res.json({ 
        hasParticipated: false 
      });
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

// PUT /api/participation/confirm/:id
router.put("/confirm/:id", async (req, res) => {
  try {
    const participation = await Participation.findById(req.params.id);

    if (!participation) {
      return res.status(404).json({ error: "Participation not found" });
    }

    // Confirm the participation
    participation.confirmed = true;

    // If certificate not already issued, generate and send
    if (!participation.certificateIssued) {
      const { user, event } = participation;

      // Ensure user and event info exists
      if (
        user?.email &&
        user?.name &&
        event?.title &&
        event?.date &&
        event?.location
      ) {
        try {
          const filePath = await generateCertificate(
            user.name,
            user.email,
            event.title,
            event.date,
            event.location
          );

          await sendCertificateEmail(user.email, user.name, filePath, event);

          participation.certificateIssued = true;
        } catch (emailError) {
          console.error(
            "Certificate generation/email failed:",
            emailError.message
          );
          return res
            .status(500)
            .json({ error: "Failed to issue certificate after confirmation." });
        }
      } else {
        return res
          .status(400)
          .json({ error: "Incomplete user or event details for certificate." });
      }
    }

    await participation.save();

    res.json({ success: true, data: participation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during confirmation" });
  }
});
// DELETE route for participation
router.delete('/:id', async (req, res) => {
  try {
    const participation = await Participation.findByIdAndDelete(req.params.id);
    
    if (!participation) {
      return res.status(404).json({
        success: false,
        message: 'Participation not found'
      });
    }

    res.json({
      success: true,
      message: 'Participation deleted successfully',
      data: participation
    });
  } catch (error) {
    console.error('Error deleting participation:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
