const handleAddProduct = async (e) => {
  e.preventDefault();
  
  // Frontend validation
  if (!formData.productName || !formData.productDescription) {
    alert("Product Name and Description are required!");
    return;
  }

  if (!formData.price || formData.price <= 0) {
    alert("Please enter a valid price!");
    return;
  }

  if (!formData.available || formData.available < 0) {
    alert("Please enter a valid quantity!");
    return;
  }

  try {
    const productData = {
      shopId: parseInt(formData.shopId) || 1,
      productName: formData.productName.trim(),
      productDescription: formData.productDescription.trim(),
      category: selectedCategory?.name || formData.category || "Uncategorized",
      price: parseFloat(formData.price),
      available: parseInt(formData.available),
      imageUrl: formData.imageUrl?.trim() || null,
      rentalCondition: formData.rentalCondition?.trim() || null,
      minDuration: formData.minDuration ? parseInt(formData.minDuration) : null,
      cleaningFee: formData.cleaningFee?.trim() || null
    };

    console.log("Sending product data:", productData); // Debug log

    const response = await axios.post('http://localhost:8080/api/products/add', productData);
    
    console.log("Response:", response); // Debug log

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
    console.error("Full error:", error); // Debug log
    console.error("Error response:", error.response); // Debug log
    
    let errorMessage = "Failed to add product. ";
    
    if (error.response) {
      // Server responded with error
      console.error("Server error data:", error.response.data);
      errorMessage += `Server error: ${error.response.data.message || error.response.statusText}`;
    } else if (error.request) {
      // Request made but no response
      errorMessage += "No response from server. Make sure backend is running on port 8080.";
    } else {
      // Something else went wrong
      errorMessage += error.message;
    }
    
    alert(errorMessage);
  }
};