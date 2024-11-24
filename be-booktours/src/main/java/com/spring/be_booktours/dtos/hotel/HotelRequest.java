package com.spring.be_booktours.dtos.hotel;

import java.util.HashSet;
import java.util.Set;

import com.spring.be_booktours.entities.sub_entities.Address;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HotelRequest {
    @NotBlank(message = "Tên khách sạn không được để trống")
    @Pattern(regexp = "^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠ-ỹ0-9 ]*$", message = "Tên khách sạn chỉ được chứa chữ cái, số và khoảng trắng")
    private String hotelName; // tên khách sạn

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    private String email; // email khách sạn

    @NotBlank(message = "Hotline không được trống")
    @Pattern(regexp = "^[0-9]{10}$", message = "Hotline có độ dài 10")
    private String hotline; // hotline khách sạn

    @NotBlank(message = "Mô tả không được để trống")
    private String description; // mô tả khách sạn

    @Min(value = 1, message = "Số sao tối thiểu là 1")
    private int star; // số sao khách sạn

    @Valid
    private Address address; // địa chỉ khách sạn

    @Size(min = 3, max = 3, message = "Tối thiểu phải có 3 hình ảnh")
    private Set<String> image = new HashSet<>(); // hình ảnh khách sạn

    private Set<String> locationNearHotel = new HashSet<>(); // địa điểm gần khách sạn
}
