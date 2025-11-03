# EmailJS Setup Guide for IM Services

## 🚀 Quick Setup (5-10 minutes)

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up Free"**
3. Use your email: `imservices4444@gmail.com`
4. Verify your email

### Step 2: Add Email Service

1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Select **"Gmail"** (recommended)
4. Connect your Gmail account: `imservices4444@gmail.com`
5. Copy the **Service ID** (e.g., `service_abc1234`)

### Step 3: Create Email Templates

#### Template 1: Contact Form

1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template:

**Template Name:** Contact Form Submission

**Subject:** New Contact Form Message from {{from_name}}

**Content:**
```
Hello IM Services Team,

You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from the IM Services contact form.
Reply to: {{from_email}}
```

4. Click **"Save"**
5. Copy the **Template ID** (e.g., `template_contact123`)

#### Template 2: Booking Form

1. Click **"Create New Template"** again
2. Use this template:

**Template Name:** Service Booking Request

**Subject:** New Service Booking from {{from_name}}

**Content:**
```
Hello IM Services Team,

You have received a new service booking request:

CUSTOMER DETAILS:
-----------------
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}
Location: {{location}}

MACHINE DETAILS:
----------------
Machine Type: {{machine_type}}
Machine Brand: {{machine_brand}}

SERVICE REQUESTED:
------------------
Service Type: {{service_type}}
Other Service Details: {{other_service_details}}

SCHEDULE:
---------
Preferred Date: {{preferred_date}}
Preferred Time: {{preferred_time}}

ADDITIONAL MESSAGE:
-------------------
{{message}}

---
This booking was submitted from the IM Services booking form.
Please contact the customer at: {{from_email}} or {{phone}}
```

3. Click **"Save"**
4. Copy the **Template ID** (e.g., `template_booking456`)

### Step 4: Get Public Key

1. Go to **"Account"** in top right
2. Click **"General"** tab
3. Find **"Public Key"**
4. Copy it (e.g., `Ab1cD2eFgH3iJkLm`)

### Step 5: Configure Environment Variables

1. In your project folder, create a file named `.env`:
   ```
   frontend/.env
   ```

2. Add these lines (replace with your actual keys):
   ```
   VITE_EMAILJS_SERVICE_ID=service_abc1234
   VITE_EMAILJS_TEMPLATE_ID_CONTACT=template_contact123
   VITE_EMAILJS_TEMPLATE_ID_BOOKING=template_booking456
   VITE_EMAILJS_PUBLIC_KEY=Ab1cD2eFgH3iJkLm
   ```

3. **Important:** Add `.env` to your `.gitignore` (already done ✅)

### Step 6: Restart Development Server

```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

## ✅ Testing

1. **Test Contact Form:**
   - Go to `/contact`
   - Fill out and submit the form
   - Check `imservices4444@gmail.com` for the email

2. **Test Booking Form:**
   - Go to `/booking` or click "Book This Service" from services
   - Fill out and submit the form
   - Check your email

## 📊 Free Tier Limits

- **200 emails/month** (free plan)
- If you need more, upgrade to paid plan ($7/month for 1,000 emails)

## 🔧 Troubleshooting

### Emails Not Sending?

1. **Check Console:** Open browser DevTools > Console for errors
2. **Verify Keys:** Make sure all 4 environment variables are set correctly
3. **Gmail Settings:** Ensure you've connected Gmail in EmailJS
4. **Template Variables:** Check that variable names match exactly (case-sensitive)

### Emails Going to Spam?

1. In EmailJS dashboard, verify your domain
2. Add SPF/DKIM records (EmailJS provides these)
3. Ask recipients to whitelist `imservices4444@gmail.com`

## 📧 Email Delivery

All form submissions will be sent to: **imservices4444@gmail.com**

You can add more recipient emails in the EmailJS template settings.

## 🎯 Benefits

✅ **No backend needed** - Works directly from React  
✅ **Fast setup** - 5-10 minutes  
✅ **Reliable** - 99.9% delivery rate  
✅ **Free tier** - Perfect for small businesses  
✅ **Auto-responses** - Can send confirmation emails to users  

## 🔐 Security

- API keys are safe for client-side use
- EmailJS has built-in rate limiting
- No sensitive data exposed
- HTTPS encrypted transmission

## 📞 Need Help?

- EmailJS Docs: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com

---

**Setup Complete! 🎉**

Your contact and booking forms are now ready to send emails!
