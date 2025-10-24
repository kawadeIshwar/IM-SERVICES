# IM SERVICES - Quick Setup Guide

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### Step 2: Configure Environment

Create a `.env` file in the `backend` folder with:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/imservices
NODE_ENV=development

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=imservices4444@gmail.com
EMAIL_PASS=your-gmail-app-password-here
EMAIL_FROM=imservices4444@gmail.com
ADMIN_EMAIL=imservices4444@gmail.com
```

### Step 3: Start MongoDB

**Option A - Local MongoDB:**
```bash
mongod
```

**Option B - MongoDB Atlas (Recommended):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string
4. Replace `MONGODB_URI` in `.env` with your connection string

### Step 4: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend running on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Frontend running on http://localhost:3000

### Step 5: Open in Browser

Visit: **http://localhost:3000**

---

## 📧 Email Setup (Gmail)

To enable email notifications for bookings and contact forms:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account → Security
   - Select "2-Step Verification"
   - Scroll to "App passwords"
   - Generate password for "Mail"
3. **Update `.env`** with the 16-character app password

---

## 🔧 Troubleshooting

### MongoDB Connection Error
```bash
# Install MongoDB locally or use MongoDB Atlas
# Make sure MongoDB service is running
```

### Port Already in Use
```bash
# Change PORT in backend/.env to different number (e.g., 5001)
# Change port in frontend/vite.config.js proxy settings
```

### Email Not Sending
- Check Gmail App Password is correct
- Verify 2FA is enabled on Gmail
- Check EMAIL_USER and EMAIL_PASS in .env

### Module Not Found
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

---

## 📱 Testing the Website

1. **Home Page** - Check hero section, animations, stats
2. **Services** - Verify all 6 services display correctly
3. **Booking Form** - Submit test booking (check MongoDB & email)
4. **Contact Form** - Send test message (check MongoDB & email)
5. **Gallery** - Test category filters
6. **FAQ** - Test accordion functionality
7. **Mobile View** - Test responsive design

---

## 🎨 Customization Quick Tips

### Change Company Phone Numbers
Edit: `frontend/src/components/Footer.jsx` and `Contact.jsx`

### Update Services
Edit: `frontend/src/pages/Services.jsx` - modify `services` array

### Change Colors
Edit: `frontend/tailwind.config.js` - update color palette

### Add Images
Replace placeholder image URLs in pages with your actual images

---

## 📦 Production Deployment

### Frontend (Vercel - Free)
```bash
cd frontend
npm run build
# Upload 'dist' folder to Vercel
```

### Backend (Render - Free)
1. Push code to GitHub
2. Connect Render to your repo
3. Add environment variables
4. Deploy

### Database (MongoDB Atlas - Free)
- Already cloud-based if using Atlas
- No additional setup needed

---

## ✅ Checklist

- [ ] Dependencies installed (frontend & backend)
- [ ] .env file created with correct values
- [ ] MongoDB running (local or Atlas)
- [ ] Backend server started (port 5000)
- [ ] Frontend dev server started (port 3000)
- [ ] Website opens in browser
- [ ] Test booking form submission
- [ ] Test contact form submission
- [ ] Check email notifications work
- [ ] Test on mobile device

---

## 🆘 Need Help?

**Contact:**
- Email: imservices4444@gmail.com
- Phone: +91 9730992561

**Common Issues:**
- MongoDB not connecting → Use MongoDB Atlas
- Email not sending → Check Gmail App Password
- Port conflict → Change port in .env
- Build errors → Delete node_modules and reinstall

---

**Ready to go! 🚀**

Your professional IM Services website is now running!
