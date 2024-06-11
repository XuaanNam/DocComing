import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaRegCalendarPlus, FaHome } from "react-icons/fa";
import { LuCalendarDays, LuCalendarCheck } from "react-icons/lu";
import { RiServiceFill } from "react-icons/ri";
import { BsCash } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import { TbFileDescription } from "react-icons/tb";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Modal, Table, Button } from "flowbite-react";
import { Rate,Input  } from 'antd';

import {
  fetchAppointment,cancelAppointment, ratingDoctor
} from "../../redux-toolkit/appointmentSlice";
import { useDispatch, useSelector } from "react-redux";

const { TextArea } = Input;
const description = ['Quá tệ', 'Chưa tốt', 'Bình thường', 'Tốt', 'Tuyệt vời'];

const Appointment = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { AppointmentData, error, loading } =
    useSelector((state) => state.appointment);
  const { currentUser} = useSelector(
    (state) => state.user
  );  
  const [showModal, setShowModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [actived, setActived] = useState(2);
  const [passed, setPassed] = useState(1);
  const [idAppointment, setIdAppointment] = useState();
  const [idDoctor, setIdDoctor] = useState();
  const [rating,setRating] = useState(0)
  const [comment,setComment] = useState("")
  const [isRated,setIsRated] = useState(false)
  
  
  useEffect(() => {
    dispatch(fetchAppointment());
  }, []);
  useEffect(() => {
    if (currentUser) {
      if (currentUser.authentication !== 1) Navigate("/");
    } else Navigate("/");
  }, [currentUser]);
  const handleRatingDoctor = () => {
    const data = {
      idDoctor: idDoctor,
      Star: rating,
      Comment: comment
    }
    dispatch(ratingDoctor(data)).then(() => {
      setComment("")
      setRating(0)
      setIsRated(true)
    })
    
  }
  const handleCancelAppointment = (id) => {
    const data = { id };
    dispatch(cancelAppointment(data)).then(() => {
      dispatch(fetchAppointment());
    });
    setShowModal(false);
  };
  let appointment = [];
  for (let i = 0; i < AppointmentData?.length; i++) {
    if (AppointmentData[i].Status === passed)
      appointment.push({ ...AppointmentData[i] });
    if (AppointmentData[i].Status === 4 && passed === 1)
      appointment.push({ ...AppointmentData[i] });
    if (AppointmentData[i].Status === 3 && passed === 2)
      appointment.push({ ...AppointmentData[i] });
  }
  return (
    <div className="bg-white pt-[90px] max-lg:pt-[80px] min-h-screen">
      {currentUser?.authentication === 1 && 
      <div className="lg:mx-16 max-lg:px-4 text-gray-700 lg:flex lg:gap-10">
        <div className="flex flex-col lg:gap-1 my-7 lg:w-[25%] sm:max-lg:w-[30%] lg:h-48 bg-white shadow-lg shadow-violet-200 rounded-lg">
          <div
            onClick={() => setActived(1)}
            className={` ${
              actived === 1 && "bg-[#14b8a6] text-white"
            } flex  gap-4 account-link rounded-lg items-center hover:text-white px-4 py-2 cursor-pointer`}
          >
            <FaRegUserCircle className="h-7 w-7"></FaRegUserCircle>
            <Link to="/patient/profile" className="block py-2 w-full">
              Hồ sơ
            </Link>
          </div>
          <div
            className={` ${
              actived === 2 && "bg-[#14b8a6] text-white"
            } flex gap-4 account-link rounded-lg items-center hover:text-white px-4 py-2 cursor-pointer`}
          >
            <LuCalendarDays className="h-7 w-7"></LuCalendarDays>
            <Link to="/patient/appointment" className="block py-2 w-full">
              Lịch khám của tôi
            </Link>
          </div>
          <div
            className="max-lg:hidden flex gap-4 account-link rounded-lg items-center hover:text-white px-4 py-2 cursor-pointer"
            // onClick={handleLogout}
          >
            <FiLogOut className="h-7 w-7"></FiLogOut>
            <a href="/" className="block py-2 w-full">
              Đăng xuất
            </a>
          </div>
        </div>
        <div className="my-7 lg:w-4/5 max-lg:h-full max-lg:px-3 rounded-xl bg-white shadow-lg text-slate-600 shadow-violet-200 py-5 lg:px-8">
          <div className="mb-5 h-10 grid grid-cols-5 max-lg:grid-cols-10 gap-3 font-semibold">
            <p className="text-2xl lg:col-span-2 max-lg:col-start-1 max-lg:col-span-4">Lịch khám</p>
            <div
              onClick={() => {
                setPassed(1);
              }}
              className={` ${
                passed === 1 && "bg-white shadow-md shadow-violet-300"
              } col-start-4 max-lg:col-start-5 max-lg:col-span-3 rounded-lg text-center hover:bg-slate-50 cursor-pointer py-2 w-full h-full`}
            >
              SẮP TỚI
            </div>
            <div
              onClick={() => {
                setPassed(2);
              }}
              className={` ${
                passed === 2 && "bg-white shadow-md shadow-violet-300"
              } col-start-5 max-lg:col-start-8 max-lg:col-span-3 rounded-lg text-center hover:bg-slate-50 cursor-pointer py-2 w-full h-full`}
            >
              ĐÃ QUA
            </div>
          </div>
          {appointment?.length > 0 ? (
            appointment?.map((appointment) => (
            <div key={appointment.id} className="w-full rounded-xl shadow-lg mb-5 border">
              <div className="p-1 rounded-t-xl bg-teal-200 w-full h-10 grid grid-cols-3 place-items-center">
                <div className="max-lg:text-base lg:text-lg font-medium">{appointment.TimeBooking}</div>
                <div className="max-lg:text-base lg:text-lg font-medium flex gap-2 items-center">
                  <FaRegCalendarPlus />
                  <div>{appointment.DateBooking}</div>
                </div>
                <div className={` ${appointment.Status == 3 && "text-red-600"} max-lg:text-base lg:text-lg font-medium`}>
                    {appointment.Status == 1
                      ? "Đã xác nhận"
                      : appointment.Status == 4
                      ? "Chưa xác nhận"
                      : appointment.Status == 2
                      ? "Đã hoàn thành"
                      : appointment.Status == 3 && "Đã hủy"}
                  </div>
              </div>
              <div className="p-5">
                <div className="lg:flex lg:gap-5">
                  <img
                    className="h-14 w-14 rounded-full object-contain border border-lime-200"
                    alt=""
                    src={appointment.Avt !== null ? appointment.Avt : require("../../Images/pattientavt.png")}
                  ></img>
                  
                  <div className="w-[90%]">
                    <p className="font-medium lg:text-lg max-lg:mt-3 max-lg:text-base text-gray-600 mb-3">
                      {appointment.FirstName + " " + appointment.LastName}
                    </p>
                    <div className="lg:flex w-full gap-10 mb-3">
                      <div className="flex gap-3 items-center max-lg:mb-3 lg:w-1/2">
                        <RiServiceFill className="h-5 w-5 text-red-500"></RiServiceFill>
                        <p>Dịch vụ:</p>
                        <p className="font-medium">{appointment.Service}</p>
                      </div>
                      <div className="flex gap-3 items-center lg:w-1/2">
                        <BsCash className="h-5 w-5 text-green-400"></BsCash>
                        <p>Giá dịch vụ:</p>
                        <p className="font-medium">{appointment.Price} VND</p>
                      </div>
                    </div>
                    
                    <div className="lg:flex w-full gap-10 mb-3">
                      <div className="flex gap-3 items-center max-lg:mb-3 lg:w-1/2">
                        <FaHome className="h-5 w-5 text-teal-600" />
                        <p>Địa chỉ:</p>
                        <div className="font-medium">
                          Khám tại nhà
                        </div>
                      </div>
                      <div className="flex gap-3 items-center lg:w-1/2">
                        <FaPhoneAlt className="h-5 w-5 text-teal-600" />
                        <p>Số điện thoại:</p>
                        <div className="font-medium">{appointment.Phone}</div>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center mb-3">
                        <TbFileDescription className="h-5 w-5 text-teal-600" />
                        <p>Triệu chứng:</p>
                        <div className="font-medium text-red-400">
                          {appointment.Information}
                        </div>
                      </div>
                  </div>
                </div>
                <hr className="w-[98%] mx-auto border-[1px] border-lime-100 rounded-lg mb-5"></hr>
                {appointment.Status === 2 && (
                  <Button
                    className="w-40 mx-auto rounded-2xl"
                    gradientDuoTone="greenToBlue"
                    onClick={() => {
                      setShowRatingModal(true);
                      setIdAppointment(appointment.id);
                      setIdDoctor(appointment.idDoctor)
                    }}
                  >
                    Đánh giá
                  </Button>
                )}
                {appointment.Status !== 2 && appointment.Status !== 3 && (
                  <Button
                    className="w-40 mx-auto rounded-2xl"
                    gradientMonochrome="failure"
                    onClick={() => {
                      setShowModal(true);
                      setIdAppointment(appointment.id);
                    }}
                  >
                    Hủy
                  </Button>
                )}
              </div>
            </div>
            ))
          ) : (
            <p className="py-10 w-full text-center text-2xl font-medium">
              Bạn chưa có cuộc hẹn mới
            </p>
          )}
        </div>
      </div>
      } 
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Bạn chắc chắn muốn hủy cuộc hẹn này chứ?
            </h3>
            <div className="flex justify-center gap-10 transition-all">
              <Button
                className="w-28"
                color="gray"
                onClick={() => setShowModal(false)}
              >
                Đóng
              </Button>
              <Button
                className="w-28"
                color="failure"
                onClick={() => {
                  handleCancelAppointment(idAppointment);
                }}
              >
                Hủy
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        popup
        size="xl"
      >
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>
        {isRated ? 
        <div className="bg-white h-80 rounded-lg p-5 flex flex-col gap-3 justify-center items-center">
          <p className="p-2 text-3xl font-medium text-teal-400">Cảm ơn!</p>
          <p className="text-lg text-teal-500 mb-2">Chúng tôi đã ghi nhận phản hồi của bạn</p>
          <img
          className="h-40 w-44"
          src={require("../../Images/BookingSuccess.png")}
          alt=""
        ></img>
        </div> :     
        <div>
          <div className="h-80 text-center bg-slate-100 rounded-lg p-5">
            <h3 className="p-5 text-lg text-gray-500 dark:text-gray-400">
              Bạn hài lòng về dịch vụ này chứ?
            </h3>
            <Rate className="w-full flex gap-6 justify-center mb-5" 
                  style={{ fontSize: 32}}
                  tooltips={description}
                  onChange={(value)=>{setRating(value)}}></Rate>
            <TextArea
              maxLength={100}
              value={comment}
              onChange={(e) =>{setComment(e.target.value)}}
              placeholder="Để lại nhận xét"
              className="p-3 mb-4 h-28 w-3/4 rounded-lg"
              style={{
                height: 72,
                resize: 'none',
              }}
            />
            <Button
                disabled={rating===0}
                className="w-3/4 h-11 mx-auto"
                gradientDuoTone="purpleToPink"
                onClick={() => {
                  handleRatingDoctor();
                }}
              >
                Gửi
              </Button>
          </div>
          <Button
            className="mt-3 w-full mx-auto h-11"
            outline gradientDuoTone="tealToLime"
            onClick={() => setShowRatingModal(false)}
          >
            Để sau
          </Button>
        </div>  
          }  
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Appointment;
