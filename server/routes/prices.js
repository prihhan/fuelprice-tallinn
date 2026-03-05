import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET all current prices
router.get('/', async (req, res) => {
  try {
    const prices = await prisma.fuelPrice.findMany({
      include: { station: true },
      orderBy: { timestamp: 'desc' }
    });
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET cheapest prices by fuel type
router.get('/cheapest', async (req, res) => {
  try {
    const { fuelType, lat, lng, limit = 5 } = req.query;
    
    if (!fuelType) {
      return res.status(400).json({ error: 'fuelType is required' });
    }

    const prices = await prisma.fuelPrice.findMany({
      where: { fuelType },
      include: { station: true },
      orderBy: { price: 'asc' },
      take: parseInt(limit)
    });

    // If coordinates provided, calculate distance
    if (lat && lng) {
      const userLat = parseFloat(lat);
      const userLng = parseFloat(lng);
      
      const pricesWithDistance = prices.map(price => ({
        ...price,
        distance: calculateDistance(
          userLat, userLng,
          price.station.latitude, price.station.longitude
        )
      }));
      
      pricesWithDistance.sort((a, b) => a.distance - b.distance);
      return res.json(pricesWithDistance);
    }

    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET price history for a station
router.get('/history/:stationId', async (req, res) => {
  try {
    const { fuelType } = req.query;
    const where = { stationId: req.params.stationId };
    
    if (fuelType) {
      where.fuelType = fuelType;
    }

    const history = await prisma.priceHistory.findMany({
      where,
      orderBy: { timestamp: 'desc' },
      take: 100
    });
    
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Haversine formula for distance calculation
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default router;
