package com.spring.be_booktours.dtos.hotel;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.spring.be_booktours.annotations.FutureOrPresentDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookHotelRequest {
    @NotBlank(message = "Loại phòng không được để trống")
    private String roomId; // loại phòng

    @NotNull(message = "Ngày nhận phòng không được để trống")
    @FutureOrPresentDate
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Ho_Chi_Minh")
    private Date checkIn; // ngày nhận phòng

    private int duration; // số ngày thuê

    private Set<String> specialRequest = new HashSet<>(); // yêu cầu đặc biệt
}
