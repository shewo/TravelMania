import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/HomePage1.css';
import '../styles/ProductPage.css'; // ✅ Reuse ProductPage card styles

import defaultImg from '../assets/backpack.png';

const StorePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [shop, setShop] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(true);

    // Fetch shop details
    useEffect(() => {
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

    // ✅ Fetch products belonging to this shop
    useEffect(() => {
        axios.get(`http://localhost:8080/api/products/shop/${id}`)
            .then(response => {
                setProducts(response.data);
                setProductsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching shop products:", error);
                setProducts([]);
                setProductsLoading(false);
            });
    }, [id]);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    if (loading) return <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>Loading Shop...</div>;
    if (!shop) return <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>Shop not found!</div>;

    return (
        <div style={{ backgroundColor: "#0b0a0a", minHeight: "100vh", color: "white" }}>
            
            {/* Navbar */}
            <nav className="hero-nav" style={{ padding: "20px 5%" }}>
                <Link to="/" style={{ color: "#D4AF37", textDecoration: "none", fontSize: "18px" }}>
                    ← BACK
                </Link>
                <h1 className="logo-text" style={{ fontSize: "24px", margin: 0 }}>TRAVELMANIA</h1>
            </nav>

            {/* Shop Details */}
            <div style={{ padding: "40px 10%", textAlign: "center" }}>
                
                <h1 className="hero-title" style={{ fontSize: "3rem", marginBottom: "20px" }}>
                    {shop.name}
                </h1>
                
                <p style={{ 
                    fontFamily: "Montserrat, sans-serif", 
                    fontSize: "1.2rem", 
                    color: "#C5B097", 
                    maxWidth: "800px", 
                    margin: "0 auto 20px" 
                }}>
                    {shop.description}
                </p>

                {shop.contactNo && (
                    <p style={{ color: "#D4AF37", fontSize: "1rem", marginBottom: "40px" }}>
                        📞 {shop.contactNo}
                    </p>
                )}

                {/* ✅ PRODUCTS SECTION - ProductPage Theme */}
                <div style={{ 
                    borderTop: "1px solid #333", 
                    paddingTop: "40px", 
                    marginTop: "20px" 
                }}>
                    <h2 style={{ 
                        color: "#D4AF37", 
                        fontFamily: "'Cinzel', serif",
                        fontSize: "2rem",
                        marginBottom: "40px",
                        letterSpacing: "2px"
                    }}>
                        AVAILABLE GEAR
                    </h2>

                    <div id="tm-gear-page-wrapper">
                        <div className="tm-gear-grid">
                            {productsLoading ? (
                                <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#f1e2ab', fontSize: '20px', padding: '40px' }}>
                                    Loading products...
                                </div>
                            ) : products.length === 0 ? (
                                <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#f1e2ab', fontSize: '20px', padding: '40px' }}>
                                    No products available in this store yet.
                                </div>
                            ) : (
                                products.map(product => (
                                    <div 
                                        key={product.id} 
                                        className="tm-gear-card"
                                        onClick={() => handleProductClick(product.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="tm-gear-img-box">
                                            <img 
                                                src={product.imageUrl || defaultImg} 
                                                alt={product.productName}
                                                referrerPolicy="no-referrer"
                                                onError={(e) => {
                                                    if (!e.target.dataset.fallback) {
                                                        e.target.dataset.fallback = "true";
                                                        e.target.src = defaultImg;
                                                    }
                                                }}
                                            />
                                        </div>
                                        <span className="tm-gear-category-tag">{product.category}</span>
                                        <h3 className="tm-gear-name">{product.productName}</h3>
                                        <p className="tm-gear-price">Rs.{product.price} / day</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StorePage;