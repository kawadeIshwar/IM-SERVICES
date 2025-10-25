# Netlify Deployment Fix Guide

## Problem
Changes pushed to GitHub are not reflecting on the deployed Netlify site.

## Solutions

### Solution 1: Fix Netlify Settings (RECOMMENDED)

1. **Go to Netlify Dashboard** (https://app.netlify.com)
2. **Select your site**
3. **Site settings** → **Build & deploy** → **Build settings**
4. **Update settings:**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`

5. **Enable Auto Publishing:**
   - Go to **Build & deploy** → **Continuous Deployment**
   - Make sure **"Auto publishing"** is ON
   - Verify branch is set to `main`

6. **Trigger Clean Deploy:**
   - Go to **Deploys** tab
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**

### Solution 2: Manual Deploy via CLI

If auto-deploy still doesn't work, deploy manually:

```bash
# Install Netlify CLI globally (one time only)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Navigate to frontend
cd frontend

# Build the project
npm run build

# Deploy to production
netlify deploy --prod

# Follow prompts to link to your existing site
```

### Solution 3: Drag & Drop Deploy

1. Build locally:
```bash
cd frontend
npm run build
```

2. Go to Netlify Dashboard → Deploys
3. Drag and drop the `frontend/dist` folder

## Files Added

We've created:
- `frontend/netlify.toml` - Netlify configuration
- `frontend/public/_redirects` - SPA routing support

These files help Netlify:
- Know where to build from
- Handle React Router correctly
- Cache assets properly

## Common Issues & Fixes

### Issue: Build Fails
**Check:**
- Build logs in Netlify dashboard
- Node version (should be 18+)
- Dependencies are in package.json

**Fix:**
```bash
# Test build locally first
cd frontend
npm install
npm run build
```

### Issue: 404 on Refresh
**Fix:** The `_redirects` file should solve this.
If not, add this to `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Issue: Old Version Still Shows
**Fix:**
1. Clear browser cache (Ctrl+Shift+R)
2. Clear Netlify cache: Deploys → Trigger deploy → Clear cache and deploy site
3. Check if correct commit is deployed in deploy log

### Issue: Environment Variables
If you need API URLs:
1. Site settings → Build & deploy → Environment variables
2. Add variables like:
   - `VITE_API_URL=https://your-backend-url.com`

## Verify Deployment

After deploying, check:
- [ ] Site loads at your Netlify URL
- [ ] All pages work (Home, Services, Gallery, etc.)
- [ ] React Router works (refresh on any page)
- [ ] Images load properly
- [ ] Responsive design works on mobile
- [ ] Forms submit correctly

## GitHub Auto-Deploy Workflow

Once configured properly:
1. Make changes to code
2. `git add .`
3. `git commit -m "your message"`
4. `git push`
5. Netlify automatically builds and deploys (1-2 minutes)

## Check Deploy Status

Watch the deploy in real-time:
1. Go to Netlify dashboard
2. Click **Deploys** tab
3. See latest deploy building
4. Green checkmark = successful
5. Red X = failed (click to see logs)

## Support

If issues persist:
- Check Netlify docs: https://docs.netlify.com
- Review build logs carefully
- Test build locally first: `npm run build`
- Make sure `dist` folder is created after build
