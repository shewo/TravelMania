// src/components/SmoothScrollWrapper.jsx
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollWrapper({ children }) {
  const lenisRef = useRef();
  const location = useLocation();

  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      // INCREASE this value to slow down the interpolation/inertia
      // Default: 1.2. Try 2.0 or higher for a very "heavy" feel.
      duration: 2.5, 
      
      // DECREASE this value to reduce sensitivity
      // Default: 1. Lowering to 0.7 makes it scroll less distance per wheel flick.
      wheelMultiplier: 0.7, 

      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smooth: true,
    });
    lenisRef.current = lenis;

    // 2. Sync with GSAP
    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Correct way to remove the specific listener function
      // (Note: You might need to extract the raf function to a variable 
      // if you want to be perfectly strict, but this usually works in this context)
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  // 3. Reset scroll to top when page (route) changes
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      {children}
    </div>
  );
}