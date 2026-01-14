import Sidebar from "../components/sidebar";
import StatCard from "../components/StatCard";
import InventoryItem from "../components/InventoryItem";
import "../styles/dashboard.css";

export default function SellerDashboard() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <h1>Welcome back, Seller</h1>
        <p className="role">Your role: SELLER</p>

        {/* Stats */}
        <div className="stats-container">
          <StatCard title="Active Listings" value="2" />
          <StatCard title="Completed Sales" value="0" />
          <StatCard title="Total Revenue" value="$0" />
        </div>

        {/* Inventory */}
        <h2>My Inventory Overview</h2>
        <div className="inventory">
          <InventoryItem name="Hiking Gear Set" />
          <InventoryItem name="Tent Rental" />
          <InventoryItem name="Backpack Sale" />
        </div>

        {/* Recent Orders */}
        <h2>Recent Orders</h2>
        <div className="recent-orders">
          <p>No recent orders</p>
        </div>
      </div>
    </div>
  );
}
