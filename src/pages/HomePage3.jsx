import React from 'react';
import '../styles/HomePage3.css'; 
import bg from "../assets/banner.jpg";

export default function HeroBanner() {
  return (
    <section className="stage">
      <div
        className="canvas"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Dark overlay (Ensure you have .overlay in your CSS if you need this) */}
        <div className="overlay" />

        {/* TOP TITLE */}
        <h1 className="topTitle">
          MASTER THE ELEMENTS.
          <br />
          EQUIPMENT BUILT FOR
          <br />
          THE WILD.
        </h1>

        {/* BOTTOM TITLE */}
        <h2 className="bottomTitle">
          YOUR GATEWAY TO THE UNKNOWN
        </h2>

        {/* DESCRIPTION */}
        <p className="desc">
          Discover our range of technical gear, from lightweight shelters to
          robust cooking systems,<br/> crafted to withstand the toughest
          environments and elevate your outdoor experience.
        </p>

        {/* CTA BUTTON */}
        <button className="cta">
          <svg
            className="frame"
            viewBox="0 0 420 64"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* INNER angled outline (inset) */}
            <polygon
              className="inner"
              points="
                40,12   380,12
                408,32
                380,52  40,52
                12,32
              "
            />

            {/* Optional inner straight box (very subtle) */}
            <rect className="innerBox" x="20" y="18" width="380" height="28" rx="0" />
          </svg>

          <span>EXPLORE NOW</span>
        </button>
      </div>
    </section>
  );
}