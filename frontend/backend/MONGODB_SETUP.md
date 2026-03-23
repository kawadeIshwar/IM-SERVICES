# MongoDB Atlas Configuration

## ✅ Your MongoDB Connection Details

Your MongoDB Atlas cluster is ready! Here's your connection string:

```
mongodb+srv://imservices:Kd4leH1iPRPSj7fZ@imservices.gitkl0u.mongodb.net/?appName=IMservices
```

---

## 🔧 Setup Instructions

### Step 1: Create `.env` File

In the `backend` folder, create a file named `.env` (if it doesn't exist already):

```bash
cd backend
```

Create the file with the following content:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://imservices:Kd4leH1iPRPSj7fZ@imservices.gitkl0u.mongodb.net/imservices?retryWrites=true&w=majority

# JWT Secret (for authentication)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-5f9a2b3c4d5e6f7g8h9i0j1k2l3m4n5o

# Email Configuration (optional - for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=imservices4444@gmail.com

# Admin Email
ADMIN_EMAIL=imservices4444@gmail.com
```

### Step 2: Generate Strong JWT Secret (Optional but Recommended)

You can generate a secure JWT secret using Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output and replace the `JWT_SECRET` value in your `.env` file.

---

## 🚀 Quick Start

### 1. Install Dependencies (if not already done)
```bash
cd backend
npm install
```

### 2. Create Admin User
```bash
node scripts/createAdmin.js
```

You should see:
```
✅ Connected to MongoDB
✅ Admin user created successfully!
📧 Email:    admin@imservices.com
🔑 Password: admin123456
```

### 3. Start Backend Server
```bash
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Server is running on port 5000
```

### 4. Test Connection

Open your browser or Postman and test:
```
http://localhost:5000/api/health
```

You should get:
```json
{
  "status": "OK",
  "message": "IM Services API is running"
}
```

---

## 📊 MongoDB Atlas Dashboard

Access your MongoDB Atlas dashboard at:
https://cloud.mongodb.com/

### What You Can Do:
- ✅ View your database collections
- ✅ Monitor database performance
- ✅ Manage users and permissions
- ✅ Set up backup and restore
- ✅ View connection logs

---

## 🗄️ Database Structure

After running the app, these collections will be created automatically:

### Collections:
1. **users** - User accounts (clients and admins)
2. **servicerequests** - Service requests with tracking
3. **bookings** - Existing booking system
4. **contacts** - Contact form submissions

---

## ✅ Verify MongoDB Connection

### Method 1: Check Server Logs
When you start the server, you should see:
```
✅ Connected to MongoDB
```

### Method 2: Test User Creation
```bash
node scripts/createAdmin.js
```

If successful, your MongoDB connection is working!

### Method 3: MongoDB Compass (GUI Tool)

1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Use this connection string:
   ```
   mongodb+srv://imservices:Kd4leH1iPRPSj7fZ@imservices.gitkl0u.mongodb.net/
   ```
3. Connect and browse your database visually

---

## 🔒 Security Notes

### Important Security Practices:

1. ✅ **Never commit `.env` file** to Git (already in .gitignore)
2. ✅ **Change default admin password** after first login
3. ✅ **Use strong JWT secret** in production
4. ✅ **Rotate database password** periodically
5. ✅ **Enable IP whitelist** in MongoDB Atlas for production
6. ✅ **Use environment-specific** connection strings

### Production Recommendations:

1. Create separate MongoDB cluster for production
2. Use different credentials for dev and prod
3. Enable MongoDB Atlas backup
4. Set up monitoring and alerts
5. Use connection pooling
6. Enable SSL/TLS encryption

---

## 🐛 Troubleshooting

### Issue: "MongoServerError: bad auth"
**Solution:** Check username and password in connection string

### Issue: "Connection timeout"
**Solution:** 
1. Check internet connection
2. Verify IP address is whitelisted in MongoDB Atlas
3. Check firewall settings

### Issue: "Database not found"
**Solution:** Add database name to connection string:
```
mongodb+srv://imservices:Kd4leH1iPRPSj7fZ@imservices.gitkl0u.mongodb.net/imservices?retryWrites=true&w=majority
```

### Issue: "MongooseServerSelectionError"
**Solution:**
1. Ensure MongoDB Atlas cluster is running
2. Check network access settings in Atlas
3. Verify connection string is correct

---

## 🔍 Check Current Configuration

Run this command to verify your environment variables are loaded:

```bash
node -e "require('dotenv').config(); console.log('MongoDB URI:', process.env.MONGODB_URI ? '✅ Configured' : '❌ Missing');"
```

---

## 📝 Connection String Breakdown

```
mongodb+srv://     → Protocol (MongoDB Atlas)
imservices         → Username
:Kd4leH1iPRPSj7fZ → Password
@imservices.gitkl0u.mongodb.net → Cluster address
/imservices        → Database name
?retryWrites=true&w=majority → Options
```

---

## 🎯 Next Steps

1. ✅ Create `.env` file with MongoDB URI
2. ✅ Install dependencies: `npm install`
3. ✅ Create admin user: `node scripts/createAdmin.js`
4. ✅ Start backend: `npm run dev`
5. ✅ Test API: `http://localhost:5000/api/health`
6. ✅ Start frontend and test full application

---

**You're all set with MongoDB Atlas!** 🚀

Your database is cloud-hosted, automatically backed up, and accessible from anywhere!
