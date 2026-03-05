export async function scrapeOlerex() {
  // Mock data - Replace with actual scraping from https://www.olerex.ee
  
  return [
    {
      brand: 'Olerex',
      name: 'Olerex Lasnamäe',
      address: 'Peterburi tee 71, Tallinn',
      latitude: 59.4289,
      longitude: 24.8244,
      prices: {
        '95': 1.569,
        '98': 1.709,
        'Diesel': 1.529,
        'LPG': 0.879,
        'CNG': 1.289
      }
    },
    {
      brand: 'Olerex',
      name: 'Olerex Kristiine',
      address: 'Endla 45, Tallinn',
      latitude: 59.4244,
      longitude: 24.7189,
      prices: {
        '95': 1.569,
        '98': 1.709,
        'Diesel': 1.529
      }
    }
  ];
}
