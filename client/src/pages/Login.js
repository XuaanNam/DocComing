import React, { useEffect, useState } from "react";
import FlagIcon from "../Images/flag.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, login, loginGoogle, sendMail } from "../redux-toolkit/authSlice";
import OAuth from "../components/OAuth";
import { Button,Modal } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const data = JSON.parse(localStorage.getItem("check"));
  const blogId = JSON.parse(localStorage.getItem("blog"));
  const { currentUser, detailDoctor, sendMailMessage, message, loading, updated } =
    useSelector((state) => state.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [err, setErr] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false)
  const [emailConfirm, setEmailConfirm] = useState("")

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email không được trống!";
    } 
    if (!values.password) {
      errors.password = "Mật khẩu không được trống!";
    }
    return errors;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (formErrors?.email && name === "email")
      setFormErrors({ ...formErrors, [name]: "" });
    if (formErrors?.password && name === "password")
      setFormErrors({ ...formErrors, [name]: "" });
  };
  const handleLogin = () => {
    setFormErrors(validate(formValues));

    const data = {
      Email: formValues.email,
      PassWord: formValues.password,
    };
    if (formValues.email == "admin@doccoming.com") {
      setErr("Không thể đăng nhập bằng tài khoản này!!");
    } 
    else if(formValues.email == "" || formValues.password == "")
      setErr("Vui lòng nhập đầy đủ tài khoản và mật khẩu!")
    else {
      dispatch(login(data)).then((r) => {
        if(r.payload.checked === false)
          setErr(r.payload.message);
        else if(blogId){
          setTimeout(Navigate(`/blog/${blogId}`), 1000);
          localStorage.removeItem('blog')
        }
      });
    }
  };
  const handleSendEmail = () => {
    dispatch(sendMail({Email: emailConfirm}))
    setForgotPassword(false)
  }
  useEffect(() => {
    if (currentUser?.authentication == 1) {
      dispatch(fetchProfile())
      if (data) 
        {
          setTimeout(Navigate(`/booking/${data.doctor}`), 1000);
        }
      else setTimeout(Navigate("/"), 1000);
    } else if (currentUser?.authentication == 2){
      dispatch(fetchProfile())
      setTimeout(Navigate("/doctor/schedule"));
    }
  }, [currentUser]);
  return (
    <div className="">
      {!currentUser ? (
        <div>
          <div className="flex sm:items-center sm:justify-center min-h-screen lg:p-6 max-lg:px-7 max-lg:pt-20">
            <div className="max-sm:pt-16 lg:w-2/5 lg:h-[400px] rounded-xl max-lg:w-full max-lg:px-10"
                 onKeyDown={(e) => { 
                  if (e.key === "Enter") 
                    handleLogin(); 
                 }} 
            >
              <div className="text-2xl font-bold text-teal-800 mb-9 max-lg:text-center ">
                Đăng nhập tài khoản Bệnh nhân/Bác sĩ
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
                  } py-2 mb-4 sm:w-96 max-sm:w-full h-12 bg-transparent focus-visible:ring-0 border-x-0 border-t-0 border-b-2 text-lg items-center focus:border-b-teal-400`}
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
                  } py-2 mb-8 sm:w-96 max-sm:w-full h-12 bg-transparent focus-visible:ring-0 border-x-0 border-t-0 border-b-2 text-lg items-center focus:border-b-teal-400`}
                ></input>
                <p className="text-red-500 mb-4">{err}</p>

                <Button
                  onClick={handleLogin}
                  className="w-60 mx-auto h-[48px] mb-4 text-center"
                  gradientDuoTone="greenToBlue"                 
                >
                  <p className="text-lg">Đăng nhập</p>
                </Button>
                <div className="w-full flex justify-end">
                  <p className="cursor-pointer font-medium text-slate-700 hover:text-slate-600"
                     onClick={()=>{setForgotPassword(true)}}>Quên mật khẩu</p>
                </div>
              </div>
            </div>
          </div>
          <Modal
            show={forgotPassword}
            onClose={() => setForgotPassword(false)}
            popup
            size="lg"
            className="max-sm:pt-56"
          >
            <Modal.Header>
            </Modal.Header>
            <Modal.Body>
              
              <div className="h-48 text-center bg-lime-50 rounded-lg p-5">
                <p className="text-lg text-gray-600 mb-3">Vui lòng nhập email</p>
                <input 
                  value={emailConfirm}
                  onChange={(e)=>{setEmailConfirm(e.target.value)}}
                  placeholder="Email"
                  className="border-b-teal-100 outline-none p-2 mb-4 sm:w-96 max-sm:w-full h-12 bg-transparent focus-visible:ring-0 border-x-0 border-t-0 border-b-2 text-lg items-center focus:border-b-teal-400"></input>       
                <Button
                  className="w-full mx-auto h-11"
                  outline gradientDuoTone="tealToLime"
                  onClick={handleSendEmail}
                >
                  Gửi
                </Button>
            </div>  
              
            </Modal.Body>
          </Modal>
        </div>
      ) : (
        <div className="h-screen bg-white"></div>
      )}
    </div>
  );
}

export default Login;
