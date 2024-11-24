// package com.spring.be_booktours.entities.sub_entities;


// import java.time.LocalDate;
// import java.util.HashSet;
// import java.util.Set;

// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// public class BookHotel {
//     private String bookingCode; // mã đặt phòng
//     private String roomId; // loại phòng
//     private LocalDate checkIn; // ngày nhận phòng
//     private LocalDate checkOut; // ngày trả 
//     private LocalDate bookingDate; // ngày đặt
//     private Set<String> specialRequest = new HashSet<>(); // yêu cầu đặc biệt
//     private String emailUser; // email khách hàng
//     private Double total; // tổng tiền
//     private String paymentStatus; // trạng thái thanh toán
//     private String status = "Chưa thanh toán"; // trạng thái
// }