import React from "react";
import FlagIcon from "../Images/flag.png";
import { Label, Input, Button } from "@windmill/react-ui";
import { useDispatch, useSelector } from "react-redux";
import { loginGoogle } from "../redux-toolkit/authSlice";
import OAuth from "../components/OAuth";

function Login() {
  const dispatch = useDispatch();
  // const handleLogin = () => {
  //   dispatch(loginGoogle);
  // };
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="w-2/5 h-[400px]  rounded-xl pt-[50px]">
          <div className="text-2xl font-bold text-teal-800 mb-9">
            Đăng nhập tài khoản bệnh nhân
          </div>

          <OAuth />
          <div className="text-center text-lg opacity-70  my-5">
            Hoặc đăng nhập bằng tài khoản
          </div>
          {/* <div className="flex gap-2 h-12 w-full items-center border rounded-xl py-2 cursor-pointer bg-white hover:drop-shadow-md">
            <img className="h-[70%] pl-4" src={FlagIcon} alt=""></img>
            <p className="text-lg opacity-70 ">(+84)</p>
            <div className="w-[1.5px] h-[28px] bg-slate-400"></div>
            <input className="h-full w-full outline-none text-lg opacity-70 "></input>
          </div>
          <div className="h-12 w-full border rounded-xl my-7 py-2 cursor-pointer text-white text-lg text-center font-medium bg-gradient-to-r from-green-400 to-teal-500 hover:drop-shadow-lg">
            Gửi mã OTP
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
