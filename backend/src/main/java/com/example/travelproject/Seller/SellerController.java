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


    @PostMapping("/register")
    public Seller registerSeller(@RequestBody Seller seller) {
        return sellerService.createSeller(seller);
    }


    @GetMapping("/all")
    public List<Seller> getAllSellers() {
        return sellerService.getAllSellers();
    }
}