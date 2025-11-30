const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// CORS Configuration - allows both local development and production
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173', // Vite default port
  'https://im-services-frontend.onrender.com',
  process.env.FRONTEND_URL // Set this to your Netlify URL in Render environment variables
].filter(Boolean); // Remove undefined values

// Also allow any Netlify subdomain for easier deployment
const isNetlifyUrl = (origin) => {
  return origin && (origin.endsWith('.netlify.app') || origin.endsWith('.netlify.com'));
};

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list, is development, or is a Netlify URL
    if (allowedOrigins.indexOf(origin) !== -1 || 
        process.env.NODE_ENV === 'development' ||
        isNetlifyUrl(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

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
