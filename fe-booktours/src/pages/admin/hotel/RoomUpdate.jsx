import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/outline";
import HotelService from "../../../services/hotel/HotelService";

const RoomUpdate = () => {
  const { hotelId, roomId } = useParams();
  const navigate = useNavigate();
  const imgRef = useRef();
  const [newImage, setNewImage] = useState("");
  const [errors, setErrors] = useState({});
  const [room, setRoom] = useState({});
  const [oldData, setOldData] = useState({});
  const [refreshData, setRefreshData] = useState(false);
  //lưu dữ liệu mới của từng loại tiện nghi
  const [newAmenity, setNewAmenity] = useState({
    preferential: "",
    bathroom: "",
    safety: "",
    entertainment: "",
    foodAndBeverage: "",
    furniture: "",
  });
  //lưu error của từng loại tiện nghi
  const [amenitiesError, setAmenitiesError] = useState({
    preferential: "",
    bathroom: "",
    safety: "",
    entertainment: "",
    foodAndBeverage: "",
    furniture: "",
  });

  const handleExits = () => {
    navigate(-1);
  };
  //xong hàm này
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
      imgRef.current.src = room.roomImage;
    };
    tempImg.src = newImage;
    setRoom({ ...room, roomImage: newImage });
  };
  //xong hàm này
  const handleAddPreferential = () => {
    if (!newAmenity.preferential) {
      setAmenitiesError({
        ...amenitiesError,
        preferential: "Không được để trống",
      });
      return;
    }
    if (!room.preferential) {
      room.preferential = [];
    }
    if (room.preferential.includes(newAmenity.preferential)) {
      setAmenitiesError({
        ...amenitiesError,
        preferential: "Ưu đãi này đã tồn tại",
      });
      return;
    }
    setRoom({
      ...room,
      preferential: [...room.preferential, newAmenity.preferential],
    });
    setNewAmenity({
      preferential: "",
    });
    setAmenitiesError({
      preferential: "",
    });
  };
  //xong hàm này
  const handleAddRoomAmenities = (type) => {
    return () => {
      if (!newAmenity[type]) {
        setAmenitiesError({
          ...amenitiesError,
          [type]: "Không được để trống",
        });
        return;
      }
      if (!room.roomAmenities) {
        room.roomAmenities = {};
      }
      if (!room.roomAmenities[type]) {
        room.roomAmenities[type] = [];
      }
      if (room.roomAmenities[type].includes(newAmenity[type])) {
        setAmenitiesError({
          ...amenitiesError,
          [type]: "Tiện nghi này đã tồn tại",
        });
        return;
      }
      setRoom({
        ...room,
        roomAmenities: {
          ...room.roomAmenities,
          [type]: [...room.roomAmenities[type], newAmenity[type]],
        },
      });
      setNewAmenity({
        [type]: "",
      });
      setAmenitiesError({
        [type]: "",
      });
    };
  };
  //xong hàm này
  useEffect(() => {
    document.title = "Quản lý khách sạn";
    window.scrollTo(0, 0);
    const fetchRoom = async () => {
      try {
        const response = await HotelService.getRoomById(hotelId, roomId);
        if (response.status === 200) {
          setRoom(response.data);
          setOldData(response.data);
          document.title = `Cập nhật phòng ${response.data.roomType}`;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoom();
  }, [refreshData]);
  //xong hàm này
  useEffect(() => {
    if (room && room.roomAmenities) {
      room.roomAmenities.bathroom = room.roomAmenities.bathroom || [];
      room.roomAmenities.safety = room.roomAmenities.safety || [];
      room.roomAmenities.entertainment = room.roomAmenities.entertainment || [];
      room.roomAmenities.foodAndBeverage =
        room.roomAmenities.foodAndBeverage || [];
      room.roomAmenities.furniture = room.roomAmenities.furniture || [];
    }
  }, [room.roomAmenities]);

  //xong hàm này
  const handleChangeBasic = async () => {
    try {
      //kiểm tra xem dữ liệu trong room đã khác với dữ liệu ban đầu chưa
      if (JSON.stringify(room) === JSON.stringify(oldData)) {
        return;
      }

      const response = await HotelService.updateBasicRoom(hotelId, room);
      if (response?.status === 200) {
        alert(`Cập nhật phòng thành công, mã phòng: ${response.data}`);
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
        JSON.stringify(room.roomAmenities) ===
          JSON.stringify(oldData.roomAmenities) &&
        JSON.stringify(room.preferential) ===
          JSON.stringify(oldData.preferential)
      ) {
        return;
      }
      const response = await HotelService.updateRoomamenitiesPreferential(
        hotelId,
        room
      );
      if (response?.status === 200) {
        alert(`Cập nhật tiện nghi thành công, mã hotel: ${response.data}`);
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
                            htmlFor="pricePerNight"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Giá ở 1 đêm (VND)
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              placeholder={errors.pricePerNight}
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
                            htmlFor="discount"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Khuyến mãi %
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              min={0}
                              placeholder={errors.discount}
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
                            htmlFor="roomSize"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Diện tích (m²)
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              placeholder={errors.roomSize}
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
                        {/* hướng */}
                        <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                          <label
                            htmlFor="view"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Hướng nhìn của phòng
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              placeholder={errors.view}
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-red-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={room.view}
                              onChange={(e) =>
                                setRoom({
                                  ...room,
                                  view: e.target.value,
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
                    {/* ảnh */}
                    <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                      <h1 className="text-2xl font-semibold">Hình ảnh</h1>
                      {errors.image && (
                        <p className="text-red-500">{errors.image}</p>
                      )}
                      <div className="grid xl:grid-cols-6 gap-3">
                        <div className="xl:col-span-6 border border-solid h-52 rounded-lg">
                          <img
                            ref={imgRef}
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
                Các tiện nghi, ưu đãi của phòng
              </h1>
              {/* Ưu đãi phòng  */}
              <div className="col-span-6 lg:col-span-2 rounded-lg m-2">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                    <div className="grid xl:grid-cols-6 gap-3">
                      <div className="xl:col-span-2">
                        <label
                          htmlFor="serviceName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Ưu đãi
                        </label>
                      </div>
                      <div className="xl:col-span-4">
                        <input
                          type="text"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          placeholder="Nhập tên dịch vụ"
                          value={newAmenity.preferential}
                          onChange={(e) =>
                            setNewAmenity({
                              preferential: e.target.value,
                            })
                          }
                        />
                        <span className="text-red-500 text-sm">
                          {amenitiesError.preferential}
                        </span>
                      </div>
                    </div>
                    <div className="xl:flex">
                      <button
                        type="button"
                        className="xl:ml-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        onClick={handleAddPreferential}
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
                        {room.preferential?.map((service, index) => (
                          <li key={index}>
                            {service}
                            <span
                              className="text-red-500 cursor-pointer float-end"
                              onClick={() => {
                                const updatedAmenities = [...room.preferential];
                                updatedAmenities.splice(index, 1);
                                setRoom({
                                  ...room,
                                  preferential: updatedAmenities,
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
              {/* Phòng tắm và vật dụng phòng tắm  */}
              <div className="col-span-6 lg:col-span-2 rounded-lg m-2">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                    <div className="grid xl:grid-cols-6 gap-3">
                      <div className="xl:col-span-2">
                        <label
                          htmlFor="serviceName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phòng tắm và vật dụng phòng tắm
                        </label>
                      </div>
                      <div className="xl:col-span-4">
                        <input
                          type="text"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          placeholder="Nhập tên dịch vụ"
                          value={newAmenity.bathroom}
                          onChange={(e) =>
                            setNewAmenity({
                              bathroom: e.target.value,
                            })
                          }
                        />
                        <span className="text-red-500 text-sm">
                          {amenitiesError.bathroom}
                        </span>
                      </div>
                    </div>
                    <div className="xl:flex">
                      <button
                        type="button"
                        className="xl:ml-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        onClick={handleAddRoomAmenities("bathroom")}
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
                        {room.roomAmenities?.bathroom?.map((service, index) => (
                          <li key={index}>
                            {service}
                            <span
                              className="text-red-500 cursor-pointer float-end"
                              onClick={() => {
                                const updatedAmenities = [
                                  ...room.roomAmenities.bathroom,
                                ];
                                updatedAmenities.splice(index, 1);
                                setRoom({
                                  ...room,
                                  roomAmenities: {
                                    ...room.roomAmenities,
                                    bathroom: updatedAmenities,
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
              {/* Vật dụng an toàn, an ninh */}
              <div className="col-span-6 lg:col-span-2 rounded-lg m-2">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                    <div className="grid xl:grid-cols-6 gap-3">
                      <div className="xl:col-span-2">
                        <label
                          htmlFor="serviceName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Vật dụng an toàn, an ninh
                        </label>
                      </div>
                      <div className="xl:col-span-4">
                        <input
                          type="text"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          placeholder="Nhập tên dịch vụ"
                          value={newAmenity.safety}
                          onChange={(e) =>
                            setNewAmenity({
                              safety: e.target.value,
                            })
                          }
                        />
                        <span className="text-red-500 text-sm">
                          {amenitiesError.safety}
                        </span>
                      </div>
                    </div>
                    <div className="xl:flex">
                      <button
                        type="button"
                        className="xl:ml-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        onClick={handleAddRoomAmenities("safety")}
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
                        {room.roomAmenities?.safety?.map((service, index) => (
                          <li key={index}>
                            {service}
                            <span
                              className="text-red-500 cursor-pointer float-end"
                              onClick={() => {
                                const updatedAmenities = [
                                  ...room.roomAmenities.safety,
                                ];
                                updatedAmenities.splice(index, 1);
                                setRoom({
                                  ...room,
                                  roomAmenities: {
                                    ...room.roomAmenities,
                                    safety: updatedAmenities,
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
                          Vui chơi giải trí
                        </label>
                      </div>
                      <div className="xl:col-span-4">
                        <input
                          type="text"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          placeholder="Nhập tên dịch vụ"
                          value={newAmenity.entertainment}
                          onChange={(e) =>
                            setNewAmenity({
                              entertainment: e.target.value,
                            })
                          }
                        />
                        <span className="text-red-500 text-sm">
                          {amenitiesError.entertainment}
                        </span>
                      </div>
                    </div>
                    <div className="xl:flex">
                      <button
                        type="button"
                        className="xl:ml-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        onClick={handleAddRoomAmenities("entertainment")}
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
                        {room.roomAmenities?.entertainment?.map(
                          (service, index) => (
                            <li key={index}>
                              {service}
                              <span
                                className="text-red-500 cursor-pointer float-end"
                                onClick={() => {
                                  const updatedAmenities = [
                                    ...room.roomAmenities.entertainment,
                                  ];
                                  updatedAmenities.splice(index, 1);
                                  setRoom({
                                    ...room,
                                    roomAmenities: {
                                      ...room.roomAmenities,
                                      entertainment: updatedAmenities,
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
              {/* Ăn uống  */}
              <div className="col-span-6 lg:col-span-2 rounded-lg m-2">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                    <div className="grid xl:grid-cols-6 gap-3">
                      <div className="xl:col-span-2">
                        <label
                          htmlFor="serviceName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Ăn uống
                        </label>
                      </div>
                      <div className="xl:col-span-4">
                        <input
                          type="text"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          placeholder="Nhập tên dịch vụ"
                          value={newAmenity.foodAndBeverage}
                          onChange={(e) =>
                            setNewAmenity({
                              foodAndBeverage: e.target.value,
                            })
                          }
                        />
                        <span className="text-red-500 text-sm">
                          {amenitiesError.foodAndBeverage}
                        </span>
                      </div>
                    </div>
                    <div className="xl:flex">
                      <button
                        type="button"
                        className="xl:ml-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        onClick={handleAddRoomAmenities("foodAndBeverage")}
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
                        {room.roomAmenities?.foodAndBeverage?.map(
                          (service, index) => (
                            <li key={index}>
                              {service}
                              <span
                                className="text-red-500 cursor-pointer float-end"
                                onClick={() => {
                                  const updatedAmenities = [
                                    ...room.roomAmenities.foodAndBeverage,
                                  ];
                                  updatedAmenities.splice(index, 1);
                                  setRoom({
                                    ...room,
                                    roomAmenities: {
                                      ...room.roomAmenities,
                                      foodAndBeverage: updatedAmenities,
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
              {/* Bố trí, nội thất  */}
              <div className="col-span-6 lg:col-span-2 rounded-lg m-2">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                    <div className="grid xl:grid-cols-6 gap-3">
                      <div className="xl:col-span-2">
                        <label
                          htmlFor="serviceName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Bố trí, nội thất
                        </label>
                      </div>
                      <div className="xl:col-span-4">
                        <input
                          type="text"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          placeholder="Nhập tên dịch vụ"
                          value={newAmenity.furniture}
                          onChange={(e) =>
                            setNewAmenity({
                              furniture: e.target.value,
                            })
                          }
                        />
                        <span className="text-red-500 text-sm">
                          {amenitiesError.furniture}
                        </span>
                      </div>
                    </div>
                    <div className="xl:flex">
                      <button
                        type="button"
                        className="xl:ml-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        onClick={handleAddRoomAmenities("furniture")}
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
                        {room.roomAmenities?.furniture?.map(
                          (service, index) => (
                            <li key={index}>
                              {service}
                              <span
                                className="text-red-500 cursor-pointer float-end"
                                onClick={() => {
                                  const updatedAmenities = [
                                    ...room.roomAmenities.furniture,
                                  ];
                                  updatedAmenities.splice(index, 1);
                                  setRoom({
                                    ...room,
                                    roomAmenities: {
                                      ...room.roomAmenities,
                                      furniture: updatedAmenities,
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
            {/* /End replace */}
          </div>
        </div>
      </main>
    </>
  );
};

export default RoomUpdate;
