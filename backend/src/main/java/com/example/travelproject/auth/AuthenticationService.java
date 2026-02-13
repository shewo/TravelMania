package com.example.travelproject.auth;

import com.example.travelproject.config.JwtService;
import com.example.travelproject.user.User;
import com.example.travelproject.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // Helper method to build response with user data
    private AuthenticationResponse buildResponse(User user) {
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    // Normal Register
    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole() == null ? "TRAVELER" : request.getRole())
                .build();
        repository.save(user);
        return buildResponse(user);
    }

    // Normal Login
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        return buildResponse(user);
    }

    // GOOGLE LOGIN LOGIC
    public AuthenticationResponse googleLogin(GoogleLoginRequest request) {
        var user = repository.findByEmail(request.getEmail())
                .orElseGet(() -> {
                    var newUser = User.builder()
                            .name(request.getName())
                            .email(request.getEmail())
                            .password(passwordEncoder.encode(UUID.randomUUID().toString()))
                            .role("TRAVELER")
                            .build();
                    return repository.save(newUser);
                });

        return buildResponse(user);
    }
}