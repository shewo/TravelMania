import React from 'react';
import { Link } from 'react-router-dom';
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
            <li className="nav-item"><Link to="/" onClick={onClose}>HOME</Link></li>
            <li className="nav-item"><Link to="/map" onClick={onClose}>MAP</Link></li>
            <li className="nav-item"><Link to="/all-stores" onClick={onClose}>STORE</Link></li>
            <li className="nav-item"><Link to="/productpage" onClick={onClose}>INVENTORY</Link></li>
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