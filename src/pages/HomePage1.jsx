import React from 'react';
import '../styles/HomePage1.css'; 
import bgImage from '../assets/footer-bg.jpg'; // Path eka check karaganna (e.g., ../assets/...)
import Navbar from '../components/Navbar';

const HomePage1 = () => {
  return (
    <div 
      className="hero-section" 
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${bgImage})` }}
    >
      {/* Top Navigation */}
      <Navbar />

      {/* Hero Content */}
      <div className="hero-main">
        <span className="hero-subtitle">✦ A GIFT FROM THE GODS ✦</span>
        <h1 className="hero-title">
          AN EPIC <br />
          JOURNEY <br />
          AWAITS
        </h1>
        
        <div className="hero-action">
          <button className="start-btn">
            START ADVENTURE
          </button>
        </div>

        <div className="hero-footer">
          <p>DISCOVER MORE</p>
          <div className="scroll-line"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage1;