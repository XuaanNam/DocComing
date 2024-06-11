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
import { Input } from 'antd';
import { Button } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import { searchPost } from "../redux-toolkit/postSlice";
const Header = () => {
  const { currentUser, user } = useSelector((state) => state.user);
  const [actived, setActived] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const authentication = currentUser?.authentication;
  
  const { allSearchPost, error, loading } = useSelector((state) => state.post);
  const [search, setSearch] = useState("")
  const handleSearch = () => {
    localStorage.setItem("keyword", JSON.stringify(search))
    dispatch(searchPost({keywords: search})).then(() => {
      Navigate("/search")
      setSearch("")
    })
  }
  const handleLogout = () => {
    if (authentication == 0) Navigate("/admin/login");
    else Navigate("/");
    dispatch(logout());
    setTimeout(() => {
      persistor.purge();
    }, 200);
  };
  return (
    <div className="h-[70px] fixed w-screen z-50 max-sm:h-[80px]">
      {actived && (
        <div
          className="absolute inset-0 w-screen h-screen overlay"
          onClick={() => {
            setActived(false);
          }}
        ></div>
      )}
      <div className="text-sm h-full px-5 max-sm:px-2 text-gray-700 bg-teal-600 grid grid-cols-4 max-lg:grid-cols-11 max-lg:gap-1 drop-shadow-lg">
        <div className="max-lg:col-start-1 max-lg:col-span-3 col-start-1 col-span-1 lg:pl-5 text-xl flex items-center font-bold text-teal-500">
          <img className="rounded-full h-12 w-12 mr-3 max-sm:h-10 max-sm:w-10 max-sm:mr-1 " alt="logo" src={logo}></img>
          <a className="text-gray-100 max-sm:text-sm" href="/">
            Doctor Coming
          </a>
        </div>
        <div className="max-lg:hidden max-lg:col-start-4 max-lg:col-span-1 col-start-2 col-span-1 flex items-center justify-center">
            <div className="relative w-full flex lg:gap-3 items-center justify-center">
                <Input 
                    placeholder="Tìm kiếm theo bệnh" 
                    className="h-11 pl-14 rounded-lg border-slate-400" 
                    value={search}
                    onChange={(e)=>{setSearch(e.target.value)}}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") 
                        handleSearch(); 
                    }} />
                <CiSearch className="h-6 w-6 sm:absolute sm:top-[10px] lg:left-4 max-sm:bg-slate-100 max-sm:rounded-lg"></CiSearch>
                
            </div>
        </div>
        <div className="max-lg:col-start-4 max-lg:col-span-3 text-gray-100 lg:mr-4 flex gap-2 items-center col-start-3 justify-end font-medium cursor-pointer">
          <div
            onClick={() => {
              Navigate("/doctors");
            }}
            className="max-sm:text-xs lg:h-[34px] lg:w-[150px] lg:p-1.5 rounded-lg text-center transition-transform duration-500 hover:scale-125"
          >
            Đội ngũ bác sĩ
          </div>
          <div
            onClick={() => {
              Navigate("/categories");
            }}
            className="max-sm:text-xs lg:h-[34px] lg:w-[100px] lg:p-1.5 rounded-lg text-center transition-transform duration-500 hover:scale-125"
          >
            Chuyên mục
          </div>
        </div>

        <div className="max-sm:col-start-7 sm:max-lg:col-start-8 max-sm:col-span-5 sm:max-lg:col-span-4 relative flex lg:gap-3 w-full items-center lg:col-start-4">
          <div className="w-[1px] lg:h-[34px] max-sm:h-10 bg-gray-200"></div>
          {currentUser ? (
            <div className="flex gap-1 items-center w-full">
              <div
                className="flex lg:gap-3 items-center justify-center cursor-pointer lg:w-[81%] max-lg:w-full"
                onClick={() => setActived(!actived)}
              >
                <div className="rounded-full h-11 w-11 max-sm:h-6 max-sm:w-6 bg-white flex items-center justify-center">
                  <img
                    className="rounded-full h-10 w-10 max-sm:h-6 max-sm:w-6 object-cover"
                    alt=""
                    src={
                      user?.data?.Avt || require("../Images/pattientavt.png")
                    }
                  ></img>
                </div>

                <p className="max-sm:text-sm max-sm:pl-1 font-medium text-base text-center text-gray-100 truncate max-w-[65%]">
                  {user?.data
                    ? user?.data?.FirstName + " " + user?.data?.LastName
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
                className="max-sm:h-5 max-sm:w-5 h-7 w-7 text-lime-100  cursor-pointer transition-transform duration-500 hover:scale-110"
              />
              {actived && (
                <div
                  className={`max-sm:text-sm max-sm:w-[165px] max-sm:right-[0px] max-sm:top-[65px] absolute lg:top-[62px] lg:w-60 lg:text-base bg-white rounded-lg shadow-lg drop-shadow-lg transition-all duration-500 z-50`}
                >
                  {authentication == 2 && (
                    <div
                      onClick={() => {
                        Navigate("/doctor/schedule");
                      }}
                      className="flex gap-3 account-link rounded-lg items-center hover:text-white pl-3 pr-2 cursor-pointer"
                    >
                      <FaRegUserCircle className="h-5 w-5 "></FaRegUserCircle>
                      <div className="block py-3 max-sm:xs">Lịch làm việc</div>
                    </div>
                  )}
                  {authentication == 1 && (
                    <div>
                      <div
                        onClick={() => {
                          Navigate("/patient/profile");
                        }}
                        className="flex gap-3 account-link rounded-lg items-center hover:text-white px-4 cursor-pointer"
                      >
                        <FaRegUserCircle className="h-5 w-5"></FaRegUserCircle>
                        <div className="block py-3 max-sm:xs">Hồ sơ</div>
                      </div>
                      <div
                        onClick={() => {
                          Navigate("/patient/appointment");
                        }}
                        className="flex gap-3 account-link rounded-lg items-center hover:text-white px-4 cursor-pointer"
                      >
                        <LuCalendarDays className="h-5 w-5"></LuCalendarDays>
                        <div className="block py-3 max-sm:xs">Lịch khám của tôi</div>
                      </div>
                    </div>
                  )}
                  {authentication == 0 && (
                    <div
                      onClick={() => {
                        Navigate("/admin/dashboard");
                      }}
                      className="flex gap-3 account-link rounded-lg items-center hover:text-white px-4 cursor-pointer"
                    >
                      <FaRegUserCircle className="h-5 w-5"></FaRegUserCircle>
                      <div className="block py-3 max-sm:xs">Bảng điều khiển</div>
                    </div>
                  )}
                  <div
                    className="flex gap-3 account-link rounded-lg items-center hover:text-white px-4 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="h-5 w-5"></FiLogOut>

                    <p className="block py-3 max-sm:xs">Đăng xuất</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="sm:ml-5 w-full flex gap-3 justify-center items-center text-base max-sm:pl-3">
              <a
                href="/login"
                className="max-sm:p-1 max-sm:text-xs sm:max-lg:w-full text-center text-gray-100 cursor-pointer transition-transform duration-500 hover:scale-110"
              >
                Đăng nhập
              </a>
              <a
                href="/register"
                className="max-sm:text-xs sm:max-lg:h-[40px] flex justify-center items-center sm:max-lg:w-[90%] max-sm:h-[40px] max-sm:w-[80px] max-sm:p-1 lg:h-[38px] lg:w-[120px] text-center border-[1.5px] text-white bg-teal-400 lg:p-1.5 hover:bg-teal-500 transition-transform hover:duration-1000 rounded-lg cursor-pointer"
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
