package com.spring.be_booktours.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.spring.be_booktours.entities.BookingHistory;

@Repository
public interface BookingHistoryRepository extends MongoRepository<BookingHistory, String> {
    // tìm đơn đặt của khách hàng theo emailUser
    List<BookingHistory> findByEmailUser(String emailUser);

    BookingHistory findByBookingCodeAndEmailUser(String bookingCode, String name);

    // truy vấn lấy danh sách đơn đặt theo status.statusCode và phần trang
    Page<BookingHistory> findByStatus_StatusCode(int statusCode, Pageable pageable);

    List<BookingHistory> findByHotelId(String hotelId);

    // lấy danh sách đặt phòng theo status và có phân trang
    Page<BookingHistory> findByStatusIgnoreCase(String status, Pageable pageable);

    BookingHistory findByBookingCode(String bookingCode);
}
