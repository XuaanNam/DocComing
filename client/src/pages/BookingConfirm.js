import Datepicker from "flowbite-datepicker/Datepicker";
import React, { useEffect, useState } from "react";
import { FaHome, FaRegAddressBook } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { LuStethoscope } from "react-icons/lu";
import FlagIcon from "../Images/flag.png";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAppointment } from "../redux-toolkit/appointmentSlice";
import { updateProfile } from "../redux-toolkit/authSlice";
import { toast } from "react-toastify";
import { Input, Select } from "antd";

const BookingConfirm = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({});
  const [information, setInformation] = useState("");
  const [actived, setActived] = useState(true);

  const { user, error, loading, updated } = useSelector((state) => state.user);
  const { checked, message } = useSelector((state) => state.appointment);

  const appointment = JSON.parse(localStorage.getItem("appointment"));
  console.log(checked);
  console.log(appointment);
  useEffect(() => {
    setData(user.data);
    if ((user.data.Gender || user.data.FirstName || user.data.Phone) === null) {
      setActived(false);
    }
    // if (checked) {
    //   toast.success("Cập nhật thành công", {
    //     position: "top-right",
    //   });
    // }
  }, []);
  console.log(user);
  const handleBooking = () => {
    const body = {
      idService: appointment.idService,
      idDoctor: appointment.idDoctor,
      Price: appointment.Price,
      DateBooking: appointment.DateBooking,
      TimeBooking: appointment.TimeBooking,
      Information: information,
    };
    // const profile = {
    // }
    // if (!actived) {
    //   dispatch(updateProfile());
    // }
    dispatch(createAppointment(body));
  };
  return (
    <div className="bg-slate-50 pt-[90px] h-[1200px]">
      <div className="mx-auto w-[80%] mb-5 p-6 grid grid-cols-6 gap-8 bg-white shadow-lg rounded-lg">
        <img
          className="h-48 w-40 object-cover border rounded-lg col-span-1"
          src={require("../Images/doctor1.jpg")}
          alt="avt"
        ></img>
        <div className="col-start-2 col-span-5">
          <div className="text-2xl font-medium text-slate-700 mb-3">
            ThS. BSCKI. Nguyễn Đức Hương - Chuyên khoa Tai Mũi Họng, Ung Bướu
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
          <div className="flex gap-3 items-center text-lg mb-3">
            <FaHome className="text-teal-600" />
            <div className="text-slate-600">Khám tại nhà</div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-[80%] p-6 bg-white shadow-lg rounded-lg mb-5">
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
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-lg font-medium mb-2 text-gray-700">
              Số điện thoại liên hệ
            </p>
            <div className="flex gap-3 h-12 w-full items-center border rounded-xl cursor-pointer bg-slate-100">
              <img className="h-[70%] pl-3 py-1.5" src={FlagIcon} alt=""></img>
              {/* <p className="text-lg opacity-70 ">(+84)</p>
              <div className="w-[1.5px] h-[28px] bg-slate-400"></div> */}
              <Input
                id="Phone"
                // type="text"
                disabled={data.Phone !== null}
                className={` ${
                  data.Phone !== null && "!bg-slate-100 !text-gray-500"
                } h-full  p-2.5 rounded-r-lg w-full text-lg outline-none `}
                value={data?.Phone}
                onChange={(e) => {
                  setData({ ...data, [e.target.id]: e.target.value });
                }}
              ></Input>
            </div>
          </div>
          <div>
            <p className="text-lg font-medium mb-2 text-gray-700">Họ và tên</p>
            <Input
              disabled={data?.FirstName + data?.LastName !== null}
              className={` ${
                data.FirstName !== null && "!bg-slate-100 !text-gray-500"
              } h-12 w-full p-2.5 block items-center border outline-none rounded-xl text-lg `}
              value={data?.FirstName + data?.LastName}
            ></Input>
          </div>
          <div>
            <p className="text-lg font-medium mb-2 text-gray-700">Giới tính</p>
            <select
              disabled={data.Gender !== null}
              className={` ${
                data.Gender !== null && "bg-slate-100"
              } h-12 w-full p-2.5 items-center border outline-none rounded-xl text-lg border-slate-300`}
              id="Gender"
              value={data?.Gender}
              onChange={(e) => {
                setData({ ...data, [e.target.id]: e.target.value });
              }}
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
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
        className="w-60 mx-auto h-[48px] text-center"
        gradientDuoTone="greenToBlue"
      >
        <p className="text-lg">XÁC NHẬN</p>
      </Button>
    </div>
  );
};

export default BookingConfirm;
