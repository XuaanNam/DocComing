import React, { useEffect, useRef, useState } from "react";
import { FaRegUserCircle, FaRegCalendarPlus, FaHome } from "react-icons/fa";
import { LuCalendarDays, LuCalendarCheck } from "react-icons/lu";
import { RiServiceFill } from "react-icons/ri";
import { BsCash } from "react-icons/bs";

import { FiLogOut } from "react-icons/fi";
import { Button } from "flowbite-react";
const Appointment = () => {
  const [actived, setActived] = useState(2);
  const [passed, setPassed] = useState(false);

  return (
    <div className="bg-lime-50 pt-[90px]">
      <div className="mx-16 text-gray-700 flex gap-10">
        <div className="my-7 w-1/5 h-48 bg-white rounded-lg shadow-xl">
          <div
            onClick={() => setActived(1)}
            className={` ${
              actived === 1 && "bg-[#14b8a6] text-white"
            } flex gap-4 account-link rounded-lg items-center hover:text-white px-4 py-2 cursor-pointer`}
          >
            <FaRegUserCircle className="h-7 w-7"></FaRegUserCircle>
            <a href="/patient/profile" className="block py-2 w-full">
              Hồ sơ
            </a>
          </div>
          <div
            className={` ${
              actived === 2 && "bg-[#14b8a6] text-white"
            } flex gap-4 account-link rounded-lg items-center hover:text-white px-4 py-2 cursor-pointer`}
          >
            <LuCalendarDays className="h-7 w-7"></LuCalendarDays>
            <a href="/appointment" className="block py-2 w-full">
              Lịch khám của tôi
            </a>
          </div>
          <div
            className="flex gap-4 account-link rounded-lg items-center hover:text-white px-4 py-2 cursor-pointer"
            // onClick={handleLogout}
          >
            <FiLogOut className="h-7 w-7"></FiLogOut>
            <a href="/" className="block py-2 w-full">
              Đăng xuất
            </a>
          </div>
        </div>
        <div className="my-7 w-4/5 rounded-xl bg-white text-slate-600 shadow-xl py-5 px-8">
          <div className="mb-5 h-10 grid grid-cols-5 gap-3 font-semibold">
            <p className="text-2xl col-span-1">Lịch khám</p>
            <div
              onClick={() => {
                setPassed(false);
              }}
              className={` ${
                !passed && "bg-lime-100"
              } col-start-4 underline rounded-lg text-center hover:bg-lime-100 cursor-pointer py-2 w-full h-full`}
            >
              SẮP TỚI
            </div>
            <div
              onClick={() => {
                setPassed(true);
              }}
              className={` ${
                passed && "bg-lime-100"
              } col-start-5 underline rounded-lg text-center hover:bg-lime-100 cursor-pointer py-2 w-full h-full`}
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

export default Appointment;
