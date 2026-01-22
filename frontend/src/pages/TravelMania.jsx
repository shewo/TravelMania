import React from 'react';

// --- 1. The "Dark Gap" Component (Parallax) ---
const ParallaxGap = ({ image, title, subtitle }) => {
  const gapStyle = {
    backgroundImage: `url(${image})`,
    height: '500px',                 // Height of the gap
    backgroundAttachment: 'fixed',   // THE MAGIC: Keeps image still while scrolling
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // 60% Dark overlay
    zIndex: 1,
  };

  const textStyle = {
    position: 'relative',
    zIndex: 2, // Sits on top of overlay
    color: '#fff',
    fontFamily: 'Georgia, serif', // Classy font
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

// --- 2. The "Content" Component (White Sections) ---
const ContentSection = ({ title, children }) => {
  const sectionStyle = {
    padding: '100px 20px',
    backgroundColor: '#fff',
    color: '#333',
    textAlign: 'center',
    position: 'relative',
    zIndex: 10, // Ensures this slides OVER the fixed background
  };

  return (
    <div style={sectionStyle}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{title}</h2>
      <div style={{ fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
        {children}
      </div>
    </div>
  );
};

// --- 3. Main Page Assembly ---
const TravelMania = () => {
  return (
    <div>
      {/* SECTION 1: Intro */}
      <ContentSection title="Welcome to Travel Mania">
        <p>
          Discover the world's most breathtaking destinations. From the highest peaks 
          to the deepest oceans, we provide the equipment and guidance you need.
        </p>
      </ContentSection>

      {/* GAP 1: Mountain Theme */}
      <ParallaxGap 
        image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070"
        title="CONQUER HEIGHTS"
        subtitle="Professional Climbing Gear"
      />

      {/* SECTION 2: Booking Details */}
      <ContentSection title="Your Journey Starts Here">
        <p>
          Ready to book? Our premium packages include guided tours, 
          luxury camping, and 24/7 support.
        </p>
        <button style={{
          marginTop: '20px',
          padding: '15px 30px',
          fontSize: '16px',
          background: '#333',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}>
          Book Now
        </button>
      </ContentSection>

      {/* GAP 2: Camping/Night Theme */}
      <ParallaxGap 
        image="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070"
        title="SLEEP UNDER STARS"
        subtitle="Luxury Camping Experience"
      />

      {/* SECTION 3: Footer */}
      <ContentSection title="Get in Touch">
        <p>Travel Mania &copy; 2026</p>
        <p>Contact us at support@travelmania.com</p>
      </ContentSection>
    </div>
  );
};

export default TravelMania;