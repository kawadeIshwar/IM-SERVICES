const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const nodemailer = require('nodemailer');

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Validation middleware
const bookingValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('serviceType').notEmpty().withMessage('Service type is required'),
  body('preferredDate').isISO8601().withMessage('Valid date is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('city').trim().notEmpty().withMessage('City is required')
];

// Create a new booking
router.post('/', bookingValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create new booking
    const booking = new Booking(req.body);
    await booking.save();

    // Send email notification
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: `New Service Booking - ${booking.serviceType}`,
        html: `
          <h2>New Service Booking Received</h2>
          <p><strong>Customer Name:</strong> ${booking.name}</p>
          <p><strong>Email:</strong> ${booking.email}</p>
          <p><strong>Phone:</strong> ${booking.phone}</p>
          <p><strong>Company:</strong> ${booking.company || 'N/A'}</p>
          <hr>
          <p><strong>Service Type:</strong> ${booking.serviceType}</p>
          <p><strong>Preferred Date:</strong> ${new Date(booking.preferredDate).toLocaleDateString()}</p>
          <p><strong>Preferred Time:</strong> ${booking.preferredTime || 'N/A'}</p>
          <p><strong>Urgency:</strong> ${booking.urgency}</p>
          <hr>
          <p><strong>Machine Type:</strong> ${booking.machineType || 'N/A'}</p>
          <p><strong>Machine Brand:</strong> ${booking.machineBrand || 'N/A'}</p>
          <p><strong>Machine Model:</strong> ${booking.machineModel || 'N/A'}</p>
          <hr>
          <p><strong>Address:</strong> ${booking.address}</p>
          <p><strong>City:</strong> ${booking.city}</p>
          <p><strong>State:</strong> ${booking.state}</p>
          <p><strong>Pincode:</strong> ${booking.pincode || 'N/A'}</p>
          <hr>
          <p><strong>Message:</strong> ${booking.message || 'N/A'}</p>
        `
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Booking created successfully. We will contact you soon!',
      booking: booking
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking. Please try again.',
      error: error.message
    });
  }
});

// Get all bookings (for admin panel - optional)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
