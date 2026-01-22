import React from 'react';
import '../styles/HomePage5.css'; 
import videoBg from '../assets/travel-bg.mp4'; 

const HomePage5 = () => {
  return (
    <div className="hp5-hero-section">
      
      {/* OVERLAY */}
      <div className="hp5-overlay"></div>

      {/* VIDEO BACKGROUND */}
      <video 
        src={videoBg} 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="hp5-video" 
      />

      {/* MAIN CONTENT */}
      <div className="hp5-content-wrapper">
        
       
        {/* Title */}
        <h1 className="hp5-gold-title">
            TRAVEL<br />
            MANIA
        </h1>
        
        {/* BUTTON CONTAINER (Side-by-Side) */}
        <div className="hp5-buttons-container">
          
          {/* BUTTON 1: Plan My Trip */}
          <button className="hp5-fancy-btn">
            <svg
              className="hp5-svg-frame"
              viewBox="0 0 420 64"
              preserveAspectRatio="none"
            >
              {/* The "Fancy" Angled Shape */}
              <polygon
                className="hp5-poly"
                points="40,12 380,12 408,32 380,52 40,52 12,32"
              />
              {/* Inner rectangular glow line */}
              <rect className="hp5-rect" x="20" y="18" width="380" height="28" />
            </svg>
            <span className="hp5-btn-text">Plan Your Escape</span>
          </button>

          {/* BUTTON 2: View Destinations */}
          <button className="hp5-fancy-btn">
            <svg
              className="hp5-svg-frame"
              viewBox="0 0 420 64"
              preserveAspectRatio="none"
            >
              {/* The "Fancy" Angled Shape */}
              <polygon
                className="hp5-poly"
                points="40,12 380,12 408,32 380,52 40,52 12,32"
              />
              {/* Inner rectangular glow line */}
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