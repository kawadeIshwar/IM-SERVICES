# 🚀 Quick Start: Deploy to Render in 10 Minutes

The fastest way to get your IM Services website live on Render.

---

## ⚡ Prerequisites (5 mins)

You need these ready:

1. **MongoDB Atlas Connection String**
   - Sign up at https://www.mongodb.com/cloud/atlas
   - Create free cluster
   - Get connection string (looks like: `mongodb+srv://username:password@...`)

2. **Gmail App Password**
   - Enable 2FA on Gmail
   - Generate App Password at https://myaccount.google.com/apppasswords
   - Copy the 16-character password

3. **GitHub Repository**
   ```bash
   git add .
   git commit -m "Ready for Render deployment"
   git push origin main
   ```

---

## 🚀 Deploy (5 mins)

### Step 1: Deploy to Render

1. Go to https://dashboard.render.com
2. Sign up/Login with GitHub
3. Click **"New +"** → **"Blueprint"**
4. Select your **IM_SERVICES** repository
5. Name it: **"IM Services"**
6. Click **"Apply"**

✅ Render will automatically create:
- Backend service (Node.js API)
- Frontend service (Static site)

### Step 2: Configure Backend Environment Variables

1. Go to **`im-services-backend`** service
2. Click **"Environment"** tab
3. Add these variables:

```
MONGODB_URI = [Your MongoDB Atlas connection string]
EMAIL_USER = [Your Gmail address]
EMAIL_PASS = [Your Gmail App Password - no spaces]
EMAIL_FROM = [Your Gmail address]
ADMIN_EMAIL = [Your Gmail address]
```

4. Click **"Save Changes"**
5. Service will auto-redeploy (takes 2-3 minutes)

### Step 3: Wait for Deployment

- Both services will show **"Live"** when ready (~5 minutes)
- Frontend: `https://im-services-frontend.onrender.com`
- Backend: `https://im-services-backend.onrender.com`

---

## ✅ Verify Deployment

1. **Check Backend Health:**
   - Visit: `https://im-services-backend.onrender.com/api/health`
   - Should see: `{"status": "OK", "message": "IM Services API is running"}`

2. **Check Frontend:**
   - Visit: `https://im-services-frontend.onrender.com`
   - Website should load correctly

3. **Test Features:**
   - Sign up for account
   - Log in
   - Submit a test booking
   - Check your email

---

## 🎉 Done!

Your website is now live! Share your Render URL with clients.

### ⚠️ Important Notes:

- **Free Tier**: Backend spins down after 15 mins of inactivity
  - First request after sleep takes ~30-60 seconds (cold start)
  - Subsequent requests are fast

- **Auto-Deploy**: Render auto-deploys when you push to GitHub
  ```bash
  git push origin main  # Triggers automatic deployment
  ```

- **Custom Domain**: You can add your own domain in Render dashboard
  - Go to Frontend service → Settings → Custom Domain

---

## 🆘 Having Issues?

See detailed guide: [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)

**Common Issues:**

1. **Backend won't start**: Check environment variables are set correctly
2. **API errors**: Verify `VITE_API_URL` in frontend matches your backend URL
3. **No emails**: Verify Gmail App Password (no spaces), 2FA enabled
4. **Database errors**: Check MongoDB connection string format

---

## 📞 Support

- Render Docs: https://render.com/docs
- MongoDB Docs: https://docs.atlas.mongodb.com
- Email: imservices4444@gmail.com

---

**Need more details?** Check [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) for comprehensive guide.
