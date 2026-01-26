import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css'; 
import logo from '../assets/title png1.png'; 
import HomeSidebar from './HomeSidebar'; 
import Signup from '../pages/Signup'; 

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('travelUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('travelUser', JSON.stringify(userData));
    setIsSignupOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('travelUser');
    setUser(null);
    setIsSignupOpen(false);
  };

  return (
    <>
      <HomeSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      <Signup 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        user={user}       
        onLogout={handleLogout} 
      />

      <nav className={`navbar-split ${isScrolled ? 'scrolled' : ''}`}>
        
        {/* LEFT SECTION */}
        <div className="nav-section nav-left">
          <button 
            className={`menu-btn ${isSidebarOpen ? 'open' : ''}`} 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <div className="hamburger-icon">
              <span className="line top"></span>
              <span className="line middle"></span>
              <span className="line bottom"></span>
            </div>
            <span className="menu-text">{isSidebarOpen ? 'CLOSE' : 'MENU'}</span>
          </button>
        </div>

        {/* CENTER SECTION */}
        <div className="nav-section nav-center">
          <img src={logo} alt="Travel Mania" className="nav-logo" />
        </div>

        {/* RIGHT SECTION */}
        <div className="nav-section nav-right">
          
          {user ? (
            /* ========================================================
               UPDATED: NAME REMOVED, ONLY AVATAR SHOWN
               ======================================================== */
            <div className="user-profile" onClick={() => setIsSignupOpen(true)}>
              <img 
                // Me link eken auto akuru deka (Initials) wadinawa image eka athulata
                src={`https://ui-avatars.com/api/?name=${user.name}&background=c5a059&color=000&bold=true&length=2`} 
                alt="User Avatar" 
                className="avatar-img"
              />
              {/* Methana thibba nama ain kala */}
            </div>
          ) : (
            <button 
              className="action-btn" 
              onClick={() => setIsSignupOpen(true)}
            >
              JOIN THE CLUB
            </button>
          )}

        </div>

      </nav>
    </>
  );
};

export default Navbar;