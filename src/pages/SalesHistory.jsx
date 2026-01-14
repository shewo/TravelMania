import Sidebar from "../components/sidebar";
import "../styles/dashboard.css";

export default function SalesHistory() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <h1>Sales History</h1>
        <p className="subtitle">View all your completed sales and transactions</p>

        {/* Date Filter */}
        <div className="filters" style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <label>Filter by date:</label>
          <select style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
            <option>All time</option>
          </select>
        </div>

        {/* Sales Summary */}
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Sales</h3>
            <p className="stat-value">$12,450</p>
          </div>
          <div className="stat-card">
            <h3>Orders</h3>
            <p className="stat-value">47</p>
          </div>
          <div className="stat-card">
            <h3>Avg. Order Value</h3>
            <p className="stat-value">$265</p>
          </div>
          <div className="stat-card">
            <h3>Top Seller</h3>
            <p className="stat-value">Hiking Gear</p>
          </div>
        </div>

        {/* Sales Table */}
        <h2>Recent Sales</h2>
        <div className="table-container" style={{ background: 'white', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e0e0e0', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Order ID</th>
                <th style={{ padding: '12px' }}>Item</th>
                <th style={{ padding: '12px' }}>Customer</th>
                <th style={{ padding: '12px' }}>Date</th>
                <th style={{ padding: '12px' }}>Amount</th>
                <th style={{ padding: '12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '12px' }}>#ORD-1234</td>
                <td style={{ padding: '12px' }}>Hiking Gear Set</td>
                <td style={{ padding: '12px' }}>Alice Brown</td>
                <td style={{ padding: '12px' }}>Dec 17, 2025</td>
                <td style={{ padding: '12px' }}>$350</td>
                <td style={{ padding: '12px' }}><span style={{ background: '#4caf50', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>Completed</span></td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '12px' }}>#ORD-1233</td>
                <td style={{ padding: '12px' }}>Backpack Sale</td>
                <td style={{ padding: '12px' }}>Bob Wilson</td>
                <td style={{ padding: '12px' }}>Dec 16, 2025</td>
                <td style={{ padding: '12px' }}>$120</td>
                <td style={{ padding: '12px' }}><span style={{ background: '#4caf50', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>Completed</span></td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '12px' }}>#ORD-1232</td>
                <td style={{ padding: '12px' }}>Tent Rental</td>
                <td style={{ padding: '12px' }}>Carol Davis</td>
                <td style={{ padding: '12px' }}>Dec 15, 2025</td>
                <td style={{ padding: '12px' }}>$85</td>
                <td style={{ padding: '12px' }}><span style={{ background: '#4caf50', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>Completed</span></td>
              </tr>
              <tr>
                <td style={{ padding: '12px' }}>#ORD-1231</td>
                <td style={{ padding: '12px' }}>Camping Stove</td>
                <td style={{ padding: '12px' }}>David Lee</td>
                <td style={{ padding: '12px' }}>Dec 14, 2025</td>
                <td style={{ padding: '12px' }}>$180</td>
                <td style={{ padding: '12px' }}><span style={{ background: '#4caf50', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>Completed</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
