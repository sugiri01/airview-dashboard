import React, { useState, useEffect } from "react";
import {
  BellRing,
  Activity,
  Wrench,
  AlertTriangle,
  Plus,
  Edit,
  Calendar,
  ChevronLeft,
  Menu,
  Download,
  Smile,
  Mail,
  UserPlus,
  Home,
  Users,
  Monitor,
  Wind,
  BarChart2,
  Settings
} from "lucide-react";

// Define types for your components
type MenuItemProps = {
  icon: React.ReactNode;
  title: string;
  badge?: string | number;
  collapsed: boolean;
  active?: boolean;
};

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
};

type StatisticItem = {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
};

type User = {
  name: string;
  role: string;
  location: string;
  status: "Active" | "Inactive";
};

type Event = {
  date: string;
  description: string;
};

type AirQualityMetric = {
  label: string;
  value: string;
  unit: string;
};

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  badge,
  collapsed,
  active = false,
}) => {
  return (
    <div className={`flex items-center p-3 cursor-pointer mx-2 rounded-md transition-colors ${active ? "bg-blue-50 dark:bg-gray-700 text-primary" : "hover:bg-blue-50 dark:hover:bg-gray-700"}`}>
      <div className="flex items-center justify-center w-6">
        {icon}
      </div>
      {!collapsed && (
        <div className="ml-3 flex-grow">
          {title}
        </div>
      )}
      {!collapsed && badge && (
        <div className="px-2 py-1 rounded-md text-xs bg-gray-200 dark:bg-gray-600">{badge}</div>
      )}
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed, darkMode, setDarkMode }) => {
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`h-full flex flex-col shadow-md bg-white dark:bg-gray-800 dark:text-white ${collapsed ? "w-16" : "w-64"} transition-all duration-300`}
    >
      {/* Logo Section */}
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border-2 border-solid border-white"></div>
            </div>
            <span className="ml-2 font-bold">Airvue</span>
          </div>
        )}
        {collapsed && (
          <div className="w-6 h-6 rounded-full mx-auto bg-blue-500 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border-2 border-solid border-white"></div>
          </div>
        )}
      </div>

      {/* User Admin View Label */}
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 mb-2">
        {!collapsed && (
          <div className="text-sm font-medium text-gray-400">
            User Admin View
          </div>
        )}
      </div>

      {/* Toggle sidebar button */}
      <div className="px-4 mb-4">
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-md w-full flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          } bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600`}
        >
          {!collapsed && <span className="text-sm">Toggle sidebar</span>}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ${collapsed ? "" : "ml-2"} transform ${
              collapsed ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-grow overflow-y-auto">
        <MenuItem
          icon={<Home size={18} />}
          title="Dashboard"
          collapsed={collapsed}
          active={true}
        />

        <MenuItem
          icon={<Users size={18} />}
          title="Users"
          collapsed={collapsed}
        />

        <MenuItem
          icon={<Monitor size={18} />}
          title="Devices"
          collapsed={collapsed}
        />

        <MenuItem
          icon={<Wind size={18} />}
          title="AQI Metrics"
          collapsed={collapsed}
        />

        <MenuItem
          icon={<BarChart2 size={18} />}
          title="Statistics"
          collapsed={collapsed}
        />

        <MenuItem
          icon={<Calendar size={18} />}
          title="Calendar"
          collapsed={collapsed}
        />

        <MenuItem
          icon={<Settings size={18} />}
          title="Settings"
          collapsed={collapsed}
        />
      </div>

      {/* Footer Items */}
      <div className="mt-auto mb-4">
        {/* Dark Mode Toggle */}
        <div className="px-4 py-3 flex items-center">
          <div
            onClick={toggleDarkMode}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
          >
            <div 
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                darkMode ? 'translate-x-6' : ''
              }`}>
            </div>
          </div>
          {!collapsed && <div className="ml-3 text-sm">{darkMode ? 'Dark' : 'Light'}</div>}
        </div>
      </div>
    </div>
  );
};

const AirViewDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Summary");
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // When darkMode changes, update the document class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Statistics data
  const statistics: StatisticItem[] = [
    { label: "Alerts This Week", value: 12, icon: BellRing, color: "orange" },
    { label: "Average AQI (Week)", value: 42, icon: Activity, color: "green" },
    { label: "Calibration Due", value: 5, icon: Wrench, color: "blue" },
    { label: "Anomalies Detected", value: 3, icon: AlertTriangle, color: "red" },
  ];

  // User management data
  const users: User[] = [
    { name: "Jane Smith", role: "Device Admin", location: "Boston", status: "Active" },
    { name: "Mike Jones", role: "User Admin", location: "Chicago", status: "Active" },
    { name: "Sarah Lee", role: "Device Admin", location: "Seattle", status: "Inactive" },
  ];

  // Calendar events
  const events: Event[] = [
    { date: "Apr 3", description: "Device #12 Maintenance" },
    { date: "Apr 5", description: "Monthly AQI Review" },
    { date: "Apr 7", description: "Sensor Calibration" },
  ];

  // Air quality metrics data
  const airQualityMetrics: AirQualityMetric[] = [
    { label: "PM2.5", value: "10.05", unit: "μg/m³" },
    { label: "PM10", value: "12.43", unit: "μg/m³" },
    { label: "NO2", value: "8.57", unit: "μg/m³" },
    { label: "O3", value: "30.0", unit: "μg/m³" },
  ];

  // Forecast hours data
  const forecastHours: string[] = ["04:00", "05:00", "06:00", "07:00", "08:00", "09:00"];

  // Helper function to get the appropriate color class for stats
  const getStatIconClass = (color: string): string => {
    switch (color) {
      case "orange":
        return "text-blue-500 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-30";
      case "green":
        return "text-green-500 bg-green-100 dark:bg-green-900 dark:bg-opacity-30";
      case "blue":
        return "text-blue-400 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20";
      case "red":
        return "text-red-500 bg-red-100 dark:bg-red-900 dark:bg-opacity-30";
      default:
        return "text-gray-500 bg-gray-100 dark:bg-gray-700";
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <Sidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 dark:text-white">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center mb-4 p-3 rounded-lg shadow-md text-white bg-gradient-to-r from-blue-500 via-blue-400 to-green-500 dark:from-blue-600 dark:via-blue-500 dark:to-green-600">
            <div className="flex items-center">
              <Menu className="w-5 h-5 mr-2" />
              <ChevronLeft className="w-5 h-5 mr-2" />
              <h1 className="font-medium text-lg">Air Quality Dashboard 0082</h1>
            </div>
            <div className="ml-auto flex items-center space-x-2">
              <span className="text-sm">Unreplicated</span>
              <div className="flex items-center rounded-md px-2 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors">
                <Download className="w-4 h-4 mr-1" />
                <span className="text-xs">CSV</span>
              </div>
              <div className="flex items-center rounded-md px-2 py-1 bg-white bg-opacity-20">
                <span className="text-xs mr-1">@phoenix</span>
                <span className="text-xs mr-1">@steve</span>
                <span className="text-xs">+5</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b mb-4 dark:border-gray-700">
            <div className="flex">
              {["Summary", "Impact", "Causes", "Response", "Remediations"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-sm font-medium relative ${
                    activeTab === tab 
                      ? "text-blue-500 border-b-2 border-blue-500" 
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-blue-400 to-green-500"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content area */}
          <div>
            <h2 className="text-lg font-medium mb-4 text-blue-900 dark:text-blue-100">Profile Overview</h2>

            {/* Profile Card */}
            <div className="mb-6">
              <div className="rounded-lg shadow-md bg-white dark:bg-gray-800 overflow-hidden">
                <div className="flex">
                  {/* Left side with gradient banner and profile image */}
                  <div className="w-1/4 p-4 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-400">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-xl font-bold text-blue-500">
                      BS
                    </div>
                  </div>

                  {/* Middle section with user info */}
                  <div className="w-2/5 p-4 border-r border-gray-100 dark:border-gray-700">
                    <h2 className="text-lg font-bold text-blue-900 dark:text-white">Britto Shibbi</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">@username</p>
                    <p className="text-sm font-medium mt-1 text-blue-400">User Admin</p>

                    <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                      <div className="flex items-start">
                        <span className="font-medium w-20">Role:</span>
                        <span>User Admin</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium w-20">Last Login:</span>
                        <span>April 1, 2025, 09:30 AM</span>
                      </div>
                    </div>
                  </div>

                  {/* Right side with stats and actions */}
                  <div className="w-2/5 p-4 flex flex-col justify-between">
                    {/* Stats Section */}
                    <div className="flex mb-3">
                      <div className="flex-1 text-center">
                        <p className="text-lg font-bold text-blue-500">42</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">DEVICES</p>
                      </div>
                      <div className="flex-1 text-center border-l border-r border-gray-100 dark:border-gray-700">
                        <p className="text-lg font-bold text-green-500">38</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">ONLINE</p>
                      </div>
                      <div className="flex-1 text-center">
                        <p className="text-lg font-bold text-red-500">4</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">OFFLINE</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button className="flex-1 py-1 px-2 rounded text-xs flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600">
                        <UserPlus className="w-3 h-3 mr-1" />
                        <span>Edit Profile</span>
                      </button>
                      <button className="flex-1 py-1 px-2 rounded text-xs flex items-center justify-center text-white bg-blue-400 hover:bg-blue-500">
                        <Mail className="w-3 h-3 mr-1" />
                        <span>Manage Devices</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Horizontal Air Quality Card */}
            <div className="mb-6">
              <div className="rounded-xl overflow-hidden shadow-md bg-white dark:bg-gray-800">
                <div className="flex flex-row">
                  {/* Left section with metrics */}
                  <div className="w-1/3 p-4 border-r border-gray-100 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-white dark:from-blue-900 dark:from-opacity-10 dark:to-gray-800">
                    {/* Header section */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="bg-green-100 dark:bg-green-900 dark:bg-opacity-30 rounded-full p-1 mr-2">
                          <Smile className="w-5 h-5 text-green-500" />
                        </div>
                        <span className="font-medium text-sm text-green-500">Very Good</span>
                      </div>

                      {/* AQI score */}
                      <div className="relative">
                        <svg width="42" height="42" viewBox="0 0 48 48">
                          <circle
                            cx="24"
                            cy="24"
                            r="20"
                            fill="none"
                            stroke={darkMode ? "#374151" : "#eaeaea"}
                            strokeWidth="4"
                          />
                          <circle
                            cx="24"
                            cy="24"
                            r="20"
                            fill="none"
                            stroke="url(#gradient-light)"
                            strokeWidth="4"
                            strokeDasharray="125.6"
                            strokeDashoffset="88"
                            transform="rotate(-90 24 24)"
                          />
                          <defs>
                            <linearGradient id="gradient-light" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#0099cc" />
                              <stop offset="50%" stopColor="#00AEEF" />
                              <stop offset="100%" stopColor="#4CAF50" />
                            </linearGradient>
                          </defs>
                          <text
                            x="24"
                            y="24"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontWeight="bold"
                            fontSize="14"
                            fill={darkMode ? "#f9fafb" : "#111827"}
                          >
                            20
                          </text>
                          <text
                            x="24"
                            y="32"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="8"
                            fill={darkMode ? "#9ca3af" : "#6b7280"}
                          >
                            AQI
                          </text>
                        </svg>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="mb-4">
                      <h2 className="text-xl font-bold text-blue-900 dark:text-white">Board room</h2>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
                        <div className="w-4 h-3 bg-gradient-to-b from-red-600 to-white dark:to-gray-800 rounded-sm mr-1"></div>
                        Chennai, India
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-2">
                      {airQualityMetrics.map((metric, index) => (
                        <div key={index} className="rounded-lg p-2 shadow-sm border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:shadow-md transition-all">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 text-center">
                            {metric.label}
                          </div>
                          <div className="font-bold text-center text-blue-900 dark:text-white">
                            {metric.value}
                          </div>
                          <div className="text-xs text-gray-400 dark:text-gray-500 text-center">
                            {metric.unit}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right section with forecast */}
                  <div className="w-2/3 p-4">
                    {/* Forecast */}
                    <div>
                      <h3 className="text-lg font-medium mb-3 text-blue-900 dark:text-white">Air Quality Forecast</h3>
                      <div className="relative h-40">
                        {/* Graph background - vertical lines */}
                        <div className="absolute inset-0 flex justify-between w-full">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-full w-px bg-gray-200 dark:bg-gray-700"></div>
                          ))}
                        </div>

                        {/* Dotted background pattern */}
                        <div className="absolute inset-0">
                          <svg width="100%" height="100%" viewBox="0 0 600 180">
                            <pattern id="dotPattern" width="15" height="15" patternUnits="userSpaceOnUse">
                              <circle cx="7.5" cy="7.5" r="1" fill={darkMode ? "rgba(0, 153, 204, 0.1)" : "#e6f7ff"} />
                            </pattern>
                            <rect width="100%" height="100%" fill="url(#dotPattern)" />
                          </svg>
                        </div>

                        {/* Line chart */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 180">
                          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#4CAF50" />
                            <stop offset="50%" stopColor="#00AEEF" />
                            <stop offset="100%" stopColor="#0099cc" />
                          </linearGradient>

                          {/* Main green-blue line */}
                          <path
                            d="M0,90 C30,85 60,95 90,80 C120,65 150,85 180,90 C210,95 240,75 270,100 C300,125 330,70 390,60 C430,50 470,35 520,35"
                            fill="none"
                            stroke="url(#chartGradient)"
                            strokeWidth="5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />

                          {/* Dotted projection line */}
                          <path
                            d="M520,35 C550,40 580,45 600,40"
                            fill="none"
                            stroke="#0099cc"
                            strokeWidth="3"
                            strokeDasharray="5,5"
                            strokeLinecap="round"
                          />

                          {/* Current point indicator - larger circle with white border */}
                          <circle cx="520" cy="35" r="12" fill="#0099cc" />
                          <circle cx="520" cy="35" r="9" fill={darkMode ? "#1f2937" : "white"} />
                          <circle cx="520" cy="35" r="6" fill="#0099cc" />
                        </svg>

                        {/* Time labels */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-gray-400 text-sm">
                          {forecastHours.map((hour, index) => (
                            <div key={index}>{hour}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Summary */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100">Air Quality Statistics</h3>
                <button className="text-xs text-blue-500">View all</button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {statistics.map((stat, index) => {
                  const iconClass = getStatIconClass(stat.color);
                  const valueClass = stat.color === "orange" 
                    ? "text-blue-500" 
                    : stat.color === "green" 
                      ? "text-green-500" 
                      : stat.color === "blue" 
                        ? "text-blue-400" 
                        : "text-red-500";

                  return (
                    <div key={index} className="rounded-lg p-3 shadow-sm bg-white dark:bg-gray-800 hover:shadow-md hover:translate-y-px transition-all">
                      <div className="flex items-center mb-2">
                        <div className={`p-2 rounded-lg mr-2 ${iconClass.split(" ")[1]}`}>
                          <stat.icon className={`h-4 w-4 ${iconClass.split(" ")[0]}`} />
                        </div>
                        <div className={`text-xl font-bold ${valueClass}`}>
                          {stat.value}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* User Management */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100">User Management</h3>
                <div className="flex space-x-2">
                  <button className="bg-blue-500 text-xs text-white rounded-md px-2 py-1 flex items-center">
                    <Plus className="w-3 h-3 mr-1" />
                    Add User
                  </button>
                  <button className="bg-blue-400 text-xs text-white rounded-md px-2 py-1 flex items-center">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </button>
                </div>
              </div>
              <div className="rounded-lg shadow-md bg-white dark:bg-gray-800">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto">
                  <thead className="bg-blue-900 text-white dark:bg-blue-900 dark:bg-opacity-80">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-white">
                        Name
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-white">
                        Role
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-white">
                        Location
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-white">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {users.map((user, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-blue-900 dark:text-white">
                          {user.name}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {user.role}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {user.location}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              user.status === "Active"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-500"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Calendar */}
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2 text-blue-900 dark:text-blue-100">Calendar</h3>
              <div className="rounded-lg shadow-md bg-white dark:bg-gray-800 p-3">
                <div className="divide-y dark:divide-gray-700">
                  {events.map((event, index) => (
                    <div key={index} className="py-2 flex items-center rounded-md p-1 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="p-2 rounded-md mr-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20">
                        <Calendar className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-blue-900 dark:text-white">
                          {event.date}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {event.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upload modal simulation */}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirViewDashboard;