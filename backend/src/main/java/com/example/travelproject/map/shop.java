package com.example.travelproject.map;

import com.example.travelproject.Inventory.Product; // Import the Product class
import com.example.travelproject.user.User;
import jakarta.persistence.*;
import lombok.Data;
import org.locationtech.jts.geom.Point;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List; // Import List

@Entity
@Data
@Table(name = "shop")
public class shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String contactNo;

    // --- User Relationship (One-to-One) ---
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    // --- Product Relationship (One-to-Many) ---

    /**
     * One-to-Many relationship with Product.
     * 'mappedBy = "shop"' refers to the 'shop' field in the Product class.
     * cascade = CascadeType.ALL ensures that if a shop is deleted, its products are also deleted.
     */
    @OneToMany(mappedBy = "shop", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Product> products;

    // --- Location Handling ---

    @JsonIgnore
    @Column(columnDefinition = "geometry(Point, 4326)")
    private Point location;

    public double getLatitude() {
        return (this.location != null) ? this.location.getY() : 0.0;
    }

    public double getLongitude() {
        return (this.location != null) ? this.location.getX() : 0.0;
    }
}