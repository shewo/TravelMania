import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../components/sidebar";
import "../styles/dashboard.css";

export default function SalesHistory() {
  const [completedOrders, setCompletedOrders] = useState([]);
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

  // 2. Fetch Orders
  useEffect(() => {
    const fetchSales = async () => {
      if (!shopId) return;
      try {
        const response = await axios.get(`http://localhost:8080/api/orders/shop/${shopId}`);
        // 👇 Filter to ONLY show COMPLETED orders
        const completed = response.data.filter(order => order.status === "COMPLETED");
        setCompletedOrders(completed);
      } catch (error) {
        console.error("Error fetching sales history:", error);
      }
    };
    fetchSales();
  }, [shopId]);

  // 3. Dynamic Stats Calculations
  const totalSales = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrdersCount = completedOrders.length;
  const avgOrderValue = totalOrdersCount > 0 ? (totalSales / totalOrdersCount).toFixed(2) : 0;

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <h1>Sales History</h1>
        <p className="subtitle">View all your completed sales and transactions</p>

        {/* Dynamic Sales Summary */}
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Sales</h3>
            <p className="stat-value">LKR {totalSales.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p className="stat-value">{totalOrdersCount}</p>
          </div>
          <div className="stat-card">
            <h3>Avg. Order Value</h3>
            <p className="stat-value">LKR {avgOrderValue}</p>
          </div>
        </div>

        {/* Sales Table */}
        <h2>Recent Sales</h2>
        <div className="table-container" style={{ background: 'black', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
          
          {completedOrders.length === 0 ? (
            <p style={{ color: 'white', textAlign: 'center' }}>No completed sales yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #d4af37', textAlign: 'left', color: '#d4af37' }}>
                  <th style={{ padding: '12px' }}>Order ID</th>
                  <th style={{ padding: '12px' }}>Item(s)</th>
                  <th style={{ padding: '12px' }}>Customer</th>
                  <th style={{ padding: '12px' }}>Date Rented</th>
                  <th style={{ padding: '12px' }}>Amount</th>
                  <th style={{ padding: '12px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {completedOrders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #333' }}>
                    <td style={{ padding: '12px' }}>#{order.id}</td>
                    <td style={{ padding: '12px' }}>
                      {order.items.map(item => `${item.productName} (x${item.quantity})`).join(", ")}
                    </td>
                    <td style={{ padding: '12px' }}>{order.customerName}</td>
                    <td style={{ padding: '12px' }}>{order.orderDate}</td>
                    <td style={{ padding: '12px' }}>LKR {order.totalAmount}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ background: '#2196F3', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                        Completed
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