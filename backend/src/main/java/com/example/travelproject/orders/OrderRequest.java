package com.example.travelproject.orders;

import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {
    private String customerName;
    private String customerEmail;
    private String address;
    private Double totalAmount;
    private List<OrderItemRequest> items;

    // Inner class for items inside the request
    @Data
    public static class OrderItemRequest {
        private String productName;
        private int quantity;
        private Double price;
    }
}