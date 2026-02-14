package com.example.travelproject.orders;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByCustomerEmail(String customerEmail);

    // 👇 Fetch orders for a specific seller's shop
    List<Order> findByShopId(Long shopId);
}