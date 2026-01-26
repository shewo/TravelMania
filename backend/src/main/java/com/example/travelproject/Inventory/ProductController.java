package com.example.travelproject.Inventory;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/products")// Main URL: http://localhost:8080/api/products
@CrossOrigin(origins = "*") // get permission on frontend
public class ProductController {


        // inject the service
        private  final ProductService productService;
        public ProductController(ProductService productService) {
            this.productService = productService;
        }

        //add new item
        @PostMapping("/add")
        public ResponseEntity<Product> addProduct(@RequestBody Product product) {
            try { // use try catch becouse unshure
                Product newProduct = productService.addProduct(product);
                return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
            }catch (RuntimeException e){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }

        // See all products
        @GetMapping("/all")
        public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }
    // 3. Get by Shop
    @GetMapping("/shop/{shopId}")
    public List<Product> getProductsByShop(@PathVariable Long shopId) {
        return productService.getProductsByShop(shopId);
    }
    // 4. Get by Category (Cooking, Fishing )
    @GetMapping("/category/{categoryName}")
    public List<Product> getProductsByCategory(@PathVariable String categoryName) {
        return productService.getProductsByCategory(categoryName);
    }

    @PutMapping("/stock/{id}")
    public ResponseEntity<?> updateStock(@PathVariable Long id, @RequestParam int qty) {
        try {
            Product updatedProduct = productService.updateStock(id, qty);
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } catch (RuntimeException e) {
            // "Not enough stock" වගේ මැසේජ් එක යවන්න
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // 6. Update Product Details
    @PutMapping("/update/{id}")
    public ResponseEntity<Product> updateProductDetails(@PathVariable Long id, @RequestBody Product product) {
        try {
            return new ResponseEntity<>(productService.updateProductDetails(id, product), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }


    }
    // 7. Delete Product
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting product", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
