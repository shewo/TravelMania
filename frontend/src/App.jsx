import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from './pages/CartContext'; 

// Pages
import HomePage from "./Main-sections/Homepage";
import AboutUsExact from "./pages/Aboutus";
import ContactGods from "./pages/ContactUs";
import MapPage from "./pages/MapPage";
import Dashboard from "./Main-sections/Dashboard";
import StorePage from "./pages/StorePage";
import Sellerac from "./Main-sections/Sellerac";
import Reviews from "./pages/Reviews";
import ProductInfoSection from "./pages/ProductInfoSection";
import SmoothScrollWrapper from "./components/SmoothScrollWrapper"; 
import AllStores from "./pages/AllStores";
import ProductPage from "./pages/ProductPage";
import AdminDashboard from "./pages/AdminDashboard";

// Cart Pages
import Cart from "./pages/Cart";       
import Checkout from "./pages/Checkout"; 

// 👇 NEW: Import your Seller Dashboard Pages
import SellerDashboard from "./pages/SellerDashboard";
import MyListings from "./pages/MyListings";
import Rentals from "./pages/Rentals";
import SalesHistory from "./pages/SalesHistory";

function App() {
  return (
    <CartProvider>
      <Router>
        <SmoothScrollWrapper>
          
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/store/:id" element={<StorePage />} />
            <Route path="/Sellerac" element={<Sellerac />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/product/:id" element={<ProductInfoSection />} />
            <Route path="/all-stores" element={<AllStores />} />
            
            {/* Cart Routes */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/productpage" element={<ProductPage />} />

            {/* 👇 NEW: Routes for Seller Dashboard Navigation */}
            <Route path="/sellerdashboard" element={<SellerDashboard />} />
            <Route path="/mylistings" element={<MyListings />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/saleshistory" element={<SalesHistory />} />

            {/* About Us Route */}
            <Route path="/aboutus" element={<AboutUsExact />} />
            {/* Contact Us Route */}
            <Route path="/contactus" element={<ContactGods />} />
            <Route path="/admin" element={<AdminDashboard />} />

          </Routes>
          
        </SmoothScrollWrapper>
      </Router>
    </CartProvider>
  );
}

export default App;