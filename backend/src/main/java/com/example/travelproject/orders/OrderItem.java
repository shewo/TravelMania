package com.example.travelproject.orders;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName; // Tent, Boat, Gas Cooker
    private int quantity;       // 1, 2, 5
    private Double price;       // price of item
}