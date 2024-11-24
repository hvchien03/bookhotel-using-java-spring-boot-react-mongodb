package com.spring.be_booktours.entities.sub_entities;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    private String houseNumber = null;
    @NotBlank(message = "Đường không được để trống")
    private String street;
    @NotBlank(message = "Phường, xã không được để trống")
    private String ward;
    @NotBlank(message = "Quận, huyện không được để trống")
    private String district;
    @NotBlank(message = "Tỉnh, thành phố không được để trống")
    private String city;
}
