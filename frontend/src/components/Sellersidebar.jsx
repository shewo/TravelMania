import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import "../styles/Seller.css"; 
import { MdSwapHoriz, MdSettings, MdLogout, MdMyLocation } from "react-icons/md";

const Sellersidebar = () => {
  const [showStoreForm, setShowStoreForm] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [hasStore, setHasStore] = useState(false);
  const navigate = useNavigate();

  const [storeDetails, setStoreDetails] = useState({
    name: '',
    description: '',
    contactNo: '',
    location: '',
    latitude: null,
    longitude: null
  });

  React.useEffect(() => {
    const checkStoreStatus = async () => {
      const storedUser = localStorage.getItem('travelUser');
      const token = localStorage.getItem('token');

      if (storedUser) {
        try {
          const userObj = JSON.parse(storedUser);
          if (userObj.shopId) {
            setHasStore(true);
          } else if (userObj.id || userObj._id) {
            try {
              const userId = userObj.id || userObj._id;
              const response = await axios.get(`http://localhost:8080/api/shops/user/${userId}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
              });
              if (response.data) {
                setHasStore(true);
                userObj.shopId = response.data.id;
                localStorage.setItem('travelUser', JSON.stringify(userObj));
              }
            } catch (error) {
              setHasStore(false);
            }
          }
        } catch {
          setHasStore(false);
        }
      } else {
        setHasStore(false);
      }
    };

    checkStoreStatus();
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem('travelUser');
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!storeDetails.latitude || !storeDetails.longitude) {
      alert("Please set a location using the GPS button.");
      return;
    }

    // 1. Retrieve current User ID from Local Storage
    const storedUser = JSON.parse(localStorage.getItem('travelUser') || '{}');
    const userId = storedUser.id || storedUser._id;

    if (!userId) {
        alert("User session not found. Please log in again.");
        return;
    }

    try {
      // 2. Send request with userId
      const response = await axios.post('http://localhost:8080/api/shops/create', {
        name: storeDetails.name,
        description: storeDetails.description,
        contactNo: storeDetails.contactNo,
        latitude: storeDetails.latitude,
        longitude: storeDetails.longitude,
        userId: userId // Pass the ID here
      });

      console.log("Store Created:", response.data);
      alert("Store created successfully!");
      
      try {
        // 3. Update Local Storage with new Shop ID immediately
        storedUser.shopId = response.data.id;
        localStorage.setItem('travelUser', JSON.stringify(storedUser));
        setHasStore(true); // Update state to reflect changes immediately
      } catch (error) {
        console.error("Error saving shop ID to localStorage:", error);
      }
      
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
        {hasStore ? (
          <button className="seller-gold-btn" onClick={() => navigate('/dashboard')}>
            <MdSwapHoriz size={22} />
            <span>Dashboard</span>
          </button>
        ) : (
          <button className="seller-gold-btn" onClick={() => setShowStoreForm(true)}>
            <MdSwapHoriz size={22} />
            <span>Switch to Seller</span>
          </button>
        )}
        <button className="seller-menu-btn">
          <MdSettings size={22} />
          <span>Settings</span>
        </button>
      </div>

      <div className="seller-sidebar-footer">
        <button className="seller-menu-btn seller-logout-btn" onClick={handleLogout}>
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