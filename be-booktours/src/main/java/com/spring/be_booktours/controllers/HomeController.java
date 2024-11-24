package com.spring.be_booktours.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/home")
public class HomeController {

    @GetMapping
    public String home() {
        return "Welcome to Be Book Tours";
    }
    
    @GetMapping("/customer")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public String homeCustomer() {
        return "Hello Customer";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String homeAdmin() {
        return "Hello Admin";
    }
    
    @GetMapping("/tour-manager")
    @PreAuthorize("hasRole('ROLE_TOUR_MANAGER')")
    public String homeTourManager() {
        return "Hello Tour Manager";
    }

    @GetMapping("/hotel-manager")
    @PreAuthorize("hasRole('ROLE_HOTEL_MANAGER')")
    public String homeHotelManager() {
        return "Hello Hotel Manager";
    }

    @GetMapping("/flight-manager")
    @PreAuthorize("hasRole('ROLE_FLIGHT_MANAGER')")
    public String homeFlightManager() {
        return "Hello Flight Manager";
    }

}
