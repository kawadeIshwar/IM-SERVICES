const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No authentication token provided' 
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user || !user.isActive) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token or user not found' 
      });
    }
    
    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token',
      error: error.message 
    });
  }
};

// Check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ 
        success: false, 
        message: 'Access denied. Admin privileges required.' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Authorization error',
      error: error.message 
    });
  }
};

// Check if user is client or admin
const isClientOrAdmin = async (req, res, next) => {
  try {
    if (req.user && (req.user.role === 'client' || req.user.role === 'admin')) {
      next();
    } else {
      res.status(403).json({ 
        success: false, 
        message: 'Access denied' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Authorization error',
      error: error.message 
    });
  }
};

module.exports = { auth, isAdmin, isClientOrAdmin };
