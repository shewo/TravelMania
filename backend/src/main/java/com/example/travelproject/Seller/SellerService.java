package com.example.travelproject.Seller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SellerService {

    @Autowired
    private SellerRepository sellerRepository;

    // අලුත් Seller කෙනෙක් හදන්න
    public Seller createSeller(Seller seller) {
        // අපි බලෙන් Role එක 'SELLER' කියලා සෙට් කරමු, වැරදිලා හරි වෙන එකක් වැටෙන්නේ නැති වෙන්න
        seller.setRole("SELLER");
        return sellerRepository.save(seller);
    }


    public List<Seller> getAllSellers() {
        return sellerRepository.findAll();
    }

    // ID එකෙන් Seller කෙනෙක් ගන්න
    public Seller getSellerById(Long id) {
        return sellerRepository.findById(id).orElse(null);
    }
}