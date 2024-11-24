import formatPrice from "../../../utils/format-price";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import imageDefault from "../../../assets/img/lists/hotel/imageDefault.png";
import AmenitiesView from "./AmenitiesView";

const RoomCard = ({ props, hotelId }) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef();
  const price =
    props?.pricePerNight - (props?.pricePerNight * props?.discount) / 100;

  return (
    <>
      <AmenitiesView
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
        amenities={props?.roomAmenities}
      />
      <div className="font-roboto border border-solid rounded-lg p-3 shadow-md group grid grid-cols-1 md:grid-cols-5 md:gap-1 gap-2">
        <div className="md:col-span-5 font-medium text-2xl text-black">
          {props?.roomType}
        </div>
        <div className="md:col-span-2 w-full h-40 md:h-full overflow-hidden rounded-lg my-auto">
          <img
            src={props?.roomImage || imageDefault}
            alt="Hình ảnh"
            srcSet=""
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="md:col-span-3 w-full px-3 mx-auto">
          <div className="flex mt-1 gap-1 sm:gap-32">
            <div className="flex text-base bg-gray-100 rounded-lg text-gray-500 pr-2 font-medium">
              <span className="m-auto">
                {props?.maxGuests} khách · {props?.bedType}
              </span>
            </div>
            <div className="ml-auto flex gap-1 items-center text-base bg-rose-400 rounded-lg text-white px-2 font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <span className="m-auto">
                {props?.roomSize} m<sup>2</sup>
              </span>
            </div>
          </div>
          <h3 className="mt-2 line-clamp-2 font-bold">Ưu đãi trong phòng</h3>
          <div className="mt-2 line-clamp-3 flex flex-wrap gap-6">
            {props?.preferential?.map((str, index) => (
              <div key={index} className="text-sm inline-flex gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="green"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
                {str}
              </div>
            ))}
          </div>
          <div className="flex">
            {<div className="mt-2">Chính sách</div>}

            <div
              className="ml-auto mt-2 inline-flex items-center"
              onClick={() => {
                setOpen(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="blue"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <p className="text-gray-600 font-bold text-sm ml-1">
                <span className="text-gray-500 font-normal">
                  Tiện ích phòng
                </span>
              </p>
            </div>
          </div>
          {/* <p className="mt-2 line-clamp-3 text-sm">props.tour?.description</p> */}
          <div className="flex gap-1 mt-2">
            <div className="line-through">
              {props.discount !== 0 && formatPrice(props?.pricePerNight)}
            </div>
            <div className="ml-auto inline-flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
              <span className="text-sky-700">{props?.view}</span>
            </div>
          </div>
          <div className="sm:flex mt-2">
            <div className="my-auto">
              <span className="text-3xl font-extrabold text-rose-600">
                {formatPrice(price)}
              </span>
              /đêm
            </div>
            {/* còn chỗ này */}
            <Link
              to={`/admin/hotel/${hotelId}/room-update/${props.roomId}`}
              className="ml-auto mt-2 sm:mt-auto sm:mb-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Chỉnh sửa
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomCard;
