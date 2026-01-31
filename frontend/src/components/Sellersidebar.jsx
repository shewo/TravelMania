import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import "../styles/Seller.css"; 
import { MdSwapHoriz, MdSettings, MdLogout } from "react-icons/md";

const Sellersidebar = () => {
  const [showStoreForm, setShowStoreForm] = useState(false);
  const [storeDetails, setStoreDetails] = useState({
    name: '',
    description: '',
    contactNo: '',
    location: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoreDetails({ ...storeDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Store Details:', storeDetails);
    // Add logic to submit data to backend here
    setShowStoreForm(false);
    alert("Store details submitted!");
  };

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
        <button className="seller-gold-btn" onClick={() => setShowStoreForm(true)}>
          <MdSwapHoriz size={22} /> 
          <span>Switch to Seller</span>
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

      {/* Store Creation Modal */}
      {showStoreForm && createPortal(
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={() => setShowStoreForm(false)}>&times;</button>
            <div className="modal-header">
              <h3>Create Your Store</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="store-form-group">
                <label>Store Name</label>
                <input
                  type="text"
                  name="name"
                  value={storeDetails.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="store-form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={storeDetails.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="store-form-group">
                <label>Contact Number</label>
                <input
                  type="text"
                  name="contactNo"
                  value={storeDetails.contactNo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="store-form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={storeDetails.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="store-submit-btn">Create Store</button>
            </form>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};

export default Sellersidebar;