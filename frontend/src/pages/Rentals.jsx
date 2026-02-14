import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../components/sidebar";
import "../styles/dashboard.css";

export default function Rentals() {
  const [orders, setOrders] = useState([]);
  const [shopId, setShopId] = useState(null);

  // 1. Get the seller's shop ID
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('travelUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.shopId) setShopId(user.shopId);
      }
    } catch (error) {
      console.error("Error loading shop ID:", error);
    }
  }, []);

  // 2. Fetch Orders function
  const fetchOrders = async () => {
    if (!shopId) return;
    try {
      const response = await axios.get(`http://localhost:8080/api/orders/shop/${shopId}`);
      // 👇 Only keep ACTIVE orders for the Rentals tab
      const activeOrders = response.data.filter(order => order.status === "ACTIVE");
      setOrders(activeOrders);
    } catch (error) {
      console.error("Error fetching rental data:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [shopId]);

  // 👇 3. Handle Status Update
  const handleMarkAsCompleted = async (orderId) => {
    if(!window.confirm("Are you sure you want to mark this rental as completed?")) return;
    
    try {
      await axios.put(`http://localhost:8080/api/orders/${orderId}/status?status=COMPLETED`);
      alert("Order marked as completed!");
      fetchOrders(); // Refresh the list so it disappears from here
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  const calculateReturnDate = (orderDate) => {
    if (!orderDate) return "N/A";
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 7);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <h1>Rental Management</h1>
        <p className="subtitle">Track and manage your active rental items</p>

        <div className="stats-container">
          <div className="stat-card"><h3>Currently Rented</h3><p className="stat-value">{orders.length}</p></div>
        </div>

        <h2>Active Rentals</h2>
        <div className="table-container" style={{ background: 'black', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
          {orders.length === 0 ? (
            <p style={{ color: 'white', textAlign: 'center' }}>No active rentals found.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #d4af37', textAlign: 'left', color: '#d4af37' }}>
                  <th style={{ padding: '12px' }}>Order ID</th>
                  <th style={{ padding: '12px' }}>Items</th>
                  <th style={{ padding: '12px' }}>Customer</th>
                  <th style={{ padding: '12px' }}>Return Date</th>
                  <th style={{ padding: '12px' }}>Total</th>
                  <th style={{ padding: '12px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #333' }}>
                    <td style={{ padding: '12px' }}>#{order.id}</td>
                    <td style={{ padding: '12px' }}>{order.items.map(item => `${item.productName} (x${item.quantity})`).join(", ")}</td>
                    <td style={{ padding: '12px' }}>{order.customerName}</td>
                    <td style={{ padding: '12px' }}>{calculateReturnDate(order.orderDate)}</td>
                    <td style={{ padding: '12px' }}>LKR {order.totalAmount}</td>
                    <td style={{ padding: '12px' }}>
                      {/* 👇 COMPLETE BUTTON */}
                      <button 
                        onClick={() => handleMarkAsCompleted(order.id)}
                        style={{ background: '#4caf50', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        Complete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}