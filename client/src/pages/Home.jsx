import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function Home() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [selectedFuel, setSelectedFuel] = useState('95');

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await axios.get('/api/stations');
      setStations(response.data);
      setLastUpdate(new Date());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stations:', error);
      setLoading(false);
    }
  };

  const getFuelPrice = (station, fuelType) => {
    const price = station.fuelPrices?.find(p => p.fuelType === fuelType);
    return price ? `€${price.price.toFixed(3)}` : 'N/A';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600 dark:text-gray-400">Loading stations...</div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)]">
      <div className="absolute top-20 left-4 z-[1000] bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Fuel Type
          </label>
          <select
            value={selectedFuel}
            onChange={(e) => setSelectedFuel(e.target.value)}
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
        {lastUpdate && (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
        )}
      </div>

      <MapContainer
        center={[59.4370, 24.7536]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stations.map((station) => (
          <Marker
            key={station.id}
            position={[station.latitude, station.longitude]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg">{station.name}</h3>
                <p className="text-sm text-gray-600">{station.brand}</p>
                <p className="text-xs text-gray-500 mb-2">{station.address}</p>
                <div className="space-y-1">
                  {['95', '98', 'Diesel', 'LPG', 'CNG', 'Electric'].map(fuel => {
                    const price = getFuelPrice(station, fuel);
                    if (price !== 'N/A') {
                      return (
                        <div key={fuel} className="flex justify-between text-sm">
                          <span>{fuel}:</span>
                          <span className="font-semibold">{price}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Home;
