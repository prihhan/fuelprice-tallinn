# Git Setup and Push to GitHub

## Step-by-Step Instructions

### 1. Initialize Git Repository

```bash
# Navigate to project directory
cd fuelprice-tallinn

# Initialize git repository
git init

# Check status
git status
```

### 2. Configure Git (if not already done)

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

### 3. Create .gitignore (already created)

The `.gitignore` file is already in place with:
```
node_modules/
.env
dist/
build/
*.log
.DS_Store
.vscode/
.idea/
coverage/
```

### 4. Stage All Files

```bash
# Add all files to staging
git add .

# Verify what will be committed
git status
```

### 5. Create Initial Commit

```bash
# Commit with descriptive message
git commit -m "Initial commit: FuelPrice Tallinn MVP

- Complete full-stack application
- React frontend with map, stations list, and analytics
- Express backend with REST API
- PostgreSQL database with Prisma ORM
- Web scraper system for 5 gas station brands
- Docker deployment configuration
- Comprehensive documentation"

# Verify commit
git log
```

### 6. Create GitHub Repository

#### Option A: Via GitHub Website

1. Go to https://github.com/prihhan
2. Click the "+" icon → "New repository"
3. Repository name: `fuelprice-tallinn`
4. Description: `Real-time fuel prices for gas stations in Tallinn, Estonia`
5. Choose "Public" repository
6. **DO NOT** check "Initialize with README" (we already have one)
7. **DO NOT** add .gitignore or license (we already have them)
8. Click "Create repository"

#### Option B: Via GitHub CLI (if installed)

```bash
# Install GitHub CLI first: https://cli.github.com/

# Login to GitHub
gh auth login

# Create repository
gh repo create fuelprice-tallinn --public --source=. --remote=origin --push
```

### 7. Add Remote and Push (if using Option A)

```bash
# Add GitHub remote
git remote add origin https://github.com/prihhan/fuelprice-tallinn.git

# Verify remote
git remote -v

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### 8. Verify on GitHub

1. Go to https://github.com/prihhan/fuelprice-tallinn
2. Verify all files are present
3. Check README.md is displayed
4. Verify .gitignore is working (no node_modules, .env, etc.)

## Common Git Commands

### Daily Workflow

```bash
# Check status
git status

# Add specific files
git add file1.js file2.js

# Add all changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push

# Pull latest changes
git pull
```

### Branching

```bash
# Create new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# List branches
git branch

# Delete branch
git branch -d feature/new-feature

# Push branch to GitHub
git push -u origin feature/new-feature
```

### Viewing History

```bash
# View commit history
git log

# View compact history
git log --oneline

# View changes
git diff

# View specific file history
git log --follow filename.js
```

### Undoing Changes

```bash
# Discard changes in working directory
git checkout -- filename.js

# Unstage file
git reset HEAD filename.js

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

## GitHub Repository Setup

### Add Repository Description

1. Go to repository settings
2. Add description: "Real-time fuel prices for gas stations in Tallinn, Estonia"
3. Add website URL (if deployed)
4. Add topics: `fuel-prices`, `tallinn`, `estonia`, `react`, `nodejs`, `postgresql`

### Enable GitHub Pages (Optional)

If you want to host documentation:

1. Go to Settings → Pages
2. Source: Deploy from branch
3. Branch: main, folder: /docs
4. Save

### Setup Branch Protection (Recommended)

1. Go to Settings → Branches
2. Add rule for `main` branch
3. Enable:
   - Require pull request reviews
   - Require status checks to pass
   - Require branches to be up to date

### Add Collaborators (Optional)

1. Go to Settings → Collaborators
2. Add team members
3. Set permissions

## Continuous Integration (Optional)

### GitHub Actions Workflow

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: |
        npm install
        cd client && npm install
    
    - name: Run tests
      run: npm test
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
```

## Troubleshooting

### Authentication Issues

```bash
# Use personal access token
# GitHub Settings → Developer settings → Personal access tokens
# Generate new token with 'repo' scope

# Use token as password when pushing
git push
Username: your-username
Password: your-personal-access-token

# Or configure credential helper
git config --global credential.helper store
```

### Large Files

```bash
# If you accidentally committed large files
git rm --cached large-file.zip
echo "large-file.zip" >> .gitignore
git commit -m "Remove large file"
git push
```

### Merge Conflicts

```bash
# Pull latest changes
git pull

# Resolve conflicts in files
# Edit files to resolve conflicts

# Stage resolved files
git add resolved-file.js

# Complete merge
git commit -m "Resolve merge conflicts"

# Push changes
git push
```

## Best Practices

1. **Commit Often**: Make small, focused commits
2. **Write Clear Messages**: Describe what and why, not how
3. **Use Branches**: Create feature branches for new work
4. **Pull Before Push**: Always pull latest changes first
5. **Review Before Commit**: Check `git status` and `git diff`
6. **Don't Commit Secrets**: Never commit .env files or API keys
7. **Keep History Clean**: Use meaningful commit messages
8. **Tag Releases**: Use git tags for version releases

## Git Tags for Releases

```bash
# Create tag
git tag -a v1.0.0 -m "Initial release"

# Push tag
git push origin v1.0.0

# List tags
git tag

# Create GitHub release from tag
gh release create v1.0.0 --title "v1.0.0 - Initial Release" --notes "First production release"
```

## Repository Maintenance

### Update README Badge

Add to README.md:
```markdown
![GitHub last commit](https://img.shields.io/github/last-commit/prihhan/fuelprice-tallinn)
![GitHub issues](https://img.shields.io/github/issues/prihhan/fuelprice-tallinn)
![GitHub stars](https://img.shields.io/github/stars/prihhan/fuelprice-tallinn)
```

### Keep Dependencies Updated

```bash
# Check outdated packages
npm outdated

# Update packages
npm update

# Commit updates
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

## Final Checklist

- [ ] Git repository initialized
- [ ] All files committed
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] README.md displays correctly
- [ ] .gitignore working (no sensitive files)
- [ ] Repository description added
- [ ] Topics/tags added
- [ ] License file present
- [ ] Documentation complete

---

Your repository is now live at: https://github.com/prihhan/fuelprice-tallinn

Share it with the world! 🌍
