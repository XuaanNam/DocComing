import Datepicker from "flowbite-datepicker/Datepicker";
import React, { useEffect, useState } from "react";
import { FaHome, FaRegAddressBook } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { LuStethoscope } from "react-icons/lu";
import FlagIcon from "../../Images/flag.png";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAppointment } from "../../redux-toolkit/appointmentSlice";
import { fetchProfile, updateProfile } from "../../redux-toolkit/authSlice";
import { toast } from "react-toastify";
import { Input, Select } from "antd";

const BookingConfirm = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({});
  const [information, setInformation] = useState("");
  const [actived, setActived] = useState(true);

  const { user, detailDoctor, error, loading, updated } = useSelector(
    (state) => state.user
  );
  const { checked, message } = useSelector((state) => state.appointment);
  const appointment = JSON.parse(localStorage.getItem("appointment"));
  useEffect(() => {
    setData(user?.data);
    if (
      !user?.data?.Phone ||
      user?.data?.Phone == "null" ||
      !user?.data?.Address ||
      user?.data?.Address == "null"
    ) {
      setActived(false);
    }
  }, []);
  const handleBooking = () => {
    const body = {
      idService: appointment.idService,
      idDoctor: appointment.idDoctor,
      Price: appointment.Price,
      DateBooking: appointment.DateBooking,
      TimeBooking: appointment.TimeBooking,
      Information: information,
    };
    dispatch(createAppointment(body)).then(() => {
      Navigate("/booking/success");
    });
    if (!actived) { 
      const profile = new FormData();
      profile.append("FullName", data?.FullName);
      profile.append("Phone", data.Phone);
      profile.append("Address", data.Address);
      profile.append("BirthDate", data.BirthDate);
      profile.append("Gender", data.Gender || "Nam");
      profile.append("Avt", data.Avt);
      dispatch(updateProfile(profile)).then(() => {
        dispatch(fetchProfile());
      });
    }
  };
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
    <div className="pt-[90px] pb-20">
      <script type="text/javascript">
        function disableBack() {window.history.forward()}
        setTimeout("disableBack()", 0); window.onunload = function () {null};
      </script>
      <div className="max-lg:px-5 max-lg:pb-5 max-lg:mx-5 max-lg:mb-5 lg:mx-auto lg:w-[80%] lg:mb-5 lg:p-6 grid lg:grid-cols-6 lg:gap-8 max-lg:grid-cols-12 bg-white shadow-md shadow-violet-300 rounded-lg">
        <img
          className="h-48 w-40 object-cover border rounded-lg lg:col-span-1 max-lg:col-start-4 max-lg:col-span-6 max-lg:mb-3"
          src={detailDoctor[0]?.Avt}
          alt="avt"
        ></img>
        <div className="lg:col-start-2 lg:col-span-5 max-lg:col-span-12">
          <div className="text-2xl font-medium text-slate-700 mb-3">
            {TransferDegree(detailDoctor[0]?.Degree)} {detailDoctor[0]?.FullName} - Chuyên khoa {detailDoctor[0]?.Major}
          </div>
          <div className="flex gap-3 items-center text-lg mb-2">
            <LuStethoscope className="text-teal-600" />
            <div className="text-slate-600">{detailDoctor[0]?.Major}</div>
          </div>
          <div className="flex gap-3 items-center text-lg mb-3">
            <FaHome className="text-teal-600" />
            <div className="text-slate-600">Khám tại nhà</div>
          </div>
        </div>
      </div>
      <div className="max-lg:px-5 max-lg:pb-5 max-lg:mx-5 max-lg:mb-5 lg:mx-auto lg:w-[80%] lg:p-6 bg-white shadow-md shadow-violet-300 rounded-lg mb-10">
        <div className="text-2xl font-medium text-slate-800 mb-5">
          Thông tin lịch hẹn
        </div>
        <div className="flex gap-3 mb-2">
          <div className="text-lg  text-gray-700">Ngày đặt hẹn:</div>
          <p className="font-medium text-emerald-500 text-lg">
            {appointment?.DateBooking}
          </p>
        </div>

        <div className="flex gap-3 mb-2">
          <div className="text-lg text-gray-700">Thời gian hẹn:</div>
          <p className="font-medium text-emerald-500 text-lg">
            {appointment?.TimeBooking}
          </p>
        </div>
        <div className="flex gap-3 mb-2">
          <div className="text-lg  text-gray-700">Dịch vụ:</div>
          <p className="font-medium text-emerald-500 text-lg">
            {appointment?.Service}
          </p>
        </div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 mb-8">
          <div>
            <p className="text-lg font-medium mb-2 text-gray-700">
              Số điện thoại liên hệ
            </p>
            <div className="relative max-lg:mb-4 gap-3 h-12 w-full items-center border rounded-xl cursor-pointer bg-slate-100">
              <img
                className="absolute z-10 h-full pl-3 py-3"
                src={FlagIcon}
                alt=""
              ></img>
              <Input
                id="Phone"
                // type="text"
                disabled={data?.Phone && data?.Phone != "null"}
                className={` ${
                  data?.Phone &&
                  data?.Phone != "null" &&
                  "!bg-slate-100 !text-gray-500"
                } h-full pl-14 p-2.5 rounded-lg w-full text-lg outline-none `}
                placeholder="--"
                value={!data?.Phone || data?.Phone == "null" ? "" : data?.Phone}
                onChange={(e) => {
                  setData({ ...data, [e.target.id]: e.target.value });
                }}
              ></Input>
            </div>
          </div>
          <div className="max-lg:mb-4">
            <p className="text-lg font-medium mb-2 text-gray-700">Họ và tên</p>
            <Input
              disabled={data?.FullName !== null}
              className={` ${
                data?.FullName !== null && "!bg-slate-100 !text-gray-500"
              } h-12 w-full p-2.5 block items-center border outline-none rounded-xl text-lg `}
              value={data?.FullName}
            ></Input>
          </div>
          <div className="max-lg:mb-4">
            <p className="text-lg font-medium mb-2 text-gray-700">Địa chỉ</p>
            <Input
              disabled={data?.Address && data?.Address != "null"}
              className={` ${
                data?.Address &&
                data?.Address != "null" &&
                "!bg-slate-100 !text-gray-500"
              } h-12 w-full p-2.5 block items-center border outline-none rounded-xl text-lg `}
              id="Address"
              placeholder="--"
              value={
                !data?.Address || data?.Address == "null" ? "" : data?.Address
              }
              onChange={(e) => {
                setData({ ...data, [e.target.id]: e.target.value });
              }}
            ></Input>
          </div>
          <div>
            <p className="text-lg font-medium mb-2 text-gray-700">Email</p>
            <Input
              disabled
              className="!bg-slate-100 !text-gray-500 h-12 w-full pl-3 flex items-center border outline-none rounded-xl text-lg "
              value={data?.Email}
            ></Input>
          </div>
        </div>
        <div>
          <p className="text-lg font-medium mb-2 text-gray-700">Lý do khám</p>
          <textarea
            id="information"
            value={information}
            placeholder="Ví dụ: Đau đầu, phát ban,..."
            className="h-28 w-full pl-3 flex items-center border outline-none rounded-xl text-lg"
            onChange={(e) => {
              setInformation(e.target.value);
            }}
          ></textarea>
        </div>
      </div>

      <Button
        onClick={handleBooking}
        className="w-60 mx-auto h-[48px] text-center shadow-lg shadow-purple-500 z-10 rounded-3xl drop-shadow-lg transition-transform duration-500 hover:scale-105"
        gradientDuoTone="purpleToPink"
      >
        <p className="text-lg">XÁC NHẬN</p>
      </Button>
    </div>
  );
};

export default BookingConfirm;
