package com.example.travelproject.map;

import jakarta.persistence.*;
import lombok.Data;
import org.locationtech.jts.geom.Point;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
public class shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    // 1. Tell Jackson to IGNORE this complex object so it doesn't crash
    @JsonIgnore
    @Column(columnDefinition = "geometry(Point, 4326)")
    private Point location;

    // 2. Manually expose the Latitude (Y) as a simple number
    public double getLatitude() {
        return this.location.getY();
    }

    // 3. Manually expose the Longitude (X) as a simple number
    public double getLongitude() {
        return this.location.getX();
    }
}