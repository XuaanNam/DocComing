import React from "react";
import Header from "../Layouts/Header";
import FlagIcon from "../Images/flag.png";

const Register = () => {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="w-1/3 h-[200px]  rounded-xl">
          <div className="text-2xl font-bold text-teal-800 ">
            Đăng ký tài khoản bệnh nhân
          </div>
          <p className="text-lg opacity-70 my-3">Vui lòng nhập số điện thoại</p>
          <div className="flex gap-2 h-12 w-full items-center border-b-2 border-b-teal-600 py-2 cursor-pointer bg-white">
            <img className="h-[70%] pl-4" src={FlagIcon} alt=""></img>
            <p className="text-lg text-teal-600 font-medium">(+84)</p>
            <div className="w-[1.5px] h-[28px] bg-slate-400"></div>
            <input className="h-full w-full outline-none text-lg opacity-70 "></input>
          </div>
          <div className="h-12 w-full border rounded-xl my-7 py-2 cursor-pointer text-white text-lg text-center font-medium bg-gradient-to-r from-green-400 to-teal-500 hover:drop-shadow-lg">
            Tiếp tục
          </div>
          <p className="justify-end opacity-70 flex gap-2">
            Nếu đã đăng ký,
            <a className="text-teal-500" href="/login">
              Đăng nhập ở đây
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
