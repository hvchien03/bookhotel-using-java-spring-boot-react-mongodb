package com.spring.be_booktours.entities;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.spring.be_booktours.entities.sub_entities.Payment;
import com.spring.be_booktours.entities.sub_entities.Status;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "booking_history")
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class BookingHistory {
    @Id
    private String bookingCode; // mã đặt phòng
    private String hotelId; // mã khách sạn
    private String hotelName; // tên khách sạn
    private String roomId; // loại phòng
    private String roomType; // tên phòng
    private Date bookingDate; // ngày đặt phòng
    private Date checkIn; // ngày nhận phòng
    private Date checkOut; // ngày trả phòng
    private Set<String> specialRequest = new HashSet<>(); // yêu cầu đặc biệt
    private String emailUser; // email khách hàng
    private Double total; // tổng tiền
    private Payment payment; // trạng thái thanh toán
    private Status status; // trạng thái đơn
    private boolean confirmed; // xác nhận đơn
}
