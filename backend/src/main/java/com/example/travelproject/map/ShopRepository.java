package com.example.travelproject.map;

import org.locationtech.jts.geom.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShopRepository extends JpaRepository<shop, Long> {

    // This custom query calculates the distance between the shop's location
    // and the user's location. If it's less than the radius, it returns the shop!
    @Query(value = "SELECT * FROM shop s WHERE ST_DistanceSphere(s.location, :userLocation) < :radius", nativeQuery = true)
    List<shop> findShopsNearby(Point userLocation, double radius);
}
