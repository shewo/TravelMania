// src/pages/MapPage.jsx
import React from 'react';
import ShopMap from '../components/ShopMap';
import '../styles/HomePage1.css'; // Reusing your global styles

const MapPage = () => {
    return (
        <div style={{ backgroundColor: "#0b0a0a", minHeight: "100vh", padding: "20px" }}>
            {/* Simple Header */}
            <nav className="hero-nav" style={{ marginBottom: "20px" }}>
                <div className="nav-group">
                    <a href="/">HOME</a>
                </div>
                <div className="hero-logo">
                    <h1 className="logo-text">TRAVELMANIA</h1>
                </div>
                <div className="nav-group">
                    <a href="/map">MAP</a>
                </div>
            </nav>

            {/* Map Content */}
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <h1 className="hero-title" style={{ fontSize: "3rem" }}>EXPLORE DESTINATIONS</h1>
                <p style={{ color: "#C5B097", letterSpacing: "2px" }}>FIND GEAR AND SHOPS NEAR YOU</p>
            </div>

            <div style={{ height: "70vh", width: "90%", margin: "0 auto", border: "2px solid #D1B48C", borderRadius: "20px" }}>
                <ShopMap />
            </div>
        </div>
    );
};

export default MapPage;