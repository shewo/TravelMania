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

    // --- 1. Order Place කරන කොටස (මේක කලින් තිබ්බ එකමයි) ---
    public Order placeOrder(OrderRequest request) {
        Order order = new Order();

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

    // --- 2. 👇 අලුතෙන් එකතු කරපු කොටස (Orders Fetch කරන එක) ---
    public List<Order> getOrdersByEmail(String email) {
        return orderRepository.findByCustomerEmail(email);
    }
}