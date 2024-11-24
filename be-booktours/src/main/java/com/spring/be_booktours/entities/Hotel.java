package com.spring.be_booktours.entities;

import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.spring.be_booktours.entities.sub_entities.Address;
import com.spring.be_booktours.entities.sub_entities.HotelAmenities;
import com.spring.be_booktours.entities.sub_entities.Room;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "hotel")
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Hotel {
    @Id
    private String hotelId; // mã khách sạn
    private String hotelName; // tên khách sạn
    private String email; // email khách sạn
    private String hotline; // hotline khách sạn
    private String description; // mô tả khách sạn
    private int star; // số sao khách sạn
    private Address address; // địa chỉ khách sạn
    private HotelAmenities amenities; // tiện nghi (tiện nghi của khách sạn, phòng, dịch vụ, ăn uống, lễ tân, lau dọn, vui chơi giải trí, ngoài trời, di chuyển)
    private Set<String> locationNearHotel = new HashSet<>(); // địa điểm gần khách sạn
    private Set<String> image = new HashSet<>(); // hình ảnh khách sạn
    private Set<Room> roomTypes = new HashSet<>(); // danh sách các loại phòng có thể đặt    
    //private Set<BookHotel> bookHotels = new HashSet<>(); // danh sách đặt phòng 
}
