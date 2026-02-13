import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../components/sidebar";
import "../styles/dashboard.css";

export default function Rentals() {
  const [orders, setOrders] = useState([]);
  
  // Postman එකේ තිබ්බ Email එකම මෙතනට දාන්න
  const userEmail = "sashikmindaka23@gmail.com"; 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // 👇 වෙනස් කළේ මෙතන විතරයි (Query Param විදියට යවනවා)
        const response = await axios.get(`http://localhost:8080/api/orders/user?email=${userEmail}`);
        
        console.log("Orders Data:", response.data); // Console එකේ Data එනවද බලන්න
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching rental data:", error);
      }
    };
    fetchOrders();
  }, []);

  // Return Date එක දවස් 7කින් පස්සේ (Auto Calculate)
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
        <p className="subtitle">Track and manage your rental items</p>

        {/* Stats */}
        <div className="stats-container">
          <div className="stat-card">
            <h3>Currently Rented</h3>
            <p className="stat-value">{orders.length}</p> {/* Order ගාණ */}
          </div>
          <div className="stat-card">
            <h3>Available</h3><p className="stat-value">5</p>
          </div>
          <div className="stat-card">
            <h3>Overdue</h3><p className="stat-value">0</p>
          </div>
          <div className="stat-card">
            <h3>Maintenance</h3><p className="stat-value">1</p>
          </div>
        </div>

        {/* Active Rentals Table */}
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
                  <th style={{ padding: '12px' }}>Rented On</th>
                  <th style={{ padding: '12px' }}>Return Date</th>
                  <th style={{ padding: '12px' }}>Total</th>
                  <th style={{ padding: '12px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #333' }}>
                    <td style={{ padding: '12px' }}>#{order.id}</td>
                    
                    {/* Items ටික කොමා දාලා පෙන්වන්න */}
                    <td style={{ padding: '12px' }}>
                      {order.items.map(item => `${item.productName} (x${item.quantity})`).join(", ")}
                    </td>

                    <td style={{ padding: '12px' }}>{order.customerName}</td>
                    <td style={{ padding: '12px' }}>{order.orderDate}</td>
                    <td style={{ padding: '12px' }}>{calculateReturnDate(order.orderDate)}</td>
                    <td style={{ padding: '12px' }}>LKR {order.totalAmount}</td>
                    
                    <td style={{ padding: '12px' }}>
                      <span style={{ background: '#4caf50', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                        Active
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