package com.example.travelproject.orders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;


    private final String SELLER_EMAIL = "admin@travelmania.com";

    public void sendOrderConfirmation(Order order) {


        StringBuilder itemsList = new StringBuilder();
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                itemsList.append("- ")
                        .append(item.getProductName())
                        .append(" (Qty: ").append(item.getQuantity()).append(")")
                        .append(" : LKR ").append(item.getPrice())
                        .append("\n");
            }
        }

        // Email Body
        String orderDetails = "Order ID: " + order.getId() + "\n" +
                "Total Amount: LKR " + order.getTotalAmount() + "\n\n" +
                "Items Ordered:\n" + itemsList.toString();

        // --- BUYER Email ---
        sendEmail(
                order.getCustomerEmail(),
                "Travel Mania - Order Confirmation",
                "Hi " + order.getCustomerName() + ",\n\n" +
                        "Thank you for your order! We have received your request.\n\n" +
                        orderDetails +
                        "\nYour Address: " + order.getAddress()
        );

        // --- SELLER Email ---
        sendEmail(
                SELLER_EMAIL,
                "New Order Received! (ID: " + order.getId() + ")",
                "You have a new order from " + order.getCustomerName() + ".\n\n" +
                        orderDetails +
                        "\nCustomer Email: " + order.getCustomerEmail()
        );
    }

    private void sendEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            // message.setFrom("Travel Mania <noreply@travelmania.com>"); // Optional

            mailSender.send(message);
            System.out.println("Email sent successfully to: " + to);

        } catch (Exception e) {
            System.err.println("Failed to send email to " + to + ": " + e.getMessage());
        }
    }
}