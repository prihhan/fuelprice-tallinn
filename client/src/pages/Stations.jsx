import { useState, useEffect } from 'react';
import axios from 'axios';

function Stations() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterBrand, setFilterBrand] = useState('all');
  const [filterFuel, setFilterFuel] = useState('95');
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await axios.get('/api/stations');
      setStations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stations:', error);
      setLoading(false);
    }
  };

  const brands = ['all', ...new Set(stations.map(s => s.brand))];

  const filteredStations = stations
    .filter(station => filterBrand === 'all' || station.brand === filterBrand)
    .map(station => ({
      ...station,
      currentPrice: station.fuelPrices?.find(p => p.fuelType === filterFuel)?.price || null
    }))
    .filter(station => station.currentPrice !== null)
    .sort((a, b) => {
      if (sortBy === 'price') return a.currentPrice - b.currentPrice;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Gas Stations in Tallinn
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Brand
            </label>
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            >
              {brands.map(brand => (
                <option key={brand} value={brand}>
                  {brand === 'all' ? 'All Brands' : brand}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fuel Type
            </label>
            <select
              value={filterFuel}
              onChange={(e) => setFilterFuel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            >
              <option value="95">95</option>
              <option value="98">98</option>
              <option value="Diesel">Diesel</option>
              <option value="LPG">LPG</option>
              <option value="CNG">CNG</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            >
              <option value="price">Price (Low to High)</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStations.map((station, index) => (
          <div
            key={station.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {station.name}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">{station.brand}</p>
              </div>
              {index < 3 && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  #{index + 1} Cheapest
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{station.address}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">{filterFuel}</span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                €{station.currentPrice.toFixed(3)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredStations.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No stations found with the selected filters.
        </div>
      )}
    </div>
  );
}

export default Stations;
