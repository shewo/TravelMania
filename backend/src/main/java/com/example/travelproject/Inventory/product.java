package com.example.travelproject.Inventory;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Inventory")

public class product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private int shopId;

    private String productName;
    private String productDescription;
    private String category;
    private float price;
    private int available;



}
