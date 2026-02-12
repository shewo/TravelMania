package com.example.travelproject.orders;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173") // <--- 1. මෙන්න මේ Port එක වෙනස් කළා
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(@RequestBody OrderRequest orderRequest) {
        // මෙතනින් OrderService එකට යවනවා.
        // Database Save + Email යවන වැඩ දෙකම වෙන්නේ Service එක ඇතුලේ.
        Order newOrder = orderService.placeOrder(orderRequest);
        return ResponseEntity.ok(newOrder);
    }
}