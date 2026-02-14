
import React from 'react';
import '../styles/HomePage4.css'; 
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { Link } from 'react-router-dom';


export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__overlay">
        {/* TOP: 3 columns */}
        <div className="footer__container">
          <div className="footer__col">
            <h4 className="footer__title">TRAVELMANIA</h4>
            <p className="footer__text">123 Jungle Ave, Panama City</p>
            <p className="footer__text">contact@travelmania.com</p>
          </div>

          <div className="footer__col">
            <h4 className="footer__title">EXPLORE</h4>
            <Link className="footer__link" to="/all-stores">All Stores</Link>
            <Link className="footer__link" to="/productpage">Product</Link>
            <Link className="footer__link" to="/map">Map</Link>
          </div>

          <div className="footer__col">
            <h4 className="footer__title">COMPANY</h4>
            <Link className="footer__link" to="/aboutus">About Us</Link>
            <a className="footer__link" href="#journal">Journal</a>
            <Link className="footer__link" to="/contactus">
              Contact Us
            </Link>
          </div>
        </div>

        {/* MIDDLE: follow icons */}
        <div className="footer__follow">
          <p className="footer__followTitle">FOLLOW US</p>

        
<div className="footer__icons">
  <a className="footer__iconLink" href="https://instagram.com" target="_blank" rel="noreferrer">
    <span className="footer__diamond">
    
    

      {/* inner box behind icon (not rotated) */}
      <span className="innerBox"></span>

      <FaInstagram />
    </span>
  </a>

  <a className="footer__iconLink" href="https://facebook.com" target="_blank" rel="noreferrer">
    <span className="footer__diamond">

      <span className="innerBox"></span>

      <FaFacebookF />
    </span>
  </a>
</div>


          {/* small diamond under icons */}
          <div className="footer__tinyDiamond" aria-hidden="true" />
        </div>

        {/* BOTTOM */}
        <div className="footer__bottom">
          <p>Copyright © 2025 TRAVEL MANIA</p>

          <p className="footer__policies">
            <a href="#terms">TERMS &amp; CONDITIONS</a> |{" "}
            <a href="#privacy">PRIVACY POLICY</a>
          </p>

          <p className="footer__siteby">Site by NSBM</p>
        </div>

        
      </div>
    </footer>
  );
}
