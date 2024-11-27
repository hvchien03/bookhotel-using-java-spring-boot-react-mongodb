import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon, TrashIcon } from "@heroicons/react/outline";
import { LocationData } from "../../../statics/datas/LocationData";
import HotelService from "../../../services/hotel/HotelService";

const locations = LocationData;
const HotelCreate = () => {
  const navigate = useNavigate();
  const [newImage, setNewImage] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [errors, setErrors] = useState({});
  const [hotel, setHotel] = useState({
    hotelName: "",
    email: "",
    hotline: "",
    description: "",
    star: 1,
    address: {
      houseNumber: "",
      street: "",
      ward: "",
      district: "",
      city: "Hà Nội",
    },
    image: [],
    locationNearHotel: [],
  });

  const handleExits = () => {
    navigate(-1);
  };

  const handleAddLocation = () => {
    if (!newLocation) return;
    if (hotel.locationNearHotel.includes(newLocation)) {
      alert("Địa điểm này đã tồn tại");
      setNewLocation("");
      return;
    }
    setHotel((prevHotel) => ({
      ...prevHotel,
      locationNearHotel: [...prevHotel.locationNearHotel, newLocation],
    }));
    setNewLocation("");
  };

  const handleAddImage = () => {
    if (!newImage) return;
    if (hotel.image.includes(newImage)) {
      alert("Hình ảnh này đã tồn tại");
      setNewImage("");
      return;
    }
    setHotel({
      ...hotel,
      image: [...hotel.image, newImage],
    });
    setNewImage("");
    console.log(hotel.image);
  };

  useEffect(() => {
    document.title = "Quản lý khách sạn";
    window.scrollTo(0, 0);
  }, []);

  const handleChange = async () => {
    try {
      const response = await HotelService.createHotel(hotel);
      if (response?.status === 200) {
        alert(`Thêm khách sạn thành công, mã hotel: ${response.data}
              \nTrang sẽ được chuyển hướng trong giây lát`);
        // Chờ 2 giây trước khi chuyển hướng
        setTimeout(() => {
          navigate(`/admin/hotel-update/${response.data}`);
        }, 2000); // 2000ms = 2 giây
      } else {
        alert("Có lỗi xảy ra(" + response?.message + ")");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      <main className="flex-1">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Thêm khách sạn mới
            </h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* Replace with your content */}
            <div className="mt-6 grid lg:grid-cols-5 gap-3 lg:gap-5">
              <div className="lg:col-span-3 rounded-lg">
                <div className="">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <h1 className="text-2xl font-semibold my-3">
                        Thông tin cơ bản
                      </h1>
                      <div className="grid grid-cols-6 gap-6">
                        {/* HotelName */}
                        <div className="col-span-6">
                          <label
                            htmlFor="hotelName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tên khách sạn
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              placeholder={errors.hotelName}
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-red-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={hotel?.hotelName}
                              onChange={(e) =>
                                setHotel({
                                  ...hotel,
                                  hotelName: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        {/* email */}
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            email
                          </label>
                          <div className="mt-1">
                            <input
                              type="string"
                              placeholder={errors.email}
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-red-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={hotel?.email}
                              onChange={(e) =>
                                setHotel({ ...hotel, email: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        {/* hotline */}
                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            htmlFor="hotline"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Hotline
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              placeholder={errors.hotline}
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-red-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={hotel?.hotline}
                              onChange={(e) =>
                                setHotel({ ...hotel, hotline: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        {/* star */}
                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            htmlFor="star"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Hạng sao
                          </label>
                          <div className="mt-1">
                            <select
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={hotel?.star}
                              onChange={(e) =>
                                setHotel({ ...hotel, star: e.target.value })
                              }
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                            </select>
                          </div>
                        </div>
                        {/* mô tả */}
                        <div className="col-span-6">
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Mô tả
                          </label>

                          <div className="mt-1">
                            <textarea
                              placeholder={errors.description}
                              rows={4}
                              className="px-2 pt-2 shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border border-gray-300 rounded-md focus:outline-none"
                              value={hotel?.description}
                              onChange={(e) =>
                                setHotel({
                                  ...hotel,
                                  description: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                      <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-semibold">Các hình ảnh</h1>
                        {errors.image && (
                          <p className="text-red-500">{errors.image}</p>
                        )}
                      </div>
                      <div className="border border-solid h-52 rounded-lg overflow-y-auto p-3">
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                          {hotel?.image?.map((image, index) => (
                            <div key={index} className="relative">
                              <div
                                className="w-5 h-5 absolute top-1 right-1 cursor-pointer group"
                                onClick={() =>
                                  setHotel({
                                    ...hotel,
                                    image: hotel.image.filter(
                                      (item, i) => i !== index
                                    ),
                                  })
                                }
                              >
                                <TrashIcon className="text-sky-700 duration-300 group-hover:text-red-500" />
                              </div>
                              <img
                                src={image}
                                alt=""
                                className="object-cover h-20 w-full rounded-lg"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="grid gap-3">
                        <div className="">
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            placeholder="Nhập link hình ảnh"
                            value={newImage}
                            onChange={(e) => setNewImage(e.target.value)}
                          />
                        </div>

                        <div className="xl:flex">
                          <button
                            type="button"
                            className="xl:ml-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            onClick={handleAddImage}
                          >
                            Thêm hình ảnh
                            <PlusIcon
                              className="ml-2 -mr-1 h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="hidden lg:flex lg:justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        onClick={handleExits}
                      >
                        Quay lại
                      </button>
                      <button
                        type="submit"
                        className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        onClick={handleChange}
                      >
                        Thêm khách sạn
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Địa điểm gần khách sạn */}
              <div className="lg:col-span-2 rounded-lg">
                <div className="">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    {/* address */}
                    <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                      <h1 className="text-2xl font-semibold">
                        Địa chỉ khách sạn
                      </h1>
                      {/* số nhà */}
                      <div className="grid xl:grid-cols-6 gap-3">
                        <div className="xl:col-span-2 flex justify-start items-center">
                          <label
                            htmlFor="houseNumber"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Số nhà
                          </label>
                        </div>
                        <div className="xl:col-span-4">
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-red-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={hotel.address.houseNumber}
                            onChange={(e) =>
                              setHotel({
                                ...hotel,
                                address: {
                                  ...hotel.address,
                                  houseNumber: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                      {/* đường */}
                      <div className="grid xl:grid-cols-6 gap-3">
                        <div className="xl:col-span-2 flex justify-start items-center">
                          <label
                            htmlFor="street"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Đường
                          </label>
                        </div>
                        <div className="xl:col-span-4">
                          <input
                            type="text"
                            placeholder={errors["address.street"]}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-red-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={hotel.address.street}
                            onChange={(e) =>
                              setHotel({
                                ...hotel,
                                address: {
                                  ...hotel.address,
                                  street: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                      {/* phường xã */}
                      <div className="grid xl:grid-cols-6 gap-3">
                        <div className="xl:col-span-2 flex justify-start items-center">
                          <label
                            htmlFor="ward"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phường/Xã
                          </label>
                        </div>
                        <div className="xl:col-span-4">
                          <input
                            type="text"
                            placeholder={errors["address.ward"]}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-red-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={hotel.address.ward}
                            onChange={(e) =>
                              setHotel({
                                ...hotel,
                                address: {
                                  ...hotel.address,
                                  ward: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                      {/* quận huyện */}
                      <div className="grid xl:grid-cols-6 gap-3">
                        <div className="xl:col-span-2 flex justify-start items-center">
                          <label
                            htmlFor="district"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Quận/Huyện
                          </label>
                        </div>
                        <div className="xl:col-span-4">
                          <input
                            type="text"
                            placeholder={errors["address.district"]}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-red-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={hotel.address.district}
                            onChange={(e) =>
                              setHotel({
                                ...hotel,
                                address: {
                                  ...hotel.address,
                                  district: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                      {/* tỉnh thành phố */}
                      <div className="grid xl:grid-cols-6 gap-3">
                        <div className="xl:col-span-2 flex justify-start items-center">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tỉnh/Thành phố
                          </label>
                        </div>
                        <div className="xl:col-span-4">
                          <select
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
                            value={hotel.address.city}
                            onChange={(e) =>
                              setHotel({
                                ...hotel,
                                address: {
                                  ...hotel.address,
                                  city: e.target.value,
                                },
                              })
                            }
                          >
                            {locations.map((location, index) => (
                              <option key={index} value={location.locationName}>
                                {location.locationName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* locationNearHotel */}
                    <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                      <h1 className="text-2xl font-semibold">
                        Các địa điểm gần khách sạn
                      </h1>
                      <div className="grid gap-3">
                        <div className="">
                          <input
                            type="string"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-red-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={newLocation}
                            onChange={(e) => setNewLocation(e.target.value)}
                          />
                        </div>
                        <div className="xl:flex">
                          <button
                            type="button"
                            className="xl:ml-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            onClick={handleAddLocation}
                          >
                            Thêm địa điểm mới
                            <PlusIcon
                              className="ml-2 -mr-1 h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                      <div>
                        <ul className="list-disc list-inside">
                          {hotel?.locationNearHotel
                            ?.sort()
                            .map((item, index) => (
                              <li key={index}>
                                {item}
                                <span
                                  className="text-red-500 cursor-pointer float-end"
                                  onClick={() =>
                                    setHotel({
                                      ...hotel,
                                      locationNearHotel:
                                        hotel.locationNearHotel.filter(
                                          (item, i) => i !== index
                                        ),
                                    })
                                  }
                                >
                                  (Xóa)
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex justify-between lg:hidden px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        onClick={handleExits}
                      >
                        Quay lại
                      </button>
                      <button
                        type="submit"
                        className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        onClick={handleChange}
                      >
                        Thêm khách sạn
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /End replace */}
          </div>
        </div>
      </main>
    </>
  );
};

export default HotelCreate;
