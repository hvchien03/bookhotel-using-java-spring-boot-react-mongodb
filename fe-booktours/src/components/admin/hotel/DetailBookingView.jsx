import { Fragment } from "react";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
//chưa làm xong cái hiện thị chi tiết booking
const DetailBookingView = (props) => {
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
              <div className="float-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                  onClick={() => props.setOpen(false)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  {props.bookHotel.hotelName}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                  <p className="text-md font-semibold text-gray-800 mb-4">
                    {props.bookHotel.roomType}
                  </p>
                  <div className="text-sm text-gray-600 leading-7">
                    {props.bookHotel.paymentStatus}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <p className="text-sm font-semibold text-gray-800 mb-4">Yêu cầu đặc biệt</p>
                  <ul className="list-disc pl-5 text-sm">
                    {props.bookHotel.specialRequest.map((request, index) => (
                      <li key={index}>{request}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DetailBookingView;
