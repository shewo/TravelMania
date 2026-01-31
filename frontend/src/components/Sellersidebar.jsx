import React from 'react';
import "../styles/Seller.css"; 
import { MdSwapHoriz, MdSettings, MdLogout } from "react-icons/md";

const Sellersidebar = () => {
  return (
    // Renamed to 'seller-sidebar-container' to avoid conflict
    <div className="seller-sidebar-container">
      
      {/* Header */}
      <div className="seller-sidebar-header">
        <h2 className="seller-sidebar-brand">TRAVEL MANIA</h2>
      </div>

      {/* Menu */}
      <div className="seller-sidebar-menu">
        
        {/* Switch Button */}
        <button className="seller-gold-btn">
          <MdSwapHoriz size={22} /> 
          <span>Switch to Buyer</span>
        </button>

        {/* Settings Button */}
        <button className="seller-menu-btn">
          <MdSettings size={22} /> 
          <span>Settings</span>
        </button>
        
      </div>

      {/* Footer */}
      <div className="seller-sidebar-footer">
        <button className="seller-menu-btn seller-logout-btn">
          <MdLogout size={22} /> 
          <span>Log Out</span>
        </button>
      </div>

    </div>
  );
};

export default Sellersidebar;