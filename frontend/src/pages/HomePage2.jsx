import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/HomePage2.css'; 
import mapImg from '../assets/map-image.png'; 
import titlePng from '../assets/find-gear-title.png'; // 1. IMPORT YOUR PNG HERE

// IMPORT YOUR VIDEO HERE
import bgVideo from '../assets/your-video-file.mp4'; 

const HomePage2 = () => {
  return (
    <div className="hp2-section-container">
      
      {/* --- BACKGROUND VIDEO START --- */}
      <div className="hp2-video-wrapper">
        <video 
          className="hp2-bg-video" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hp2-video-overlay"></div>
      </div>
      {/* --- BACKGROUND VIDEO END --- */}

      <div className="hp2-content-wrapper">
        
        {/* Left Side: Map Visuals */}
        <div className="hp2-visual">
          <div className="hp2-tablet-frame">
            <img src={mapImg} alt="Interactive Map" className="hp2-map-display" />
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="hp2-text-info">
          
          {/* --- 2. REPLACED TEXT TITLE WITH PNG --- */}
          <div className="hp2-title-container">
            <img src={titlePng} alt="Find Your Gear, Anywhere" className="hp2-title-png" />
          </div>
          
          <Link to="/map" style={{ textDecoration: 'none' }}>
            <button className="hp2-cta-btn">
              <svg
                className="hp2-frame"
                viewBox="0 0 420 64"
                preserveAspectRatio="none"
              >
                <polygon
                  className="hp2-inner"
                  points="40,12 380,12 408,32 380,52 40,52 12,32"
                />
                <rect className="hp2-innerBox" x="20" y="18" width="380" height="28" />
              </svg>
              <span>EXPLORE THE MAP</span>
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default HomePage2;