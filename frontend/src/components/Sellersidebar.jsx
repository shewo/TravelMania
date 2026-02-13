import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; // 1. Import this
import "../styles/Seller.css"; 
import { MdSwapHoriz, MdSettings, MdLogout, MdMyLocation } from "react-icons/md";

const Sellersidebar = () => {
  const [showStoreForm, setShowStoreForm] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const navigate = useNavigate(); // 2. Initialize navigation
  
  const [storeDetails, setStoreDetails] = useState({
    name: '',
    description: '',
    contactNo: '',
    location: '',
    latitude: null,
    longitude: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoreDetails({ ...storeDetails, [name]: value });
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          if (response.data && response.data.display_name) {
            setStoreDetails(prev => ({
              ...prev,
              location: response.data.display_name, 
              latitude: latitude,
              longitude: longitude
            }));
          } else {
            setStoreDetails(prev => ({
              ...prev,
              location: `${latitude}, ${longitude}`,
              latitude: latitude,
              longitude: longitude
            }));
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          setStoreDetails(prev => ({
            ...prev,
            location: `${latitude}, ${longitude}`,
            latitude: latitude,
            longitude: longitude
          }));
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve location. Please allow GPS access.");
        setIsLoadingLocation(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!storeDetails.latitude || !storeDetails.longitude) {
      alert("Please set a location using the GPS button.");
      return;
    }

    try {
      // 3. Send data to backend to UPDATE DATABASE
      const response = await axios.post('http://localhost:8080/api/shops/create', {
        name: storeDetails.name,
        description: storeDetails.description,
        contactNo: storeDetails.contactNo,
        latitude: storeDetails.latitude,
        longitude: storeDetails.longitude
      });

      console.log("Store Created:", response.data);
      alert("Store created successfully!");
      
      // Save shopId to localStorage
      try {
        const storedUser = JSON.parse(localStorage.getItem('travelUser') || '{}');
        storedUser.shopId = response.data.id;
        localStorage.setItem('travelUser', JSON.stringify(storedUser));
      } catch (error) {
        console.error("Error saving shop ID to localStorage:", error);
        alert("Shop created but failed to save shop ID. Please reload the page.");
      }
      
      // 4. Close Modal & Redirect to Dashboard
      setShowStoreForm(false);
      navigate('/dashboard'); 

    } catch (error) {
      console.error("Error creating store:", error);
      alert("Failed to create store. Check console for details.");
    }
  };

  return (
    <div className="seller-sidebar-container">
      <div className="seller-sidebar-header">
        <h2 className="seller-sidebar-brand">TRAVEL MANIA</h2>
      </div>

      <div className="seller-sidebar-menu">
        <button className="seller-gold-btn" onClick={() => setShowStoreForm(true)}>
          <MdSwapHoriz size={22} /> 
          <span>Switch to Seller</span>
        </button>
        <button className="seller-menu-btn">
          <MdSettings size={22} /> 
          <span>Settings</span>
        </button>
      </div>

      <div className="seller-sidebar-footer">
        <button className="seller-menu-btn seller-logout-btn">
          <MdLogout size={22} /> 
          <span>Log Out</span>
        </button>
      </div>

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
                <input type="text" name="name" value={storeDetails.name} onChange={handleInputChange} required />
              </div>
              <div className="store-form-group">
                <label>Description</label>
                <textarea name="description" value={storeDetails.description} onChange={handleInputChange} required />
              </div>
              <div className="store-form-group">
                <label>Contact Number</label>
                <input type="text" name="contactNo" value={storeDetails.contactNo} onChange={handleInputChange} required />
              </div>
              
              <div className="store-form-group">
                <label>Location</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    name="location"
                    value={storeDetails.location}
                    onChange={handleInputChange}
                    placeholder={isLoadingLocation ? "Locating..." : "Address or Coords"}
                    required
                    style={{ flex: 1 }}
                    readOnly 
                  />
                  <button 
                    type="button" 
                    onClick={handleGetLocation}
                    disabled={isLoadingLocation}
                    title="Get Current Location"
                    style={{
                      padding: '0 12px',
                      cursor: 'pointer',
                      backgroundColor: '#f0f0f0',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                  >
                    {isLoadingLocation ? '...' : <MdMyLocation size={20} />}
                  </button>
                </div>
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