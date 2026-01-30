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

    // : Login, Register, Google Login now store in AuthenticationController
    //  Token  User Data

    // 1. GET ALL Endpoint (Admin වැඩ වලට)
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // 2. get details using User ID  (like Profile Page )
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }
}