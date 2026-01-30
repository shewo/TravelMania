import React, { useState } from 'react';
import '../styles/Cart.css';

const Cart = () => {
  // Dummy Cart Data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Summit Hiking Boots",
      price: 18500,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80",
      quantity: 1,
    },
    {
      id: 2,
      name: "Tactical Travel Backpack",
      price: 12400,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=200&q=80",
      quantity: 2,
    },
    {
      id: 3,
      name: "Waterproof Tent (2-Person)",
      price: 45000,
      image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=200&q=80",
      quantity: 1,
    }
  ]);

  // Update Quantity Handler
  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + change;
          return { ...item, quantity: newQty > 0 ? newQty : 1 }; // Prevent going below 1
        }
        return item;
      })
    );
  };

  // Remove Item Handler
  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  // Calculate Totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 750; // Flat rate for example
  const total = subtotal + shipping;

  return (
    <div className="cart-container">
      {/* Header */}
      <div className="cart-header">
        <h1>Your Gear</h1>
        <p className="cart-count">{cartItems.length} items in cart</p>
      </div>

      <div className="cart-layout">
        
        {/* Left Side: Items List */}
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="item-image" />
              
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <div className="item-price">LKR {item.price.toLocaleString()}</div>
              </div>

              {/* Quantity Controls */}
              <div className="item-quantity">
                <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span className="qty-value">{item.quantity}</span>
                <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>

              {/* Remove Button (Trash Icon) */}
              <button className="remove-btn" onClick={() => removeItem(item.id)}>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          ))}

          {cartItems.length === 0 && (
            <div className="cart-item" style={{justifyContent: 'center', color: '#888'}}>
              <p>Your cart is empty.</p>
            </div>
          )}
        </div>

        {/* Right Side: Order Summary */}
        <div className="cart-summary">
          <h2 className="summary-title">Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>LKR {subtotal.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Shipping Estimate</span>
            <span>LKR {shipping.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Tax (Included)</span>
            <span>LKR 0</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>LKR {total.toLocaleString()}</span>
          </div>

          <button className="checkout-btn" onClick={() => alert("Proceeding to checkout...")}>
            Checkout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;