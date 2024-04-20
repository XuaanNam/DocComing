import React, { useEffect, useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { LuCalendarDays, LuCalendarCheck } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Badge, Calendar } from "antd";

const DoctorSchedule = () => {
  const [actived, setActived] = useState(1);
  const [date, setDate] = useState([]);
  const [step, setStep] = useState(0);
  const [step1, setStep1] = useState(0);
  const [listData, setListData] = useState([]);
  const x = ["25/04/2024", "28/04/2024", "30/04/2024"];
  // console.log(date, step);
  useEffect(() => {
    if (x && step < x.length) {
      let split = x[step].split("/");
      setTimeout(
        setDate([
          ...date,
          { day: parseInt(split[0]), month: parseInt(split[1]) },
        ]),
        setStep(step + 1),
        0
      );
    }
  }, [step]);
  const getListData = (value) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          {
            type: "warning",
            content: "This is warning event.",
          },
          {
            type: "success",
            content: "This is usual event.",
          },
        ];
        break;
      case 10:
        listData = [
          {
            type: "warning",
            content: "This is warning event.",
          },
          {
            type: "success",
            content: "This is usual event.",
          },
          {
            type: "error",
            content: "This is error event.",
          },
        ];
        break;
      case 15:
        listData = [
          {
            type: "warning",
            content: "This is warning event",
          },
          {
            type: "success",
            content: "This is very long usual event......",
          },
          {
            type: "error",
            content: "This is error event 1.",
          },
          {
            type: "error",
            content: "This is error event 2.",
          },
          {
            type: "error",
            content: "This is error event 3.",
          },
          {
            type: "error",
            content: "This is error event 4.",
          },
        ];
        break;
      default:
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
    <div className="pt-[70px] bg-gray-50">
      <div className=" mx-16 text-gray-700 flex gap-7">
        <div className="my-7 w-1/5 h-80 bg-white rounded-lg shadow-lg">
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
          <div className="flex gap-4 account-link rounded-lg items-center hover:text-white px-4 py-2 cursor-pointer">
            <LuCalendarDays className="h-7 w-7"></LuCalendarDays>
            <a href="/" className="block py-2 w-full">
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
        <div className="my-7 w-4/5  rounded-xl bg-white shadow-lg py-5 px-8">
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
          <Calendar cellRender={cellRender} />
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedule;
