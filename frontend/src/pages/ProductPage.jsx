import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/ProductPage.css';

// --- 1. IMPORT YOUR ASSETS HERE ---
import bgVideo from '../assets/bg-video2.mp4'; 

// Import your Product Images (Make sure files exist in src/assets/)
import imgTent from '../assets/tent.png';       
import imgSnorkel from '../assets/snorkel.png'; 
import imgBinos from '../assets/binos.png';
import imgPad from '../assets/pad.png';
import imgBag from '../assets/backpack.png';
import imgGPS from '../assets/gps.png';
import imgBoard from '../assets/board.png';
import imgStove from '../assets/stove.png'; 

const ProductPage = () => {
  // --- 2. UPDATED DATA LIST ---
  const initialProducts = [
    { id: 1, name: "Apex Mountain Tent", cat: "Highland", price: 5500, img: imgTent },
    { id: 2, name: "Coral Explorer Kit", cat: "Coast", price: 2200, img: imgSnorkel },
    { id: 3, name: "Night Stalker Lens", cat: "Wild", price: 3800, img: imgBinos },
    { id: 4, name: "Thermal Sleep Pad", cat: "Highland", price: 1500, img: imgPad },
    { id: 5, name: "Rugged Trek Pack", cat: "Wild", price: 4200, img: imgBag },
    { id: 6, name: "Storm-Ready GPS", cat: "Wild", price: 3000, img: imgGPS },
    { id: 7, name: "Driftwood Surfboard", cat: "Coast", price: 4500, img: imgBoard },
    // REPLACED HAMMOCK WITH STOVE
    { id: 8, name: "Camping Stove", cat: "Wild", price: 1200, img: imgStove }, 
  ];

  // --- STATE ---
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [cart, setCart] = useState([]);
  
  // Filter State
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(6000);

  // --- FILTERING LOGIC ---
  const filtered = initialProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCat === "All" || p.cat === activeCat;
    const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
    return matchesSearch && matchesCat && matchesPrice;
  });

  return (
    <div id="tm-gear-page-wrapper">
      
      {/* 1. VIDEO BACKGROUND */}
      <div className="tm-gear-video-container">
        <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="tm-gear-video-bg"
            src={bgVideo} 
        />
        {/* Dark overlay to make text readable */}
        <div className="tm-gear-video-overlay"></div>
      </div>

      <div className="tm-gear-content-layer">
        <div className="tm-gear-header">
          <h2 className="tm-gear-title">Travel Mania Gear</h2>
          
          {/* Search Bar */}
          <div className="tm-gear-search-wrapper">
            <input 
              className="tm-gear-search-input" 
              placeholder="SEARCH FOR GEAR..."
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg className="tm-gear-search-icon" viewBox="0 0 24 24"><path d="M21.71 20.29l-5.01-5.01C17.54 13.68 18 11.91 18 10c0-4.41-3.59-8-8-8S2 5.59 2 10s3.59 8 8 8c1.91 0 3.68-.46 5.28-1.3l5.01 5.01c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>
          </div>
          
          <div className="tm-gear-filter-row">
            {/* Category Filter */}
            <div className="tm-gear-filter-group">
              {["All", "Highland", "Coast", "Wild"].map(c => (
                <button 
                  key={c} 
                  className={`tm-gear-cat-btn ${activeCat === c ? 'active' : ''}`}
                  onClick={() => setActiveCat(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Price Slider */}
            <div style={{ width: '300px', marginTop: '20px' }}>
              <PriceSlider 
                  min={0} 
                  max={6000} 
                  onChange={({ min, max }) => {
                      setMinPrice(min);
                      setMaxPrice(max);
                  }}
              />
            </div>
          </div>
        </div>

        {/* 2. PRODUCT GRID */}
        <div className="tm-gear-grid">
          {filtered.map(product => (
            <div key={product.id} className="tm-gear-card">
              <div className="tm-gear-img-box"><img src={product.img} alt={product.name} /></div>
              <span className="tm-gear-category-tag">{product.cat}</span>
              <h3 className="tm-gear-name">{product.name}</h3>
              <p className="tm-gear-price">LKR {product.price}.00</p>
              
              {/* SVG Button */}
              <button 
                  className="tm-gear-rent-btn tm-gear-btn-small" 
                  onClick={() => setCart([...cart, product])}
              >
                  <svg className="tm-gear-btn-frame" viewBox="0 0 420 64" preserveAspectRatio="none">
                      <polygon className="tm-gear-btn-poly" points="40,12 380,12 408,32 380,52 40,52 12,32" />
                      <rect className="tm-gear-btn-rect" x="20" y="18" width="380" height="28" />
                  </svg>
                  <span>Rent Now</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CART ICON (No Text, Just the Circle) */}
      <div className="tm-gear-cart-float">
         <svg 
          className="tm-gear-bag-icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
         
         {/* Counter Badge */}
         {cart.length > 0 && (
            <span className="tm-gear-cart-count">{cart.length}</span>
         )}
      </div>

    </div>
  );
};

// --- ISOLATED SLIDER COMPONENT ---
const PriceSlider = ({ min, max, onChange }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);

    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);
        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);
        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal, onChange]);

    return (
        <div className="tm-gear-slider-container">
            <input
                type="range" min={min} max={max} value={minVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal - 1);
                    setMinVal(value); minValRef.current = value;
                }}
                className="tm-gear-thumb tm-gear-thumb--left"
                style={{ zIndex: minVal > max - 100 && "5" }}
            />
            <input
                type="range" min={min} max={max} value={maxVal}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minVal + 1);
                    setMaxVal(value); maxValRef.current = value;
                }}
                className="tm-gear-thumb tm-gear-thumb--right"
            />
            <div className="tm-gear-slider">
                <div className="tm-gear-track" />
                <div ref={range} className="tm-gear-range" />
                
                <div className="tm-gear-val-left" style={{ left: `${getPercent(minVal)}%` }}>
                    LKR {minVal}
                </div>
                <div className="tm-gear-val-right" style={{ left: `${getPercent(maxVal)}%` }}>
                    LKR {maxVal}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;