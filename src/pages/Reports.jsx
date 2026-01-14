import Sidebar from "../components/sidebar";
import "../styles/dashboard.css";

export default function Reports() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <h1>Reports & Analytics</h1>
        <p className="subtitle">Track your business performance and insights</p>

        {/* Report Type Selector */}
        <div className="filters" style={{ marginBottom: '20px' }}>
          <button className="filter-btn active">Overview</button>
          <button className="filter-btn">Sales</button>
          <button className="filter-btn">Inventory</button>
          <button className="filter-btn">Customer</button>
        </div>

        {/* Key Metrics */}
        <div className="stats-container">
          <div className="stat-card">
            <h3>Revenue Growth</h3>
            <p className="stat-value">+23%</p>
            <small style={{ color: '#4caf50' }}>vs last month</small>
          </div>
          <div className="stat-card">
            <h3>Conversion Rate</h3>
            <p className="stat-value">18.5%</p>
            <small style={{ color: '#4caf50' }}>+2.3%</small>
          </div>
          <div className="stat-card">
            <h3>Avg. Rating</h3>
            <p className="stat-value">4.7/5</p>
            <small style={{ color: '#666' }}>from 156 reviews</small>
          </div>
          <div className="stat-card">
            <h3>Return Rate</h3>
            <p className="stat-value">2.1%</p>
            <small style={{ color: '#4caf50' }}>-0.5%</small>
          </div>
        </div>

        {/* Charts Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
            <h2>Sales Trend</h2>
            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', marginTop: '10px', borderRadius: '4px' }}>
              <p style={{ color: '#999' }}>📈 Sales Chart Visualization</p>
            </div>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
            <h2>Popular Categories</h2>
            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', marginTop: '10px', borderRadius: '4px' }}>
              <p style={{ color: '#999' }}>📊 Category Chart Visualization</p>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <h2 style={{ marginTop: '30px' }}>Top Performing Products</h2>
        <div className="table-container" style={{ background: 'white', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e0e0e0', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Rank</th>
                <th style={{ padding: '12px' }}>Product</th>
                <th style={{ padding: '12px' }}>Sales</th>
                <th style={{ padding: '12px' }}>Revenue</th>
                <th style={{ padding: '12px' }}>Growth</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '12px' }}>1</td>
                <td style={{ padding: '12px' }}>Hiking Gear Set</td>
                <td style={{ padding: '12px' }}>42</td>
                <td style={{ padding: '12px' }}>$4,200</td>
                <td style={{ padding: '12px', color: '#4caf50' }}>+15%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '12px' }}>2</td>
                <td style={{ padding: '12px' }}>Tent Rental</td>
                <td style={{ padding: '12px' }}>38</td>
                <td style={{ padding: '12px' }}>$3,230</td>
                <td style={{ padding: '12px', color: '#4caf50' }}>+8%</td>
              </tr>
              <tr>
                <td style={{ padding: '12px' }}>3</td>
                <td style={{ padding: '12px' }}>Camping Stove</td>
                <td style={{ padding: '12px' }}>35</td>
                <td style={{ padding: '12px' }}>$3,150</td>
                <td style={{ padding: '12px', color: '#4caf50' }}>+12%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
