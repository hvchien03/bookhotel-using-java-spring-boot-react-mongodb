package com.spring.be_booktours.controllers.admin;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.be_booktours.dtos.MyResponse;
import com.spring.be_booktours.dtos.hotel.HotelRequest;
import com.spring.be_booktours.dtos.hotel.RoomAmenitiesPreferentialRequest;
import com.spring.be_booktours.dtos.hotel.RoomRequest;
import com.spring.be_booktours.entities.sub_entities.HotelAmenities;
import com.spring.be_booktours.entities.sub_entities.RoomAmenities;
import com.spring.be_booktours.services.HotelService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1/admin/hotel")
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOTEL_MANAGER')")
public class AdminHotelController {
    @Autowired
    private HotelService hotelService;

    // lấy phòng theo roomId và hotelId
    @GetMapping("/{hotelId}/room/{roomId}")
    public ResponseEntity<?> getRoomByRoomId(@PathVariable String hotelId, @PathVariable String roomId) {
        return ResponseEntity.ok(hotelService.getRoomByRoomIdAndHotelId(hotelId, roomId));
    }

    // Thêm khách sạn
    @PostMapping
    public ResponseEntity<?> createHotel(@Valid @RequestBody HotelRequest newHotel) {
        return ResponseEntity.ok(hotelService.addNewHotel(newHotel));
    }

    // Cập nhật khách sạn
    @PutMapping("{hotelId}")
    public ResponseEntity<?> updateHotel(@PathVariable String hotelId, @Valid @RequestBody HotelRequest newHotel) {
        return ResponseEntity.ok(hotelService.updateHotel(hotelId, newHotel));
    }

    // Sửa các tiện ích của khách sạn
    @PutMapping("{hotelId}/update-hotelamenities")
    public ResponseEntity<?> updateAmenities(@PathVariable String hotelId,
            @Valid @RequestBody HotelAmenities amenities) {
        return ResponseEntity.ok(hotelService.updateHotelAmenities(hotelId, amenities));
    }

    // Thêm phòng
    @PutMapping("{hotelId}/add-room")
    public ResponseEntity<?> addRoom(@PathVariable String hotelId, @Valid @RequestBody RoomRequest newRoom) {
        return ResponseEntity.ok(hotelService.addNewRoomForHotel(hotelId, newRoom));
    }

    // Cập nhật phòng
    @PutMapping("{hotelId}/update-room/{roomId}")
    public ResponseEntity<?> updateRoomForHotel(@PathVariable String hotelId, @PathVariable String roomId,
            @Valid @RequestBody RoomRequest newRoom) {
        return ResponseEntity.ok(hotelService.updateRoom(hotelId, roomId, newRoom));
    }

    // Xóa phòng
    @DeleteMapping("{hotelId}/delete-room/{roomId}")
    public ResponseEntity<MyResponse<String>> deleteRoom(@PathVariable String hotelId, @PathVariable String roomId) {
        return ResponseEntity.ok(hotelService.deleteRoom(hotelId, roomId));
    }

    // Cập nhật ưu đãi, tiện ích riêng của phòng
    @PutMapping("{hotelId}/update-roomamenities-preferential/{roomId}")
    public ResponseEntity<?> updateRoomAmenities(@PathVariable String hotelId, @PathVariable String roomId,
            @Valid @RequestBody RoomAmenitiesPreferentialRequest input) {
        return ResponseEntity.ok(hotelService.updateRoomAmenities(hotelId, roomId, input));
    }

    // Cập nhật ưu đãi của phòng
    // @PutMapping("{hotelId}/update-roompreferential/{roomId}")
    // public ResponseEntity<?> updateRoomPreferential(@PathVariable String hotelId,
    // @PathVariable String roomId,
    // @Valid @RequestBody Set<String> preferential) {
    // return ResponseEntity.ok(hotelService.updateRoomPreferential(hotelId, roomId,
    // preferential));
    // }

    // sửa giảm giá của 1 phòng
    // @PutMapping("{hotelId}/update-roomdiscount/{roomId}")
    // public ResponseEntity<?> updateRoomDiscount(@PathVariable String hotelId,
    // @PathVariable String roomId,
    // @RequestParam(defaultValue = "0", required = true) int discount) {
    // return ResponseEntity.ok(hotelService.updateRoomDiscount(hotelId, roomId,
    // discount));
    // }

    // sửa giảm giá của tất cả các phòng
    @PutMapping("{hotelId}/update-allroomdiscount")
    public ResponseEntity<?> updateAllRoomDiscount(@PathVariable String hotelId,
            @RequestParam(defaultValue = "0", required = true) int discount) {
        return ResponseEntity.ok(hotelService.updateAllRoomDiscount(hotelId, discount));
    }
}
