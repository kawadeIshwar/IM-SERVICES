import express from 'express'
import { body, validationResult } from 'express-validator'
import Booking from '../models/Booking.js'
import { sendBookingEmail } from '../utils/emailService.js'

const router = express.Router()

// Validation middleware
const bookingValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('serviceType').trim().notEmpty().withMessage('Service type is required')
]

// Create new booking
router.post('/', bookingValidation, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      })
    }

    // Create booking
    const booking = new Booking(req.body)
    await booking.save()

    // Send email notification
    try {
      await sendBookingEmail(booking)
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Booking request submitted successfully',
      data: booking
    })
  } catch (error) {
    console.error('Booking creation error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message
    })
  }
})

// Get all bookings (admin)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 })
    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    })
  } catch (error) {
    console.error('Fetch bookings error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    })
  }
})

// Get single booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      })
    }

    res.json({
      success: true,
      data: booking
    })
  } catch (error) {
    console.error('Fetch booking error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking',
      error: error.message
    })
  }
})

// Update booking status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    
    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      })
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      })
    }

    res.json({
      success: true,
      message: 'Booking status updated',
      data: booking
    })
  } catch (error) {
    console.error('Update booking error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update booking',
      error: error.message
    })
  }
})

// Delete booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id)

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      })
    }

    res.json({
      success: true,
      message: 'Booking deleted successfully'
    })
  } catch (error) {
    console.error('Delete booking error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete booking',
      error: error.message
    })
  }
})

export default router
