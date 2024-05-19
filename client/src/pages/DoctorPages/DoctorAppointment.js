import React, { useEffect, useRef, useState } from "react";
import { FaRegUserCircle, FaRegCalendarPlus, FaHome } from "react-icons/fa";
import { LuCalendarDays, LuCalendarCheck } from "react-icons/lu";
import { RiServiceFill } from "react-icons/ri";
import { BsCash } from "react-icons/bs";

import { FiLogOut } from "react-icons/fi";
import { Button } from "flowbite-react";
const DoctorAppointment = () => {
  const [actived, setActived] = useState(2);
  const [passed, setPassed] = useState(false);

  return (
    <div className="">
      <div className="mx-16 text-gray-700 flex gap-10">
        <div className="my-7 w-full rounded-xl bg-white text-slate-600 shadow-lg shadow-violet-300 py-5 px-8">
          <div className="mb-5 h-10  grid grid-cols-5 gap-3 font-semibold">
            <p className="text-2xl col-span-1">Lịch khám</p>
            <div
              onClick={() => {
                setPassed(false);
              }}
              className={` ${
                !passed && "bg-white shadow-md shadow-violet-300"
              } col-start-4 rounded-lg text-center hover:bg-slate-50 cursor-pointer py-2 w-full h-full`}
            >
              SẮP TỚI
            </div>
            <div
              onClick={() => {
                setPassed(true);
              }}
              className={` ${
                passed && "bg-white shadow-md shadow-violet-300"
              } col-start-5 rounded-lg text-center hover:bg-slate-50 cursor-pointer py-2 w-full h-full`}
            >
              ĐÃ QUA
            </div>
          </div>

          <div className="w-full rounded-xl shadow-lg mb-5 border">
            <div className="p-1 rounded-t-xl bg-teal-200 w-full h-10 grid grid-cols-3 place-items-center">
              <div className="text-lg font-medium">8:30</div>
              <div className="text-lg font-medium flex gap-2 items-center">
                <FaRegCalendarPlus />
                <div>30/4/2024</div>
              </div>
              <div className="text-lg font-medium">Đã xác nhận</div>
            </div>
            <div className="p-5">
              <div className="flex gap-5">
                <img
                  className="h-14 w-14 rounded-full object-contain border border-lime-200"
                  alt=""
                  src={require("../../Images/doctorBackground2.jpg")}
                ></img>
                <div className="">
                  <p className="font-medium text-lg text-gray-600 mb-3">
                    BS. Từ Thị Hoàng Phượng - Chuyên khoa Tai Mũi Họng, Ung Bướu
                  </p>
                  <div className="flex gap-4 items-center mb-2">
                    <RiServiceFill className="h-5 w-5 text-red-500"></RiServiceFill>
                    <p className="">Trị liệu tâm lý</p>
                  </div>
                  <div className="flex gap-4 items-center mb-2">
                    <BsCash className="h-5 w-5 text-green-400"></BsCash>
                    <p className="">100000 VND</p>
                  </div>
                  <div className="flex gap-4 items-center mb-5">
                    <FaHome className="h-5 w-5 text-teal-600" />
                    <div className="">Khám tại nhà</div>
                  </div>
                </div>
              </div>
              <hr className="w-[98%] mx-auto border-[1px] border-lime-100 rounded-lg mb-5"></hr>
              <Button
                className="w-40 mx-auto rounded-2xl"
                gradientMonochrome="failure"
              >
                Hủy
              </Button>
            </div>
          </div>

          <div className="w-full rounded-xl shadow-lg mb-5 border">
            <div className="p-1 rounded-t-xl bg-teal-200 w-full h-10 grid grid-cols-3 place-items-center">
              <div className="text-lg font-medium">8:30</div>
              <div className="text-lg font-medium flex gap-2 items-center">
                <FaRegCalendarPlus />
                <div>30/4/2024</div>
              </div>
              <div className="text-lg font-medium">Đã xác nhận</div>
            </div>
            <div className="p-5">
              <div className="flex gap-5">
                <img
                  className="h-14 w-14 rounded-full object-contain border border-lime-200"
                  alt=""
                  src={require("../../Images/doctorBackground2.jpg")}
                ></img>
                <div className="">
                  <p className="font-medium text-lg text-gray-600 mb-3">
                    BS. Từ Thị Hoàng Phượng - Chuyên khoa Tai Mũi Họng, Ung Bướu
                  </p>
                  <div className="flex gap-4 items-center mb-2">
                    <RiServiceFill className="h-5 w-5 text-red-500"></RiServiceFill>
                    <p className="">Trị liệu tâm lý</p>
                  </div>
                  <div className="flex gap-4 items-center mb-2">
                    <BsCash className="h-5 w-5 text-green-400"></BsCash>
                    <p className="">100000 VND</p>
                  </div>
                  <div className="flex gap-4 items-center mb-5">
                    <FaHome className="h-5 w-5 text-teal-600" />
                    <div className="">Khám tại nhà</div>
                  </div>
                </div>
              </div>
              <hr className="w-[98%] mx-auto border-[1px] border-lime-100 rounded-lg mb-5"></hr>
              <Button
                className="w-40 mx-auto rounded-2xl"
                gradientMonochrome="failure"
              >
                Hủy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;
