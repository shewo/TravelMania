package com.example.travelproject.Inventory;

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

    @Column(name = "shop_id")
    private Long shopId;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "product_description", length = 5000)
    private String productDescription;

    private String category;

    private Double price;

    private Integer available;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "rental_condition")
    private String rentalCondition;

    @Column(name = "min_duration")
    private Integer minDuration;

    @Column(name = "cleaning_fee")
    private String cleaningFee;
}