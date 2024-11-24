package com.spring.be_booktours.entities.sub_entities;

import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    private String roomId; // mã phòng
    private String roomType; // kiểu phòng
    private double pricePerNight; // giá 1 đêm
    private int maxGuests; // số khách tối đa
    private double roomSize; // diện tích phòng
    private String view; // phong cảnh
    private int discount; // giảm giá
    private Set<String> preferential; // ưu đãi
    private RoomAmenities roomAmenities; // tiện ích riêng của phòng
    private String roomImage; // hình ảnh
    private String bedType; // loại giường
}