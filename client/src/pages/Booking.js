import Datepicker from "flowbite-datepicker/Datepicker";
import React, { useEffect, useState } from "react";
import { FaHome, FaRegAddressBook } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { LuStethoscope } from "react-icons/lu";
import FlagIcon from "../Images/flag.png";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Booking = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [today, setToday] = useState("");
  const month = currentDate.getMonth() + 1;
  const date = currentDate.getDate();
  const year = currentDate.getFullYear();
  const [data, setData] = useState({});
  const [actived, setActived] = useState();
  const { currentUser, user, error, loading, updated } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    setData(user?.data);
    const datepickerEl = document?.getElementById("date");
    new Datepicker(datepickerEl, {
      format: "dd/mm/yyyy",
      title: "Thời gian làm việc",
      today: "true",
    });
    setToday(`${date}/${month}/${year}`);
  }, []);
  console.log(data);
  return (
    <div className="bg-slate-50 pt-[90px] h-[1200px]">
      <div className="mx-16 mb-7 p-6 grid grid-cols-6 gap-8 bg-white shadow-lg rounded-lg">
        <img
          className="h-48 w-40 object-cover border rounded-lg col-span-1"
          src={require("../Images/doctor1.jpg")}
          alt="avt"
        ></img>
        <div className="col-start-2 col-span-5">
          <div className="text-2xl font-medium text-slate-700 mb-3">
            ThS. BSCKI. Nguyễn Đức Hương - Chuyên khoa Tai Mũi Họng, Ung Bướu
          </div>
          <div className="flex gap-3 items-center text-lg mb-2">
            <LuStethoscope className="text-teal-600" />
            <div className="text-slate-600">Tai Mũi Họng, Ung bướu</div>
          </div>
          <div className="flex gap-3 items-center text-lg mb-2">
            <FaRegAddressBook className="text-teal-600" />
            <div className="text-slate-600">
              1 Nơ Trang Long, Bình Thạnh, Hồ Chí Minh
            </div>
          </div>
          <div className="flex gap-3 items-center text-lg mb-3">
            <FaHome className="text-teal-600" />
            <div className="text-slate-600">Khám tại nhà</div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="relative w-full flex items-center">
              <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                id="date"
                datepicker="true"
                value={today}
                type="text"
                className="w-full h-[40px] bg-white border border-gray-300 text-gray-900 text-lg font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-12 p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                // onSelect={(e) => {
                //   setData({ ...data, [e.target.id]: e.target.value });
                // }}
              />
              <IoIosArrowDown className="absolute right-3"></IoIosArrowDown>
            </div>
            <div className="w-full flex items-center">
              <select
                className="h-[40px] font-medium text-lg bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full px-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="service"
                required
                //   value={data?.service}
                //   onChange={(e) => {
                //     setData({ ...data, [e.target.id]: e.target.value });
                //   }}
              >
                <option value="8:00">8:00</option>
                <option value="9:00">9:00</option>
                <option value="10:00">10:00</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-16 p-6 bg-white shadow-lg rounded-lg mb-5">
        <div className="text-2xl font-medium text-slate-800 mb-5">
          Thông tin lịch hẹn
        </div>
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-lg font-medium mb-2">Số điện thoại liên hệ</p>
            <div className="flex p-2.5 gap-3 h-12 w-full items-center border rounded-xl cursor-pointer ">
              <img className="h-[70%]" src={FlagIcon} alt=""></img>
              <p className="text-lg opacity-70 ">(+84)</p>
              <div className="w-[1.5px] h-[28px] bg-slate-400"></div>
              <input
                className="h-full w-full text-lg outline-none "
                value={data?.Phone}
              ></input>
            </div>
          </div>
          <div>
            <p className="text-lg font-medium mb-2">Họ và tên</p>
            <input
              className="h-12 w-full p-2.5 block items-center border outline-none rounded-xl text-lg "
              value={data?.FirstName + data?.LastName}
            ></input>
          </div>
          <div>
            <p className="text-lg font-medium mb-2">Giới tính</p>
            <select
              className="h-12 w-full p-2.5 items-center border outline-none rounded-xl text-lg border-slate-200"
              id="Gender"
              value={data?.Gender}
              onChange={(e) => {
                setData({ ...data, [e.target.id]: e.target.value });
                // handleChange(e);
              }}
              // disabled={!edit}
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
            {/* </div> */}
          </div>
          <div>
            <p className="text-lg font-medium mb-2">Email</p>
            <input
              className="h-12 w-full pl-3 flex items-center border outline-none rounded-xl text-lg "
              value={data?.Email}
            ></input>
          </div>
        </div>
        <div>
          <p className="text-lg font-medium mb-2">Lý do khám</p>
          <textarea
            placeholder="Ví dụ: Đau đầu, phát ban,..."
            className="h-28 w-full pl-3 flex items-center border outline-none rounded-xl text-lg"
          ></textarea>
        </div>
      </div>
      <Button
        //   onClick={handleBooking}
        className="w-60 mx-auto h-[48px] text-center"
        gradientDuoTone="greenToBlue"
      >
        <p className="text-lg">XÁC NHẬN</p>
      </Button>
    </div>
  );
};

export default Booking;
