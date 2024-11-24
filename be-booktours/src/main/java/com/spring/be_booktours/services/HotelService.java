package com.spring.be_booktours.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.be_booktours.dtos.MyResponse;
import com.spring.be_booktours.dtos.hotel.HotelRequest;
import com.spring.be_booktours.dtos.hotel.RoomRequest;
import com.spring.be_booktours.entities.Hotel;
import com.spring.be_booktours.entities.sub_entities.HotelAmenities;
import com.spring.be_booktours.entities.sub_entities.Room;
import com.spring.be_booktours.entities.sub_entities.RoomAmenities;
import com.spring.be_booktours.repositories.HotelRepository;

@Service
@Transactional
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;
    // customer method

    // lấy khách sạn theo id
    public MyResponse<Hotel> getHotelById(String hotelId) {
        MyResponse<Hotel> response = new MyResponse<>();
        Optional<Hotel> hotel = hotelRepository.findById(hotelId);
        if (hotel.isEmpty()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy khách sạn");
        } else {
            response.setStatus(200);
            response.setMessage("Thông tin khách sạn");
            response.setData(hotel.get());
        }
        return response;
    }

    // lấy danh sách sạn theo tỉnh, thành phố
    public MyResponse<Page<Hotel>> getHotelsByCity(String input, int page, int limit) {
        MyResponse<Page<Hotel>> response = new MyResponse<>();

        PageRequest pageable = PageRequest.of(page, limit);

        Page<Hotel> hotels = hotelRepository.findHotelByCity(input, pageable);

        if (hotels.isEmpty()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy khách sạn");
        } else {
            response.setStatus(200);
            response.setMessage("Danh sách khách sạn tại " + input);
            response.setData(hotels);
        }
        return response;
    }

    // lấy danh sách khách sạn theo khu vực or tên khách sạn
    public MyResponse<Page<Hotel>> getHotelsByCityOrHotelName(String input, int page, int limit) {
        MyResponse<Page<Hotel>> response = new MyResponse<>();

        PageRequest pageable = PageRequest.of(page, limit);

        Page<Hotel> hotels = hotelRepository.findHotelByCityOrDistrictOrName(input, pageable);

        if (hotels.isEmpty()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy khách sạn");
        } else {
            response.setStatus(200);
            response.setMessage("Danh sách khách sạn tại " + input);
            response.setData(hotels);
        }
        return response;
    }

    // lấy danh sách phòng theo yêu cầu của khách hàng (2 phòng tổng 12 người)
    public MyResponse<List<Room>> findAvailableRooms(String hotelId, int numRooms, int numGuests) {
        MyResponse<List<Room>> response = new MyResponse<>();
        Optional<Hotel> hotelOptional = hotelRepository.findRoomTypesByHotelId(hotelId);

        if (hotelOptional.isEmpty()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy khách sạn với mã đã cung cấp.");
            return response;
        }

        // Lấy danh sách phòng từ `roomTypes`
        Set<Room> roomTypes = hotelOptional.get().getRoomTypes();

        // Tính số khách tối thiểu cần trong mỗi phòng
        int minGuestsPerRoom = (int) Math.ceil((double) numGuests / numRooms);

        // Lọc các phòng phù hợp
        List<Room> availableRooms = roomTypes.stream()
                .filter(r -> r.getMaxGuests() >= minGuestsPerRoom)
                .toList();

        if (availableRooms.size() == 0) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy đủ phòng phù hợp với yêu cầu của khách hàng.");
        } else {
            response.setStatus(200);
            response.setMessage("Danh sách phòng phù hợp");
            response.setData(availableRooms.subList(0, numRooms));
        }
        return response;
    }

    // admin method

    // khách sạn
    // thêm khách sạn mới, còn thiếu phòng
    public MyResponse<String> addNewHotel(HotelRequest inputHotel) {
        MyResponse<String> response = new MyResponse<>();
        Hotel hotel = new Hotel();
        hotel.setHotelName(inputHotel.getHotelName());
        hotel.setEmail(inputHotel.getEmail());
        hotel.setHotline(inputHotel.getHotline());
        hotel.setDescription(inputHotel.getDescription());
        hotel.setStar(inputHotel.getStar());
        hotel.setAddress(inputHotel.getAddress());
        hotel.setImage(inputHotel.getImage());
        hotel.setAmenities(new HotelAmenities());
        hotel.setLocationNearHotel(inputHotel.getLocationNearHotel());

        Hotel newHotel = hotelRepository.save(hotel);
        if (newHotel.getHotelId().length() < 0) {
            response.setStatus(500);
            response.setMessage("Thêm khách sạn thất bại");
        } else {
            response.setStatus(200);
            response.setMessage("Thêm khách sạn thành công, mã hotel: " + newHotel.getHotelId());
            response.setData(newHotel.getHotelId());
        }
        return response;
    }

    // cập nhật thông tin khách sạn, không cập nhật được các nội dung của phòng
    public MyResponse<String> updateHotel(String hotelId, HotelRequest inputHotel) {
        MyResponse<String> response = new MyResponse<>();
        Hotel hotel = hotelRepository.findById(hotelId).orElse(null);
        if (hotel == null) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy khách sạn");
        } else {
            hotel.setHotelName(inputHotel.getHotelName());
            hotel.setEmail(inputHotel.getEmail());
            hotel.setHotline(inputHotel.getHotline());
            hotel.setDescription(inputHotel.getDescription());
            hotel.setStar(inputHotel.getStar());
            hotel.setAddress(inputHotel.getAddress());
            hotel.setImage(inputHotel.getImage());
            hotel.setLocationNearHotel(inputHotel.getLocationNearHotel());

            Hotel newHotel = hotelRepository.save(hotel);
            response.setStatus(200);
            response.setMessage("Cập nhật khách sạn thành công");
            response.setData(newHotel.getHotelId());
        }
        return response;

    }

    // thêm, xoá sửa các tiện ích của khách sạn
    public MyResponse<HotelAmenities> updateHotelAmenities(String hotelId, HotelAmenities inputAmenities) {
        MyResponse<HotelAmenities> response = new MyResponse<>();
        Hotel hotel = hotelRepository.findById(hotelId).orElse(null);
        if (hotel == null) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy khách sạn");
        } else {
            hotel.setAmenities(inputAmenities);
            Hotel newHotel = hotelRepository.save(hotel);
            response.setStatus(200);
            response.setMessage("Cập nhật tiện nghi khách sạn" + newHotel.getHotelId() + " thành công");
            response.setData(newHotel.getAmenities());
        }
        return response;
    }

    // phòng
    // thêm mới 1 phòng cho khách sạn, thêm được đầy đủ các thông tin
    public MyResponse<String> addNewRoomForHotel(String hotelId, RoomRequest inputRoom) {
        MyResponse<String> response = new MyResponse<>();
        Hotel hotel = hotelRepository.findById(hotelId).orElse(null);
        if (hotel == null) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy khách sạn");
        } else {
            Room room = new Room();
            room.setRoomId(String.valueOf(System.currentTimeMillis()));
            room.setRoomType(inputRoom.getRoomType());
            room.setPricePerNight(inputRoom.getPricePerNight());
            room.setMaxGuests(inputRoom.getMaxGuests());
            room.setRoomSize(inputRoom.getRoomSize());
            room.setView(inputRoom.getView());
            room.setDiscount(inputRoom.getDiscount());
            // room.setPreferential(inputRoom.getPreferential());
            // room.setRoomAmenities(inputRoom.getRoomAmenities());
            room.setRoomImage(inputRoom.getRoomImage());
            room.setBedType(inputRoom.getBedType());

            hotel.getRoomTypes().add(room);
            hotelRepository.save(hotel);
            response.setStatus(200);
            response.setMessage("Thêm phòng mới thành công");
            response.setData(room.getRoomId());
        }
        return response;
    }

    // cập nhật thông tin phòng
    public MyResponse<String> updateRoom(String hotelId, String roomId, RoomRequest inputRoom) {
        MyResponse<String> response = new MyResponse<>();
        Hotel hotel = hotelRepository.findById(hotelId).orElse(null);
        if (hotel == null) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy khách sạn");
        } else {
            Room room = hotel.getRoomTypes().stream().filter(r -> r.getRoomId().equals(roomId)).findFirst()
                    .orElse(null);
            if (room == null) {
                response.setStatus(404);
                response.setMessage("Không tìm thấy phòng");
            } else {
                room.setRoomType(inputRoom.getRoomType());
                room.setPricePerNight(inputRoom.getPricePerNight());
                room.setMaxGuests(inputRoom.getMaxGuests());
                room.setRoomSize(inputRoom.getRoomSize());
                room.setView(inputRoom.getView());
                room.setDiscount(inputRoom.getDiscount());
                // room.setPreferential(inputRoom.getPreferential());
                // room.setRoomAmenities(inputRoom.getRoomAmenities());
                room.setRoomImage(inputRoom.getRoomImage());
                room.setBedType(inputRoom.getBedType());

                hotelRepository.save(hotel);
                response.setStatus(200);
                response.setMessage("Cập nhật phòng của khách sạn " + hotelId + " thành công");
                response.setData(room.getRoomId());
            }
        }
        return response;
    }

    // xoá phòng
    public MyResponse<String> deleteRoom(String hotelId, String roomId) {
        MyResponse<String> response = new MyResponse<>();
        Hotel hotel = hotelRepository.findById(hotelId).orElse(null);
        if (hotel == null) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy khách sạn");
        } else {
            Room room = hotel.getRoomTypes().stream().filter(r -> r.getRoomId().equals(roomId)).findFirst()
                    .orElse(null);
            if (room == null) {
                response.setStatus(404);
                response.setMessage("Không tìm thấy phòng");
            } else {
                hotel.getRoomTypes().remove(room);
                hotelRepository.save(hotel);
                response.setStatus(200);
                response.setMessage("Xoá phòng thành công");
                response.setData(roomId);
            }
        }
        return response;
    }

    // thêm xoá sửa các tiện ích của phòng
    public MyResponse<RoomAmenities> updateRoomAmenities(String hotelId, String roomId, RoomAmenities inputAmenities) {
        MyResponse<RoomAmenities> response = new MyResponse<>();
        Hotel hotel = hotelRepository.findById(hotelId).orElse(null);
        if (hotel == null) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy khách sạn");
        } else {
            Room room = hotel.getRoomTypes().stream().filter(r -> r.getRoomId().equals(roomId)).findFirst()
                    .orElse(null);
            if (room == null) {
                response.setStatus(404);
                response.setMessage("Không tìm thấy phòng");
            } else {
                room.setRoomAmenities(inputAmenities);
                hotelRepository.save(hotel);
                response.setStatus(200);
                response.setMessage("Cập nhật tiện nghi phòng" + roomId + ", khách sạn " + hotelId + " thành công");
                response.setData(room.getRoomAmenities());
            }
        }
        return response;
    }

    // thêm, xoá sửa các ưu đãi của phòng
    public MyResponse<Set<String>> updateRoomPreferential(String hotelId, String roomId,
            Set<String> inputPreferential) {
        MyResponse<Set<String>> response = new MyResponse<>();
        Hotel hotel = hotelRepository.findById(hotelId).orElse(null);
        if (hotel == null) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy khách sạn");
        } else {
            Room room = hotel.getRoomTypes().stream().filter(r -> r.getRoomId().equals(roomId)).findFirst()
                    .orElse(null);
            if (room == null) {
                response.setStatus(404);
                response.setMessage("Không tìm thấy phòng");
            } else {
                room.setPreferential(inputPreferential);
                hotelRepository.save(hotel);
                response.setStatus(200);
                response.setMessage("Cập nhật ưu đãi phòng" + roomId + ", khách sạn " + hotelId + " thành công");
                response.setData(room.getPreferential());
            }
        }
        return response;
    }

    // sửa phần trăm giảm giá của phòng
    // public MyResponse<Integer> updateRoomDiscount(String hotelId, String roomId, int discount) {
    //     MyResponse<Integer> response = new MyResponse<>();
    //     Hotel hotel = hotelRepository.findById(hotelId).orElse(null);
    //     if (hotel == null) {
    //         response.setStatus(404);
    //         response.setMessage("Không tìm thấy khách sạn");
    //     } else {
    //         Room room = hotel.getRoomTypes().stream().filter(r -> r.getRoomId().equals(roomId)).findFirst()
    //                 .orElse(null);
    //         if (room == null) {
    //             response.setStatus(404);
    //             response.setMessage("Không tìm thấy phòng");
    //         } else {
    //             room.setDiscount(discount);
    //             hotelRepository.save(hotel);
    //             response.setStatus(200);
    //             response.setMessage("Cập nhật giảm giá phòng" + roomId + ", khách sạn " + hotelId + " thành công");
    //             response.setData(room.getDiscount());
    //         }
    //     }
    //     return response;
    // }

    // sửa phần trăm giảm giá cho tất cả các phòng của khách sạn
    public MyResponse<Integer> updateAllRoomDiscount(String hotelId, int discount) {
        MyResponse<Integer> response = new MyResponse<>();
        Hotel hotel = hotelRepository.findById(hotelId).orElse(null);
        if (hotel == null) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy khách sạn");
        } else {
            hotel.getRoomTypes().forEach(r -> r.setDiscount(discount));
            hotelRepository.save(hotel);
            response.setStatus(200);
            response.setMessage("Cập nhật giảm giá cho tất cả phòng của khách sạn " + hotelId + " thành công");
            response.setData(discount);
        }
        return response;
    }

    // lấy phòng theo roomId và hotelId
    public MyResponse<Room> getRoomByRoomIdAndHotelId(String hotelId, String roomId) {
        MyResponse<Room> response = new MyResponse<>();
        Hotel hotel = hotelRepository.findById(hotelId).orElse(null);
        if (hotel == null) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy khách sạn");
        } else {
            Room room = hotel.getRoomTypes().stream().filter(r -> r.getRoomId().equals(roomId)).findFirst()
                    .orElse(null);
            if (room == null) {
                response.setStatus(404);
                response.setMessage("Không tìm thấy phòng");
            } else {
                response.setStatus(200);
                response.setMessage("Thông tin phòng");
                response.setData(room);
            }
        }
        return response;
    }
}
