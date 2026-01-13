import Sidebar from "../components/sidebar";
import "../styles/dashboard.css";

export default function Settings() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <h1>Settings</h1>
        <p className="subtitle">Manage your account and preferences</p>

        {/* Settings Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
          
          {/* Profile Settings */}
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
            <h2>Profile Information</h2>
            <form style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Full Name</label>
                <input type="text" defaultValue="John Seller" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email</label>
                <input type="email" defaultValue="seller@example.com" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Phone</label>
                <input type="tel" defaultValue="+1 234 567 8900" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
              </div>
              <button type="button" style={{ padding: '10px 20px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: 'fit-content' }}>
                Save Changes
              </button>
            </form>
          </div>

          {/* Store Settings */}
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
            <h2>Store Settings</h2>
            <form style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Store Name</label>
                <input type="text" defaultValue="My Outdoor Store" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Store Description</label>
                <textarea rows="3" defaultValue="Quality outdoor gear for all your adventures" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}></textarea>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Business Address</label>
                <input type="text" defaultValue="123 Main St, City, State 12345" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
              </div>
              <button type="button" style={{ padding: '10px 20px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: 'fit-content' }}>
                Update Store
              </button>
            </form>
          </div>

          {/* Notification Settings */}
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
            <h2>Notifications</h2>
            <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" defaultChecked />
                <span>Email notifications for new orders</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" defaultChecked />
                <span>Email notifications for messages</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" />
                <span>SMS notifications for urgent updates</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" defaultChecked />
                <span>Weekly sales summary</span>
              </label>
            </div>
          </div>

          {/* Security Settings */}
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
            <h2>Security</h2>
            <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <button type="button" style={{ padding: '10px 20px', background: '#ff9800', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: 'fit-content' }}>
                Change Password
              </button>
              <button type="button" style={{ padding: '10px 20px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: 'fit-content' }}>
                Enable Two-Factor Authentication
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
