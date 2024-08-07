import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, login, loginGoogle } from "../../redux-toolkit/authSlice";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { currentUser, message, error, loading, updated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [err, setErr] = useState("");
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleLogin = () => {
    const data = {
      Email: formValues.email,
      PassWord: formValues.password,
    };
    if(formValues.email == "" || formValues.password == "")
      setErr("Vui lòng nhập đầy đủ tài khoản và mật khẩu!")
    else if(formValues.email !== "admin@doccoming.com"){
      setErr("Không thể đăng nhập bằng tài khoản này!")
    } 
    else {
      dispatch(login(data))
      .then((r) => { 
        if(r.payload.checked === false)
          setErr(r.payload.message);
      })
    }
  };
  useEffect(() => {
    if (currentUser) 
      { 
        dispatch(fetchProfile())
        setTimeout(Navigate("/admin/dashboard"), 1000);
      }
  }, [currentUser]);
  return (
    <div className="md:pt-[150px] h-screen max-md:pt-[80px] md:py-20 w-full">
      {!currentUser ? (
        <div className="shadow-lg bg-gradient-to-r p-5 rounded-xl from-lime-50 to-white lg:w-1/3 sm:max-lg:w-1/2 max-sm:w-2/3 lg:h-80 mx-auto max-sm:mt-4"
             onKeyDown={(e) => { 
                if (e.key === "Enter") 
                  handleLogin(); 
             }} 
        >
          <div className="text-center text-xl font-medium my-2 opacity-70">
            Đăng nhập bằng tài khoản
          </div>
          <div className="flex flex-col xl:px-5 py-6 items-center rounded-2xl ">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
              className={` ${
                formErrors?.email ? "border-b-red-500" : "border-b-teal-100"
              } py-2 mb-4 max-xl:w-full xl:w-96 h-12 bg-transparent focus-visible:ring-0 border-x-0 border-t-0 border-b-2 text-lg items-center focus:border-b-teal-400`}
            ></input>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Mật khẩu"
              className={` ${
                formErrors?.password ? "border-b-red-500" : "border-b-teal-100"
              } py-2 mb-4 max-xl:w-full xl:w-96 h-12 bg-transparent focus-visible:ring-0 border-x-0 border-t-0 border-b-2 text-lg items-center focus:border-b-teal-400`}
            ></input>
            <p className="text-red-500 mb-1">{err}</p>
            <Button
              onClick={handleLogin}
              className="max-xl:w-full xl:w-60 mt-3 mx-auto h-[48px] text-center"
              gradientDuoTone="greenToBlue"
            >
              <p className="text-lg">Đăng nhập</p>
            </Button>
          </div>
        </div>
      ) : (
        <div className="h-screen bg-white"></div>
      )}
    </div>
  );
};

export default AdminLogin;
