import React, { useState, useContext } from "react";
import {
  RefreshCw,
  Download,
  CheckCircle,
  ChevronDown,
  Calendar,
  Info,
  MapPin,
  Smartphone
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Area } from 'recharts';

// Define types
type AQIComponentData = {
  name: string;
  value: number;
  unit: string;
  colorCode: "green" | "orange" | "blue" | "yellow" | "red" | "purple" | "brown";
};

type AQITrendData = {
  date: string;
  aqi: number;
  alert: number;
  hasAlert: boolean;
};

type AQIRangeData = {
  range: string;
  level: string;
  color: string;
  emoji: string;
};

// Custom tooltip for the chart
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <p className="font-semibold dark:text-gray-200">{payload[0].payload.date}</p>
        <p className="text-blue-600 dark:text-blue-400">AQI: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

// Main component - export as named export (not default)
export const AQIMetrics: React.FC = () => {
  // State for filters
  const [locationFilter] = useState<string>("All Locations");
  const [deviceFilter] = useState<string>("All Devices");
  const [dateRange] = useState<string>("Mar 26, 2025 – Apr 1, 2025");
  
  // AQI Components Data
  const aQIComponents: AQIComponentData[] = [
    { name: "PM2.5", value: 32, unit: "µg/m³", colorCode: "green" },
    { name: "PM10", value: 45, unit: "µg/m³", colorCode: "green" },
    { name: "CO2", value: 410, unit: "ppm", colorCode: "orange" },
    { name: "O3 (Ozone)", value: 28, unit: "ppb", colorCode: "green" },
    { name: "NO2", value: 56, unit: "ppb", colorCode: "orange" },
    { name: "SO2", value: 18, unit: "ppb", colorCode: "green" },
    { name: "Humidity", value: 65, unit: "%", colorCode: "blue" },
    { name: "Temperature", value: 76, unit: "°F", colorCode: "orange" }
  ];
  
  // AQI Trend Data
  const aQITrendData: AQITrendData[] = [
    { date: "Mar 26", aqi: 72, alert: 100, hasAlert: false },
    { date: "Mar 27", aqi: 65, alert: 100, hasAlert: false },
    { date: "Mar 28", aqi: 45, alert: 100, hasAlert: false },
    { date: "Mar 29", aqi: 38, alert: 100, hasAlert: false },
    { date: "Mar 30", aqi: 55, alert: 100, hasAlert: false },
    { date: "Mar 31", aqi: 78, alert: 100, hasAlert: true },
    { date: "Apr 1", aqi: 62, alert: 100, hasAlert: false }
  ];
  
  // AQI Range Data
  const aQIRangeData: AQIRangeData[] = [
    { range: "0-50", level: "Good", color: "bg-green-500", emoji: "🟢" },
    { range: "51-100", level: "Moderate", color: "bg-yellow-500", emoji: "🟡" },
    { range: "101-150", level: "Unhealthy for Sensitive Groups", color: "bg-orange-500", emoji: "🟠" },
    { range: "151-200", level: "Unhealthy", color: "bg-red-500", emoji: "🔴" },
    { range: "201-300", level: "Very Unhealthy", color: "bg-purple-500", emoji: "🟣" },
    { range: "301+", level: "Hazardous", color: "bg-amber-800", emoji: "🟤" }
  ];
  
  // Current AQI (for demo purposes)
  const currentAQI = 42;
  const currentAQIColor = getCurrentAQIColorClass(currentAQI);
  const currentAQIStatus = getCurrentAQIStatus(currentAQI);
  const currentAQIEmoji = getCurrentAQIEmoji(currentAQI);
  const currentAQIBgColor = getCurrentAQIBgColorClass(currentAQI);
  
  // Get current AQI status color
  function getCurrentAQIColorClass(aqi: number): string {
    if (aqi <= 50) return "text-green-500";
    if (aqi <= 100) return "text-yellow-500";
    if (aqi <= 150) return "text-orange-500";
    if (aqi <= 200) return "text-red-500";
    if (aqi <= 300) return "text-purple-500";
    return "text-amber-800";
  }
  
  // Get current AQI background color
  function getCurrentAQIBgColorClass(aqi: number): string {
    if (aqi <= 50) return "bg-green-100 dark:bg-green-900/20";
    if (aqi <= 100) return "bg-yellow-100 dark:bg-yellow-900/20";
    if (aqi <= 150) return "bg-orange-100 dark:bg-orange-900/20";
    if (aqi <= 200) return "bg-red-100 dark:bg-red-900/20";
    if (aqi <= 300) return "bg-purple-100 dark:bg-purple-900/20";
    return "bg-amber-100 dark:bg-amber-900/20";
  }
  
  // Get current AQI status text
  function getCurrentAQIStatus(aqi: number): string {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
  }
  
  // Get current AQI status emoji
  function getCurrentAQIEmoji(aqi: number): string {
    if (aqi <= 50) return "🟢";
    if (aqi <= 100) return "🟡";
    if (aqi <= 150) return "🟠";
    if (aqi <= 200) return "🔴";
    if (aqi <= 300) return "🟣";
    return "🟤";
  }
  
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl color-transition">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 color-transition">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 color-transition">AQI Metrics</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 color-transition">Real-time air quality metrics and historical trends</p>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <div className="flex items-center text-gray-600 dark:text-gray-400 color-transition">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{dateRange}</span>
          </div>
        </div>
      </div>
      
      {/* Filters and Actions */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-2 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 color-transition">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center">
            <MapPin size={16} className="text-gray-500 dark:text-gray-400 color-transition mr-2" />
            <button className="px-3 py-1.5 text-sm bg-white dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 flex items-center color-transition">
              {locationFilter}
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="flex items-center">
            <Smartphone size={16} className="text-gray-500 dark:text-gray-400 color-transition mr-2" />
            <button className="px-3 py-1.5 text-sm bg-white dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 flex items-center color-transition">
              {deviceFilter}
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1.5 text-sm bg-white dark:bg-gray-700 rounded-md flex items-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600 color-transition">
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh
          </button>
          <button className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md flex items-center hover:bg-blue-600 transition-colors">
            <Download className="w-4 h-4 mr-1" />
            Export
          </button>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - Current AQI and Components */}
        <div className="lg:col-span-1 space-y-4">
          {/* Current AQI Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-100 dark:border-gray-700 color-transition">
            <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-100 color-transition">Current AQI Overview</h3>
            <div className="flex items-center mb-4">
              <div className={`${currentAQIBgColor} w-24 h-24 rounded-full flex items-center justify-center mr-4 border-4 border-white dark:border-gray-700 shadow-inner color-transition`}>
                <span className="text-3xl font-bold text-gray-800 dark:text-white color-transition">{currentAQI}</span>
              </div>
              <div>
                <div className={`text-xl font-bold ${currentAQIColor} flex items-center color-transition`}>
                  {currentAQIEmoji} {currentAQIStatus}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1 mt-1 color-transition">
                  <span className="font-medium">Primary Pollutant:</span> PM2.5
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1 color-transition">
                  <span className="font-medium">Last Updated:</span> Apr 1, 2025, 10:30 AM
                </div>
                <div className="flex items-center text-sm text-green-500 mt-2 bg-green-50 dark:bg-green-900/20 py-1.5 px-2 rounded-md color-transition">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span>No Alerts</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* AQI Components */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-100 dark:border-gray-700 color-transition">
            <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-100 color-transition">AQI Components</h3>
            <div className="grid grid-cols-2 gap-3">
              {aQIComponents.map((component, index) => (
                <div 
                  key={index} 
                  className="rounded-lg p-4 border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 color-transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-400 dark:text-gray-400 color-transition">
                      {component.name}
                    </span>
                    <div className={`w-4 h-4 rounded-full ${component.colorCode === "green" ? "bg-green-500" : 
                      component.colorCode === "orange" ? "bg-orange-500" : 
                      component.colorCode === "blue" ? "bg-blue-500" : 
                      component.colorCode === "yellow" ? "bg-yellow-500" : 
                      component.colorCode === "red" ? "bg-red-500" :
                      component.colorCode === "purple" ? "bg-purple-500" :
                      "bg-amber-800"}`}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-2xl font-semibold text-gray-900 dark:text-white color-transition">
                      {component.value}
                    </span>
                    <span className="text-sm text-blue-400 dark:text-blue-400 color-transition">
                      {component.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* AQI Scale Legend */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-100 dark:border-gray-700 color-transition">
            <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-100 color-transition">AQI Scale</h3>
            <div className="grid grid-cols-2 gap-3">
              {aQIRangeData.map((range, index) => (
                <div key={index} className="flex items-center p-3 rounded-md bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 color-transition">
                  <div className={`w-8 h-8 rounded-full ${range.color} flex items-center justify-center mr-3`}>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-500 dark:text-gray-400 color-transition">{range.range}</span>
                    <span className="block text-sm text-gray-400 dark:text-gray-500 color-transition">{range.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Columns - AQI Trend Graph */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-100 dark:border-gray-700 h-full color-transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 color-transition">AQI Trend (Last 7 Days)</h3>
              <button className="text-sm text-blue-500 hover:text-blue-600 flex items-center">
                <Info className="w-4 h-4 mr-1" />
                Details
              </button>
            </div>
            
            {/* Recharts Graph */}
            <div className="h-80 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={aQITrendData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-gray-700" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} className="text-gray-600 dark:text-gray-400" />
                  <YAxis tick={{ fontSize: 12 }} className="text-gray-600 dark:text-gray-400" />
                  <Tooltip content={<CustomTooltip />} />
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="aqi" stroke="none" fillOpacity={1} fill="url(#colorUv)" />
                  <ReferenceLine y={50} stroke="rgba(34, 197, 94, 0.5)" strokeDasharray="3 3" />
                  <ReferenceLine y={100} stroke="rgba(234, 179, 8, 0.5)" strokeDasharray="3 3" />
                  <Legend verticalAlign="top" height={36} />
                  <Line
                    type="monotone"
                    dataKey="aqi"
                    name="AQI Overall"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ r: 6, strokeWidth: 2, stroke: "#3b82f6", fill: "white" }}
                    activeDot={{ r: 8, strokeWidth: 2, stroke: "#2563eb", fill: "#3b82f6" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="alert"
                    name="Alert Threshold"
                    stroke="#eab308"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Graph Legend */}
            <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-md mb-4 color-transition">
              <div className="flex items-center px-2 py-1">
                <div className="w-4 h-0 border-t-2 border-blue-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400 color-transition">AQI Overall</span>
              </div>
              <div className="flex items-center px-2 py-1">
                <div className="w-4 h-0 border-t-2 border-dashed border-yellow-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400 color-transition">Alert Threshold</span>
              </div>
              <div className="flex items-center px-2 py-1">
                <div className="w-4 h-3 bg-green-100 dark:bg-green-900/20 opacity-60 mr-2 color-transition"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400 color-transition">Good Range</span>
              </div>
              <div className="flex items-center px-2 py-1">
                <div className="w-4 h-3 bg-yellow-100 dark:bg-yellow-900/20 opacity-60 mr-2 color-transition"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400 color-transition">Moderate</span>
              </div>
            </div>
            
            {/* Interpretation section */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md text-sm color-transition">
              <ul className="text-gray-600 dark:text-gray-400 space-y-3 pl-4 list-none color-transition">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-500 mt-2 mr-2"></span>
                  <div><span className="text-gray-500 dark:text-gray-300 font-medium">March 26:</span> AQI just under 75</div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-500 mt-2 mr-2"></span>
                  <div><span className="text-gray-500 dark:text-gray-300 font-medium">March 27:</span> Slight decrease</div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-500 mt-2 mr-2"></span>
                  <div><span className="text-gray-500 dark:text-gray-300 font-medium">March 28:</span> Further decline, around 40–50</div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-500 mt-2 mr-2"></span>
                  <div><span className="text-gray-500 dark:text-gray-300 font-medium">March 29:</span> AQI dips to the week's low (~35–40)</div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-500 mt-2 mr-2"></span>
                  <div><span className="text-gray-500 dark:text-gray-300 font-medium">March 30:</span> AQI begins to rise again</div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-500 mt-2 mr-2"></span>
                  <div><span className="text-gray-500 dark:text-gray-300 font-medium">March 31:</span> Peak near 80 (week's highest)</div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-500 mt-2 mr-2"></span>
                  <div><span className="text-gray-500 dark:text-gray-300 font-medium">April 1:</span> Drops back slightly to around 60–65</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 color-transition">
        Data refreshes automatically every 30 minutes. Last refresh: April 1, 2025, 10:30 AM
      </div>
    </div>
  );
};