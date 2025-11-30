# Fix EmailJS "Invalid Grant" Error

## The Problem
Error: **"Gmail_API: Invalid grant. Please reconnect your Gmail account"**

This means your Gmail connection in EmailJS has expired or needs to be reauthorized.

---

## Solution: Reconnect Gmail (2 minutes)

### Step 1: Go to EmailJS Dashboard
1. Open https://dashboard.emailjs.com/admin
2. Log in to your EmailJS account

### Step 2: Go to Email Services
1. Click **"Email Services"** in the left sidebar
2. Find your Gmail service

### Step 3: Reconnect Gmail
You'll see one of these:

**Option A: Service shows "Disconnected" (Red/Orange)**
1. Click **"Reconnect"** or **"Edit"** button
2. Click **"Connect Account"** or **"Reconnect Gmail"**
3. Choose your Gmail account (`imservices4444@gmail.com`)
4. Click **"Allow"** to grant permissions
5. Click **"Save"**

**Option B: Service shows "Connected" (Green) but still failing**
1. Click the **"Edit"** button on your Gmail service
2. Scroll down and click **"Disconnect"**
3. Then click **"Connect Account"** again
4. Choose your Gmail account
5. Click **"Allow"** to grant permissions
6. Click **"Save"**

### Step 4: Verify Connection
After reconnecting, the service should show:
- ✅ **Status:** Connected (Green checkmark)
- ✅ **Email:** imservices4444@gmail.com

### Step 5: Test Again
1. Go back to your website
2. Refresh the page (Ctrl+R)
3. Submit the contact form again
4. It should work now! ✅

---

## Alternative: Use Personal Email Service

If Gmail keeps disconnecting, you can use EmailJS's "Personal" email service:

### Setup Personal Email Service

1. In **Email Services**, click **"Add New Service"**
2. Choose **"EmailJS"** (Personal email service - not Gmail)
3. Set a Service ID (e.g., `service_imservices`)
4. Click **"Create Service"**
5. Copy the Service ID

### Update Frontend .env
```
VITE_EMAILJS_SERVICE_ID=service_imservices
```

### Benefits of Personal Service
- ✅ No OAuth connection issues
- ✅ No "Invalid grant" errors
- ✅ More reliable for contact forms
- ⚠️ Emails come from noreply@emailjs.com instead of your Gmail

---

## Why This Happens

**Common Causes:**
1. **OAuth Token Expired** - Gmail tokens expire after some time
2. **Gmail Password Changed** - Disconnects EmailJS
3. **2FA Changes** - Security changes in Gmail
4. **Too Many Failed Attempts** - Gmail temporarily blocks access
5. **Account Not Verified** - Need to verify Gmail in EmailJS

---

## Prevention Tips

### Option 1: Use Personal EmailJS Service (Recommended)
More reliable, no OAuth issues.

### Option 2: Keep Gmail Connected
- Don't change Gmail password without reconnecting EmailJS
- Check EmailJS dashboard monthly to ensure connection is active
- If you see warnings, reconnect immediately

---

## Troubleshooting

### Error Persists After Reconnecting

**Try these steps:**

1. **Clear EmailJS Cache**
   - Log out of EmailJS dashboard
   - Clear browser cookies for emailjs.com
   - Log back in and reconnect

2. **Check Gmail Settings**
   - Go to https://myaccount.google.com/permissions
   - Find "EmailJS" in connected apps
   - If it's there, remove it
   - Reconnect in EmailJS dashboard

3. **Try Different Browser**
   - Use Chrome/Edge in incognito mode
   - Reconnect Gmail in EmailJS
   - Test the form

4. **Switch to Personal Service**
   - Easier and more reliable
   - See "Alternative" section above

---

## Quick Test After Fix

### Browser Console Test
1. Open DevTools (F12)
2. Go to Console tab
3. Submit form
4. You should see:
   ```
   EmailJS Config Check: { hasServiceId: true, ... }
   Sending email with data: { ... }
   EmailJS Success: { status: 200, ... }
   ```

### Success Message
You should see:
**"Message Sent Successfully!"**

And receive email at: `imservices4444@gmail.com`

---

## Current EmailJS Configuration

Your current setup:
```
Service Type: Gmail
Connected Email: imservices4444@gmail.com
Status: Needs Reconnection ⚠️
```

**Required Environment Variables (.env):**
```
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID_CONTACT=template_xxxxx
VITE_EMAILJS_TEMPLATE_ID_BOOKING=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx
```

---

## Need Help?

1. **EmailJS Documentation:** https://www.emailjs.com/docs/
2. **EmailJS Support:** support@emailjs.com
3. **Check Service Status:** https://status.emailjs.com/

---

## Expected Timeline

✅ **Reconnecting Gmail:** 1-2 minutes  
✅ **Testing form:** Immediate  
✅ **Total fix time:** Under 5 minutes  

---

**Most Common Solution:** Just click "Reconnect" in the EmailJS dashboard! 🔄
