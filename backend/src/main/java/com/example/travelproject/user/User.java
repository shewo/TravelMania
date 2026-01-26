package com.example.travelproject.user;

import jakarta.persistence.*;
import lombok.Data; // Lombok generates Getters/Setters automatically

@Entity
@Data
@Table(name = "app_user") // Renamed because "user" is a reserved SQL word
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email; // Used for Login

    @Column(nullable = false)
    private String password; // In a real app, this should be encrypted!

    private String role; // e.g., "SELLER" or "TRAVELER"
}