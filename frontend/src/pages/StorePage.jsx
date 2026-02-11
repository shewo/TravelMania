// src/pages/StorePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/HomePage1.css'; // Reusing global styles

const StorePage = () => {
    const { id } = useParams(); // Get the ID from the URL (e.g., 5)
    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch specific shop details from your Backend
        axios.get(`http://localhost:8080/api/shops/${id}`)
            .then(response => {
                setShop(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching shop details:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>Loading Shop...</div>;
    
    if (!shop) return <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>Shop not found!</div>;

    return (
        <div style={{ backgroundColor: "#0b0a0a", minHeight: "100vh", color: "white" }}>
            
            {/* Simple Navbar */}
            <nav className="hero-nav" style={{ padding: "20px 5%" }}>
                <Link to="/map" style={{ color: "#D4AF37", textDecoration: "none", fontSize: "18px" }}>
                    ← BACK TO MAP
                </Link>
                <h1 className="logo-text" style={{ fontSize: "24px", margin: 0 }}>TRAVELMANIA</h1>
            </nav>

            {/* Shop Details Container */}
            <div style={{ padding: "40px 10%", textAlign: "center" }}>
                
                {/* Shop Title */}
                <h1 className="hero-title" style={{ fontSize: "3rem", marginBottom: "20px" }}>
                    {shop.name}
                </h1>
                
                {/* Description */}
                <p style={{ 
                    fontFamily: "Montserrat, sans-serif", 
                    fontSize: "1.2rem", 
                    color: "#C5B097", 
                    maxWidth: "800px", 
                    margin: "0 auto 40px" 
                }}>
                    {shop.description}
                </p>

                {/* Placeholder for Inventory/Items */}
                <div style={{ 
                    border: "1px solid #333", 
                    borderRadius: "15px", 
                    padding: "40px", 
                    background: "rgba(255,255,255,0.05)" 
                }}>
                    <h3 style={{ color: "#D4AF37", marginBottom: "20px" }}>Available Gear for Rent</h3>
                    <p style={{ fontStyle: "italic", color: "#888" }}>
                        Inventory list coming soon...
                    </p>
                    <button style={{
                        marginTop: "20px",
                        padding: "10px 20px",
                        background: "#D4AF37",
                        border: "none",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}>
                        CONTACT SELLER
                    </button>
                </div>

            </div>
        </div>
    );
};

export default StorePage;