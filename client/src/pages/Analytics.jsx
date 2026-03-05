import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('95');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStations();
  }, []);

  useEffect(() => {
    if (selectedStation) {
      fetchHistory();
    }
  }, [selectedStation, selectedFuel]);

  const fetchStations = async () => {
    try {
      const response = await axios.get('/api/stations');
      setStations(response.data);
      if (response.data.length > 0) {
        setSelectedStation(response.data[0].id);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stations:', error);
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`/api/prices/history/${selectedStation}?fuelType=${selectedFuel}`);
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const chartData = {
    labels: history.map(h => new Date(h.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: `${selectedFuel} Price (€/L)`,
        data: history.map(h => h.price),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Fuel Price History'
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value) {
            return '€' + value.toFixed(3);
          }
        }
      }
    }
  };

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
        Price Analytics
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Station
            </label>
            <select
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            >
              {stations.map(station => (
                <option key={station.id} value={station.id}>
                  {station.name} ({station.brand})
                </option>
              ))}
            </select>
          </div>

          <div>
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
        </div>

        {history.length > 0 ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No price history available for this selection.
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Current Price
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {history.length > 0 ? `€${history[0].price.toFixed(3)}` : 'N/A'}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Average Price
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {history.length > 0
              ? `€${(history.reduce((sum, h) => sum + h.price, 0) / history.length).toFixed(3)}`
              : 'N/A'}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Price Range
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {history.length > 0
              ? `€${(Math.max(...history.map(h => h.price)) - Math.min(...history.map(h => h.price))).toFixed(3)}`
              : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
