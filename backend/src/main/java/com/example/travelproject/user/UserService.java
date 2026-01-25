package com.example.travelproject.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // --- 1. REGISTER Logic ---
    public User registerUser(User user) {
        // Check if email already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email is already taken!");
        }
        return userRepository.save(user);
    }

    // --- 2. LOGIN Logic ---
    public User loginUser(String email, String password) {
        // Find user by email
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Check if passwords match
            if (user.getPassword().equals(password)) {
                return user; // Success!
            }
        }
        return null; // Failed login
    }

    // --- 3. HELPER Logic (Optional) ---
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}