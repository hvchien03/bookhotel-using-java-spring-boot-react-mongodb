package com.spring.be_booktours.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.spring.be_booktours.entities.BookingHistory;

@Repository
public interface BookingHistoryRepository extends MongoRepository<BookingHistory, String>{
    //tìm đơn đặt của khách hàng theo emailUser
    List<BookingHistory> findByEmailUser(String emailUser);

    BookingHistory findByBookingCodeAndEmailUser(String bookingCode, String name);

    List<BookingHistory> findByHotelId(String hotelId);

    //tìm danh sách đặt theo status không phân biệt chữ hoa chữ thường
    List<BookingHistory> findByStatusIgnoreCase(String status);

    BookingHistory findByBookingCode(String bookingCode);
}
