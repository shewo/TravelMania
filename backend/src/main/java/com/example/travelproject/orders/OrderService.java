package com.example.travelproject.orders;

import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final EmailService emailService;

    public OrderService(OrderRepository orderRepository, EmailService emailService) {
        this.orderRepository = orderRepository;
        this.emailService = emailService;
    }

    public Order placeOrder(OrderRequest request) {
        Order order = new Order();

        order.setShopId(request.getShopId()); // 👈 Save shopId to the DB
        order.setCustomerName(request.getCustomerName());
        order.setCustomerEmail(request.getCustomerEmail());
        order.setAddress(request.getAddress());
        order.setTotalAmount(request.getTotalAmount());
        order.setOrderDate(LocalDate.now());

        List<OrderItem> orderItems = new ArrayList<>();

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

        Order savedOrder = orderRepository.save(order);
        System.out.println("✅ Order Saved to Database! ID: " + savedOrder.getId());

        try {
            emailService.sendOrderConfirmation(savedOrder);
            System.out.println("📧 Email sent to: " + savedOrder.getCustomerEmail());
        } catch (Exception e) {
            System.err.println("❌ Order saved, but failed to send email: " + e.getMessage());
        }

        return savedOrder;
    }

    public List<Order> getOrdersByEmail(String email) {
        return orderRepository.findByCustomerEmail(email);
    }

    // 👇 Get orders by Seller's Shop ID
    public List<Order> getOrdersByShopId(Long shopId) {
        return orderRepository.findByShopId(shopId);
    }

    // 👇 NEW: Method to update order status
    public Order updateOrderStatus(Long orderId, String newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        order.setStatus(newStatus);
        return orderRepository.save(order);
    }
}