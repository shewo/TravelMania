package com.example.travelproject.Inventory;

import com.example.travelproject.map.shop; // Import the shop class
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "inventory")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- Relationship Mapping ---

    /**
     * Many-to-One relationship with Shop.
     * We removed 'Long shopId' and replaced it with the 'shop' object.
     * @JoinColumn(name = "shop_id") creates the foreign key column in the database.
     * @JsonIgnore prevents infinite loops when fetching products.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id", nullable = false)
    @JsonIgnore
    private shop shop;

    // --- Product Details ---

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "product_description", length = 5000)
    private String productDescription;

    @Column(name = "category")
    private String category;

    @Column(name = "price")
    private Double price;

    @Column(name = "available")
    private Integer available;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "rental_condition")
    private String rentalCondition;

    @Column(name = "min_duration")
    private Integer minDuration;

    @Column(name = "cleaning_fee")
    private String cleaningFee;

    public void setShopId(Long shopId) {
        if (shopId != null) {
            shop s = new shop();
            s.setId(shopId); // Shop class එකේ ID එක set කරන්න
            this.shop = s;
        }
    }
}