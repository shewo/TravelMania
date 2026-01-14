import Sidebar from "../components/sidebar";
import "../styles/dashboard.css";

export default function Support() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <h1>Support Center</h1>
        <p className="subtitle">Get help and contact our support team</p>

        {/* Quick Actions */}
        <div className="stats-container">
          <div className="stat-card" style={{ cursor: 'pointer' }}>
            <h3>📚 Documentation</h3>
            <p style={{ fontSize: '14px', marginTop: '10px' }}>Browse guides and tutorials</p>
          </div>
          <div className="stat-card" style={{ cursor: 'pointer' }}>
            <h3>💬 Live Chat</h3>
            <p style={{ fontSize: '14px', marginTop: '10px' }}>Chat with support team</p>
          </div>
          <div className="stat-card" style={{ cursor: 'pointer' }}>
            <h3>📧 Email Support</h3>
            <p style={{ fontSize: '14px', marginTop: '10px' }}>Send us an email</p>
          </div>
          <div className="stat-card" style={{ cursor: 'pointer' }}>
            <h3>🎥 Video Tutorials</h3>
            <p style={{ fontSize: '14px', marginTop: '10px' }}>Watch how-to videos</p>
          </div>
        </div>

        {/* FAQ Section */}
        <h2 style={{ marginTop: '30px' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
          <details style={{ background: 'white', padding: '15px', borderRadius: '8px', cursor: 'pointer' }}>
            <summary style={{ fontWeight: '500', fontSize: '16px' }}>How do I add a new listing?</summary>
            <p style={{ marginTop: '10px', color: '#666' }}>
              Go to "My Listings" page and click the "+ Add New Listing" button. Fill in all the required details about your item including title, description, price, and images.
            </p>
          </details>
          <details style={{ background: 'white', padding: '15px', borderRadius: '8px', cursor: 'pointer' }}>
            <summary style={{ fontWeight: '500', fontSize: '16px' }}>How do I manage rental returns?</summary>
            <p style={{ marginTop: '10px', color: '#666' }}>
              Navigate to the "Rentals" page where you can see all active rentals. You can mark items as returned, extend rental periods, or check return dates.
            </p>
          </details>
          <details style={{ background: 'white', padding: '15px', borderRadius: '8px', cursor: 'pointer' }}>
            <summary style={{ fontWeight: '500', fontSize: '16px' }}>How do I view my sales history?</summary>
            <p style={{ marginTop: '10px', color: '#666' }}>
              Visit the "Sales History" page to see all your completed transactions. You can filter by date ranges and export reports for your records.
            </p>
          </details>
          <details style={{ background: 'white', padding: '15px', borderRadius: '8px', cursor: 'pointer' }}>
            <summary style={{ fontWeight: '500', fontSize: '16px' }}>What payment methods do you support?</summary>
            <p style={{ marginTop: '10px', color: '#666' }}>
              We support all major credit cards, debit cards, PayPal, and bank transfers. Payment processing is secure and encrypted.
            </p>
          </details>
          <details style={{ background: 'white', padding: '15px', borderRadius: '8px', cursor: 'pointer' }}>
            <summary style={{ fontWeight: '500', fontSize: '16px' }}>How do I contact a customer?</summary>
            <p style={{ marginTop: '10px', color: '#666' }}>
              You can contact customers through our built-in messaging system. Go to any order or rental record and click the "Message Customer" button.
            </p>
          </details>
        </div>

        {/* Contact Form */}
        <h2 style={{ marginTop: '30px' }}>Contact Support</h2>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginTop: '15px' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Subject</label>
              <input type="text" placeholder="What do you need help with?" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Category</label>
              <select style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}>
                <option>Select a category</option>
                <option>Technical Issue</option>
                <option>Billing Question</option>
                <option>Account Help</option>
                <option>Feature Request</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Message</label>
              <textarea rows="5" placeholder="Describe your issue or question..." style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}></textarea>
            </div>
            <button type="button" style={{ padding: '10px 20px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: 'fit-content' }}>
              Submit Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
