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
  const [view, setView] = useState("categories");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    category: "",
    price: "",
    available: "",
    imageUrl: "",
    rentalCondition: "",
    minDuration: "",
    cleaningFee: "",
    shopId: 1 // You should get this from logged-in user context
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    try {
      const productData = {
        shopId: formData.shopId,
        productName: formData.productName,
        productDescription: formData.productDescription,
        category: selectedCategory?.name || formData.category,
        price: parseFloat(formData.price),
        available: parseInt(formData.available),
        imageUrl: formData.imageUrl,
        rentalCondition: formData.rentalCondition,
        minDuration: parseInt(formData.minDuration),
        cleaningFee: formData.cleaningFee
      };

      const response = await axios.post('http://localhost:8080/api/products/add', productData);
      
      if (response.status === 201) {
        alert("Product added successfully!");
        setShowAddForm(false);
        // Reset form
        setFormData({
          productName: "",
          productDescription: "",
          category: "",
          price: "",
          available: "",
          imageUrl: "",
          rentalCondition: "",
          minDuration: "",
          cleaningFee: "",
          shopId: 1
        });
        // Refresh products list
        if (selectedCategory) {
          fetchProducts(selectedCategory.name);
        }
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
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
            <div className="filters" style={{ marginBottom: "20px" }}>
              <button className="filter-btn active">All</button>
              <button className="filter-btn">Active</button>
              <button className="filter-btn">Inactive</button>
              <button className="filter-btn">Draft</button>
            </div>

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
                onClick={() => setShowAddForm(true)}
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

            {/* Add Product Form Modal */}
            {showAddForm && (
              <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.7)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000
              }}>
                <div style={{
                  background: "linear-gradient(145deg, rgba(20, 20, 20, 0.95), rgba(10, 10, 10, 0.98))",
                  padding: "30px",
                  borderRadius: "16px",
                  width: "90%",
                  maxWidth: "600px",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                  boxShadow: "0 8px 32px rgba(212, 175, 55, 0.2)"
                }}>
                  <h2 style={{ color: "#f5d07a", marginBottom: "20px" }}>Add New Product</h2>
                  
                  <form onSubmit={handleAddProduct}>
                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Product Name *</label>
                      <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: "100%",
                          padding: "10px",
                          background: "rgba(255,255,255,0.1)",
                          border: "1px solid rgba(212, 175, 55, 0.3)",
                          borderRadius: "5px",
                          color: "white"
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Description *</label>
                      <textarea
                        name="productDescription"
                        value={formData.productDescription}
                        onChange={handleInputChange}
                        required
                        rows="4"
                        style={{
                          width: "100%",
                          padding: "10px",
                          background: "rgba(255,255,255,0.1)",
                          border: "1px solid rgba(212, 175, 55, 0.3)",
                          borderRadius: "5px",
                          color: "white"
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Category</label>
                      <input
                        type="text"
                        name="category"
                        value={selectedCategory?.name || formData.category}
                        onChange={handleInputChange}
                        readOnly={!!selectedCategory}
                        style={{
                          width: "100%",
                          padding: "10px",
                          background: "rgba(255,255,255,0.1)",
                          border: "1px solid rgba(212, 175, 55, 0.3)",
                          borderRadius: "5px",
                          color: "white"
                        }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                      <div>
                        <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Price (Rs.) *</label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          required
                          step="0.01"
                          style={{
                            width: "100%",
                            padding: "10px",
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(212, 175, 55, 0.3)",
                            borderRadius: "5px",
                            color: "white"
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Available Qty *</label>
                        <input
                          type="number"
                          name="available"
                          value={formData.available}
                          onChange={handleInputChange}
                          required
                          style={{
                            width: "100%",
                            padding: "10px",
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(212, 175, 55, 0.3)",
                            borderRadius: "5px",
                            color: "white"
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Image URL</label>
                      <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                        style={{
                          width: "100%",
                          padding: "10px",
                          background: "rgba(255,255,255,0.1)",
                          border: "1px solid rgba(212, 175, 55, 0.3)",
                          borderRadius: "5px",
                          color: "white"
                        }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                      <div>
                        <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Rental Condition</label>
                        <input
                          type="text"
                          name="rentalCondition"
                          value={formData.rentalCondition}
                          onChange={handleInputChange}
                          placeholder="Grade A"
                          style={{
                            width: "100%",
                            padding: "10px",
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(212, 175, 55, 0.3)",
                            borderRadius: "5px",
                            color: "white"
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Min. Duration (Days)</label>
                        <input
                          type="number"
                          name="minDuration"
                          value={formData.minDuration}
                          onChange={handleInputChange}
                          placeholder="2"
                          style={{
                            width: "100%",
                            padding: "10px",
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(212, 175, 55, 0.3)",
                            borderRadius: "5px",
                            color: "white"
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Cleaning Fee</label>
                      <input
                        type="text"
                        name="cleaningFee"
                        value={formData.cleaningFee}
                        onChange={handleInputChange}
                        placeholder="Included"
                        style={{
                          width: "100%",
                          padding: "10px",
                          background: "rgba(255,255,255,0.1)",
                          border: "1px solid rgba(212, 175, 55, 0.3)",
                          borderRadius: "5px",
                          color: "white"
                        }}
                      />
                    </div>

                    <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                      <button
                        type="submit"
                        style={{
                          flex: 1,
                          padding: "12px",
                          background: "linear-gradient(135deg, #d4af37 0%, #f5d07a 100%)",
                          color: "#0a0a0a",
                          border: "none",
                          borderRadius: "8px",
                          fontWeight: "600",
                          cursor: "pointer"
                        }}
                      >
                        Add Product
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        style={{
                          flex: 1,
                          padding: "12px",
                          background: "rgba(255,255,255,0.1)",
                          color: "white",
                          border: "1px solid rgba(255,255,255,0.2)",
                          borderRadius: "8px",
                          fontWeight: "600",
                          cursor: "pointer"
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="inventory">
              {loading ? (
                <p>Loading products...</p>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="inventory-item">
                    <span>{product.productName}</span>
                    <div>
                        <span style={{ marginRight: "15px", color: "#f5d07a" }}>Rs.{product.price}</span>
                        <button>Edit</button>
                        <button style={{ background: "#ff6b6b", color: "white" }}>Delete</button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: "20px", textAlign: "center", color: "#888" }}>
                  <p>No products found in this category.</p>
                  <p>Click "+ Add Product" to add your first item.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}