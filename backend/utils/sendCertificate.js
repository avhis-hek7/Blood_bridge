// const nodemailer = require("nodemailer");
// const fs = require("fs");

// // Create transporter with SMTP settings
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // use STARTTLS
//   auth: {
//     user: "asushant603@gmail.com",
//     pass: "keax hacx nque facy", // Gmail app password
//   },
// });

// // Send certificate via email
// const sendCertificateEmail = async (to, userName, filePath) => {
//   const mailOptions = {
//     from: '"Blood Donation Team" <asushant603@gmail.com>',
//     to,
//     subject: "Your Blood Donation Certificate",
//     text: `Hi ${userName},\n\nThank you for your continued support in blood donation events. Please find your certificate of appreciation attached.\n\nBest regards,\nThe Blood Donation Team`,
//     attachments: [
//       {
//         filename: `Certificate-${userName}.pdf`,
//         path: filePath,
//       },
//     ],
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`✅ Certificate email sent to ${to}`);
//   } catch (error) {
//     console.error("❌ Error sending certificate email:", error.message);
//     throw error;
//   }
// };

// module.exports = sendCertificateEmail;

const nodemailer = require("nodemailer");
const fs = require("fs");

// Create transporter with SMTP settings
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS
  auth: {
    user: "asushant603@gmail.com",
    pass: "keax hacx nque facy", // Gmail app password
  },
});

// Send certificate via email
const sendCertificateEmail = async (to, userName, filePath, event) => {
  const mailOptions = {
    from: '"Blood Donation Team" <asushant603@gmail.com>',
    to,
    subject: `Your Certificate for ${event.title}`,
    text: `Hi ${userName},\n\nThank you for participating in the "${event.title}" blood donation event held on ${new Date(event.date).toLocaleDateString()} at ${event.location}.\n\nPlease find your certificate of appreciation attached.\n\nBest regards,\nThe Blood Donation Team`,
    attachments: [
      {
        filename: `Certificate-${userName}.pdf`,
        path: filePath,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Certificate email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending certificate email:", error.message);
    throw error;
  }
};

module.exports = sendCertificateEmail;
