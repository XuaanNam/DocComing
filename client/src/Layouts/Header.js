import React from "react";
import { FiSearch } from "react-icons/fi";
const Header = () => {
  return (
    <div className="h-[70px] fixed w-screen z-50 bg-white">
      <div className="text-sm h-full px-5 text-gray-700 bg-white grid grid-cols-5 drop-shadow-md">
        <a
          href="/"
          className="col-start-1 col-span-1 pl-5 text-xl flex items-center text-teal-500"
        >
          Doctor Coming
        </a>
        <div className="flex items-center col-span-2">
          <div className="flex items-center col-span-2 h-[44px] w-[300px] border rounded-lg hover:ring-1 hover:ring-teal-400">
            <FiSearch className="ml-2 h-[24px] w-[24px] text-teal-500"></FiSearch>
            <input
              className="m-2 h-full w-full outline-none text-base"
              placeholder="Tìm kiếm..."
            ></input>
          </div>
        </div>
        <div className="flex items-center justify-end font-medium cursor-pointer">
          <div className="h-[34px] w-[150px] p-1.5 rounded-lg text-center transition-transform duration-500 hover:scale-125">
            Đội ngũ bác sĩ
          </div>
          <div className="h-[34px] w-[100px] p-1.5 rounded-lg text-center transition-transform duration-500 hover:scale-125">
            Chuyên mục
          </div>
        </div>
        <div className="flex gap-4 w-full justify-center items-center">
          <div className="w-[1px] h-[34px] bg-slate-500"></div>
          <a
            href="/login"
            className="cursor-pointer transition-transform duration-500 hover:scale-110"
          >
            Đăng nhập
          </a>
          <a
            href="/register"
            className="h-[34px] w-[100px] border text-white bg-teal-500 p-1.5  rounded-lg cursor-pointer"
          >
            Tạo tài khoản
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
