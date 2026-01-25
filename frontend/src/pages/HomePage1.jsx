import React, { useState, useRef } from 'react';
import '../styles/HomePage1.css';
import bgImage from '../assets/footer-bg.jpg';
import musicBg from '../assets/travel-music.mp3';
import logoPng from '../assets/hero-title.png'; // 1. IMPORT YOUR PNG HERE

const HomePage1 = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className="hp1-hero-section"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bgImage})` }}
    >
      <audio ref={audioRef} src={musicBg} loop />

      <div className="hp1-hero-main">
        <span className="hp1-hero-subtitle">✦ A Gift From The Gods ✦</span>

        {/* --- 2. TEXT REMOVED & REPLACED WITH IMAGE --- */}
        <div className="hp1-hero-logo-container">
           <img src={logoPng} alt="Mythical Journey" className="hp1-hero-png" />
        </div>

        <div className="hp1-hero-action">
          <button className="hp1-cta">
            <svg className="hp1-frame" viewBox="0 0 320 60" preserveAspectRatio="none">
              <polygon className="hp1-inner" points="30,5 290,5 315,30 290,55 30,55 5,30" />
              <rect className="hp1-innerBox" x="12" y="10" width="296" height="40" rx="0" />
            </svg>
            <span className="cta-text">START ADVENTURE</span>
          </button>
        </div>
      </div>

      {/* --- MUSIC BUTTON --- */}
      <button className="hp1-music-control" onClick={toggleMusic} aria-label="Toggle Music">
        {isPlaying ? (
          <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
            <g transform="translate(10, 12) scale(0.6) translate(-12, -12)">
              <path d="M7 9v6h4l5 5V4l-5 5H7z" fill="currentColor" stroke="none"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </svg>
        ) : (
          <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
            <g transform="translate(10, 12) scale(0.6) translate(-12, -12)">
              <path d="M7 9v6h4l5 5V4l-5 5H7z" fill="currentColor" stroke="none"/>
              <path d="M16 10l4 4m0-4l-4 4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        )}
      </button>
    </div>
  );
};

export default HomePage1;