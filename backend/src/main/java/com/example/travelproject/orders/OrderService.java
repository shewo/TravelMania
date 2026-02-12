package com.example.travelproject.orders;

import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final EmailService emailService; // 1. Email Service එක ආයෙත් Active කළා

    // 2. Constructor එකට Email Service එක ඇතුළත් කළා
    public OrderService(OrderRepository orderRepository, EmailService emailService) {
        this.orderRepository = orderRepository;
        this.emailService = emailService;
    }

    public Order placeOrder(OrderRequest request) {
        Order order = new Order();

        // --- DATA MAPPING ---
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

        // --- SAVE AND EMAIL LOGIC ---

        // 3. Database එකේ Save කරනවා
        Order savedOrder = orderRepository.save(order);
        System.out.println("✅ Order Saved to Database! ID: " + savedOrder.getId());

        // 4. Email එක යවන කෑල්ලේ Comments අයින් කළා
        try {
            emailService.sendOrderConfirmation(savedOrder);
            System.out.println("📧 Email sent to: " + savedOrder.getCustomerEmail());
        } catch (Exception e) {
            // Email එක fail වුණත් Order එක DB එකේ තියෙන නිසා ප්‍රශ්නයක් වෙන්නේ නෑ
            System.err.println("❌ Order saved, but failed to send email: " + e.getMessage());
        }

        return savedOrder;
    }
}