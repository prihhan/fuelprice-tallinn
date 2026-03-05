import { PrismaClient } from '@prisma/client';
import { scrapeAlexela } from './alexela.js';
import { scrapeNeste } from './neste.js';
import { scrapeCircleK } from './circlek.js';
import { scrapeOlerex } from './olerex.js';
import { scrapeElenger } from './elenger.js';

const prisma = new PrismaClient();

export async function runAllScrapers() {
  console.log('Starting fuel price scraping...');
  
  const scrapers = [
    { name: 'Alexela', fn: scrapeAlexela },
    { name: 'Neste', fn: scrapeNeste },
    { name: 'Circle K', fn: scrapeCircleK },
    { name: 'Olerex', fn: scrapeOlerex },
    { name: 'Elenger', fn: scrapeElenger }
  ];

  for (const scraper of scrapers) {
    try {
      console.log(`Scraping ${scraper.name}...`);
      const data = await scraper.fn();
      await saveScrapedData(data);
      console.log(`✓ ${scraper.name} completed: ${data.length} stations`);
    } catch (error) {
      console.error(`✗ ${scraper.name} failed:`, error.message);
    }
  }
}

async function saveScrapedData(stations) {
  for (const stationData of stations) {
    try {
      // Upsert station
      const station = await prisma.station.upsert({
        where: { 
          id: generateStationId(stationData.brand, stationData.name)
        },
        update: {
          name: stationData.name,
          address: stationData.address,
          latitude: stationData.latitude,
          longitude: stationData.longitude,
          updatedAt: new Date()
        },
        create: {
          id: generateStationId(stationData.brand, stationData.name),
          name: stationData.name,
          brand: stationData.brand,
          address: stationData.address,
          latitude: stationData.latitude,
          longitude: stationData.longitude
        }
      });

      // Update fuel prices
      for (const [fuelType, price] of Object.entries(stationData.prices)) {
        if (price && price > 0) {
          // Update current price
          await prisma.fuelPrice.upsert({
            where: {
              id: `${station.id}-${fuelType}`
            },
            update: {
              price,
              timestamp: new Date()
            },
            create: {
              id: `${station.id}-${fuelType}`,
              stationId: station.id,
              fuelType,
              price,
              timestamp: new Date()
            }
          });

          // Save to history
          await prisma.priceHistory.create({
            data: {
              stationId: station.id,
              fuelType,
              price,
              timestamp: new Date()
            }
          });
        }
      }
    } catch (error) {
      console.error(`Error saving station ${stationData.name}:`, error.message);
    }
  }
}

function generateStationId(brand, name) {
  return `${brand.toLowerCase().replace(/\s+/g, '-')}-${name.toLowerCase().replace(/\s+/g, '-')}`;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllScrapers()
    .then(() => {
      console.log('Scraping completed');
      process.exit(0);
    })
    .catch(error => {
      console.error('Scraping failed:', error);
      process.exit(1);
    });
}
