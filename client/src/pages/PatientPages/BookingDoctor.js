import React, { useEffect, useState } from "react";
import { LuStethoscope } from "react-icons/lu";
import { FaRegAddressBook, FaHome } from "react-icons/fa";
import { GiSunrise, GiSun, GiSunset } from "react-icons/gi";
import { Button } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, Rate, Select } from "antd";
import dayjs from "dayjs";
import {
  fetchSchedule,
  fetchService,
  getRatingDoctor
} from "../../redux-toolkit/appointmentSlice";
import { fetchProfile } from "../../redux-toolkit/authSlice";
import { yellow,grey } from '@mui/material/colors';
import StarIcon from '@mui/icons-material/Star';

const BookingDoctor = () => {
  const check = JSON.parse(localStorage.getItem("check"));
  const dateFormat = "DD/MM/YYYY";
  const date = new Date();
  const tomorrow =
    (date.getDate() < 10 ? "0" + (date.getDate() + 1): (date.getDate() + 1))
    + "/" +
    (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) 
    + "/" +
    date.getFullYear();
  const { service, ScheduleData, AppointmentData,ratingDoctor, error, loading, updated } =
    useSelector((state) => state.appointment);
  const { currentUser, detailDoctor } = useSelector((state) => state.user);
  const loadingDoctor = useSelector((state) => state.user.loading)
  const loadingSchedule = useSelector((state) => state.appointment.loading)
  const [index, setIndex] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState("");
  const [time1, setTime1] = useState([]);
  const [time2, setTime2] = useState([]);
  const [time3, setTime3] = useState([]);
  const [actived, setActived] = useState();
  const [data, setData] = useState({});
  const [rating,setRating] = useState([0,0,0,0,0])
  const [count ,setCount] = useState(0)
  const [star,setStar] = useState(0)
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { doctorId } = useParams();
  const Id = doctorId?.slice(-9);
  let body = {
    idDoctor: parseInt(Id),
    DateBooking: tomorrow,
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
    const split = time?.split(":");
    let curr = parseInt(split[0]) + parseInt(split[1]) / 60;
    return curr;
  };

  const renderTimeBooking = (estimatedTime,ScheduleData) =>{
    if (ScheduleData.FirstShiftEnd != null) {
      let currentTime1 = ScheduleData.FirstShiftStart?.slice(0,5)
      let time1 = []
      let step1 = 0
      while(parse(currentTime1) <= parse(ScheduleData.FirstShiftEnd)){
        time1.push({value: currentTime1})
        if(AppointmentData?.length > 0){
          for (let i = 0; i < AppointmentData?.length; i++) {
            if (
              parse(currentTime1) > parse(AppointmentData[i].TimeBooking) - parse(estimatedTime)
              && parse(currentTime1) < parse(AppointmentData[i].TimeBooking) + parse(AppointmentData[i].EstimatedTime)
            ) {
              time1[step1] = {...time1[step1], booked: 1 }            
            }
          }
        }
        step1++
        currentTime1 = addTime(currentTime1,estimatedTime)
      }
      setTime1(time1)
    }
    if (ScheduleData.SecondShiftEnd != null) {
      let currentTime2 = ScheduleData.SecondShiftStart?.slice(0,5)
      let time2 = []
      let step2 = 0
      while(parse(currentTime2) <= parse(ScheduleData.SecondShiftEnd)){
        time2.push({value: currentTime2})
        if(AppointmentData?.length > 0){
          for (let i = 0; i < AppointmentData.length; i++) {
            if (
              parse(currentTime2) > parse(AppointmentData[i].TimeBooking) - parse(estimatedTime)
              && parse(currentTime2) < parse(AppointmentData[i].TimeBooking) + parse(AppointmentData[i].EstimatedTime)
            ) {
              time2[step2] = {...time2[step2], booked: 1 }            
            }
          }
        }
        step2++
        currentTime2 = addTime(currentTime2,estimatedTime)
      }
      setTime2(time2)
    }
    if (ScheduleData.ThirdShiftEnd != null) {
      let currentTime3 = ScheduleData.ThirdShiftStart?.slice(0,5)
      let time3 = []
      let step3 = 0
      while(parse(currentTime3) <= parse(ScheduleData.ThirdShiftEnd)){
        time3.push({value: currentTime3})
        if(AppointmentData?.length > 0){
          for (let i = 0; i < AppointmentData.length; i++) {
            if (
              parse(currentTime3) > parse(AppointmentData[i].TimeBooking) - parse(estimatedTime)
              && parse(currentTime3) < parse(AppointmentData[i].TimeBooking) + parse(AppointmentData[i].EstimatedTime)
            ) {
              time3[step3] = {...time3[step3], booked: 1 }            
            }
          }
        }
        step3++
        currentTime3 = addTime(currentTime3,estimatedTime)
      }
      setTime3(time3)
    }
  }
  useEffect(() => {
    if(check !== null){
      localStorage.removeItem('check')
    }
  },[check])
  useEffect(() => {
    dispatch(fetchSchedule(body))
    dispatch(fetchService({ idDoctor: Id })).then((res) =>{
      setData({ ...data,DateBooking: tomorrow, Service: res.payload.data[0].id})
      setEstimatedTime(res.payload?.data[0]?.EstimatedTime)
    });;
    dispatch(getRatingDoctor(Id)).then(()=>{
      let rate = [];
      let count = 0;
      if(ratingDoctor){
        for(let i=ratingDoctor.length-1;i>=0;i--){
          rate.push(ratingDoctor[i].Rate.length);
          count += ratingDoctor[i].Rate.length
          if(i === ratingDoctor.length - 1){
            setRating(rate)
            setCount(count)
          }
        }
      }
    })
  }, []);
  useEffect(() => {
    if(estimatedTime !== "" && ScheduleData?.length > 0 && loadingSchedule === false)
    {
      renderTimeBooking(estimatedTime,ScheduleData[0])
    }
  }, [estimatedTime, ScheduleData, index]);
  const changeData = () => {
    setTime1([])
    setTime2([])
    setTime3([])
  };
  const handleChange = (value,index) => {
    setData({ ...data, Service: value });
    setEstimatedTime(service[index].EstimatedTime)
    setIndex(index)
    changeData()
  };
  
  const handleDatePickerChange = (date, dateString) => {
    setActived()
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
      DateBooking: data.DateBooking ? data.DateBooking : tomorrow,
      TimeBooking: data.timePicker,
      Status: 4
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
  const TransferPricing = (price) => {
    let pr = parseInt(price, 10).toString();

    let formattedNum = pr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    formattedNum += " đ";

    return formattedNum;
  }
  const TransferDegree = (degree) => {
    let res = ""
    if(degree == "Thạc sĩ y khoa")
      res = "ThS.BS."
    else if(degree == "Tiến sĩ y khoa")
      res = "TS.BS."
    else if(degree == "Cử nhân điều dưỡng")
      res = "ĐD"
    else
      res = "BS.CK1."
    return res;
  }
  return (
    <div className="max-lg:pt-[80px] pt-[90px]">
      {loadingSchedule ?
      <div className="h-screen">
        <div className="spinner mt-12 mx-auto">
        </div>
      </div>
      :
      <div className="lg:mx-10 max-lg:px-6 lg:flex lg:gap-5 pb-20">
        <div className="lg:w-[60%] flex flex-col gap-y-5">
          <div className="w-full bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-4 gap-5 max-sm:gap-1 w-full mb-5">
              <img
                className="h-44 w-36 object-cover shadow-lg rounded-lg"
                src={detailDoctor[0]?.Avt}
                alt="avt"
              ></img>
              <div className="col-span-3 ">
                <p className="text-2xl max-sm:text-xl max-sm:text-center font-medium text-slate-700 mb-4"> {TransferDegree(detailDoctor[0]?.Degree)} {detailDoctor[0]?.FullName} - Chuyên khoa {detailDoctor[0]?.Major}</p>
                <div className="min-h-11 w-[65%] max-sm:w-auto max-sm:mx-3 px-5 py-3 rounded-3xl bg-white bg-opacity-90 shadow-lg text-slate-700 flex gap-3 max-sm:flex-col max-sm:gap-1 items-center justify-center">
                  <Rate className="w-52 flex gap-2 max-sm:hidden"
                        value={parseFloat(detailDoctor[0]?.Star)}
                        allowHalf
                        style={{ fontSize: 28}}
                        disabled={true}
                  ></Rate>
                  <Rate className="w-auto flex gap-2 sm:hidden"
                        value={parseFloat(detailDoctor[0]?.Star)}
                        allowHalf
                        style={{ fontSize: 20}}
                        disabled={true}
                  ></Rate>
                  <div className="w-36 max-sm:w-auto flex gap-2 items-center">
                    <p className="font-medium text-xl text-teal-600">{detailDoctor[0]?.Star?.slice(0,3)}</p>
                    <p className=" text-lg">({ratingDoctor?.length} đánh giá)</p>
                  </div>
                </div>
              </div>
            </div>
           
            <div className="flex flex-wrap gap-3 mb-2">
              <div className="flex max-sm:h-auto gap-3 items-center text-lg mb-2 lg:h-10 w-fit p-4 rounded-3xl bg-white shadow-md shadow-violet-400">
                <FaRegAddressBook className="text-teal-600" />
                <div className="text-slate-600">
                  {detailDoctor[0]?.Degree}
                </div>
              </div>
              <div className="flex max-sm:h-auto gap-3 items-center text-lg mb-2 h-10 w-fit p-4 rounded-3xl bg-white shadow-md shadow-violet-400">
                <LuStethoscope className="text-teal-600" />
                <div className="text-slate-600">
                  Chuyên khoa: {detailDoctor[0]?.Major}
                </div>
              </div>
            </div> 
            <div className="flex flex-wrap gap-3">
              <div className="flex gap-3 items-center max-sm:h-auto text-lg mb-2 h-10 w-fit p-4 rounded-3xl bg-white shadow-md shadow-violet-400">
                <FaHome className="text-teal-600" />
                <div className="text-slate-600">Khám tại nhà</div>
              </div>
              <div className="flex gap-3 items-center  max-sm:h-auto text-lg mb-2 h-10 w-fit p-4 rounded-3xl bg-white shadow-md shadow-violet-400">
                <LuStethoscope className="text-teal-600" />
                <div className="text-slate-600">
                  Email: {detailDoctor[0]?.Email}
                </div>
              </div>
            </div>
                  
          </div>
          <div className="w-full bg-white rounded-lg shadow-lg p-10">
            <p className="text-3xl font-medium text-slate-700 mb-5">
              Giới thiệu
            </p>
            <div
              className="text-gray-600 text-justify"
              dangerouslySetInnerHTML={{ __html: detailDoctor[0]?.Introduce }}
            ></div>
          </div>
          
          <div className="text-base mb-8 max-sm:px-3 text-slate-600 bg-white p-10 rounded-xl shadow-xl">
            <p className="text-3xl font-medium text-slate-700 mb-5">
              Phản hồi từ bệnh nhân
            </p>
            <p className="italic mb-5 text-slate-500">
              Phản hồi từ bệnh nhân từ các cuộc hẹn khám hoàn thành
            </p>
            <div className="w-[50%]">
            </div>
            {ratingDoctor.length > 0 &&
              <div className="flex items-center gap-3 max-sm:gap-1 mb-8">
                {rating.map((item,index) => (
                  <div className="flex gap-1 items-center justify-center w-20 h-8 bg-white hover:bg-slate-100 rounded-2xl shadow-md cursor-pointer"
                      onClick={()=>{setStar(index+1)}}>
                    {index + 1}
                    <StarIcon className="text-[#fdd835] h-4" />
                  </div>
                ))}
                <div className="flex gap-1 items-center justify-center w-20 h-8 bg-white hover:bg-slate-100 rounded-2xl shadow-md cursor-pointer"
                    onClick={()=>{setStar(0)}}>
                  Tất cả
                </div>
              </div>
            }
            {star === 0 ?
            ratingDoctor?.map((item) => (
              item.Rate.map((rate) => 
                <div className="mb-5">
                  <div className="flex gap-3 mb-3">
                    <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center">
                      <img
                        className="rounded-full h-10 w-10 object-cover"
                        alt=""
                        src={rate.Avt || require("../../Images/pattientavt.png")}
                      ></img>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-lg font-medium text-slate-700 mb-1">
                        {rate.FullName}
                      </div>
                      <Rate className="w-full" 
                            defaultValue={item.Star}
                            style={{ fontSize: 18}}
                            disabled={true}
                            >
                      </Rate>
                      <p className="text-lg text-slate-600 mt-2">{rate.Comment}</p>
                    </div>
                  </div>
                  <hr className="w-full border-slate-200 rounded-lg my-2"></hr>
                </div>
            )))
            : 
            ratingDoctor[star-1].Rate.length > 0
            ?
            ratingDoctor?.map((item) => (
              item.Star === star &&
              item.Rate.map((rate) => 
                <div className="mb-5">
                  <div>
                    <div className="flex gap-3 mb-3">
                      <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center">
                        <img
                          className="rounded-full h-10 w-10 object-cover"
                          alt=""
                          src={rate.Avt || require("../../Images/pattientavt.png")}
                        ></img>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="text-lg font-medium text-slate-700 mb-1">
                          {rate.FullName}
                        </div>
                        <Rate className="w-full" 
                              defaultValue={item.Star}
                              style={{ fontSize: 18}}
                              disabled={true}
                              >
                        </Rate>
                        <p className="text-lg text-slate-600 mt-2">{rate.Comment}</p>
                      </div>
                    </div>
                    <hr className="w-full border-slate-200 rounded-lg my-2"></hr>
                  </div>
                </div>
            )))
            :
            <div className="text-lg text-slate-800 italic font-medium">Bác sĩ chưa có đánh giá {star} sao</div>
            }
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
              minDate={dayjs(tomorrow, dateFormat)}
            />
            {time1.length > 0 && (
              <>
                <div className="flex gap-3 items-center mb-3">
                  <GiSunrise className="text-teal-800"></GiSunrise>
                  <div className="text-teal-800">Buổi sáng</div>
                </div>
                <div className="flex flex-wrap gap-y-4 gap-x-5 mb-3">
                  {time1?.map((item,index) => (
                    <div
                      id="timePicker"
                      key={index}
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
                  {time2?.map((item,index) => (
                    <div
                      key={index}
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
                  {time3?.map((item,index) => (
                    <div
                      key={index}
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
              <Select
                className="w-full h-10 mt-2 cursor-pointer border border-gray-300 text-gray-900 text-base rounded-lg"
                id="Service"
                value={data?.Service}
                onChange={(value) => {
                  const index = service?.findIndex(option => option.id === value);
                  handleChange(value,index)
                }}
              >
                {service?.map((item,index) => (
                  <Select
                  id="Service"
                  value={item.id}
                  label={item.Service}
                  key={item.id}
                >
                  {item.Service}
                </Select>
                ))}
              </Select>
            </div>
            <div className="flex gap-3 mb-3 items-center">
              <p className=" text-teal-800">Phí dịch vụ: </p>
              <p className="font-medium text-emerald-500 text-lg">
                {TransferPricing(service[index]?.Price)}
              </p>
            </div>
            <div className="flex gap-3 mb-5 items-center">
              <p className=" text-teal-800">Thời gian khám ước tính:</p>
              <p className="font-medium text-emerald-500">
                Khoảng {service[index]?.EstimatedTime?.slice(1,2)} giờ {service[index]?.EstimatedTime?.slice(3,5) !== "00" && (service[index]?.EstimatedTime?.slice(3,5) + " phút")}
              </p>
            </div>
            <p className="italic text-sm text-teal-800 mb-5">
              Lưu ý: Bảng giá dịch vụ trên chỉ mang tính chất tham khảo và có
              thể thay đổi tuỳ theo tình trạng bệnh lý, phương pháp điều trị.
              Vui lòng trao đổi với bác sĩ về các chi phí dịch vụ trước khi tiến
              hành thăm khám & chữa bệnh.
            </p>
            {(currentUser?.authentication != 0 && currentUser?.authentication != 2) &&
            <Button
              disabled={!actived}
              onClick={currentUser ? handleBooking : handleNavigate}
              className="w-full h-[48px] text-center"
              gradientDuoTone="greenToBlue"
            >
              <p className="text-lg">ĐẶT HẸN</p>
            </Button>
            }
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default BookingDoctor;
