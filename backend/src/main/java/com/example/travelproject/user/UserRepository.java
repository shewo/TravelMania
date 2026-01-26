package com.example.travelproject.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Finds a user by email (Critical for Login)
    Optional<User> findByEmail(String email);

    // Checks if email exists (Critical for Registration)
    Boolean existsByEmail(String email);
}