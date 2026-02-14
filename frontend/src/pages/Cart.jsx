import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';
import { CartContext } from './CartContext';
import bgVideo2 from '../assets/bg-video2.mp4';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeItem, getCartTotal } = useContext(CartContext);

  const subtotal = getCartTotal();
  const shipping = 750;
  const total = subtotal + shipping;

  return (
    <>
      <div className="cart-bg-video-wrapper">
        <video autoPlay loop muted playsInline className="cart-bg-video">
          <source src={bgVideo2} type="video/mp4" />
        </video>
      </div>
      <div className="cart-container">
        <div className="cart-header">
          <h1>Your Gear</h1>
          <p className="cart-count">{cartItems.length} items</p>
        </div>

        <div className="cart-layout">
          <div className="cart-items-list">
            {cartItems.length === 0 ? (
              <p style={{color:'white', padding:'20px'}}>Cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.imageUrl || item.image} alt={item.productName} className="item-image" />
                  <div className="item-details">
                    <h3>{item.productName}</h3>
                    <div>LKR {item.price}</div>
                  </div>
                  <div className="item-quantity">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row"><span>Total</span><span>LKR {total}</span></div>
              <button className="checkout-btn" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;