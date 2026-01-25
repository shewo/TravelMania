import React from 'react';
import '../styles/HomePage5.css'; 

// 1. IMPORT YOUR TITLE PNG HERE
import titlePng from '../assets/hero-title 2.png'; 

const HomePage5 = () => {
  return (
    <div className="hp5-hero-section">
      
      {/* OVERLAY */}
      <div className="hp5-overlay"></div>

      {/* VIDEO BACKGROUND */}
      <video 
        src="/travel-bg.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="hp5-video" 
      />

      {/* MAIN CONTENT */}
      <div className="hp5-content-wrapper">
        
        {/* --- NEW: TITLE PNG ADDED ABOVE PARAGRAPH --- */}
        <div className="hp5-title-container">
            <img src={titlePng} alt="Travel Mania" className="hp5-title-img" />
        </div>

        {/* Existing Paragraph */}
        <p className="hp5-gold-title">
            "Where every great journey finds its gear.<br/>
             We combine smart travel management with an extensive rental marketplace,
             giving you instant access to the equipment you need,<br/>
             exactly when you need it. Don't just plan your trip—equip it."<br/>
        </p>
        
        {/* BUTTON CONTAINER */}
        <div className="hp5-buttons-container">
          
          {/* BUTTON 1 */}
          <button className="hp5-fancy-btn">
            <svg className="hp5-svg-frame" viewBox="0 0 420 64" preserveAspectRatio="none">
              <polygon className="hp5-poly" points="40,12 380,12 408,32 380,52 40,52 12,32" />
              <rect className="hp5-rect" x="20" y="18" width="380" height="28" />
            </svg>
            <span className="hp5-btn-text">Plan Your Escape</span>
          </button>

          {/* BUTTON 2 */}
          <button className="hp5-fancy-btn">
            <svg className="hp5-svg-frame" viewBox="0 0 420 64" preserveAspectRatio="none">
              <polygon className="hp5-poly" points="40,12 380,12 408,32 380,52 40,52 12,32" />
              <rect className="hp5-rect" x="20" y="18" width="380" height="28" />
            </svg>
            <span className="hp5-btn-text">Elite Escapes</span>
          </button>

        </div>

      </div>
    </div>
  );
};

export default HomePage5;