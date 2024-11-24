package com.spring.be_booktours.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.be_booktours.services.HotelService;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/v1/hotel")
public class HotelController {
    @Autowired
    private HotelService hotelService;

    // lấy khách sạn theo id
    @GetMapping("/{hotelId}")
    public ResponseEntity<?> getHotelById(@PathVariable String hotelId) {
        return ResponseEntity.ok(hotelService.getHotelById(hotelId));
    }

    // lấy danh sách khách sạn theo vùng, tên khách sạn
    @GetMapping("/search")
    public ResponseEntity<?> getListHotel(@RequestParam(defaultValue = "Hà Nội", required = false) String input,
            @RequestParam(defaultValue = "0", required = false) int page,
            @RequestParam(defaultValue = "5", required = false) int limit) {
        return ResponseEntity.ok(hotelService.getHotelsByCityOrHotelName(input, page, limit));
    }

    // lấy danh sách khách sạn theo tỉnh, thành phố
    @GetMapping("/city/{input}")
    public ResponseEntity<?> getListHotelByCity(@PathVariable String input,
            @RequestParam(defaultValue = "0", required = false) int page,
            @RequestParam(defaultValue = "5", required = false) int limit) {
        return ResponseEntity.ok(hotelService.getHotelsByCity(input, page, limit));
    }

    // lấy danh sách phòng của khách sạn theo yêu cầu tìm kiếm (khách sạn abc, 2
    // phòng tổng 12 người)
    @GetMapping("/{hotelId}/rooms")
    public ResponseEntity<?> getRoomsByHotelId(@PathVariable String hotelId,
            @RequestParam int numRooms,
            @RequestParam int numPeople) {
        return ResponseEntity.ok(hotelService.findAvailableRooms(hotelId, numRooms, numPeople));
    }

    // chưa test
    // hủy booking
    // @PutMapping("/booking/{bookingCode}/cancel")
    // @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER')")
    // public ResponseEntity<?> cancelBooking(@PathVariable String bookingCode) {
    // return ResponseEntity.ok(hotelService.cancelBooking(bookingCode));
    // }

    // lấy danh sách booking của khách hàng
    // @GetMapping("/booking")
    // @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER')")
    // public ResponseEntity<?> getBooking() {
    // // Authentication authentication =
    // // SecurityContextHolder.getContext().getAuthentication();
    // // String email = authentication.getName();
    // return ResponseEntity.ok(hotelService.getBooking());
    // }
}
