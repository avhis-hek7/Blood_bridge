const express = require("express");
const router = express.Router();
const EmergencyRequest = require("../models/emergencyRequest");
const fetchUser = require("../middleware/fetchuser");
const fetchAdmin = require("../middleware/fetchadmin");
const Inventory = require("../models/bloodinventory");
const User = require("../models/user");
const nodemailer = require("nodemailer");

// User: Submit emergency request
router.post("/", fetchUser, async (req, res) => {
  try {
    const { bloodType, unitsRequired, reason, contactNumber } = req.body;
    if (!bloodType || !unitsRequired || !contactNumber) {
      return res.status(400).json({ msg: "Required fields missing" });
    }

    const request = new EmergencyRequest({
      userId: req.user.id,
      bloodType,
      unitsRequired,
      reason,
      contactNumber,
    });

    await request.save();
    res.json({ msg: "Request submitted successfully", request });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Admin: Get all emergency requests
router.get("/", fetchAdmin, async (req, res) => {
  try {
    const requests = await EmergencyRequest.find();

    const requestsWithEmail = await Promise.all(
      requests.map(async (request) => {
        const user = await User.findById(request.userId).select("email");
        return {
          ...request._doc,
          email: user ? user.email : "Unknown",
        };
      })
    );

    res.json(requestsWithEmail);
  } catch (err) {
    console.error("Error fetching emergency requests:", err);
    res.status(500).send("Server Error");
  }
});

// User: Check blood availability

router.post("/check-availability", fetchUser, async (req, res) => {
  try {
    const { bloodType, unitsRequired } = req.body;

    if (!bloodType || !unitsRequired) {
      return res
        .status(400)
        .json({ msg: "Blood type and required units are mandatory" });
    }

    const availableHospitals = await Inventory.find({
      bloodType,
      quantity: { $gte: unitsRequired },
    }).select("hospitalName hospitalLocation quantity");

    if (availableHospitals.length === 0) {
      return res.status(404).json({
        msg: "Blood not available in required quantity at any hospital",
      });
    }

    res.json({
      msg: "Blood available",
      hospitals: availableHospitals,
    });
  } catch (err) {
    console.error("Error checking blood availability:", err);
    res.status(500).send("Server Error");
  }
});

// DELETE /api/emergency/:id - Admin deletes a request
router.delete("/:id", fetchAdmin, async (req, res) => {
  try {
    const request = await EmergencyRequest.findByIdAndDelete(req.params.id);
    if (!request) {
      return res.status(404).json({ msg: "Request not found" });
    }
    res.json({ msg: "Request deleted successfully" });
  } catch (err) {
    console.error("Error deleting request:", err);
    res.status(500).send("Server Error");
  }
});
// router.put("/:id/respond", fetchAdmin, async (req, res) => {
//   try {
//     const { adminNote } = req.body;

//     const request = await EmergencyRequest.findById(req.params.id);
//     if (!request) return res.status(404).json({ msg: "Request not found" });

//     const inventoryItem = await Inventory.findOne({
//       bloodType: request.bloodType,
//       quantity: { $gt: 0 },
//     });

//     const user = await User.findById(request.userId);

//     if (!user || !user.email) {
//       return res.status(400).json({ msg: "User not found or missing email" });
//     }

//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: "asushant603@gmail.com",
//         pass: "keax hacx nque facy",
//       },
//     });

//     if (inventoryItem) {
//       // ✅ Update EmergencyRequest with hospital info
//       request.status = "available";
//       request.hospitalName = inventoryItem.hospitalName?.trim().toLowerCase(); // Set hospital name
//       request.hospitalLocation = inventoryItem.hospitalLocation || ""; // Set location if available
//       request.adminNote =
//         adminNote || `Blood available at ${inventoryItem.hospitalName}`;
//       await request.save();

//       const mailOptions = {
//         from: `"Blood_Bridge Team" <asushant603@gmail.com>`,
//         to: user.email,
//         subject: "Emergency Blood Request - Blood Available",
//         text: `Dear ${user.name || "User"},\n\nGood news! The blood type (${
//           request.bloodType
//         }) you requested is available.\n\nHospital: ${
//           inventoryItem.hospitalName
//         }\nLocation: ${inventoryItem.hospitalLocation}\nAvailable Units: ${
//           inventoryItem.quantity
//         }\n\n${
//           adminNote ? `Note: ${adminNote}\n\n` : ""
//         }Please contact the hospital as soon as possible.\n\nRegards,\nBloodBridge Team`,
//       };

//       await transporter.sendMail(mailOptions);

//       return res.json({
//         msg: "Blood available. User notified.",
//         request,
//         hospital: {
//           name: inventoryItem.hospitalName,
//           location: inventoryItem.hospitalLocation,
//           quantity: inventoryItem.quantity,
//         },
//       });
//     } else {
//       request.status = "not available";
//       request.adminNote =
//         adminNote || "Requested blood type not available currently.";
//       await request.save();

//       const mailOptions = {
//         from: `"Blood_Bridge Team" <asushant603@gmail.com>`,
//         to: user.email,
//         subject: "Emergency Blood Request - Not Available",
//         text: `Dear ${
//           user.name || "User"
//         },\n\nWe regret to inform you that the requested blood type (${
//           request.bloodType
//         }) is currently not available.\n\n${
//           adminNote ? `Note: ${adminNote}\n\n` : ""
//         }We will notify you once it becomes available.\n\nRegards,\nBloodBridge Team`,
//       };

//       await transporter.sendMail(mailOptions);

//       return res.json({ msg: "Blood not available. User notified.", request });
//     }
//   } catch (err) {
//     console.error("Error responding to emergency request:", err.message);
//     res.status(500).send("Server Error");
//   }
// });

// PUT: Mark emergency request as fulfilled and update inventory

router.put("/:id/respond", fetchAdmin, async (req, res) => {
  try {
    const { adminNote } = req.body;

    const request = await EmergencyRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ msg: "Request not found" });

    // 🔥 Pre-check inventory and update status BEFORE anything else
    const inventoryItem = await Inventory.findOne({
      bloodType: request.bloodType,
      quantity: { $gt: 0 },
    });

    // ✅ If inventory exists and request status is still 'pending', update it to 'available'
    if (inventoryItem && request.status === "pending") {
      request.status = "available";
      request.hospitalName = inventoryItem.hospitalName?.trim().toLowerCase();
      request.hospitalLocation = inventoryItem.hospitalLocation || "";
      await request.save();
    }

    const user = await User.findById(request.userId);

    if (!user || !user.email) {
      return res.status(400).json({ msg: "User not found or missing email" });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "asushant603@gmail.com",
        pass: "keax hacx nque facy",
      },
    });

    if (inventoryItem) {
      request.status = "available"; // Reaffirming status
      request.hospitalName = inventoryItem.hospitalName?.trim().toLowerCase();
      request.hospitalLocation = inventoryItem.hospitalLocation || "";
      request.adminNote =
        adminNote || `Blood available at ${inventoryItem.hospitalName}`;
      await request.save();

      const mailOptions = {
        from: `"Blood_Bridge Team" <asushant603@gmail.com>`,
        to: user.email,
        subject: "Emergency Blood Request - Blood Available",
        text: `Dear ${user.name || "User"},\n\nGood news! The blood type (${
          request.bloodType
        }) you requested is available.\n\nHospital: ${
          inventoryItem.hospitalName
        }\nLocation: ${inventoryItem.hospitalLocation}\nAvailable Units: ${
          inventoryItem.quantity
        }\n\n${
          adminNote ? `Note: ${adminNote}\n\n` : ""
        }Please contact the hospital as soon as possible.\n\nRegards,\nBloodBridge Team`,
      };

      await transporter.sendMail(mailOptions);

      return res.json({
        msg: "Blood available. User notified.",
        request,
        hospital: {
          name: inventoryItem.hospitalName,
          location: inventoryItem.hospitalLocation,
          quantity: inventoryItem.quantity,
        },
      });
    } else {
      request.status = "not available";
      request.adminNote =
        adminNote || "Requested blood type not available currently.";
      await request.save();

      const mailOptions = {
        from: `"Blood_Bridge Team" <asushant603@gmail.com>`,
        to: user.email,
        subject: "Emergency Blood Request - Not Available",
        text: `Dear ${
          user.name || "User"
        },\n\nWe regret to inform you that the requested blood type (${
          request.bloodType
        }) is currently not available.\n\n${
          adminNote ? `Note: ${adminNote}\n\n` : ""
        }We will notify you once it becomes available.\n\nRegards,\nBloodBridge Team`,
      };

      await transporter.sendMail(mailOptions);

      return res.json({ msg: "Blood not available. User notified.", request });
    }
  } catch (err) {
    console.error("Error responding to emergency request:", err.message);
    res.status(500).send("Server Error");
  }
});


router.put("/:id/mark-collected", fetchAdmin, async (req, res) => {
  try {
    const request = await EmergencyRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ msg: "Emergency request not found." });
    }

    if (request.status !== "available") {
      return res
        .status(400)
        .json({ msg: "Request is not marked as available." });
    }

    console.log("Looking for inventory with:");
    console.log("bloodType:", request.bloodType);
    console.log("hospitalName:", request.hospitalName);

    // Use case-insensitive and trimmed matching for both hospitalName and bloodType
    const inventoryItem = await Inventory.findOne({
      bloodType: request.bloodType.toUpperCase(), // Ensure blood type is in uppercase
      hospitalName: new RegExp(`^${request.hospitalName.trim()}$`, "i"), // Case-insensitive and trimmed
    });

    if (!inventoryItem) {
      return res.status(404).json({
        msg: "Matching inventory not found for this blood type and hospital.",
      });
    }

    if (inventoryItem.quantity < request.unitsRequired) {
      return res
        .status(400)
        .json({ msg: "Insufficient inventory to mark collected." });
    }

    // Deduct the unitsRequired from the inventory
    inventoryItem.quantity -= request.unitsRequired;
    await inventoryItem.save();

    // Update request status
    request.status = "collected";
    await request.save();

    return res.json({
      msg: "Blood marked as collected and inventory updated.",
      request,
      updatedInventory: inventoryItem,
    });
  } catch (err) {
    console.error("Error marking blood as collected:", err.message);
    res.status(500).send("Server Error");
  }
});



module.exports = router;
