# FuelPrice Tallinn 🚗⛽

Real-time fuel prices for gas stations in Tallinn, Estonia. Track prices across Alexela, Neste, Circle K, Olerex, and Elenger stations.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-18+-green.svg)
![React](https://img.shields.io/badge/react-18.2-blue.svg)
![PostgreSQL](https://img.shields.io/badge/postgresql-15-blue.svg)
![Docker](https://img.shields.io/badge/docker-ready-blue.svg)

## 🎯 Quick Links

- [📖 Setup Guide](SETUP.md) - Get started in 5 minutes
- [🏗️ Architecture](ARCHITECTURE.md) - System design and structure
- [🚀 Deployment](DEPLOYMENT.md) - Production deployment guide
- [🤝 Contributing](CONTRIBUTING.md) - How to contribute
- [📋 Project Summary](PROJECT_SUMMARY.md) - Complete overview

## Features

- 🗺️ **Interactive Map** - View all gas stations on OpenStreetMap
- 💰 **Real-time Prices** - Updated every 30 minutes
- 📊 **Price Analytics** - Track price trends over time
- 🔍 **Smart Search** - Find cheapest fuel near you
- 🌓 **Dark Mode** - Easy on the eyes
- 📱 **Responsive Design** - Works on all devices

## Supported Fuel Types

- 95 (Regular Petrol)
- 98 (Premium Petrol)
- Diesel
- LPG (Autogas)
- CNG (Compressed Natural Gas)
- Electric Charging

## Supported Brands

- Alexela
- Neste
- Circle K
- Olerex
- Elenger

## Tech Stack

### Frontend
- React 18
- Vite
- TailwindCSS
- Leaflet (OpenStreetMap)
- Chart.js
- Axios

### Backend
- Node.js
- Express
- PostgreSQL
- Prisma ORM
- node-cron

### Data Collection
- Axios + Cheerio (web scraping)
- Scheduled updates every 30 minutes

## Prerequisites

- Node.js 18+ 
- PostgreSQL 15+
- npm or yarn

## Installation

### Option 1: Local Development

1. **Clone the repository**
```bash
git clone https://github.com/prihhan/fuelprice-tallinn.git
cd fuelprice-tallinn
```

2. **Install dependencies**
```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

3. **Setup database**
```bash
# Create PostgreSQL database
createdb fuelprice_tallinn

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials
```

4. **Initialize database**
```bash
npm run db:push
npm run db:generate
```

5. **Run the application**
```bash
# Development mode (runs both server and client)
npm run dev

# Or run separately:
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

6. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Health: http://localhost:3001/api/health

### Option 2: Docker Deployment

1. **Clone and configure**
```bash
git clone https://github.com/prihhan/fuelprice-tallinn.git
cd fuelprice-tallinn
```

2. **Run with Docker Compose**
```bash
docker-compose up -d
```

3. **Access the application**
- Application: http://localhost:3001

## API Endpoints

### Stations
- `GET /api/stations` - Get all stations with latest prices
- `GET /api/stations/:id` - Get specific station details

### Prices
- `GET /api/prices` - Get all current prices
- `GET /api/prices/cheapest?fuelType=95&lat=59.437&lng=24.753&limit=5` - Find cheapest fuel
- `GET /api/prices/history/:stationId?fuelType=95` - Get price history

### Health
- `GET /api/health` - API health check

## Project Structure

```
fuelprice-tallinn/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx   # Map view
│   │   │   ├── Stations.jsx
│   │   │   └── Analytics.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/                # Node.js backend
│   ├── routes/
│   │   ├── stations.js
│   │   └── prices.js
│   ├── scrapers/          # Data collection
│   │   ├── index.js
│   │   ├── alexela.js
│   │   ├── neste.js
│   │   ├── circlek.js
│   │   ├── olerex.js
│   │   └── elenger.js
│   └── index.js
├── prisma/
│   └── schema.prisma      # Database schema
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

## Database Schema

### Station
- id (UUID)
- name (String)
- brand (String)
- address (String)
- latitude (Float)
- longitude (Float)
- timestamps

### FuelPrice
- id (UUID)
- stationId (FK)
- fuelType (String)
- price (Float)
- timestamp

### PriceHistory
- id (UUID)
- stationId (FK)
- fuelType (String)
- price (Float)
- timestamp

## Development

### Run scraper manually
```bash
npm run scrape
```

### Database management
```bash
# Open Prisma Studio
npm run db:studio

# Push schema changes
npm run db:push

# Generate Prisma Client
npm run db:generate
```

### Testing
```bash
npm test
```

## Deployment

### Production Build
```bash
# Build client
cd client
npm run build

# Start production server
cd ..
NODE_ENV=production npm start
```

### Environment Variables
```env
DATABASE_URL=postgresql://user:password@localhost:5432/fuelprice_tallinn
PORT=3001
NODE_ENV=production
SCRAPER_INTERVAL_MINUTES=30
```

## Data Sources

The application collects fuel price data from:
- Public APIs (when available)
- Official gas station websites (web scraping)

**Note:** Current implementation uses mock data. To enable real scraping:
1. Implement scraping logic in `server/scrapers/*.js`
2. Respect robots.txt and rate limits
3. Consider legal implications of web scraping

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Roadmap

- [ ] Implement real web scraping for all brands
- [ ] Add user authentication
- [ ] Price alerts via email/SMS
- [ ] Mobile app (React Native)
- [ ] Historical data export
- [ ] Price prediction ML model
- [ ] Multi-language support (Estonian, English, Russian)

## Support

For issues and questions:
- GitHub Issues: https://github.com/prihhan/fuelprice-tallinn/issues

## Acknowledgments

- OpenStreetMap for map data
- Gas station brands for public price information
- Estonian developer community

---

Made with ❤️ for Tallinn drivers
