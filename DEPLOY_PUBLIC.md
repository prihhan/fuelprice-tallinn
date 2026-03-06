# Deploy FuelPrice Tallinn - Make It Publicly Accessible

## Overview

After pushing to GitHub, you need to deploy the application to make it accessible to everyone. Here are the best free/affordable options:

## 🚀 Recommended Deployment Options

### Option 1: Render (Easiest - Recommended) ⭐

**Cost:** Free tier available
**Time:** 10 minutes
**URL:** `https://fuelprice-tallinn.onrender.com`

#### Steps:

1. **Go to Render**
   - Visit: https://render.com
   - Sign up with GitHub account

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `prihhan/fuelprice-tallinn`
   - Click "Connect"

3. **Configure Service**
   - Name: `fuelprice-tallinn`
   - Environment: `Node`
   - Build Command: `npm install && cd client && npm install && cd .. && npm run db:push && npm run db:generate && cd client && npm run build`
   - Start Command: `npm start`
   - Plan: Free

4. **Add Environment Variables**
   - Click "Advanced" → "Add Environment Variable"
   - Add:
     ```
     DATABASE_URL=file:./dev.db
     NODE_ENV=production
     PORT=3001
     SCRAPER_INTERVAL_MINUTES=30
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - Your app will be live at: `https://fuelprice-tallinn.onrender.com`

#### Update server/index.js for Render

Add this before `app.listen()`:

```javascript
// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}
```

---

### Option 2: Railway (Fast & Easy) ⭐

**Cost:** Free tier with $5 credit
**Time:** 5 minutes
**URL:** `https://fuelprice-tallinn.up.railway.app`

#### Steps:

1. **Go to Railway**
   - Visit: https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose: `prihhan/fuelprice-tallinn`

3. **Add Database**
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway will auto-configure DATABASE_URL

4. **Configure Environment**
   - Click on your service
   - Go to "Variables"
   - Add:
     ```
     NODE_ENV=production
     PORT=3001
     SCRAPER_INTERVAL_MINUTES=30
     ```

5. **Deploy**
   - Railway auto-deploys on push
   - Get public URL from "Settings" → "Generate Domain"
   - Your app will be live at: `https://fuelprice-tallinn.up.railway.app`

---

### Option 3: Vercel (Frontend) + Railway (Backend)

**Cost:** Free
**Time:** 15 minutes
**Best for:** Separate frontend/backend deployment

#### Frontend on Vercel:

1. Visit: https://vercel.com
2. Import GitHub repository
3. Configure:
   - Framework: Vite
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy

#### Backend on Railway:

1. Follow Railway steps above
2. Update frontend API calls to use Railway URL

---

### Option 4: Heroku (Classic)

**Cost:** $5-7/month (no free tier anymore)
**Time:** 10 minutes
**URL:** `https://fuelprice-tallinn.herokuapp.com`

#### Steps:

1. **Install Heroku CLI**
   ```cmd
   # Download from: https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login and Create App**
   ```cmd
   heroku login
   heroku create fuelprice-tallinn
   ```

3. **Add PostgreSQL**
   ```cmd
   heroku addons:create heroku-postgresql:mini
   ```

4. **Configure Environment**
   ```cmd
   heroku config:set NODE_ENV=production
   heroku config:set SCRAPER_INTERVAL_MINUTES=30
   ```

5. **Deploy**
   ```cmd
   git push heroku main
   ```

6. **Open App**
   ```cmd
   heroku open
   ```

---

### Option 5: Netlify (Frontend Only)

**Cost:** Free
**Time:** 5 minutes
**Note:** Backend needs separate hosting

#### Steps:

1. Visit: https://netlify.com
2. Click "Add new site" → "Import from Git"
3. Choose GitHub repository
4. Configure:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/dist`
5. Deploy

---

## 📝 Required Code Changes for Production

### 1. Update server/index.js

Add static file serving:

```javascript
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ... existing code ...

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 2. Update client/vite.config.js

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
```

### 3. Update package.json

Add production scripts:

```json
{
  "scripts": {
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "server": "nodemon server/index.js",
    "client": "cd client && npm run dev",
    "build": "cd client && npm run build",
    "start": "NODE_ENV=production node server/index.js",
    "heroku-postbuild": "cd client && npm install && npm run build"
  }
}
```

---

## 🔗 After Deployment

### Update README.md

Add live demo link:

```markdown
## 🌐 Live Demo

**Application:** https://fuelprice-tallinn.onrender.com
**API:** https://fuelprice-tallinn.onrender.com/api/health
**GitHub:** https://github.com/prihhan/fuelprice-tallinn
```

### Share Your Project

1. **Update GitHub Repository**
   - Add website URL in repository settings
   - Update README with live link

2. **Share on Social Media**
   - LinkedIn
   - Twitter
   - Reddit (r/webdev, r/reactjs)
   - Dev.to

3. **Add to Portfolio**
   - Personal website
   - LinkedIn projects
   - Resume

---

## 🎯 Quick Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Choose hosting platform
- [ ] Create account on hosting platform
- [ ] Connect GitHub repository
- [ ] Configure environment variables
- [ ] Deploy application
- [ ] Test live URL
- [ ] Update README with live link
- [ ] Share with others

---

## 🆓 Free Tier Comparison

| Platform | Free Tier | Database | Auto-Deploy | Custom Domain |
|----------|-----------|----------|-------------|---------------|
| Render | ✅ Yes | SQLite only | ✅ Yes | ✅ Yes |
| Railway | $5 credit | ✅ PostgreSQL | ✅ Yes | ✅ Yes |
| Vercel | ✅ Yes | ❌ No | ✅ Yes | ✅ Yes |
| Netlify | ✅ Yes | ❌ No | ✅ Yes | ✅ Yes |
| Heroku | ❌ No ($5/mo) | ✅ PostgreSQL | ✅ Yes | ✅ Yes |

**Recommendation:** Start with Render (free) or Railway ($5 credit)

---

## 📞 Need Help?

If deployment fails:
1. Check deployment logs
2. Verify environment variables
3. Test locally first
4. Check platform documentation
5. Open GitHub issue

---

## 🎉 Success!

Once deployed, your application will be accessible to everyone at:
- **Your Live URL:** `https://your-app.platform.com`
- **GitHub Repository:** `https://github.com/prihhan/fuelprice-tallinn`

Share it with the world! 🌍
