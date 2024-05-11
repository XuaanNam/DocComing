import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";
import { GoBellFill } from "react-icons/go";
import { FaRegUserCircle } from "react-icons/fa";
import { LuCalendarDays, LuCalendarCheck } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../redux-toolkit/authSlice";
import { useNavigate } from "react-router-dom";
import logo from "../logo.png";
import { fetchProfile } from "../redux-toolkit/authSlice";
import { persistor } from "../redux-toolkit/configureStore";

const Header = () => {
  const { currentUser, user, auth } = useSelector((state) => state.user);
  const [actived, setActived] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  // console.log(auth);
  const handleLogout = () => {
    if (currentUser.authentication === 0) Navigate("/admin/login");
    else Navigate("/");
    dispatch(logout());
    setTimeout(() => {
      persistor.purge();
    }, 200);
  };
  return (
    <div className="h-[70px] fixed w-screen z-50">
      <div className="text-sm h-full px-5 text-gray-700 bg-teal-600 grid grid-cols-4 drop-shadow-lg">
        <div className="col-start-1 col-span-1 pl-5 text-xl flex items-center font-bold text-teal-500">
          <img className="rounded-full h-12 w-12 mr-3 " alt="" src={logo}></img>
          <a className="text-gray-100" href="/">
            Doctor Coming
          </a>
        </div>
        <div className="flex items-center col-span-1">
          <div className="bg-white flex items-center col-span-2 h-[44px] w-[300px] border rounded-lg hover:ring-1 hover:ring-teal-400">
            <FiSearch className="ml-2 h-[24px] w-[24px] text-teal-500"></FiSearch>
            <input
              className="m-2 h-full w-full outline-none text-base"
              placeholder="Tìm kiếm..."
            ></input>
          </div>
        </div>
        <div className="text-gray-100 mr-4 flex items-center justify-end font-medium cursor-pointer">
          <div
            onClick={() => {
              Navigate("/doctors");
            }}
            className="h-[34px] w-[150px] p-1.5 rounded-lg text-center transition-transform duration-500 hover:scale-125"
          >
            Đội ngũ bác sĩ
          </div>
          <div
            onClick={() => {
              Navigate("/categories");
            }}
            className="h-[34px] w-[100px] p-1.5 rounded-lg text-center transition-transform duration-500 hover:scale-125"
          >
            Chuyên mục
          </div>
        </div>

        <div className="relative flex gap-3 w-full items-center col-start-4">
          <div className="w-[1px] h-[34px] bg-gray-200"></div>
          {currentUser ? (
            <div className="flex gap-2 items-center w-full">
              <div
                className="flex gap-3 items-center justify-center cursor-pointer w-[81%]"
                onClick={() => setActived(!actived)}
              >
                <img
                  className="rounded-full h-10 w-10 object-cover"
                  alt=""
                  src={user?.data?.Avt || require("../Images/pattientavt.png")}
                ></img>
                <p className="font-medium text-base text-center text-gray-100 truncate max-w-[65%]">
                  {user?.data
                    ? user?.data?.FirstName + user?.data?.LastName
                    : currentUser?.FullName}
                </p>
                <IoMdArrowDropdown
                  className={`${
                    actived === true && " rotate-180 transition-all"
                  } text-gray-100 h-5 w-5`}
                ></IoMdArrowDropdown>
              </div>
              <GoBellFill
                onClick={() => console.log("zzz")}
                className="h-7 w-7 text-lime-100  cursor-pointer transition-transform duration-500 hover:scale-110"
              />
              {actived === true && (
                <div className="absolute top-[62px] w-60 text-base bg-white rounded-lg shadow-lg drop-shadow-lg transition-all duration-500 z-10">
                  <div className="flex gap-3 account-link rounded-lg items-center hover:text-white px-4 cursor-pointer">
                    <FaRegUserCircle className="h-5 w-5"></FaRegUserCircle>
                    <a href="/patient/profile" className="block py-3 ">
                      Hồ sơ
                    </a>
                  </div>
                  <div className="flex gap-3 account-link rounded-lg items-center hover:text-white px-4 cursor-pointer">
                    <LuCalendarDays className="h-5 w-5"></LuCalendarDays>
                    <a href="/appointment" className="block py-3">
                      Lịch khám của tôi
                    </a>
                  </div>
                  {/* <div className="flex gap-3 account-link items-center hover:text-white px-4 cursor-pointer">
                    <LuCalendarCheck className="h-5 w-5"></LuCalendarCheck>
                    <a href="/" className="block py-2">
                      Kết quả khám
                    </a>
                  </div> */}
                  <div
                    className="flex gap-3 account-link rounded-lg items-center hover:text-white px-4 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="h-5 w-5"></FiLogOut>

                    <p className="block py-3">Đăng xuất</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="ml-5 flex gap-4 justify-center items-center text-base">
              <a
                href="/login"
                className="text-gray-100 cursor-pointer transition-transform duration-500 hover:scale-110"
              >
                Đăng nhập
              </a>
              <a
                href="/register"
                className="h-[38px] w-[120px] text-center border-[1.5px] text-white bg-teal-400 p-1.5 hover:bg-teal-500 transition-transform hover:duration-1000 rounded-lg cursor-pointer"
              >
                Tạo tài khoản
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
