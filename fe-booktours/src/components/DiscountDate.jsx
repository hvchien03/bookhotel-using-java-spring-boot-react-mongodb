import React from "react";
import formatDateYYYYMMDD from "../utils/format-date-yyyymmdd";

const DiscountDate = (props) => {
  return (
    <div className="grid grid-cols-6 gap-6">
      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="discountName"
          className="block text-sm font-medium text-gray-700"
        >
          Tên giảm giá
        </label>
        <div className="mt-1">
          <input
            type="text"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            value={props.tour?.discount?.discountName}
            onChange={(e) => {
              props.setTour({
                ...props.tour,
                discount: {
                  ...props.tour.discount,
                  discountName: e.target.value,
                },
              });
            }}
          />
          {props.tour?.discount?.discountName === "" && (
            <span className="text-red-500 text-sm">Tên giảm giá không được để trống</span>
          )}
        </div>
      </div>
      <div className="col-span-2">
        <label
          htmlFor="maxPeople"
          className="block text-sm font-medium text-gray-700"
        >
          Giảm giá(%)
        </label>
        <div className="mt-1">
          <input
            type="number"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            value={props.tour?.discount?.percentDiscount}
            onChange={(e) => {
              if (e.target.value >= 1 && e.target.value <= 100) {
                props.setTour({
                  ...props.tour,
                  discount: {
                    ...props.tour.discount,
                    percentDiscount: e.target.value,
                  },
                });
              }
            }}
          />
        </div>
      </div>
      <div className="col-span-6">
        <label
          htmlFor="country"
          className="block text-sm font-medium text-gray-700"
        >
          Mô tả
        </label>
        <div className="mt-1">
          <div className="mt-1">
            <input
              type="text"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={props.tour?.discount?.description}
              onChange={(e) => {
                props.setTour({
                  ...props.tour,
                  discount: {
                    ...props.tour.discount,
                    description: e.target.value,
                  },
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-span-6">
        <ul>
          {props.tour?.departureDates
            ?.filter((date) => {
              return (
                new Date(date) > new Date() &&
                !props.tour?.discount?.departureDates?.includes(date)
              );
            })
            .sort()
            .map((date, index) => (
              <li key={index}>
                {formatDateYYYYMMDD(date)}(
                <span
                  className="cursor-pointer text-teal-500"
                  onClick={() => {
                    props.setTour({
                      ...props.tour,
                      discount: {
                        ...props.tour?.discount,
                        departureDates: [
                          ...props.tour?.discount?.departureDates,
                          date,
                        ],
                      },
                    });
                  }}
                >
                  Thêm ngày
                </span>
                )
              </li>
            ))}
        </ul>
      </div>
      <div className="col-span-6">
        <ul>
          {props.tour?.discount?.departureDates?.sort().map((date, index) => (
            <li key={index}>
              {formatDateYYYYMMDD(date)}(
              <span
                className="cursor-pointer text-red-500"
                onClick={() => {
                  props.setTour({
                    ...props.tour,
                    discount: {
                      ...props.tour.discount,
                      departureDates: props.tour.discount.departureDates.filter(
                        (d) => d !== date
                      ),
                    },
                  });
                }}
              >
                Gỡ bỏ
              </span>
              )
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiscountDate;