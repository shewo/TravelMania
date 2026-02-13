import React from 'react';
import ShopMap from '../components/ShopMap';
import Navbar from '../components/Navbar';
import Footer from './HomePage4'; 
import '../styles/HomePage1.css'; 
import '../styles/MapPage.css'; 

// --- IMPORT YOUR LOCAL VIDEO ---
// Ensure you have a video file at this path!
import mapBgVideo from '../assets/bg-video2.mp4'; 

const MapPage = () => {
    return (
        <div className="mappage-container">
            <Navbar/>
            
            {/* --- 1. VIDEO BACKGROUND --- */}
            <div className="video-wrapper">
                <video autoPlay loop muted playsInline className="bg-video">
                    <source src={mapBgVideo} type="video/mp4" />
                </video>
                {/* Dark Overlay to make text readable */}
                <div className="video-overlay"></div>
            </div>

            {/* --- 2. HEADER --- */}
            <div className="mappage-header">
                <h1 className="mappage-title">Explore Locations</h1>
                <p className="mappage-subtitle">Find Gear & Shops Near You</p>
            </div>

            {/* --- 3. MAP SECTION --- */}
            <div className="map-wrapper">
                <div className="map-border-glow"></div>
                <div className="map-inner-container">
                    {/* The Logic Component lives here */}
                    <ShopMap />
                </div>
            </div>
            
            {/* --- 4. FOOTER --- */}
            <div style={{ width: '100%', marginTop: '50px', position: 'relative', zIndex: 2 }}>
                <Footer />
            </div>
        </div>
    );
};

export default MapPage;