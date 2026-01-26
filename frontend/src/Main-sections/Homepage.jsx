import React from 'react'
import HomePage1 from '../pages/HomePage1'  
import HomePage2 from '../pages/HomePage2'
import HomePage3 from '../pages/HomePage3'
import HomePage4 from '../pages/HomePage4'
import HomePage5 from '../pages/HomePage5'
import Navbar from '../components/Navbar'
import ParallaxGap from '../components/ParallaxGap'
import Dashboard from './Dashboard'
import Signup from '../pages/Signup'



// --- CHANGE: Import your renamed photo here ---
// Ensure the file in your 'assets' folder is named "gapbg.jpg"
import gapBg from '../assets/footer-bg.jpg' 

function Homepage() {
  return (
    <>
      <Navbar />
      
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
      <Signup />
     
    </>
  )
}

export default Homepage