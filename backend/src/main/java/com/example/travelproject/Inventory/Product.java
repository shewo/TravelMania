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

    // Database එකේ column name එක 'shop_id' නිසා name එක දුන්නා
    @Column(name = "shopId")
    private Long shopId;

    @Column(name = "productName", nullable = false)
    private String productName;

    @Column(name = "productDescription", length = 5000)
    private String productDescription;

    private String category;

    private Double price;



    private Integer available;

    @Column(name = "imageUrl")
    private String imageUrl;

    @Column(name = "mobileNumber", length = 10)
    private String mobileNumber;
}