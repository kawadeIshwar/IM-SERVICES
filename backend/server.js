const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const bookingRoutes = require('./routes/booking');
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');
const serviceRequestRoutes = require('./routes/serviceRequest');
const reportRoutes = require('./routes/reports');
const processTrackingRoutes = require('./routes/processTracking');

app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/service-requests', serviceRequestRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/process-tracking', processTrackingRoutes);

// Serve uploaded files
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'IM Services API is running' });
});

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/imservices';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  // Start server even if MongoDB is not connected (for development)
  app.listen(PORT, () => {
    console.log(`⚠️ Server is running on port ${PORT} (MongoDB not connected)`);
  });
});
