import React, { useEffect, useState } from "react";
import { LuStethoscope } from "react-icons/lu";
import { FaRegAddressBook, FaHome } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { GiSunrise, GiSun, GiSunset } from "react-icons/gi";
import Datepicker from "flowbite-datepicker/Datepicker";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchSchedule, fetchService } from "../redux-toolkit/appointmentSlice";
const BookingDoctor = () => {
  const date = new Date();
  const today =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  const { service, ScheduleData, AppointmentData, error, loading, updated } =
    useSelector((state) => state.appointment);
  // const ScheduleData = schedule?.ScheduleData;
  // const AppointmentData = schedule?.AppointmentData;

  const [step, setStep] = useState(0);
  const [step1, setStep1] = useState(0);
  const [step2, setStep2] = useState(0);
  const [step3, setStep3] = useState(0);

  const [currenTime1, setCurrenTime1] = useState(
    ScheduleData[0]?.FirstShiftStart?.slice(0, 5)
  );
  const [currenTime2, setCurrenTime2] = useState(
    ScheduleData[0]?.SecondShiftStart?.slice(0, 5)
  );
  const [currenTime3, setCurrenTime3] = useState(
    ScheduleData[0]?.ThirdShiftStart?.slice(0, 5)
  );
  console.log(currenTime1, currenTime2, currenTime3, ScheduleData[0]);
  const [time1, setTime1] = useState([]);
  const [time2, setTime2] = useState([]);
  const [time3, setTime3] = useState([]);

  const [actived, setActived] = useState();
  const [data, setData] = useState({});
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  let body = {
    idDoctor: 235523485,
    DateBooking: today,
  };
  console.log("data", data);

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
    dispatch(fetchSchedule(body));
    dispatch(fetchService({ idDoctor: 235523485 }));
    const datepickerEl = document?.getElementById("date");
    new Datepicker(datepickerEl, {
      format: "dd/mm/yyyy",
      title: "Thời gian làm việc",
      today: "true",
      minDate: new Date(),
    });
    setData({ ...data, date: today });
  }, []);
  useEffect(() => {
    if (!data.Service && ScheduleData) {
      if (ScheduleData[0]?.FirstShiftEnd != null && currenTime1 !== undefined) {
        let first = parse(currenTime1) + parse(service[0]?.EstimatedTime);

        if (first <= parse(ScheduleData[0]?.FirstShiftEnd)) {
          setTime1([...time1, { id: step1, value: currenTime1 }]);
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
              console.log(step1, currenTime1);
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
          setTime2([...time2, { id: step2, value: currenTime2 }]);
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
          setTime3([...time3, { id: step3, value: currenTime3 }]);
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
    } else {
      if (ScheduleData[0]?.FirstShiftEnd != null && currenTime1 !== undefined) {
        let first =
          parse(currenTime1) + parse(service[data.Service - 1].EstimatedTime);

        if (first <= parse(ScheduleData[0]?.FirstShiftEnd)) {
          setTime1([...time1, { id: step1, value: currenTime1 }]);
          setStep1(step1 + 1);
          setTimeout(
            setCurrenTime1(
              addTime(currenTime1, service[data.Service - 1].EstimatedTime)
            ),
            0
          );
          if (
            AppointmentData[step]?.TimeBooking != null &&
            AppointmentData[step]?.EstimatedTime != null
          ) {
            if (
              parse(currenTime1) >
                parse(AppointmentData[step]?.TimeBooking) -
                  parse(service[data.Service - 1]?.EstimatedTime) &&
              parse(currenTime1) <
                parse(AppointmentData[step]?.TimeBooking) +
                  parse(AppointmentData[step]?.EstimatedTime)
            ) {
              setTime1([
                ...time1,
                { id: step1, value: currenTime1, booked: 1 },
              ]);
              console.log(step1, currenTime1);
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
        let second =
          parse(currenTime2) + parse(service[data.Service - 1].EstimatedTime);

        if (second <= parse(ScheduleData[0]?.SecondShiftEnd)) {
          setTime2([...time2, { id: step2, value: currenTime2 }]);
          setStep2(step2 + 1);
          setTimeout(
            setCurrenTime2(
              addTime(currenTime2, service[data.Service - 1].EstimatedTime)
            ),
            0
          );
          if (
            AppointmentData[step]?.TimeBooking != null &&
            AppointmentData[step]?.EstimatedTime != null
          ) {
            if (
              parse(currenTime2) >
                parse(AppointmentData[step]?.TimeBooking) -
                  parse(service[data.Service - 1]?.EstimatedTime) &&
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
        let third =
          parse(currenTime3) + parse(service[data.Service - 1].EstimatedTime);

        if (third <= parse(ScheduleData[0]?.ThirdShiftEnd)) {
          setTime3([...time3, { id: step3, value: currenTime3 }]);
          setStep3(step3 + 1);
          setTimeout(
            setCurrenTime3(
              addTime(currenTime3, service[data.Service - 1].EstimatedTime)
            ),
            0
          );
          if (
            AppointmentData[step]?.TimeBooking != null &&
            AppointmentData[step]?.EstimatedTime != null
          ) {
            if (
              parse(currenTime3) >
                parse(AppointmentData[step]?.TimeBooking) -
                  parse(service[data.Service - 1]?.EstimatedTime) &&
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
    changeData();
  };
  useEffect(() => {
    changeData();
  }, [ScheduleData]);

  const handleDatePickerChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
    dispatch(fetchSchedule({ ...body, DateBooking: e.target.value })); //cu
  };

  const handleBooking = () => {
    const body = {
      idService: data.Service ? data.Service : service[0].id,
      Service: data.Service
        ? service[data.Service - 1].Service
        : service[0].Service,
      idDoctor: 235523485,
      Price: data.Service ? service[data.Service - 1].Price : service[0].Price,
      // Information,
      DateBooking: data.date ? data.date : today,
      TimeBooking: data.timePicker,
    };
    localStorage.setItem("appointment", JSON.stringify(body));
    Navigate("/booking/confirm");
  };
  return (
    <div className="bg-slate-50 pt-[90px]">
      <div className="mx-10 flex gap-5">
        <div className="w-[60%] flex flex-col gap-y-5">
          <div className="w-full bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-4 gap-5 w-full mb-5">
              <img
                className="h-44 w-36 object-cover border rounded-lg"
                src={require("../Images/doctor1.jpg")}
                alt="avt"
              ></img>
              <div className="text-2xl font-medium col-span-3 text-slate-700">
                ThS. BSCKI. Nguyễn Đức Hương - Chuyên khoa Tai Mũi Họng, Ung
                Bướu
              </div>
            </div>
            <div className="flex gap-3 items-center text-lg mb-2">
              <LuStethoscope className="text-teal-600" />
              <div className="text-slate-600">Tai Mũi Họng, Ung bướu</div>
            </div>
            <div className="flex gap-3 items-center text-lg mb-2">
              <FaRegAddressBook className="text-teal-600" />
              <div className="text-slate-600">
                1 Nơ Trang Long, Bình Thạnh, Hồ Chí Minh
              </div>
            </div>
            <div className="flex gap-3 items-center text-lg mb-2">
              <FaHome className="text-teal-600" />
              <div className="text-slate-600">Khám tại nhà</div>
            </div>
            <div className="text-gray-600 text-xl font-medium my-5">
              Thế mạnh chuyên môn
            </div>
            <div className="flex flex-wrap gap-3 w-full">
              <div className="h-[36px] flex items-center p-2 w-fit text-gray-600 font-medium rounded-3xl bg-emerald-300">
                Tai mũi họng
              </div>
              <div className="h-[36px] flex items-center p-2 w-fit text-gray-600 font-medium rounded-3xl bg-emerald-300">
                Ung bướu
              </div>
              <div className="h-[36px] flex items-center p-2 w-fit text-gray-600 font-medium rounded-3xl bg-emerald-300">
                Phẫu thuật nội soi
              </div>
              <div className="h-[36px] flex items-center p-2 w-fit text-gray-600 font-medium rounded-3xl bg-emerald-300">
                Tạo hình thẩm mỹ
              </div>
              <div className="h-[36px] flex items-center p-2 w-fit text-gray-600 font-medium rounded-3xl bg-emerald-300">
                Thẩm mỹ nội khoa
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-lg shadow-lg p-6">
            <p className="text-3xl font-medium text-slate-700 mb-5">
              Giới thiệu
            </p>
            <p className="text-slate-600 text-justify">
              Thạc sĩ, Bác sĩ Chuyên khoa 1 Nguyễn Đức Hương có hơn 15 năm kinh
              nghiệm khám chữa bệnh Tai - Mũi - Họng, Ung Bướu, đặc biệt là Nội
              soi tầm soát các bệnh lý Tai - Mũi - Họng, Ung thư đầu mặt cổ. Bác
              sĩ hiện đang công tác tại Bệnh viện Ung Bướu - TP. Hồ Chí Minh với
              cương vị bác sĩ phẫu thuật chính Khoa đầu - mặt - cổ. ThS. BSCKI
              Nguyễn Đức Hương khám và điều trị các bệnh:
              <p>- Viêm mũi xoang </p>
              <p>- Viêm VA </p>
              <p>- Viêm amidan </p>
              <p>- Thủng màng nhĩ ( vá nhĩ nội soi) </p>
              <p>- Viêm tai giữa </p>
            </p>
          </div>
          <div className="w-full bg-white rounded-lg shadow-lg p-6">
            <p className="text-3xl font-medium text-slate-700 mb-5">
              Phản hồi từ bệnh nhân
            </p>
            <p className="italic text-slate-600">
              Phản hồi từ bệnh nhân đã thực sự được khám từ bác sĩ
            </p>
          </div>
        </div>
        <div className="w-[40%] flex flex-col gap-y-5">
          <div className="w-full bg-white rounded-lg shadow-xl p-6">
            <p className="font-medium text-slate-600 mb-3">
              Thời gian làm việc
            </p>
            <div className="relative w-full flex items-center mb-5">
              <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                id="date"
                datepicker
                datepicker-autohide
                value={data?.date}
                type="text"
                className="w-full h-[40px] bg-white border border-gray-300 text-teal-700 text-base font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-12 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onSelect={handleDatePickerChange}
              />
              <IoIosArrowDown className="absolute right-3"></IoIosArrowDown>
            </div>

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
                      } h-10 w-28 rounded-lg text-sm font-medium cursor-pointer text-teal-500 border border-teal-500 flex items-center justify-center`}
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
                      } h-10 w-28 rounded-lg text-sm font-medium cursor-pointer text-teal-500 border border-teal-500 flex items-center justify-center`}
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
                      } h-10 w-28 rounded-lg text-sm font-medium cursor-pointer text-teal-500 border border-teal-500 flex items-center justify-center`}
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
                  className="bg-white border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                {data?.Service
                  ? service[data.Service - 1]?.Price
                  : service[0]?.Price}
                VND
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
              onClick={handleBooking}
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
