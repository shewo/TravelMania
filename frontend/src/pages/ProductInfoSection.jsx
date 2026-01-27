import React from 'react';
import '../styles/ProductInfo.css'; 
import { FaStar } from 'react-icons/fa';

// --- IMPORT ASSETS ---
import productPng from '../assets/backpack.png'; 
// RENAMED VARIABLE TO AVOID CONFLICTS
import backpackVideo from '../assets/bg-video2.mp4'; 

const ProductInfoSection = () => {
  const product = {
    title: "Nomad Explorer 45L",
    subtitle: "All-Weather Hiking Backpack",
    price: "$15 / day",
    image: productPng, 
    specs: [
     
     { label: "Rental Condition", value: "Grade A" }, // Important for rentals
      { label: "Cleaning Fee", value: "Included" },             // Specific to renting
      { label: "Min. Duration", value: "2 Days" }
    ]
  };

  const details = {
    title: "Gear Insight",
    description: "The Nomad Explorer 45L builds off the powerful legacy of high-end trekking gear, offering next-generation performance for both long hauls and quick weekend getaways. Perfect for alpine shoots, wildlife tracking, and all-weather adventures.",
    reviews: [
      { id: 1, user: "Alex R.", rating: 5, comment: "Super comfortable for long hikes. The rain cover saved me!" },
      { id: 2, user: "Maria S.", rating: 5, comment: "Perfect size for a weekend trip. Lots of pockets." }
    ]
  };

  return (
    <div className="product-page-wrapper">
      
      {/* === BACKGROUND VIDEO === */}
      {/* Used the new variable 'backpackVideo' here */}
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src={backpackVideo} type="video/mp4" />
      </video>

      {/* === DARK GRADIENT OVERLAY === */}
      <div className="video-overlay"></div>

      {/* ==========================
          SECTION 1: HERO (Top) 
         ========================== */}
      <div className="hero-container">
        <div className="product-grid">
          
          {/* LEFT COLUMN */}
          <div className="col-left">
            <div className="content-wrapper">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-subtitle">{product.subtitle}</p>

              <div className="specs-list">
                {product.specs.map((spec, index) => (
                  <div key={index} className="spec-item">
                    <span className="spec-label">{spec.label}</span>
                    <span className="spec-value">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* ACTION AREA */}
              <div className="action-area">
                <div className="price-tag">{product.price}</div>
                <div className="hp1-hero-action">
                  <button className="hp1-cta">
                    <svg className="hp1-frame" viewBox="0 0 320 60" preserveAspectRatio="none">
                      <polygon className="hp1-inner" points="30,5 290,5 315,30 290,55 30,55 5,30" />
                      <rect className="hp1-innerBox" x="12" y="10" width="296" height="40" rx="0" />
                    </svg>
                    <span className="cta-text">Secure This Gear</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-right">
            <div className="product-image-container">
              <img src={product.image} alt={product.title} className="product-png" />
            </div>
          </div>

        </div>
      </div>

      {/* ==========================
          SECTION 2: DETAILS (Bottom)
         ========================== */}
      <div className="details-container">
        <div className="details-grid">
          
          {/* DESCRIPTION */}
          <div className="details-col description-col">
            <div className="gold-bar-vertical"></div>
            <div>
              <h3 className="section-title">{details.title}</h3>
              <p className="section-paragraph">{details.description}</p>
            </div>
          </div>

          {/* REVIEWS */}
          <div className="details-col reviews-col">
            <div className="reviews-header-row">
              <h3 className="section-title">Field Reports</h3>
              <span className="review-badge">{details.reviews.length}</span>
            </div>

            <div className="reviews-list">
              {details.reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-meta">
                    <span className="review-author">{review.user}</span>
                    <div className="star-row">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} style={{ opacity: i < review.rating ? 1 : 0.3 }} />
                      ))}
                    </div>
                  </div>
                  <p className="review-text">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ProductInfoSection;