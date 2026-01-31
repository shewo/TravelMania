import React from 'react';
import "../styles/Seller.css"; 
import { MdSwapHoriz, MdSettings, MdLogout } from "react-icons/md";

const Sellersidebar = () => {
  return (
<<<<<<< HEAD
    // Renamed to 'seller-sidebar-container' to avoid conflict
    <div className="seller-sidebar-container">
=======
    <div className="sellersidebar-container">
>>>>>>> e853e4eefc8a0e1a7932edbf7b1a15bfdd8a7284
      
      {/* Header */}
      <div className="seller-sidebar-header">
        <h2 className="seller-sidebar-brand">TRAVEL MANIA</h2>
      </div>

<<<<<<< HEAD
      {/* Menu */}
      <div className="seller-sidebar-menu">
        
        {/* Switch Button */}
        <button className="seller-gold-btn">
          <MdSwapHoriz size={22} /> 
          <span>Switch to Buyer</span>
=======
      <ul className="menu">
        
        
        <div style={{ marginBottom: '10px' }}>
            <button className="gold-switch-btn">
              <MdSwapHoriz size={20} /> Switch to Seller
            </button>
        </div>

       
      
        <button className="menu-btn">
          <MdSettings size={20} style={{ marginRight: '10px' }} /> Settings
        </button>
        

        <button className="menu-btn logout-btn">
          <MdLogout size={20} style={{ marginRight: '10px' }} /> Log Out
>>>>>>> e853e4eefc8a0e1a7932edbf7b1a15bfdd8a7284
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