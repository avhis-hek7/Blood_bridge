const emailTemplates = {
    getOTPTemplate: (otp) => ({
        subject: 'Your OTP Verification Code',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
              <h2 style="color: #e74c3c;">Blood Bridge Verification</h2>
              <p>Your one-time verification code is:</p>
              <div style="background: #f8f8f8; padding: 15px; text-align: center; margin: 20px 0; font-size: 24px; letter-spacing: 2px;">
                <strong>${otp}</strong>
              </div>
              <p>This code will expire in <strong>10 minutes</strong>.</p>
              <hr style="border: 0.5px solid #eee;">
              <p style="font-size: 12px; color: #777;">If you didn't request this, please ignore this email.</p>
            </div>
        `,
        text: `Your Blood Bridge verification code is: ${otp}. It expires in 10 minutes.`
    }),

    getEventTemplate: (event) => ({
        subject: `New Event: ${event.title}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #e74c3c;">Upcoming Blood Donation Event</h2>
              <h3>${event.title}</h3>
              <p><strong>📅 Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
              <p><strong>📍 Location:</strong> ${event.location}</p>
              <div style="background: #f9f9f9; padding: 15px; margin: 15px 0;">
                <p>${event.description}</p>
              </div>
              <p>Organized by: <strong>${event.organizer}</strong></p>
              <hr style="border: 0.5px solid #eee;">
              <p style="font-size: 12px; color: #777;">
                You're receiving this because you're registered with Blood Bridge.
              </p>
            </div>
        `,
        text: `New Event: ${event.title}\n\nDate: ${new Date(event.date).toLocaleDateString()}\nLocation: ${event.location}\n\n${event.description}\n\nOrganized by: ${event.organizer}`
    })
};

module.exports = emailTemplates;
