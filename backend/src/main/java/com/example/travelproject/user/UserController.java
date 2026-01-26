package com.example.travelproject.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Frontend (React) walata access denawa
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository; // Google Login search eka sadaha kelinma Repository eka gannawa

    // 1. REGISTER Endpoint
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            // Role eka nathi nam default "TRAVELER" danawa
            if (user.getRole() == null || user.getRole().isEmpty()) {
                user.setRole("TRAVELER");
            }
            User newUser = userService.registerUser(user);
            return ResponseEntity.ok(newUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 2. LOGIN Endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginData) {
        User user = userService.loginUser(loginData.getEmail(), loginData.getPassword());

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).body("Invalid Email or Password");
        }
    }

    // 3. GOOGLE LOGIN Endpoint (ALUTH EKA) 🔥
    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String name = payload.get("name");

        try {
            // 1. Repository eka haraha balanawa me email eka already thiyanawada kiyala
            Optional<User> existingUser = userRepository.findByEmail(email);

            if (existingUser.isPresent()) {
                // User innawa nam -> Login Success (User object eka yawanawa)
                return ResponseEntity.ok(existingUser.get());
            } else {
                // User na nam -> Aluthen Register karanawa
                User newUser = new User();
                newUser.setEmail(email);
                newUser.setName(name);
                newUser.setPassword(""); // Google userslata password na
                newUser.setRole("TRAVELER"); // Default role

                // Repository eken kelinma save karanawa (Service eke registerUser use karoth 'exists' error eka enna puluwan nisa)
                User savedUser = userRepository.save(newUser);
                return ResponseEntity.ok(savedUser);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Google Login Failed: " + e.getMessage());
        }
    }

    // 4. GET ALL Endpoint
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}