# 🚀 Quick Start Guide - IM Services Process Tracking

## ⚡ Fast Setup (5 Minutes)

### Step 1: Setup Environment Configuration
```bash
cd backend
node scripts/setupEnv.js
```

This will automatically create your `.env` file with:
- ✅ Your MongoDB Atlas connection
- ✅ Secure JWT secret
- ✅ All necessary configurations

### Step 2: Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend (in a new terminal)
cd frontend
npm install axios
```

### Step 3: Create Admin Account
```bash
cd backend
node scripts/createAdmin.js
```

**Admin Credentials Created:**
- Email: `admin@imservices.com`
- Password: `admin123456`

### Step 4: Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 5: Login & Test
1. Open browser: `http://localhost:5173`
2. Click "Login" in navbar
3. Use admin credentials
4. You're in! 🎉

---

## 📋 What You Now Have

### ✅ Backend (Complete)
- MongoDB Atlas cloud database
- User authentication (JWT)
- Service request tracking (4-step workflow)
- File upload system
- Report generation
- CSV export
- SLA tracking
- Bulk actions
- Audit logs

### ✅ Frontend (Partial)
- Login page ✅
- Signup page ✅
- Profile page ✅
- Home page ✅
- Navbar with auth links ✅

### ⏳ Still to Build
- Admin Dashboard
- Client Dashboard
- Service Request Form
- Request Detail Page
- Report Viewer

---

## 🔗 Important URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | Main application |
| Backend | http://localhost:5000 | API server |
| API Health | http://localhost:5000/api/health | Check if API is running |
| MongoDB Atlas | https://cloud.mongodb.com | Database dashboard |

---

## 🧪 Test the System

### 1. Test Backend API
```bash
# Health check
curl http://localhost:5000/api/health

# Signup new user
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@test.com",
    "password": "123456",
    "company": "Test Co"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@imservices.com",
    "password": "admin123456"
  }'
```

### 2. Test Frontend
1. Go to `http://localhost:5173`
2. Click "Sign Up" and create an account
3. Logout
4. Login with admin credentials
5. Check profile page

---

## 📊 Database Collections

After setup, your MongoDB Atlas will have these collections:

```
imservices/
├── users              (Authentication & profiles)
├── servicerequests    (Service tracking)
├── bookings           (Existing system)
└── contacts           (Contact forms)
```

View them in MongoDB Atlas: https://cloud.mongodb.com

---

## 🔐 Security Checklist

- ✅ `.env` file is in `.gitignore`
- ✅ JWT secret is auto-generated
- ✅ Passwords are hashed with bcrypt
- ✅ MongoDB uses secure connection (SSL)
- ⚠️ Change admin password after first login
- ⚠️ Don't share your MongoDB credentials

---

## 🛠️ Available Scripts

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server (nodemon)
node scripts/createAdmin.js    # Create admin user
node scripts/setupEnv.js       # Setup environment
```

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

---

## 📱 Application Flow

### For Clients:
1. Sign up → Login
2. Create service request
3. Track request status
4. Download report when completed

### For Admins:
1. Login with admin account
2. View all service requests
3. Update request statuses
4. Assign requests to technicians
5. Generate reports
6. Export data to CSV

---

## 🐛 Common Issues & Solutions

### Issue: MongoDB connection error
```
Solution: 
1. Check internet connection
2. Verify MongoDB URI in .env
3. Ensure MongoDB Atlas cluster is running
```

### Issue: "Port already in use"
```
Solution:
# Kill process on port 5000
Windows: netstat -ano | findstr :5000
         taskkill /PID <PID> /F

# Or change PORT in .env to 5001
```

### Issue: Admin creation fails
```
Solution:
1. Ensure MongoDB is connected
2. Check if admin already exists
3. Delete existing admin in MongoDB Compass
```

### Issue: Frontend can't connect to backend
```
Solution:
1. Check backend is running on port 5000
2. Verify VITE_API_URL in frontend/.env
3. Check for CORS errors in browser console
```

---

## 📝 Environment Variables

### Backend `.env`
```env
PORT=5000
MONGODB_URI=mongodb+srv://imservices:...
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Frontend `.env` (create this)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🎯 Next Development Steps

1. **Create Admin Dashboard**
   - Stats cards (requests by status)
   - Recent activity feed
   - Quick actions

2. **Create Client Dashboard**
   - My requests list
   - Create new request button
   - Recent reports

3. **Build Service Request Form**
   - Service type selection
   - Machine details
   - File upload

4. **Add Request Detail Page**
   - Status timeline
   - Notes section
   - File attachments

5. **Create Report Viewer**
   - PDF preview
   - Download button
   - Email option

---

## 📚 Documentation

- `PROCESS_TRACKING_IMPLEMENTATION.md` - Complete API documentation
- `CREATE_ADMIN_GUIDE.md` - Admin account creation
- `MONGODB_SETUP.md` - MongoDB configuration
- `QUICK_START.md` - This file

---

## 🆘 Need Help?

1. Check documentation files
2. Review error logs
3. Test API endpoints with Postman
4. Check MongoDB Atlas logs
5. Verify environment variables

---

## ✅ Success Checklist

After setup, verify:
- [ ] Backend server starts without errors
- [ ] MongoDB connection successful
- [ ] Admin user created
- [ ] Frontend loads in browser
- [ ] Can signup new user
- [ ] Can login as admin
- [ ] Profile page displays data
- [ ] API health check returns OK

---

**You're ready to build! Start with creating the dashboards.** 🚀

Happy coding! 💻
