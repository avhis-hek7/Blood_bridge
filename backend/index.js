const express = require('express');
const cors = require('cors');
const connectToMongo = require('./database');
const userRoutes = require('./routes/auth');
const eventRoutes = require('./routes/authevent');
const participationRoutes = require('./routes/participation'); // ✅ New file
const bloodbankRoutes = require("./routes/authbank");
const bodyParser = require('body-parser');
// const scheduleEventReminders = require('./cron/eventReminderJob');
// const notificationRoutes = require('./routes/authnotification');
const notificationRoutes = require('./routes/notification');



const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectToMongo();
// scheduleEventReminders();
//Call eventReminderJob.js

// Routes
app.use('/api/auth', userRoutes);          
app.use('/api/authevent', eventRoutes);    
app.use('/api/participation', participationRoutes);  // ✅ Separate prefix
app.use('/api/notifications', notificationRoutes);
app.use("/api/bloodbank", bloodbankRoutes);
// app.use('/api/notifications', notificationRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('🩸 Welcome to the Blood Donation API'); 
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
