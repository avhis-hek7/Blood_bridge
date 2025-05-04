// routes/notifications.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const fetchNotification = require('../middleware/fetchnotification');
const mongoose = require('mongoose');

// Fetch notifications for the logged-in user
router.get('/', fetchNotification, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const userId = req.user.id;

    const notifications = await Notification.find({ userId }).sort({ timestamp: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// POST /api/notifications/mark-read

router.post("/mark-read", fetchNotification, async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required in request body" });
    }

    // Get the authenticated user's ID from middleware
    const authenticatedUserId = req.user.id;

    // Prevent user from modifying others' notifications
    if (user_id !== authenticatedUserId) {
      return res.status(403).json({ message: "Unauthorized: User ID does not match authenticated user" });
    }

    // Update notifications for this user only
    const result = await Notification.updateMany(
      { userId: user_id }, // Assuming Notification schema stores userId
      { $set: { seen: true } }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ message: "No notifications found for this user" });
    }

    res.json({ message: "Notifications marked as read for this user" });
  } catch (err) {
    console.error("Error in mark-read route:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Mark a notification as read
router.put('/:id/read', fetchNotification, async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { seen: true });
    res.json({ message: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Send notification to all users
router.post('/send', fetchNotification, async (req, res) => {
  try {
    const { message } = req.body;
    const User = require('../models/user');
    const users = await User.find();

    const notifications = users.map(user => ({
      userId: user._id,
      message,
    }));

    await Notification.insertMany(notifications);
    res.json({ message: 'Notification sent to all users' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send notification' });
  }
});


router.post("/clear", fetchNotification, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await Notification.deleteMany({ userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No notifications found to delete" });
    }

    res.status(200).json({ message: "Notifications cleared" });
  } catch (error) {
    console.error("Error clearing notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
