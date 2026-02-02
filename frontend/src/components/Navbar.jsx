import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import '../styles/Navbar.css'; 
import logo from '../assets/title png1.png'; 
import HomeSidebar from './HomeSidebar'; 
import Signup from '../pages/Signup'; 

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  const navigate = useNavigate(); // 2. Initialize hook

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
    navigate('/'); // Optional: Redirect home on logout
  };

  // 3. Create navigation handler
  const handleProfileClick = () => {
    navigate('/Sellerac');
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

        <div className="nav-section nav-center">
          <img src={logo} alt="Travel Mania" className="nav-logo" />
        </div>

        <div className="nav-section nav-right">
          
          {user ? (
            /* 4. Update onClick to use handleProfileClick */
            <div className="user-profile" onClick={handleProfileClick}>
              <img 
                src={user.picture || `https://ui-avatars.com/api/?name=${user.name}&background=c5a059&color=000&bold=true&length=2`} 
                alt="User Avatar" 
                className="avatar-img"
              />
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