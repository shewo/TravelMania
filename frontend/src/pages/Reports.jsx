import React from 'react';
import Sidebar from "../components/sidebar";
import "../styles/dashboard.css";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

export default function Reports() {

  // --- MOCK DATA FOR DEMO CHARTS ---
  
  // Data for Chart 1: Monthly Revenue
  const monthlyRevenueData = [
    { name: 'Jan', revenue: 15000 },
    { name: 'Feb', revenue: 22000 },
    { name: 'Mar', revenue: 18000 },
    { name: 'Apr', revenue: 30000 },
    { name: 'May', revenue: 28000 },
    { name: 'Jun', revenue: 45000 }, // Peak season!
  ];

  // Data for Chart 2: Most Rented Categories
  const categoryData = [
    { name: 'Tents & Shelter', value: 45 },
    { name: 'Backpacks', value: 30 },
    { name: 'Sleeping Gear', value: 15 },
    { name: 'Cooking', value: 10 },
  ];

  // Colors for the Pie Chart matching your gold/dark theme
  const PIE_COLORS = ['#d4af37', '#f5d07a', '#a67c00', '#ebd8a0'];

  // Custom tooltip style for dark mode
  const customTooltipStyle = {
    backgroundColor: '#222',
    border: '1px solid #d4af37',
    borderRadius: '8px',
    color: '#fff'
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <h1>Reports & Analytics</h1>
        <p className="subtitle">View your store's performance and rental trends</p>

        {/* --- STATS SUMMARY (Optional, just for looks) --- */}
        <div className="stats-container" style={{ marginBottom: '30px' }}>
          <div className="stat-card">
            <h3>Total Earnings (YTD)</h3>
            <p className="stat-value">LKR 158,000</p>
          </div>
          <div className="stat-card">
            <h3>Total Rentals</h3>
            <p className="stat-value">142</p>
          </div>
          <div className="stat-card">
            <h3>Top Item</h3>
            <p className="stat-value" style={{ fontSize: '1.2rem' }}>4-Person Camping Tent</p>
          </div>
        </div>

        {/* --- CHARTS GRID --- */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
          
          {/* CHART 1: Monthly Revenue Line Chart */}
          <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #333' }}>
            <h3 style={{ color: '#d4af37', marginBottom: '20px', textAlign: 'center' }}>Monthly Revenue (Last 6 Months)</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={monthlyRevenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip contentStyle={customTooltipStyle} itemStyle={{ color: '#d4af37' }} />
                  <Legend wrapperStyle={{ paddingTop: '10px' }}/>
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    name="Revenue (LKR)"
                    stroke="#d4af37" 
                    strokeWidth={3} 
                    dot={{ fill: '#d4af37', strokeWidth: 2, r: 4 }} 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CHART 2: Category Pie Chart */}
          <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #333' }}>
            <h3 style={{ color: '#d4af37', marginBottom: '20px', textAlign: 'center' }}>Most Popular Categories</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={customTooltipStyle} itemStyle={{ color: 'white' }} />
                  <Legend wrapperStyle={{ paddingTop: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}