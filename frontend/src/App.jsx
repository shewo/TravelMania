import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from './pages/CartContext'; // Path eka ube hatiyata './pages/CartContext' wenna one

// Pages
import HomePage from "./Main-sections/Homepage";
import MapPage from "./pages/MapPage";
import Dashboard from "./Main-sections/Dashboard";
import StorePage from "./pages/StorePage";
import Sellerac from "./Main-sections/Sellerac";
import Reviews from "./pages/Reviews";
import ProductInfoSection from "./pages/ProductInfoSection";
import SmoothScrollWrapper from "./components/SmoothScrollWrapper"; 
import AllStores from "./pages/AllStores";

// Cart Pages
import Cart from "./pages/Cart";       
import Checkout from "./pages/Checkout"; 

function App() {
  return (
    <CartProvider>
      <Router>
        <SmoothScrollWrapper>
          {/* METHANA check karanna: <Cart /> methana thiyenna BA */}
          
          <Routes>
            {/* '/' path eka HomePage wenna one */}
            <Route path="/" element={<HomePage />} />
            
            <Route path="/map" element={<MapPage />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/store/:id" element={<StorePage />} />
            <Route path="/Sellerac" element={<Sellerac />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/product/:id" element={<ProductInfoSection />} />
            <Route path="/all-stores" element={<AllStores />} />
            {/* Cart routes thiyenna one Routes athule */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />

          </Routes>
          
        </SmoothScrollWrapper>
      </Router>
    </CartProvider>
  );
}

export default App;