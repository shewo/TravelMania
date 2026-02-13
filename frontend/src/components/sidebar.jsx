import { Link, useLocation, useNavigate } from "react-router-dom"; // ✅ FIX: Added useNavigate
import { useState, useEffect } from "react";
import "../styles/dashboard.css";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ FIX: Initialize navigate
  
  // ✅ NEW: Logout handler - clears user data and redirects to home
  const handleLogout = () => {
    localStorage.removeItem('travelUser');
    localStorage.removeItem('token');
    navigate('/');
  };

  // State to store user data
  const [user, setUser] = useState({
    name: "Seller",
    picture: null
  });

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('travelUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser({
          name: userData.name || "Seller",
          picture: userData.picture || null
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const menuItems = [
    { name: "Dashboard", path: "/Dashboard" },
    { name: "My Listings", path: "/Dashboard/listings" },
    { name: "Rentals", path: "/Dashboard/rentals" },
    { name: "Sales History", path: "/Dashboard/sales" },
    { name: "Reports", path: "/Dashboard/reports" },
    { name: "Settings", path: "/Dashboard/settings" },
    { name: "Support", path: "/Dashboard/support" },
  ];

  return (
    <div className="sidebar">
      {/* Clickable Seller Profile Section */}
      <Link to="/Sellerac" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="seller-profile-section">
          {user.picture ? (
            <img 
              src={user.picture} 
              alt={user.name} 
              className="seller-avatar"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          {!user.picture && (
            <div className="seller-avatar-placeholder">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          {user.picture && (
            <div className="seller-avatar-placeholder" style={{ display: 'none' }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <h2 className="logo">{user.name}</h2>
        </div>
      </Link>

      {/* Menu Items */}
      <ul className="menu">
        {menuItems.map((item) => (
          <li key={item.path} className={location.pathname === item.path ? "active" : ""}>
            <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              {item.name}
            </Link>
          </li>
        ))}
        {/* ✅ FIX: Added onClick={handleLogout} and cursor style */}
        <li className="logout" onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</li>
      </ul>
    </div>
  );
}