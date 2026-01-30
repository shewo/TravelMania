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

    // Normal Register
    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole() == null ? "TRAVELER" : request.getRole())
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    // Normal Login
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    // 🔥 GOOGLE LOGIN LOGIC 🔥
    public AuthenticationResponse googleLogin(GoogleLoginRequest request) {
        // 1. Email එකෙන් User ඉන්නවද බලනවා
        var user = repository.findByEmail(request.getEmail())
                .orElseGet(() -> {
                    // 2. User නැත්නම් අලුතින් හදනවා
                    var newUser = User.builder()
                            .name(request.getName())
                            .email(request.getEmail())
                            // Google අයගේ password එක අපි දන්නේ නෑ, ඒ නිසා Random එකක් දානවා (Login වෙන්න බෑ මේකෙන්, Google විතරයි)
                            .password(passwordEncoder.encode(UUID.randomUUID().toString()))
                            .role("TRAVELER")
                            .build();
                    return repository.save(newUser);
                });

        // 3. Token එක හදලා යවනවා
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}