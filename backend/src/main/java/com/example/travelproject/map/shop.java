package com.example.travelproject.map;

import com.example.travelproject.Inventory.Product;
import com.example.travelproject.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.locationtech.jts.geom.Point;

import java.util.List;

@Entity
@Data
@Table(name = "shop")
public class shop { // Class Name එක Capital S ලෙස වෙනස් කළා

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String contactNo;

    // --- User Relationship (One-to-One) ---
    // Shop එක Load කරනකොට අදාල User විස්තරත් පෙනෙයි
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    // --- Product Relationship (One-to-Many) ---
    // Shop එක Load කරනකොට ඒකේ තියෙන Products ටිකත් පෙනෙයි
    @OneToMany(mappedBy = "shop", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude // Error වළක්වා ගැනීමට toString එකෙන් අයින් කරන ලදී
    private List<Product> products;

    // --- Location Handling ---
    // Geo-Location Data (Point object) JSON එකට යවන එක නවත්වනවා
    @JsonIgnore
    @Column(columnDefinition = "geometry(Point, 4326)")
    private Point location;

    // Latitude & Longitude වෙනම එළියට ගන්නවා
    public double getLatitude() {
        return (this.location != null) ? this.location.getY() : 0.0;
    }

    public double getLongitude() {
        return (this.location != null) ? this.location.getX() : 0.0;
    }
}