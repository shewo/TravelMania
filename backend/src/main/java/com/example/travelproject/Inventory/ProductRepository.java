package com.example.travelproject.Inventory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // ✅ FIX 1: Manually map 'shopId' to 'shop.id'
    @Query("SELECT p FROM Product p WHERE p.shop.id = :shopId")
    List<Product> findAllByShopId(@Param("shopId") long shopId);

    List<Product> findAllByCategory(String category);

    // ✅ FIX 2: Manually map 'shopId' to 'shop.id' here too
    @Query("SELECT p FROM Product p WHERE p.shop.id = :shopId AND p.category = :category")
    List<Product> findAllByShopIdAndCategory(@Param("shopId") long shopId, @Param("category") String category);

    Iterable<Integer> Id(Long id);
}