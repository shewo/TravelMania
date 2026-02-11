package com.example.travelproject.Seller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SellerService {

    @Autowired
    private SellerRepository sellerRepository;

    // create new seller
    public Seller createSeller(Seller seller) {
        //
        seller.setRole("SELLER");
        return sellerRepository.save(seller);
    }


    public List<Seller> getAllSellers() {
        return sellerRepository.findAll();
    }

    // get seller using id
    public Seller getSellerById(Long id) {
        return sellerRepository.findById(id).orElse(null);
    }
}