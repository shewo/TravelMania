package com.example.travelproject.orders;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "shop_id")
    private Long shopId; // Keeping the shopId connection!

    private String customerName;
    private String customerEmail;
    private String address;

    private LocalDate orderDate = LocalDate.now();

    private Double totalAmount;

    // 👇 NEW: Default status is "ACTIVE" when a new order is placed
    private String status = "ACTIVE";

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "order_id")
    private List<OrderItem> items;
}