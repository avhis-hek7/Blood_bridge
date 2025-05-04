const cron = require("node-cron");
const Event = require("../models/event");
const Participation = require("../models/participation");
const Notification = require("../models/Notification");

const runReminderJob = async () => {
  try {
    console.log("🔔 Running immediate notification job...");

    const now = new Date();
    const upcomingEvents = await Event.find({ date: { $gte: now } });

    console.log(`📅 Found ${upcomingEvents.length} upcoming events`);

    for (let event of upcomingEvents) {
      const participations = await Participation.find({ eventId: event._id });

      for (let p of participations) {
        const userId = p.userId;

        // Check if a registration notification already exists
        const alreadyNotified = await Notification.findOne({
          userId,
          eventId: event._id,
          message: { $regex: /successfully registered/i },
        });

        if (!alreadyNotified) {
          const message = `You have successfully registered for the event "${event.name}"`;
          await Notification.create({ userId, message, eventId: event._id });

          console.log(
            `✅ Registration notification created for user ${userId} for event "${event.name}"`
          );
        } else {
          console.log(
            `⚠️ Already notified user ${userId} for registration of "${event.name}"`
          );
        }
      }
    }
  } catch (error) {
    console.error("❌ Cron job error:", error);
  }
};

const scheduleEventReminders = () => {
  // Run immediately for testing
  runReminderJob();

  // Run every 10 seconds for quick testing
   cron.schedule("*/2 * * * *", runReminderJob); // every 2 minutes
};

module.exports = scheduleEventReminders;
