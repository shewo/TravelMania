import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import "../styles/dashboard.css";

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
  const [shopId, setShopId] = useState(null);

  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    productName: "", productDescription: "", price: "", available: "",
    imageUrl: "", rentalCondition: "", minDuration: "", cleaningFee: ""
  });
  
  const [formData, setFormData] = useState({
    productName: "", productDescription: "", category: "", price: "",
    available: "", imageUrl: "", rentalCondition: "", minDuration: "", cleaningFee: ""
  });

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('travelUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.shopId) setShopId(user.shopId);
      }
    } catch (error) {
      console.error("Error loading shop ID:", error);
    }
  }, []);

  const fetchProducts = async (categoryName) => {
    setLoading(true);
    try {
      let response;
      let currentShopId = shopId;
      if (!currentShopId) {
        const storedUser = localStorage.getItem('travelUser');
        if (storedUser) {
          try {
            const user = JSON.parse(storedUser);
            if (user.shopId) {
              currentShopId = user.shopId;
              setShopId(user.shopId);
            }
          } catch (error) {}
        }
      }

      if (currentShopId) {
        response = await axios.get(`http://localhost:8080/api/products/shop/${currentShopId}/category`, { params: { categoryName } });
      } else {
        response = await axios.get(`http://localhost:8080/api/products/category`, { params: { categoryName } });
      }
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
    setFormData(prev => ({ ...prev, category: category.name }));
  };

  // 👇 NEW: Bulletproof check to open the list from Dashboard
  useEffect(() => {
    const savedCat = localStorage.getItem("tm-open-category");
    if (savedCat) {
      const categoryToOpen = JSON.parse(savedCat);
      handleEditListing(categoryToOpen);
      // Immediately delete it so it doesn't open again on normal refresh
      localStorage.removeItem("tm-open-category"); 
    }
  }, []); // Runs once when page loads


  const handleBack = () => {
    setView("categories");
    setSelectedCategory(null);
    setProducts([]);
    setFormData(prev => ({ ...prev, category: "" }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!formData.productName || !formData.productDescription) return;
    if (!shopId) return;

    try {
      const productData = {
        shopId: shopId,
        productName: formData.productName.trim(),
        productDescription: formData.productDescription.trim(),
        category: selectedCategory?.name || formData.category,
        price: parseFloat(formData.price),
        available: parseInt(formData.available),
        imageUrl: formData.imageUrl?.trim() || null,
        rentalCondition: formData.rentalCondition || null, 
        minDuration: formData.minDuration ? parseInt(formData.minDuration) : null,
        cleaningFee: formData.cleaningFee ? parseFloat(formData.cleaningFee) : 0
      };

      const response = await axios.post('http://localhost:8080/api/products/add', productData);
      
      if (response.status === 201 || response.status === 200) {
        alert("Product added successfully!");
        setShowAddForm(false);
        setFormData({
          productName: "", productDescription: "", category: selectedCategory ? selectedCategory.name : "",
          price: "", available: "", imageUrl: "", rentalCondition: "", minDuration: "", cleaningFee: ""
        });
        if (selectedCategory) fetchProducts(selectedCategory.name);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/products/delete/${productId}`);
      alert("Product deleted successfully!");
      if (selectedCategory) fetchProducts(selectedCategory.name);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setEditFormData({
      productName: product.productName || "", productDescription: product.productDescription || "",
      price: product.price || "", available: product.available || "", imageUrl: product.imageUrl || "",
      rentalCondition: product.rentalCondition || "", minDuration: product.minDuration || "", cleaningFee: product.cleaningFee || ""
    });
    setShowEditForm(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const updatedData = {
        productName: editFormData.productName.trim(), productDescription: editFormData.productDescription.trim(),
        price: parseFloat(editFormData.price), available: parseInt(editFormData.available),
        imageUrl: editFormData.imageUrl?.trim() || null, rentalCondition: editFormData.rentalCondition || null,
        minDuration: editFormData.minDuration ? parseInt(editFormData.minDuration) : null,
        cleaningFee: editFormData.cleaningFee ? parseFloat(editFormData.cleaningFee) : 0
      };

      const response = await axios.put(`http://localhost:8080/api/products/update/${editingProduct.id}`, updatedData);

      if (response.status === 200) {
        alert("Product updated successfully!");
        setShowEditForm(false);
        setEditingProduct(null);
        if (selectedCategory) fetchProducts(selectedCategory.name);
      }
    } catch (error) {
      console.error("Error updating product:", error);
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
                onClick={() => setShowAddForm(true)}
                style={{
                  padding: "10px 20px", background: "#4a90e2", color: "white",
                  border: "none", borderRadius: "5px", cursor: "pointer",
                  marginLeft: "auto", fontWeight: "600"
                }}
              >
                + Add Product
              </button>
            </div>

            {/* ========== ADD PRODUCT MODAL ========== */}
            {showAddForm && (
              <div style={{
                position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                background: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
              }}>
                <div style={{
                  background: "linear-gradient(145deg, rgba(20, 20, 20, 0.95), rgba(10, 10, 10, 0.98))",
                  padding: "30px", borderRadius: "16px", width: "90%", maxWidth: "600px", maxHeight: "90vh",
                  overflowY: "auto", border: "1px solid rgba(212, 175, 55, 0.3)", boxShadow: "0 8px 32px rgba(212, 175, 55, 0.2)"
                }}>
                  <h2 style={{ color: "#f5d07a", marginBottom: "20px" }}>Add New Product</h2>
                  
                  <form onSubmit={handleAddProduct}>
                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Product Name *</label>
                      <input type="text" name="productName" value={formData.productName} onChange={handleInputChange} required style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "5px", color: "white" }} />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Description *</label>
                      <textarea name="productDescription" value={formData.productDescription} onChange={handleInputChange} required rows="4" style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "5px", color: "white", resize: "vertical" }} />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Category *</label>
                      <select name="category" value={selectedCategory?.name || formData.category} onChange={handleInputChange} disabled={!!selectedCategory} required style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "5px", color: "white" }}>
                        <option value="" style={{color: "black"}}>Select Category</option>
                        {CATEGORIES.map((cat) => (
                            <option key={cat.name} value={cat.name} style={{color: "black"}}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                      <div>
                        <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Price (Rs.) *</label>
                        <input type="number" name="price" value={formData.price} onChange={handleInputChange} required step="0.01" min="0" style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "5px", color: "white" }} />
                      </div>

                      <div>
                        <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Available Qty *</label>
                        <input type="number" name="available" value={formData.available} onChange={handleInputChange} required min="0" style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "5px", color: "white" }} />
                      </div>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Image URL</label>
                      <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="https://example.com/image.jpg" style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "5px", color: "white" }} />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                      <div>
                        <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Rental Condition</label>
                        <select name="rentalCondition" value={formData.rentalCondition} onChange={handleInputChange} style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "5px", color: "white" }}>
                            <option value="" style={{color: "black"}}>Select Condition</option>
                            <option value="GRADE_A" style={{color: "black"}}>Grade A (New)</option>
                            <option value="GRADE_B" style={{color: "black"}}>Grade B (Good)</option>
                            <option value="GRADE_C" style={{color: "black"}}>Grade C (Fair)</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Min. Duration (Days)</label>
                        <input type="number" name="minDuration" value={formData.minDuration} onChange={handleInputChange} placeholder="2" min="1" style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "5px", color: "white" }} />
                      </div>
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Cleaning Fee (Rs.)</label>
                      <input type="number" name="cleaningFee" value={formData.cleaningFee} onChange={handleInputChange} placeholder="0.00" min="0" step="0.01" style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "5px", color: "white" }} />
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button type="submit" style={{ flex: 1, padding: "12px", background: "linear-gradient(135deg, #d4af37 0%, #f5d07a 100%)", color: "#0a0a0a", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer", fontSize: "16px" }}>Add Product</button>
                      <button type="button" onClick={() => setShowAddForm(false)} style={{ flex: 1, padding: "12px", background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", fontWeight: "600", cursor: "pointer", fontSize: "16px" }}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ========== EDIT PRODUCT MODAL ========== */}
            {showEditForm && editingProduct && (
              <div style={{
                position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                background: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
              }}>
                <div style={{
                  background: "linear-gradient(145deg, rgba(20, 20, 20, 0.95), rgba(10, 10, 10, 0.98))",
                  padding: "30px", borderRadius: "16px", width: "90%", maxWidth: "600px", maxHeight: "90vh",
                  overflowY: "auto", border: "1px solid rgba(212, 175, 55, 0.3)", boxShadow: "0 8px 32px rgba(212, 175, 55, 0.2)"
                }}>
                  <h2 style={{ color: "#f5d07a", marginBottom: "20px" }}>Edit Product</h2>
                  
                  <form onSubmit={handleUpdateProduct}>
                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Product Name *</label>
                      <input type="text" name="productName" value={editFormData.productName} onChange={handleEditInputChange} required style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "5px", color: "white" }} />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Description *</label>
                      <textarea name="productDescription" value={editFormData.productDescription} onChange={handleEditInputChange} required rows="4" style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "5px", color: "white", resize: "vertical" }} />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                      <div>
                        <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Price (Rs.) *</label>
                        <input type="number" name="price" value={editFormData.price} onChange={handleEditInputChange} required step="0.01" min="0" style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "5px", color: "white" }} />
                      </div>

                      <div>
                        <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Available Qty *</label>
                        <input type="number" name="available" value={editFormData.available} onChange={handleEditInputChange} required min="0" style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "5px", color: "white" }} />
                      </div>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Image URL</label>
                      <input type="text" name="imageUrl" value={editFormData.imageUrl} onChange={handleEditInputChange} placeholder="https://example.com/image.jpg" style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "5px", color: "white" }} />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                      <div>
                        <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Rental Condition</label>
                        <select name="rentalCondition" value={editFormData.rentalCondition} onChange={handleEditInputChange} style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "5px", color: "white" }}>
                            <option value="" style={{color: "black"}}>Select Condition</option>
                            <option value="GRADE_A" style={{color: "black"}}>Grade A (New)</option>
                            <option value="GRADE_B" style={{color: "black"}}>Grade B (Good)</option>
                            <option value="GRADE_C" style={{color: "black"}}>Grade C (Fair)</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Min. Duration (Days)</label>
                        <input type="number" name="minDuration" value={editFormData.minDuration} onChange={handleEditInputChange} placeholder="2" min="1" style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "5px", color: "white" }} />
                      </div>
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "5px", color: "#f5d07a" }}>Cleaning Fee (Rs.)</label>
                      <input type="number" name="cleaningFee" value={editFormData.cleaningFee} onChange={handleEditInputChange} placeholder="0.00" min="0" step="0.01" style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "5px", color: "white" }} />
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button type="submit" style={{ flex: 1, padding: "12px", background: "linear-gradient(135deg, #d4af37 0%, #f5d07a 100%)", color: "#0a0a0a", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer", fontSize: "16px" }}>Update Product</button>
                      <button type="button" onClick={() => { setShowEditForm(false); setEditingProduct(null); }} style={{ flex: 1, padding: "12px", background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", fontWeight: "600", cursor: "pointer", fontSize: "16px" }}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ========== PRODUCT LIST ========== */}
            <div className="inventory">
              {loading ? (
                <p style={{ color: "white", textAlign: "center", padding: "20px" }}>Loading products...</p>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="inventory-item">
                    <span>{product.productName}</span>
                    <div>
                      <span style={{ marginRight: "15px", color: "#f5d07a" }}>Rs.{product.price}</span>
                      <button onClick={() => handleEditProduct(product)}>Edit</button>
                      <button onClick={() => handleDeleteProduct(product.id)} style={{ background: "#ff6b6b", color: "white" }}>Delete</button>
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