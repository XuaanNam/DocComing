import React, { useEffect } from "react";
import ClinicIcon from "../Images/banner-clinic-icon.svg";
import HearIcon from "../Images/heart-icon.svg";
import HospitalIcon from "../Images/hospital-icon.svg";
import SpecialtiesIcon from "../Images/specialties-icon.svg";
import { FiSearch } from "react-icons/fi";
import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllDoctors } from "../redux-toolkit/authSlice";

const Doctors = () => {
  const { doctors, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllDoctors());
  }, []);
  const path = (name, id) => {
    const x = name + "_" + id;
    return x;
  };
  return (
    <div className="pt-[70px]">
      <div className="relative w-full">
        <img
          className="absolute w-full h-[440px] object-cover shadow-xl"
          src={require("../Images/backgroundDoctor.jpg")}
          alt=""
        ></img>
        <img
          className="h-[360px] object-cover absolute top-20 right-12 z-10"
          src={require("../Images/doctorBackground3.jpg")}
          alt=""
        ></img>
        <img
          className="h-[360px] object-cover absolute top-20 right-96 z-10"
          src={require("../Images/doctor1.jpg")}
          alt=""
        ></img>
        <img
          className="h-96 object-cover absolute top-14 right-52 z-10"
          src={require("../Images/doctorBackground2.jpg")}
          alt=""
        ></img>
        <img
          src={HearIcon}
          className="absolute w-[90px] h[90px] right-[40px] top-[30px]"
          alt="HeartIcon"
        />
        <img
          src={ClinicIcon}
          className="absolute w-[120px] h[120px] right-[600px] top-[90px]"
          alt="ClinicIcon"
        />
        <div className="absolute left-20 top-10 text-white drop-shadow-lg drop-shadow-violet-400 text-5xl font-bold z-10 w-[480px]">
          Đội ngũ Bác sĩ ưu tú từ các Bệnh viện hàng đầu
        </div>
        <div className="absolute left-20 top-60 text-teal-700 drop-shadow-xl p-4 text-justify italic rounded-3xl bg-opacity-80 text-lg bg-white shadow-lg z-10 w-[580px]">
          Đội ngũ Bác sĩ ưu tú từ các Bệnh viện hàng đầu vaccine Y bác sĩ của
          chúng tôi đã được tiêm vaccine phòng ngừa COVID-19 Đội ngũ Bác sĩ ưu
          tú với thâm niên trung bình 10 năm kinh nghiệm hiện công tác tại các
          Bệnh viện hàng đầu Việt Nam, thăm khám trên nhiều chuyên khoa đa dạng,
          tận tâm chăm sóc bạn cùng gia đình.
        </div>
      </div>

      <div className="mx-24 pt-[480px]">
        <p className="text-slate-700 font-medium text-3xl mb-5">
          Tìm bác sĩ của bạn
        </p>
        <hr className="w-24 border-[1.5px] border-teal-400 rounded-lg mb-5"></hr>

        <div className="flex gap-7 mb-7">
          <div className="bg-slate-100 flex items-center col-span-2 h-[48px] w-[30%] rounded-lg hover:ring-1 hover:ring-teal-400">
            <input
              className="bg-slate-100 p-3 h-full w-full rounded-lg outline-none text-base"
              placeholder="Tìm theo tên..."
            ></input>
            <FiSearch className="mr-4 h-[24px] w-[24px] text-teal-300"></FiSearch>
          </div>
          <div className="bg-slate-100 flex items-center col-span-2 h-[48px] w-[30%] rounded-lg hover:ring-1 hover:ring-teal-400">
            <input
              className="bg-slate-100 p-3 h-full w-full rounded-lg outline-none text-base"
              placeholder="Tìm theo chuyên khoa..."
            ></input>
            <FiSearch className="mr-4 h-[24px] w-[24px] text-teal-300"></FiSearch>
          </div>
        </div>

        <div className="flex flex-wrap gap-7">
          {doctors?.map((doctor) => (
            <div
              key={doctor?.id}
              onClick={() =>
                Navigate(
                  `/doctors/${path(
                    doctor?.FirstName + doctor?.LastName,
                    doctor?.id
                  )}`
                )
              }
              className="w-[30%] grid grid-rows-1 gap-4 text-sm bg-white rounded-3xl justify-items-center drop-shadow-xl cursor-pointer transition-transform duration-500 hover:scale-105"
            >
              <div className="relative w-full flex justify-center">
                <img
                  className="w-full rounded-3xl h-[200px] rol-start-1 shadow-lg"
                  src={require("../Images/backgroundDoctor.jpg")}
                  alt=""
                ></img>
                <img
                  className="absolute top-0 h-[200px] mx-auto object-contain"
                  src={doctor?.Avt}
                  alt=""
                ></img>
              </div>
              <div className="w-full ">
                <p className="font-medium text-base text-slate-800 mb-4 text-center">
                  {doctor?.FirstName + " " + doctor?.LastName}
                </p>
                <div className="min-h-[70px] mx-3 p-4 mb-3 rounded-xl bg-teal-50 flex gap-3 items-center">
                  <div className="w-9 h-9 rounded-full bg-white drop-shadow-lg flex items-center justify-center">
                    <img
                      src={HospitalIcon}
                      className="w-5 h-5"
                      alt="HeartIcon"
                    />
                  </div>
                  <p className="w-[85%] text-base">
                    Chuyên khoa: {doctor?.Major}
                  </p>
                </div>
                <div className="min-h-[70px] mx-3 p-4 mb-3 rounded-xl bg-teal-50 flex gap-3 items-center">
                  <div className="w-9 h-9 rounded-full bg-white drop-shadow-lg flex items-center justify-center">
                    <img
                      src={SpecialtiesIcon}
                      className="w-5 h-5"
                      alt="SpecialtiesIcon"
                    />
                  </div>
                  <p className="text-base">
                    {doctor?.Experience} năm kinh nghiệm
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          //   onClick={handleBooking}
          className="w-40 my-5 mx-auto h-[44px] rounded-3xl drop-shadow-lg transition-transform duration-500 hover:scale-105"
          gradientDuoTone="greenToBlue"
        >
          <p className="text-lg">Xem thêm</p>
        </Button>
      </div>
    </div>
  );
};

export default Doctors;
