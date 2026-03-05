import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeAlexela() {
  // Mock data - Replace with actual scraping logic
  // Real implementation would scrape from https://www.alexela.ee/tanklate-hinnad
  
  return [
    {
      brand: 'Alexela',
      name: 'Alexela Peterburi tee',
      address: 'Peterburi tee 46, Tallinn',
      latitude: 59.4378,
      longitude: 24.7936,
      prices: {
        '95': 1.589,
        '98': 1.729,
        'Diesel': 1.549,
        'LPG': 0.899
      }
    },
    {
      brand: 'Alexela',
      name: 'Alexela Järvevana',
      address: 'Järvevana tee 9, Tallinn',
      latitude: 59.4169,
      longitude: 24.6644,
      prices: {
        '95': 1.589,
        '98': 1.729,
        'Diesel': 1.549,
        'LPG': 0.899
      }
    }
  ];
  
  /* Real scraping implementation example:
  try {
    const response = await axios.get('https://www.alexela.ee/tanklate-hinnad');
    const $ = cheerio.load(response.data);
    const stations = [];
    
    $('.station-item').each((i, elem) => {
      const name = $(elem).find('.station-name').text().trim();
      const address = $(elem).find('.station-address').text().trim();
      // Parse prices and coordinates
      stations.push({
        brand: 'Alexela',
        name,
        address,
        latitude: parseFloat($(elem).data('lat')),
        longitude: parseFloat($(elem).data('lng')),
        prices: {
          '95': parseFloat($(elem).find('.price-95').text()),
          '98': parseFloat($(elem).find('.price-98').text()),
          'Diesel': parseFloat($(elem).find('.price-diesel').text())
        }
      });
    });
    
    return stations;
  } catch (error) {
    console.error('Alexela scraping error:', error);
    return [];
  }
  */
}
