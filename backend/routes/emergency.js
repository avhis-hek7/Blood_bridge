const mongoose = require("mongoose");
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

// POST /api/emergency/notify-donors/:requestId
// router.post("/notify-donors/:requestId", async (req, res) => {
//   const { requestId } = req.params;

//   try {
//     const request = await EmergencyRequest.findById(requestId);
//     if (!request) return res.status(404).json({ msg: "Request not found" });
//     const matchingUsers = await User.find({ bloodGroup: request.bloodType });

//     if (matchingUsers.length === 0) {
//       return res.status(404).json({ msg: "No matching donors found" });
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

//     for (const user of matchingUsers) {
//       const availableLink = `http://localhost:5000/api/emergency/respond?requestId=${request._id}&userId=${user._id}&status=available`;
//       const notAvailableLink = `http://localhost:5000/api/emergency/respond?requestId=${request._id}&userId=${user._id}&status=not%20available`;

//       const mailOptions = {
//         from: `"Blood_Bridge Team" <asushant603@gmail.com>`,
//         to: user.email,
//         subject: `Urgent Blood Request - ${request.bloodType} Needed`,
//         html: `
//           <p>Dear ${user.name || "Donor"},</p>
//           <p>We have an urgent request for blood type <strong>${
//             request.bloodType
//           }</strong>.</p>
//           <p>If you're available to donate, please click below:</p>
//           <p>
//             <a href="${availableLink}" style="padding: 10px 15px; background-color: green; color: white; text-decoration: none; margin-right: 10px;">I'm Available</a>
//             <a href="${notAvailableLink}" style="padding: 10px 15px; background-color: red; color: white; text-decoration: none;">Not Available</a>
//           </p>
//           <p>Thank you for being a life-saver!<br/>– BloodBridge Team</p>
//         `,
//       };

//       await transporter.sendMail(mailOptions);
//     }

//     res.json({ msg: "Notifications sent to matching donors." });
//   } catch (err) {
//     console.error("Error notifying donors:", err.message);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// Route to notify matching donors via email
const EMAIL_LINK_BASE_URL =
  process.env.EMAIL_LINK_BASE_URL ||
  "https://0712-202-166-211-247.ngrok-free.app";

// Route to notify matching donors via email
router.post("/notify-donors/:requestId", async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await EmergencyRequest.findById(requestId);
    if (!request) return res.status(404).json({ msg: "Request not found" });

    // ✅ Exclude requester from matching users
    const requesterId = request.userId.toString();

    const matchingUsers = await User.find({
      bloodGroup: request.bloodType,
    });

    // ✅ Exclude the requester from the recipient list
    const filteredUsers = matchingUsers.filter(
      (user) => user._id.toString() !== requesterId
    );

    if (filteredUsers.length === 0) {
      return res
        .status(404)
        .json({ msg: "No matching donors found (excluding requester)" });
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

    for (const user of matchingUsers) {
      const availableLink = `${EMAIL_LINK_BASE_URL}/api/emergency/donor-respond?requestId=${request._id}&userId=${user._id}&status=available`;
      const notAvailableLink = `${EMAIL_LINK_BASE_URL}/api/emergency/donor-respond?requestId=${request._id}&userId=${user._id}&status=not%20available`;

      const mailOptions = {
        from: `"Blood_Bridge Team" <asushant603@gmail.com>`,
        to: user.email,
        subject: `Urgent Blood Request - ${request.bloodType} Needed`,
        html: `
          <p>Dear ${user.name || "Donor"},</p>
          <p>We have an urgent request for blood type <strong>${
            request.bloodType
          }</strong>.</p>
          <p>If you're available to donate, please click below:</p>
          <p>
            <a href="${availableLink}" style="padding: 10px 15px; background-color: green; color: white; text-decoration: none; margin-right: 10px;">I'm Available</a>
            <a href="${notAvailableLink}" style="padding: 10px 15px; background-color: red; color: white; text-decoration: none;">Not Available</a>
          </p>
          <p>Thank you for being a life-saver!<br/>– BloodBridge Team</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    // Extract donor IDs and emails
    const donorInfo = matchingUsers.map((user) => ({
      userId: user._id,
      email: user.email,
    }));

    res.json({
      msg: "Notifications sent to matching donors.",
      donors: donorInfo,
    });
  } catch (err) {
    console.error("Error notifying donors:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/emergency/donor-respond
router.get("/donor-respond", async (req, res) => {
  const { requestId, userId, status } = req.query;

  try {
    const request = await EmergencyRequest.findById(requestId);
    if (!request) return res.send("<h2>Invalid emergency request.</h2>");

    // Check if this donor already responded
    const alreadyResponded = request.responses?.some(
      (r) => r.responderId.toString() === userId
    );
    if (alreadyResponded) {
      return res.send(`
        <h2>You have already responded to this request.</h2>
        <p>Your user ID: ${userId}</p>
      `);
    }

    // Save donor response
    request.responses = request.responses || [];
    request.responses.push({
      responderId: userId,
      status,
    });
    await request.save();

    // ✅ If available, show donor (responder) info
    if (status === "available") {
      const donor = await User.findById(userId);
      if (!donor) {
        return res.send("<h2>Donor not found.</h2>");
      }

      return res.send(`
        <h2>Your response "${status}" has been recorded. Thank you!</h2>
        <p><strong>Donor Info:</strong></p>
        <p>Name: ${donor.name || "N/A"}</p>
        <p>Phone: ${donor.phone || "N/A"}</p>
        <p>User ID: ${userId}</p>
        <p><a href="/api/emergency/send-contact-info?requestId=${requestId}&responderId=${userId}">Send info to requester</a></p>
      `);
    }

    // 🛠 Handle other statuses like "unavailable"
    return res.send(`
      <h2>Your response "${status}" has been recorded. Thank you!</h2>
      <p>User ID: ${userId}</p>
    `);
  } catch (err) {
    console.error("Error processing donor response:", err.message);
    res
      .status(500)
      .send("<h2>Server error while recording your response.</h2>");
  }
});
// GET /api/emergency/request-responses/:requestId
router.get("/request-responses/:requestId", async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await EmergencyRequest.findById(requestId).lean();
    if (!request) {
      return res.status(404).json({ msg: "Emergency request not found." });
    }

    if (!request.responses || request.responses.length === 0) {
      return res
        .status(200)
        .json({ msg: "No donor responses yet.", responses: [] });
    }

    // Fetch user details for all responses
    const userIds = request.responses.map((r) => r.responderId);
    const users = await User.find({ _id: { $in: userIds } }).lean();

    const responsesWithUserDetails = request.responses.map((resp) => {
      const user = users.find(
        (u) => u._id.toString() === resp.responderId.toString()
      );
      return {
        responderId: resp.responderId,
        name: user?.name || "Unknown",
        email: user?.email || "N/A",
        phone: user?.phone || "N/A",
        status: resp.status,
        respondedAt: resp.respondedAt || "N/A", // Add this if you record timestamps
      };
    });

    res.json({
      requestId,
      bloodType: request.bloodType,
      totalResponses: responsesWithUserDetails.length,
      responses: responsesWithUserDetails,
    });
  } catch (err) {
    console.error("Error fetching responses:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/emergency/send-contact-info
router.post("/send-donor-info/:requestId", async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await EmergencyRequest.findById(requestId);
    if (!request) return res.status(404).json({ msg: "Request not found" });

    const requester = await User.findById(request.userId);
    if (!requester || !requester.email) {
      return res.status(400).json({ msg: "Requester email not available" });
    }

    const donorResponses =
      request.responses?.filter((r) => r.status === "available") || [];
    if (donorResponses.length === 0) {
      return res
        .status(404)
        .json({ msg: "No donors have responded as available yet" });
    }

    const donorIds = donorResponses.map((r) => r.responderId);
    const donors = await User.find({ _id: { $in: donorIds } });

    const donorListHTML = donors
      .map(
        (donor, i) => `
        <p><strong>Donor ${i + 1}</strong><br/>
        Name: ${donor.name || "N/A"}<br/>
        Email: ${donor.email}<br/>
        Phone: ${donor.phone || "N/A"}<br/>
        Blood Group: ${donor.bloodGroup || "N/A"}</p>
      `
      )
      .join("<hr/>");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "asushant603@gmail.com",
        pass: "keax hacx nque facy", // use secure app password
      },
    });

    const mailOptions = {
      from: `"Blood_Bridge Team" <asushant603@gmail.com>`,
      to: requester.email,
      subject: `Available Donors for Your Blood Request`,
      html: `
        <p>Dear ${requester.name || "User"},</p>
        <p>The following donors have responded as available for your blood request of type <strong>${
          request.bloodType
        }</strong>:</p>
        ${donorListHTML}
        <p>Please reach out to them as soon as possible.</p>
        <p>– BloodBridge Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      msg: `Donor contact information sent to ${requester.email}`,
      totalDonors: donors.length,
    });
  } catch (err) {
    console.error("Error sending donor info:", err);
    res.status(500).json({ msg: "Server error while sending donor info" });
  }
});

module.exports = router;
