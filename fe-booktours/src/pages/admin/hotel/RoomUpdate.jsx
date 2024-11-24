import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/outline";
import HotelService from "../../../services/hotel/HotelService";

const RoomUpdate = () => {
  const { hotelId, roomId } = useParams();
  const navigate = useNavigate();
  //   const cancelButtonRef = useRef();
  //   const [open, setOpen] = useState(false);
  //   const [discount, setDiscount] = useState(0);
  //   const [defaultRoom, setDefaultRoom] = useState({
  //     roomType: "",
  //     pricePerNight: 1000000,
  //     maxGuests: 3,
  //     roomSize: 20,
  //     view: "",
  //     discount: 0,
  //     roomImage: "",
  //     bedType: [],
  //   });
  const imgRef = useRef(null);
  const [newImage, setNewImage] = useState("");
  const [errors, setErrors] = useState({});
  const [room, setRoom] = useState({});
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

  //chưa preview được ảnh, chưa làm các tiện ích khác
  const handleShowNewImage = () => {
    if (!newImage) return;
    //kiểm tra xem link hình ảnh có hợp lệ không
    const tempImg = new Image();
    tempImg.onload = () => {
      if (imgRef.current) {
        imgRef.current.src = newImage;
      }
    };
    tempImg.onerror = () => {
      alert("Link hình ảnh không hợp lệ");
      setNewImage("");
    };
    tempImg.src = newImage;
    imgRef.current.src = newImage;
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
    const fetchRoom = async () => {
      try {
        const response = await HotelService.getRoomById(hotelId, roomId);
        if (response.status === 200) {
          setRoom(response.data);
          setOldData(response.data);
          console.log(response.data);
          document.title = `Cập nhật phòng ${response.data.roomType}`;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoom();
  }, [refreshData]);

  //   useEffect(() => {
  //     if (hotel && hotel.amenities) {
  //       hotel.amenities.hotelAmenities = hotel.amenities.hotelAmenities || [];
  //       hotel.amenities.frontDeskServices =
  //         hotel.amenities.frontDeskServices || [];
  //       hotel.amenities.cleaningServices = hotel.amenities.cleaningServices || [];
  //       hotel.amenities.entertainmentAndRecreation =
  //         hotel.amenities.entertainmentAndRecreation || [];
  //       hotel.amenities.outdoor = hotel.amenities.outdoor || [];
  //       hotel.amenities.transportation = hotel.amenities.transportation || [];
  //     }
  //   }, [hotel.amenities]);

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

  //   const handleChangeDiscount = async () => {
  //     try {
  //       if (discount < 0 || discount > 60) {
  //         alert("Giảm giá phải từ 0 đến 60");
  //         return;
  //       }
  //       const data = {
  //         hotelId: hotelId,
  //         discount: discount,
  //       };
  //       const response = await HotelService.updateDiscountAllRoom(data);
  //       if (response?.status === 200) {
  //         alert("Cập nhật giảm giá thành công");
  //         setRefreshData((prev) => !prev);
  //         setDiscount(0);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  return (
    <>
      <main className="flex-1">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Thay đổi thông tin phòng
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
                        {/* Tên loại phòng */}
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Loại phòng
                          </label>
                          <div className="mt-1">
                            <input
                              type="string"
                              placeholder={errors.roomType}
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-red-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={room?.roomType}
                              onChange={(e) =>
                                setRoom({ ...room, roomType: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        {/* giá */}
                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            htmlFor="hotline"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Giá ở 1 đêm (VND)
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              placeholder={errors.hotline}
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-red-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={room.pricePerNight}
                              onChange={(e) =>
                                setRoom({
                                  ...room,
                                  pricePerNight: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        {/* Khuyến mãi */}
                        <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                          <label
                            htmlFor="hotline"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Khuyến mãi %
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              placeholder={errors.hotline}
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-red-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={room.discount}
                              onChange={(e) =>
                                setRoom({
                                  ...room,
                                  discount: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        {/* kiểu giường */}
                        <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                          <label
                            htmlFor="hotline"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Kiểu giường
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              placeholder={errors.bedType}
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-red-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={room.bedType}
                              onChange={(e) =>
                                setRoom({
                                  ...room,
                                  bedType: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        {/* Số khách ở tối đa */}
                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            htmlFor="star"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Số khách ở tối đa
                          </label>
                          <div className="mt-1">
                            <select
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={room?.maxGuests}
                              onChange={(e) =>
                                setRoom({ ...room, maxGuests: e.target.value })
                              }
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                            </select>
                          </div>
                        </div>
                        {/* Diện tích */}
                        <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                          <label
                            htmlFor="hotline"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Diện tích (m²)
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              placeholder={errors.hotline}
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-red-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={room.roomSize}
                              onChange={(e) =>
                                setRoom({
                                  ...room,
                                  roomSize: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        {/* Đường dẫn hình ảnh */}
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="hotelName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Đường dẫn hình ảnh
                          </label>
                          <div className="mt-1">
                            <input
                              ref={imgRef}
                              type="text"
                              placeholder={"Nhập link hình ảnh"}
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={newImage}
                              onChange={(e) => setNewImage(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* nút xem trước ảnh */}
                        <div className="col-span-2">
                          <label
                            htmlFor="hotelName"
                            className="block text-sm font-medium text-white"
                          >
                            ẩn
                          </label>
                          <div className="mt-1">
                            <button
                              type="button"
                              className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                              onClick={handleShowNewImage}
                            >
                              Xem trước
                            </button>
                          </div>
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
              {/* Hình ảnh*/}
              <div className="lg:col-span-2 rounded-lg">
                <div className="">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    {/* address */}
                    <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                      <h1 className="text-2xl font-semibold">Hình ảnh</h1>
                      {errors.image && (
                        <p className="text-red-500">{errors.image}</p>
                      )}
                      <div className="grid xl:grid-cols-6 gap-3">
                        <div className="xl:col-span-6 border border-solid h-52 rounded-lg">
                          <img
                            src={room.roomImage}
                            alt=""
                            className="object-cover h-52 w-full rounded-lg"
                          />
                        </div>
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
                        {/* {hotel.amenities?.hotelAmenities?.map(
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
                        )} */}
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
                        {/* {hotel.amenities?.frontDeskServices?.map(
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
                        )} */}
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
                        {/* {hotel.amenities?.cleaningServices?.map(
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
                        )} */}
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
                        {/* {hotel.amenities?.entertainmentAndRecreation?.map(
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
                        )} */}
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
                        {/* {hotel.amenities?.outdoor?.map((service, index) => (
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
                        ))} */}
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
                        {/* {hotel.amenities?.transportation?.map(
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
                        )} */}
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
            {/* /End replace */}
          </div>
        </div>
      </main>
    </>
  );
};

export default RoomUpdate;
