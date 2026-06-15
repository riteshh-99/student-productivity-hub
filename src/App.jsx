import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import GoalTracker from "./components/GoalTracker";
import AttendanceCalculator from "./components/AttendanceCalculator";
import CGPATracker from "./components/CGPATracker";
import PomodoroTimer from "./components/PomodoroTimer";
import DashboardHeader from "./components/DashboardHeader";
import StatsCards from "./components/StatsCards";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
      <div className={darkMode ? "app dark" : "app"}>
        <div className="container">
          <Navbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
          
          <StatsCards />
          <DashboardHeader />
          <GoalTracker />
          <AttendanceCalculator />
          <CGPATracker />
          <PomodoroTimer />
        </div>
      </div>
  );
}

export default App;