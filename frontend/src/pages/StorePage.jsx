import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/HomePage1.css';
import '../styles/ProductPage.css';
import Navbar from '../components/Navbar';
import HomePage4 from './HomePage4';
// --- IMPORT CART CONTEXT ---
import { CartContext } from './CartContext'; 

import defaultImg from '../assets/backpack.png';
import bgVideo from '../assets/bg-video2.mp4'; 

const StorePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // --- CONNECT TO GLOBAL CART ---
    const { addToCart } = useContext(CartContext);

    const [shop, setShop] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

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

    const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.productName?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#050505',
                color: '#f1e2ab',
                fontSize: '24px',
                fontFamily: "'Cinzel', serif"
            }}>
                Loading Store...
            </div>
        );
    }

    if (!shop) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#050505',
                color: '#f1e2ab',
                fontSize: '24px',
                fontFamily: "'Cinzel', serif"
            }}>
                <p>Store not found!</p>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        marginTop: '20px',
                        padding: '12px 24px',
                        background: '#d4af37',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        color: '#050505',
                        fontWeight: 'bold'
                    }}
                >
                    Go Home
                </button>
            </div>
        );
    }

    return (
        <>
        <Navbar />
        <div id="tm-gear-page-wrapper">

            <div className="tm-gear-video-container">
                <video autoPlay loop muted playsInline className="tm-gear-video-bg" src={bgVideo} />
                <div className="tm-gear-video-overlay"></div>
            </div>

            <div className="tm-gear-content-layer">

                <div style={{ marginBottom: '20px' }}>
                    <button
                        onClick={() => navigate('/all-stores')}
                        style={{
                            background: 'rgba(212, 175, 55, 0.15)',
                            border: '1.5px solid #D1B48C',
                            color: '#D1B48C',
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 600,
                            fontSize: '1rem',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            borderRadius: '8px',
                            padding: '10px 28px',
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                            transition: 'background 0.3s, color 0.3s, border 0.3s',
                        }}
                        onMouseOver={e => {
                            e.target.style.background = 'rgba(212, 175, 55, 0.3)';
                            e.target.style.color = '#fff';
                            e.target.style.border = '1.5px solid #fff';
                        }}
                        onMouseOut={e => {
                            e.target.style.background = 'rgba(212, 175, 55, 0.15)';
                            e.target.style.color = '#D1B48C';
                            e.target.style.border = '1.5px solid #D1B48C';
                        }}
                    >
                        ← BACK TO STORES
                    </button>
                </div>

                <div className="tm-gear-header">
                    <h1 className="tm-gear-title">{shop.name}</h1>
                    <p style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '1.2rem',
                        color: '#C5B097',
                        maxWidth: '800px',
                        margin: '0 auto 15px',
                        lineHeight: '1.8',
                        textShadow: '0 2px 5px rgba(0,0,0,1)'
                    }}>
                        {shop.description}
                    </p>

                    {shop.contactNo && (
                        <p style={{
                            color: '#D1B48C',
                            fontSize: '1rem',
                            fontFamily: "'Montserrat', sans-serif",
                            letterSpacing: '1px',
                            textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                        }}>
                            📞 {shop.contactNo}
                        </p>
                    )}

                    <div className="tm-gear-search-wrapper">
                        <input
                            type="text"
                            className="tm-gear-search-input"
                            placeholder="SEARCH FOR GEAR..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className="tm-gear-search-icon" viewBox="0 0 24 24">
                            <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                    </div>
                </div>

                {categories.length > 1 && (
                    <div className="tm-gear-filter-row">
                        <div className="tm-gear-filter-group">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    className={`tm-gear-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="tm-gear-grid">
                    {productsLoading ? (
                        <div style={{
                            gridColumn: '1 / -1',
                            textAlign: 'center',
                            color: '#f1e2ab',
                            fontSize: '20px',
                            padding: '40px',
                            fontFamily: "'Cinzel', serif"
                        }}>
                            Loading products...
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div style={{
                            gridColumn: '1 / -1',
                            textAlign: 'center',
                            color: '#f1e2ab',
                            fontSize: '20px',
                            padding: '40px',
                            fontFamily: "'Cinzel', serif"
                        }}>
                            {searchTerm || selectedCategory !== 'All'
                                ? 'No products match your search.'
                                : 'No products available in this store yet.'}
                        </div>
                    ) : (
                        filteredProducts.map(product => (
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
                                
                                {/* --- ADDED RENT BUTTON --- */}
                                <button 
                                  className="tm-gear-rent-btn tm-gear-btn-small" 
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevents navigating to the product detail page when clicking the button
                                    addToCart(product); 
                                    alert(`${product.productName} added to cart!`);
                                  }}
                                >
                                    <svg className="tm-gear-btn-frame" viewBox="0 0 420 64" preserveAspectRatio="none">
                                        <polygon className="tm-gear-btn-poly" points="40,12 380,12 408,32 380,52 40,52 12,32" />
                                        <rect className="tm-gear-btn-rect" x="20" y="18" width="380" height="28" />
                                    </svg>
                                   <span>Rent Now</span>
                                </button>

                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
        <HomePage4 />
        </>
    );
};

export default StorePage;