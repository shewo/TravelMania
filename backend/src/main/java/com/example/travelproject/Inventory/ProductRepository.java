package com.example.travelproject.Inventory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByShopId(long shopId);

    List<Product> findAllByCategory(String category);

    Iterable<Integer> Id(Long id);
}
