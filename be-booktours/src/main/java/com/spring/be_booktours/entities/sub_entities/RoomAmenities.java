package com.spring.be_booktours.entities.sub_entities;


import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomAmenities {
    private Set<String> bathroom; // phòng tắm
    private Set<String> safety; // an toàn
    private Set<String> entertainment; // tiện nghi giải trí
    private Set<String> foodAndBeverage; // ăn uống
    private Set<String> furniture; // nội thất
}
