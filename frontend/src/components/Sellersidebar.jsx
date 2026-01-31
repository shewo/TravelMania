import React from 'react';
import "../styles/Seller.css"; 
import { MdSwapHoriz, MdSettings, MdLogout, MdDashboard } from "react-icons/md";

const Sellersidebar = () => {
  return (
    <div className="sellersidebar-container">
      

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
        </button>

      </ul>
    </div>
  );
};

export default Sellersidebar;