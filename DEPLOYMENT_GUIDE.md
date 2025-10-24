# IM SERVICES - Deployment Guide

## 🌐 Production Deployment Options

### Option 1: Vercel (Frontend) + Render (Backend) - RECOMMENDED

#### A. Deploy Frontend to Vercel (Free)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Build and Deploy:**
```bash
cd frontend
npm run build
vercel --prod
```

3. **Or use Vercel Dashboard:**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Select `frontend` folder as root
   - Build command: `npm run build`
   - Output directory: `dist`
   - Deploy!

4. **Environment Variables:**
   - No frontend env variables needed (API calls go to backend URL)
   - Update API base URL in production if needed

#### B. Deploy Backend to Render (Free)

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Create Render Account:**
   - Go to https://render.com
   - Sign up with GitHub

3. **Create New Web Service:**
   - Connect your repository
   - Select `backend` folder
   - Build command: `npm install`
   - Start command: `npm start`
   - Choose Free plan

4. **Add Environment Variables:**
```
PORT=5000
MONGODB_URI=your-mongodb-atlas-connection-string
NODE_ENV=production
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=imservices4444@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM=imservices4444@gmail.com
ADMIN_EMAIL=imservices4444@gmail.com
```

5. **Deploy!**

#### C. Setup MongoDB Atlas (Free)

1. **Create Account:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster:**
   - Choose Free tier (M0)
   - Select region closest to you
   - Create cluster

3. **Setup Database Access:**
   - Database Access → Add New User
   - Create username and password
   - Give read/write permissions

4. **Setup Network Access:**
   - Network Access → Add IP Address
   - Allow access from anywhere (0.0.0.0/0) for development
   - Or add specific IPs for production

5. **Get Connection String:**
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your database password
   - Use this in MONGODB_URI

---

### Option 2: Netlify (Frontend) + Railway (Backend)

#### A. Deploy Frontend to Netlify

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Build and Deploy:**
```bash
cd frontend
npm run build
netlify deploy --prod
```

3. **Or use Netlify Dashboard:**
   - Drag and drop `dist` folder
   - Or connect GitHub repository

#### B. Deploy Backend to Railway

1. **Go to https://railway.app**
2. **New Project → Deploy from GitHub**
3. **Select repository and backend folder**
4. **Add environment variables**
5. **Deploy!**

---

### Option 3: Traditional VPS (DigitalOcean, AWS, etc.)

#### Server Setup

1. **Create Ubuntu Server (20.04 LTS)**

2. **Install Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Install MongoDB:**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

4. **Install Nginx:**
```bash
sudo apt-get install nginx
```

5. **Clone Repository:**
```bash
git clone <your-repo-url>
cd IM_SERVICES
```

6. **Setup Backend:**
```bash
cd backend
npm install
# Create .env file with production values
```

7. **Setup Frontend:**
```bash
cd ../frontend
npm install
npm run build
```

8. **Configure Nginx:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        root /path/to/IM_SERVICES/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

9. **Setup PM2 (Process Manager):**
```bash
sudo npm install -g pm2
cd backend
pm2 start server.js --name "im-services-api"
pm2 startup
pm2 save
```

10. **Setup SSL with Let's Encrypt:**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 🔒 Security Checklist

- [ ] Use HTTPS in production
- [ ] Set NODE_ENV=production
- [ ] Use strong MongoDB passwords
- [ ] Whitelist IP addresses in MongoDB Atlas
- [ ] Enable CORS only for your domain
- [ ] Use environment variables for all secrets
- [ ] Never commit .env files
- [ ] Implement rate limiting (optional)
- [ ] Add authentication for admin routes (optional)
- [ ] Regular security updates

---

## 📊 Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Submit test booking form
- [ ] Submit test contact form
- [ ] Verify emails are received
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Check Google Maps loads
- [ ] Test WhatsApp and call buttons
- [ ] Verify all images load
- [ ] Check page load speed
- [ ] Test form validations
- [ ] Verify MongoDB data is saved

---

## 🔧 Environment Variables Summary

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/imservices
NODE_ENV=production
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=imservices4444@gmail.com
EMAIL_PASS=your-16-char-app-password
EMAIL_FROM=imservices4444@gmail.com
ADMIN_EMAIL=imservices4444@gmail.com
```

### Frontend
No environment variables needed. API calls use relative URLs that proxy to backend.

---

## 🚀 Quick Deploy Commands

### Vercel (Frontend)
```bash
cd frontend
vercel --prod
```

### Render (Backend)
- Push to GitHub
- Connect repository in Render dashboard
- Add environment variables
- Deploy

### Update Deployment
```bash
# Frontend
cd frontend
npm run build
vercel --prod

# Backend (if using PM2)
cd backend
git pull
npm install
pm2 restart im-services-api
```

---

## 📈 Monitoring & Maintenance

### Check Backend Logs (PM2)
```bash
pm2 logs im-services-api
```

### Check MongoDB Status
```bash
# Local
sudo systemctl status mongod

# Atlas
Check dashboard at mongodb.com
```

### Backup Database
```bash
# Local MongoDB
mongodump --db imservices --out /backup/

# Atlas
Use automated backups in dashboard
```

---

## 🆘 Troubleshooting Deployment

### Frontend not loading
- Check build completed successfully
- Verify dist folder exists
- Check Vercel/Netlify logs

### Backend API errors
- Check environment variables are set
- Verify MongoDB connection string
- Check Render/Railway logs
- Test API endpoint directly

### Email not sending
- Verify Gmail App Password
- Check email credentials in .env
- Test with a simple email first

### CORS errors
- Add frontend URL to CORS whitelist in backend
- Check API proxy settings in vite.config.js

---

## 📞 Support

For deployment issues:
- Email: imservices4444@gmail.com
- Phone: +91 9730992561

---

**Your IM Services website is ready for production! 🎉**
