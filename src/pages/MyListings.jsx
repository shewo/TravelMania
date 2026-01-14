import Sidebar from "../components/sidebar";
import InventoryItem from "../components/InventoryItem";
import "../styles/dashboard.css";

export default function MyListings() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <h1>My Listings</h1>
        <p className="subtitle">Manage your active and inactive listings</p>

        {/* Filters */}
        <div className="filters" style={{ marginBottom: '20px' }}>
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Active</button>
          <button className="filter-btn">Inactive</button>
          <button className="filter-btn">Draft</button>
        </div>

        {/* Add New Button */}
        <button className="add-new-btn" style={{ marginBottom: '20px', padding: '10px 20px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          + Add New Listing
        </button>

        {/* Listings Grid */}
        <div className="inventory">
          <InventoryItem name="Hiking Gear Set" />
          <InventoryItem name="Tent Rental" />
          <InventoryItem name="Backpack Sale" />
          <InventoryItem name="Camping Stove" />
          <InventoryItem name="Sleeping Bag" />
        </div>
      </div>
    </div>
  );
}
