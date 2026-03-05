# Quick Setup Guide

## Prerequisites Check

Before starting, ensure you have:

- [ ] Node.js 18 or higher installed
- [ ] PostgreSQL 15 or higher installed (or Docker)
- [ ] Git installed
- [ ] npm or yarn package manager

Check versions:
```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 9.0.0 or higher
psql --version  # Should be 15.0 or higher
git --version   # Any recent version
```

## Installation Methods

Choose one of the following methods:

### Method 1: Quick Start with Docker (Recommended)

```bash
# 1. Clone repository
git clone https://github.com/prihhan/fuelprice-tallinn.git
cd fuelprice-tallinn

# 2. Start with Docker Compose
docker-compose up -d

# 3. Access application
# Open browser: http://localhost:3001

# Done! ✅
```

### Method 2: Local Development Setup

```bash
# 1. Clone repository
git clone https://github.com/prihhan/fuelprice-tallinn.git
cd fuelprice-tallinn

# 2. Install server dependencies
npm install

# 3. Install client dependencies
cd client
npm install
cd ..

# 4. Setup PostgreSQL database
createdb fuelprice_tallinn

# 5. Configure environment
cp .env.example .env
# Edit .env with your database credentials

# 6. Initialize database
npm run db:push
npm run db:generate

# 7. Start development servers
npm run dev

# 8. Access application
# Frontend: http://localhost:3000
# Backend: http://localhost:3001

# Done! ✅
```

## Configuration

### Environment Variables

Edit `.env` file:

```env
# Database connection
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/fuelprice_tallinn?schema=public"

# Server port
PORT=3001

# Environment
NODE_ENV=development

# Scraper settings
SCRAPER_INTERVAL_MINUTES=30
```

### Database Configuration

#### Option A: Local PostgreSQL

```bash
# Create database
createdb fuelprice_tallinn

# Or using psql
psql -U postgres
CREATE DATABASE fuelprice_tallinn;
\q
```

#### Option B: Docker PostgreSQL

```bash
docker run -d \
  --name fuelprice-db \
  -e POSTGRES_USER=fuelprice \
  -e POSTGRES_PASSWORD=fuelprice123 \
  -e POSTGRES_DB=fuelprice_tallinn \
  -p 5432:5432 \
  postgres:15-alpine
```

Update `.env`:
```env
DATABASE_URL="postgresql://fuelprice:fuelprice123@localhost:5432/fuelprice_tallinn?schema=public"
```

## Verification

### Check Backend

```bash
# Health check
curl http://localhost:3001/api/health

# Expected response:
# {"status":"ok","timestamp":"2026-03-06T..."}

# Get stations
curl http://localhost:3001/api/stations

# Get prices
curl http://localhost:3001/api/prices
```

### Check Frontend

Open browser:
- http://localhost:3000 (development)
- http://localhost:3001 (production)

You should see:
- Interactive map with station markers
- Navigation menu (Map, Stations, Analytics)
- Dark mode toggle

## Common Issues

### Issue: Port already in use

```bash
# Find process using port 3001
lsof -i :3001  # macOS/Linux
netstat -ano | findstr :3001  # Windows

# Kill process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### Issue: Database connection failed

```bash
# Check PostgreSQL is running
pg_isready

# Check connection
psql -U postgres -d fuelprice_tallinn

# Verify DATABASE_URL in .env
cat .env | grep DATABASE_URL
```

### Issue: Prisma client not generated

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push
```

### Issue: Module not found

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# For client
cd client
rm -rf node_modules package-lock.json
npm install
cd ..
```

### Issue: Docker containers not starting

```bash
# Check Docker is running
docker ps

# View logs
docker-compose logs

# Restart containers
docker-compose down
docker-compose up -d

# Rebuild containers
docker-compose up -d --build
```

## Development Workflow

### Running the Application

```bash
# Development mode (hot reload)
npm run dev

# Production mode
npm run build
npm start

# Run only backend
npm run server

# Run only frontend
cd client && npm run dev
```

### Database Management

```bash
# Open Prisma Studio (GUI)
npm run db:studio

# Push schema changes
npm run db:push

# Generate Prisma client
npm run db:generate

# Run scraper manually
npm run scrape
```

### Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

## Next Steps

1. **Customize Scrapers**
   - Edit files in `server/scrapers/`
   - Implement real scraping logic
   - Test with `npm run scrape`

2. **Modify Frontend**
   - Edit components in `client/src/`
   - Customize styling in TailwindCSS
   - Add new features

3. **Deploy to Production**
   - Follow `DEPLOYMENT.md`
   - Choose hosting platform
   - Configure domain and SSL

4. **Add Features**
   - User authentication
   - Price alerts
   - Mobile app
   - See `CONTRIBUTING.md`

## Useful Commands

```bash
# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Stop services
docker-compose down

# Remove all data
docker-compose down -v

# Database backup
docker exec fuelprice-db pg_dump -U fuelprice fuelprice_tallinn > backup.sql

# Database restore
docker exec -i fuelprice-db psql -U fuelprice fuelprice_tallinn < backup.sql
```

## Getting Help

- **Documentation**: README.md, ARCHITECTURE.md, DEPLOYMENT.md
- **Issues**: https://github.com/prihhan/fuelprice-tallinn/issues
- **Discussions**: GitHub Discussions

## Resources

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Leaflet Documentation](https://leafletjs.com)
- [TailwindCSS Documentation](https://tailwindcss.com)

---

Happy coding! 🚀
