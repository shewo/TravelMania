import React from 'react';
import '../styles/Navbar.css';
import navBg from '../assets/footer-bg.jpg'; // ඔයාගේ image එක මෙතනින් import කරන්න

const Navbar = () => {
  return (
    <nav 
      className="hero-nav" 
      
    >
      <div className="nav-group">
        <a href="/">HOME</a>
        <a href="/map">MAP</a>
      </div>
      
      <div className="hero-logo">
        <h1 className="logo-text">TRAVELMANIA</h1>
      </div>

      <div className="nav-group">
        <a href="#explore">EXPLORE</a>
        <a href="#about">ABOUT US</a>
      </div>
    </nav>
  );
};

export default Navbar;