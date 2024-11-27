import { useRef, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { PlusIcon, TrashIcon } from "@heroicons/react/outline";
import { LocationData } from "../../../statics/datas/LocationData";
import HotelService from "../../../services/hotel/HotelService";
import RoomCard from "../../../components/admin/hotel/RoomCard";
import RoomCreate from "../../../components/admin/hotel/RoomCreate";

const locations = LocationData;
const HotelUpdate = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const cancelButtonRef = useRef();
  const [open, setOpen] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [defaultRoom, setDefaultRoom] = useState({
    roomType: "",
    pricePerNight: 1000000,
    maxGuests: 3,
    roomSize: 20,
    view: "",
    discount: 0,
    roomImage: "",
    bedType: [],
  });
  const [newImage, setNewImage] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [errors, setErrors] = useState({});
  const [hotel, setHotel] = useState({});
  const [oldData, setOldData] = useState({});
  const [refreshData, setRefreshData] = useState(false);
  //lưu dữ liệu mới của từng loại tiện nghi
  const [newAmenity, setNewAmenity] = useState({
    hotelAmenities: "",
    frontDeskServices: "",
    cleaningServices: "",
    entertainmentAndRecreation: "",
    outdoor: "",
    transportation: "",
  });
  //lưu error của từng loại tiện nghi
  const [amenitiesError, setAmenitiesError] = useState({
    hotelAmenities: "",
    frontDeskServices: "",
    cleaningServices: "",
    entertainmentAndRecreation: "",
    outdoor: "",
    transportation: "",
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

  const handleAddHotelAmenity = () => {
    if (!newAmenity.hotelAmenities) {
      setAmenitiesError({
        ...amenitiesError,
        hotelAmenities: "Không được để trống",
      });
      return;
    }
    if (hotel.amenities.hotelAmenities.includes(newAmenity.hotelAmenities)) {
      setAmenitiesError({
        ...amenitiesError,
        hotelAmenities: "Tiện nghi này đã tồn tại",
      });
      return;
    }
    setHotel({
      ...hotel,
      amenities: {
        ...hotel.amenities,
        hotelAmenities: [
          ...hotel.amenities.hotelAmenities,
          newAmenity.hotelAmenities,
        ],
      },
    });
    setNewAmenity({
      hotelAmenities: "",
    });
    setAmenitiesError({
      hotelAmenities: "",
    });
  };

  const handleAddFrontDeskService = () => {
    if (!newAmenity.frontDeskServices) {
      setAmenitiesError({
        ...amenitiesError,
        frontDeskServices: "Không được để trống",
      });
      return;
    }
    if (
      hotel.amenities.frontDeskServices.includes(newAmenity.frontDeskServices)
    ) {
      setAmenitiesError({
        ...amenitiesError,
        frontDeskServices: "Tiện nghi này đã tồn tại",
      });
      return;
    }
    setHotel({
      ...hotel,
      amenities: {
        ...hotel.amenities,
        frontDeskServices: [
          ...hotel.amenities.frontDeskServices,
          newAmenity.frontDeskServices,
        ],
      },
    });
    setNewAmenity({
      frontDeskServices: "",
    });
    setAmenitiesError({
      frontDeskServices: "",
    });
  };

  const handleAddCleaningService = () => {
    if (!newAmenity.cleaningServices) {
      setAmenitiesError({
        ...amenitiesError,
        cleaningServices: "Không được để trống",
      });
      return;
    }
    if (
      hotel.amenities.cleaningServices.includes(newAmenity.cleaningServices)
    ) {
      setAmenitiesError({
        ...amenitiesError,
        cleaningServices: "Tiện nghi này đã tồn tại",
      });
      return;
    }
    setHotel({
      ...hotel,
      amenities: {
        ...hotel.amenities,
        cleaningServices: [
          ...hotel.amenities.cleaningServices,
          newAmenity.cleaningServices,
        ],
      },
    });
    setNewAmenity({
      cleaningServices: "",
    });
    setAmenitiesError({
      cleaningServices: "",
    });
  };

  const handleAddEntertainmentService = () => {
    if (!newAmenity.entertainmentAndRecreation) {
      setAmenitiesError({
        ...amenitiesError,
        entertainmentAndRecreation: "Không được để trống",
      });
      return;
    }
    if (
      hotel.amenities.entertainmentAndRecreation.includes(
        newAmenity.entertainmentAndRecreation
      )
    ) {
      setAmenitiesError({
        ...amenitiesError,
        entertainmentAndRecreation: "Tiện nghi này đã tồn tại",
      });
      return;
    }
    setHotel({
      ...hotel,
      amenities: {
        ...hotel.amenities,
        entertainmentAndRecreation: [
          ...hotel.amenities.entertainmentAndRecreation,
          newAmenity.entertainmentAndRecreation,
        ],
      },
    });
    setNewAmenity({
      entertainmentAndRecreation: "",
    });
    setAmenitiesError({
      entertainmentAndRecreation: "",
    });
  };

  const handleAddOutdoorService = () => {
    if (!newAmenity.outdoor) {
      setAmenitiesError({
        ...amenitiesError,
        outdoor: "Không được để trống",
      });
      return;
    }
    if (hotel.amenities.outdoor.includes(newAmenity.outdoor)) {
      setAmenitiesError({
        ...amenitiesError,
        outdoor: "Tiện nghi này đã tồn tại",
      });
      return;
    }
    setHotel({
      ...hotel,
      amenities: {
        ...hotel.amenities,
        outdoor: [...hotel.amenities.outdoor, newAmenity.outdoor],
      },
    });
    setNewAmenity({
      outdoor: "",
    });
    setAmenitiesError({
      outdoor: "",
    });
  };

  const handleAddTransportationService = () => {
    if (!newAmenity.transportation) {
      setAmenitiesError({
        ...amenitiesError,
        transportation: "Không được để trống",
      });
      return;
    }
    if (hotel.amenities.transportation.includes(newAmenity.transportation)) {
      setAmenitiesError({
        ...amenitiesError,
        transportation: "Tiện nghi này đã tồn tại",
      });
      return;
    }
    setHotel({
      ...hotel,
      amenities: {
        ...hotel.amenities,
        transportation: [
          ...hotel.amenities.transportation,
          newAmenity.transportation,
        ],
      },
    });
    setNewAmenity({
      transportation: "",
    });
    setAmenitiesError({
      transportation: "",
    });
  };

  useEffect(() => {
    document.title = "Quản lý khách sạn";
    window.scrollTo(0, 0);
    const fetchHotel = async () => {
      try {
        const response = await HotelService.getHotelById(hotelId);
        if (response.status === 200) {
          setHotel(response.data);
          setOldData(response.data);
          document.title = `Cập nhật khách sạn ${response.data.hotelName}`;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchHotel();
  }, [refreshData]);

  useEffect(() => {
    if (hotel && hotel.amenities) {
      hotel.amenities.hotelAmenities = hotel.amenities.hotelAmenities || [];
      hotel.amenities.frontDeskServices =
        hotel.amenities.frontDeskServices || [];
      hotel.amenities.cleaningServices = hotel.amenities.cleaningServices || [];
      hotel.amenities.entertainmentAndRecreation =
        hotel.amenities.entertainmentAndRecreation || [];
      hotel.amenities.outdoor = hotel.amenities.outdoor || [];
      hotel.amenities.transportation = hotel.amenities.transportation || [];
    }
  }, [hotel.amenities]);

  const handleChangeBasic = async () => {
    try {
      //kiểm tra xem dữ liệu trong hotel đã khác với dữ liệu ban đầu chưa
      if (JSON.stringify(hotel) === JSON.stringify(oldData)) {
        return;
      }

      const response = await HotelService.updateHotel(hotel);
      if (response?.status === 200) {
        alert(
          `Cập nhật khách sạn thành công, mã hotel: ${response.data.hotelId}`
        );
        setRefreshData((prev) => !prev);
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

  const handleChangeAmenities = async () => {
    try {
      if (
        JSON.stringify(hotel.amenities) === JSON.stringify(oldData.amenities)
      ) {
        return;
      }
      const response = await HotelService.updateAmenitiesHotel(hotel);
      if (response?.status === 200) {
        alert(
          `Cập nhật tiện nghi thành công, mã hotel: ${response.data.hotelId}`
        );
        setRefreshData((prev) => !prev);
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

  const handleChangeDiscount = async () => {
    try {
      if (discount < 0 || discount > 60) {
        alert("Giảm giá phải từ 0 đến 60");
        return;
      }
      const data = {
        hotelId: hotelId,
        discount: discount,
      };
      const response = await HotelService.updateDiscountAllRoom(data);
      if (response?.status === 200) {
        alert("Cập nhật giảm giá thành công");
        setRefreshData((prev) => !prev);
        setDiscount(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <RoomCreate
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
        defaultRoom={defaultRoom}
        setDefaultRoom={setDefaultRoom}
        hotelId={hotelId}
        refreshData={refreshData}
        setRefreshData={setRefreshData}
      />
      <main className="flex-1">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Thay đổi thông tin khách sạn #{hotel?.hotelId}
            </h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* Replace with your content */}
            <div className="mt-6 grid lg:grid-cols-5 gap-3 lg:gap-5">
              <div className="lg:col-span-3 rounded-lg">
                <div className="">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    {/* Thông tin cơ bản */}
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
                        onClick={handleChangeBasic}
                      >
                        Lưu thay đổi
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
                            value={hotel.address?.houseNumber || ""}
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
                            value={hotel.address?.street}
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
                            value={hotel.address?.ward}
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
                            value={hotel.address?.district}
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
                            value={hotel.address?.city}
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
                    {/* nút lưu */}
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
                        onClick={handleChangeBasic}
                      >
                        Lưu thay đổi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Tiện nghi khách sạn */}
            <div className="mt-6 grid lg:grid-cols-6 gap-3 lg:gap-5 rounded-lg bg-white m-2">
              <h1 className="col-span-6 text-2xl font-semibold p-6">
                Các tiện nghi của khách sạn
              </h1>
              {/* Tiện nghi khách sạn cơ bản  */}
              <div className="col-span-6 lg:col-span-2 rounded-lg m-2">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                    <div className="grid xl:grid-cols-6 gap-3">
                      <div className="xl:col-span-2">
                        <label
                          htmlFor="serviceName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tiện nghi khách sạn cơ bản
                        </label>
                      </div>
                      <div className="xl:col-span-4">
                        <input
                          type="text"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          placeholder="Nhập tên dịch vụ"
                          value={newAmenity.hotelAmenities}
                          onChange={(e) =>
                            setNewAmenity({
                              hotelAmenities: e.target.value,
                            })
                          }
                        />
                        <span className="text-red-500 text-sm">
                          {amenitiesError.hotelAmenities}
                        </span>
                      </div>
                    </div>
                    <div className="xl:flex">
                      <button
                        type="button"
                        className="xl:ml-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        onClick={handleAddHotelAmenity}
                      >
                        Thêm dịch vụ
                        <PlusIcon
                          className="ml-2 -mr-1 h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <div>
                      <ul className="list-disc list-inside">
                        {hotel.amenities?.hotelAmenities?.map(
                          (service, index) => (
                            <li key={index}>
                              {service}
                              <span
                                className="text-red-500 cursor-pointer float-end"
                                onClick={() => {
                                  const updatedAmenities = [
                                    ...hotel.amenities.hotelAmenities,
                                  ];
                                  updatedAmenities.splice(index, 1);
                                  setHotel({
                                    ...hotel,
                                    amenities: {
                                      ...hotel.amenities,
                                      hotelAmenities: updatedAmenities,
                                    },
                                  });
                                }}
                              >
                                (Xóa)
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Tiện nghi dịch vụ lễ tân  */}
              <div className="col-span-6 lg:col-span-2 rounded-lg m-2">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                    <div className="grid xl:grid-cols-6 gap-3">
                      <div className="xl:col-span-2">
                        <label
                          htmlFor="serviceName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tiện nghi dịch vụ lễ tân
                        </label>
                      </div>
                      <div className="xl:col-span-4">
                        <input
                          type="text"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          placeholder="Nhập tên dịch vụ"
                          value={newAmenity.frontDeskServices}
                          onChange={(e) =>
                            setNewAmenity({
                              frontDeskServices: e.target.value,
                            })
                          }
                        />
                        <span className="text-red-500 text-sm">
                          {amenitiesError.frontDeskServices}
                        </span>
                      </div>
                    </div>
                    <div className="xl:flex">
                      <button
                        type="button"
                        className="xl:ml-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        onClick={handleAddFrontDeskService}
                      >
                        Thêm dịch vụ
                        <PlusIcon
                          className="ml-2 -mr-1 h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <div>
                      <ul className="list-disc list-inside">
                        {hotel.amenities?.frontDeskServices?.map(
                          (service, index) => (
                            <li key={index}>
                              {service}
                              <span
                                className="text-red-500 cursor-pointer float-end"
                                onClick={() => {
                                  const updatedAmenities = [
                                    ...hotel.amenities.frontDeskServices,
                                  ];
                                  updatedAmenities.splice(index, 1);
                                  setHotel({
                                    ...hotel,
                                    amenities: {
                                      ...hotel.amenities,
                                      frontDeskServices: updatedAmenities,
                                    },
                                  });
                                }}
                              >
                                (Xóa)
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Dịch vụ dọn dẹp  */}
              <div className="col-span-6 lg:col-span-2 rounded-lg m-2">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                    <div className="grid xl:grid-cols-6 gap-3">
                      <div className="xl:col-span-2">
                        <label
                          htmlFor="serviceName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Dịch vụ dọn dẹp
                        </label>
                      </div>
                      <div className="xl:col-span-4">
                        <input
                          type="text"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          placeholder="Nhập tên dịch vụ"
                          value={newAmenity.cleaningServices}
                          onChange={(e) =>
                            setNewAmenity({
                              cleaningServices: e.target.value,
                            })
                          }
                        />
                        <span className="text-red-500 text-sm">
                          {amenitiesError.cleaningServices}
                        </span>
                      </div>
                    </div>
                    <div className="xl:flex">
                      <button
                        type="button"
                        className="xl:ml-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        onClick={handleAddCleaningService}
                      >
                        Thêm dịch vụ
                        <PlusIcon
                          className="ml-2 -mr-1 h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <div>
                      <ul className="list-disc list-inside">
                        {hotel.amenities?.cleaningServices?.map(
                          (service, index) => (
                            <li key={index}>
                              {service}
                              <span
                                className="text-red-500 cursor-pointer float-end"
                                onClick={() => {
                                  const updatedAmenities = [
                                    ...hotel.amenities.cleaningServices,
                                  ];
                                  updatedAmenities.splice(index, 1);
                                  setHotel({
                                    ...hotel,
                                    amenities: {
                                      ...hotel.amenities,
                                      cleaningServices: updatedAmenities,
                                    },
                                  });
                                }}
                              >
                                (Xóa)
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Tiện nghi vui chơi giải trí  */}
              <div className="col-span-6 lg:col-span-2 rounded-lg m-2">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                    <div className="grid xl:grid-cols-6 gap-3">
                      <div className="xl:col-span-2">
                        <label
                          htmlFor="serviceName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tiện nghi vui chơi giải trí
                        </label>
                      </div>
                      <div className="xl:col-span-4">
                        <input
                          type="text"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          placeholder="Nhập tên dịch vụ"
                          value={newAmenity.entertainmentAndRecreation}
                          onChange={(e) =>
                            setNewAmenity({
                              entertainmentAndRecreation: e.target.value,
                            })
                          }
                        />
                        <span className="text-red-500 text-sm">
                          {amenitiesError.entertainmentAndRecreation}
                        </span>
                      </div>
                    </div>
                    <div className="xl:flex">
                      <button
                        type="button"
                        className="xl:ml-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        onClick={handleAddEntertainmentService}
                      >
                        Thêm dịch vụ
                        <PlusIcon
                          className="ml-2 -mr-1 h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <div>
                      <ul className="list-disc list-inside">
                        {hotel.amenities?.entertainmentAndRecreation?.map(
                          (service, index) => (
                            <li key={index}>
                              {service}
                              <span
                                className="text-red-500 cursor-pointer float-end"
                                onClick={() => {
                                  const updatedAmenities = [
                                    ...hotel.amenities
                                      .entertainmentAndRecreation,
                                  ];
                                  updatedAmenities.splice(index, 1);
                                  setHotel({
                                    ...hotel,
                                    amenities: {
                                      ...hotel.amenities,
                                      entertainmentAndRecreation:
                                        updatedAmenities,
                                    },
                                  });
                                }}
                              >
                                (Xóa)
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Tiện nghi ngoài trời  */}
              <div className="col-span-6 lg:col-span-2 rounded-lg m-2">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                    <div className="grid xl:grid-cols-6 gap-3">
                      <div className="xl:col-span-2">
                        <label
                          htmlFor="serviceName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tiện nghi ngoài trời
                        </label>
                      </div>
                      <div className="xl:col-span-4">
                        <input
                          type="text"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          placeholder="Nhập tên dịch vụ"
                          value={newAmenity.outdoor}
                          onChange={(e) =>
                            setNewAmenity({
                              outdoor: e.target.value,
                            })
                          }
                        />
                        <span className="text-red-500 text-sm">
                          {amenitiesError.outdoor}
                        </span>
                      </div>
                    </div>
                    <div className="xl:flex">
                      <button
                        type="button"
                        className="xl:ml-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        onClick={handleAddOutdoorService}
                      >
                        Thêm dịch vụ
                        <PlusIcon
                          className="ml-2 -mr-1 h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <div>
                      <ul className="list-disc list-inside">
                        {hotel.amenities?.outdoor?.map((service, index) => (
                          <li key={index}>
                            {service}
                            <span
                              className="text-red-500 cursor-pointer float-end"
                              onClick={() => {
                                const updatedAmenities = [
                                  ...hotel.amenities.outdoor,
                                ];
                                updatedAmenities.splice(index, 1);
                                setHotel({
                                  ...hotel,
                                  amenities: {
                                    ...hotel.amenities,
                                    outdoor: updatedAmenities,
                                  },
                                });
                              }}
                            >
                              (Xóa)
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Tiện nghi di chuyển  */}
              <div className="col-span-6 lg:col-span-2 rounded-lg m-2">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                    <div className="grid xl:grid-cols-6 gap-3">
                      <div className="xl:col-span-2">
                        <label
                          htmlFor="serviceName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tiện nghi di chuyển
                        </label>
                      </div>
                      <div className="xl:col-span-4">
                        <input
                          type="text"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          placeholder="Nhập tên dịch vụ"
                          value={newAmenity.transportation}
                          onChange={(e) =>
                            setNewAmenity({
                              transportation: e.target.value,
                            })
                          }
                        />
                        <span className="text-red-500 text-sm">
                          {amenitiesError.transportation}
                        </span>
                      </div>
                    </div>
                    <div className="xl:flex">
                      <button
                        type="button"
                        className="xl:ml-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        onClick={handleAddTransportationService}
                      >
                        Thêm dịch vụ
                        <PlusIcon
                          className="ml-2 -mr-1 h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <div>
                      <ul className="list-disc list-inside">
                        {hotel.amenities?.transportation?.map(
                          (service, index) => (
                            <li key={index}>
                              {service}
                              <span
                                className="text-red-500 cursor-pointer float-end"
                                onClick={() => {
                                  const updatedAmenities = [
                                    ...hotel.amenities.transportation,
                                  ];
                                  updatedAmenities.splice(index, 1);
                                  setHotel({
                                    ...hotel,
                                    amenities: {
                                      ...hotel.amenities,
                                      transportation: updatedAmenities,
                                    },
                                  });
                                }}
                              >
                                (Xóa)
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  onClick={handleChangeAmenities}
                >
                  Lưu thay đổi
                </button>
              </div>
            </div>
            {/* Danh sách loại phòng */}
            <div className="mt-6 grid lg:grid-cols-5 gap-3 lg:gap-5">
              <div className="lg:col-span-4 rounded-lg">
                <div className="">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    {/* Thông tin cơ bản */}
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <h1 className="text-2xl font-semibold my-3">
                        Danh sách loại phòng của khách sạn
                      </h1>
                    </div>
                    {/* nội dung */}
                    <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                      {hotel?.roomTypes?.length > 0 ? (
                        hotel?.roomTypes?.map((room, index) => (
                          <RoomCard
                            key={index}
                            props={room}
                            hotelId={hotel?.hotelId}
                          />
                        ))
                      ) : (
                        <h1 className="text-center text-xl font-semibold">
                          Không có loại phòng nào
                        </h1>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1 rounded-lg">
                <div className="shadow overflow-hidden sm:rounded-md">
                  {/* button tạo mới phòng */}
                  <div className="flex justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      onClick={() => setOpen(true)}
                    >
                      Tạo loại phòng mới
                    </button>
                  </div>
                </div>
                <div className="shadow overflow-hidden sm:rounded-md mt-3">
                  {/* button tạo mới phòng */}
                  <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                    <div className="grid gap-3">
                      <div className="col-span-2">
                        <label
                          htmlFor="discount"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phần trăm khuyến mãi{" "}
                          <span className="text-red-500 text-sm">
                            (Áp dụng cho tất cả các phòng)
                          </span>
                        </label>
                      </div>
                      <div className="col-span-4">
                        <input
                          type="number"
                          min="0"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  {/* button sửa phần trăm khuyến mãi */}
                  <div className="flex justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      onClick={handleChangeDiscount}
                    >
                      Sửa phần trăm khuyến mãi
                    </button>
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

export default HotelUpdate;
