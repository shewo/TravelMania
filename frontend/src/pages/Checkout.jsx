import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext'; // Context Import
import '../styles/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  
  // --- GET DATA FROM GLOBAL CONTEXT ---
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', address: '', city: '', zip: ''
  });

  // --- CALCULATIONS ---
  const subtotal = getCartTotal();
  const shipping = 750; // Flat rate
  const total = subtotal + shipping;

  // If cart is empty, redirect back to cart (Safety check)
  useEffect(() => {
    if (cartItems.length === 0) {
       navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // Methana API call ekak gahanna puluwan Backend ekata
    const orderDetails = {
        customer: formData,
        items: cartItems,
        amount: total,
        method: paymentMethod
    };

    console.log("Processing Order:", orderDetails);

    // Success Action
    alert("Order Placed Successfully! Your gear is on the way.");
    clearCart(); // Important: Cart eka his karanawa
    navigate('/'); // Redirect to Home
  };

  if (cartItems.length === 0) return null; // Avoid flickering before redirect

  return (
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
          
          {/* Shipping Section */}
          <div className="glass-panel">
            <h2 className="section-title">Shipping Information</h2>
            <form id="checkout-form" onSubmit={handlePlaceOrder}>
              
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" name="firstName" className="glass-input" placeholder="John" required onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" name="lastName" className="glass-input" placeholder="Doe" required onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '25px' }}>
                <label>Email Address</label>
                <input type="email" name="email" className="glass-input" placeholder="john@example.com" required onChange={handleInputChange} />
              </div>

              <div className="form-group" style={{ marginBottom: '25px' }}>
                <label>Address</label>
                <input type="text" name="address" className="glass-input" placeholder="123 Forest View Rd" required onChange={handleInputChange} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input type="text" name="city" className="glass-input" placeholder="Kandy" required onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Zip Code</label>
                  <input type="text" name="zip" className="glass-input" placeholder="20000" required onChange={handleInputChange} />
                </div>
              </div>

            </form>
          </div>

          {/* Payment Section */}
          <div className="glass-panel">
            <h2 className="section-title">Payment Details</h2>
            
            <div className="payment-methods">
              <div 
                className={`payment-card ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                Credit Card
              </div>
              <div 
                className={`payment-card ${paymentMethod === 'cod' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('cod')}
              >
                Cash on Delivery
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="card-details-fade">
                <div className="form-group" style={{marginBottom: '20px'}}>
                  <label>Card Number</label>
                  <input type="text" className="glass-input" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input type="text" className="glass-input" placeholder="MM/YY" />
                  </div>
                  <div className="form-group">
                    <label>CVC</label>
                    <input type="text" className="glass-input" placeholder="123" />
                  </div>
                </div>
              </div>
            )}
            
            {paymentMethod === 'cod' && (
               <p style={{color: '#aaa', fontSize: '0.9rem', textAlign:'center', marginTop:'20px'}}>
                 Pay in cash when your gear arrives.
               </p>
            )}

          </div>
        </div>

        {/* --- RIGHT COLUMN: SUMMARY (DYNAMIC) --- */}
        <div className="checkout-summary">
          <div className="glass-panel">
            <h2 className="section-title">Your Order</h2>
            
            {/* DYNAMIC CART ITEMS LOOP */}
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

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>
              <span>LKR {total.toLocaleString()}</span>
            </div>

            <button 
              type="submit" 
              form="checkout-form" 
              className="place-order-btn"
            >
              Place Order
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;