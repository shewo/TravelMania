import React from 'react';
import '../styles/HomeSidebar.css';
import { FaInstagram, FaFacebookF } from "react-icons/fa";

const HomeSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`} 
        onClick={onClose}
      />

      <div className={`sidebar-container ${isOpen ? 'active' : ''}`}>
        
        {/* --- BACKGROUND --- */}
        <div className="sidebar-background">
          <video 
            className="bg-video" 
            src="/sidebar-bg.mp4" 
            autoPlay loop muted playsInline
          />
          <div className="bg-overlay"></div>
        </div>

        {/* --- NAVIGATION --- */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li className="nav-item"><a href="#home" onClick={onClose}>HOME</a></li>
            <li className="nav-item"><a href="#releases" onClick={onClose}>MAP</a></li>
            <li className="nav-item"><a href="#stockists" onClick={onClose}>RENTALS</a></li>
            <li className="nav-item"><a href="/Dashboard" onClick={onClose}>DASHBOARD</a></li>
          </ul>
        </nav>

        {/* --- FOOTER --- */}
        <div className="sidebar-footer">
          <div className="footer__follow">
            <p className="footer__followTitle">FOLLOW US</p>

            <div className="footer__icons">
              
              {/* INSTAGRAM (Unique ID & Class) */}
              <a 
                id="link-instagram" 
                className="footer__iconLink link-instagram" 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
              >
                <span className="footer__shape shape-instagram">
                  <FaInstagram className="social-icon-svg icon-instagram" />
                </span>
              </a>

              {/* FACEBOOK (Unique ID & Class) */}
              <a 
                id="link-facebook" 
                className="footer__iconLink link-facebook" 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
              >
                <span className="footer__shape shape-facebook">
                  <FaFacebookF className="social-icon-svg icon-facebook" />
                </span>
              </a>

            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default HomeSidebar;