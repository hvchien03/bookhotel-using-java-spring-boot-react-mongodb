import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HotelCard from "../../../components/admin/hotel/HotelCard";
import Pagination from "../../../components/admin/Pagination";
import {
  DatabaseIcon,
  ExclamationIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import { LocationData } from "../../../statics/datas/LocationData";
import TourCardSkeleton2 from "../../../components/TourCardSkeleton2";
import HotelService from "../../../services/hotel/HotelService";

const tourSkeletons = [
  TourCardSkeleton2,
  TourCardSkeleton2,
  TourCardSkeleton2,
  TourCardSkeleton2,
  TourCardSkeleton2,
  TourCardSkeleton2,
];
const locations = LocationData;

const HotelManagement = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [objectQuery, setObjectQuery] = useState({
    input: "",
    page: 1,
    limit: 6,
  });

  useEffect(() => {
    document.title = "Quản lý khách sạn";
    window.scrollTo(0, 0);
    setIsLoading(true);
    const fetchHotels = async () => {
      try {
        const response = await HotelService.getHotelsByCity(objectQuery);
        setHotels(response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHotels();
  }, [objectQuery]);
  return (
    <>
      <main className="flex-1">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Quản lý khách sạn
            </h1>
            <p className="text-gray-500 italic">
              Quản lý các khách sạn hiện hành
            </p>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* Replace with your content */}
            <div className="py-4">
              {/* border-2 border-dashed border-gray-200 */}
              <div className="rounded-lg">
                <div className="mt-5 gap-5 md:flex">
                  <div className="md:mb-0 mb-3 flex gap-3">
                    <Link to="/admin/hotel-create">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      >
                        <PlusIcon
                          className="-ml-1 mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        Thêm khách sạn
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      <DatabaseIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Sao lưu
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                    >
                      <DatabaseIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Phục hồi
                    </button>
                    <Link to="/admin/hotel-booking">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      >
                        Danh sách đặt khách sạn
                      </button>
                    </Link>
                  </div>
                  <div className="ml-auto md:flex gap-3">
                    <div className="my-auto">
                      <select
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
                        value={objectQuery.input}
                        onChange={(e) =>
                          setObjectQuery({
                            ...objectQuery,
                            input: e.target.value,
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
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                  {isLoading ? (
                    tourSkeletons?.map((item, index) => (
                      <div key={index}>
                        <div key={index}>{item()}</div>
                      </div>
                    ))
                  ) : hotels?.content?.length > 0 ? (
                    hotels?.content?.map((hotel, index) => (
                      <HotelCard key={index} hotel={hotel} />
                    ))
                  ) : (
                    <div className="text-center col-span-3">
                      <ExclamationIcon className="h-12 w-12 text-gray-400 mx-auto" />
                      <p className="mt-2 text-sm text-gray-500">
                        Không có khách sạn nào
                      </p>
                    </div>
                  )}
                </div>
                <Pagination
                  page={objectQuery.page}
                  limit={objectQuery.limit}
                  onNext={() => {
                    if (hotels?.content?.length === 6) {
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
export default HotelManagement;
