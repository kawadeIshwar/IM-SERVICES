# EmailJS Form Submission Troubleshooting Guide

## Quick Diagnosis Steps

### Step 1: Check Environment Variables

1. **Open your `.env` file** in `frontend/.env`
2. **Verify ALL 4 variables are set:**
   ```
   VITE_EMAILJS_SERVICE_ID=service_xxxxx
   VITE_EMAILJS_TEMPLATE_ID_CONTACT=template_xxxxx
   VITE_EMAILJS_TEMPLATE_ID_BOOKING=template_xxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx
   ```

3. **Important:** 
   - NO quotes around values
   - NO spaces around the `=` sign
   - All variables must start with `VITE_` (Vite requirement)

### Step 2: Restart Development Server

**CRITICAL:** After creating or modifying the `.env` file, you MUST restart the dev server:

```bash
# Stop the current server (Ctrl+C in the terminal)
# Then restart:
cd frontend
npm run dev
```

### Step 3: Check Browser Console

1. Open your browser DevTools (F12)
2. Go to the **Console** tab
3. Try to submit the form
4. Look for these messages:

#### ✅ Good Signs:
```
EmailJS Config Check: {
  hasServiceId: true,
  hasTemplateId: true,
  hasPublicKey: true
}
```

#### ❌ Bad Signs:
```
Missing EmailJS configuration: {
  serviceId: 'MISSING',
  templateId: 'MISSING',
  publicKey: 'MISSING'
}
```

### Step 4: Get Your EmailJS Credentials

If you see "MISSING" in the console, you need to set up EmailJS:

#### A. Get Service ID
1. Go to https://dashboard.emailjs.com/admin
2. Click **Email Services**
3. If you don't have a service, click **Add New Service**
4. Select **Gmail** and connect your account
5. Copy the **Service ID** (looks like: `service_abc1234`)

#### B. Get Template IDs
1. Go to **Email Templates**
2. Create TWO templates (one for contact, one for booking)
3. Copy each **Template ID** (looks like: `template_xyz5678`)

**Contact Form Template:**
```
Subject: New Contact Form Message from {{from_name}}

Hello IM Services Team,

You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Subject: {{subject}}

Message:
{{message}}

---
Reply to: {{from_email}}
```

**Booking Form Template:**
```
Subject: New Service Booking from {{from_name}}

CUSTOMER DETAILS:
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}
Location: {{location}}

MACHINE DETAILS:
Machine Type: {{machine_type}}
Machine Brand: {{machine_brand}}

SERVICE:
Service Type: {{service_type}}
Other Details: {{other_service_details}}

SCHEDULE:
Preferred Date: {{preferred_date}}
Preferred Time: {{preferred_time}}
Priority: {{priority}}

MESSAGE:
{{message}}

---
Contact: {{from_email}} or {{phone}}
```

#### C. Get Public Key
1. Click your profile icon (top right)
2. Go to **Account** → **General**
3. Find **Public Key**
4. Copy it (looks like: `Ab1cD2eFgH3iJkLm`)

### Step 5: Update .env File

Create or update `frontend/.env`:
```
VITE_EMAILJS_SERVICE_ID=service_abc1234
VITE_EMAILJS_TEMPLATE_ID_CONTACT=template_contact123
VITE_EMAILJS_TEMPLATE_ID_BOOKING=template_booking456
VITE_EMAILJS_PUBLIC_KEY=Ab1cD2eFgH3iJkLm
```

### Step 6: Restart Server (Again!)
```bash
# Stop server (Ctrl+C)
npm run dev
```

## Common Errors & Solutions

### Error: "Email service is not configured"
**Cause:** Environment variables are not loaded
**Solution:**
1. Check `.env` file exists in `frontend/` folder
2. Restart dev server
3. Hard refresh browser (Ctrl+Shift+R)

### Error: "The public key is required"
**Cause:** Missing `VITE_EMAILJS_PUBLIC_KEY`
**Solution:** Add the public key to `.env` file and restart

### Error: "Service ID is invalid"
**Cause:** Wrong Service ID or service not active
**Solution:**
1. Go to EmailJS dashboard
2. Verify the service is **Connected** (green status)
3. Copy the correct Service ID

### Error: "Template ID is invalid"
**Cause:** Wrong template ID or template variables don't match
**Solution:**
1. Verify template exists in EmailJS dashboard
2. Check template variable names match exactly (case-sensitive)
3. Required variables for **Contact Form**:
   - `from_name`
   - `from_email`
   - `phone`
   - `subject`
   - `message`
4. Required variables for **Booking Form**:
   - `from_name`, `from_email`, `phone`, `company`, `location`
   - `machine_type`, `machine_brand`
   - `service_type`, `other_service_details`
   - `preferred_date`, `preferred_time`, `priority`, `message`

### Error: "Failed: The reCAPTCHA verification failed"
**Cause:** EmailJS reCAPTCHA enabled but not configured
**Solution:**
1. Go to EmailJS Account → Security
2. Either disable reCAPTCHA OR
3. Add reCAPTCHA to your form

### Error: CORS or Network Error
**Cause:** Firewall or network blocking EmailJS
**Solution:**
1. Check internet connection
2. Disable VPN/proxy temporarily
3. Check browser console for specific CORS errors

## Testing Checklist

✅ `.env` file exists in `frontend/` folder  
✅ All 4 environment variables are set  
✅ No quotes, spaces, or typos in `.env`  
✅ Dev server restarted after .env changes  
✅ Browser cache cleared (Ctrl+Shift+R)  
✅ EmailJS service is connected (green status)  
✅ EmailJS templates exist and have correct variables  
✅ Browser console shows no "MISSING" errors  
✅ Network tab shows request to EmailJS API  

## Still Not Working?

### Check Network Tab
1. Open DevTools → Network tab
2. Submit the form
3. Look for request to `api.emailjs.com`
4. Check the response:
   - **200 OK** = Success!
   - **400 Bad Request** = Check template variables
   - **401 Unauthorized** = Check Public Key
   - **404 Not Found** = Check Service/Template IDs

### Enable Detailed Logging
The forms now include detailed console logging. Check the console for:
- "EmailJS Config Check" - Shows if variables are loaded
- "Sending email with data" - Shows the data being sent
- "EmailJS Success" - Confirms email was sent
- "EmailJS Error Details" - Shows detailed error information

## Example Working .env File
```
VITE_EMAILJS_SERVICE_ID=service_abc1234
VITE_EMAILJS_TEMPLATE_ID_CONTACT=template_contact123
VITE_EMAILJS_TEMPLATE_ID_BOOKING=template_booking456
VITE_EMAILJS_PUBLIC_KEY=Ab1cD2eFgH3iJkLm
```

## Need Help?
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com
- Check EmailJS Dashboard for email delivery logs
