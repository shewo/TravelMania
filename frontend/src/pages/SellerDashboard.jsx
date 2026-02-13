import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../components/sidebar";
import StatCard from "../components/StatCard";
import InventoryItem from "../components/InventoryItem";
import "../styles/dashboard.css";

export default function SellerDashboard() {
  const [orders, setOrders] = useState([]);
  
  // ⚠️ දැනට Test කරන්න ඔයාගේ Email එක මෙතනට දාන්න.
  // පස්සේ Login හැදුවම ඒක Dynamic ගන්න පුළුවන්.
  const userEmail = "sashikmindaka23@gmail.com"; 

  // Backend එකෙන් Data ගන්නා කොටස
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/orders/user/${userEmail}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <h1>Welcome back, Seller</h1>
        <p className="role">Your role: SELLER</p>

        {/* Stats */}
        <div className="stats-container">
          <StatCard title="Active Listings" value="2" />
          <StatCard title="Completed Sales" value={orders.length} /> {/* Order ගාණ මෙතනට දැම්මා */}
          <StatCard title="Total Revenue" value={`LKR ${orders.reduce((acc, order) => acc + order.totalAmount, 0)}`} /> {/* Total එක හැදෙනවා */}
        </div>

        {/* Inventory */}
        <h2>My Inventory Overview</h2>
        <div className="inventory">
          <InventoryItem name="Hiking Gear Set" />
          <InventoryItem name="Tent Rental" />
          <InventoryItem name="Backpack Sale" />
        </div>

        {/* Recent Orders Section (Updated) */}
        <h2>Recent Orders</h2>
        <div className="recent-orders">
          
          {orders.length === 0 ? (
            <p>No recent orders found.</p>
          ) : (
            // සරල Table එකක් නිර්මාණය කළා
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', backgroundColor: '#222', borderRadius: '8px', overflow: 'hidden' }}>
              <thead>
                <tr style={{ backgroundColor: '#d4af37', color: 'black', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Order ID</th>
                  <th style={{ padding: '12px' }}>Date</th>
                  <th style={{ padding: '12px' }}>Items</th>
                  <th style={{ padding: '12px' }}>Amount</th>
                  <th style={{ padding: '12px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #444', color: '#fff' }}>
                    <td style={{ padding: '12px' }}>#{order.id}</td>
                    <td style={{ padding: '12px' }}>{order.orderDate}</td>
                    <td style={{ padding: '12px' }}>
                      <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9em' }}>
                        {order.items.map((item, index) => (
                          <li key={index}>{item.productName} (x{item.quantity})</li>
                        ))}
                      </ul>
                    </td>
                    <td style={{ padding: '12px' }}>LKR {order.totalAmount}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ backgroundColor: 'green', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                        Paid
                      </span>
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