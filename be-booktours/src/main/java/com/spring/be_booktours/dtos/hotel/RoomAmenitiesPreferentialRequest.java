package com.spring.be_booktours.dtos.hotel;

import java.util.Set;

import com.spring.be_booktours.entities.sub_entities.RoomAmenities;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomAmenitiesPreferentialRequest {
    private Set<String> preferential; // ưu đãi
    private RoomAmenities roomAmenities;
}
