/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import defaultImage from "../../../assets/img/lists/hotel/imageDefault.png";

const HotelCard = (props) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg flex flex-col">
      <div className="relative group">
        <Link to={`/admin/hotel-update/${props.hotel.hotelId}`}>
          <img
            className="w-full h-56 object-cover"
            src={props.hotel.image[0]}
            onError={(e) => (e.target.src = defaultImage)}
            alt="Sunset in the mountains"
          />
          <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
        </Link>
        <Link to={`/admin/hotel-update/${props.hotel?.hotelId}`}>
          <div className="rounded-lg text-xs absolute top-0 right-0 bg-sky-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-sky-600 transition duration-500 ease-in-out">
            {props.hotel?.address?.city}
          </div>
        </Link>
      </div>
      <div className="px-6 py-4 mb-auto">
        <Link
          to={`/admin/hotel-update/${props.hotel?.hotelId}`}
          className="font-medium line-clamp-2 text-lg inline-block hover:text-sky-600 transition duration-500 ease-in-out mb-2"
        >
          {props.hotel?.hotelName}
        </Link>
        <p className="flex text-gray-500 line-clamp-2 text-sm justify-start items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>

          <p className="w-3/4">{props.hotel?.email}</p>
        </p>
        <p className="flex text-gray-500 line-clamp-2 text-sm justify-start items-center gap-3">
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
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </svg>

          <pc className="w-3/4">{props.hotel?.hotline}</pc>
        </p>
      </div>
      <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
        <span
          to="/tour-detail"
          className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
        >
          {Array.from({ length: props.hotel?.star }).map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="gold"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </span>
      </div>
    </div>
  );
};

export default HotelCard;
