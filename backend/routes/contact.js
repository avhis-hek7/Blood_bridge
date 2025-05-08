const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: "asushant603@gmail.com",
    pass: "keax hacx nque facy"
  }
});

// @route   POST api/contact
// @desc    Submit a contact form
// @access  Public
router.post(
  '/',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('message', 'Message is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        message
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/contact
// @desc    Get all contact submissions (for admin)
// @access  Private
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/contact/:id
// @desc    Get single contact submission
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Contact not found' });
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/contact/:id/respond
// @desc    Respond to a contact submission
// @access  Private
router.put(
  '/:id/respond',
  [
    body('response', 'Response is required').not().isEmpty(),
    body('status', 'Status is required').isIn(['pending', 'responded', 'resolved'])
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) return res.status(404).json({ msg: 'Contact not found' });

      const { response, status } = req.body;

      // Send response email
      const mailOptions = {
        from: '"Blood_Bridge" <asushant603@gmail.com>',
        to: contact.email,
        subject: "Response to your message",
        text: response
      };

      await transporter.sendMail(mailOptions);

      // Update DB
      contact.response = response;
      contact.status = status;
      contact.respondedAt = Date.now();
      await contact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/contact/:id
// @desc    Delete a contact submission
// @access  Private
// router.delete('/:id', async (req, res) => {
//   try {
//     const contact = await Contact.findById(req.params.id);
//     if (!contact) return res.status(404).json({ msg: 'Contact not found' });

//     await contact.remove();
//     res.json({ msg: 'Contact removed' });
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Contact not found' });
//     res.status(500).send('Server Error');
//   }
// });
// @route   DELETE api/contact/:id
// @desc    Delete a contact submission
// @access  Private (admin)
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    // Use findByIdAndDelete instead of remove
    await Contact.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Contact not found' });
    }
    res.status(500).send('Server Error');
  }
});


module.exports = router;
