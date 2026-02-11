package com.example.travelproject.orders;

// වැරදි Imports අයින් කළා. දැන් තියෙන්න ඕන මේ Spring Framework imports ටික විතරයි.
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(@RequestBody OrderRequest orderRequest) {
        // OrderService එක එකම පැකේජ් එකේ නිසා කෙලින්ම පාවිච්චි කරන්න පුළුවන්
        Order newOrder = orderService.placeOrder(orderRequest);
        return ResponseEntity.ok(newOrder);
    }
}