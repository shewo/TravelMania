import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Main-sections/Homepage";
import MapPage from "./pages/MapPage";
import StorePage from "./pages/StorePage";
import Dashboard from "./Main-sections/Dashboard";
import Sellerac from "./Main-sections/Sellerac";
import Reviews from "./pages/Reviews";
import ProductInfoSection from "./pages/ProductInfoSection";
import SmoothScrollWrapper from "./components/SmoothScrollWrapper"; 

function App() {
  return (
    <Router>
      <SmoothScrollWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/store/:id" element={<StorePage />} />
          <Route path="/Sellerac" element={<Sellerac />} />
          <Route path="/reviews" element={<Reviews />} />
          
          {/* Product routes */}
          <Route path="/product/:id" element={<ProductInfoSection />} />
          <Route path="/product" element={<ProductInfoSection />} />
        </Routes>
      </SmoothScrollWrapper>
    </Router>
  );
}

export default App;