import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProductPage.css';
import Navbar from '../components/Navbar'
import HomePage4 from '../pages/HomePage4'

// --- CONTEXT IMPORT ---
// File deka ekama folder eke (pages) nisa meka hari:
import { CartContext } from './CartContext'; 

// Assets
import bgVideo from '../assets/bg-video2.mp4'; 
import defaultImg from '../assets/backpack.png';

const ProductPage = () => {
  const navigate = useNavigate();
  
  // --- CONNECT TO GLOBAL CART ---
  const { addToCart, cartItems } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  
  // Filter State
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products/all');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback Data
        setProducts([
            { id: 1, productName: "Camping Tent", category: "Tents", price: 5000, imageUrl: "" },
            { id: 2, productName: "Hiking Bag", category: "Bags", price: 3500, imageUrl: "" }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];

  const filtered = products.filter(p => {
    const matchesSearch = (p.productName || "").toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCat === "All" || p.category === activeCat;
    const matchesPrice = (p.price || 0) >= minPrice && (p.price || 0) <= maxPrice;
    return matchesSearch && matchesCat && matchesPrice;
  });

  return (
    <>
    <Navbar />
    <div id="tm-gear-page-wrapper">
      
      {/* Video Background */}
      <div className="tm-gear-video-container">
        <video autoPlay loop muted playsInline className="tm-gear-video-bg" src={bgVideo} />
        <div className="tm-gear-video-overlay"></div>
      </div>

      <div className="tm-gear-content-layer">
        <div className="tm-gear-header">
          <h2 className="tm-gear-title">Travel Mania Gear</h2>
          
          {/* Search */}
          <div className="tm-gear-search-wrapper">
            <input className="tm-gear-search-input" placeholder="SEARCH FOR GEAR..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          
          {/* Filters */}
          <div className="tm-gear-filter-row">
            <div className="tm-gear-filter-group">
              {categories.map(c => (
                <button key={c} className={`tm-gear-cat-btn ${activeCat === c ? 'active' : ''}`} onClick={() => setActiveCat(c)}>{c}</button>
              ))}
            </div>

            <div style={{ width: '300px', marginTop: '20px' }}>
              <PriceSlider min={0} max={50000} onChange={({ min, max }) => { setMinPrice(min); setMaxPrice(max); }} />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="tm-gear-grid">
          {loading ? (
            <p style={{color:'white', textAlign:'center', gridColumn: '1 / -1'}}>Loading products...</p>
          ) : filtered.length === 0 ? (
            <p style={{color:'white', textAlign:'center', gridColumn: '1 / -1'}}>No products found.</p>
          ) : (
            filtered.map(product => (
              <div key={product.id} className="tm-gear-card" onClick={() => navigate(`/product/${product.id}`)}>
                <div className="tm-gear-img-box">
                  <img src={product.imageUrl || defaultImg} alt={product.productName} onError={(e) => e.target.src = defaultImg} />
                </div>
                <span className="tm-gear-category-tag">{product.category}</span>
                <h3 className="tm-gear-name">{product.productName}</h3>
                <p className="tm-gear-price">LKR {product.price}.00</p>
                
                {/* RENT BUTTON */}
                <button 
                  className="tm-gear-rent-btn tm-gear-btn-small" 
                  onClick={(e) => {
                    e.stopPropagation(); // Card eka click wena eka nawaththanawa
                    addToCart(product); // Context ekata data yawanna
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

      {/* Cart Icon Float */}
      <div className="tm-gear-cart-float" onClick={() => navigate('/cart')} style={{cursor:'pointer'}}>
         <svg className="tm-gear-bag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
         
         {/* Cart Count Badge */}
         {cartItems.length > 0 && (
            <span className="tm-gear-cart-count">{cartItems.length}</span>
         )}
      </div>

    </div>
    <HomePage4 />
    </>
  );
};

// PriceSlider Component
const PriceSlider = ({ min, max, onChange }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);
    const getPercent = useCallback((value) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);
        if (range.current) { range.current.style.left = `${minPercent}%`; range.current.style.width = `${maxPercent - minPercent}%`; }
    }, [minVal, getPercent]);

    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);
        if (range.current) { range.current.style.width = `${maxPercent - minPercent}%`; }
    }, [maxVal, getPercent]);

    useEffect(() => { onChange({ min: minVal, max: maxVal }); }, [minVal, maxVal, onChange]);

    return (
        <div className="tm-gear-slider-container">
            <input type="range" min={min} max={max} value={minVal} onChange={(e) => { const value = Math.min(Number(e.target.value), maxVal - 1); setMinVal(value); minValRef.current = value; }} className="tm-gear-thumb tm-gear-thumb--left" style={{ zIndex: minVal > max - 100 && "5" }} />
            <input type="range" min={min} max={max} value={maxVal} onChange={(e) => { const value = Math.max(Number(e.target.value), minVal + 1); setMaxVal(value); maxValRef.current = value; }} className="tm-gear-thumb tm-gear-thumb--right" />
            <div className="tm-gear-slider">
                <div className="tm-gear-track" />
                <div ref={range} className="tm-gear-range" />
            </div>
        </div>
    );
};

export default ProductPage;