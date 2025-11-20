const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();

async function createAdmin() {
  try {
    console.log('🔧 Connecting to MongoDB...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/imservices', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('✅ Connected to MongoDB');
    
    const User = require('../models/User');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@imservices.com' });
    if (existingAdmin) {
      console.log('');
      console.log('❌ Admin user already exists!');
      console.log('Email:', existingAdmin.email);
      console.log('Role:', existingAdmin.role);
      console.log('');
      console.log('To reset password, use MongoDB Compass or delete this user first.');
      await mongoose.connection.close();
      process.exit(0);
    }
    
    console.log('👤 Creating admin user...');
    
    // Create new admin
    const admin = new User({
      name: 'Admin User',
      email: 'admin@imservices.com',
      password: 'admin123456', // Will be hashed automatically by pre-save hook
      role: 'admin',
      company: 'IM Services',
      phone: '+91 98765 43210',
      address: 'Pune, Maharashtra, India',
      isActive: true
    });
    
    await admin.save();
    
    console.log('');
    console.log('✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:    admin@imservices.com');
    console.log('🔑 Password: admin123456');
    console.log('👤 Role:     admin');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('⚠️  IMPORTANT: Change this password after first login!');
    console.log('');
    console.log('🚀 Next Steps:');
    console.log('   1. Start your frontend: npm run dev (in frontend folder)');
    console.log('   2. Go to: http://localhost:5173/login');
    console.log('   3. Login with above credentials');
    console.log('   4. Change password in profile settings');
    console.log('');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('');
    console.error('❌ Error creating admin:', error.message);
    console.error('');
    
    if (error.code === 11000) {
      console.error('User with this email already exists!');
    }
    
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run the function
createAdmin();
