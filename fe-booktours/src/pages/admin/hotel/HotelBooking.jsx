import React, { useRef, useEffect, useState } from "react";
import Pagination from "../../../components/admin/Pagination";
// import { Link, useParams } from "react-router-dom";
// import TourService from "../../../services/TourService";
import formatDateYYYYMMDD from "../../../utils/format-date-yyyymmdd";
import formatPrice from "../../../utils/format-price";
import { CSVLink } from "react-csv";
import { TableIcon } from "@heroicons/react/outline";
import HotelService from "../../../services/hotel/HotelService";
import DetailBookingView from "../../../components/admin/hotel/DetailBookingView";
//tìm kiếm đang lỗi luôn chán quá
const HotelBooking = () => {
  // const navigate = useNavigate();
  const cancelButtonRef = useRef();
  const [open, setOpen] = useState(false);
  const [bookHotel, setBookHotel] = useState([]);
  const [bookingStatus, setBookingStatus] = useState();
  const [selectedViewDetail, setSelectedViewDetail] = useState({});
  const [search, setSearch] = useState("");
  const [objectQuery, setObjectQuery] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    document.title = "Danh sách đặt khách sạn";
    window.scrollTo(0, 0);

    const fetchBooking = async () => {
      try {
        const response = await HotelService.getBookingByStatus(
          bookingStatus,
          objectQuery
        );
        if (response.status === 200) {
          document.title = `Danh sách đặt khách sạn`;
          setBookHotel(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooking();
  }, [bookingStatus, objectQuery.page]);

  const handleShowViewDetailBooking = (bookHotel) => () => {
    setSelectedViewDetail(bookHotel);
    setOpen(true);
  };

  const handleSearch = async () => {
    try {
      if (search === "") {
        alert("Vui lòng nhập mã booking");
        return;
      }
      console.log("Đã bấm tìm kiếm", search);
      const response = await HotelService.searchBooking(search);
      if (response.status === 200) {
        setBookHotel(response.data);
        console.log(response.data);
        if (response.data.length === 0) {
          alert("Không tìm thấy booking");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmBooking = async (bookingCode, statusCode) => {
    try {
      if (statusCode === 1) {
        const response = await HotelService.confirmBooking(bookingCode);
        if (response.status === 200) {
          // Cập nhật state để reflect việc xác nhận
          setBookHotel((prevState) => ({
            ...prevState,
            content: prevState.content.map((booking) =>
              booking.bookingCode === bookingCode
                ? { ...booking, confirmed: true }
                : booking
            ),
          }));
        }
      } else {
        const response = await HotelService.confirmCancelBooking(bookingCode);
        if (response.status === 200) {
          // Cập nhật state để reflect việc xác nhận
          setBookHotel((prevState) => ({
            ...prevState,
            content: prevState.content.map((booking) =>
              booking.bookingCode === bookingCode
                ? { ...booking, confirmed: true }
                : booking
            ),
          }));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {open && (
        <DetailBookingView
          open={open}
          setOpen={setOpen}
          cancelButtonRef={cancelButtonRef}
          bookHotel={selectedViewDetail}
        />
      )}
      <main className="flex-1">
        <div className="py-6 h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Thông tin đặt khách sạn
            </h1>
            <p className="text-gray-500 italic">
              Xem các thông tin đặt khách sạn từ khách hàng
            </p>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* Replace with your content */}
            <div className="py-4">
              {/* border-2 border-dashed border-gray-200 */}
              <div className="rounded-lg">
                {/* Filter */}
                <div className="mt-5 gap-5 md:flex">
                  <div className="md:mb-0 mb-3 flex gap-3">
                    {bookHotel?.length > 0 && (
                      <CSVLink
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        data={bookHotel?.map((bookHotel) => ({
                          "Số booking": bookHotel.bookingCode,
                          "Ngày đặt": formatDateYYYYMMDD(bookHotel.bookingDate),
                          "Email đặt": bookHotel.emailUser,
                          "Khách sạn": bookHotel.hotelName,
                          Phòng: bookHotel.roomType,
                          "Ngày nhận phòng": formatDateYYYYMMDD(
                            bookHotel.checkIn
                          ),
                          "Ngày trả phòng": formatDateYYYYMMDD(
                            bookHotel.checkOut
                          ),
                          "Yêu cầu đặc biệt":
                            bookHotel.specialRequest.length > 0
                              ? bookHotel.specialRequest.join(", ")
                              : "Không có yêu cầu",
                          "Tổng tiền": formatPrice(bookHotel.total),
                          "Trạng thái": bookHotel.status.statusName,
                        }))}
                        filename="danh-sach-dat-khach-san.csv"
                      >
                        <TableIcon
                          className="-ml-1 mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        Xuất danh sách(CSV)
                      </CSVLink>
                    )}
                  </div>
                  <div className="md:mb-0 mb-3 flex gap-3">
                    <div className="w-full max-w-sm min-w-[200px]">
                      <div className="relative flex items-center">
                        <div className="w-full max-w-sm min-w-[200px]">
                          <div className="relative">
                            <input
                              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                              placeholder="Nhập mã đặt phòng"
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                            />
                            <button
                              className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                              type="button"
                              onClick={handleSearch}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4 mr-2"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Tìm kiếm
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      {/* <select
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky500 focus:border-ssky00 sm:text-sm rounded-md"
                        //value={departureDate}
                        //onChange={(e) => setDepartureDate(e.target.value)}
                      >
                        {tour.departureDates?.sort().map((date, index) => (
                          <option key={index} value={date}>
                            {formatDateYYYYMMDD(date)}
                          </option>
                        ))}
                      </select> */}
                    </div>
                    <div>
                      <select
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky500 focus:border-ssky00 sm:text-sm rounded-md"
                        value={bookingStatus}
                        onChange={(e) => setBookingStatus(e.target.value)}
                      >
                        <option value="1">Đang chờ xác nhận</option>
                        <option value="3">Đã xác nhận</option>
                        <option value="2">Chờ xác nhận huỷ phòng</option>
                        <option value="4">Đã huỷ</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Số booking
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Ngày đặt
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Email đặt
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Ngày nhận phòng
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Ngày trả phòng
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Tổng tiền
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Chi tiết
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Xác nhận
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {bookHotel?.content?.map((bookHotel, index) => (
                              <tr
                                key={index}
                                className={
                                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }
                              >
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {bookHotel.bookingCode}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {formatDateYYYYMMDD(bookHotel.bookingDate)}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {bookHotel.emailUser}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {formatDateYYYYMMDD(bookHotel.checkIn)}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {formatDateYYYYMMDD(bookHotel.checkOut)}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {formatPrice(bookHotel.total)}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6"
                                    onClick={handleShowViewDetailBooking(
                                      bookHotel
                                    )}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                  </svg>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-center">
                                  {/* {!bookHotel.confirmed ? (
                                    <input
                                      type="checkbox"
                                      className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded"
                                      checked={bookHotel.confirmed}
                                      onChange={() =>
                                        handleConfirmBooking(
                                          bookHotel.bookingCode,
                                          bookHotel.status.statusCode
                                        )
                                      }
                                    />
                                  ) : (
                                    <div className="text-gray-500">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="green"
                                        className="size-6"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="m4.5 12.75 6 6 9-13.5"
                                        />
                                      </svg>
                                      Đã xác nhận
                                    </div>
                                  )} */}
                                  {bookHotel.status.statusCode === 1 ||
                                  bookHotel.status.statusCode === 2 ? (
                                    <input
                                      type="checkbox"
                                      className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded"
                                      checked={bookHotel.confirmed}
                                      onChange={() =>
                                        handleConfirmBooking(
                                          bookHotel.bookingCode,
                                          bookHotel.status.statusCode
                                        )
                                      }
                                    />
                                  ) : bookHotel.status.statusCode === 3 ? (
                                    <div className="text-gray-500">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="green"
                                        className="size-6"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M4.5 12.75l6 6 9-13.5"
                                        />
                                      </svg>
                                      Đã xác nhận
                                    </div>
                                  ) : (
                                    <div className="text-red-500">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="red"
                                        className="size-6"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M4.5 12.75l6 6 9-13.5"
                                        />
                                      </svg>
                                      Đã huỷ
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {bookHotel?.length === 0 && (
                          <div className="text-center py-4 text-gray-500 h-52">
                            Không có dữ liệu
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <Pagination
                  page={objectQuery.page}
                  limit={objectQuery.limit}
                  onNext={() => {
                    if (bookHotel?.content?.length === 10) {
                      setObjectQuery({
                        ...objectQuery,
                        page: objectQuery.page + 1,
                      });
                    }
                  }}
                  onPrevious={() => {
                    if (objectQuery.page > 1) {
                      setObjectQuery({
                        ...objectQuery,
                        page: objectQuery.page - 1,
                      });
                    }
                  }}
                />
              </div>
            </div>
            {/* /End replace */}
          </div>
        </div>
      </main>
    </>
  );
};

export default HotelBooking;
