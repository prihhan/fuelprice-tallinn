export async function scrapeElenger() {
  // Mock data - Replace with actual scraping from https://www.elenger.ee
  
  return [
    {
      brand: 'Elenger',
      name: 'Elenger CNG Pärnu mnt',
      address: 'Pärnu mnt 555, Tallinn',
      latitude: 59.3869,
      longitude: 24.6144,
      prices: {
        'CNG': 1.279,
        'Electric': 0.35
      }
    }
  ];
}
