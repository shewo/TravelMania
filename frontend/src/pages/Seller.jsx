import React from 'react';
import "../styles/Seller.css"; 
import dp from "../assets/dp.jpeg";
import { MdEmail, MdPhone } from "react-icons/md";
// Import your sidebar component
import Sellersidebar from "../Components/Sellersidebar"; 

function Seller() {
  return (
    <div className="seller-dashboard">
      
      {/* 1. The Sidebar (Fixed to the left) */}
      <Sellersidebar />

      {/* 2. The Main Content (Pushed to the right) */}
      <div className="dashboard-content">
        
        {/* Header */}
        <header className="dashboard-header">
          <h1 className="dashboard-title">SELLER DASHBOARD</h1>
        </header>

        {/* Profile Card */}
        <section className="profile-container">
          <div className="profile-image-container">
            <div className="profile-image-wrapper">
              {/* Ensure you have dp.jpeg in your assets folder */}
              <img src={dp} alt="User DP" className="profile-img" />
            </div>
          </div>

          <div className="profile-details">
            <h4 className="profile-name">John Perera</h4>
            <div className="divider-line"></div>
            <p className="profile-specialty">Camping Equipment Provider</p>
            <p className="membership-tenure">Since 2015</p>
          </div>
        </section>

        {/* Content Grid (About + Contact) */}
        <div className="dashboard-content-grid">
          
          <section className="seller-bio">
            <h3 className="section-heading">About us</h3>
            <p className="bio-text">
              Based in Belihuloya, we provide reliable camping equipment rentals for outdoor enthusiasts. 
              Our services include tents, essential camping gear, and secure vehicle parking, making it easy 
              and safe to enjoy your adventure.
            </p>
          </section>

          <section className="contact-container">
            <h3 className="section-heading">Contact Info</h3>
            <div className="contact-list">
              <div className="contact-item">
                <MdPhone className="contact-icon" />
                <div className="contact-text">
                  <span className="contact-label">Phone</span>
                  <span className="contact-value">011 237 5800</span>
                </div>
              </div>

              <div className="contact-item">
                <MdEmail className="contact-icon" />
                <div className="contact-text">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">info@example.com</span>
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