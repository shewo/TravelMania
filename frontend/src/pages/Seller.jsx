import "../styles/Seller.css";
import dp from "../assets/dp.jpeg";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaGlobe } from "react-icons/fa";



function Seller() {
  return (
    
      <div className="bg-container" >
       <div className="seller"> <h1><b>SELLER DASHBOARD</b></h1></div>
      <div className="overlay-text"><p></p></div>


<div className="bio-detail">
  <h3>About us</h3>
<p>Based in Belihuloya, we provide reliable camping equipment rentals for outdoor enthusiasts. Our services include tents, essential camping gear, and secure vehicle parking, making it easy and safe to enjoy your adventure. We focus on quality equipment, affordable prices, and friendly service to support a comfortable outdoor experience.</p>
</div>

<div className="top">
   <div className="seller-info">
      <h4 className="seller-name">John Perera</h4>
      <div className="name-line"></div>
      <p className="seller-role">Camping Equipment Provider</p>
      <p className="since">Since 2015</p>
    </div>
  <div className="dp-outer">
    <div className="dp-wrapper">
      <img src={dp} alt="User DP" />
    </div>
  </div>
  
</div>

<div className="con">
  <h3 className="contact">Contact Information</h3>

  <div className="contact-list">
    <div className="contact-item">
       <MdPhone className="icon" />
      <span className="label">Phone</span>
      <span className="value">011 237 5800</span>
    </div>

    <div className="contact-item">
      <MdEmail className="icon" />
      <span className="label">Email</span>
      <span className="value">info@example.com</span>
    </div>
  </div>
</div>



 
           
  </div>    

  )
  }


export default Seller;
