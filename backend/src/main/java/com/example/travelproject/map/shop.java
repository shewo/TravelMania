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
public class shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String contactNo;


    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;


    @OneToMany(mappedBy = "shop", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<Product> products;


    @JsonIgnore
    @Column(columnDefinition = "geometry(Point, 4326)")
    private Point location;

    // Latitude & Longitude
    public double getLatitude() {
        return (this.location != null) ? this.location.getY() : 0.0;
    }

    public double getLongitude() {
        return (this.location != null) ? this.location.getX() : 0.0;
    }
}