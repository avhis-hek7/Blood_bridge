const nodemailer = require('nodemailer');
const emailTemplates = require('./emailTemplates'); // Import email templates

// Configure your email service
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: "asushant603@gmail.com",
        pass: "keax hacx nque facy"
    }
});

// Generate random 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email using template
const sendOTP = async (email, otp) => {
    const { subject, html, text } = emailTemplates.getOTPTemplate(otp);

    try {
        await transporter.sendMail({
            from: `"Blood_Bridge" <asushant603@gmail.com>`,
            to: email,
            subject,
            text,
            html
        });
        return true;
    } catch (error) {
        console.error('Error sending OTP:', error);
        return false;
    }
};

module.exports = { generateOTP, sendOTP };
