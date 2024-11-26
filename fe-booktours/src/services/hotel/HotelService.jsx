/* eslint-disable no-useless-catch */
import axios from "axios";

export default class HotelService {
  static BASE_URL = "http://localhost:8081/api/v1/hotel";
  static ADMIN_URL = "http://localhost:8081/api/v1/admin/hotel";

  //lấy khách sạn theo tỉnh/thành phố
  static async getHotelsByCity(objectQuery) {
    if (objectQuery.input === "") {
      objectQuery.input = "Hà Nội";
    }
    //kiểm tra xem objectQuery.input có khoảng trắng không nếu có thay khoảng trắng bằng %20
    let page = objectQuery.page - 1;
    let url =
      this.BASE_URL +
      `/city/${objectQuery.input.replace(/ /g, "%20")}?page=${page}&limit=${
        objectQuery.limit
      }`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  //lấy khách sạn theo id
  static async getHotelById(hotelId) {
    try {
      const response = await axios.get(this.BASE_URL + `/${hotelId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  //tạo mới khách sạn
  static async createHotel(hotel) {
    try {
      const response = await axios.post(this.ADMIN_URL, hotel, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  //sửa thông tin khách sạn cơ bản
  static async updateHotel(hotel) {
    try {
      const response = await axios.put(
        this.ADMIN_URL + `/${hotel.hotelId}`,
        hotel,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  //sửa thông tin tiện nghi của khách sạn
  static async updateAmenitiesHotel(hotel) {
    try {
      const response = await axios.put(
        this.ADMIN_URL + `/${hotel.hotelId}/update-hotelamenities`,
        hotel.amenities,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  //thêm phòng cho 1 khách sạn
  static async addRoom(hotel) {
    try {
      const response = await axios.put(
        this.ADMIN_URL + `/${hotel.hotelId}/add-room`,
        hotel.room,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  //sửa phần trăm khuyến mãi cho tất cả các phòng của khách sạn
  static async updateDiscountAllRoom(data) {
    try {
      const response = await axios.put(
        this.ADMIN_URL +
          `/${data.hotelId}/update-allroomdiscount?discount=${data.discount}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  //lấy thông tin phòng từ roomId và hotelId
  static async getRoomById(hotelId, roomId) {
    try {
      const response = await axios.get(
        this.ADMIN_URL + `/${hotelId}/room/${roomId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // sửa thông tin phòng băng hotelId và truyền vào room
  static async updateBasicRoom(hotelId, room) {
    try {
      const response = await axios.put(
        this.ADMIN_URL + `/${hotelId}/update-room/${room.roomId}`,
        room,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  //sửa thông tin ưu đãi, tiện nghi của phòng
  static async updateRoomamenitiesPreferential(hotelId, room) {
    console.log(hotelId, room);
    try {
      const response = await axios.put(
        this.ADMIN_URL +
          `/${hotelId}/update-roomamenities-preferential/${room.roomId}`,
        room,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  //lấy danh sách booking theo status
  static async getBookingByStatus(statusCode, objectQuery) {
    try {
      if (statusCode == null) {
        statusCode = 1;
      }
      let page = objectQuery.page - 1;
      const response = await axios.get(
        this.ADMIN_URL +
          `/booking/status/${statusCode}?page=${page}&limit=${objectQuery.limit}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  //xác nhận booking
  static async confirmBooking(bookingCode) {
    try {
      const response = await axios.put(
        this.ADMIN_URL + `/booking/confirmbooking/${bookingCode}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  //tìm kiếm booking theo mã booking
  static async searchBooking(bookingCode) {
    try {
      const response = await axios.get(
        this.ADMIN_URL + `/booking/code/${bookingCode}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
