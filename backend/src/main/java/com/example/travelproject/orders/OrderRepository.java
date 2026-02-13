package com.example.travelproject.orders;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List; // List එක import කරන්න ඕන

public interface OrderRepository extends JpaRepository<Order, Long> {

    // 👇 මේක තමයි අලුතෙන් එකතු කළේ.
    // Database එකෙන් Email එකට අදාළ Orders හොයන Method එක.
    List<Order> findByCustomerEmail(String customerEmail);
}