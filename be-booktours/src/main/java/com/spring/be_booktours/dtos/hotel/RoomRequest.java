package com.spring.be_booktours.dtos.hotel;

import java.util.Set;

// import com.spring.be_booktours.entities.sub_entities.RoomAmenities;

// import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomRequest {
    @NotBlank(message = "Kiểu phòng không được để trống")
    //@Pattern(regexp = "^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠ-ỹ0-9 ]*$", message = "Kiểu phòng chỉ được chứa chữ cái, số và khoảng trắng")
    private String roomType; // kiểu phòng

    // giá phải chia hết cho 1000 và lớn hơn 1000
    @NotNull(message = "Giá 1 đêm không được để trống")
    @Positive(message = "Giá phải lớn hơn 0")
    @Min(value = 1000, message = "Giá phải lớn hơn hoặc bằng 1000 và chia hết cho 1000")
    private double pricePerNight; // giá 1 đêm

    @NotNull(message = "Số khách tối đa không được để trống")
    @Min(value = 1, message = "Số khách phải lớn hơn 0")
    private int maxGuests; // số khách tối đa

    @NotNull(message = ">= 0")
    @Min(value = 0, message = ">= 0")
    private int discount; // giảm giá

    @NotNull(message = ">= 20")
    @Positive(message = ">= 20")
    private double roomSize; // diện tích phòng

    @NotBlank(message = "Phong cảnh không được để trống")
    private String view; // phong cảnh

    // @Size(min = 1, message = "Tối thiểu 1 ưu đãi")
    // private Set<String> preferential; // ưu đãi

    // @Valid
    // private RoomAmenities roomAmenities; // tiện ích riêng của phòng

    @Size(min = 1, message = "Tối thiểu 1 hình ảnh")
    private String roomImage; // hình ảnh

    @NotBlank(message = "Loại giường không được để trống")
    private String bedType; // loại giường
}
