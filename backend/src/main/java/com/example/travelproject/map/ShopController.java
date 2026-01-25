package com.example.travelproject.map;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.Optional;

import java.util.List;

@RestController
@RequestMapping("/api/shops")
@CrossOrigin(origins = "*") // Allows React to talk to Spring Boot
public class ShopController {

    private final ShopRepository shopRepository;
    private final GeometryFactory geometryFactory = new GeometryFactory();

    public ShopController(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }

    @GetMapping("/nearby")
    public List<shop> getNearbyShops(@RequestParam double lat, @RequestParam double lng) {
        // 1. Create a Point from the user's lat/lng
        Point userLocation = geometryFactory.createPoint(new Coordinate(lng, lat));

        // 2. Call the database (5000 meters = 5km radius)
        return shopRepository.findShopsNearby(userLocation, 5000);
    }


    @GetMapping("/all")
    public List<shop> getAllShops() {
        return shopRepository.findAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<shop> getShopById(@PathVariable Long id) {
        // 1. Try to find the shop in the database using the ID
        Optional<shop> shopData = shopRepository.findById(id);



        // 2. Check if a shop was actually found
        if (shopData.isPresent()) {
            // If found, return the shop with a "200 OK" status
            return new ResponseEntity<>(shopData.get(), HttpStatus.OK);
        } else {
            // If NOT found, return a "404 Not Found" status
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
}
