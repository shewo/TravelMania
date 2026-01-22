import React from 'react';
// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Custom CSS
import '../styles/HomePage3.css'; 

// --- MEDIA IMPORTS ---
// 1. Import Video
import travelBgVideo from '../assets/travel-bg.mp4';

// 2. Import Images (Ensure these files exist in src/assets/)
import tentImg from '../assets/tent.png';
import backpackImg from '../assets/backpack.png';
import cameraImg from '../assets/camera.png';
import stoveImg from '../assets/stove.png';

// Sample Data using the Imported Images
const rentalProducts = [
  { 
    id: 1, 
    name: "Camping Tent", 
    category: "Shelter", 
    price: "Rs. 1500/day", 
    image: tentImg 
  },
  { 
    id: 2, 
    name: "Hiking Backpack", 
    category: "Gear", 
    price: "Rs. 800/day", 
    image: backpackImg 
  },
  { 
    id: 3, 
    name: "GoPro Hero 11", 
    category: "Electronics", 
    price: "Rs. 2500/day", 
    image: cameraImg 
  },
  { 
    id: 4, 
    name: "Camping Stove", 
    category: "Cooking", 
    price: "Rs. 1200/day", 
    image: stoveImg 
  }
];

const HomePage3 = () => {
  return (
    <div className="hp3-scope">
      
      {/* --- SLIDER SECTION --- */}
      <section className="hp3-slider-section">
        
        {/* Background Video Layer */}
        <figure className="hp3-video-bg">
          <div className="hp3-overlay"></div>
          <video autoPlay muted loop playsInline>
            <source src={travelBgVideo} type="video/mp4" />
          </video>
        </figure>

        {/* Content Layer */}
        <div className="hp3-content-layer">
          <h2 className="hp3-section-title">Rent Your Gear</h2>
          <p className="hp3-subtitle">Top quality equipment for your next trip</p>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            grabCursor={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={true}
            breakpoints={{
              768: { slidesPerView: 3, centeredSlides: false },
            }}
            className="hp3-swiper"
          >
            {rentalProducts.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="hp3-product-card">
                  <div className="hp3-img-box">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="hp3-card-details">
                    <h3>{item.name}</h3>
                    <span className="hp3-category">{item.category}</span>
                    <p className="hp3-price">{item.price}</p>
                    
                    {/* SVG BUTTON (Small Variant) */}
                    <button className="hp3-cta-btn hp3-btn-small">
                      <svg className="hp3-frame" viewBox="0 0 420 64" preserveAspectRatio="none">
                        <polygon className="hp3-inner" points="40,12 380,12 408,32 380,52 40,52 12,32" />
                        <rect className="hp3-innerBox" x="20" y="18" width="380" height="28" />
                      </svg>
                      <span>Rent Now</span>
                    </button>

                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

    </div>
  );
};

export default HomePage3;