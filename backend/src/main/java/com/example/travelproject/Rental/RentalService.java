package com.example.travelproject.Rental;


import java.util.List;

import org.springframework.stereotype.Service;

@Service

public class RentalService {

    private final RentalRepository repository;

    public RentalService(RentalRepository repository) {
        this.repository = repository;
    }

    public Rental bookRental(Rental rental) {
        rental.setStatus("BOOKED");
        return repository.save(rental);
    }

    public List<Rental> getHistory(Long userId) {
        return repository.findByUserId(userId);
    }

    public Rental cancelRental(Long id) {
        Rental rental = repository.findById(id).orElseThrow();
        rental.setStatus("CANCELLED");
        return repository.save(rental);
    }

}
