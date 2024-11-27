import { Fragment, useState } from "react";
import {
  Dialog,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import HotelService from "../../../services/hotel/HotelService";

const RoomCreate = (props) => {
  const navigate = useNavigate();
  const [defaultRoomError, setDefaultRoomError] = useState({});

  const handleCreate = async () => {
    try {
      const response = await HotelService.addRoom({
        hotelId: props.hotelId,
        room: props.defaultRoom,
      });
      if (response.status === 200) {
        //navigate(`/admin/tour-update/${response?.data}`); //chỗ này chưa tạo trang update room
        alert("Thêm loại phòng thành công");
        setDefaultRoomError({});
        props.setOpen(false);
        props.setRefreshData(!props.refreshData);
      }
    } catch (error) {
      console.error(error);
      setDefaultRoomError(error.response?.data);
      console.log(error.response?.data);
    }
  };
  return (
    <Transition show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed  inset-0 overflow-y-auto"
        initialFocus={props.cancelButtonRef}
        onClose={() => props.setOpen(false)}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          </TransitionChild>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
                  <PlusIcon
                    className="h-6 w-6 text-sky-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Thêm loại phòng mới
                  </DialogTitle>
                  <div className="mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Loại phòng */}
                      <div className="md:col-span-2">
                        <label
                          htmlFor="tourName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Loại phòng
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            placeholder="Nhập tên loại phòng"
                            value={props.defaultRoom.roomType}
                            onChange={(e) =>
                              props.setDefaultRoom({
                                ...props.defaultRoom,
                                roomType: e.target.value,
                              })
                            }
                          />
                          <span className="text-red-500 text-sm">
                            {defaultRoomError?.roomType}
                          </span>
                        </div>
                      </div>
                      {/* view */}
                      <div className="md:col-span-2">
                        <label
                          htmlFor="tourName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Hướng phòng
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            placeholder="Nhập hướng phòng"
                            value={props.defaultRoom.view}
                            onChange={(e) =>
                              props.setDefaultRoom({
                                ...props.defaultRoom,
                                view: e.target.value,
                              })
                            }
                          />
                          <span className="text-red-500 text-sm">
                            {defaultRoomError?.view}
                          </span>
                        </div>
                      </div>
                      {/* loại giường */}
                      <div className="md:col-span-2">
                        <label
                          htmlFor="tourName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Loại giường
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            placeholder="Nhập loại giường"
                            value={props.defaultRoom.bedType}
                            onChange={(e) =>
                              props.setDefaultRoom({
                                ...props.defaultRoom,
                                bedType: e.target.value,
                              })
                            }
                          />
                          <span className="text-red-500 text-sm">
                            {defaultRoomError?.bedType}
                          </span>
                        </div>
                      </div>
                      {/* giảm giá */}
                      <div className="md:col-span-2">
                        <label
                          htmlFor="tourName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phần trăm giảm giá
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            min="0"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            placeholder="Nhập phần trăm giảm giá"
                            value={props.defaultRoom.discount}
                            onChange={(e) =>
                              props.setDefaultRoom({
                                ...props.defaultRoom,
                                discount: e.target.value,
                              })
                            }
                          />
                          <span className="text-red-500 text-sm">
                            {defaultRoomError?.discount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <div className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Giá */}
                      <div className="md:col-span-2">
                        <label
                          htmlFor="tourName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Giá ở 1 đêm
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            min={100000}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            placeholder="Nhập giá"
                            value={props.defaultRoom.pricePerNight}
                            onChange={(e) =>
                              props.setDefaultRoom({
                                ...props.defaultRoom,
                                pricePerNight: e.target.value,
                              })
                            }
                          />
                          <span className="text-red-500 text-sm">
                            {defaultRoomError?.pricePerNight}
                          </span>
                        </div>
                      </div>
                      {/* Diện tích phòng */}
                      <div className="md:col-span-2">
                        <label
                          htmlFor="tourName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Diện tích
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            min={10}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            placeholder="Nhập diện tích phòng"
                            value={props.defaultRoom.roomSize}
                            onChange={(e) =>
                              props.setDefaultRoom({
                                ...props.defaultRoom,
                                roomSize: e.target.value,
                              })
                            }
                          />
                          <span className="text-red-500 text-sm">
                            {defaultRoomError?.roomSize}
                          </span>
                        </div>
                      </div>
                      {/* Số khách ở */}
                      <div className="md:col-span-2">
                        <label
                          htmlFor="tourName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Số khách ở
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            min={1}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            placeholder="Nhập số khách có thể ở"
                            value={props.defaultRoom.maxGuests}
                            onChange={(e) =>
                              props.setDefaultRoom({
                                ...props.defaultRoom,
                                maxGuests: e.target.value,
                              })
                            }
                          />
                          <span className="text-red-500 text-sm">
                            {defaultRoomError?.maxGuests}
                          </span>
                        </div>
                      </div>
                      {/* Hình ảnh */}
                      <div className="md:col-span-2">
                        <label
                          htmlFor="tourName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Hình ảnh
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            placeholder="Nhập hình ảnh"
                            value={props.defaultRoom.roomImage}
                            onChange={(e) =>
                              props.setDefaultRoom({
                                ...props.defaultRoom,
                                roomImage: e.target.value,
                              })
                            }
                          />
                          <span className="text-red-500 text-sm">
                            {defaultRoomError?.roomImage}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:w-auto sm:text-sm"
                  onClick={handleCreate}
                >
                  Thêm loại phòng
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => props.setOpen(false)}
                  ref={props.cancelButtonRef}
                >
                  Hủy
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RoomCreate;
