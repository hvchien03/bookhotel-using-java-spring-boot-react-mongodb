package com.spring.be_booktours.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.be_booktours.dtos.hotel.BookHotelRequest;
import com.spring.be_booktours.services.BookingHistoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/hotel")
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_CUSTOMER')")
public class BookingHistoryController {
    @Autowired
    private BookingHistoryService bookingHistoryService;

    //lấy lịch sử đặt phòng của user
    @GetMapping("/booking")
    public ResponseEntity<?> getBooking() {
        return ResponseEntity.ok(bookingHistoryService.getBooking());
    }

    //đăt phòng
    @PostMapping("/book/{hotelId}")
    public ResponseEntity<?> bookHotel(@PathVariable String hotelId,@Valid @RequestBody BookHotelRequest inputBooking) {
        return ResponseEntity.ok(bookingHistoryService.bookHotel(hotelId, inputBooking));
    }

    //huỷ đặt
    @PutMapping("/cancel/{bookingId}")
    public ResponseEntity<?> cancelBooking(@PathVariable String bookingId) {
        return ResponseEntity.ok(bookingHistoryService.cancelBooking(bookingId));
    }
}
