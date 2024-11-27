import React, { useEffect } from "react";
import HotelSearchBox from "../../components/admin/hotel/HotelSearchBox";
import { LocationData } from "../../statics/datas/LocationData";
import { Link } from "react-router-dom";
import HotelLocationList from "../../components/admin/hotel/HotelLocationList";

const hotelData = [
  {
    img: "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_334740/9ebd50e91e3ca8c657b2b74521d41cc9.jpg",
    name: "Khách sạn ở Vũng Tàu",
    accommodation: 3,
    link: "/hotels/vũng tàu",
  },
  {
    img: "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_312504/700bcf731a3e6ca1fdff21d30dfe1da0.jpg",
    name: "Khách sạn ở Phan Thiết, Bình Thuận",
    accommodation: 3,
    link: "/hotels/phan thiết",
  },
  {
    img: "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_334946/24ce1389906d469cda33cc033a8295c7.jpg",
    name: "Khách sạn ở Đà Nẵng",
    accommodation: 3,
    link: "/hotels/đà nẵng",
  },
  {
    img: "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_312508/473c2077df2722e1d8afdf3eb30eadea.jpg",
    name: "Khách sạn Đà Lạt",
    accommodation: 3,
    link: "/hotels/đà lạt",
  },
  //   {
  //     img: "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_334740/9ebd50e91e3ca8c657b2b74521d41cc9.jpg",
  //     name: "Khách sạn 1",
  //     accommodation: 3,
  //   },
  //   {
  //     img: "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_334740/9ebd50e91e3ca8c657b2b74521d41cc9.jpg",
  //     name: "Khách sạn 1",
  //     accommodation: 3,
  //   },
  //   {
  //     img: "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_334740/9ebd50e91e3ca8c657b2b74521d41cc9.jpg",
  //     name: "Khách sạn 1",
  //     accommodation: 3,
  //   },
  //   {
  //     img: "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_334740/9ebd50e91e3ca8c657b2b74521d41cc9.jpg",
  //     name: "Khách sạn 1",
  //     accommodation: 3,
  //   },
];

const locations = LocationData;

const HotelPage = () => {
  useEffect(() => {
    document.title = "Khách sạn ở Việt Nam";
  }, []);

  return (
    <div className="bg-white">
      <div className="container mx-auto max-w-6xl my-10">
        <div className="p-5 mt-10">
          <h1 className="font-bold uppercase text-center text-3xl">
            Khách sạn ở Việt Nam
          </h1>
        </div>
        <div className="p-5">
          <HotelSearchBox />
        </div>
        <div className="p-5 mt-10">
          <h1 className="text-3xl font-bold">
            Điểm đến hàng đầu cho các chuyến đi Việt Nam
          </h1>
          <p className="mt-3">
            Những điểm đến tại Việt Nam đáng để ghé thăm ít nhất một lần trong
            đời
          </p>
          <div className="mt-3 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {hotelData.map((hotel, index) => (
              <Link to={hotel.link} key={index}>
                <div
                  key={index}
                  className="rounded-lg overflow-hidden h-[346px] relative"
                >
                  <img
                    src={hotel.img}
                    alt={hotel.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-2 left-2">
                    <h3 className="text-white text-2xl font-semibold">
                      {hotel.name}
                    </h3>
                    <p className="text-white">
                      <span className="text-xl font-semibold">
                        {hotel.accommodation}
                      </span>{" "}
                      chỗ ở
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="p-5 mt-10">
          <h1 className="text-3xl font-bold">
            Khách sạn tại các khu vực phổ biến nhất ở Việt Nam
          </h1>
          <p className="mt-3">
            Khám phá Việt Nam qua các khu vực nổi tiếng nhất
          </p>
          <div className="mt-3 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {hotelData.map((hotel, index) => (
              <div
                key={index}
                className={`rounded-lg overflow-hidden h-[130px] relative ${
                  index > 3 && "hidden"
                }`}
              >
                <img
                  src={hotel.img}
                  alt={hotel.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-2 left-2">
                  <h3 className="text-white text-2xl font-semibold">
                    {hotel.name}
                  </h3>
                  <p className="text-white">
                    <span className="text-xl font-semibold">
                      {hotel.accommodation}
                    </span>{" "}
                    chỗ ở
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 p-5">
          <div className="p-7 bg-white rounded-lg border border-solid">
            <h1 className="text-3xl font-bold">Kinh nghiệm du lịch Việt Nam</h1>
            <p className="text-justify mt-3 text-sm">
              Việt Nam là một quốc gia Đông Nam Á với rất nhiều điểm đến du lịch
              nổi tiếng thế giới, thu hút đông đảo du khách thập phương. Đến với
              Việt Nam, du khách thường lựa chọn ghé thăm các địa điểm như: Sài
              Gòn, Hà Nội, Đà Nẵng, Hội An, Vũng Tàu, Đà Lạt, Nha Trang, Sapa,
              Phú Quốc,... Và dù là đi đến đâu thì việc tìm được cho mình một
              chỗ lưu trú thoải mất vẫn là yếu tố quan trọng hàng đầu để có một
              chuyến đi hoàn hảo. Tại Vietnam Booking, bạn sẽ tìm được những
              khách sạn tại Việt Nam mới mức GIÁ RẺ NHẤT thị trường. Bên cạnh
              đó, Vietnam Booking còn cung cấp nhiều giao dịch khách sạn hấp
              dẫn, liên tục có các Voucher & Deal đặt phòng trực tuyến giá
              rẻ,... nhằm mang đến cho du khách một chỗ nghỉ tuyệt vời cũng như
              phù hợp với kinh phí và sở thích của bạn. Hệ thống đặt phòng trực
              tuyến hiện đại - Bộ lọc tìm kiếm thông minh - Đội ngũ nhân viên hỗ
              trợ tư vấn 24/7, tất cả sẽ mang đến cho bạn các khách sạn Việt Nam
              tốt nhất!
            </p>
          </div>
        </div>
        <HotelLocationList />
      </div>
    </div>
  );
};

export default HotelPage;
