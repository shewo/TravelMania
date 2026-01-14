import React from 'react';
import '../styles/HomePage1.css'; 
import bgImage from '../assets/footer-bg.jpg'; // Path eka check karaganna (e.g., ../assets/...)

const HomePage1 = () => {
  return (
    <div 
      className="hero-section" 
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${bgImage})` }}
    >
      {/* Top Navigation */}
      <nav className="hero-nav">
        <div className="nav-group">
          <a href="#home">HOME</a>
          <a href="#map">MAP</a>
        </div>
        
        <div className="hero-logo">
          {/* Logo image eka nathnam text eka mehema danna */}
          <h1 className="logo-text">TRAVELMANIA</h1>
        </div>

        <div className="nav-group">
          <a href="#explore">EXPLORE</a>
          <a href="#about">ABOUT US</a>
        </div>
      </nav>

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