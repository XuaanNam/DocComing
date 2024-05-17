import React, { useEffect, useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { LuCalendarDays, LuCalendarCheck } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Badge, Calendar } from "antd";
import { fetchAppointment } from "../../redux-toolkit/appointmentSlice";
import {
  fetchDoctorSchedule,
  fetchService,
} from "../../redux-toolkit/appointmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, Space, Input, Select } from "antd";
import dayjs from "dayjs";
const DoctorSchedule = () => {
  const dispatch = useDispatch();
  const { AppointmentData, error, loading, updated } = useSelector(
    (state) => state.appointment
  );
  const { user } = useSelector((state) => state.user);
  console.log(user.data.id);
  const dateFormat = "DD/MM/YYYY";
  const date = new Date();
  const today =
    date.getDate() +
    "/" +
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "/" +
    date.getFullYear();

  useEffect(() => {
    dispatch(fetchDoctorSchedule(today)); //bệnh nhân -> idDOctor, ngày  {appointment{timebdau, 1:30:00} , schedule }
    dispatch(fetchService({ idDoctor: user?.data.id }));

    dispatch(fetchAppointment()); // doctor -> appointment {cuộc hẹn 1{}, cuọc 2}
  }, []);
  console.log(today);
  const getListData = (value) => {
    let listData = [];
    for (let i = 0; i < AppointmentData.length; i++) {
      console.log(AppointmentData)
      let db = AppointmentData[i]?.DateBooking?.split("-");
      // eslint-disable-next-line eqeqeq
      if (value.date() == db[2] && value.month() + 1 == db[1] && value.year() == db[0]) {
        listData = [...listData, 
          {
            type: AppointmentData[i].Type,
            content: AppointmentData[i].TimeBooking,
          },
        ];
      }
    }
    return listData || [];
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  return (
    <div className="">
      <div className=" mx-16 text-gray-700 flex gap-7">
        <div className="my-7 w-full  rounded-xl bg-lime-50 shadow-xl py-5 px-8">
          <p className="font-semibold text-2xl mb-5">Lịch làm việc</p>
          <div className="">
            <div className="flex gap-3 items-center mb-5">
              <p className="text-lg font-medium text-gray-600 w-20">Ca sáng</p>
              <select
                className="flex self-center items-center pl-5 p-2 h-[40px] w-32 border rounded-lg bg-white text-slate-800 opacity-60 cursor-pointer"
                //   value={categoryId}
                //   onChange={handleChange}
              >
                <option value="--" disabled className="text-black">
                  --
                </option>
              </select>
              <FaLongArrowAltRight />
              <select
                className="flex self-center items-center pl-5 p-2 h-[40px] w-32 border rounded-lg bg-white text-slate-800 opacity-60 cursor-pointer"
                //   value={categoryId}
                //   onChange={handleChange}
              >
                <option value="--" disabled className="text-black">
                  --
                </option>
              </select>
            </div>
            <div className="flex gap-3 items-center mb-5">
              <p className="text-lg font-medium text-gray-600 w-20">Ca chiều</p>
              <select
                className="flex self-center items-center pl-5 p-2 h-[40px] w-32 border rounded-lg bg-white text-slate-800 opacity-60 cursor-pointer"
                //   value={categoryId}
                //   onChange={handleChange}
              >
                <option value="--" disabled className="text-black">
                  --
                </option>
              </select>
              <FaLongArrowAltRight />
              <select
                className="flex self-center items-center pl-5 p-2 h-[40px] w-32 border rounded-lg bg-white text-slate-800 opacity-60 cursor-pointer"
                //   value={categoryId}
                //   onChange={handleChange}
              >
                <option value="--" disabled className="text-black">
                  --
                </option>
              </select>
            </div>
            <div className="flex gap-3 items-center mb-5">
              <p className="text-lg font-medium text-gray-600 w-20">Ca tối</p>
              <select
                className="flex self-center items-center pl-5 p-2 h-[40px] w-32 border rounded-lg bg-white text-slate-800 opacity-60 cursor-pointer"
                //   value={categoryId}
                //   onChange={handleChange}
              >
                <option value="--" disabled className="text-black">
                  --
                </option>
              </select>
              <FaLongArrowAltRight />
              <select
                className="flex self-center items-center pl-5 p-2 h-[40px] w-32 border rounded-lg bg-white text-slate-800 opacity-60 cursor-pointer"
                //   value={categoryId}
                //   onChange={handleChange}
              >
                <option value="--" disabled className="text-black">
                  --
                </option>
              </select>
            </div>
          </div>
          <Calendar
            className="shadow-lg shadow-blue-300 p-3 rounded-lg"
            cellRender={cellRender}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedule;
