# System Architecture

## Overview

FuelPrice Tallinn is a full-stack web application that provides real-time fuel price information for gas stations in Tallinn, Estonia.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React SPA (Vite)                                    │  │
│  │  - React Router (Navigation)                         │  │
│  │  - TailwindCSS (Styling)                            │  │
│  │  - Leaflet (Maps)                                   │  │
│  │  - Chart.js (Analytics)                             │  │
│  │  - Axios (HTTP Client)                              │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│                     API LAYER                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Express.js REST API                                 │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │  Routes                                         │ │  │
│  │  │  - /api/stations                                │ │  │
│  │  │  - /api/prices                                  │ │  │
│  │  │  - /api/prices/cheapest                         │ │  │
│  │  │  - /api/prices/history/:id                      │ │  │
│  │  │  - /api/health                                  │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                  BUSINESS LOGIC LAYER                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Services                                            │  │
│  │  - Station Management                                │  │
│  │  - Price Calculation                                 │  │
│  │  - Distance Calculation (Haversine)                  │  │
│  │  - Data Normalization                                │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                  DATA ACCESS LAYER                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Prisma ORM                                          │  │
│  │  - Type-safe queries                                 │  │
│  │  - Migrations                                        │  │
│  │  - Connection pooling                                │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                   DATABASE LAYER                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  PostgreSQL 15                                       │  │
│  │  - stations table                                    │  │
│  │  - fuel_prices table                                 │  │
│  │  - price_history table                               │  │
│  │  - Indexes on: brand, location, timestamp           │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  DATA COLLECTION LAYER                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Scraper Service                                     │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │  Brand Scrapers                                 │ │  │
│  │  │  - Alexela Scraper                              │ │  │
│  │  │  - Neste Scraper                                │ │  │
│  │  │  - Circle K Scraper                             │ │  │
│  │  │  - Olerex Scraper                               │ │  │
│  │  │  - Elenger Scraper                              │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │  Scheduler (node-cron)                          │ │  │
│  │  │  - Runs every 30 minutes                        │ │  │
│  │  │  - Error handling & retry logic                 │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Component Details

### Frontend (Client)

**Technology:** React 18 + Vite

**Key Components:**
- `App.jsx` - Main application shell with routing and dark mode
- `Home.jsx` - Interactive map view with station markers
- `Stations.jsx` - Sortable/filterable station list
- `Analytics.jsx` - Price trend charts and statistics

**State Management:** React Hooks (useState, useEffect)

**Routing:** React Router v6

**Styling:** TailwindCSS with dark mode support

**Maps:** Leaflet + React-Leaflet for OpenStreetMap integration

**Charts:** Chart.js + react-chartjs-2 for price trends

### Backend (Server)

**Technology:** Node.js + Express

**Architecture Pattern:** MVC (Model-View-Controller)

**Key Modules:**
- `index.js` - Application entry point, middleware setup, cron scheduler
- `routes/stations.js` - Station endpoints
- `routes/prices.js` - Price endpoints with distance calculation
- `scrapers/index.js` - Orchestrates all scrapers

**Middleware:**
- CORS for cross-origin requests
- Express JSON parser
- Error handling

### Database

**Technology:** PostgreSQL 15

**ORM:** Prisma

**Schema Design:**
- Normalized relational structure
- Indexed for performance (brand, location, timestamp)
- Cascade deletes for referential integrity
- UUID primary keys

**Relationships:**
- Station → FuelPrice (1:N)
- Station → PriceHistory (1:N)

### Data Collection

**Scraping Strategy:**
- Modular scraper per brand
- Centralized orchestration
- Error isolation (one scraper failure doesn't affect others)
- Automatic retry logic

**Scheduling:**
- node-cron for periodic execution
- Configurable interval (default: 30 minutes)
- Runs on application startup

**Data Flow:**
1. Scraper fetches data from source
2. Data normalized to common format
3. Station upserted (create or update)
4. Current price updated
5. Price saved to history

## Data Flow

### Price Update Flow

```
External Source → Scraper → Normalization → Database
                                              ↓
                                         Current Price
                                              ↓
                                         Price History
```

### User Request Flow

```
User → React Component → Axios → Express Route → Prisma → PostgreSQL
                                                    ↓
PostgreSQL → Prisma → Express Route → JSON → React Component → User
```

## Scalability Considerations

### Current Architecture
- Single server instance
- Direct database connection
- In-process cron scheduler

### Future Improvements
- **Horizontal Scaling:** Load balancer + multiple app instances
- **Caching:** Redis for frequently accessed data
- **Queue System:** Bull/BullMQ for scraper jobs
- **CDN:** Static asset delivery
- **Database:** Read replicas for query scaling
- **Monitoring:** Prometheus + Grafana
- **Logging:** ELK stack (Elasticsearch, Logstash, Kibana)

## Security

### Current Implementation
- CORS enabled
- Environment variables for secrets
- SQL injection prevention (Prisma parameterized queries)

### Recommended Additions
- Rate limiting (express-rate-limit)
- Helmet.js for security headers
- Input validation (Joi/Zod)
- API authentication (JWT)
- HTTPS in production
- Database connection encryption

## Performance Optimization

### Database
- Indexes on frequently queried fields
- Connection pooling via Prisma
- Efficient queries (select only needed fields)

### Frontend
- Code splitting (React.lazy)
- Image optimization
- Lazy loading for map markers
- Debounced search inputs

### Backend
- Async/await for non-blocking I/O
- Efficient distance calculation (Haversine formula)
- Pagination for large datasets

## Deployment Architecture

### Docker Deployment

```
┌─────────────────────────────────────┐
│  Docker Host                         │
│  ┌───────────────────────────────┐  │
│  │  fuelprice-app container      │  │
│  │  - Node.js application        │  │
│  │  - Port 3001                  │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │  fuelprice-db container       │  │
│  │  - PostgreSQL 15              │  │
│  │  - Port 5432                  │  │
│  │  - Persistent volume          │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Production Deployment Options

1. **VPS (DigitalOcean, Linode, Hetzner)**
   - Docker Compose deployment
   - Nginx reverse proxy
   - Let's Encrypt SSL

2. **Cloud Platform (AWS, GCP, Azure)**
   - Container service (ECS, Cloud Run, App Service)
   - Managed database (RDS, Cloud SQL, Azure Database)
   - Load balancer
   - Auto-scaling

3. **Platform as a Service (Heroku, Render, Railway)**
   - Git-based deployment
   - Managed PostgreSQL
   - Automatic SSL

## Monitoring & Observability

### Recommended Metrics
- API response times
- Database query performance
- Scraper success/failure rates
- Active users
- Error rates

### Logging Strategy
- Structured logging (JSON format)
- Log levels (error, warn, info, debug)
- Centralized log aggregation
- Request/response logging

## Disaster Recovery

### Backup Strategy
- Daily database backups
- Point-in-time recovery capability
- Backup retention: 30 days
- Offsite backup storage

### High Availability
- Database replication
- Application redundancy
- Health checks
- Automatic failover

## Technology Decisions

### Why React?
- Component-based architecture
- Large ecosystem
- Excellent developer experience
- Strong community support

### Why PostgreSQL?
- ACID compliance
- Geospatial support (PostGIS for future features)
- JSON support for flexible data
- Mature and reliable

### Why Prisma?
- Type-safe database access
- Excellent TypeScript support
- Migration management
- Developer productivity

### Why Express?
- Minimal and flexible
- Large middleware ecosystem
- Well-documented
- Industry standard

## Future Architecture Enhancements

1. **Microservices**
   - Separate scraper service
   - Dedicated API gateway
   - Service mesh (Istio)

2. **Real-time Updates**
   - WebSocket support
   - Server-Sent Events
   - Live price updates

3. **Advanced Analytics**
   - Machine learning for price prediction
   - Time-series database (TimescaleDB)
   - Data warehouse (BigQuery, Redshift)

4. **Mobile Apps**
   - React Native
   - Shared API backend
   - Push notifications

5. **Internationalization**
   - Multi-language support
   - Currency conversion
   - Regional pricing
