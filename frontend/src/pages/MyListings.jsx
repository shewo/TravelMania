import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import "../styles/dashboard.css";

// Categories based on attachment
const CATEGORIES = [
  { name: "Tents & Shelter", icon: "⛺" },
  { name: "Sleeping Gear", icon: "💤" },
  { name: "Backpacks", icon: "🎒" },
  { name: "Lighting", icon: "🔦" },
  { name: "Footwear", icon: "👞" },
  { name: "Cooking", icon: "🍳" },
  { name: "Electronics", icon: "📷" },
  { name: "Safety", icon: "⛑️" }
];

export default function MyListings() {
  const [view, setView] = useState("categories"); // 'categories' or 'products'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch products when category matches
  const fetchProducts = async (categoryName) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/products/category/${categoryName}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); 
    } finally {
      setLoading(false);
    }
  };

  const handleEditListing = (category) => {
    setSelectedCategory(category);
    setView("products");
    fetchProducts(category.name);
  };

  const handleBack = () => {
    setView("categories");
    setSelectedCategory(null);
    setProducts([]);
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <h1>{view === "categories" ? "My Listings" : selectedCategory?.name}</h1>
        <p className="subtitle">
          {view === "categories"
            ? "Manage your active and inactive listings by category"
            : `Manage products in ${selectedCategory?.name}`}
        </p>

        {view === "categories" && (
          <>
            {/* Filters (kept for theme consistency) */}
            <div className="filters" style={{ marginBottom: "20px" }}>
              <button className="filter-btn active">All</button>
              <button className="filter-btn">Active</button>
              <button className="filter-btn">Inactive</button>
              <button className="filter-btn">Draft</button>
            </div>

            {/* Categories List */}
            <div className="inventory">
              {CATEGORIES.map((cat) => (
                <div key={cat.name} className="inventory-item">
                  <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "24px" }}>{cat.icon}</span>
                    {cat.name}
                  </span>
                  <div>
                    <button onClick={() => handleEditListing(cat)}>Edit Listing</button>
                    <button onClick={() => {}}>View Orders</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {view === "products" && (
          <>
            <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
              <button
                className="filter-btn"
                onClick={handleBack}
                style={{ background: "rgba(255, 255, 255, 0.1)" }}
              >
                ← Back
              </button>
              
              <button
                className="add-new-btn"
                style={{
                  padding: "10px 20px",
                  background: "#4a90e2",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginLeft: "auto"
                }}
              >
                + Add Product
              </button>
            </div>

            <div className="inventory">
              {loading ? (
                <p>Loading products...</p>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="inventory-item">
                    <span>{product.productName}</span>
                    <div>
                        <span style={{ marginRight: "15px", color: "#f5d07a" }}>${product.price}</span>
                        <button>Edit</button>
                        <button style={{ background: "#ff6b6b", color: "white" }}>Delete</button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: "20px", textAlign: "center", color: "#888" }}>
                  <p>No products found in this category.</p>
                  <p>Seller already added products will appear here.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
