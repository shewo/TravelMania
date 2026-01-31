import "../styles/Seller.css";
import dp from "../assets/dp.jpeg";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaGlobe } from "react-icons/fa";
import Sellersidebar from "../Components/Sellersidebar";



function Seller() {
  return (
    
      <div className="bg-container" >
        <Sellersidebar />
       <div className="seller"> <h1><b>SELLER DASHBOARD</b></h1></div>
      <div className="overlay-text"><p></p></div>


<div className="bio-detail">
  <h3>About us</h3>
<p></p>
</div>

<div className="top">
   <div className="seller-info">
      <h4 className="seller-name"></h4>
      
      <p className="seller-role"></p>
      <p className="since"></p>
    </div>
  <div className="dp-outer">
    <div className="dp-wrapper">
      <img src={dp} alt="User DP" />
    </div>
  </div>
  
</div>

<div className="con">
  <h3 className="contact">Contact Information</h3>


</div>


           
  </div>   
  

  )
  }


export default Seller;
