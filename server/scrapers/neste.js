export async function scrapeNeste() {
  // Mock data - Replace with actual scraping from https://www.neste.ee
  
  return [
    {
      brand: 'Neste',
      name: 'Neste Viru',
      address: 'Viru väljak 2, Tallinn',
      latitude: 59.4370,
      longitude: 24.7536,
      prices: {
        '95': 1.599,
        '98': 1.739,
        'Diesel': 1.559,
        'CNG': 1.299
      }
    },
    {
      brand: 'Neste',
      name: 'Neste Pärnu mnt',
      address: 'Pärnu mnt 139, Tallinn',
      latitude: 59.4089,
      longitude: 24.6889,
      prices: {
        '95': 1.599,
        '98': 1.739,
        'Diesel': 1.559
      }
    }
  ];
}
