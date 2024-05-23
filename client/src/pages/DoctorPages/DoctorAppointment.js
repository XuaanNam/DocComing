import React, { useEffect, useRef, useState } from "react";
import { FaRegUserCircle, FaRegCalendarPlus, FaHome } from "react-icons/fa";
import { LuCalendarDays, LuCalendarCheck } from "react-icons/lu";
import { RiServiceFill } from "react-icons/ri";
import { BsCash } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointment,
  acceptAppointment,
} from "../../redux-toolkit/appointmentSlice";
const DoctorAppointment = () => {
  const dispatch = useDispatch();
  const { AppointmentData, ScheduleData, allService, service, error, loading } =
    useSelector((state) => state.appointment);
  const [actived, setActived] = useState();
  const [passed, setPassed] = useState(1);
  useEffect(() => {
    dispatch(fetchAppointment());
  }, []);
  const handleAcceptAppointment = (id) => {
    const data = {id: id} 
    dispatch(acceptAppointment(data));
    console.log(id);
  };
  let appointment = [];
  for (let i = 0; i < AppointmentData?.length; i++)
    if (AppointmentData[i].Status === passed)
      appointment.push({ ...AppointmentData[i] });

  console.log(appointment);
  return (
    <div className="bg-lime-50 h-screen">
      <div className="mx-16 text-gray-700 flex gap-10">
        <div className="my-7 w-full rounded-xl bg-white text-slate-600 shadow-lg shadow-violet-300 py-5 px-8">
          <div className="mb-5 h-10  grid grid-cols-5 gap-3 font-semibold">
            <p className="text-2xl col-span-1">Lịch khám</p>
            <div
              onClick={() => {
                setPassed(4);
              }}
              className={` ${
                passed === 4 && "bg-white shadow-md shadow-violet-300"
              } col-start-3 rounded-lg text-center hover:bg-slate-50 cursor-pointer py-2 w-full h-full`}
            >
              CHƯA XÁC NHẬN
            </div>
            <div
              onClick={() => {
                setPassed(1);
              }}
              className={` ${
                passed === 1 && "bg-white shadow-md shadow-violet-300"
              } col-start-4 rounded-lg text-center hover:bg-slate-50 cursor-pointer py-2 w-full h-full`}
            >
              SẮP TỚI
            </div>
            <div
              onClick={() => {
                setPassed(2);
              }}
              className={` ${
                passed === 2 && "bg-white shadow-md shadow-violet-300"
              } col-start-5 rounded-lg text-center hover:bg-slate-50 cursor-pointer py-2 w-full h-full`}
            >
              ĐÃ QUA
            </div>
          </div>
          {appointment?.length > 0 ? (
            appointment?.map((appointment) => (
              <div
                key={appointment.id}
                className="w-full rounded-xl shadow-lg mb-5 border"
              >
                <div className="p-1 rounded-t-xl bg-teal-200 w-full h-10 grid grid-cols-3 place-items-center">
                  <div className="text-lg font-medium">
                    {appointment.TimeBooking}
                  </div>
                  <div className="text-lg font-medium flex gap-2 items-center">
                    <FaRegCalendarPlus />
                    <div>{appointment.DateBooking}</div>
                  </div>
                  <div className="text-lg font-medium">
                    {appointment.Status == 1
                      ? "Đã xác nhận"
                      : appointment.Status == 4 && "Chưa xác nhận"}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex gap-5">
                    <img
                      className="h-14 w-14 rounded-full object-contain border border-lime-200"
                      alt=""
                      src={require("../../Images/doctorBackground2.jpg")}
                    ></img>
                    <div className="">
                      <p className="font-medium text-lg text-gray-600 mb-3">
                        {appointment.FirstName + appointment.LastName}
                      </p>
                      <div className="flex gap-4 items-center mb-2">
                        <RiServiceFill className="h-5 w-5 text-red-500"></RiServiceFill>
                        <p className="">{appointment.Service}</p>
                      </div>
                      <div className="flex gap-4 items-center mb-2">
                        <BsCash className="h-5 w-5 text-green-400"></BsCash>
                        <p className="">{appointment.Price} VND</p>
                      </div>
                      <div className="flex gap-4 items-center mb-5">
                        <FaHome className="h-5 w-5 text-teal-600" />
                        <div className="">Khám tại nhà</div>
                      </div>
                    </div>
                  </div>
                  <hr className="w-[98%] mx-auto border-[1px] border-lime-100 rounded-lg mb-5"></hr>
                  <div className="flex mx-auto w-3/4 gap-10">
                    <Button
                      className="w-40 mx-auto rounded-2xl"
                      gradientMonochrome="failure"
                    >
                      Hủy
                    </Button>
                    {appointment.Status == 4 && (
                      <Button
                        className="w-40 mx-auto rounded-2xl"
                        gradientDuoTone="greenToBlue"
                        onClick={() => {
                          handleAcceptAppointment(appointment.id);
                        }}
                      >
                        xác nhận
                      </Button>
                    )}
                  </div>
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
    </div>
  );
};

export default DoctorAppointment;
