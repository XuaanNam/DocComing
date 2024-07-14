import React, { useEffect, useRef, useState } from "react";
import { FaRegCalendarPlus, FaHome } from "react-icons/fa";
import { RiServiceFill } from "react-icons/ri";
import { BsCash } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { TbFileDescription } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminAppointment,
} from "../../redux-toolkit/appointmentSlice";
import { DatePicker, Rate } from "antd";
import { Button } from "flowbite-react";
import { IoIosCloseCircleOutline } from "react-icons/io";
const AdminAppointment = () => {
  const format = 'HH:mm';
  const dateFormat = "DD/MM/YYYY";
  const dispatch = useDispatch();
  const { AppointmentData, ScheduleData, allService, service, error, loading } =
    useSelector((state) => state.appointment);
  const [passed, setPassed] = useState(1);
  const [currentAppointment, setCurrentAppointment] = useState([])
  const [filterDate, setFilterDate] = useState(false)
  const [isFilter, setIsFilter] = useState(false)
  
  useEffect(() => {
    dispatch(fetchAdminAppointment());
  }, []);
  let appointment = [];
  for (let i = 0; i < AppointmentData?.length; i++) {
    if (AppointmentData[i].Status === passed)
      appointment.push({ ...AppointmentData[i] });
    if (AppointmentData[i].Status === 3 && passed === 2)
      appointment.push({ ...AppointmentData[i] });
  }
  const TransferPricing = (price) => {
    let pr = parseInt(price, 10).toString();

    let formattedNum = pr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    formattedNum += " đ";

    return formattedNum;
  }
  const handleDatePickerChange = (date, dateString) => {
    if(filterDate){
      getAppointmentsOnDate(appointment, dateString)
    }
  };
  const getAppointmentsOnDate = (appointments, targetDate) => {
    let appointmentsOnDate = []
    for(let i = 0; i<appointments.length; i++){
      if(appointments[i].DateBooking == targetDate)
        appointmentsOnDate.push(appointments[i])
    }
    setCurrentAppointment(appointmentsOnDate)
    setIsFilter(true)
  }
  let slice =  []
  if(isFilter)
    slice = currentAppointment
  else
    slice = appointment
  return (
    <div className="lg:pt-[70px] bg-gray-50 px-10 h-screen">
      <div className="max-lg:px-4 h-full text-gray-700 lg:flex lg:flex-col lg:gap-10">
        <div className="md:my-7 lg:max-xl:w-full h-[94%] max-lg:h-full max-lg:px-3 w-full rounded-xl bg-white text-slate-600 shadow-lg shadow-violet-200 py-5 lg:px-8">
          <div className="lg:mb-2 max-lg:my-5 lg:h-10 max-lg:h-auto grid lg:grid-cols-6 max-lg:grid-cols-12 lg:gap-3 max-lg:gap-1 font-semibold">
            <p className="max-md:mb-3 md:text-2xl max-md:text-3xl lg:col-span-2 max-lg:col-start-1 max-lg:col-span-12">Lịch khám</p>
            <div className = "lg:w-full lg:flex lg:justify-end lg:col-start-3 lg:col-span-2">
              <div
                onClick={() => {
                  setPassed(4);
                }}
                className={` ${
                  passed === 4 && "bg-white shadow-md shadow-violet-300"
                } first-letter:max-md:flex max-md:justify-center max-md:items-center max-lg:text-sm max-lg:col-start-2 max-lg:col-span-5 lg:col-span-2 lg:col-start-3 rounded-lg text-center hover:bg-slate-50 cursor-pointer py-2 max-lg:w-full lg:w-1/2 h-full`}
              > 
                CHƯA XÁC NHẬN
              </div>
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
          {appointment?.length > 0 &&
              <div className="flex gap-3 items-center mb-4">
                    <p className="font-medium">Lọc theo ngày</p>
                    {filterDate ?
                      <div className="flex gap-3 items-center w-52">
                        <DatePicker className="h-9 md:w-40 max-md:w-40" 
                          format={dateFormat}
                          onChange={handleDatePickerChange}
                          placeholder="Chọn ngày"
                        />
                        <IoIosCloseCircleOutline className="h-6 w-6 text-rose-500 cursor-pointer" onClick={()=>{setFilterDate(false);setIsFilter(false);setCurrentAppointment([])}}></IoIosCloseCircleOutline>
                      </div>
                      :
                      <Button
                        size="sm"
                        className="w-32 h-9"
                        gradientDuoTone="purpleToPink"
                        onClick={() => {
                          setFilterDate(true)         
                        }}
                      >
                        Chọn ngày
                      </Button>
                    }
              </div>
          }
          <div className="overflow-auto h-[85%] ">
          {slice?.length > 0 ? (
            slice?.map((appointment) => (
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
                <div className="py-5 px-12">
                  <div className="">
                    <div className="md:w-full max-md:w-full flex mb-2">
                        <div className="w-1/2"> 
                          <div>
                              <img
                                  className="h-14 w-14 mb-2 rounded-full object-contain border border-lime-200"
                                  alt=""
                                  src={appointment.AvtDoctor}
                              ></img>
                              <div className="flex items-center mb-2 gap-3 max-lg:mb-2">
                                  <FaUser className="h-4 min-w-5 text-teal-600" />
                                  <p className="min-w-14">Họ và tên Bác sĩ:</p>
                                  <p className="font-medium lg:text-lg max-lg:mt-2 max-lg:text-base text-gray-600">
                                      {appointment.FullNameDoctor}
                                  </p>
                              </div>
                              <div className="flex items-center mb-2 gap-3 max-lg:mb-2">
                                  <FaPhoneAlt className="h-4 min-w-5 text-teal-600" />
                                  <p className="min-w-14">Số điện thoại:</p>
                                  <p className="font-medium lg:text-lg max-lg:mt-2 max-lg:text-base text-teal-500">
                                      {appointment.PhoneDoctor}
                                  </p>
                              </div>
                              <div className="flex items-center mb-2 gap-3 max-lg:mb-3">
                                  <RiServiceFill className="h-5 min-w-5 text-red-500"></RiServiceFill>
                                  <p className="min-w-14">Dịch vụ:</p>
                                  <p className="font-medium">{appointment.Service}</p>
                              </div>
                              <div className="flex items-center mb-2 gap-3">
                                  <BsCash className="h-5 min-w-5 text-green-400"></BsCash>
                                  <p className="min-w-20">Giá dịch vụ:</p>
                                  <p className="font-medium text-green-400">{TransferPricing(appointment.Price)}</p>
                              </div>
                              {appointment?.Advice &&
                              <div className="flex gap-3 mb-2">
                                <TbFileDescription className="h-5 min-w-5 text-teal-600" />
                                <p className="font-medium">Ghi chú:</p>
                                <div className="font-medium italic text-red-500">
                                  {appointment.Advice}
                                </div>                  
                              </div>
                              }
                          </div>
                        </div>
                        <div className="w-[1px] max-sm:h-10 bg-gray-300"></div>

                        <div className="w-1/2 pl-12">
                          <div>
                              <img
                                  className="h-14 w-14 mb-2 rounded-full object-contain border border-lime-200"
                                  alt=""
                                  src={appointment.AvtPatient !== null ? appointment.AvtPatient : require("../../Images/pattientavt.png")}
                              ></img>
                              <div className="flex items-center mb-2 gap-3 max-lg:mb-2">
                                  <FaUser className="h-4 min-w-5 text-teal-600" />
                                  <p className="min-w-14">Họ và tên Bệnh nhân:</p>
                                  <p className="font-medium lg:text-lg max-lg:mt-2 max-lg:text-base text-gray-600">
                                      {appointment.FullNamePatient}
                                  </p>
                              </div>
                              <div className="flex items-center mb-2 gap-3 max-lg:mb-2">
                                  <FaPhoneAlt className="h-4 min-w-5 text-teal-600" />
                                  <p className="min-w-14">Số điện thoại:</p>
                                  <p className="font-medium lg:text-lg max-lg:mt-2 max-lg:text-base text-teal-500">
                                      {appointment.PhonePatient}
                                  </p>
                              </div>
                              <div className="flex items-center mb-2 gap-3 max-lg:mb-3">
                                  <FaHome className="h-5 min-w-5 text-teal-600" />
                                  <p className="min-w-14">Địa chỉ:</p>
                                  <div className="font-medium">
                                      {appointment.AddressPatient}
                                  </div>
                              </div>
                              <div className="flex items-center mb-2 gap-3">
                                  <TbFileDescription className="h-5 min-w-5 text-teal-600" />
                                  <p>Triệu chứng:</p>
                                  <div className="font-medium text-red-500">
                                  {appointment.Information}
                                  </div>
                              </div>
                          </div>
                        </div>
                    </div>
                  </div>
                  {appointment.Status === 2 && 
                      <div className="w-full flex flex-col gap-3">
                        {appointment.NoteRecord !== null && appointment.ReExaminationDate !== null &&
                          <hr className="w-[98%] mx-auto border-[1px] my-3 border-lime-50 rounded-lg"></hr>
                        }
                        <div className="grid grid-cols-2 gap-5">
                          {appointment.ReExaminationDate !== null &&
                            <div className="flex flex-col col-start-1 gap-3 h-full w-full p-4 bg-white shadow-md shadow-violet-200 rounded-lg">
                              <div className="flex items-center">
                                <p className="font-medium text-black text-lg w-1/2">Lịch hẹn tái khám</p>
                                {appointment.NoteStatus === 0 && 
                                  <div className="w-1/2 mr-4 flex justify-end text-green-500 font-medium">Chưa xác nhận</div>
                                }
                                {appointment.NoteStatus === 1 && 
                                  <div className="w-1/2 mr-4 flex justify-end text-green-500 font-medium">Đã xác nhận</div>
                                }
                                {appointment.NoteStatus === 2 && 
                                  <div className="w-1/2 mr-4 flex justify-end text-rose-500 font-medium">Đã hủy</div>
                                }
                              </div>
                              <div className="flex gap-3">
                                <div className="flex flex-col gap-1 w-full">
                                  <p>Ngày tái khám: <span className="text-green-500 font-medium">{appointment.ReExaminationDate.slice(0,10)}</span></p>
                                  <p>Thời gian: <span className="text-green-500 font-medium">{appointment.ReExaminationDate.slice(11,16)}</span></p>
                                  <p>Chi phí dự kiến: <span className="text-green-500 font-medium">{appointment.ReExaminationPrice} đ</span></p>
                                </div>
                              </div>
                            </div>
                          }
                          {appointment.NoteRecord !== null &&
                            <div className="flex flex-col col-start-2 gap-3 h-full w-full p-4 bg-white shadow-md shadow-violet-200 rounded-lg">
                                <p className="font-medium text-black text-lg w-1/2">Bệnh án</p>   
                                <div className="flex gap-3">
                                <div className="flex flex-col gap-1 w-full">
                                  <p>Chẩn đoán: <span className="text-teal-600 font-medium">{appointment.Record}</span></p>
                                  <p>Mô tả: <span className="text-teal-600 font-medium">{appointment.NoteRecord}</span></p>
                                </div>
                              </div>
                            </div>
                          }    
                        </div>
                      </div>
                    }
                </div>               
              </div>
            ))
          ) : 
            <>
              {appointment?.length == 0 &&
                <p className="py-4 w-full text-center text-2xl font-medium">
                  Chưa có cuộc hẹn
                </p>
              }
              {isFilter && currentAppointment?.length == 0 &&
                <p className="py-4 w-full text-center text-2xl font-medium">
                  Hệ thống chưa ghi nhận cuộc hẹn nào trong ngày này
                </p>
              }
            </>
          }
          </div>         
        </div>
      </div>
    </div>
  );
};

export default AdminAppointment;
