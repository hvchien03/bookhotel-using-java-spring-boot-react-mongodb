package com.spring.be_booktours.controllers.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.be_booktours.services.BookingHistoryService;

@RestController
@RequestMapping("/api/v1/admin/hotel")
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOTEL_MANAGER')")
public class AdminBookingHistoryController {
    @Autowired
    private BookingHistoryService bookingHistoryService;

    // lấy danh sách đặt phòng theo hotelId
    @GetMapping("/booking/{hotelId}")
    public ResponseEntity<?> getBookingByHotelId(@PathVariable String hotelId) {
        return ResponseEntity.ok(bookingHistoryService.getBookHotelByHotelId(hotelId));
    }

    // lấy booking theo bookingCode
    @GetMapping("/booking/code/{bookingCode}")
    public ResponseEntity<?> getBookingByBookingCode(@PathVariable String bookingCode) {
        return ResponseEntity.ok(bookingHistoryService.getBookingByBookingCode(bookingCode));
    }

    // lấy danh sách đơn đặt theo status
    @GetMapping("/booking/status/{status}")
    public ResponseEntity<?> getBookingByStatus(@PathVariable String status,
            @RequestParam(defaultValue = "0", required = false) int page,
            @RequestParam(defaultValue = "5", required = false) int limit) {
        return ResponseEntity.ok(bookingHistoryService.getBookingByStatus(status, page, limit));
    }

    // xác nhận huỷ đơn đặt của khách hàng
    @PutMapping("/booking/confirmcancel/{bookingCode}")
    public ResponseEntity<?> cancelBooking(@PathVariable String bookingCode) {
        return ResponseEntity.ok(bookingHistoryService.confirmCancelBooking(bookingCode));
    }

    // xác nhận đơn đặt của khách hàng
    @PutMapping("/booking/confirmbooking/{bookingCode}")
    public ResponseEntity<?> confirmBooking(@PathVariable String bookingCode) {
        return ResponseEntity.ok(bookingHistoryService.confirmBooking(bookingCode));
    }
}
