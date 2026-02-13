package com.example.travelproject.map;

import com.example.travelproject.user.User;
import com.example.travelproject.user.UserRepository;
import lombok.Data;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.http.HttpHeaders;
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
    private final UserRepository userRepository; // 1. Added User Repository
    private final GeometryFactory geometryFactory = new GeometryFactory();

    // 2. Updated Constructor
    public ShopController(ShopRepository shopRepository, UserRepository userRepository) {
        this.shopRepository = shopRepository;
        this.userRepository = userRepository;
    }

    // --- CREATE SHOP & SAVE TO DB ---
    @PostMapping("/create")
    public ResponseEntity<shop> createShop(@RequestBody ShopRequest request) {
        try {
            shop newShop = new shop();
            newShop.setName(request.getName());
            newShop.setDescription(request.getDescription());
            newShop.setContactNo(request.getContactNo());

            // 3. Link the Shop to the User
            if (request.getUserId() != null) {
                Optional<User> user = userRepository.findById(request.getUserId());
                if (user.isPresent()) {
                    newShop.setUser(user.get());
                } else {
                    return new ResponseEntity<>((HttpHeaders) null, HttpStatus.BAD_REQUEST); // User not found
                }
            } else {
                return new ResponseEntity<>((HttpHeaders) null, HttpStatus.BAD_REQUEST); // User ID is mandatory
            }

            // Create Geometry Point
            Point locationPoint = geometryFactory.createPoint(new Coordinate(request.getLongitude(), request.getLatitude()));
            newShop.setLocation(locationPoint);

            shop savedShop = shopRepository.save(newShop);
            return new ResponseEntity<>(savedShop, HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // --- GET ALL SHOPS ---
    @GetMapping("/all")
    public List<shop> getAllShops() {
        return shopRepository.findAll();
    }

    // --- GET NEARBY SHOPS ---
    @GetMapping("/nearby")
    public List<shop> getNearbyShops(@RequestParam double lat, @RequestParam double lng) {
        Point userLocation = geometryFactory.createPoint(new Coordinate(lng, lat));
        return shopRepository.findShopsNearby(userLocation, 5000);
    }

    // --- GET SHOP BY ID ---
    @GetMapping("/{id}")
    public ResponseEntity<shop> getShopById(@PathVariable Long id) {
        Optional<shop> shopData = shopRepository.findById(id);
        return shopData.map(shop -> new ResponseEntity<>(shop, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // --- GET SHOP BY USER ID ---
    @GetMapping("/user/{userId}")
    public ResponseEntity<shop> getShopByUser(@PathVariable Long userId) {
        Optional<shop> shopData = shopRepository.findByUserId(userId);
        return shopData.map(s -> new ResponseEntity<>(s, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // --- UPDATE SHOP ---
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateShop(@PathVariable Long id, @RequestBody ShopUpdateRequest request) {
        try {
            Optional<shop> shopData = shopRepository.findById(id);
            if (shopData.isEmpty()) {
                return new ResponseEntity<>("Shop not found", HttpStatus.NOT_FOUND);
            }

            shop existingShop = shopData.get();
            existingShop.setName(request.getName());
            existingShop.setDescription(request.getDescription());
            existingShop.setContactNo(request.getContactNo());

            shop updatedShop = shopRepository.save(existingShop);
            return new ResponseEntity<>(updatedShop, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to update shop", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // --- DTO CLASSES ---
    @Data
    public static class ShopRequest {
        private String name;
        private String description;
        private String contactNo;
        private double latitude;
        private double longitude;
        private Long userId; // 4. Added userId to DTO
    }

    @Data
    public static class ShopUpdateRequest {
        private String name;
        private String description;
        private String contactNo;
    }
}