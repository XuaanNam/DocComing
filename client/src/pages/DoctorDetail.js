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
import { getRatingDoctor } from "../redux-toolkit/appointmentSlice";
import { Rate,Input  } from 'antd';

const DoctorDetail = () => {
  const { detailDoctor, error, loading } = useSelector((state) => state.user);
  const { ratingDoctor } = useSelector((state) => state.appointment);

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

    dispatch(getRatingDoctor(Id))
  }, [Id]);
 
  return (
    <div className="pt-[70px]">
      <div className="relative w-full block">
        <img
          className="absolute w-full h-[480px] object-cover shadow-xl"
          src={require("../Images/backgroundDoctor.jpg")}
          alt=""
        ></img>

        <img
          className="h-[440px] object-cover absolute top-10 right-80 z-10"
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
        <div className="absolute left-20 top-20 h-16 p-4 rounded-3xl bg-white bg-opacity-90 shadow-lg text-slate-700 text-3xl font-bold z-10 max-w-[500px]">
          ThS.BS. {detailDoctor[0]?.FullName}
        </div>
        <div className="absolute left-20 top-40 min-h-12 p-3 mb-3 rounded-3xl bg-white bg-opacity-90 shadow-lg text-slate-700 flex gap-3 items-center">
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
        <div className="absolute left-20 top-60 min-h-12 px-5 py-3 mb-3 rounded-3xl bg-white bg-opacity-90 shadow-lg text-slate-700 flex gap-3 items-center">
          <Rate className="w-52 flex gap-2"
                defaultValue={parseFloat(detailDoctor[0]?.Star)}
                allowHalf
                style={{ fontSize: 28}}
                disabled={true}
                ></Rate>
          <div className="w-36 flex gap-2 items-center">
             <p className="font-medium text-xl text-teal-600">{detailDoctor[0]?.Star?.slice(0,3)}</p>
             <p className=" text-lg">({ratingDoctor?.length} đánh giá)</p>
          </div>
        </div>
        {/* <div className="absolute left-20 top-56 text-gray-700 drop-shadow-xl p-4 text-justify italic rounded-3xl bg-opacity-90 text-lg bg-white shadow-lg z-10 h-32 text-ellipsis w-[580px]"></div> */}
        <Button
          onClick={() => {
            Navigate(`/booking/${path(detailDoctor[0]?.FullName, Id)}`);
          }}
          className="absolute left-20 top-80 shadow-lg shadow-purple-500 z-10 w-60 my-5 mx-auto h-[52px] rounded-3xl drop-shadow-lg transition-transform duration-500 hover:scale-105"
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
          className="text-base mb-8 text-slate-600 bg-white p-10 rounded-xl shadow-xl"
          dangerouslySetInnerHTML={{ __html: detailDoctor[0]?.Introduce }}
        ></div>
        <p className="text-2xl text-teal-700 font-bold mb-5">
          Phản hồi từ bệnh nhân
        </p>
        <hr className="w-24 border-[1.5px] border-teal-400 rounded-lg mb-5"></hr>
        <div className="text-base mb-8 text-slate-600 bg-white p-10 rounded-xl shadow-xl shadow-violet-200">
            <p className="italic mb-5 text-slate-500">
              Phản hồi từ bệnh nhân đã thực sự được khám từ bác sĩ
            </p>
          {ratingDoctor?.map((item) =>
          <div className="mb-5">
            <div className="flex gap-3 mb-3">
              <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center">
                <img
                  className="rounded-full h-10 w-10 object-cover"
                  alt=""
                  src={item.Avt || require("../Images/pattientavt.png")}
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
    </div>
  );
};

export default DoctorDetail;
