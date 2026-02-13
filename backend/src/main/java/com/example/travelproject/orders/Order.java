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

    private String customerName;
    private String customerEmail; // මේක තමයි අපිට Email යවන්න ඕන වෙන්නේ
    private String address;

    // මෙතනට = LocalDate.now(); දැම්මම Order එක save වෙන දවස auto ගන්නවා
    private LocalDate orderDate = LocalDate.now();

    private Double totalAmount;

    // ඔයා Import කරපු එක මෙතනට පාවිච්චි කරන්න
    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "order_id")
    private List<OrderItem> items;
}