import React, { useEffect } from "react";
import HotelSearchBox from "../../components/admin/hotel/HotelSearchBox";
import HotelCard2 from "../../components/admin/hotel/HotelCard2";
import HotelLocationList from "../../components/admin/hotel/HotelLocationList";
import HotelDetail from "../../components/admin/hotel/HotelDetail";


const hotels = [
  {
    img: "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_346547/2eeea3f9a18a913e53c23c64d00f497d.jpg",
    star: 3,
    name: "Khách sạn 1",
    address: "Địa chỉ 1",
    price: 1000000,
    services: ["Wifi", "Bữa sáng", "Két an toàn"],
  },
  {
    img: "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_346547/2eeea3f9a18a913e53c23c64d00f497d.jpg",
    star: 3,
    name: "Khách sạn 1",
    address: "Địa chỉ 1",
    price: 1000000,
    services: ["Wifi", "Bữa sáng", "Két an toàn"],
  },
  {
    img: "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_346547/2eeea3f9a18a913e53c23c64d00f497d.jpg",
    star: 3,
    name: "Khách sạn 1",
    address: "Địa chỉ 1",
    price: 1000000,
    services: ["Wifi", "Bữa sáng", "Két an toàn"],
  },
  {
    img: "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_346547/2eeea3f9a18a913e53c23c64d00f497d.jpg",
    star: 3,
    name: "Khách sạn 1",
    address: "Địa chỉ 1",
    price: 1000000,
    services: ["Wifi", "Bữa sáng", "Két an toàn"],
  },
  {
    img: "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_346547/2eeea3f9a18a913e53c23c64d00f497d.jpg",
    star: 3,
    name: "Khách sạn 1",
    address: "Địa chỉ 1",
    price: 1000000,
    services: ["Wifi", "Bữa sáng", "Két an toàn"],
  },
  {
    img: "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_346547/2eeea3f9a18a913e53c23c64d00f497d.jpg",
    star: 3,
    name: "Khách sạn 1",
    address: "Địa chỉ 1",
    price: 1000000,
    services: ["Wifi", "Bữa sáng", "Két an toàn"],
  },
  {
    img: "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_346547/2eeea3f9a18a913e53c23c64d00f497d.jpg",
    star: 3,
    name: "Khách sạn 1",
    address: "Địa chỉ 1",
    price: 1000000,
    services: ["Wifi", "Bữa sáng", "Két an toàn"],
  },
];
const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const 
  useEffect(() => {
    document.title = "Danh sách các khách sạn";
  }, []);

  return (
    <div className="bg-white">
      <div className="container mx-auto max-w-6xl my-10">
        <HotelSearchBox />
        <div className="mt-4 grid md:grid-cols-3 gap-5">
          <div className="md:col-span-1 grid gap-3">
            {hotels.map((hotel, index) => (
              <HotelCard2 key={index} hotel={hotel} />
            ))}
          </div>
          <div className="md:col-span-2">
            <HotelDetail />
          </div>
        </div>
        <HotelLocationList />
      </div>
    </div>
  );
};

export default Hotels;
