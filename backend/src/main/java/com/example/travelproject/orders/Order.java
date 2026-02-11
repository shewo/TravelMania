package com.example.travelproject.orders;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String customerEmail;
    private String address;
    private LocalDate orderDate;
    private Double totalAmount;

    // එක Order එකක Items ගොඩක් තියෙනවා
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private List<OrderItem> items;
}