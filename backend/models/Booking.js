import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  machineType: {
    type: String,
    trim: true
  },
  machineBrand: {
    type: String,
    trim: true
  },
  serviceType: {
    type: String,
    required: [true, 'Service type is required'],
    enum: [
      'Machine Performance Testing',
      'Machine Health Checkup',
      'Retrofitting & Reconditioning',
      'Preventive Maintenance',
      'Breakdown Maintenance',
      'Cooling System Service',
      'Power Optimization',
      'Other'
    ]
  },
  preferredDate: {
    type: Date
  },
  preferredTime: {
    type: String
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking
