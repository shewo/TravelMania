import Sidebar from "../components/sidebar";
import "../styles/dashboard.css";

export default function Rentals() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <h1>Rental Management</h1>
        <p className="subtitle">Track and manage your rental items</p>

        {/* Rental Stats */}
        <div className="stats-container">
          <div className="stat-card">
            <h3>Currently Rented</h3>
            <p className="stat-value">3</p>
          </div>
          <div className="stat-card">
            <h3>Available</h3>
            <p className="stat-value">5</p>
          </div>
          <div className="stat-card">
            <h3>Overdue</h3>
            <p className="stat-value">0</p>
          </div>
          <div className="stat-card">
            <h3>Maintenance</h3>
            <p className="stat-value">1</p>
          </div>
        </div>

        {/* Active Rentals */}
        <h2>Active Rentals</h2>
        <div className="table-container" style={{ background: 'black', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e0e0e0', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Item</th>
                <th style={{ padding: '12px' }}>Customer</th>
                <th style={{ padding: '12px' }}>Rented On</th>
                <th style={{ padding: '12px' }}>Return Date</th>
                <th style={{ padding: '12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '12px' }}>Tent Rental</td>
                <td style={{ padding: '12px' }}>John Doe</td>
                <td style={{ padding: '12px' }}>Dec 15, 2025</td>
                <td style={{ padding: '12px' }}>Dec 22, 2025</td>
                <td style={{ padding: '12px' }}><span style={{ background: '#4caf50', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>Active</span></td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '12px' }}>Camping Stove</td>
                <td style={{ padding: '12px' }}>Jane Smith</td>
                <td style={{ padding: '12px' }}>Dec 16, 2025</td>
                <td style={{ padding: '12px' }}>Dec 20, 2025</td>
                <td style={{ padding: '12px' }}><span style={{ background: '#4caf50', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>Active</span></td>
              </tr>
              <tr>
                <td style={{ padding: '12px' }}>Sleeping Bag</td>
                <td style={{ padding: '12px' }}>Mike Johnson</td>
                <td style={{ padding: '12px' }}>Dec 17, 2025</td>
                <td style={{ padding: '12px' }}>Dec 24, 2025</td>
                <td style={{ padding: '12px' }}><span style={{ background: '#4caf50', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
