import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css'; 
import logo from '../assets/title png1.png'; 

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar-split ${isScrolled ? 'scrolled' : ''}`}>
      
      {/* LEFT SECTION */}
      <div className="nav-section nav-left">
        <button className="menu-btn">
          <div className="hamburger-icon">
            <span className="line"></span>
            <span className="line"></span>
          </div>
          <span className="menu-text">MENU</span>
        </button>
      </div>

      {/* CENTER SECTION */}
      <div className="nav-section nav-center">
        <img src={logo} alt="Travel Mania" className="nav-logo" />
      </div>

      {/* RIGHT SECTION */}
      <div className="nav-section nav-right">
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
        
        {/* Button is here, CSS below removes the frame */}
        <button className="action-btn">JOIN THE CLUB</button>
      </div>

    </nav>
  );
};

export default Navbar;