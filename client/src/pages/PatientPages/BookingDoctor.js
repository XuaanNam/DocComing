import React, { useEffect, useRef, useState } from "react";
import { LuStethoscope } from "react-icons/lu";
import { FaRegAddressBook, FaHome } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { GiSunrise, GiSun, GiSunset } from "react-icons/gi";
import { Button } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, Rate } from "antd";
import dayjs from "dayjs";
import {
  fetchSchedule,
  fetchService,
  getRatingDoctor
} from "../../redux-toolkit/appointmentSlice";
import { fetchProfile } from "../../redux-toolkit/authSlice";
const BookingDoctor = () => {
  const check = JSON.parse(localStorage.getItem("check"));
  const dateFormat = "DD/MM/YYYY";
  const date = new Date();
  const today =
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
    + "/" +
    (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) 
    + "/" +
    date.getFullYear();
  const { service, ScheduleData, AppointmentData,ratingDoctor, error, loading, updated } =
    useSelector((state) => state.appointment);
  const { currentUser, detailDoctor } = useSelector((state) => state.user);
  // const ScheduleData = schedule?.ScheduleData;
  // const AppointmentData = schedule?.AppointmentData;
  console.log(detailDoctor)
  const [index, setIndex] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [currentService, setCurrentService] = useState("");
  const [step, setStep] = useState(0);
  const [step1, setStep1] = useState(0);
  const [step2, setStep2] = useState(0);
  const [step3, setStep3] = useState(0);

  const [currenTime1, setCurrenTime1] = useState("");
  const [currenTime2, setCurrenTime2] = useState("");
  const [currenTime3, setCurrenTime3] = useState("");
  const [time1, setTime1] = useState([]);
  const [time2, setTime2] = useState([]);
  const [time3, setTime3] = useState([]);
  const [actived, setActived] = useState();
  const [data, setData] = useState({});
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { doctorId } = useParams();
  const Id = doctorId?.slice(-9);
  let body = {
    idDoctor: parseInt(Id),
    DateBooking: today,
  };
  const addTime = (fTime, sTime) => {
    const ft = fTime.split(":");
    const st = sTime.split(":");
    let getMinute = (parseInt(ft[1]) + parseInt(st[1])) % 60;
    let getHour =
      parseInt(ft[0]) +
      parseInt(st[0]) +
      (parseInt(ft[1]) + parseInt(st[1]) - getMinute) / 60;
    if (getHour / 10 < 1) {
      getHour = "0" + getHour.toString();
    }
    if (getMinute / 10 < 1) {
      getMinute = "0" + getMinute.toString();
    }
    return getHour + ":" + getMinute;
  };
  const parse = (time) => {
    const split = time.split(":");
    let curr = parseInt(split[0]) + parseInt(split[1]) / 60;
    return curr;
  };
  useEffect(() => {
    if(check !== null){
      dispatch(fetchProfile())
      localStorage.removeItem('check')
    }
  },[check])
  useEffect(() => {
    dispatch(fetchSchedule(body));
    dispatch(fetchService({ idDoctor: Id }));
    dispatch(getRatingDoctor(Id))
    setData({ ...data, DateBooking: today });
  }, []);
  useEffect(() => {
    if (!data?.Service && ScheduleData && service.length > 0) {
      if (ScheduleData[0]?.FirstShiftEnd != null && currenTime1 !== undefined) {
        let first = parse(currenTime1) + parse(service[0]?.EstimatedTime);
        if (first <= parse(ScheduleData[0]?.FirstShiftEnd)) {
          if(parse(currenTime1) > parse(date.toLocaleTimeString())) {
            setTime1([...time1, { id: step1, value: currenTime1 }]);
          }
          setStep1(step1 + 1);
          setTimeout(
            setCurrenTime1(addTime(currenTime1, service[0]?.EstimatedTime)),
            0
          );
          if (
            AppointmentData[step]?.TimeBooking != null &&
            AppointmentData[step]?.EstimatedTime != null
          ) {
            if (
              parse(currenTime1) >
                parse(AppointmentData[step]?.TimeBooking) -
                  parse(service[0]?.EstimatedTime) &&
              parse(currenTime1) <
                parse(AppointmentData[step]?.TimeBooking) +
                  parse(AppointmentData[step]?.EstimatedTime)
            ) {
              setTime1([
                ...time1,
                { id: step1, value: currenTime1, booked: 1 },
              ]);
              if (
                first >=
                parse(AppointmentData[step]?.TimeBooking) +
                  parse(AppointmentData[step]?.EstimatedTime)
              ) {
                setStep(step + 1);
              }
            }
          }
        }
      }
      if (
        ScheduleData[0]?.SecondShiftEnd != null &&
        currenTime2 !== undefined
      ) {
        let second = parse(currenTime2) + parse(service[0]?.EstimatedTime);

        if (second <= parse(ScheduleData[0]?.SecondShiftEnd)) {
          if(parse(currenTime2) > parse(date.toLocaleTimeString())) {
            setTime2([...time2, { id: step2, value: currenTime2 }]);
          }
          setStep2(step2 + 1);
          setTimeout(
            setCurrenTime2(addTime(currenTime2, service[0]?.EstimatedTime)),
            0
          );
          if (
            AppointmentData[step]?.TimeBooking != null &&
            AppointmentData[step]?.EstimatedTime != null
          ) {
            if (
              parse(currenTime2) >
                parse(AppointmentData[step]?.TimeBooking) -
                  parse(service[0]?.EstimatedTime) &&
              parse(currenTime2) <
                parse(AppointmentData[step]?.TimeBooking) +
                  parse(AppointmentData[step]?.EstimatedTime)
            ) {
              setTime2([
                ...time2,
                { id: step2, value: currenTime2, booked: 1 },
              ]);
              if (
                second >=
                parse(AppointmentData[step]?.TimeBooking) +
                  parse(AppointmentData[step]?.EstimatedTime)
              ) {
                setStep(step + 1);
              }
            }
          }
        }
      }
      if (ScheduleData[0]?.ThirdShiftEnd != null && currenTime3 !== undefined) {
        let third = parse(currenTime3) + parse(service[0]?.EstimatedTime);
        if (third <= parse(ScheduleData[0]?.ThirdShiftEnd)) {
          if(parse(currenTime3) > parse(date.toLocaleTimeString())) {
            setTime3([...time3, { id: step3, value: currenTime3 }]);
          }
          setStep3(step3 + 1);
          setTimeout(
            setCurrenTime3(addTime(currenTime3, service[0]?.EstimatedTime)),
            0
          );
          if (
            AppointmentData[step]?.TimeBooking != null &&
            AppointmentData[step]?.EstimatedTime != null
          ) {
            if (
              parse(currenTime3) >
                parse(AppointmentData[step]?.TimeBooking) -
                  parse(service[0]?.EstimatedTime) &&
              parse(currenTime3) <
                parse(AppointmentData[step]?.TimeBooking) +
                  parse(AppointmentData[step]?.EstimatedTime)
            ) {
              setTime3([
                ...time3,
                { id: step3, value: currenTime3, booked: 1 },
              ]);
              if (
                third >=
                parse(AppointmentData[step]?.TimeBooking) +
                  parse(AppointmentData[step]?.EstimatedTime)
              ) {
                setStep(step + 1);
              }
            }
          }
        }
      }
    } else if (data?.Service && ScheduleData && service.length > 0) {
      if (ScheduleData[0]?.FirstShiftEnd != null && currenTime1 !== undefined) {
        let first = parse(currenTime1) + parse(estimatedTime);

        if (first <= parse(ScheduleData[0]?.FirstShiftEnd)) {
          if(parse(currenTime1) > parse(date.toLocaleTimeString())) {
            setTime1([...time1, { id: step1, value: currenTime1 }]);
          }
          setStep1(step1 + 1);
          setTimeout(setCurrenTime1(addTime(currenTime1, estimatedTime)), 0);
          if (
            AppointmentData[step]?.TimeBooking != null &&
            AppointmentData[step]?.EstimatedTime != null
          ) {
            if (
              parse(currenTime1) >
                parse(AppointmentData[step]?.TimeBooking) -
                  parse(estimatedTime) &&
              parse(currenTime1) <
                parse(AppointmentData[step]?.TimeBooking) +
                  parse(AppointmentData[step]?.EstimatedTime)
            ) {
              setTime1([
                ...time1,
                { id: step1, value: currenTime1, booked: 1 },
              ]);
              if (
                first >=
                parse(AppointmentData[step]?.TimeBooking) +
                  parse(AppointmentData[step]?.EstimatedTime)
              ) {
                setStep(step + 1);
              }
            }
          }
        }
      }
      if (
        ScheduleData[0]?.SecondShiftEnd !== null &&
        currenTime2 !== undefined
      ) {
        let second = parse(currenTime2) + parse(estimatedTime);

        if (second <= parse(ScheduleData[0]?.SecondShiftEnd)) {
          if(parse(currenTime2) > parse(date.toLocaleTimeString())) {
            setTime2([...time2, { id: step2, value: currenTime2 }]);
          }
          setStep2(step2 + 1);
          setTimeout(setCurrenTime2(addTime(currenTime2, estimatedTime)), 0);
          if (
            AppointmentData[step]?.TimeBooking != null &&
            AppointmentData[step]?.EstimatedTime != null
          ) {
            if (
              parse(currenTime2) >
                parse(AppointmentData[step]?.TimeBooking) -
                  parse(estimatedTime) &&
              parse(currenTime2) <
                parse(AppointmentData[step]?.TimeBooking) +
                  parse(AppointmentData[step]?.EstimatedTime)
            ) {
              setTime2([
                ...time2,
                { id: step2, value: currenTime2, booked: 1 },
              ]);
              if (
                second >=
                parse(AppointmentData[step]?.TimeBooking) +
                  parse(AppointmentData[step]?.EstimatedTime)
              ) {
                setStep(step + 1);
              }
            }
          }
        }
      }
      if (ScheduleData[0]?.ThirdShiftEnd != null && currenTime3 !== undefined) {
        let third = parse(currenTime3) + parse(estimatedTime);

        if (third <= parse(ScheduleData[0]?.ThirdShiftEnd)) {
          if(parse(currenTime3) > parse(date.toLocaleTimeString())) {
            setTime3([...time3, { id: step3, value: currenTime3 }]);
          }
          setStep3(step3 + 1);
          setTimeout(setCurrenTime3(addTime(currenTime3, estimatedTime)), 0);
          if (
            AppointmentData[step]?.TimeBooking != null &&
            AppointmentData[step]?.EstimatedTime != null
          ) {
            if (
              parse(currenTime3) >
                parse(AppointmentData[step]?.TimeBooking) -
                  parse(estimatedTime) &&
              parse(currenTime3) <
                parse(AppointmentData[step]?.TimeBooking) +
                  parse(AppointmentData[step]?.EstimatedTime)
            ) {
              setTime3([
                ...time3,
                { id: step3, value: currenTime3, booked: 1 },
              ]);
              if (
                third >=
                parse(AppointmentData[step]?.TimeBooking) +
                  parse(AppointmentData[step]?.EstimatedTime)
              ) {
                setStep(step + 1);
              }
            }
          }
        }
      }
    }
  }, [service, currenTime1, currenTime2, currenTime3, data.Service]);
  const changeData = () => {
    setTime1([]);
    setTime2([]);
    setTime3([]);
    setStep(0);
    setStep1(0);
    setStep2(0);
    setStep3(0);
    setCurrenTime1(ScheduleData[0]?.FirstShiftStart?.slice(0, 5));
    setCurrenTime2(ScheduleData[0]?.SecondShiftStart?.slice(0, 5));
    setCurrenTime3(ScheduleData[0]?.ThirdShiftStart?.slice(0, 5));
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
    for (let i = 0; i < service.length; i++) {
      if (service[i].id === parseInt(e.target.value)) {
        setEstimatedTime(service[i].EstimatedTime);
        setIndex(i);
      }
    }
    changeData();
  };
  console.log(detailDoctor)
  useEffect(() => {
    changeData();
  }, [ScheduleData]);

  const handleDatePickerChange = (date, dateString) => {
    setData({ ...data, DateBooking: dateString });
    dispatch(fetchSchedule({ ...body, DateBooking: dateString }));
  };

  const handleBooking = () => {
    const body = {
      idService: data.Service ? data.Service : service[0].id,
      Service: data.Service
        ? service[index].Service
        : service[0].Service,
      idDoctor: Id,
      Price: data.Service ? service[index].Price : service[0].Price,
      DateBooking: data.DateBooking ? data.DateBooking : today,
      TimeBooking: data.timePicker,
    };
    localStorage.setItem("appointment", JSON.stringify(body));
    Navigate("/booking/confirm");
  };
  const handleNavigate = () => {
    const data = {
      doctor: doctorId,
    };
    Navigate("/login");
    localStorage.setItem("check", JSON.stringify(data));
  };
  return (
    <div className="bg-lime-50 max-lg:pt-[80px] pt-[90px]">
      <div className="lg:mx-10 max-lg:px-6 lg:flex lg:gap-5 pb-20">
        <div className="lg:w-[60%] flex flex-col gap-y-5">
          <div className="w-full bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-4 gap-5 w-full mb-5">
              <img
                className="h-44 w-36 object-cover shadow-lg rounded-lg"
                src={detailDoctor[0]?.Avt}
                alt="avt"
              ></img>
              <div className="col-span-3 ">
                <p className="text-2xl font-medium text-slate-700 mb-4"> {detailDoctor[0]?.Degree}. {detailDoctor[0]?.FullName} - Chuyên khoa {detailDoctor[0]?.Major}</p>
                <div className="min-h-11 w-[65%] px-5 py-3 rounded-3xl bg-white bg-opacity-90 shadow-lg text-slate-700 flex gap-3 items-center justify-center">
                  <Rate className="w-52 flex gap-2"
                        value={parseFloat(detailDoctor[0]?.Star)}
                        allowHalf
                        style={{ fontSize: 28}}
                        disabled={true}
                  ></Rate>
                  <div className="w-36 flex gap-2 items-center">
                    <p className="font-medium text-xl text-teal-600">{detailDoctor[0]?.Star?.slice(0,3)}</p>
                    <p className=" text-lg">({ratingDoctor?.length} đánh giá)</p>
                  </div>
                </div>
              </div>
            </div>
           
            <div className="flex flex-wrap gap-3 mb-2">
              <div className="flex gap-3 items-center text-lg mb-2 lg:h-10 w-fit p-4 rounded-3xl bg-white shadow-md shadow-violet-400">
                <FaRegAddressBook className="text-teal-600" />
                <div className="text-slate-600">
                  {detailDoctor[0]?.Degree}
                </div>
              </div>
              <div className="flex gap-3 items-center text-lg mb-2 h-10 w-fit p-4 rounded-3xl bg-white shadow-md shadow-violet-400">
                <LuStethoscope className="text-teal-600" />
                <div className="text-slate-600">
                  Chuyên khoa: {detailDoctor[0]?.Major}
                </div>
              </div>
            </div> 
            <div className="flex flex-wrap gap-3">
              <div className="flex gap-3 items-center text-lg mb-2 h-10 w-fit p-4 rounded-3xl bg-white shadow-md shadow-violet-400">
                <FaHome className="text-teal-600" />
                <div className="text-slate-600">Khám tại nhà</div>
              </div>
              <div className="flex gap-3 items-center text-lg mb-2 h-10 w-fit p-4 rounded-3xl bg-white shadow-md shadow-violet-400">
                <LuStethoscope className="text-teal-600" />
                <div className="text-slate-600">
                  Email: {detailDoctor[0]?.Email}
                </div>
              </div>
            </div>
                  
          </div>
          <div className="w-full bg-white rounded-lg shadow-lg p-6">
            <p className="text-3xl font-medium text-slate-700 mb-5">
              Giới thiệu
            </p>
            <div
              className="text-gray-600"
              dangerouslySetInnerHTML={{ __html: detailDoctor[0]?.Introduce }}
            ></div>
          </div>
          <div className="w-full bg-white rounded-lg shadow-lg p-6">
            <p className="text-3xl font-medium text-slate-700 mb-5">
              Phản hồi từ bệnh nhân
            </p>
            <p className="italic text-slate-600 mb-5">
              Phản hồi từ bệnh nhân đã thực sự được khám từ bác sĩ
            </p>
            {ratingDoctor?.map((item) =>
          <div className="mb-5">
            <div className="flex gap-3 mb-3">
              <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center">
                <img
                  className="rounded-full h-10 w-10 object-cover"
                  alt=""
                  src={item.Avt || require("../../Images/pattientavt.png")}
                ></img>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-lg font-medium text-slate-700 mb-1">
                  {item.FullName}
                </div>
                <Rate className="w-full" 
                      defaultValue={item.Star}
                      style={{ fontSize: 18}}
                      disabled={true}
                      >
                </Rate>
                <p className="text-lg text-slate-600 mt-2">{item.Comment}</p>
              </div>
            </div>
            <hr className="w-full border-slate-200 rounded-lg my-2"></hr>
          </div>
          )}
          </div>
        </div>
        <div className="lg:w-[40%] flex flex-col gap-y-5 max-lg:mt-10">
          <div className="w-full bg-white rounded-lg shadow-xl p-6">
            <p className="max-lg:text-xl lg:hidden font-medium text-slate-600 mb-3">
              ĐẶT LỊCH KHÁM NGAY!
            </p>
            <p className="font-medium text-slate-600 mb-3">
              Thời gian làm việc
            </p>
            <DatePicker
              id="DateBooking"
              className="w-full h-[44px] mb-3 text-xl bg-white border border-gray-300 text-teal-700 font-medium rounded-lg block px-3 p-1"
              value={dayjs(data?.DateBooking, dateFormat)}
              format={dateFormat}
              onChange={handleDatePickerChange}
              minDate={dayjs(today, dateFormat)}
            />
            {time1.length > 0 && (
              <>
                <div className="flex gap-3 items-center mb-3">
                  <GiSunrise className="text-teal-800"></GiSunrise>
                  <div className="text-teal-800">Buổi sáng</div>
                </div>
                <div className="flex flex-wrap gap-y-4 gap-x-5 mb-3">
                  {time1?.map((item) => (
                    <div
                      id="timePicker"
                      key={item.id}
                      className={`${
                        item.booked === 1 &&
                        " bg-gray-400 opacity-60 text-white border-none is-disabled"
                      } ${
                        actived === item.value &&
                        !item.booked &&
                        "bg-teal-500 text-white"
                      } shadow-md h-10 w-28 rounded-lg text-sm font-medium cursor-pointer text-teal-500 border border-teal-500 flex items-center justify-center`}
                      onClick={() => {
                        setActived(item.value);
                        setData({ ...data, timePicker: item.value });
                      }}
                    >
                      {item.booked === 1 ? (
                        <div className="flex flex-col items-center justify-center p-1">
                          {item.value}
                          <p>Đã được đặt</p>
                        </div>
                      ) : (
                        item.value
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
            {time2.length > 0 && (
              <>
                <div className="flex gap-3 items-center mb-3">
                  <GiSun className="text-teal-800"></GiSun>
                  <div className="text-teal-800">Buổi chiều</div>
                </div>
                <div className="flex flex-wrap gap-y-4 gap-x-5 mb-3">
                  {time2?.map((item) => (
                    <div
                      key={item.id}
                      className={`${
                        item.booked === 1 &&
                        " bg-gray-400 opacity-60 text-white border-none is-disabled"
                      } ${
                        actived === item.value &&
                        !item.booked &&
                        "bg-teal-500 text-white"
                      } shadow-md h-10 w-28 rounded-lg text-sm font-medium cursor-pointer text-teal-500 border border-teal-500 flex items-center justify-center`}
                      onClick={() => {
                        setActived(item.value);
                        setData({ ...data, timePicker: item.value });
                      }}
                    >
                      {item.booked === 1 ? (
                        <div className="flex flex-col items-center justify-center p-1">
                          {item.value}
                          <p>Đã được đặt</p>
                        </div>
                      ) : (
                        item.value
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
            {time3.length > 0 && (
              <>
                <div className="flex gap-3 items-center mb-3">
                  <GiSunset className="text-teal-800"></GiSunset>
                  <div className="text-teal-800">Buổi tối</div>
                </div>
                <div className="flex flex-wrap gap-y-4 gap-x-5">
                  {time3?.map((item) => (
                    <div
                      key={item.id}
                      className={`${
                        item.booked === 1 &&
                        " bg-gray-400 opacity-60 text-white border-none is-disabled"
                      } ${
                        actived === item.value &&
                        !item.booked &&
                        "bg-teal-500 text-white"
                      } shadow-md h-10 w-28 rounded-lg text-sm font-medium cursor-pointer text-teal-500 border border-teal-500 flex items-center justify-center`}
                      onClick={() => {
                        setActived(item.value);
                        setData({ ...data, timePicker: item.value });
                      }}
                    >
                      {item.booked === 1 ? (
                        <div className="flex flex-col items-center justify-center p-1">
                          {item.value}
                          <p>Đã được đặt</p>
                        </div>
                      ) : (
                        item.value
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
            <div className="w-full my-5">
              <p className="font-medium text-teal-800">Loại dịch vụ</p>
              <div className="max-w-md h-[40px] mt-2">
                <select
                  className="bg-white cursor-pointer border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="Service"
                  // required
                  value={data?.Service}
                  onChange={handleChange}
                >
                  {service?.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.Service}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mb-5 items-center">
              <p className=" text-teal-800">Phí dịch vụ: </p>
              <p className="font-medium text-emerald-500 text-lg">
                {data?.Service ? service[index]?.Price : service[0]?.Price} VND
              </p>
            </div>
            <p className="italic text-sm text-teal-800 mb-5">
              Lưu ý: Bảng giá dịch vụ trên chỉ mang tính chất tham khảo và có
              thể thay đổi tuỳ theo tình trạng bệnh lý, phương pháp điều trị.
              Vui lòng trao đổi với bác sĩ về các chi phí dịch vụ trước khi tiến
              hành thăm khám & chữa bệnh.
            </p>
            <Button
              disabled={!actived}
              onClick={currentUser ? handleBooking : handleNavigate}
              className="w-full h-[48px] text-center"
              gradientDuoTone="greenToBlue"
            >
              <p className="text-lg">ĐẶT HẸN</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDoctor;
