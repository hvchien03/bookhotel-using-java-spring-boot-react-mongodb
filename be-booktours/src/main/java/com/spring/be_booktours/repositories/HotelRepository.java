package com.spring.be_booktours.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.spring.be_booktours.entities.Hotel;

@Repository
public interface HotelRepository extends MongoRepository<Hotel, String> {

    // tìm khách sạn theo địa chỉ, không phân biệt hoa thường, ưu tiên tìm theo tỉnh
    // thành phố, nếu không có thì tim theo quận huyện nếu không có thì tìm theo tên
    @Query("{ $or: [ " +
            "  { 'address.city': { $regex: ?0, $options: 'i' } }, " +
            "  { 'address.district': { $regex: ?0, $options: 'i' } }, " +
            "  { 'hotelName': { $regex: ?0, $options: 'i' } } " +
            "] }")
    Page<Hotel> findHotelByCityOrDistrictOrName(String searchTerm, Pageable pageable);

    //lấy danh sách khách sạn theo city không phân biệt hoa thường, có phân trang
    @Query("{ 'address.city': { $regex: ?0, $options: 'i' } }")
    Page<Hotel> findHotelByCity(String city, Pageable pageable);

    // lấy danh sách các phòng của khách sạn theo mã khách sạn
    @Query(value = "{ '_id': ?0 }", fields = "{ 'roomTypes': 1 }")
    Optional<Hotel> findRoomTypesByHotelId(String hotelId);
}