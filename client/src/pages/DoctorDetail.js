import React, { useEffect, useState } from "react";
import { LuStethoscope } from "react-icons/lu";
import { FaRegAddressBook, FaHome } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { GiSunrise, GiSun, GiSunset } from "react-icons/gi";

import Datepicker from "flowbite-datepicker/Datepicker";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const DoctorDetail = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [today, setToday] = useState("");
  const month = currentDate.getMonth() + 1;
  const date = currentDate.getDate();
  const year = currentDate.getFullYear();
  const distance = 1;
  const start = "7:00";
  const end = "15:00";
  const [timeStart, setTimeStart] = useState(parseInt(start.slice(0, 1)));
  const timeEnd = parseInt(end.slice(-0, -3));
  const [time, setTime] = useState([]);
  const [step, setStep] = useState(0);
  const [actived, setActived] = useState();
  const [data, setData] = useState({});
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (timeStart + distance <= timeEnd) {
      setTime([...time, { id: step, value: timeStart }]);
      setTimeout(setTimeStart(timeStart + distance), 0);
      setStep(step + 1);
      setActived(time[0]?.id);
    }
    setTimeout(setData({ ...data, date: today }), 2500);
  }, [time, timeStart]);

  useEffect(() => {
    const datepickerEl = document?.getElementById("date");
    new Datepicker(datepickerEl, {
      format: "dd/mm/yyyy",
      title: "Thời gian làm việc",
      today: "true",
    });
    setToday(`${date}/${month}/${year}`);
  }, []);
  console.log(data);

  const handleBooking = () => {
    Navigate("/doctor/booking");
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
            <div className="relative w-full flex items-center mb-3">
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
                datepicker="true"
                value={data?.date}
                type="text"
                className="w-full h-[40px] bg-white border border-gray-300 text-teal-700 text-base font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-12 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onSelect={(e) => {
                  setData({ ...data, [e.target.id]: e.target.value });
                }}
              />
              <IoIosArrowDown className="absolute right-3"></IoIosArrowDown>
            </div>

            <div className="flex gap-3 items-center mb-3">
              <GiSunrise className="text-teal-800"></GiSunrise>
              <div className="text-teal-800">Buổi sáng</div>
            </div>
            <div className="flex flex-wrap gap-y-4 gap-x-5 mb-3">
              {time?.map(
                (item) =>
                  item.value < 12 && (
                    <div
                      id="timePicker"
                      key={item.id}
                      className={`${
                        actived === item.id && "bg-teal-500 text-white"
                      } h-10 w-28 rounded-lg text-sm font-medium cursor-pointer text-teal-500 border border-teal-500 flex items-center justify-center`}
                      onClick={() => {
                        setActived(item.id);
                        setData({ ...data, timePicker: `${item.value}:00` });
                      }}
                    >
                      {`${item.value}:00`}
                    </div>
                  )
              )}
            </div>

            <div className="flex gap-3 items-center mb-3">
              <GiSun className="text-teal-800"></GiSun>
              <div className="text-teal-800">Buổi chiều</div>
            </div>
            <div className="flex flex-wrap gap-y-4 gap-x-5 mb-3">
              {time?.map(
                (item) =>
                  item.value >= 12 &&
                  item.value < 16 && (
                    <div
                      key={item.id}
                      className={`${
                        actived === item.id && "bg-teal-500 text-white"
                      } h-9 w-28 rounded-lg text-sm font-medium cursor-pointer text-teal-500 border border-teal-500 flex items-center justify-center`}
                      onClick={() => {
                        setActived(item.id);
                        setData({ ...data, timePicker: item.value });
                      }}
                    >
                      {`${item.value}:00`}
                    </div>
                  )
              )}
            </div>

            <div className="flex gap-3 items-center mb-3">
              <GiSunset className="text-teal-800"></GiSunset>
              <div className="text-teal-800">Buổi tối</div>
            </div>
            <div className="flex flex-wrap gap-y-4 gap-x-5">
              {time?.map(
                (item) =>
                  item.value >= 16 &&
                  item.value < 24 && (
                    <div
                      key={item.id}
                      className={`${
                        actived === item.id && "bg-teal-500 text-white"
                      } h-9 w-28 rounded-lg text-sm font-medium cursor-pointer text-teal-500 border border-teal-500 flex items-center justify-center`}
                      onClick={() => {
                        setActived(item.id);
                        setData({ ...data, timePicker: item.value });
                      }}
                    >
                      {`${item.value}:00`}
                    </div>
                  )
              )}
            </div>

            <div className="w-full mt-2 mb-5">
              <p className="font-medium text-teal-800">Loại dịch vụ</p>
              <div className="max-w-md h-[40px] mt-2">
                <select
                  className="bg-white border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="service"
                  required
                  value={data?.service}
                  onChange={(e) => {
                    setData({ ...data, [e.target.id]: e.target.value });
                  }}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nu">Nữ</option>
                  <option value="#">Khác</option>
                </select>
              </div>
            </div>

            <Button
              onClick={handleBooking}
              className="w-full h-[48px] text-center"
              gradientDuoTone="greenToBlue"
            >
              <p className="text-lg">ĐẶT HẸN</p>
            </Button>
          </div>
          {/* <p>{currentDate.toLocaleString().slice(9, 18)}</p> */}
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
