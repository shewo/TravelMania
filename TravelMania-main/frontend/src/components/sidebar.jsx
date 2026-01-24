import { Link, useLocation } from "react-router-dom";
import "../styles/dashboard.css";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "My Listings", path: "/listings" },
    { name: "Rentals", path: "/rentals" },
    { name: "Sales History", path: "/sales" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" },
    { name: "Support", path: "/support" },
  ];

  return (
    <div className="sidebar">
      <h2 className="logo">Seller</h2>

      <ul className="menu">
        {menuItems.map((item) => (
          <li key={item.path} className={location.pathname === item.path ? "active" : ""}>
            <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              {item.name}
            </Link>
          </li>
        ))}
        <li className="logout">Logout</li>
      </ul>
    </div>
  );
}
