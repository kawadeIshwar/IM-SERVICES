const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  otp: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    enum: ['password_reset', 'email_verification'],
    default: 'password_reset'
  },
  expiresAt: {
    type: Date,
    required: true,
    // OTP expires in 10 minutes
    default: () => new Date(Date.now() + 10 * 60 * 1000)
  },
  isUsed: {
    type: Boolean,
    default: false
  },
  attempts: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index to automatically delete expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Method to verify OTP
otpSchema.methods.isValid = function() {
  return !this.isUsed && this.expiresAt > new Date() && this.attempts < 3;
};

module.exports = mongoose.model('OTP', otpSchema);
