# 🏗️ IM Services - Render Deployment Architecture

Visual overview of your deployed application architecture.

---

## 🌐 Production Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USERS / CLIENTS                          │
│                     (Web Browsers, Mobile)                       │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      RENDER.COM PLATFORM                         │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         FRONTEND (Static Site)                            │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  React + Vite Application                          │  │  │
│  │  │  • Homepage, Services, Contact, Booking            │  │  │
│  │  │  • Responsive UI with TailwindCSS                  │  │  │
│  │  │  • Dark mode support                               │  │  │
│  │  │  • SEO optimized                                   │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  URL: https://im-services-frontend.onrender.com           │  │
│  │  Region: Singapore                                        │  │
│  │  Plan: Free (Always On)                                   │  │
│  └──────────────────────┬─────────────────────────────────────┘  │
│                         │                                        │
│                         │ API Calls (/api/*)                     │
│                         ▼                                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         BACKEND (Web Service)                             │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  Node.js + Express REST API                        │  │  │
│  │  │  • Authentication (JWT)                            │  │  │
│  │  │  • Booking management                              │  │  │
│  │  │  • Service requests                                │  │  │
│  │  │  • Contact form handling                           │  │  │
│  │  │  • Email notifications (nodemailer)                │  │  │
│  │  │  • File uploads                                    │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  URL: https://im-services-backend.onrender.com            │  │
│  │  Region: Singapore                                        │  │
│  │  Plan: Free (Spins down after 15 mins)                   │  │
│  └──────────────────────┬─────────────────────────────────────┘  │
└─────────────────────────┼──────────────────────────────────────┘
                          │
                          │ MongoDB Protocol
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MONGODB ATLAS (Database)                      │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Database: imservices                                      │ │
│  │  • users (auth, profiles)                                  │ │
│  │  • bookings (service bookings)                             │ │
│  │  • contacts (contact form submissions)                     │ │
│  │  • serviceRequests (client requests)                       │ │
│  │  • processTracking (workflow tracking)                     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  Cluster: Free Tier (M0 Sandbox)                                │
│  Region: Your selected region                                    │
│  Storage: 512MB                                                  │
└─────────────────────────────────────────────────────────────────┘

                          │
                          │ SMTP
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GMAIL (Email Service)                         │
│  • Sends booking confirmations                                   │
│  • Sends contact form notifications                              │
│  • Notifies admin of new requests                                │
│  Protocol: SMTP (Port 587)                                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### 1. User Visits Website
```
User → Frontend (Static Files) → Rendered in Browser
```

### 2. User Submits Booking Form
```
User (Fill Form) 
  → Frontend (Validate) 
  → Backend API (/api/bookings POST)
  → MongoDB (Store booking data)
  → Gmail (Send email notification)
  → Frontend (Show success message)
```

### 3. User Authentication
```
User (Login Form)
  → Frontend (Collect credentials)
  → Backend API (/api/auth/login POST)
  → MongoDB (Verify user)
  → Backend (Generate JWT token)
  → Frontend (Store token, redirect)
```

### 4. Admin Views Dashboard
```
Admin (Login)
  → Frontend (Authenticated)
  → Backend API (/api/bookings GET with JWT)
  → MongoDB (Fetch all bookings)
  → Backend (Return data)
  → Frontend (Display dashboard)
```

---

## 🔐 Security Layers

```
┌─────────────────────────────────────────┐
│  HTTPS/TLS Encryption (Render)          │  ← All traffic encrypted
├─────────────────────────────────────────┤
│  CORS Protection (Backend)              │  ← Origin validation
├─────────────────────────────────────────┤
│  JWT Authentication (Backend)           │  ← Token-based auth
├─────────────────────────────────────────┤
│  Input Validation (Frontend + Backend)  │  ← Prevent injection
├─────────────────────────────────────────┤
│  MongoDB Atlas Network Security         │  ← IP whitelisting
├─────────────────────────────────────────┤
│  Environment Variables (Secrets)        │  ← No hardcoded credentials
└─────────────────────────────────────────┘
```

---

## 📊 Service Specifications

### Frontend (Static Site)

| Property | Value |
|----------|-------|
| **Technology** | React 18, Vite, TailwindCSS |
| **Hosting** | Render Static Site |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `./dist` |
| **Always On** | ✅ Yes |
| **Bandwidth** | 100GB/month (Free) |
| **CDN** | ✅ Included |
| **Custom Domain** | ✅ Supported |

### Backend (Web Service)

| Property | Value |
|----------|-------|
| **Technology** | Node.js 18+, Express |
| **Hosting** | Render Web Service |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Port** | 5000 |
| **Auto-Deploy** | ✅ On git push |
| **Spin Down** | After 15 mins (Free tier) |
| **Cold Start** | ~30-60 seconds |
| **Health Check** | `/api/health` |

### Database (MongoDB Atlas)

| Property | Value |
|----------|-------|
| **Service** | MongoDB Atlas M0 (Free) |
| **Storage** | 512MB |
| **RAM** | Shared |
| **Connections** | 100 max |
| **Backups** | Not included (Free tier) |
| **Network** | 0.0.0.0/0 (Anywhere) |

---

## 🚀 Deployment Process

```
Developer (Local Changes)
          ↓
    git commit & push
          ↓
    GitHub Repository
          ↓
    Render Webhook (Auto-triggered)
          ↓
┌─────────┴──────────┐
│                    │
▼                    ▼
Frontend Build       Backend Build
(npm run build)      (npm install)
│                    │
▼                    ▼
Deploy Static        Deploy Service
Files to CDN         to Container
│                    │
▼                    ▼
✅ Frontend Live     ✅ Backend Live
```

**Total Time:** 3-5 minutes

---

## 🌍 Geographic Distribution

```
┌─────────────────────────────────────────────┐
│          Primary Region: Singapore          │
├─────────────────────────────────────────────┤
│  Frontend: Global CDN (Render)              │
│  Backend: Singapore (Render)                │
│  Database: Your selected region (Atlas)     │
└─────────────────────────────────────────────┘
```

**Benefits:**
- Low latency for Asian users
- CDN ensures fast global access
- Scalable architecture

---

## 💰 Cost Breakdown (Free Tier)

| Service | Free Tier | Cost |
|---------|-----------|------|
| **Render Frontend** | 100GB bandwidth/month | $0 |
| **Render Backend** | 750 hours/month | $0 |
| **MongoDB Atlas** | 512MB storage | $0 |
| **Gmail SMTP** | 500 emails/day | $0 |
| **Total** | | **$0/month** |

### Upgrade Options (Optional)

| Service | Paid Plan | Cost | Benefits |
|---------|-----------|------|----------|
| **Render Backend** | Starter | $7/month | Always on, no spin-down |
| **MongoDB Atlas** | M10 | $10/month | 10GB storage, backups |
| **Total Paid** | | **$17/month** | Better performance |

---

## 🔧 Environment Variables

### Frontend (VITE_*)
```
VITE_API_URL → Backend API endpoint
VITE_EMAILJS_SERVICE_ID → EmailJS config
VITE_EMAILJS_TEMPLATE_ID_CONTACT → Contact template
VITE_EMAILJS_TEMPLATE_ID_BOOKING → Booking template
VITE_EMAILJS_PUBLIC_KEY → EmailJS key
```

### Backend
```
NODE_ENV → production
PORT → 5000
MONGODB_URI → MongoDB Atlas connection string
JWT_SECRET → Auto-generated by Render
EMAIL_HOST → smtp.gmail.com
EMAIL_PORT → 587
EMAIL_USER → Gmail address
EMAIL_PASS → Gmail App Password
EMAIL_FROM → Sender email
ADMIN_EMAIL → Admin notification email
```

---

## 📈 Monitoring & Maintenance

### What to Monitor

1. **Render Dashboard**
   - Service health status
   - Build logs
   - Deploy history
   - Resource usage

2. **MongoDB Atlas**
   - Connection count
   - Storage usage
   - Query performance
   - Slow queries

3. **Gmail**
   - Daily email quota
   - Bounce rate
   - Delivery status

### Maintenance Tasks

- **Weekly**: Check logs for errors
- **Monthly**: Review storage usage
- **Quarterly**: Update dependencies
- **As needed**: Scale resources

---

## 🎯 Performance Expectations

### Frontend
- **Initial Load**: 1-2 seconds
- **Page Navigation**: Instant (SPA)
- **Availability**: 99.9%

### Backend (Free Tier)
- **Cold Start**: 30-60 seconds
- **Warm Response**: <200ms
- **Availability**: 99% (with spin-down)

### Database
- **Query Response**: 10-50ms
- **Availability**: 99.9%

---

## 🔄 Scaling Strategy

### Current (Free Tier)
- Handles ~100 users/day
- ~1,000 pageviews/month
- ~100 bookings/month

### When to Upgrade

**Upgrade Render Backend ($7/mo) when:**
- Cold starts affect user experience
- >500 visitors/day
- Need real-time features

**Upgrade MongoDB ($10/mo) when:**
- Storage >400MB
- Need automated backups
- >10,000 documents

**Add CDN/Caching when:**
- Global audience
- >10,000 pageviews/month
- Static assets >1GB

---

## 📞 Support & Resources

- **Render Status**: https://status.render.com
- **MongoDB Status**: https://status.mongodb.com
- **Documentation**: See RENDER_DEPLOYMENT.md
- **Support**: imservices4444@gmail.com

---

**Architecture Version:** 1.0  
**Last Updated:** 2024  
**Maintained By:** IM Services Team
