package com.example.travelproject.orders; // ඔයාගේ Folder එකේ නම

import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

// මෙතනට Order, OrderItem, OrderRepository වගේ imports ඕන නෑ.
// මොකද ඒවා තියෙන්නේ මේ file එක තියෙන folder එකේමයි.

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order placeOrder(OrderRequest request) {
        Order order = new Order();
        // Request එකෙන් එන දත්ත Order එකට දාගන්නවා
        order.setCustomerName(request.getCustomerName());
        order.setCustomerEmail(request.getCustomerEmail());
        order.setAddress(request.getAddress());
        order.setTotalAmount(request.getTotalAmount());
        order.setOrderDate(LocalDate.now());

        List<OrderItem> orderItems = new ArrayList<>();

        // Cart එකේ තිබුන Items ටික Order Items වලට හරවනවා
        // මෙතන 'OrderRequest.OrderItemRequest' කියල ගත්තේ අපි DTO එකේ Inner Class එකක් විදියට ඒක හදපු නිසා
        if (request.getItems() != null) {
            for (OrderRequest.OrderItemRequest itemRequest : request.getItems()) {
                OrderItem item = new OrderItem();
                item.setProductName(itemRequest.getProductName());
                item.setQuantity(itemRequest.getQuantity());
                item.setPrice(itemRequest.getPrice());
                orderItems.add(item);
            }
        }

        order.setItems(orderItems);

        // Database එකේ Save කරනවා
        return orderRepository.save(order);
    }
}