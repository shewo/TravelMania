import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AllStores.css'; 

import Navbar from '../components/Navbar';
import HomePage4 from '../pages/HomePage4';

// Import the video asset
import bgVideo2 from '../assets/bg-video2.mp4';

const AllStores = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch real stores from the database
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/shops/all');
        setStores(response.data);
      } catch (error) {
        console.error("Error fetching stores:", error);
        setStores([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  const filteredStores = stores.filter(store =>
    (store.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (store.description || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="allstores-bg-video-wrapper">
        <video autoPlay loop muted playsInline className="allstores-bg-video">
          <source src={bgVideo2} type="video/mp4" />
        </video>
      </div>
      <Navbar />
      <div className="stores-container">
        {/* Header */}
        <div className="stores-header">
          <h1>Partner Stores</h1>
          <p>Find the best travel gear near you</p>
        
        <div className="search-bar-container">
          <input
            type="text"
            className="search-input"
            placeholder="SEARCH FOR STORES..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="search-icon" viewBox="0 0 24 24">
            <path d="M21.71 20.29l-5.01-5.01C17.54 13.68 18 11.91 18 10c0-4.41-3.59-8-8-8S2 5.59 2 10s3.59 8 8 8c1.91 0 3.68-.46 5.28-1.3l5.01 5.01c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
          </svg>
        </div>
      </div>

      {/* Grid */}
      <div className="stores-grid">
        {loading ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#D1B48C', fontSize: '20px', padding: '40px' }}>
            Loading stores...
          </div>
        ) : filteredStores.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#D1B48C', fontSize: '20px', padding: '40px' }}>
            No stores found.
          </div>
        ) : (
          filteredStores.map((store) => (
            <div key={store.id} className="store-card">
              
              {/* Image Area */}
              <div className="store-image-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=400&q=80" 
                  alt={store.name} 
                  className="store-img" 
                />
              </div>

              {/* Content Area */}
              <div className="store-details">
                <h3 className="store-name">{store.name}</h3>
                <p className="store-desc">{store.description}</p>
                
                <div className="store-footer">
                  <span className="store-location">📞 {store.contactNo || "N/A"}</span>
                  <button 
                    className="store-btn"
                    onClick={() => navigate(`/store/${store.id}`)}
                  >
                    Visit Store
                  </button>
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
    <HomePage4 />
    </>
  );
};

export default AllStores;