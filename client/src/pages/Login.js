import React, { useEffect, useState } from "react";
import FlagIcon from "../Images/flag.png";
import { useDispatch, useSelector } from "react-redux";
import { login, loginGoogle } from "../redux-toolkit/authSlice";
import OAuth from "../components/OAuth";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const { currentUser, message, error, loading, updated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleLogin = () => {
    const data = {
      Email: formValues.email,
      PassWord: formValues.password,
    };
    dispatch(login(data));
  };
  useEffect(() => {
    if (currentUser) setTimeout(Navigate("/"), 1000);
  }, [currentUser]);
  return (
    <div className="bg-lime-50">
      {!currentUser ? (
        <div>
          <div className="flex items-center justify-center min-h-screen p-6">
            <div className="w-2/5 h-[400px]  rounded-xl pt-[30px]">
              <div className="text-2xl font-bold text-teal-800 mb-9 ">
                Đăng nhập tài khoản bệnh nhân
              </div>

              <OAuth />
              <div className="text-center text-lg opacity-70  my-5">
                Hoặc đăng nhập bằng tài khoản
              </div>
              <div className="flex flex-col px-5 py-6 items-center rounded-2xl shadow-lg bg-gradient-to-r from-slate-50 to-white ">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formValues.email}
                  onChange={handleChange}
                  className={` ${
                    formErrors?.email ? "border-b-red-500" : "border-b-teal-100"
                  } py-2 mb-4 w-96 h-12 bg-transparent focus-visible:ring-0 border-x-0 border-t-0 border-b-2 text-lg items-center focus:border-b-teal-400`}
                ></input>
                <input
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  placeholder="Mật khẩu"
                  className={` ${
                    formErrors?.password
                      ? "border-b-red-500"
                      : "border-b-teal-100"
                  } py-2 mb-8 w-96 h-12 bg-transparent focus-visible:ring-0 border-x-0 border-t-0 border-b-2 text-lg items-center focus:border-b-teal-400`}
                ></input>
                <p className="text-red-500 mb-4">{message}</p>

                <Button
                  onClick={handleLogin}
                  className="w-60 mx-auto h-[48px] text-center"
                  gradientDuoTone="greenToBlue"
                >
                  <p className="text-lg">Đăng nhập</p>
                </Button>
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
      ) : (
        <div className="h-screen bg-white"></div>
      )}
    </div>
  );
}

export default Login;
