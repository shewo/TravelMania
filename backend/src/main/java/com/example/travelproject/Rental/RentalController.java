package com.example.travelproject.Rental;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
("/api/rental")

public class RentalController {
    
     private final RentalService service;

    public RentalController(RentalService service) {
        this.service = service;
    }

    @PostMapping("/book")
    public Rental book(@RequestBody Rental rental) {
        return service.bookRental(rental);
    }

    @GetMapping("/history/{userId}")
    public List<Rental> history(@PathVariable Long userId) {
        return service.getHistory(userId);
    }

    @PutMapping("/cancel/{id}")
    public Rental cancel(@PathVariable Long id) {
        return service.cancelRental(id);
    }
}
