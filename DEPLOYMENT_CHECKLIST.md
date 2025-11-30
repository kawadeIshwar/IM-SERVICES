# ✅ Render Deployment Checklist

Use this checklist to ensure smooth deployment of your IM Services website.

---

## 📋 Pre-Deployment Checklist

### 1. MongoDB Atlas Setup
- [ ] Created MongoDB Atlas account
- [ ] Created free M0 cluster
- [ ] Created database user with password
- [ ] Configured network access (0.0.0.0/0)
- [ ] Got connection string
- [ ] Replaced `<password>` in connection string
- [ ] Added `/imservices` database name to connection string

**Connection String Format:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/imservices?retryWrites=true&w=majority
```

---

### 2. Gmail App Password Setup
- [ ] Gmail 2-Factor Authentication enabled
- [ ] Generated App Password
- [ ] Copied 16-character password (removed spaces)
- [ ] Have Gmail address ready

---

### 3. GitHub Repository
- [ ] All code committed
- [ ] All changes pushed to `main` branch
- [ ] `render.yaml` file exists in root
- [ ] Repository is accessible (public or Render has access)

**Push to GitHub:**
```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

---

## 🚀 Deployment Steps

### Step 1: Create Render Account
- [ ] Signed up at https://dashboard.render.com
- [ ] Connected GitHub account
- [ ] Authorized Render to access repositories

---

### Step 2: Deploy via Blueprint
- [ ] Clicked "New +" → "Blueprint"
- [ ] Selected IM_SERVICES repository
- [ ] Named blueprint: "IM Services"
- [ ] Clicked "Apply"
- [ ] Both services created (backend + frontend)

---

### Step 3: Configure Backend Environment
- [ ] Opened `im-services-backend` service
- [ ] Clicked "Environment" tab
- [ ] Added `MONGODB_URI` with connection string
- [ ] Added `EMAIL_USER` with Gmail address
- [ ] Added `EMAIL_PASS` with App Password (no spaces)
- [ ] Added `EMAIL_FROM` with Gmail address
- [ ] Added `ADMIN_EMAIL` with Gmail address
- [ ] Clicked "Save Changes"
- [ ] Waited for automatic redeploy (~3 mins)

**Environment Variables:**
```
MONGODB_URI = mongodb+srv://...
EMAIL_USER = your-email@gmail.com
EMAIL_PASS = abcdabcdabcdabcd (16 chars, no spaces)
EMAIL_FROM = your-email@gmail.com
ADMIN_EMAIL = your-email@gmail.com
```

---

### Step 4: Wait for Deployment
- [ ] Backend service shows "Live" status
- [ ] Frontend service shows "Live" status
- [ ] No error logs visible

**Typical deployment time:** 5-8 minutes total

---

## ✅ Post-Deployment Testing

### Backend Health Check
- [ ] Visited: `https://im-services-backend.onrender.com/api/health`
- [ ] Received response: `{"status": "OK", "message": "IM Services API is running"}`

---

### Frontend Testing
- [ ] Visited: `https://im-services-frontend.onrender.com`
- [ ] Homepage loads correctly
- [ ] All images visible
- [ ] Navigation works
- [ ] Dark mode toggle works
- [ ] Mobile responsive design works

---

### Feature Testing
- [ ] **Sign Up**
  - Created new account
  - Received success message
  
- [ ] **Login**
  - Logged in with new account
  - Redirected to profile/dashboard
  
- [ ] **Booking Form** (requires login)
  - Submitted test booking
  - Form validation works
  - Received success message
  - Got email notification
  
- [ ] **Contact Form**
  - Submitted test message
  - Form validation works
  - Received success message
  - Got email notification
  
- [ ] **Admin Dashboard** (if admin account exists)
  - Logged in as admin
  - Can view bookings
  - Can view contacts
  - Can update statuses

---

## 🌐 Your Live URLs

**Frontend (Main Website):**
```
https://im-services-frontend.onrender.com
```

**Backend API:**
```
https://im-services-backend.onrender.com
```

**API Health Check:**
```
https://im-services-backend.onrender.com/api/health
```

---

## 📝 Save These Details

```
DEPLOYMENT INFORMATION
========================

Frontend URL: https://im-services-frontend.onrender.com
Backend URL: https://im-services-backend.onrender.com

MongoDB Atlas:
- Cluster: [Your cluster name]
- Database: imservices
- Username: [Your username]

Gmail Configuration:
- Email: [Your Gmail]
- App Password: [Saved securely]

Render Dashboard:
- https://dashboard.render.com
- Account: [Your GitHub account]
```

---

## 🔄 Update/Redeploy

To update your live website:

```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push origin main
```

✅ Render automatically detects and redeploys (~3-5 mins)

---

## ⚠️ Important Notes

### Free Tier Limitations
- **Backend**: Spins down after 15 minutes of inactivity
  - First request takes 30-60 seconds (cold start)
  - Use UptimeRobot to keep it awake (optional)

- **Frontend**: Always online, no spin-down
  - 100GB bandwidth/month

- **MongoDB**: 512MB storage on free tier

### Security Reminders
- [ ] Never commit `.env` files
- [ ] Keep App Passwords secure
- [ ] Use strong database passwords
- [ ] Monitor usage in Render dashboard

---

## 🆘 Troubleshooting

### Backend Won't Start
1. Check all environment variables are set
2. View logs in Render dashboard
3. Verify MongoDB connection string format
4. Test MongoDB connection separately

### Frontend API Errors
1. Confirm backend is running (check health endpoint)
2. Verify `VITE_API_URL` matches backend URL
3. Check browser console for errors
4. Review CORS settings in backend

### Emails Not Sending
1. Verify Gmail App Password (no spaces)
2. Confirm 2FA is enabled on Gmail
3. Check backend logs for email errors
4. Test with simple email first

### Slow Performance
1. Normal for first request (cold start)
2. Consider paid plan ($7/month) for always-on backend
3. Use UptimeRobot to keep backend awake

---

## 📞 Need Help?

- **Render Support**: https://render.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Project Support**: imservices4444@gmail.com

---

## 🎉 Congratulations!

Your IM Services website is now live and accessible worldwide!

**Share your website:** `https://im-services-frontend.onrender.com`

### Next Steps:
- [ ] Add custom domain (optional)
- [ ] Set up UptimeRobot monitoring (optional)
- [ ] Share URL with clients
- [ ] Monitor traffic in Render dashboard
- [ ] Consider upgrading for better performance

---

**Deployment Date:** _______________

**Deployed By:** _______________

**Status:** ✅ Successfully Deployed
