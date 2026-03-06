# Push to GitHub - Step by Step Guide

## Prerequisites

- GitHub account: https://github.com/prihhan
- Git installed on your system
- Repository URL: https://github.com/prihhan/fuelprice-tallinn

## Step 1: Initialize Git Repository

Open Command Prompt (CMD) and run:

```cmd
cd C:\Users\Prihhan\Desktop\KIRO\fuelprice-tallinn

git init
git add .
git commit -m "Initial commit: FuelPrice Tallinn MVP - Complete full-stack application"
```

## Step 2: Create GitHub Repository

### Option A: Via GitHub Website (Recommended)

1. Go to: https://github.com/prihhan
2. Click the green "New" button (or "+" icon → "New repository")
3. Fill in the details:
   - **Repository name:** `fuelprice-tallinn`
   - **Description:** `Real-time fuel prices for gas stations in Tallinn, Estonia`
   - **Visibility:** Public ✅
   - **DO NOT** check "Initialize with README" (we already have one)
   - **DO NOT** add .gitignore or license (we already have them)
4. Click "Create repository"

### Option B: Via GitHub CLI (if installed)

```cmd
gh auth login
gh repo create fuelprice-tallinn --public --source=. --remote=origin
```

## Step 3: Connect and Push to GitHub

After creating the repository on GitHub, run these commands:

```cmd
cd C:\Users\Prihhan\Desktop\KIRO\fuelprice-tallinn

git remote add origin https://github.com/prihhan/fuelprice-tallinn.git
git branch -M main
git push -u origin main
```

### If Asked for Credentials

You'll need a Personal Access Token (not your password):

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "FuelPrice Tallinn"
4. Select scopes: ✅ repo (all)
5. Click "Generate token"
6. Copy the token (you won't see it again!)
7. When pushing, use:
   - Username: `prihhan`
   - Password: `<paste your token here>`

## Step 4: Verify on GitHub

1. Go to: https://github.com/prihhan/fuelprice-tallinn
2. Verify all files are present
3. Check that README.md displays correctly
4. Verify .gitignore is working (no node_modules, .env visible)

## Step 5: Configure Repository Settings

### Add Description and Topics

1. Go to repository settings
2. Add description: "Real-time fuel prices for gas stations in Tallinn, Estonia"
3. Add topics (click gear icon):
   - `fuel-prices`
   - `tallinn`
   - `estonia`
   - `react`
   - `nodejs`
   - `postgresql`
   - `express`
   - `web-scraping`
   - `real-time`
   - `gas-stations`

### Add Website URL (after deployment)

1. Go to repository settings
2. Add website URL in "About" section
3. Check "Use your GitHub Pages website"

## Complete Git Commands (Copy-Paste)

```cmd
cd C:\Users\Prihhan\Desktop\KIRO\fuelprice-tallinn
git init
git add .
git commit -m "Initial commit: FuelPrice Tallinn MVP

- Complete full-stack web application
- React frontend with interactive map, station list, and analytics
- Express backend with REST API
- PostgreSQL/SQLite database with Prisma ORM
- Web scraper system for 5 gas station brands (Alexela, Neste, Circle K, Olerex, Elenger)
- Docker deployment configuration
- Comprehensive documentation (10 guides)
- Support for 6 fuel types (95, 98, Diesel, LPG, CNG, Electric)
- Dark mode, responsive design, price history tracking
- Production-ready with error handling and automated scheduling"

git remote add origin https://github.com/prihhan/fuelprice-tallinn.git
git branch -M main
git push -u origin main
```

## Troubleshooting

### Error: "remote origin already exists"

```cmd
git remote remove origin
git remote add origin https://github.com/prihhan/fuelprice-tallinn.git
```

### Error: "failed to push some refs"

```cmd
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Error: Authentication failed

Use Personal Access Token instead of password (see Step 3 above)

## After Pushing Successfully

Your repository will be live at:
**https://github.com/prihhan/fuelprice-tallinn**

Next steps:
1. ✅ Code is on GitHub
2. 📝 Add repository description and topics
3. 🚀 Deploy to make it publicly accessible (see DEPLOY_PUBLIC.md)
4. 🔗 Share the live URL

---

**Note:** The code is now on GitHub, but to make the application accessible to everyone, you need to deploy it to a hosting service. See DEPLOY_PUBLIC.md for instructions.
