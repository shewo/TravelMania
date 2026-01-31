import React from 'react';
import "../styles/Seller.css"; 
import { MdSwapHoriz, MdSettings, MdLogout, MdDashboard } from "react-icons/md";

const Sellersidebar = () => {
  return (
    <div className="sidebar-container">
      

      {/* හැම button එකම මේ ලිස්ට් එක ඇතුලට දාන්න */}
      <ul className="menu">
        
        {/* 1. Switch Button */}
        <div style={{ marginBottom: '10px' }}>
            <button className="gold-switch-btn">
              <MdSwapHoriz size={20} /> Switch to Seller
            </button>
        </div>

        {/* 2. Dashboard (Optional - ඔයාට ඕන නම් තියාගන්න) */}
        {/* <li className="active">
          <MdDashboard size={20} style={{ marginRight: '10px' }} /> Dashboard
        </li> */}

        {/* 3. Settings Button */}
        <button className="menu-btn">
          <MdSettings size={20} style={{ marginRight: '10px' }} /> Settings
        </button>
        
        {/* 4. Log Out Button */}
        <button className="menu-btn logout-btn">
          <MdLogout size={20} style={{ marginRight: '10px' }} /> Log Out
        </button>

      </ul>
    </div>
  );
};

export default Sellersidebar;