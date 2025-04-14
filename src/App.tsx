import React, { useState } from "react";
import AirViewDashboard from "./AirViewDashboard";
import { AQIMetrics } from "./AQIMetrics"; // Import as named import, not default
import AQIStatistics from "./AQIStatistics"; // Import the AQIStatistics component

function App() {
  const [currentView, setCurrentView] = useState<"dashboard" | "metrics" | "statistics">("dashboard");
  
  return (
    <div>
      {currentView === "dashboard" && <AirViewDashboard />}
      {currentView === "metrics" && <AQIMetrics />}
      {currentView === "statistics" && <AQIStatistics />}
    </div>
  );
}

export default App;