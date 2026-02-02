package com.example.travelproject.map;

import lombok.Data; // 1. Import Lombok
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/shops")
@CrossOrigin(origins = "*")
public class ShopController {

    private final ShopRepository shopRepository;
    private final GeometryFactory geometryFactory = new GeometryFactory();

    public ShopController(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }

    // --- CREATE SHOP & SAVE TO DB ---
    @PostMapping("/create")
    public ResponseEntity<shop> createShop(@RequestBody ShopRequest request) {
        try {
            shop newShop = new shop();
            newShop.setName(request.getName());
            newShop.setDescription(request.getDescription());
            newShop.setContactNo(request.getContactNo()); // <--- Ensure this is here!

            // Convert Lat/Lng from JSON to Geometry Point
            Point locationPoint = geometryFactory.createPoint(new Coordinate(request.getLongitude(), request.getLatitude()));
            newShop.setLocation(locationPoint);

            // Save to Database
            shop savedShop = shopRepository.save(newShop);
            return new ResponseEntity<>(savedShop, HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // --- EXISTING ENDPOINTS ---
    @GetMapping("/nearby")
    public List<shop> getNearbyShops(@RequestParam double lat, @RequestParam double lng) {
        Point userLocation = geometryFactory.createPoint(new Coordinate(lng, lat));
        return shopRepository.findShopsNearby(userLocation, 5000);
    }

    @GetMapping("/{id}")
    public ResponseEntity<shop> getShopById(@PathVariable Long id) {
        Optional<shop> shopData = shopRepository.findById(id);
        return shopData.map(shop -> new ResponseEntity<>(shop, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // --- DTO CLASS ---
    @Data // <--- 2. Add this annotation. No manual getters/setters needed!
    public static class ShopRequest {
        private String name;
        private String description;
        private String contactNo;
        private double latitude;
        private double longitude;
    }
}