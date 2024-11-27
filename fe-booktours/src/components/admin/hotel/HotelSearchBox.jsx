import { SearchIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import HotelService from "../../../services/hotel/HotelService";

const HotelSearchBox = () => {
  const [searchData, setSearchData] = useState({
    locationOrName: "",
    checkInDate: new Date().toISOString().split("T")[0],
    numberDays: 1,
    roomAndPeople: {
      isOpen: false,
      numberRooms: 1,
      numberAdults: 1,
    },
    page: 1,
    limit: 5,
  });

  const handleSearch = async () => {
    try {
      if (searchData.locationOrName === "") {
        alert("Vui lòng nhập địa điểm hoặc tên khách sạn");
        return;
      }
      console.log("Dữ liệu tìm kiếm: ", searchData);
      const response = await HotelService.searchHotel(searchData);
      if (response.status === 200) {
        console.log("Dữ liệu tìm kiếm: ", response.data.content);
        if (response.data.content.length === 0) {
          alert("Không tìm thấy khách sạn nào");
        } else {
          //chuyển hướng
        }
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-5">
      <div className="flex gap-1">
        <img
          className="h-10 my-auto"
          src="/src/assets/img/general/logo-dark.svg"
          alt="Company name"
        />
        <span className="my-auto font-bold">
          Đặt phòng khách sạn trực tuyến giá rẻ
        </span>
      </div>
      <div className="mt-3 grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Địa điểm hoặc tên khách sạn
          </label>
          <div className="mt-1">
            <input
              type="text"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              placeholder="Nhập địa điểm hoặc tên khách sạn"
              value={searchData.locationOrName}
              onChange={(e) =>
                setSearchData({ ...searchData, locationOrName: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ngày nhận phòng
          </label>
          <div className="mt-1">
            <input
              type="date"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={searchData.checkInDate}
              onChange={(e) =>
                setSearchData({ ...searchData, checkInDate: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Số ngày thuê
          </label>
          <div className="mt-1">
            <input
              type="number"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={searchData.numberDays}
              min={1}
              onChange={(e) =>
                setSearchData({ ...searchData, numberDays: e.target.value })
              }
            />
          </div>
        </div>
        <div
          className="relative cursor-pointer"
          onClick={() =>
            setSearchData({
              ...searchData,
              roomAndPeople: {
                ...searchData.roomAndPeople,
                isOpen: !searchData.roomAndPeople.isOpen,
              },
            })
          }
        >
          <label
            className="cursor-pointer block text-sm font-medium text-gray-700"
            onClick={() =>
              setSearchData({
                ...searchData,
                roomAndPeople: {
                  ...searchData.roomAndPeople,
                  isOpen: !searchData.roomAndPeople.isOpen,
                },
              })
            }
          >
            Số phòng và khách
          </label>
          <div className="mt-1">
            <input
              type="text"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              placeholder="Nhập địa điểm hoặc tên khách sạn"
              value={`${searchData.roomAndPeople.numberRooms} phòng, ${searchData.roomAndPeople.numberAdults} người lớn`}
              disabled
            />
          </div>
          {searchData.roomAndPeople.isOpen && (
            <div className="absolute top-16 z-10 grid bg-white rounded-lg p-4 shadow w-full">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Số phòng
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    className="cursor-pointer appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    value={searchData.roomAndPeople.numberRooms}
                    min={1}
                    onChange={(e) =>
                      setSearchData({
                        ...searchData,
                        roomAndPeople: {
                          ...searchData.roomAndPeople,
                          numberRooms: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Số người lớn
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    className="cursor-pointer appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    value={searchData.roomAndPeople.numberAdults}
                    min={1}
                    onChange={(e) =>
                      setSearchData({
                        ...searchData,
                        roomAndPeople: {
                          ...searchData.roomAndPeople,
                          numberAdults: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex mt-3">
        <button
          className="ml-auto mt-auto mb-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          onClick={handleSearch}
        >
          <SearchIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default HotelSearchBox;
