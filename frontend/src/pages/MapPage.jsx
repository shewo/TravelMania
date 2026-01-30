// src/pages/MapPage.jsx
import React from 'react';
import ShopMap from '../components/ShopMap';
import Navbar from '../components/Navbar';
import Footer from './HomePage4'; // Importing the Footer (HomePage4)
import '../styles/HomePage1.css'; 
import '../styles/MapPage.css'; // New modern styles

const MapPage = () => {
    return (
        <div className="mappage-container">
            <Navbar/>
            
            {/* Ambient Background Glow */}
            <div className="mappage-bg-glow"></div>

            {/* Header Section */}
            <div className="mappage-header">
                <h1 className="mappage-title">Explore Locations</h1>
                <p className="mappage-subtitle">Find Gear & Shops Near You</p>
            </div>

            {/* Modern Map Wrapper */}
            <div className="map-wrapper">
                <div className="map-border-glow"></div>
                <div className="map-inner-container">
                    <ShopMap />
                </div>
            </div>
            
            {/* Footer Section */}
            <div style={{ width: '100%', marginTop: '50px' }}>
                <Footer />
            </div>
        </div>
    );
};

export default MapPage;