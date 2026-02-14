package com.example.travelproject.orders;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(@RequestBody OrderRequest orderRequest) {
        Order newOrder = orderService.placeOrder(orderRequest);
        return ResponseEntity.ok(newOrder);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Order>> getUserOrders(@RequestParam("email") String email) {
        return ResponseEntity.ok(orderService.getOrdersByEmail(email));
    }

    // 👇 Endpoint for the Seller Dashboard to get their specific orders
    @GetMapping("/shop/{shopId}")
    public ResponseEntity<List<Order>> getShopOrders(@PathVariable Long shopId) {
        return ResponseEntity.ok(orderService.getOrdersByShopId(shopId));
    }

    // 👇 NEW: Endpoint to change the status from React
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long id,
            @RequestParam("status") String status) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }
}