// src/components/ParallaxGap.jsx
import React from 'react';

// Added 'textOpacity' to props with a default of 1 (100% visible)
const ParallaxGap = ({ image, title, subtitle, textOpacity = 0.8 }) => {
  
  const gapStyle = {
    backgroundImage: `url(${image})`,
    height: '400px',
    backgroundAttachment: 'fixed', // Creates the parallax effect
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    marginBottom: '0',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay for contrast
    zIndex: 1,
  };

  const textStyle = {
    position: 'relative',
    zIndex: 2,
    color: '#fcf6ba',
    fontFamily: 'serif',
    // Controls the transparency of the text block
    opacity: textOpacity, 
    transition: 'opacity 0.3s ease', // Smooth transition if opacity changes dynamically
  };

  return (
    <div style={gapStyle}>
      <div style={overlayStyle}></div>
      <div style={textStyle}>
        <h2 style={{ fontSize: '3rem', margin: '0 0 10px 0' }}>{title}</h2>
        <p style={{ fontSize: '1.2rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default ParallaxGap;