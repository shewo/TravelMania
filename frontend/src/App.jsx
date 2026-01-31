import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Main-sections/Homepage";
import MapPage from "./pages/MapPage";
import StorePage from "./pages/StorePage";
import Dashboard from "./Main-sections/Dashboard";
import Sellerac from "./Main-sections/Sellerac";



// 1. Import the wrapper (adjust path if you put it somewhere else)
import SmoothScrollWrapper from "./components/SmoothScrollWrapper"; 

function App() {
  return (
    <Router>
      {/* 2. Add the wrapper inside Router but outside Routes */}
      <SmoothScrollWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />

          <Route path="/store/:id" element={<StorePage />} />
          <Route path="/Sellerac" element={<Sellerac />} />
    
          
          
        </Routes>
      </SmoothScrollWrapper>
    </Router>
  );
}

export default App;