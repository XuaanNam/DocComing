import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../redux-toolkit/authSlice";
const Register = () => {
  const { checked } = useSelector((state) => state.user);
  console.log(checked);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const initialValues = { email: "", password: "", confirmPassword: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  useEffect(() => {
    if (checked) setTimeout(Navigate("/login"), 2000);
  }, [checked]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (
      !validate(formValues)?.email &&
      !validate(formValues)?.password &&
      !validate(formValues)?.confirmPassword
    ) {
      const data = {
        Email: formValues.email,
        PassWord: formValues.password,
      };
      dispatch(userRegister(data));
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email không được trống!";
    } else if (!regex.test(values.email)) {
      errors.email = "Email không hợp lệ!";
    }
    if (!values.password) {
      errors.password = "Mật khẩu không được trống";
    } else if (values.password.length < 6) {
      errors.password = "Mật khẩu phải chứa ít nhất 6 kí tự";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Mật khẩu không được trống";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Mật khẩu không trùng khớp";
    }
    return errors;
  };
  console.log(formErrors);
  return (
    <div>
      <div className="flex items-center bg-lime-50 justify-center pt-[70px] mb-5 p-6">
        <form
          onSubmit={handleSubmit}
          className="w-3/5 flex flex-col items-center mt-10 p-5 bg-white  shadow-lg rounded-xl"
        >
          <div className="text-2xl font-bold text-teal-800 ">
            Đăng ký tài khoản bệnh nhân
          </div>
          <p className="text-lg opacity-70 my-3">Vui lòng nhập thông tin</p>
          <div className="h-12 mb-3 w-96 items-center py-2 cursor-pointer bg-white">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
              className="w-full h-12 outline-none rounded-md text-lg opacity-70 "
            ></input>
          </div>
          <p className="text-red-500">{formErrors.email}</p>

          <div className="h-12 mb-3 w-96 items-center py-2 cursor-pointer bg-white">
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Mật khẩu"
              className="w-full h-12 outline-none rounded-md text-lg opacity-70 "
            ></input>
          </div>
          <p className="text-red-500">{formErrors.password}</p>

          <div className="h-12 mb-3 w-96 items-center py-2 cursor-pointer bg-white">
            <input
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleChange}
              placeholder="Xác nhận mật khẩu"
              className="w-full h-12 outline-none rounded-md text-lg opacity-70 "
            ></input>
          </div>
          <p className="text-red-500">{formErrors.confirmPassword}</p>

          <button
            type="submit"
            className="h-12 w-96 border rounded-xl my-7 py-2 cursor-pointer text-white text-lg text-center font-medium bg-gradient-to-r from-green-400 to-teal-500 hover:drop-shadow-lg"
          >
            Tiếp tục
          </button>
          <p className="justify-end opacity-70 flex gap-2">
            Nếu đã đăng ký,
            <a className="text-teal-500" href="/login">
              Đăng nhập ở đây
            </a>
          </p>
          {/* <p className="text-lg opacity-70 my-3">Vui lòng nhập số điện thoại</p>
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
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default Register;
