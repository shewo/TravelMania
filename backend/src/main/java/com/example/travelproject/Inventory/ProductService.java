package com.example.travelproject.Inventory;


import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;

    }
    //add products
    public Product addProduct(Product product) {
        if (product.getPrice() <= 0) {
            throw new RuntimeException("Price cannot be negative!");
        }
        return productRepository.save(product);
    }

    //category logic, Filter by Cooking, Fishing etc
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findAllByCategory(category);
    }

    //Stock Update Logic (Inventory Management)
    public Product updateStock(Long productId , int quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found!"));
        int newStock = product.getAvailable() + quantity;

        // 3. Logic: STOCK CANT be < 0
        if (newStock < 0) {
            throw new RuntimeException("Not enough stock! You can't sell what you don't have.");
        }
        // save new products
        product.setAvailable(newStock);
        return productRepository.save(product);

    }

    // get items in the shop
    public List<Product> getProductsByShop(Long shopId) {
        return productRepository.findAllByShopId(shopId);
    }

    // 1. Delete Product Logic
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
    // 2. Edit Product Details
    public Product updateProductDetails(Long id, Product newDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found!"));

        product.setProductName(newDetails.getProductName());
        product.setPrice(newDetails.getPrice());
        product.setProductDescription(newDetails.getProductDescription());
        product.setImageUrl(newDetails.getImageUrl());

        return productRepository.save(product);
    }

    // 3. Get All Products Logic
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

}
