package com.example.travelproject.orders;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List; // List එක import කරන්න අමතක කරන්න එපා

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // 1. Order එකක් දාන එක (මේක කලින් තිබ්බ එකමයි)
    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(@RequestBody OrderRequest orderRequest) {
        Order newOrder = orderService.placeOrder(orderRequest);
        return ResponseEntity.ok(newOrder);
    }

    // 2. 👇 මෙන්න අලුතෙන් එකතු කරපු කෑල්ල (Frontend එකට Data යවන එක)
    // URL එක: http://localhost:8080/api/orders/user?email=...
    @GetMapping("/user")
    public ResponseEntity<List<Order>> getUserOrders(@RequestParam("email") String email) {
        return ResponseEntity.ok(orderService.getOrdersByEmail(email));
    }
}