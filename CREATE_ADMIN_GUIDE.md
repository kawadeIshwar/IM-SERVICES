# How to Create an Admin Profile

## 🔐 Admin Account Creation Methods

Since all new signups default to `role: "client"`, you need to manually create or upgrade an account to admin status.

---

## Method 1: Create Admin via MongoDB Shell (Recommended)

### Step 1: Start MongoDB Shell
```bash
mongosh
```

### Step 2: Connect to Your Database
```bash
use imservices
```

### Step 3: Create Admin User with Hashed Password

First, you need to hash a password. You can use this Node.js script:

**Create file: `backend/scripts/createAdmin.js`**
```javascript
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/imservices');
    
    const User = require('../models/User');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@imservices.com' });
    if (existingAdmin) {
      console.log('❌ Admin user already exists!');
      process.exit(0);
    }
    
    // Create new admin
    const admin = new User({
      name: 'Admin User',
      email: 'admin@imservices.com',
      password: 'admin123456', // Will be hashed automatically by pre-save hook
      role: 'admin',
      company: 'IM Services',
      phone: '+91 98765 43210',
      address: 'Pune, Maharashtra',
      isActive: true
    });
    
    await admin.save();
    
    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@imservices.com');
    console.log('Password: admin123456');
    console.log('⚠️ PLEASE CHANGE THIS PASSWORD AFTER FIRST LOGIN!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
```

### Step 4: Run the Script
```bash
cd backend
node scripts/createAdmin.js
```

### Step 5: Login as Admin
- Go to: `http://localhost:5173/login`
- Email: `admin@imservices.com`
- Password: `admin123456`
- **IMPORTANT: Change password immediately after login!**

---

## Method 2: Upgrade Existing User to Admin

### Option A: Using MongoDB Shell
```bash
mongosh

use imservices

# Find user by email
db.users.findOne({ email: "user@example.com" })

# Update user role to admin
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "admin" } }
)

# Verify the update
db.users.findOne({ email: "user@example.com" })
```

### Option B: Using MongoDB Compass (GUI)
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Open database: `imservices`
4. Open collection: `users`
5. Find the user you want to make admin
6. Click on the document
7. Change `"role": "client"` to `"role": "admin"`
8. Click "Update"

---

## Method 3: Direct Insert via MongoDB Shell

```bash
mongosh

use imservices

# Insert admin user directly (password must be pre-hashed)
db.users.insertOne({
  name: "Admin User",
  email: "admin@imservices.com",
  password: "$2a$10$XYZ...", // Use bcrypt to hash "admin123456"
  role: "admin",
  company: "IM Services",
  phone: "+91 98765 43210",
  address: "Pune, Maharashtra",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

**To hash password using Node.js:**
```javascript
const bcrypt = require('bcryptjs');
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash('admin123456', salt);
console.log(hashedPassword);
```

---

## Method 4: Create Admin Signup Endpoint (Development Only)

⚠️ **WARNING: Only use in development, remove before production!**

**Add to `backend/routes/auth.js`:**
```javascript
// DEVELOPMENT ONLY - Remove before production
router.post('/signup-admin', [
  body('name').trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('adminSecret').equals(process.env.ADMIN_SECRET || 'supersecret123')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password, company, phone, address } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists' 
      });
    }

    const user = new User({
      name,
      email,
      password,
      company,
      phone,
      address,
      role: 'admin' // Create as admin
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      token,
      user: user.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});
```

**Add to `.env`:**
```env
ADMIN_SECRET=your-super-secret-admin-key-12345
```

**Use Postman to create admin:**
```http
POST http://localhost:5000/api/auth/signup-admin
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@imservices.com",
  "password": "admin123456",
  "company": "IM Services",
  "phone": "+91 98765 43210",
  "adminSecret": "your-super-secret-admin-key-12345"
}
```

---

## Quick Start Instructions

### Easiest Method (Recommended):

1. **Signup normally** through the website as a regular user
2. **Open MongoDB Compass** or use mongosh
3. **Find your user** in the `users` collection
4. **Change `role` from `"client"` to `"admin"`**
5. **Logout and login again** - you're now an admin!

---

## Verify Admin Access

After creating admin, verify by:

1. **Login** with admin credentials
2. **Check role** in browser console:
   ```javascript
   console.log(JSON.parse(localStorage.getItem('user')).role);
   // Should output: "admin"
   ```
3. **Try accessing** admin routes (should work)
4. **Check navbar** - should see admin-specific options

---

## Admin vs Client Differences

| Feature | Client | Admin |
|---------|--------|-------|
| View own requests | ✅ | ✅ |
| View all requests | ❌ | ✅ |
| Update request status | ❌ | ✅ |
| Assign requests | ❌ | ✅ |
| Bulk actions | ❌ | ✅ |
| Generate reports | ❌ | ✅ |
| Export CSV | ❌ | ✅ |
| Archive requests | ❌ | ✅ |
| Dashboard stats | ❌ | ✅ |

---

## Security Best Practices

1. ✅ **Change default password** immediately
2. ✅ **Use strong passwords** (12+ characters)
3. ✅ **Limit admin accounts** to necessary personnel only
4. ✅ **Remove admin signup endpoint** before production
5. ✅ **Use environment variables** for sensitive data
6. ✅ **Enable 2FA** in production (future enhancement)
7. ✅ **Log admin actions** for audit trail

---

## Testing Admin Features

After creating admin account:

### 1. Test Dashboard Access
```
http://localhost:5173/admin/dashboard
```

### 2. Test API Endpoints (Postman)
```http
GET http://localhost:5000/api/service-requests/stats
Authorization: Bearer <admin_token>
```

### 3. Test Status Updates
```http
PUT http://localhost:5000/api/service-requests/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "in_progress",
  "notes": "Work started"
}
```

---

## Troubleshooting

### Issue: "Access denied. Admin privileges required"
**Solution:** Check user role in database
```bash
mongosh
use imservices
db.users.findOne({ email: "your@email.com" }, { role: 1 })
```

### Issue: Token not working
**Solution:** Clear localStorage and login again
```javascript
localStorage.clear();
// Then login again
```

### Issue: Can't connect to MongoDB
**Solution:** Ensure MongoDB is running
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

---

## Default Admin Credentials (if using script)

```
Email: admin@imservices.com
Password: admin123456

⚠️ CHANGE IMMEDIATELY AFTER FIRST LOGIN!
```

---

## Next Steps After Creating Admin

1. ✅ Login as admin
2. ✅ Change password via profile settings
3. ✅ Create service requests (as test)
4. ✅ Update request statuses
5. ✅ Generate reports
6. ✅ Test bulk actions
7. ✅ Export CSV data
8. ✅ Archive old requests

---

## Support

If you encounter issues:
1. Check MongoDB connection
2. Verify user role in database
3. Clear browser cache/localStorage
4. Check backend logs
5. Verify JWT token is valid

---

**You're all set to use the admin features!** 🚀
