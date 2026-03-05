# Project Folder Structure

## Complete File Tree

```
fuelprice-tallinn/
│
├── 📁 client/                          # React Frontend Application
│   ├── 📁 src/
│   │   ├── 📁 pages/
│   │   │   ├── Home.jsx               # Map view with station markers
│   │   │   ├── Stations.jsx           # Station list with filters
│   │   │   └── Analytics.jsx          # Price charts and statistics
│   │   ├── App.jsx                    # Main app component with routing
│   │   ├── main.jsx                   # React entry point
│   │   └── index.css                  # Global styles with Tailwind
│   ├── index.html                     # HTML template
│   ├── package.json                   # Frontend dependencies
│   ├── vite.config.js                 # Vite configuration
│   ├── tailwind.config.js             # TailwindCSS configuration
│   └── postcss.config.js              # PostCSS configuration
│
├── 📁 server/                          # Express Backend Application
│   ├── 📁 routes/
│   │   ├── 📁 __tests__/
│   │   │   └── prices.test.js         # API tests
│   │   ├── stations.js                # Station endpoints
│   │   └── prices.js                  # Price endpoints
│   ├── 📁 scrapers/
│   │   ├── index.js                   # Scraper orchestrator
│   │   ├── alexela.js                 # Alexela scraper
│   │   ├── neste.js                   # Neste scraper
│   │   ├── circlek.js                 # Circle K scraper
│   │   ├── olerex.js                  # Olerex scraper
│   │   └── elenger.js                 # Elenger scraper
│   └── index.js                       # Server entry point
│
├── 📁 prisma/
│   └── schema.prisma                  # Database schema definition
│
├── 📄 .dockerignore                    # Docker ignore rules
├── 📄 .env.example                     # Environment variables template
├── 📄 .gitignore                       # Git ignore rules
├── 📄 ARCHITECTURE.md                  # System architecture documentation
├── 📄 CONTRIBUTING.md                  # Contribution guidelines
├── 📄 DEPLOYMENT.md                    # Deployment guide
├── 📄 docker-compose.yml               # Multi-container Docker setup
├── 📄 Dockerfile                       # Docker image configuration
├── 📄 FINAL_INSTRUCTIONS.md            # Final setup instructions
├── 📄 FOLDER_STRUCTURE.md              # This file
├── 📄 GIT_SETUP.md                     # Git workflow guide
├── 📄 jest.config.js                   # Jest test configuration
├── 📄 LICENSE                          # MIT License
├── 📄 package.json                     # Server dependencies
├── 📄 PROJECT_SUMMARY.md               # Complete project overview
├── 📄 README.md                        # Main documentation
└── 📄 SETUP.md                         # Quick setup guide
```

## File Count by Category

### Source Code Files
- **Frontend:** 7 files (React components, styles)
- **Backend:** 9 files (API routes, scrapers)
- **Database:** 1 file (Prisma schema)
- **Configuration:** 8 files (Docker, Vite, Tailwind, etc.)
- **Tests:** 1 file (Jest tests)

### Documentation Files
- **User Guides:** 3 files (README, SETUP, DEPLOYMENT)
- **Developer Guides:** 3 files (ARCHITECTURE, CONTRIBUTING, GIT_SETUP)
- **Reference:** 3 files (PROJECT_SUMMARY, FINAL_INSTRUCTIONS, FOLDER_STRUCTURE)

### Total Files: 35+

## Directory Breakdown

### `/client` - Frontend (React)
**Purpose:** User interface and client-side logic

**Key Files:**
- `src/pages/Home.jsx` - Interactive map with Leaflet
- `src/pages/Stations.jsx` - Filterable station list
- `src/pages/Analytics.jsx` - Price trend charts
- `src/App.jsx` - Main app with routing and dark mode
- `vite.config.js` - Build configuration with proxy

**Technologies:**
- React 18.2
- Vite 5.0
- TailwindCSS 3.3
- Leaflet (maps)
- Chart.js (analytics)
- React Router v6

### `/server` - Backend (Express)
**Purpose:** API server and business logic

**Key Files:**
- `index.js` - Express server with cron scheduler
- `routes/stations.js` - Station CRUD operations
- `routes/prices.js` - Price queries and calculations
- `scrapers/index.js` - Orchestrates all scrapers
- `scrapers/*.js` - Brand-specific scrapers

**Technologies:**
- Node.js 18+
- Express 4.18
- node-cron 3.0
- Axios + Cheerio (scraping)

### `/prisma` - Database
**Purpose:** Database schema and migrations

**Key Files:**
- `schema.prisma` - Database models and relations

**Models:**
- Station (gas station information)
- FuelPrice (current prices)
- PriceHistory (historical data)

**Technologies:**
- Prisma ORM 5.7
- PostgreSQL 15

### Root Configuration Files

**Docker:**
- `Dockerfile` - Multi-stage build for production
- `docker-compose.yml` - PostgreSQL + App containers
- `.dockerignore` - Exclude unnecessary files

**Git:**
- `.gitignore` - Exclude node_modules, .env, etc.
- `GIT_SETUP.md` - Git workflow instructions

**Environment:**
- `.env.example` - Environment variable template

**Testing:**
- `jest.config.js` - Jest configuration

**Package Management:**
- `package.json` - Server dependencies and scripts

**License:**
- `LICENSE` - MIT License

### Documentation Files

**User Documentation:**
1. `README.md` - Main project documentation
   - Features overview
   - Installation instructions
   - API documentation
   - Technology stack

2. `SETUP.md` - Quick setup guide
   - Prerequisites
   - Installation methods
   - Configuration
   - Troubleshooting

3. `DEPLOYMENT.md` - Production deployment
   - VPS deployment
   - Cloud deployment
   - Docker deployment
   - CI/CD setup

**Developer Documentation:**
1. `ARCHITECTURE.md` - System design
   - Architecture diagram
   - Component details
   - Data flow
   - Scalability considerations

2. `CONTRIBUTING.md` - Contribution guide
   - How to contribute
   - Coding standards
   - Pull request process
   - Development setup

3. `GIT_SETUP.md` - Git workflow
   - Repository setup
   - Commit guidelines
   - Branch strategy
   - GitHub integration

**Reference Documentation:**
1. `PROJECT_SUMMARY.md` - Complete overview
   - What was built
   - Technology stack
   - Features implemented
   - Future enhancements

2. `FINAL_INSTRUCTIONS.md` - Setup checklist
   - Next steps
   - Quick commands
   - Troubleshooting
   - Success criteria

3. `FOLDER_STRUCTURE.md` - This file
   - File tree
   - Directory breakdown
   - File descriptions

## File Sizes (Approximate)

### Source Code
- Frontend: ~1,500 lines
- Backend: ~800 lines
- Database: ~100 lines
- Configuration: ~300 lines
- Tests: ~100 lines

### Documentation
- Total: ~5,000 lines
- Average per file: ~600 lines

### Total Project
- Lines of Code: ~2,800
- Lines of Documentation: ~5,000
- Total Lines: ~7,800

## Key Features by File

### Frontend Features

**Home.jsx**
- Interactive OpenStreetMap
- Station markers with popups
- Fuel type filter
- Real-time price display
- Last updated timestamp

**Stations.jsx**
- Sortable station list
- Filter by brand
- Filter by fuel type
- Price comparison
- Cheapest stations highlighted

**Analytics.jsx**
- Price history charts
- Station selection
- Fuel type selection
- Statistics (current, average, range)

**App.jsx**
- React Router navigation
- Dark mode toggle
- Responsive layout
- Navigation menu

### Backend Features

**routes/stations.js**
- GET all stations with prices
- GET station by ID
- Prisma integration

**routes/prices.js**
- GET all current prices
- GET cheapest fuel (with distance)
- GET price history
- Haversine distance calculation

**scrapers/index.js**
- Orchestrate all scrapers
- Error handling per scraper
- Data normalization
- Database upsert logic

**scrapers/*.js**
- Brand-specific scraping
- Mock data structure
- Ready for real implementation

**index.js**
- Express server setup
- CORS configuration
- Cron scheduler (30 min)
- Health check endpoint

### Database Features

**schema.prisma**
- Station model with location
- FuelPrice model with timestamps
- PriceHistory for analytics
- Optimized indexes
- Cascade deletes

## Dependencies Overview

### Frontend Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.1",
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.1",
  "chart.js": "^4.4.1",
  "react-chartjs-2": "^5.2.0",
  "axios": "^1.6.2"
}
```

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "@prisma/client": "^5.7.1",
  "axios": "^1.6.2",
  "cheerio": "^1.0.0-rc.12",
  "node-cron": "^3.0.3"
}
```

### Dev Dependencies
```json
{
  "prisma": "^5.7.1",
  "nodemon": "^3.0.2",
  "concurrently": "^8.2.2",
  "jest": "^29.7.0",
  "vite": "^5.0.8",
  "tailwindcss": "^3.3.6"
}
```

## Scripts Available

### Development
```bash
npm run dev          # Run both frontend and backend
npm run server       # Run backend only
npm run client       # Run frontend only
```

### Database
```bash
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
```

### Scraping
```bash
npm run scrape       # Run scraper manually
```

### Building
```bash
npm run build        # Build frontend for production
npm start            # Start production server
```

### Testing
```bash
npm test             # Run Jest tests
```

## Environment Variables

Required in `.env`:
```env
DATABASE_URL         # PostgreSQL connection string
PORT                 # Server port (default: 3001)
NODE_ENV            # Environment (development/production)
SCRAPER_INTERVAL_MINUTES  # Scraper frequency (default: 30)
```

## Git Ignored Files

The following are excluded from version control:
- `node_modules/` - Dependencies
- `.env` - Environment variables
- `dist/` - Build output
- `build/` - Build output
- `*.log` - Log files
- `.DS_Store` - macOS files
- `.vscode/` - Editor settings
- `.idea/` - IDE settings
- `coverage/` - Test coverage

## Docker Volumes

Persistent data:
- `postgres_data` - Database storage

## Ports Used

- `3000` - Frontend (development)
- `3001` - Backend API
- `5432` - PostgreSQL database

## API Endpoints

```
GET  /api/health                    # Health check
GET  /api/stations                  # All stations
GET  /api/stations/:id              # Specific station
GET  /api/prices                    # All prices
GET  /api/prices/cheapest           # Cheapest fuel
GET  /api/prices/history/:stationId # Price history
```

## Database Tables

```
stations         # Gas station information
fuel_prices      # Current fuel prices
price_history    # Historical price data
```

## Supported Brands

1. Alexela
2. Neste
3. Circle K
4. Olerex
5. Elenger

## Supported Fuel Types

1. 95 (Regular Petrol)
2. 98 (Premium Petrol)
3. Diesel
4. LPG (Autogas)
5. CNG (Compressed Natural Gas)
6. Electric Charging

---

**Total Project Size:** ~7,800 lines of code and documentation
**File Count:** 35+ files
**Directories:** 8 directories
**Technologies:** 15+ technologies

This structure provides a clean, organized, and scalable foundation for the FuelPrice Tallinn application.
