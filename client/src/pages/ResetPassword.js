import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { authentication, fetchProfile,resetPassword } from "../redux-toolkit/authSlice";
import { Button } from 'flowbite-react';

const ResetPassword = () => {
    const { user,checked, auth } =
    useSelector((state) => state.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { token } = useParams();

  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const validate = (values) => {
    const errors = {};
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
    if (formErrors?.password && name === "password")
      setFormErrors({ ...formErrors, [name]: "" });
    if (formErrors?.confirmPassword && name === "confirmPassword")
      setFormErrors({ ...formErrors, [name]: "" });
  };
  localStorage.setItem("token", "Bearer " + token);
  useEffect(()=>{
    dispatch(authentication())
  },[])
  useEffect(()=>{
    if(checked === true){
      Navigate("/login")
    }
  },[checked])
  const handleResetPassword = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (
      !validate(formValues)?.password &&
      !validate(formValues)?.confirmPassword
    ) {
      const data = {
        NewPassWord: formValues.password,
      };
      dispatch(resetPassword(data));
    }
  }
  return (
    <div className="pt-[70px] flex flex-col bg-lime-50 items-center justify-center min-h-screen">
      <script type="text/javascript">
        function disableBack() {window.history.forward()}
        setTimeout("disableBack()", 0); window.onunload = function () {null};
      </script>
      <div className="w-1/2 min-h-80 rounded-xl bg-white shadow-lg shadow-violet-200 p-5">
        <div className="w-full flex flex-col items-center justify-center">
            <img
                src={auth?.Avt || require("../Images/pattientavt.png")}
                alt="userImage"
                className="max-lg:col-start-1 max-lg:col-span-1 rounded-full w-16 h-16 object-cover mb-2 border-4 border-[lightgray]"
            />
            <div className="mb-2 max-lg:col-start-2 max-lg:col-span-1 max-lg:text-left max-lg:text-base max-lg:flex max-lg:items-center max-lg:justify-center font-medium lg:text-lg lg:text-center w-full">
                {auth?.FullName} 
            </div>
            <div className="mb-3 max-lg:col-start-2 max-lg:col-span-1 max-lg:text-left max-lg:text-base max-lg:flex max-lg:items-center max-lg:justify-center font-medium lg:text-lg lg:text-center w-full">
                {auth?.Email} 
            </div>
            <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu mới"
                className={` ${
                  formErrors?.password
                    ? "border-b-red-500"
                    : "border-b-slate-200"
                } mb-3 outline-none p-2 sm:w-96 max-sm:w-full h-12 bg-transparent focus-visible:ring-0 border-x-0 border-t-0 border-b-2 text-lg items-center focus:border-b-teal-400`}>
            </input>
            <p className="text-red-500">
              {formErrors?.password}
            </p>
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
                } mb-3 outline-none p-2 sm:w-96 max-sm:w-full h-12 bg-transparent focus-visible:ring-0 border-x-0 border-t-0 border-b-2 text-lg items-center focus:border-b-teal-400`}>
            </input>
            <p className="text-red-500">
              {formErrors?.confirmPassword}
            </p>
            <Button
                // type="submit"
                className="h-11 mt-2 sm:w-96 max-sm:w-full"
                outline gradientDuoTone="tealToLime"
                onClick={handleResetPassword}
            >
                Xác nhận
            </Button>
        </div>
          
                
      </div>
    </div>
  )
}

export default ResetPassword
