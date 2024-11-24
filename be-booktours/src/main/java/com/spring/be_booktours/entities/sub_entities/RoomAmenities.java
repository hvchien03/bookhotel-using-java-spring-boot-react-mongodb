package com.spring.be_booktours.entities.sub_entities;


import java.util.Set;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomAmenities {
    @Size(min = 1, message = "Tối thiểu 1 tiện nghi của phòng tắm")
    private Set<String> bathroom; // phòng tắm

    @Size(min = 1, message = "Tối thiểu 1 thiết bị an toàn")
    private Set<String> safety; // an toàn

    @Size(min = 1, message = "Tối thiểu 1 thiết bị giải trí")
    private Set<String> entertainment; // tiện nghi giải trí

    @Size(min = 1, message = "Tối thiểu 1 Dịch vụ ăn uống")
    private Set<String> foodAndBeverage; // ăn uống

    @Size(min = 1, message = "Tối thiểu 1 Trang thiết bị, nội thất của phòng")
    private Set<String> furniture; // nội thất
}
