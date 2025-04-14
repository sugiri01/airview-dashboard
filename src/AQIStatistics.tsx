import { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  Bell, MapPin, Calendar, Filter, BarChart2, 
  Activity, AlertTriangle, DownloadCloud,
  Moon, Sun
} from 'lucide-react';

// Sample data for charts
const aqiTrendData = [
  { date: 'Mar 3', PM25: 42, PM10: 65, O3: 38, NO2: 45, SO2: 28 },
  { date: 'Mar 5', PM25: 45, PM10: 63, O3: 42, NO2: 48, SO2: 29 },
  { date: 'Mar 7', PM25: 41, PM10: 62, O3: 45, NO2: 43, SO2: 30 },
  { date: 'Mar 9', PM25: 44, PM10: 64, O3: 41, NO2: 46, SO2: 28 },
  { date: 'Mar 11', PM25: 48, PM10: 67, O3: 43, NO2: 49, SO2: 31 },
  { date: 'Mar 13', PM25: 51, PM10: 66, O3: 48, NO2: 51, SO2: 30 },
  { date: 'Mar 15', PM25: 55, PM10: 68, O3: 47, NO2: 50, SO2: 31 },
  { date: 'Mar 17', PM25: 49, PM10: 67, O3: 45, NO2: 47, SO2: 29 },
  { date: 'Mar 19', PM25: 47, PM10: 66, O3: 43, NO2: 45, SO2: 28 },
  { date: 'Mar 21', PM25: 44, PM10: 65, O3: 41, NO2: 44, SO2: 27 },
  { date: 'Mar 23', PM25: 48, PM10: 70, O3: 44, NO2: 47, SO2: 29 },
  { date: 'Mar 25', PM25: 50, PM10: 68, O3: 46, NO2: 49, SO2: 30 },
  { date: 'Mar 27', PM25: 51, PM10: 67, O3: 48, NO2: 50, SO2: 31 },
  { date: 'Mar 29', PM25: 53, PM10: 65, O3: 49, NO2: 52, SO2: 30 },
  { date: 'Mar 31', PM25: 49, PM10: 63, O3: 47, NO2: 48, SO2: 29 },
];

const locationData = [
  { name: 'Lobby 1', AQI: 45, color: '#4299E1' },
  { name: 'Lobby 2', AQI: 38, color: '#48BB78' },
  { name: 'Lobby 3', AQI: 52, color: '#F56565' },
  { name: 'Lobby', AQI: 32, color: '#9F7AEA' },
];

// Removed unused hourlyData

const anomalyData = [
  { id: 1, event: 'PM2.5 spike', date: 'March 15', location: 'Boston', value: 86, status: 'Resolved' },
  { id: 2, event: 'O3 drop', date: 'March 22', location: 'Chicago', value: 12, status: 'Investigating' },
  { id: 3, event: 'NO2 spike', date: 'March 29', location: 'New York', value: 65, status: 'Monitoring' },
];

// Removed unused pieData

// Quality index levels
const qualityLevels = [
  { range: '0-50', level: 'Good', color: '#48BB78' },
  { range: '51-100', level: 'Moderate', color: '#ECC94B' },
  { range: '101-150', level: 'Unhealthy for Sensitive Groups', color: '#ED8936' },
  { range: '151-200', level: 'Unhealthy', color: '#F56565' },
  { range: '201-300', level: 'Very Unhealthy', color: '#9F7AEA' },
  { range: '301+', level: 'Hazardous', color: '#E53E3E' },
];

const AQIStatistics = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [darkMode, setDarkMode] = useState(false);

  // Add effect to apply/remove dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'dark' : ''} color-transition`}>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-md">
                <Activity className="text-white" size={20} />
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-800 dark:text-white">AirView – AQI Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleDarkMode} 
                className="flex items-center dark-mode-toggle rounded-full w-12 h-6 transition-colors relative shadow-sm"
              >
                <span className="absolute left-0.5 top-0.5 bg-white dark:bg-gray-800 rounded-full w-5 h-5 transition-transform duration-300 ease-in-out dark-mode-toggle-handle flex items-center justify-center">
                  {darkMode ? <Moon size={12} className="text-gray-400" /> : <Sun size={12} className="text-yellow-500" />}
                </span>
              </button>
              <button className="flex items-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm dark:text-gray-200">
                <Calendar size={16} className="mr-1" />
                <span>Mar 3, 2025 – Apr 1, 2025</span>
              </button>
              <button className="flex items-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm dark:text-gray-200">
                <MapPin size={16} className="mr-1" />
                <span>All Locations</span>
              </button>
              <button className="flex items-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm dark:text-gray-200">
                <Filter size={16} className="mr-1" />
                <span>Daily View</span>
              </button>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'overview'
                  ? 'active-tab'
                  : 'inactive-tab'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedTab('trends')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'trends'
                  ? 'active-tab'
                  : 'inactive-tab'
              }`}
            >
              Trends Analysis
            </button>
            <button
              onClick={() => setSelectedTab('anomalies')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'anomalies'
                  ? 'active-tab'
                  : 'inactive-tab'
              }`}
            >
              Anomalies
            </button>
            <button
              onClick={() => setSelectedTab('locations')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'locations'
                  ? 'active-tab'
                  : 'inactive-tab'
              }`}
            >
              Locations
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 main-content">
          {/* Key Stats Row */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="card p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-light rounded-full p-3">
                  <BarChart2 className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Average AQI</p>
                  <div className="flex items-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">48.6</h3>
                    <span className="ml-2 text-sm font-medium text-red-500">↓ 5.2%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-secondary-light rounded-full p-3">
                  <AlertTriangle className="h-6 w-6 text-secondary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Highest AQI</p>
                  <div className="flex items-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">86</h3>
                    <span className="ml-2 text-xs font-medium text-gray-500 dark:text-gray-400">March 15 (Boston)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/20 rounded-full p-3">
                  <Bell className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Alerts</p>
                  <div className="flex items-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">17</h3>
                    <span className="ml-2 text-sm font-medium text-green-500">↑ 3</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-light rounded-full p-3">
                  <DownloadCloud className="h-6 w-6 text-green-theme" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Data Availability</p>
                  <div className="flex items-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">98.3%</h3>
                    <span className="ml-2 text-sm font-medium text-green-500">↑ 0.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Panels */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* AQI Trend by Pollutant Chart - Spans 2 columns */}
            <div className="card col-span-2">
              <div className="p-5 border-b card-divider">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">AQI Trend by Pollutant</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">March 3 to April 1, 2025</p>
              </div>
              <div className="p-5">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={aqiTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                    <XAxis dataKey="date" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                    <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: darkMode ? '#1f2937' : '#fff',
                        borderColor: darkMode ? '#374151' : '#e5e7eb',
                        color: darkMode ? '#f9fafb' : '#111827'
                      }} 
                      labelStyle={{
                        color: darkMode ? '#f9fafb' : '#111827'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="PM25" stroke="#3182CE" name="PM2.5" strokeWidth={2} />
                    <Line type="monotone" dataKey="PM10" stroke="#E53E3E" name="PM10" strokeWidth={2} />
                    <Line type="monotone" dataKey="O3" stroke="#38A169" name="O3" strokeWidth={2} />
                    <Line type="monotone" dataKey="NO2" stroke="#805AD5" name="NO2" strokeWidth={2} />
                    <Line type="monotone" dataKey="SO2" stroke="#ECC94B" name="SO2" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
                
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                  <p className="text-sm text-gray-700 dark:text-gray-300"><strong>Interpretation:</strong> PM10 values are the highest (60-70 range), peaking around March 23. PM2.5, O3, and NO2 follow in mid-range (40-50). SO2 stays consistently lowest around 30. All pollutants show mild fluctuation with a small rise toward March 28.</p>
                </div>
              </div>
            </div>

            {/* Statistical Analysis panel */}
            <div className="card">
              <div className="p-5 border-b card-divider">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Statistical Analysis</h3>
              </div>
              <div className="p-5">
                <ul className="space-y-4">
                  <li className="flex justify-between items-center pb-3 border-b card-divider">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Standard Deviation:</span>
                    <span className="font-medium text-gray-900 dark:text-white">8.4</span>
                  </li>
                  <li className="flex justify-between items-center pb-3 border-b card-divider">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Correlation (PM2.5/O3):</span>
                    <span className="font-medium text-gray-900 dark:text-white">0.72</span>
                  </li>
                  <li className="flex justify-between items-center pb-3 border-b card-divider">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Peak Hours:</span>
                    <span className="font-medium text-gray-900 dark:text-white">7–9 AM, 4–6 PM</span>
                  </li>
                  <li className="flex justify-between items-center pb-3 border-b card-divider">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Risk Assessment:</span>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded text-xs font-medium">Low</span>
                  </li>
                  <li className="flex justify-between items-center pb-3 border-b card-divider">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Seasonally Adjusted Trend:</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">Improving</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Compliance Rate:</span>
                    <span className="font-medium text-gray-900 dark:text-white">98.7%</span>
                  </li>
                </ul>
              </div>
              
              {/* Quality Index Guide */}
              <div className="p-5 border-t card-divider">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Air Quality Index</h4>
                <div className="space-y-2">
                  {qualityLevels.map((level, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: level.color }}></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{level.range}: {level.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Row - Location Comparison and Anomaly Detection */}
          <div className="grid grid-cols-2 gap-6">
            {/* Location Comparison */}
            <div className="card">
              <div className="p-5 border-b card-divider">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Location Comparison</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Average AQI by city</p>
              </div>
              <div className="p-5">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={locationData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                    <XAxis type="number" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                    <YAxis dataKey="name" type="category" width={80} stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: darkMode ? '#1f2937' : '#fff',
                        borderColor: darkMode ? '#374151' : '#e5e7eb',
                        color: darkMode ? '#f9fafb' : '#111827'
                      }}
                      labelStyle={{
                        color: darkMode ? '#f9fafb' : '#111827'
                      }}
                    />
                    <Bar dataKey="AQI" radius={[0, 4, 4, 0]}>
                      {locationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-4"><strong>Insight:</strong> Boston had the highest average AQI (52), while Seattle had the lowest (32).</p>
              </div>
            </div>
            
            {/* Anomaly Detection */}
            <div className="card">
              <div className="p-5 border-b card-divider">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Anomaly Detection</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Unusual events detected</p>
              </div>
              <div className="p-5">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Event</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {anomalyData.map((item) => (
                        <tr key={item.id} className="table-row-hover">
                          <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{item.event}</td>
                          <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.date}</td>
                          <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.location}</td>
                          <td className="px-3 py-3 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.status === 'Resolved' ? 'status-active' : 
                              item.status === 'Investigating' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400' : 
                              'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AQIStatistics;