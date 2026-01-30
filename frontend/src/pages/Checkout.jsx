import React, { useState } from 'react';
import '../styles/Checkout.css';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Dummy Totals (Ideally passed from Cart state)
  const subtotal = 75900;
  const shipping = 750;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    alert("Order Placed Successfully!");
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
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
                  <input type="text" className="glass-input" placeholder="John" required />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" className="glass-input" placeholder="Doe" required />
                </div>
              </div>

              <div className="form-group" style={{marginBottom: '20px'}}>
                <label>Email Address</label>
                <input type="email" className="glass-input" placeholder="john@example.com" required />
              </div>

              <div className="form-group" style={{marginBottom: '20px'}}>
                <label>Address</label>
                <input type="text" className="glass-input" placeholder="123 Forest View Rd" required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input type="text" className="glass-input" placeholder="Kandy" required />
                </div>
                <div className="form-group">
                  <label>Zip Code</label>
                  <input type="text" className="glass-input" placeholder="20000" required />
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
               <p style={{color: '#aaa', fontSize: '0.9rem'}}>Pay in cash when your gear arrives.</p>
            )}

          </div>
        </div>

        {/* --- RIGHT COLUMN: SUMMARY --- */}
        <div className="checkout-summary">
          <div className="glass-panel">
            <h2 className="section-title">Your Order</h2>
            
            <div className="summary-item">
              <span>Summit Hiking Boots (x1)</span>
              <span>LKR 18,500</span>
            </div>
            <div className="summary-item">
              <span>Tactical Backpack (x2)</span>
              <span>LKR 24,800</span>
            </div>
            <div className="summary-item">
              <span>Waterproof Tent (x1)</span>
              <span>LKR 45,000</span>
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

            {/* This button triggers the form submit remotely or you can move it inside the form */}
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