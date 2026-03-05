export async function scrapeCircleK() {
  // Mock data - Replace with actual scraping from https://www.circlek.ee
  
  return [
    {
      brand: 'Circle K',
      name: 'Circle K Tartu mnt',
      address: 'Tartu mnt 2, Tallinn',
      latitude: 59.4339,
      longitude: 24.7544,
      prices: {
        '95': 1.579,
        '98': 1.719,
        'Diesel': 1.539,
        'LPG': 0.889
      }
    },
    {
      brand: 'Circle K',
      name: 'Circle K Mustamäe',
      address: 'Mustamäe tee 50, Tallinn',
      latitude: 59.4019,
      longitude: 24.6944,
      prices: {
        '95': 1.579,
        '98': 1.719,
        'Diesel': 1.539
      }
    }
  ];
}
