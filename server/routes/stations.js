import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET all stations with latest prices
router.get('/', async (req, res) => {
  try {
    const stations = await prisma.station.findMany({
      include: {
        fuelPrices: {
          orderBy: { timestamp: 'desc' },
          take: 10
        }
      }
    });
    res.json(stations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET station by ID
router.get('/:id', async (req, res) => {
  try {
    const station = await prisma.station.findUnique({
      where: { id: req.params.id },
      include: {
        fuelPrices: {
          orderBy: { timestamp: 'desc' }
        }
      }
    });
    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }
    res.json(station);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
