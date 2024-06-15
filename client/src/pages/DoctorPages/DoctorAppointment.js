import React, { useEffect, useRef, useState } from "react";
import { FaRegCalendarPlus, FaHome } from "react-icons/fa";
import { RiServiceFill } from "react-icons/ri";
import { BsCash } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { TbFileDescription } from "react-icons/tb";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Modal, Table, Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointment,
  acceptAppointment,
  completeAppointment,
  cancelAppointment,
} from "../../redux-toolkit/appointmentSlice";
const DoctorAppointment = () => {
  const dispatch = useDispatch();
  const { AppointmentData, ScheduleData, allService, service, error, loading } =
    useSelector((state) => state.appointment);
  const [passed, setPassed] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [idAppointment, setIdAppointment] = useState();
  console.log(AppointmentData)
  useEffect(() => {
    dispatch(fetchAppointment());
  }, []);
  const handleAcceptAppointment = (id) => {
    const data = { id };
    dispatch(acceptAppointment(data)).then(() => {
      dispatch(fetchAppointment());
    });
  };
  const handleCompleteAppointment = (id) => {
    const data = { id };
    dispatch(completeAppointment(data)).then(() => {
      dispatch(fetchAppointment());
    });
  };
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
    if (AppointmentData[i].Status === 3 && passed === 2)
      appointment.push({ ...AppointmentData[i] });
  }

  return (
    <div className="lg:pt-[70px] min-h-screen">
      <div className="lg:mx-16 max-lg:px-4 text-gray-700 lg:flex lg:gap-10">
        <div className="md:my-7 lg:max-xl:w-full max-lg:h-full max-lg:px-3 w-full rounded-xl bg-white text-slate-600 shadow-lg shadow-violet-200 py-5 lg:px-8">
          <div className="lg:mb-5 max-lg:my-5 lg:h-10 max-lg:h-auto grid lg:grid-cols-6 max-lg:grid-cols-12 lg:gap-3 max-lg:gap-1 font-semibold">
            <p className="max-md:mb-3 md:text-2xl max-md:text-3xl lg:col-span-2 max-lg:col-start-1 max-lg:col-span-12">Lịch khám</p>
            <div
              onClick={() => {
                setPassed(4);
              }}
              className={` ${
                passed === 4 && "bg-white shadow-md shadow-violet-300"
              } max-md:flex max-md:justify-center max-md:items-center max-lg:text-sm max-lg:col-start-2 max-lg:col-span-5 lg:col-span-2 lg:col-start-3 rounded-lg text-center hover:bg-slate-50 cursor-pointer py-2 w-full h-full`}
            >
              CHƯA XÁC NHẬN
            </div>
            <div
              onClick={() => {
                setPassed(1);
              }}
              className={` ${
                passed === 1 && "bg-white shadow-md shadow-violet-300"
              } max-md:flex max-md:justify-center max-md:items-center max-lg:text-sm max-lg:col-start-7 max-lg:col-span-3 col-start-5 rounded-lg text-center hover:bg-slate-50 cursor-pointer py-2 w-full h-full`}
            >
              SẮP TỚI
            </div>
            <div
              onClick={() => {
                setPassed(2);
              }}
              className={` ${
                passed === 2 && "bg-white shadow-md shadow-violet-300"
              } max-md:flex max-md:justify-center max-md:items-center max-lg:text-sm max-lg:col-start-10 max-lg:col-span-3 col-start-6 rounded-lg text-center hover:bg-slate-50 cursor-pointer py-2 w-full h-full`}
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
                  <div className="max-lg:text-base lg:text-lg font-medium">
                    {appointment.TimeBooking}
                  </div>
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
                    <div className="flex md:w-[10%] max-md:w-full">
                      <img
                        className="h-14 w-14 rounded-full object-contain border border-lime-200"
                        alt=""
                        src={require("../../Images/doctorBackground2.jpg")}
                      ></img>
                    </div>
                    <div className="w-[90%]">
                      <p className="font-medium lg:text-lg max-lg:mt-3 max-lg:text-base text-gray-600 mb-3">
                        {appointment.FirstName + " " + appointment.LastName}
                      </p>
                      <div className="lg:flex w-full gap-10 mb-3">
                        <div className="flex gap-3 max-lg:mb-3 lg:w-1/2">
                          <RiServiceFill className="h-5 w-5 text-red-500"></RiServiceFill>
                          <p className="min-w-14">Dịch vụ:</p>
                          <p className="font-medium">{appointment.Service}</p>
                        </div>
                        <div className="flex gap-3 lg:w-1/2">
                          <BsCash className="h-5 w-5 text-green-400"></BsCash>
                          <p className="min-w-20">Giá dịch vụ:</p>
                          <p className="font-medium">{appointment.Price} VND</p>
                        </div>
                      </div>

                      <div className="lg:flex w-full gap-10 mb-3">
                        <div className="flex gap-3 lg:w-1/2">
                          <FaPhoneAlt className="h-5 w-5 text-teal-600" />
                          <p className="min-w-20">Số điện thoại:</p>
                          <div className="font-medium">{appointment.Phone}</div>
                        </div>
                        <div className="flex gap-3 max-lg:mb-3 lg:w-1/2">
                          <FaHome className="h-5 w-5 text-teal-600" />
                          <p className="min-w-14">Địa chỉ:</p>
                          <div className="font-medium">
                            {appointment.Address}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 mb-3">
                        <TbFileDescription className="h-5 w-5 text-teal-600" />
                        <p>Triệu chứng:</p>
                        <div className="font-medium text-red-400">
                          {appointment.Information}
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="w-[98%] mx-auto border-[1px] border-lime-100 rounded-lg mb-5"></hr>
                  <div className="flex max-md:justify-center max-md:items-center mx-auto md:w-3/4 max-md:w-full max-md:px-3 gap-10">
                    {appointment.Status != 2 && appointment.Status != 3 && (
                      <Button
                        className="md:w-40 max-md:w-48 md:mx-auto rounded-2xl"
                        gradientMonochrome="failure"
                        onClick={() => {
                          setShowModal(true);
                          setIdAppointment(appointment.id);
                        }}
                      >
                        Hủy
                      </Button>
                    )}
                    {appointment.Status == 4 && (
                      <Button
                        className="md:w-40 max-md:w-48 mx-auto rounded-2xl"
                        gradientDuoTone="greenToBlue"
                        onClick={() => {
                          handleAcceptAppointment(appointment.id);
                        }}
                      >
                        xác nhận
                      </Button>
                    )}
                    {appointment.Status == 1 && (
                      <Button
                        className="md:w-40 max-md:w-48 mx-auto rounded-2xl"
                        gradientDuoTone="greenToBlue"
                        onClick={() => {
                          handleCompleteAppointment(appointment.id);
                        }}
                      >
                        Hoàn thành
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
    </div>
  );
};

export default DoctorAppointment;
