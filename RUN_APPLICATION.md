# How to Run FuelPrice Tallinn Application

## Issue: PowerShell Execution Policy

Your system has PowerShell execution policy restrictions that prevent running npm commands directly.

## Solution: Enable PowerShell Scripts (Recommended)

### Option 1: Temporary Fix (Current Session Only)

Open PowerShell as Administrator and run:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Then navigate to the project and run:
```powershell
cd C:\Users\Prihhan\Desktop\KIRO\fuelprice-tallinn
npm install
npm run db:push
npm run db:generate
npm run dev
```

### Option 2: Permanent Fix (Recommended)

Open PowerShell as Administrator and run:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Then navigate to the project and run:
```powershell
cd C:\Users\Prihhan\Desktop\KIRO\fuelprice-tallinn
npm install
npm run db:push
npm run db:generate
npm run dev
```

### Option 3: Use Command Prompt (CMD)

Open Command Prompt (cmd.exe) and run:
```cmd
cd C:\Users\Prihhan\Desktop\KIRO\fuelprice-tallinn
npm install
npm run db:push
npm run db:generate
npm run dev
```

### Option 4: Use Git Bash

If you have Git Bash installed:
```bash
cd /c/Users/Prihhan/Desktop/KIRO/fuelprice-tallinn
npm install
npm run db:push
npm run db:generate
npm run dev
```

## Step-by-Step Instructions

### Step 1: Fix PowerShell Policy

Choose one of the options above to enable script execution.

### Step 2: Install Server Dependencies

```powershell
cd C:\Users\Prihhan\Desktop\KIRO\fuelprice-tallinn
npm install
```

This will install:
- Express
- Prisma
- Axios
- Cheerio
- node-cron
- And other backend dependencies

### Step 3: Install Client Dependencies

```powershell
cd client
npm install
cd ..
```

This will install:
- React
- Vite
- TailwindCSS
- Leaflet
- Chart.js
- And other frontend dependencies

### Step 4: Initialize Database

```powershell
npm run db:push
npm run db:generate
```

This will:
- Create SQLite database file (dev.db)
- Generate Prisma client
- Set up database schema

### Step 5: Run the Application

```powershell
npm run dev
```

This will start:
- Backend server on http://localhost:3001
- Frontend dev server on http://localhost:3000

### Step 6: Access the Application

Open your browser and go to:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001/api/health

## What to Expect

### First Run
1. Scraper will run automatically and populate mock data
2. You'll see console output showing scraper progress
3. Frontend will load with the map view

### Features Available
- **Map View:** Interactive map with station markers
- **Stations:** List of all stations with prices
- **Analytics:** Price trend charts

### Console Output
You should see:
```
Server running on http://localhost:3001
Scraper scheduled to run every 30 minutes
Starting fuel price scraping...
Scraping Alexela...
✓ Alexela completed: 2 stations
Scraping Neste...
✓ Neste completed: 2 stations
...
```

## Troubleshooting

### Issue: "npm is not recognized"

**Solution:** Add Node.js to PATH
1. Search for "Environment Variables" in Windows
2. Edit System Environment Variables
3. Add Node.js installation path to PATH
4. Restart terminal

### Issue: "Port 3000 or 3001 already in use"

**Solution:** Kill the process using the port
```powershell
# Find process
netstat -ano | findstr :3001

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Issue: "Cannot find module"

**Solution:** Reinstall dependencies
```powershell
rm -r node_modules
rm package-lock.json
npm install
```

### Issue: "Prisma Client not generated"

**Solution:** Generate Prisma client
```powershell
npm run db:generate
```

### Issue: Database errors

**Solution:** Reset database
```powershell
rm prisma/dev.db
npm run db:push
```

## Alternative: Manual Step-by-Step

If automated scripts don't work, run each command manually:

### 1. Install Backend
```powershell
cd C:\Users\Prihhan\Desktop\KIRO\fuelprice-tallinn
npm install express cors dotenv @prisma/client axios cheerio node-cron
npm install -D prisma nodemon concurrently jest
```

### 2. Install Frontend
```powershell
cd client
npm install react react-dom react-router-dom leaflet react-leaflet chart.js react-chartjs-2 axios
npm install -D @vitejs/plugin-react vite tailwindcss postcss autoprefixer
cd ..
```

### 3. Setup Database
```powershell
npx prisma generate
npx prisma db push
```

### 4. Start Backend
```powershell
node server/index.js
```

### 5. Start Frontend (in new terminal)
```powershell
cd client
npx vite
```

## Quick Test

After starting the application, test the API:

### Using PowerShell
```powershell
Invoke-WebRequest -Uri http://localhost:3001/api/health
Invoke-WebRequest -Uri http://localhost:3001/api/stations
```

### Using Browser
Open these URLs:
- http://localhost:3001/api/health
- http://localhost:3001/api/stations
- http://localhost:3001/api/prices

## Success Indicators

✅ Backend running: Console shows "Server running on http://localhost:3001"
✅ Frontend running: Console shows "Local: http://localhost:3000"
✅ Database working: API returns station data
✅ Scraper working: Console shows scraper completion messages

## Next Steps After Running

1. **Explore the Application**
   - View map with stations
   - Filter by fuel type
   - Check analytics page

2. **Test Features**
   - Click on station markers
   - Sort stations by price
   - Toggle dark mode

3. **Check Data**
   - Open http://localhost:3001/api/stations
   - Verify mock data is loaded
   - Check price history

4. **Implement Real Scrapers**
   - Edit files in `server/scrapers/`
   - Add real scraping logic
   - Test with `npm run scrape`

## Need Help?

If you still have issues:

1. **Check Node.js version:** `node --version` (should be 18+)
2. **Check npm version:** `npm --version` (should be 9+)
3. **Check logs:** Look for error messages in console
4. **Check ports:** Ensure 3000 and 3001 are free
5. **Check firewall:** Allow Node.js through firewall

## Contact

For issues, check:
- README.md
- SETUP.md
- GitHub Issues: https://github.com/prihhan/fuelprice-tallinn/issues

---

**Note:** The application is configured to use SQLite instead of PostgreSQL for easier local development without requiring database installation.
