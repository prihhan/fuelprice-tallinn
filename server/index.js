import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';
import stationsRouter from './routes/stations.js';
import pricesRouter from './routes/prices.js';
import { runAllScrapers } from './scrapers/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/stations', stationsRouter);
app.use('/api/prices', pricesRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Scraper scheduled to run every ${scraperInterval} minutes`);
});
