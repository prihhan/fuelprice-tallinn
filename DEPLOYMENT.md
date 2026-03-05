# Deployment Guide

## Prerequisites

- Git installed
- Node.js 18+ installed
- PostgreSQL 15+ installed (for local) OR Docker installed
- GitHub account access

## Step 1: Push to GitHub

### Initialize Git Repository

```bash
cd fuelprice-tallinn

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: FuelPrice Tallinn MVP"

# Add remote repository
git remote add origin https://github.com/prihhan/fuelprice-tallinn.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Create GitHub Repository

1. Go to https://github.com/prihhan
2. Click "New repository"
3. Name: `fuelprice-tallinn`
4. Description: "Real-time fuel prices for gas stations in Tallinn, Estonia"
5. Public repository
6. Do NOT initialize with README (we already have one)
7. Click "Create repository"
8. Follow the push instructions above

## Step 2: Local Development Deployment

### Setup Database

```bash
# Create PostgreSQL database
createdb fuelprice_tallinn

# Or using psql
psql -U postgres
CREATE DATABASE fuelprice_tallinn;
\q
```

### Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env file
nano .env
```

Update `.env`:
```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/fuelprice_tallinn?schema=public"
PORT=3001
NODE_ENV=development
SCRAPER_INTERVAL_MINUTES=30
```

### Install and Run

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..

# Initialize database
npm run db:push
npm run db:generate

# Run development server
npm run dev
```

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- API Docs: http://localhost:3001/api/health

## Step 3: Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

Access: http://localhost:3001

### Manual Docker Build

```bash
# Build image
docker build -t fuelprice-tallinn .

# Run PostgreSQL
docker run -d \
  --name fuelprice-db \
  -e POSTGRES_USER=fuelprice \
  -e POSTGRES_PASSWORD=fuelprice123 \
  -e POSTGRES_DB=fuelprice_tallinn \
  -p 5432:5432 \
  postgres:15-alpine

# Run application
docker run -d \
  --name fuelprice-app \
  -e DATABASE_URL="postgresql://fuelprice:fuelprice123@fuelprice-db:5432/fuelprice_tallinn" \
  -e PORT=3001 \
  -p 3001:3001 \
  --link fuelprice-db \
  fuelprice-tallinn
```

## Step 4: Production Deployment

### Option A: VPS Deployment (DigitalOcean, Linode, Hetzner)

#### 1. Provision Server

```bash
# SSH into server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install docker-compose -y
```

#### 2. Deploy Application

```bash
# Clone repository
git clone https://github.com/prihhan/fuelprice-tallinn.git
cd fuelprice-tallinn

# Create production .env
nano .env
```

Production `.env`:
```env
DATABASE_URL="postgresql://fuelprice:STRONG_PASSWORD_HERE@postgres:5432/fuelprice_tallinn?schema=public"
PORT=3001
NODE_ENV=production
SCRAPER_INTERVAL_MINUTES=30
```

```bash
# Update docker-compose.yml with strong password
nano docker-compose.yml

# Start application
docker-compose up -d

# Check logs
docker-compose logs -f
```

#### 3. Setup Nginx Reverse Proxy

```bash
# Install Nginx
apt install nginx -y

# Create Nginx config
nano /etc/nginx/sites-available/fuelprice
```

Nginx configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
ln -s /etc/nginx/sites-available/fuelprice /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

#### 4. Setup SSL with Let's Encrypt

```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Get SSL certificate
certbot --nginx -d your-domain.com

# Auto-renewal is configured automatically
```

### Option B: Heroku Deployment

```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login

# Create app
heroku create fuelprice-tallinn

# Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set SCRAPER_INTERVAL_MINUTES=30

# Deploy
git push heroku main

# Run migrations
heroku run npm run db:push

# Open app
heroku open
```

### Option C: AWS Deployment

#### Using AWS Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p docker fuelprice-tallinn

# Create environment
eb create fuelprice-production

# Deploy
eb deploy

# Open app
eb open
```

#### Using AWS ECS (Fargate)

1. Push Docker image to ECR
2. Create ECS cluster
3. Create task definition
4. Create service with load balancer
5. Configure RDS PostgreSQL
6. Update environment variables

### Option D: Railway Deployment

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose `fuelprice-tallinn`
5. Add PostgreSQL database
6. Set environment variables
7. Deploy automatically

## Step 5: Post-Deployment

### Verify Deployment

```bash
# Check health endpoint
curl https://your-domain.com/api/health

# Check stations
curl https://your-domain.com/api/stations

# Check prices
curl https://your-domain.com/api/prices
```

### Setup Monitoring

#### Using PM2 (for non-Docker deployments)

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start server/index.js --name fuelprice

# Setup startup script
pm2 startup
pm2 save

# Monitor
pm2 monit
```

#### Setup Logging

```bash
# View logs
docker-compose logs -f app

# Or with PM2
pm2 logs fuelprice
```

### Database Backups

```bash
# Backup database
docker exec fuelprice-db pg_dump -U fuelprice fuelprice_tallinn > backup.sql

# Restore database
docker exec -i fuelprice-db psql -U fuelprice fuelprice_tallinn < backup.sql

# Automated backups (cron)
crontab -e
```

Add to crontab:
```
0 2 * * * docker exec fuelprice-db pg_dump -U fuelprice fuelprice_tallinn > /backups/fuelprice_$(date +\%Y\%m\%d).sql
```

## Step 6: Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/fuelprice-tallinn
            git pull origin main
            docker-compose down
            docker-compose up -d --build
```

## Troubleshooting

### Database Connection Issues

```bash
# Check PostgreSQL is running
docker ps | grep postgres

# Check connection
docker exec -it fuelprice-db psql -U fuelprice -d fuelprice_tallinn

# View logs
docker logs fuelprice-db
```

### Application Not Starting

```bash
# Check logs
docker logs fuelprice-app

# Check environment variables
docker exec fuelprice-app env

# Restart container
docker restart fuelprice-app
```

### Scraper Failures

```bash
# Run scraper manually
docker exec fuelprice-app npm run scrape

# Check scraper logs
docker logs fuelprice-app | grep -i scraper
```

## Performance Optimization

### Enable Caching

Add Redis:
```yaml
# Add to docker-compose.yml
redis:
  image: redis:7-alpine
  ports:
    - "6379:6379"
```

### Database Optimization

```sql
-- Create indexes
CREATE INDEX idx_fuel_prices_timestamp ON fuel_prices(timestamp DESC);
CREATE INDEX idx_stations_location ON stations(latitude, longitude);
CREATE INDEX idx_price_history_station_fuel ON price_history(station_id, fuel_type);
```

### Enable Compression

```javascript
// Add to server/index.js
import compression from 'compression';
app.use(compression());
```

## Security Checklist

- [ ] Strong database passwords
- [ ] Environment variables secured
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation implemented
- [ ] SQL injection prevention (Prisma handles this)
- [ ] Regular security updates
- [ ] Firewall configured
- [ ] SSH key authentication only

## Maintenance

### Update Application

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose up -d --build

# Or without Docker
npm install
cd client && npm install && cd ..
npm run build
pm2 restart fuelprice
```

### Database Migrations

```bash
# Create migration
npx prisma migrate dev --name migration_name

# Apply in production
npx prisma migrate deploy
```

## Monitoring & Alerts

### Setup Uptime Monitoring

- UptimeRobot: https://uptimerobot.com
- Pingdom: https://www.pingdom.com
- StatusCake: https://www.statuscake.com

### Application Monitoring

- Sentry for error tracking
- New Relic for APM
- DataDog for infrastructure monitoring

## Cost Estimation

### VPS Hosting
- DigitalOcean Droplet (2GB RAM): $12/month
- Domain name: $10-15/year
- Total: ~$150/year

### Cloud Hosting
- AWS/GCP/Azure: $20-50/month
- Managed database: $15-30/month
- Total: ~$420-960/year

### Platform as a Service
- Heroku/Railway: $5-25/month
- Total: ~$60-300/year

## Support

For deployment issues:
- GitHub Issues: https://github.com/prihhan/fuelprice-tallinn/issues
- Documentation: README.md, ARCHITECTURE.md

---

Good luck with your deployment! 🚀
