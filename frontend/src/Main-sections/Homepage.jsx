import React from 'react'
import { useNavigate } from 'react-router-dom' // Link karanna meka one

// Components
import HomePage1 from '../pages/HomePage1'  
import HomePage2 from '../pages/HomePage2'
import HomePage3 from '../pages/HomePage3'
import HomePage4 from '../pages/HomePage4'
import HomePage5 from '../pages/HomePage5'
import Navbar from '../components/Navbar'
import ParallaxGap from '../components/ParallaxGap'
import ProductPage from '../pages/ProductPage' // Product Page eka import karala thiyenne, mokada meka Homepage eke thiyenna one kiyala hithanne

// Images
import gapBg from '../assets/footer-bg.jpg' 

function Homepage() {
  const navigate = useNavigate(); // Page maru karana hook eka

  return (
    <>
      <Navbar />
      
      

      {/* --- HOMEPAGE CONTENT ONLY --- */}
      
      {/* 1. START */}
      <HomePage1 />

      {/* GAP 1 */}
      <ParallaxGap 
        image={gapBg} 
        title="ADVENTURE AWAITS"
        subtitle="Explore the Unknown"
      />

      {/* 2. NEXT IS PAGE 5 */}
      <HomePage5 />

      {/* GAP 2 */}
      <ParallaxGap 
        image={gapBg}
        title="DIVE DEEP"
        subtitle="Discover the Blue World"
      />

      {/* 3. THEN PAGE 2 */}
      <HomePage2 /> 

      {/* GAP 3 */}
      <ParallaxGap 
        image={gapBg}
        title="INTO THE WILD"
        subtitle="Connect with Nature"
      />

      {/* 4. THEN PAGE 3 */}
      <HomePage3 />

      {/* GAP 4 */}
      <ParallaxGap 
        image={gapBg}
        title="FIND PEACE"
        subtitle="Sleep Under the Stars"
      />

      {/* 5. FINALLY PAGE 4 */}
      <HomePage4 />
      <ProductPage />
      
    
      
      
      {/* IMPORTANT:
         Methana thibba <Cart/>, <Checkout/>, <ProductPage/> okkoma ain kara.
         Mokada ewa wenama pages widiyata App.js eke define karala thiyenne.
         Homepage eke thiyenna one Homepage eka witharai.
      */}
   
    </>
  )
}

export default Homepage