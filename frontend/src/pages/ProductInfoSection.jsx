import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProductInfo.css'; 
import { FaStar } from 'react-icons/fa';

import backpackVideo from '../assets/bg-video2.mp4'; 
import logoPng from '../assets/title png1.png';
import defaultProductImage from '../assets/backpack.png';

const ProductInfoSection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8080/api/products/${id}`);
          const productData = response.data;
          
          setProduct({
            id: productData.id,
            title: productData.productName || "Product Name",
            subtitle: productData.category || "Category",
            price: `Rs.${productData.price || 0} / day`,
            image: productData.imageUrl || defaultProductImage,
            description: productData.productDescription || "No description available.",
            available: productData.available || 0,
            specs: [
              { label: "Rental Condition", value: productData.rentalCondition || "N/A" },
              { label: "Cleaning Fee", value: productData.cleaningFee || "N/A" },
              { label: "Min. Duration", value: productData.minDuration ? `${productData.minDuration} Days` : "N/A" }
            ]
          });
        } else {
          // If no ID, show first product
          const response = await axios.get('http://localhost:8080/api/products/all');
          const productData = response.data[0] || {};
          
          setProduct({
            id: productData.id,
            title: productData.productName || "Product Name",
            subtitle: productData.category || "Category",
            price: `Rs.${productData.price || 0} / day`,
            image: productData.imageUrl || defaultProductImage,
            description: productData.productDescription || "No description available.",
            available: productData.available || 0,
            specs: [
              { label: "Rental Condition", value: productData.rentalCondition || "N/A" },
              { label: "Cleaning Fee", value: productData.cleaningFee || "N/A" },
              { label: "Min. Duration", value: productData.minDuration ? `${productData.minDuration} Days` : "N/A" }
            ]
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const details = {
    title: "Gear Insight",
    reviews: [
      { id: 1, user: "Alex R.", rating: 5, comment: "Super comfortable for long hikes. The rain cover saved me!" },
      { id: 2, user: "Maria S.", rating: 5, comment: "Perfect size for a weekend trip. Lots of pockets." }
    ]
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#050505',
        color: 'white',
        fontSize: '24px'
      }}>
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#050505',
        color: 'white',
        fontSize: '24px'
      }}>
        <p>Product not found</p>
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
            fontWeight: '600'
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="product-page-wrapper">
      
      {/* Background Video */}
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src={backpackVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="video-overlay"></div>

      {/* Watermark Logo */}
      <div className="watermark-container">
        <img src={logoPng} alt="Travel Mania Watermark" className="watermark-logo" />
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1000,
          padding: '10px 20px',
          background: 'rgba(212, 175, 55, 0.9)',
          border: 'none',
          borderRadius: '8px',
          color: '#000',
          fontWeight: '600',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        ← Back
      </button>

      {/* HERO SECTION */}
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
                <div className="spec-item">
                  <span className="spec-label">Available</span>
                  <span className="spec-value">{product.available} units</span>
                </div>
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
              <img 
                src={product.image} 
                alt={product.title} 
                className="product-png"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (!e.target.dataset.fallback) {
                    e.target.dataset.fallback = "true";
                    e.target.src = defaultProductImage;
                  }
                }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* DETAILS SECTION */}
      <div className="details-container">
        <div className="details-grid">
          
          {/* DESCRIPTION */}
          <div className="details-col description-col">
            <div className="gold-bar-vertical"></div>
            <div>
              <h3 className="section-title">{details.title}</h3>
              <p className="section-paragraph">{product.description}</p>
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