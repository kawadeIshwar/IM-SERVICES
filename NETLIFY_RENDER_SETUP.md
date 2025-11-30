# 🚀 Netlify Frontend + Render Backend Setup

Your IM Services deployment configuration for:
- **Frontend**: Netlify (Already deployed ✅)
- **Backend**: Render (To be deployed)

---

## ✅ What's Already Done

Your backend has been updated to automatically allow all Netlify URLs (*.netlify.app, *.netlify.com), so no manual CORS configuration is needed!

---

## 🎯 Deploy Backend to Render (5 minutes)

### Step 1: Push Updated Code to GitHub

```bash
cd "c:\Users\kawad\OneDrive\Desktop\IM_SERVICES"
git add .
git commit -m "Configure for Netlify frontend + Render backend"
git push origin main
```

### Step 2: Deploy Backend on Render

#### Option A: Using Blueprint (Recommended)

1. Go to https://dashboard.render.com
2. Sign up/Login with GitHub
3. Click **"New +"** → **"Blueprint"**
4. Select your **IM_SERVICES** repository
5. Click **"Apply"**

✅ It will only create the backend service (frontend section was removed)

#### Option B: Manual Deployment

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `im-services-backend`
   - **Region**: Singapore (or closest to you)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Click **"Create Web Service"**

### Step 3: Configure Backend Environment Variables

In Render dashboard, go to `im-services-backend` → Environment tab:

| Variable | Value | Example |
|----------|-------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/imservices` |
| `EMAIL_USER` | Your Gmail address | `imservices4444@gmail.com` |
| `EMAIL_PASS` | Gmail App Password (16 chars, no spaces) | `abcdabcdabcdabcd` |
| `EMAIL_FROM` | Your Gmail address | `imservices4444@gmail.com` |
| `ADMIN_EMAIL` | Your Gmail address | `imservices4444@gmail.com` |
| `FRONTEND_URL` | Your Netlify URL (optional) | `https://your-site.netlify.app` |
| `NODE_ENV` | `production` | Already set |
| `PORT` | `5000` | Already set |

Click **"Save Changes"**

### Step 4: Wait for Deployment

- Backend will deploy in ~3-5 minutes
- Check for **"Live"** status
- No errors in logs

---

## 🌐 Update Netlify Frontend Configuration

### Get Your Render Backend URL

After Render deployment completes, copy your backend URL:
```
https://im-services-backend.onrender.com
```

### Update Netlify Environment Variables

1. Go to Netlify Dashboard: https://app.netlify.com
2. Select your IM Services site
3. Go to **Site settings** → **Environment variables**
4. Add/Update:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://im-services-backend.onrender.com` |
| `VITE_EMAILJS_SERVICE_ID` | Your EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID_CONTACT` | Your EmailJS contact template ID |
| `VITE_EMAILJS_TEMPLATE_ID_BOOKING` | Your EmailJS booking template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | Your EmailJS public key |

5. Click **"Save"**
6. **Trigger redeploy**: Go to **Deploys** → **Trigger deploy** → **Deploy site**

---

## ✅ Verify Complete Setup

### 1. Check Backend Health

Visit: `https://im-services-backend.onrender.com/api/health`

Expected response:
```json
{
  "status": "OK",
  "message": "IM Services API is running"
}
```

### 2. Check Frontend

Visit your Netlify URL: `https://your-site.netlify.app`

### 3. Test API Connection

1. Open your Netlify site
2. Open browser console (F12)
3. Try signing up or submitting a form
4. Check for successful API calls (no CORS errors)

### 4. Test Features

- [ ] Sign up for new account
- [ ] Log in
- [ ] Submit booking form
- [ ] Submit contact form
- [ ] Verify emails are received

---

## 🔧 Your Complete Architecture

```
┌─────────────────────────────────────────┐
│         USERS (Web Browsers)            │
└──────────────────┬──────────────────────┘
                   │
                   │ HTTPS
                   ▼
┌─────────────────────────────────────────┐
│         NETLIFY (Frontend)              │
│   https://your-site.netlify.app        │
│   • React App                           │
│   • Always on                           │
│   • Global CDN                          │
│   • Free SSL                            │
└──────────────────┬──────────────────────┘
                   │
                   │ API Calls (/api/*)
                   ▼
┌─────────────────────────────────────────┐
│         RENDER (Backend)                │
│   https://im-services-backend.          │
│           onrender.com                  │
│   • Node.js + Express API               │
│   • MongoDB Connection                  │
│   • Email Service                       │
│   • Free tier (spins down)              │
└──────────────────┬──────────────────────┘
                   │
                   ├─ MongoDB Protocol ─→ MongoDB Atlas
                   └─ SMTP ─→ Gmail
```

---

## 📝 Important URLs to Save

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend (Netlify)** | `https://your-site.netlify.app` | Main website |
| **Backend (Render)** | `https://im-services-backend.onrender.com` | API server |
| **Health Check** | `https://im-services-backend.onrender.com/api/health` | API status |
| **Netlify Dashboard** | https://app.netlify.com | Manage frontend |
| **Render Dashboard** | https://dashboard.render.com | Manage backend |

---

## 🔄 Update & Redeploy

### Update Frontend (Netlify)

```bash
# Make frontend changes
git add frontend/
git commit -m "Update frontend"
git push origin main
```

Netlify auto-deploys in ~2-3 minutes.

### Update Backend (Render)

```bash
# Make backend changes
git add backend/
git commit -m "Update backend"
git push origin main
```

Render auto-deploys in ~3-5 minutes.

### Update Both

```bash
git add .
git commit -m "Update frontend and backend"
git push origin main
```

Both platforms auto-deploy independently.

---

## 💰 Cost Breakdown

| Service | Plan | Cost | Features |
|---------|------|------|----------|
| **Netlify** | Free | $0 | 100GB bandwidth, always on |
| **Render** | Free | $0 | 750 hours, spins down after 15 mins |
| **MongoDB Atlas** | Free | $0 | 512MB storage |
| **Gmail SMTP** | Free | $0 | 500 emails/day |
| **Total** | | **$0/month** | |

---

## ⚠️ Important Notes

### CORS is Pre-Configured

✅ Your backend automatically allows ALL Netlify URLs (*.netlify.app, *.netlify.com)

No additional CORS configuration needed!

### Free Tier Limitations

**Netlify Frontend:**
- ✅ Always online
- 100GB bandwidth/month
- 300 build minutes/month

**Render Backend:**
- ⚠️ Spins down after 15 mins of inactivity
- First request after sleep: 30-60 seconds (cold start)
- Subsequent requests: <200ms
- Use UptimeRobot to keep it awake (optional)

---

## 🐛 Troubleshooting

### Frontend Can't Connect to Backend

**Check:**
1. `VITE_API_URL` is set correctly in Netlify environment variables
2. Backend is running on Render (check "Live" status)
3. Backend health check responds: `https://im-services-backend.onrender.com/api/health`
4. Netlify was redeployed after adding environment variables

**Fix:**
```bash
# Trigger Netlify redeploy
Go to Netlify Dashboard → Deploys → Trigger deploy
```

### CORS Errors

**Should NOT happen** - Backend is configured to allow all Netlify URLs.

If you still see CORS errors:
1. Check backend logs in Render dashboard
2. Verify your Netlify URL ends with `.netlify.app` or `.netlify.com`
3. Clear browser cache and try again

### Backend Slow on First Request

**This is normal** for Render free tier:
- Backend spins down after 15 minutes
- First request takes 30-60 seconds (cold start)
- Subsequent requests are fast

**Solutions:**
- Accept the delay (free tier limitation)
- Use UptimeRobot to ping every 5 minutes (keeps it awake)
- Upgrade to Render paid plan ($7/month for always-on)

### Emails Not Sending

**Check:**
1. Gmail App Password is correct (no spaces)
2. 2FA is enabled on Gmail
3. Environment variables are set in Render
4. Check Render backend logs for errors

---

## 🆘 Need Help?

**Netlify Issues:**
- Netlify Docs: https://docs.netlify.com
- Check build logs in Netlify dashboard

**Render Issues:**
- Render Docs: https://render.com/docs
- Check service logs in Render dashboard

**MongoDB Issues:**
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Verify connection string format

**General Support:**
- Email: imservices4444@gmail.com

---

## 🎉 Setup Complete!

Your IM Services website is now running with:

✅ **Frontend on Netlify** - Fast, always online, global CDN  
✅ **Backend on Render** - Secure API, MongoDB, Email service  
✅ **Auto-deploy enabled** - Push to GitHub = automatic deployment  
✅ **CORS configured** - Netlify and Render can communicate  
✅ **Free hosting** - $0/month for both services

**Your live website:** Check your Netlify dashboard for the URL!

---

## 📚 Additional Resources

- Original deployment guides are still available in:
  - `RENDER_DEPLOYMENT.md` - Backend deployment details
  - `NETLIFY_DEPLOY_GUIDE.md` - Frontend deployment details (if exists)
  - `ARCHITECTURE.md` - System architecture

---

**Last Updated:** 2024  
**Configuration:** Netlify (Frontend) + Render (Backend)  
**Status:** ✅ Production Ready
