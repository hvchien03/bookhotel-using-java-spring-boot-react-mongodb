package com.spring.be_booktours.services;

import org.springframework.security.core.Authentication;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.be_booktours.dtos.MyResponse;
import com.spring.be_booktours.dtos.hotel.BookHotelRequest;
import com.spring.be_booktours.entities.BookingHistory;
import com.spring.be_booktours.entities.Hotel;
import com.spring.be_booktours.entities.sub_entities.Room;
import com.spring.be_booktours.repositories.BookingHistoryRepository;
import com.spring.be_booktours.repositories.HotelRepository;

@Service
@Transactional
public class BookingHistoryService {
    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private BookingHistoryRepository bookingHistoryRepository;

    // customer
    // lấy danh sách booking của khách hàng
    public MyResponse<List<BookingHistory>> getBooking() {
        MyResponse<List<BookingHistory>> response = new MyResponse<>();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        // lấy danh sách booking của khách hàng
        List<BookingHistory> bookingHistories = bookingHistoryRepository.findByEmailUser(auth.getName());
        if (bookingHistories.size() == 0) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy lịch sử đặt phòng");
        } else {
            response.setStatus(200);
            response.setMessage("Lịch sử đặt phòng của khách hàng " + auth.getName());
            response.setData(bookingHistories);
        }
        return response;
    }

    // chưa test
    // đặt phòng
    public MyResponse<String> bookHotel(String hotelId, BookHotelRequest inputBooking) {
        MyResponse<String> response = new MyResponse<>();
        Hotel hotel = hotelRepository.findById(hotelId).orElse(null);
        if (hotel == null) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy khách sạn");
            return response;
        }

        Room room = hotel.getRoomTypes().stream().filter(r -> r.getRoomId().equals(inputBooking.getRoomId()))
                .findFirst().orElse(null);
        if (room == null) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy phòng");
            return response;
        }

        // lấy thông tin khách hàng
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Date now = new Date(System.currentTimeMillis());

        // Tính tiền
        double total = room.getPricePerNight() * inputBooking.getDuration();

        BookingHistory bookingHistory = new BookingHistory();
        bookingHistory.setBookingCode("Booking" + System.currentTimeMillis());
        bookingHistory.setHotelId(hotelId);
        bookingHistory.setHotelName(hotel.getHotelName());
        bookingHistory.setRoomId(room.getRoomId());
        bookingHistory.setRoomType(room.getRoomType());
        // lấy ngày hiện tại

        bookingHistory.setBookingDate(now);
        bookingHistory.setCheckIn(inputBooking.getCheckIn());

        // Cộng ngayf
        Date checkOut = new Date(inputBooking.getCheckIn().getTime() + inputBooking.getDuration() * 24 * 60 * 60 * 1000);

        bookingHistory.setCheckOut(checkOut);

        bookingHistory.setSpecialRequest(inputBooking.getSpecialRequest());
        bookingHistory.setEmailUser(auth.getName());
        bookingHistory.setTotal(total);
        bookingHistory.setPaymentStatus("Chưa thanh toán");
        bookingHistory.setStatus("Đang chờ xác nhận");
        bookingHistoryRepository.save(bookingHistory);

        response.setStatus(200);
        response.setMessage("Đặt phòng thành công, mã đặt phòng: " +
                bookingHistory.getBookingCode());
        response.setData(bookingHistory.getBookingCode());
        return response;
    }

    // huỷ đặt phòng bên customer
    public MyResponse<String> cancelBooking(String bookingCode) {
        MyResponse<String> response = new MyResponse<>();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        BookingHistory bookingHistory = bookingHistoryRepository.findByBookingCodeAndEmailUser(bookingCode,
                auth.getName());

        if (bookingHistory == null) {
            response.setStatus(404);
            response.setMessage("Huỷ không thành công");
        } else {
            bookingHistory.setStatus("Chờ xác nhận huỷ phòng");
            bookingHistoryRepository.save(bookingHistory);
            response.setStatus(200);
            response.setMessage("Đang chờ xác nhận huỷ đặt phòng, mã đặt phòng: " + bookingCode);
            response.setData(bookingCode);
        }
        return response;
    }

    // admin

    // lấy đơn đặt phòng theo khách sạn
    public MyResponse<List<BookingHistory>> getBookHotelByHotelId(String hotelId) {
        MyResponse<List<BookingHistory>> response = new MyResponse<>();

        List<BookingHistory> bookHotels = bookingHistoryRepository.findByHotelId(hotelId);
        if (bookHotels.size() == 0) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy đơn đặt phòng");
        } else {
            response.setStatus(200);
            response.setMessage("Danh sách đơn đặt phòng của khách sạn " + hotelId);
            response.setData(bookHotels);
        }
        return response;
    }

    // lấy tất cả đơn đặt phòng của tất cả khách sạn theo status
    public MyResponse<List<BookingHistory>> getBookingByStatus(String status) {
        MyResponse<List<BookingHistory>> response = new MyResponse<>();

        // lấy danh sách đơn đặt phòng bằng ngày nhận phòng, status
        List<BookingHistory> bookHotels = bookingHistoryRepository.findByStatusIgnoreCase(status);
        if (bookHotels.size() == 0) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy đơn đặt phòng");
        } else {
            response.setStatus(200);
            response.setMessage("Danh sách đơn đặt phòng theo status " + status);
            response.setData(bookHotels);
        }
        return response;

    }

    // xác nhận huỷ đơn đặt cho user
    public MyResponse<String> confirmCancelBooking(String bookingCode) {
        MyResponse<String> response = new MyResponse<>();
        BookingHistory bookingHistory = bookingHistoryRepository.findByBookingCode(bookingCode);
        if (bookingHistory == null) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy đơn đặt phòng");
        } else {
            bookingHistory.setStatus("Đã huỷ");
            bookingHistoryRepository.save(bookingHistory);
            response.setStatus(200);
            response.setMessage("Xác nhận huỷ đơn đặt phòng thành công, mã đặt phòng: " + bookingCode);
            response.setData(bookingCode);
        }
        return response;
    }

    // xác nhận đơn đặt phòng cho user
    public MyResponse<String> confirmBooking(String bookingCode) {
        MyResponse<String> response = new MyResponse<>();
        BookingHistory bookingHistory = bookingHistoryRepository.findByBookingCode(bookingCode);
        if (bookingHistory == null) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy đơn đặt phòng");
        } else {
            bookingHistory.setPaymentStatus("Đã thanh toán");
            bookingHistory.setStatus("Đã xác nhận");
            bookingHistoryRepository.save(bookingHistory);
            response.setStatus(200);
            response.setMessage("Xác nhận đơn đặt phòng thành công, mã đặt phòng: " + bookingCode);
            response.setData(bookingCode);
        }
        return response;
    }
}
