package com.example.travelproject.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. CORS Configuration
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // 2. CSRF Disable (POST requests වැඩ කරන්න මේක ඕනේ)
                .csrf(csrf -> csrf.disable())

                // 3. Request Authorization
                .authorizeHttpRequests(auth -> auth
                        // Login and Register
                        .requestMatchers("/api/auth/**").permitAll()

                        // Shops
                        .requestMatchers("/api/shops/**").permitAll()

                        // Products
                        .requestMatchers("/api/products/**").permitAll()

                        // Users
                        .requestMatchers("/api/users/**").permitAll()

                        // Sellers
                        .requestMatchers("/api/seller/**").permitAll()

                        // ✅ ORDERS - මේක නැති නිසයි කලින් 403 Error එක ආවේ
                        .requestMatchers("/api/orders/**").permitAll()

                        // අනිත් හැම එකකටම Authentication ඕනේ
                        .anyRequest().authenticated()
                )
                // 4. Session Management (JWT පාවිච්චි කරන නිසා Stateless තියන්න)
                .sessionManagement(sess -> sess
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                // 5. JWT Filter එක ඇතුළත් කරනවා
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // React Ports (5173 and 5174) වලට අවසර දෙනවා
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:5174"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}