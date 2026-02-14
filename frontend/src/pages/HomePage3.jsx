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
import tentImg from '../assets/tent.png';
import backpackImg from '../assets/backpack.png';
import cameraImg from '../assets/camera.png';
import stoveImg from '../assets/stove.png';

// 1. IMPORT YOUR TITLE PNG HERE
import rentTitlePng from '../assets/rent-gear-title.png'; 

// Updated Sample Data with Highland, Coast, and Wild categories
const rentalProducts = [
  { 
    id: 1, 
    name: "Camping Tent", 
    category: "Wild", 
    price: "Rs. 1500/day", 
    image: tentImg 
  },
  { 
    id: 2, 
    name: "Hiking Backpack", 
    category: "Highland", 
    price: "Rs. 800/day", 
    image: backpackImg 
  },
  { 
    id: 3, 
    name: "GoPro Hero 11", 
    category: "Coast", 
    price: "Rs. 2500/day", 
    image: cameraImg 
  },
  { 
    id: 4, 
    name: "Camping Stove", 
    category: "Wild", 
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
            <source src="/travel-bg.mp4" type="video/mp4" />
          </video>
        </figure>

        {/* Content Layer */}
        <div className="hp3-content-layer">
          
          {/* --- TITLE PNG --- */}
          <div className="hp3-title-container">
            <img src={rentTitlePng} alt="Rent Your Gear" className="hp3-title-png" />
          </div>

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
                    {/* The updated category will render here */}
                    <span className="hp3-category">{item.category}</span>
                    <p className="hp3-price">{item.price}</p>
                    


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