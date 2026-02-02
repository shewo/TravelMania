import React, { useEffect, useState } from 'react';
import "../styles/Seller.css"; 
import dp from "../assets/dp.jpeg";
import { MdEmail, MdPhone } from "react-icons/md";
import Sellersidebar from "../components/Sellersidebar"; 

function Seller() {
  // 1. Create state for the user
  const [user, setUser] = useState({
    name: "Guest User",
    email: "guest@example.com",
    role: "Visitor"
  });

  // 2. Load user data on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('travelUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="seller-dashboard">
      
      <Sellersidebar />

      <div className="dashboard-content">
        
        <header className="dashboard-header">
          <h1 className="dashboard-title">MY PROFILE</h1>
        </header>

        <section className="profile-container">
          <div className="profile-image-container">
            <div className="profile-image-wrapper">
              {/* Use Google picture if available, else use Avatar generator or default dp */}
              <img 
                src={user.picture || dp} 
                alt="User DP" 
                className="profile-img" 
                onError={(e) => {e.target.src = dp}} // Fallback if link breaks
              />
            </div>
          </div>

          <div className="profile-details">
            {/* 3. Display dynamic Name */}
            <h4 className="profile-name">{user.name}</h4>
            <div className="divider-line"></div>
            {/* 4. Display dynamic Role or Email */}
            <p className="profile-specialty">{user.email}</p> 
            <p className="membership-tenure">Role: {user.role || 'Traveler'}</p>
          </div>
        </section>

        <div className="dashboard-content-grid">
          
          <section className="seller-bio">
            <h3 className="section-heading">About Me</h3>
            <p className="bio-text">
              Welcome to your personal dashboard. Here you can manage your rentals, 
              view your travel history, and update your account settings.
            </p>
          </section>

          <section className="contact-container">
            <h3 className="section-heading">Contact Info</h3>
            <div className="contact-list">
              <div className="contact-item">
                <MdPhone className="contact-icon" />
                <div className="contact-text">
                  <span className="contact-label">Phone</span>
                  <span className="contact-value">Not Provided</span>
                </div>
              </div>

              <div className="contact-item">
                <MdEmail className="contact-icon" />
                <div className="contact-text">
                  <span className="contact-label">Email</span>
                  {/* 5. Dynamic Email */}
                  <span className="contact-value">{user.email}</span>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

export default Seller;