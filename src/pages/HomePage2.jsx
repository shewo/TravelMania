import React from 'react';
import { Link } from 'react-router-dom'; // 🔗 Imported Link for navigation
import '../styles/HomePage2.css'; 
import mapImg from '../assets/map-image.png'; 

const HomePage2 = () => {
  return (
    <div className="map-section-container">
      <div className="map-content-wrapper">
        
        {/* Left Side: Map Frame */}
        <div className="map-visual">
          <div className="tablet-frame">
            <img src={mapImg} alt="Interactive Map" className="map-display" />
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="map-text-info">
          <h2 className="map-title">FIND YOUR GEAR, <br /> ANYWHERE</h2>
          <p className="map-description">
            Planning your next adventure? Simply search your destination on our 
            interactive map. We'll instantly show you the nearest and best-rated 
            travel equipment rental shops, so you can travel light and gear up on arrival. 
            No more bulky luggage, just pure exploration.
          </p>
          
          {/* 📍 The button is now wrapped in a Link to the /map route */}
          <Link to="/map">
            <button className="explore-map-btn">EXPLORE THE MAP</button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default HomePage2;