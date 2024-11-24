package com.spring.be_booktours.entities.sub_entities;

import java.util.Set;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HotelAmenities {
    @Size(min = 1, message = "Tối thiểu 1 tiện nghi khách sạn")
    private Set<String> hotelAmenities; // tiện nghi khách sạn

    @Size(min = 1, message = "Tối thiểu 1 dịch vụ lễ tân")
    private Set<String> frontDeskServices; // tiện nghi dịch vụ lễ tân

    @Size(min = 1, message = "Tối thiểu 1 dịch vụ dọn dẹp")
    private Set<String> cleaningServices; // tiện nghi dịch vụ lau dọn

    @Size(min = 1, message = "Tối thiểu 1 tiện nghi vui chơi giải trí")
    private Set<String> entertainmentAndRecreation; // tiện nghi vui chơi giải trí

    @Size(min = 1, message = "Tối thiểu 1 tiện nghi ngoại trời")
    private Set<String> outdoor; // tiện nghi ngoài trời

    @Size(min = 1, message = "Tối thiểu 1 tiện nghi di chuyển")
    private Set<String> transportation; // tiện nghi di chuyển
}
