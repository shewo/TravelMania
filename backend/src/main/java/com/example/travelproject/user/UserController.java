package com.example.travelproject.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Frontend (React) සදහා
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 🔥 වැදගත්: Login, Register, Google Login දැන් තියෙන්නේ AuthenticationController එකේ.
    // මෙතන තියෙන්නේ Token එක අරගෙන ඇතුලට ආපු අයට User Data බලන්න විතරයි.

    // 1. GET ALL Endpoint (Admin වැඩ වලට)
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // 2. User ID එකෙන් විස්තර ගන්න (Profile Page එකට වගේ)
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }
}