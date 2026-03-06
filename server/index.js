import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';
import path from 'path';
import { fileURLToPath } from 'url';
import stationsRouter from './routes/stations.js';
import pricesRouter from './routes/prices.js';
import { runAllScrapers } from './scrapers/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/stations', stationsRouter);
app.use('/api/prices', pricesRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Schedule scraper to run every 30 minutes
const scraperInterval = process.env.SCRAPER_INTERVAL_MINUTES || 30;
cron.schedule(`*/${scraperInterval} * * * *`, async () => {
  console.log(`[${new Date().toISOString()}] Running scheduled scraper...`);
  try {
    await runAllScrapers();
    console.log('Scraper completed successfully');
  } catch (error) {
    console.error('Scraper failed:', error);
  }
});

// Run scraper on startup
runAllScrapers().catch(console.error);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Scraper scheduled to run every ${scraperInterval} minutes`);
});
