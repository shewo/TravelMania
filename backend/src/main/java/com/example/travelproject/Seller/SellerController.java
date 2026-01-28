package com.example.travelproject.Seller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/seller")
@CrossOrigin
public class SellerController {

    @Autowired
    private SellerService sellerService;

    // 1. අලුත් Seller කෙනෙක් හදන්න (Register වෙන්න)
    @PostMapping("/register")
    public Seller registerSeller(@RequestBody Seller seller) {
        return sellerService.createSeller(seller);
    }

    // 2. ඔක්කොම Sellers ලා බලන්න
    @GetMapping("/all")
    public List<Seller> getAllSellers() {
        return sellerService.getAllSellers();
    }
}