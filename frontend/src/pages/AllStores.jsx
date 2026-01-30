import React, { useState } from 'react';
import '../styles/AllStores.css'; 

const AllStores = () => {
  // Dummy Data
  const dummyStores = [
    {
      id: 1,
      name: "Summit Gear",
      location: "Colombo, LK",
      rating: 4.8,
      category: "Hiking",
      image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=400&q=80",
      description: "Top-rated hiking boots and tents for your next adventure."
    },
    {
      id: 2,
      name: "Ocean Blue",
      location: "Galle, LK",
      rating: 4.5,
      category: "Surfing",
      image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=400&q=80",
      description: "Surfboards, wetsuits, and snorkeling gear available for rent."
    },
    {
      id: 3,
      name: "Urban Traveller",
      location: "Kandy, LK",
      rating: 4.2,
      category: "Luggage",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
      description: "Stylish and durable travel bags for the modern nomad."
    },
    {
      id: 4,
      name: "Wild Safari",
      location: "Yala, LK",
      rating: 4.9,
      category: "Safari",
      image: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=400&q=80",
      description: "Binoculars, hats, and camouflage clothing for wildlife tours."
    },
    {
        id: 5,
        name: "Ella Climbing",
        location: "Ella, LK",
        rating: 4.7,
        category: "Climbing",
        image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=400&q=80",
        description: "Ropes, harnesses, and chalk for rock climbing enthusiasts."
    },
    {
        id: 6,
        name: "Cycle Ceylon",
        location: "Negombo, LK",
        rating: 4.6,
        category: "Cycling",
        image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=400&q=80",
        description: "Mountain bikes and road bikes for rent."
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredStores = dummyStores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // Note: We removed 'bg-gray-50' so the underlying background shows through
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
          <svg className="search-icon" viewBox="0 0 24 24"><path d="M21.71 20.29l-5.01-5.01C17.54 13.68 18 11.91 18 10c0-4.41-3.59-8-8-8S2 5.59 2 10s3.59 8 8 8c1.91 0 3.68-.46 5.28-1.3l5.01 5.01c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>
        </div>
      </div>

      {/* Grid */}
      <div className="stores-grid">
        {filteredStores.map((store) => (
          <div key={store.id} className="store-card">
            
            {/* Image Area */}
            <div className="store-image-wrapper">
              <img src={store.image} alt={store.name} className="store-img" />
              <div className="store-rating">★ {store.rating}</div>
            </div>

            {/* Content Area */}
            <div className="store-details">
              <div className="store-category">{store.category}</div>
              <h3 className="store-name">{store.name}</h3>
              <p className="store-desc">{store.description}</p>
              
              <div className="store-footer">
                <span className="store-location">📍 {store.location}</span>
                <button 
                  className="store-btn"
                  onClick={() => alert(`Redirecting to ${store.name}`)}
                >
                  Visit Store
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default AllStores;