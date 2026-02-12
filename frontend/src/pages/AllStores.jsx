import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // LocalStorage walin cart eka load karanawa (Refresh kalath nathi nowenna)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('tm-gear-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Cart eka wenas wena hamawelawe LocalStorage update karanawa
  useEffect(() => {
    localStorage.setItem('tm-gear-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 1. Add to Cart (thiyena ekak nam qty wadi wenawa, nathi ekak nam add wenawa)
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // 2. Remove Item
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // 3. Update Quantity
  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + change;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  // 4. Clear Cart (Checkout ekata passe)
  const clearCart = () => {
    setCartItems([]);
  };

  // Totals Calculate
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeItem, updateQuantity, clearCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};