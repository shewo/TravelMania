import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../components/sidebar";
import StatCard from "../components/StatCard";
import "../styles/dashboard.css";

const CATEGORIES = [
  { name: "Tents & Shelter", icon: "⛺" },
  { name: "Sleeping Gear", icon: "💤" },
  { name: "Backpacks", icon: "🎒" },
  { name: "Lighting", icon: "🔦" },
  { name: "Footwear", icon: "👞" },
  { name: "Cooking", icon: "🍳" },
  { name: "Electronics", icon: "📷" },
  { name: "Safety", icon: "⛑️" }
];

export default function SellerDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]); 
  const [shopId, setShopId] = useState(null);

  const userEmail = "sashikmindaka23@gmail.com"; 

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await axios.get(`http://localhost:8080/api/orders/user?email=${userEmail}`);
        setOrders(ordersResponse.data);

        if (shopId) {
          const productsResponse = await axios.get(`http://localhost:8080/api/products/shop/${shopId}`);
          setInventory(productsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, [shopId, userEmail]);

  const completedOrders = orders.filter(order => order.status === "COMPLETED");
  const totalRevenue = completedOrders.reduce((acc, order) => acc + order.totalAmount, 0);
  
  const categoryCounts = inventory.reduce((acc, item) => {
    const cat = item.category || "Uncategorized";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, count]) => {
      const catData = CATEGORIES.find(c => c.name === name) || { icon: "📦" };
      return { name, count, icon: catData.icon };
    });

  // 👇 NEW: Bulletproof navigation function
  const handleEditClick = (cat) => {
    // Save the category they want to open in local storage
    localStorage.setItem("tm-open-category", JSON.stringify({ name: cat.name, icon: cat.icon }));
    navigate('/mylistings'); // Then jump to the page
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <h1>Welcome back, Seller</h1>
        <p className="role">Your role: SELLER </p>

        <div className="stats-container">
          <StatCard title="Active Listings" value={inventory.length} /> 
          <StatCard title="Completed Sales" value={completedOrders.length} /> 
          <StatCard title="Total Revenue" value={`LKR ${totalRevenue.toLocaleString()}`} /> 
        </div>

        <h2>Most Used Lists</h2>
        <div className="inventory">
          {topCategories.length === 0 ? (
            <p style={{ color: '#aaa' }}>No items in your inventory yet.</p>
          ) : (
            topCategories.map((cat, index) => (
              <div key={index} className="inventory-item">
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "24px" }}>{cat.icon}</span>
                  {cat.name} ({cat.count})
                </span>
                <div>
                  {/* 👇 Calls our bulletproof function */}
                  <button onClick={() => handleEditClick(cat)}>Edit Listing</button>
                  <button onClick={() => navigate('/rentals')}>View Orders</button>
                </div>
              </div>
            ))
          )}
        </div>

        <h2>Recent Orders</h2>
        <div className="recent-orders">
          {orders.length === 0 ? (
            <p style={{ color: '#aaa' }}>No recent orders found for this email.</p>
          ) : (
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
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #444', color: '#fff' }}>
                    <td style={{ padding: '12px' }}>#{order.id}</td>
                    <td style={{ padding: '12px' }}>{order.orderDate}</td>
                    <td style={{ padding: '12px' }}>
                      <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9em' }}>
                        {order.items.map((item, idx) => (
                          <li key={idx}>{item.productName} (x{item.quantity})</li>
                        ))}
                      </ul>
                    </td>
                    <td style={{ padding: '12px' }}>LKR {order.totalAmount}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ 
                        backgroundColor: order.status === 'COMPLETED' ? '#2196F3' : 'green', 
                        padding: '4px 8px', borderRadius: '4px', fontSize: '12px' 
                      }}>
                        {order.status || 'ACTIVE'}
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