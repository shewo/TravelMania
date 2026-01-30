package com.example.travelproject.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    // Login Logic අයින් කළා (දැන් AuthenticationService එකේ තියෙන්නේ)

    // Data ගන්න Method විතරයි මෙතන ඉතුරු වෙන්නේ
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}