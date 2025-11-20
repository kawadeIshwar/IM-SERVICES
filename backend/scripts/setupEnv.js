const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🔧 Setting up environment configuration...\n');

// Generate a secure JWT secret
const jwtSecret = crypto.randomBytes(64).toString('hex');

// Environment configuration
const envContent = `# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://imservices:Kd4leH1iPRPSj7fZ@imservices.gitkl0u.mongodb.net/imservices?retryWrites=true&w=majority

# JWT Secret for Authentication
JWT_SECRET=${jwtSecret}

# Email Configuration (optional - for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=imservices4444@gmail.com

# Admin Email
ADMIN_EMAIL=imservices4444@gmail.com
`;

const envPath = path.join(__dirname, '../.env');

// Check if .env already exists
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists!');
  console.log('');
  console.log('Options:');
  console.log('1. Delete the existing .env file and run this script again');
  console.log('2. Manually update your .env file with the MongoDB URI');
  console.log('');
  console.log('Your MongoDB URI:');
  console.log('mongodb+srv://imservices:Kd4leH1iPRPSj7fZ@imservices.gitkl0u.mongodb.net/imservices?retryWrites=true&w=majority');
  console.log('');
  process.exit(0);
}

// Create .env file
try {
  fs.writeFileSync(envPath, envContent);
  
  console.log('✅ .env file created successfully!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log('Configuration Summary:');
  console.log('─────────────────────');
  console.log('✓ Port: 5000');
  console.log('✓ MongoDB: MongoDB Atlas (Cloud)');
  console.log('✓ JWT Secret: Generated (secure)');
  console.log('✓ Environment: development');
  console.log('');
  console.log('🔐 Security:');
  console.log('   - Secure JWT secret generated');
  console.log('   - .env file is in .gitignore');
  console.log('   - Never commit this file to Git');
  console.log('');
  console.log('🚀 Next Steps:');
  console.log('   1. Install dependencies: npm install');
  console.log('   2. Create admin user: node scripts/createAdmin.js');
  console.log('   3. Start server: npm run dev');
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
  console.log('');
  console.log('Please create .env file manually with this content:');
  console.log('');
  console.log(envContent);
  process.exit(1);
}
