import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../redux-toolkit/authSlice";
const Register = () => {
  const { checked } = useSelector((state) => state.user);
  console.log(checked);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    fullname: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.fullname) {
      errors.fullname = "Họ và tên không được trống!";
    }
    if (!values.email) {
      errors.email = "Email không được trống!";
    } else if (!regex.test(values.email)) {
      errors.email = "Email không hợp lệ!";
    }
    if (!values.password) {
      errors.password = "Mật khẩu không được trống!";
    } else if (values.password.length < 6) {
      errors.password = "Mật khẩu phải chứa ít nhất 6 kí tự!";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Mật khẩu không được trống!";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Mật khẩu không trùng khớp!";
    }
    return errors;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (formErrors?.fullname && name === "fullname")
      setFormErrors({ ...formErrors, [name]: "" });
    if (formErrors?.email && name === "email")
      setFormErrors({ ...formErrors, [name]: "" });
    if (formErrors?.password && name === "password")
      setFormErrors({ ...formErrors, [name]: "" });
    if (formErrors?.confirmPassword && name === "confirmPassword")
      setFormErrors({ ...formErrors, [name]: "" });
  };
  useEffect(() => {
    if (checked) setTimeout(Navigate("/login"), 2000);
  }, [checked]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (
      !validate(formValues)?.fullname &&
      !validate(formValues)?.email &&
      !validate(formValues)?.password &&
      !validate(formValues)?.confirmPassword
    ) {
      const data = {
        FullName: formValues.fullname,
        Email: formValues.email,
        PassWord: formValues.password,
      };
      dispatch(userRegister(data));
    }
  };

  console.log(formErrors?.email);
  return (
    <div>
      <div className="flex items-center bg-lime-50 justify-center pt-[70px] p-9">
        <div className="w-[45%] p-5 flex items-center  bg-white shadow-lg rounded-xl mt-10">
          <form onSubmit={handleSubmit} className="w-96 flex flex-col mx-auto">
            <div className="text-2xl font-bold text-teal-800 text-center">
              Đăng ký tài khoản bệnh nhân
            </div>
            <p className="text-lg opacity-70 mt-3 mb-3 text-center">
              Vui lòng nhập thông tin
            </p>
            <input
              type="text"
              name="fullname"
              placeholder="Họ và tên bệnh nhân"
              value={formValues.fullname}
              onChange={handleChange}
              className={` ${
                formErrors?.fullname ? "border-b-red-500" : "border-b-slate-200"
              } py-2 mb-3 w-96 h-12 focus-visible:ring-0 border-x-0 border-t-0 border-b-2 text-lg opacity-80 items-center focus:border-b-teal-400`}
            ></input>
            <p className="text-red-500">{formErrors?.fullname}</p>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
              className={` ${
                formErrors?.email ? "border-b-red-500" : "border-b-slate-200"
              } py-2 mb-3 w-96 h-12 focus-visible:ring-0 border-x-0 border-t-0 border-b-2 text-lg opacity-80 items-center focus:border-b-teal-400`}
            ></input>
            <p className="text-red-500">{formErrors?.email}</p>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Mật khẩu"
              className={` ${
                formErrors?.password ? "border-b-red-500" : "border-b-slate-200"
              } py-2 mb-3 w-96 h-12 focus-visible:ring-0 border-x-0 border-t-0 border-b-2 text-lg opacity-80 items-center focus:border-b-teal-400`}
            ></input>
            <p className="text-red-500">{formErrors?.password}</p>

            <input
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleChange}
              placeholder="Xác nhận mật khẩu"
              className={` ${
                formErrors?.confirmPassword
                  ? "border-b-red-500"
                  : "border-b-slate-200"
              } py-2 mb-3 w-96 h-12 focus-visible:ring-0 border-x-0 border-t-0 border-b-2 text-lg opacity-80 items-center focus:border-b-teal-400`}
            ></input>
            <p className="text-red-500 flex self-start justify-start">
              {formErrors?.confirmPassword}
            </p>

            <button
              type="submit"
              className="h-12 w-96 border rounded-xl my-5 py-2 cursor-pointer text-white text-lg text-center font-medium bg-gradient-to-r from-green-400 to-teal-500 hover:drop-shadow-lg"
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
    </div>
  );
};

export default Register;
