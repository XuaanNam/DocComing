import React, { useEffect } from "react";
import ClinicIcon from "../Images/banner-clinic-icon.svg";
import HearIcon from "../Images/heart-icon.svg";
import SchoolIcon from "../Images/school-icon.svg";
import DegreeIcon from "../Images/degree-icon.svg";
import LocationIcon from "../Images/location.svg";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailDoctor } from "../redux-toolkit/authSlice";
import SpecialtiesIcon from "../Images/specialties-icon.svg";
import { Button } from "flowbite-react";

const DoctorDetail = () => {
  const { detailDoctor, error, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { doctorId } = useParams();
  const Id = doctorId?.slice(-9);
  const path = (name, id) => {
    const x = name + "_" + id;
    return x;
  };
  useEffect(() => {
    dispatch(getDetailDoctor(Id));
  }, [Id]);
  console.log(Id);
  return (
    <div className="pt-[70px]">
      <div className="relative w-full block">
        <img
          className="absolute w-full h-[480px] object-cover shadow-xl"
          src={require("../Images/backgroundDoctor.jpg")}
          alt=""
        ></img>

        <img
          className="h-[440px] object-cover absolute top-10 right-72 z-10"
          src={detailDoctor[0]?.Avt}
          alt=""
        ></img>
        <img
          src={HearIcon}
          className="absolute w-[100px] h[100px] right-40 top-40"
          alt="HeartIcon"
        />
        <img
          src={ClinicIcon}
          className="absolute w-[120px] h[120px] right-1/2 top-24"
          alt="ClinicIcon"
        />
        <div className="absolute left-20 top-10 h-16 p-4 rounded-3xl bg-white bg-opacity-90 shadow-lg text-slate-700 text-3xl font-bold z-10 max-w-[500px]">
          ThS.BS. {detailDoctor[0]?.FullName}
        </div>
        <div className="absolute left-20 top-32 min-h-12 p-3 mb-3 rounded-3xl bg-white bg-opacity-90 shadow-lg text-slate-700 flex gap-3 items-center">
          <div className="w-9 h-9 rounded-full bg-white drop-shadow-lg flex items-center justify-center">
            <img
              src={SpecialtiesIcon}
              className="w-5 h-5"
              alt="SpecialtiesIcon"
            />
          </div>
          <p className="w-[85%] flex gap-1 text-lg">
            <p className="font-medium">12</p> năm kinh nghiệm
          </p>
        </div>

        <div className="absolute left-20 top-56 text-gray-700 drop-shadow-xl p-4 text-justify italic rounded-3xl bg-opacity-90 text-lg bg-white shadow-lg z-10 h-32 text-ellipsis w-[580px]"></div>
        <Button
          onClick={() => {
            Navigate(`/booking/${path(detailDoctor[0]?.FullName, Id)}`);
          }}
          className="absolute left-20 top-96 shadow-lg shadow-purple-500 z-10 w-60 my-5 mx-auto h-[52px] rounded-3xl drop-shadow-lg transition-transform duration-500 hover:scale-105"
          gradientDuoTone="purpleToPink"
        >
          <p className="text-lg">Đặt khám tại nhà</p>
        </Button>
      </div>
      <div className="pt-[520px] mx-20 mb-20">
        <div className="flex flex-wrap gap-7 mb-10 justify-center">
          <div className="w-60 h-48 bg-white p-3 rounded-3xl shadow-lg shadow-violet-300 flex flex-col gap-2 justify-center items-center">
            <div className="rounded-full w-16 h-16 shadow-lg shadow-violet-400 bg-white flex justify-center items-center">
              <img
                src={SpecialtiesIcon}
                className="w-10 h-10"
                alt="SpecialtiesIcon"
              />
            </div>

            <p className="text-lg text-teal-800 font-medium">Chuyên khoa</p>
            <p className="h-12  text-gray-700 w-[90%] text-center">
              {detailDoctor[0]?.Major}
            </p>
          </div>
          <div className="w-60 h-48 bg-white p-3 rounded-3xl shadow-lg shadow-violet-300 flex flex-col gap-2 justify-center items-center">
            <div className="rounded-full w-16 h-16 shadow-lg shadow-violet-400 bg-white flex justify-center items-center">
              <img src={SchoolIcon} className="w-10 h-10" alt="SchoolIcon" />
            </div>

            <p className="text-lg text-teal-800 font-medium">Nơi đào tạo</p>
            <p className="h-12  text-gray-700 w-[90%] text-center">
              {detailDoctor[0]?.Training}
            </p>
          </div>
          <div className="w-60 h-48 bg-white p-3 rounded-3xl shadow-lg shadow-violet-300 flex flex-col gap-2 justify-center items-center">
            <div className="rounded-full w-16 h-16 shadow-lg shadow-violet-400 bg-white flex justify-center items-center">
              <img src={DegreeIcon} className="w-10 h-10" alt="DegreeIcon" />
            </div>
            <p className="text-lg text-teal-800 font-medium">Bằng cấp</p>
            <p className="h-12  text-gray-700 w-[90%] text-center">
              {detailDoctor[0]?.Degree}
            </p>
          </div>
          <div className="w-60 h-48 bg-white p-3 rounded-3xl shadow-lg shadow-violet-300 flex flex-col gap-2 justify-center items-center">
            <div className="rounded-full w-16 h-16 shadow-lg shadow-violet-400 bg-white flex justify-center items-center">
              <img
                src={LocationIcon}
                className="w-10 h-10"
                alt="LocationIcon"
              />
            </div>
            <p className="text-lg text-teal-800 font-medium">Khu vực</p>
            <p className="h-12  text-gray-700 w-[90%] text-center">
              Tp.Hồ Chí Minh
            </p>
          </div>
        </div>
        <p className="text-2xl text-teal-700 font-bold mb-5">
          Học vấn và kinh nghiệm
        </p>
        <hr className="w-24 border-[1.5px] border-teal-400 rounded-lg mb-5"></hr>
        <div
          className="text-base text-slate-600 bg-white p-10 rounded-xl shadow-xl"
          dangerouslySetInnerHTML={{ __html: detailDoctor[0]?.Introduce }}
        ></div>
      </div>
    </div>
  );
};

export default DoctorDetail;
