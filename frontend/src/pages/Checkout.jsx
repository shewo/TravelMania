import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { CartContext } from './CartContext'; 
import '../styles/Checkout.css';
import bgVideo2 from '../assets/bg-video2.mp4';

const Checkout = () => {
  const navigate = useNavigate();
  
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', address: '', city: '', zip: ''
  });

  const subtotal = getCartTotal ? getCartTotal() : 0;
  const shipping = 750;
  const total = subtotal + shipping;

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
       // navigate('/cart'); 
    }
  }, [cartItems, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    // 👇 Extract the dynamic shopId from the first item in the cart
    const orderShopId = cartItems.length > 0 ? cartItems[0].shopId : null;
    
    // 👇 Add shopId to the payload sent to the backend
    const orderPayload = {
        shopId: orderShopId, // Connects the order to the correct seller's dashboard
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        address: `${formData.address}, ${formData.city}, ${formData.zip}`,
        totalAmount: total,
        items: cartItems.map(item => ({
            productName: item.productName,
            quantity: item.quantity,
            price: item.price
        }))
    };

    try {
        console.log("Sending Order to Backend...", orderPayload);

        const response = await axios.post('http://localhost:8080/api/orders/place', orderPayload);

        if (response.status === 200 || response.status === 201) {
            alert("Order Placed Successfully! Check your Email.");
            clearCart(); 
            navigate('/'); 
        }
    } catch (error) {
        console.error("Order Failed:", error);
        alert("Order Failed! Check if Backend is running.");
    }
  };

  if (!cartItems) return <div style={{padding:'50px', color:'white', textAlign:'center'}}>Loading Cart...</div>;

  return (
    <>
      <div className="checkout-bg-video-wrapper">
        <video autoPlay loop muted playsInline className="checkout-bg-video">
          <source src={bgVideo2} type="video/mp4" />
        </video>
      </div>
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <button onClick={() => navigate('/cart')} style={{background:'transparent', border:'none', color:'#ccc', cursor:'pointer', fontSize:'14px'}}>
            ← Back to Cart
        </button>
      </div>

      <div className="checkout-layout">
        
        {/* --- LEFT COLUMN: FORMS --- */}
        <div className="checkout-forms">
          <div className="glass-panel">
            <h2 className="section-title">Shipping Information</h2>
            
            <form id="checkout-form" onSubmit={handlePlaceOrder}>
              
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" name="firstName" className="glass-input" placeholder="Saman" required onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" name="lastName" className="glass-input" placeholder="Perera" required onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '25px' }}>
                <label>Email Address</label>
                <input type="email" name="email" className="glass-input" placeholder="saman@gmail.com" required onChange={handleInputChange} />
              </div>

              <div className="form-group" style={{ marginBottom: '25px' }}>
                <label>Address</label>
                <input type="text" name="address" className="glass-input" placeholder="No 123, Galle Road" required onChange={handleInputChange} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input type="text" name="city" className="glass-input" placeholder="Colombo" required onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Zip Code</label>
                  <input type="text" name="zip" className="glass-input" placeholder="10000" required onChange={handleInputChange} />
                </div>
              </div>

            </form>
          </div>

          <div className="glass-panel">
            <h2 className="section-title">Payment Details</h2>
            <div className="payment-methods">
              <div className={`payment-card ${paymentMethod === 'cod' ? 'active' : ''}`} onClick={() => setPaymentMethod('cod')}>
                Cash on Delivery
              </div>
              <div className={`payment-card ${paymentMethod === 'card' ? 'active' : ''}`} onClick={() => setPaymentMethod('card')}>
                Credit Card
              </div>
            </div>
            
            {paymentMethod === 'cod' && (
               <p style={{color: '#aaa', fontSize: '0.9rem', textAlign:'center', marginTop:'20px'}}>
                 Pay securely when your gear arrives.
               </p>
            )}
            {paymentMethod === 'card' && (
               <p style={{color: '#aaa', fontSize: '0.9rem', textAlign:'center', marginTop:'20px'}}>
                 Card payments coming soon! Please select Cash on Delivery.
               </p>
            )}
          </div>
        </div>

        {/* --- RIGHT COLUMN: SUMMARY --- */}
        <div className="checkout-summary">
          <div className="glass-panel">
            <h2 className="section-title">Your Order</h2>
            
            <div className="summary-items-scroll" style={{maxHeight:'300px', overflowY:'auto', marginBottom:'20px'}}>
                {cartItems.map((item) => (
                    <div key={item.id} className="summary-item">
                        <span>{item.productName} <span style={{fontSize:'0.8em', color:'#aaa'}}>(x{item.quantity})</span></span>
                        <span>LKR {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-item">
              <span>Subtotal</span>
              <span>LKR {subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span>Shipping</span>
              <span>LKR {shipping.toLocaleString()}</span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>LKR {total.toLocaleString()}</span>
            </div>

            <button type="submit" form="checkout-form" className="place-order-btn">
              Place Order
            </button>
          </div>
        </div>

      </div>
    </div>
  </>);
}

export default Checkout;