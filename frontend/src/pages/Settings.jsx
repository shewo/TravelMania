import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import "../styles/dashboard.css";

export default function Settings() {
  // Profile state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Store state
  const [store, setStore] = useState({
    storeName: "",
    storeDescription: "",
    businessAddress: "",
  });

  // Notification state
  const [notifications, setNotifications] = useState({
    newOrders: true,
    messages: true,
    smsUrgent: false,
    weeklySummary: true,
  });

  // Loading / feedback state
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("travelUser");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setProfile({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Handle profile input changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle store input changes
  const handleStoreChange = (e) => {
    const { name, value } = e.target;
    setStore((prev) => ({ ...prev, [name]: value }));
  };

  // Handle notification toggle changes
  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    setSaving(true);
    setMessage("");
    try {
      // Update localStorage
      const storedUser = JSON.parse(localStorage.getItem("travelUser") || "{}");
      const updatedUser = { ...storedUser, name: profile.name, email: profile.email, phone: profile.phone };
      localStorage.setItem("travelUser", JSON.stringify(updatedUser));

      // TODO: Replace with your actual API endpoint
      // await axios.put("http://localhost:8080/api/users/profile", profile);

      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Save store settings
  const handleUpdateStore = async () => {
    setSaving(true);
    setMessage("");
    try {
      // TODO: Replace with your actual API endpoint
      // await axios.put("http://localhost:8080/api/shops/update", store);

      setMessage("Store settings updated successfully!");
    } catch (error) {
      console.error("Error updating store:", error);
      setMessage("Failed to update store. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Change password handler
  const handleChangePassword = () => {
    // TODO: Implement password change modal or redirect
    alert("Password change functionality coming soon!");
  };

  // Enable 2FA handler
  const handleEnable2FA = () => {
    // TODO: Implement 2FA setup flow
    alert("Two-Factor Authentication setup coming soon!");
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <h1>Settings</h1>
        <p className="subtitle">Manage your account and preferences</p>

        {/* Feedback message */}
        {message && (
          <div style={{
            padding: '10px 15px',
            marginBottom: '15px',
            borderRadius: '5px',
            background: message.includes("Failed") ? '#ffebee' : '#e8f5e9',
            color: message.includes("Failed") ? '#c62828' : '#2e7d32',
            border: `1px solid ${message.includes("Failed") ? '#ef9a9a' : '#a5d6a7'}`,
          }}>
            {message}
          </div>
        )}

        {/* Settings Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>

          {/* Profile Settings */}
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
            <h2>Profile Information</h2>
            <form style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}
                  onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                style={{ padding: '10px 20px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: 'fit-content', opacity: saving ? 0.6 : 1 }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>

          {/* Store Settings */}
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
            <h2>Store Settings</h2>
            <form style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}
                  onSubmit={(e) => { e.preventDefault(); handleUpdateStore(); }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Store Name</label>
                <input
                  type="text"
                  name="storeName"
                  value={store.storeName}
                  onChange={handleStoreChange}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Store Description</label>
                <textarea
                  rows="3"
                  name="storeDescription"
                  value={store.storeDescription}
                  onChange={handleStoreChange}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Business Address</label>
                <input
                  type="text"
                  name="businessAddress"
                  value={store.businessAddress}
                  onChange={handleStoreChange}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                style={{ padding: '10px 20px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: 'fit-content', opacity: saving ? 0.6 : 1 }}
              >
                {saving ? "Saving..." : "Update Store"}
              </button>
            </form>
          </div>

          {/* Notification Settings */}
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
            <h2>Notifications</h2>
            <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" checked={notifications.newOrders} onChange={() => handleNotificationChange("newOrders")} />
                <span>Email notifications for new orders</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" checked={notifications.messages} onChange={() => handleNotificationChange("messages")} />
                <span>Email notifications for messages</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" checked={notifications.smsUrgent} onChange={() => handleNotificationChange("smsUrgent")} />
                <span>SMS notifications for urgent updates</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" checked={notifications.weeklySummary} onChange={() => handleNotificationChange("weeklySummary")} />
                <span>Weekly sales summary</span>
              </label>
            </div>
          </div>

          {/* Security Settings */}
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
            <h2>Security</h2>
            <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <button
                type="button"
                onClick={handleChangePassword}
                style={{ padding: '10px 20px', background: '#ff9800', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: 'fit-content' }}
              >
                Change Password
              </button>
              <button
                type="button"
                onClick={handleEnable2FA}
                style={{ padding: '10px 20px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: 'fit-content' }}
              >
                Enable Two-Factor Authentication
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}