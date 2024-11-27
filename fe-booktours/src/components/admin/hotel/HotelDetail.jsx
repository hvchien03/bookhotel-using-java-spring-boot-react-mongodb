import React, { useEffect } from "react";
import { initTWE, Carousel } from "tw-elements";
import formatPrice from "../../../utils/format-price";
import { SearchIcon, StarIcon, WifiIcon } from "@heroicons/react/solid";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/outline";

const imageList = [
  "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_346547/56e469cd4af787852eb7307cd9df46e4.jpg",
  "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_346547/56e469cd4af787852eb7307cd9df46e4.jpg",
  "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_346547/56e469cd4af787852eb7307cd9df46e4.jpg",
  "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_346547/56e469cd4af787852eb7307cd9df46e4.jpg",
  "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_346547/56e469cd4af787852eb7307cd9df46e4.jpg",
  "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_346547/56e469cd4af787852eb7307cd9df46e4.jpg",
  "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_346547/56e469cd4af787852eb7307cd9df46e4.jpg",
];

const services = [
  "Nhà hàng",
  "Tiệc nghi tổ chức hội họp/Tiệc",
  "Phòng gym",
  "Quầy bar",
  "Hồ bơi",
  "Wifi",
  "Két sắt",
  "Dép đi trong nhà",
];
const policyHotel = [
  {
    title: "Thời gian nhận trả phòng",
    content: "Thời gian nhận phòng: 14h00\nThời gian trả phòng: 12h00",
  },
  {
    title: "Lưu ý khi nhận phòng",
    content:
      "- Quý khách vui lòng mang theo mã xác nhận đặt phòng của Vietnam Booking và CMND, thẻ căn cước công dân hoặc hộ chiếu khi đến nhận phòng tại quầy lễ tân của khách sạn.\n- Tất cả trẻ em đều được đón nhận.\n- Theo quy định của Pháp luật Việt Nam, 01 khách nước ngoài đi kèm 01 khách Việt Nam ở chung 1 phòng phải có giấy Đăng ký kết hôn.\n- Tất cả chi phí phát sinh được thanh toán trực tiếp tại quầy lễ tân của khách sạn.",
  },
  {
    title: "Các hoạt động giải trí nổi bật",
    content:
      "- Nhà hàng: Chuyên phục vụ các món ăn ngon trong nước và quốc tế do những đầu bếp lành nghề chế biến.\n- Hồ bơi ngoài trời: Có tầm nhìn ra thành phố lung linh, nơi bạn có thể đắm mình trong dòng nước xanh mát.\n- Quán bar: Hãy cùng nhâm nhi những ly cocktail đặc sắc nhất tại đây.\n- Trung tâm thể dục: Đừng quên rèn luyện sức khỏe cùng hệ thống máy tập chất lượng theo từng mức độ từ thấp đến cao. ",
  },
];
const HotelDetail = () => {
  useEffect(() => {
    initTWE({ Carousel });
  }, []);
  return (
    <div className="p-5 bg-white border border-solid rounded-lg">
      <div className="grid md:grid-cols-7 gap-3">
        <div className="col-span-5">
          <div className="flex gap-1">
            <div className="my-auto bg-stone-100 font-medium uppercase px-1 rounded-md">
              Khách sạn
            </div>
            <div className="flex my-auto">
              <StarIcon className="w-5 h-5 text-yellow-300" />
              <StarIcon className="w-5 h-5 text-yellow-300" />
              <StarIcon className="w-5 h-5 text-yellow-300" />
              <StarIcon className="w-5 h-5 text-yellow-300" />
            </div>
          </div>
          <h1 className="text-xl font-semibold uppercase">
            HAPPY LIFE GRAND HOTEL & SKY BAR
          </h1>
          <p className="text-gray-400 text-sm">
            102-104-106 Lê Thị Hồng Gấm, Quận 1, Hồ Chí Minh
          </p>
        </div>
        <div className="col-span-2">
          <p>Giá phòng từ</p>
          <p className="text-gray-500 line-through">{formatPrice(10000000)}</p>
          <p>
            <span className="font-semibold text-2xl text-orange-400">
              {formatPrice(5000000)}
            </span>
            /đêm
          </p>
          <button className="ml-auto mt-auto mb-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            <SearchIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
            Lựa chọn phòng
          </button>
        </div>
      </div>
      <div className="mt-5 shadow sm:rounded-lg mx-auto max-w-screen-xl">
        <div
          id="carouselExampleControls"
          className="relative"
          data-twe-carousel-init
          data-twe-ride="carousel"
        >
          <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
            <div
              className="rounded-lg md:h-96 overflow-hidden relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
              data-twe-carousel-item
              data-twe-carousel-active
            >
              <img
                src={imageList[0]}
                className="block w-full object-cover"
                alt="Wild Landscape"
              />
            </div>
            {imageList.map((image, index) => (
              <div
                key={index}
                className="rounded-lg md:h-96 overflow-hidden relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                data-twe-carousel-item
              >
                <img
                  src={image}
                  className="block w-full object-cover"
                  alt="Exotic Fruits"
                />
              </div>
            ))}
          </div>

          <button
            className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
            type="button"
            data-twe-target="#carouselExampleControls"
            data-twe-slide="prev"
          >
            <span className="inline-block h-8 w-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </span>
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Previous
            </span>
          </button>
          <button
            className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
            type="button"
            data-twe-target="#carouselExampleControls"
            data-twe-slide="next"
          >
            <span className="inline-block h-8 w-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </span>
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Next
            </span>
          </button>
        </div>
      </div>
      <div className="mt-5 border-t border-solid py-5">
        <h1 className="font-bold text-xl">Tiện nghi khách sạn</h1>
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
          {services.map((service, index) => (
            <div key={index} className="flex gap-2">
              <WifiIcon className="w-5 h-5 text-gray-500" />
              <span className="text-gray-500 text-sm">{service}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 py-5">
        <h1 className="font-bold text-xl">Các chính sách khách sạn</h1>
        <div className="mt-5 grid grid-cols-1 gap-3">
          {policyHotel.map((policy, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <>
                  <DisclosureButton
                    className={`flex justify-between w-full px-4 py-3 text-sm font-medium text-left text-gray-500 bg-gray-50 rounded-t-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-sky-500 focus-visible:ring-opacity-75 ${
                      !open && "rounded-b-lg"
                    }`}
                  >
                    <span>{policy?.title}</span>
                    {open ? (
                      <MinusCircleIcon
                        className={`${
                          open ? "transform rotate-180" : ""
                        } w-5 h-5 text-gray-500`}
                      />
                    ) : (
                      <PlusCircleIcon
                        className={`${
                          open ? "transform rotate-180" : ""
                        } w-5 h-5 text-gray-500`}
                      />
                    )}
                  </DisclosureButton>
                  <DisclosurePanel className="text-gray-700 border border-solid grid gap-3 p-3 rounded-b-lg">
                    {policy?.content.split("\n").map((line, index) => (
                      <p
                        key={index}
                      >
                        {line}
                      </p>
                    ))}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
