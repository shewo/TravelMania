import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom' 

// --- CONTEXT IMPORT ---
import { CartContext } from '../pages/CartContext'; 

// Components
import HomePage1 from '../pages/HomePage1'  
import HomePage2 from '../pages/HomePage2'
import HomePage3 from '../pages/HomePage3'
import HomePage4 from '../pages/HomePage4'
import HomePage5 from '../pages/HomePage5'
import Navbar from '../components/Navbar'
import ParallaxGap from '../components/ParallaxGap'

// Images
import gapBg from '../assets/footer-bg.jpg' 

function Homepage() {
  const navigate = useNavigate();

  // 1. Hooks හැමතිස්සෙම return එකට උඩින් තියෙන්න ඕන
  const { cartItems } = useContext(CartContext);

  return (
    <>
      <Navbar />

      {/* --- FIXED CART ICON (Right Top) --- */}
      {/* අපි මෙතන styles කෙලින්ම දෙනවා, පිටින් එන CSS වලට මේක අවුල් කරන්න බෑ */}
      <div 
        onClick={() => navigate('/cart')} 
        style={{
          position: 'fixed',
          top: '80px',       // Navbar එකට යටින් පේන්න
          right: '20px',     
          zIndex: 99999,      // හැම එකටම උඩින්
          backgroundColor: 'rgba(0, 0, 0, 0.8)', // කළු පසුබිම
          width: '50px',      // ස්ථිර පළල
          height: '50px',     // ස්ථිර උස
          borderRadius: '50%', // රවුමක්
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: '2px solid #d4af37', // රත්තරන් පාට බෝඩර්
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}
      >
         {/* Icon එකේ සයිස් එක මෙතනම fix කරල තියෙන්නේ */}
         <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#d4af37" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ minWidth: '24px', minHeight: '24px' }} // පොඩි වෙන්න දෙන්නෙත් නෑ, ලොකු වෙන්න දෙන්නෙත් නෑ
         >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
         
         {/* Badge එක (Number එක) */}
         {cartItems.length > 0 && (
            <span style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              backgroundColor: '#e74c3c',
              color: 'white',
              borderRadius: '50%',
              padding: '4px 6px',
              fontSize: '11px',
              fontWeight: 'bold',
              minWidth: '18px',
              textAlign: 'center',
              border: '1px solid white'
            }}>
              {cartItems.length}
            </span>
         )}
      </div>

      {/* --- HOMEPAGE CONTENT --- */}
      
      <HomePage1 />

      <ParallaxGap 
        image={gapBg} 
        title="ADVENTURE AWAITS"
        subtitle="Explore the Unknown"
      />

      <HomePage5 />

      <ParallaxGap 
        image={gapBg}
        title="DIVE DEEP"
        subtitle="Discover the Blue World"
      />

      <HomePage2 /> 

      <ParallaxGap 
        image={gapBg}
        title="INTO THE WILD"
        subtitle="Connect with Nature"
      />

      <HomePage3 />

      <ParallaxGap 
        image={gapBg}
        title="FIND PEACE"
        subtitle="Sleep Under the Stars"
      />

      <HomePage4 />
   
    </>
  )
}

export default Homepage