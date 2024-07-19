import React, { useEffect, useState } from "react";
import ClinicIcon from "../Images/banner-clinic-icon.svg";
import HearIcon from "../Images/heart-icon.svg";
import HospitalIcon from "../Images/hospital-icon.svg";
import SpecialtiesIcon from "../Images/specialties-icon.svg";
import { FiSearch } from "react-icons/fi";
import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllDoctors } from "../redux-toolkit/authSlice";
import { searchDisease, searchDoctor, searchMajor } from "../redux-toolkit/postSlice";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Doctors = () => {
  const { doctors } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { allSearchData, error, loading } = useSelector((state) => state.post);
  const [keywordDoctor, setKeywordDoctor] = useState("")
  const [keywordDisease, setKeywordDisease] = useState("")
  const [isSearched, setIsSearched] = useState("")
  const [numberElement, setNumberElement] = useState(8)
  const keywordDiseases = JSON.parse(localStorage.getItem("keywordDiseases"));
  const loadingDoctors = useSelector((state) => state.user.loading)
  const loadingSearch = useSelector((state) => state.post.loading)

  useEffect(()=>{
    if(keywordDiseases != null){
      setIsSearched("search")
      setKeywordDisease(keywordDiseases)
      setKeywordDoctor("")
    }
  },[keywordDiseases])
  useEffect(()=>{
    if(keywordDiseases != null && isSearched == "search"){
      localStorage.removeItem("keywordDiseases")
    }
  },[keywordDiseases,isSearched])
  const handleSearchDoctor = () => {
    setIsSearched("search")
    dispatch(searchDoctor({keywords: keywordDoctor}))
  }
  const handleSearchMajor = () => {
    setIsSearched("search")
    dispatch(searchDisease({keywords: keywordDisease}))
  }
  useEffect(() => {
    dispatch(getAllDoctors());
  }, []);
  const path = (name, id) => {
    const x = name + "_" + id;
    return x;
  };
  
  let doctor = [];
  if(isSearched == "search"){
    doctor = allSearchData
  }
  else{
    doctor = doctors
  }
  const slice = doctor?.slice(0,numberElement);
  return (
    <div className="lg:pt-[70px] max-lg:pt-[70px] mb-6">
      {loadingDoctors ?
      <div className="h-screen">
        <div className="spinner mt-12 mx-auto">
        </div>
      </div>
      :
      <div>
        <div className="relative w-full">
          <img
            className="absolute w-full lg:h-[440px] object-cover shadow-xl"
            src={require("../Images/backgroundDoctor.jpg")}
            alt=""
          ></img>
          <img
            className="lg:h-[360px] max-lg:h-[100px] object-cover absolute lg:top-20 lg:right-12 max-lg:top-32 max-lg:right-12 z-10"
            src={require("../Images/doctorBackground3.jpg")}
            alt=""
          ></img>
          <img
            className="lg:h-[360px] max-lg:h-[100px] object-cover absolute lg:top-20 lg:right-96 max-lg:top-32 max-lg:right-44 z-10"
            src={require("../Images/doctor1.jpg")}
            alt=""
          ></img>
          <img
            className="lg:h-96 max-lg:h-[100px] object-cover absolute lg:top-14 lg:right-52 max-lg:top-32 max-lg:right-28 z-10"
            src={require("../Images/doctorBackground2.jpg")}
            alt=""
          ></img>
          <img
            src={HearIcon}
            className="absolute w-[90px] h[90px] right-[40px] lg:top-[30px] max-lg:top-[2px]"
            alt="HeartIcon"
          />
          <img
            src={ClinicIcon}
            className="absolute lg:w-[120px] lg:h[120px] lg:right-[600px] lg:top-[90px] max-lg:top-32 max-lg:right-64"
            alt="ClinicIcon"
          />
          <div className="absolute lg:left-20 max-lg:left-10 top-10 text-white drop-shadow-lg shadow-stone-500 lg:text-5xl sm:max-lg:text-4xl max-sm:text-3xl font-bold z-10 lg:w-[480px] max-lg:w-[350px]">
            Đội ngũ Bác sĩ ưu tú từ các Bệnh viện hàng đầu
          </div>
          <div className="absolute lg:left-20 max-lg:left-10 top-60 text-teal-700 drop-shadow-xl p-4 text-justify italic rounded-3xl bg-opacity-80 lg:text-lg max-lg:text-sm bg-white shadow-lg z-10 lg:w-[580px] max-lg:w-[330px]">
            Đội ngũ Bác sĩ ưu tú từ các Bệnh viện hàng đầu vaccine Y bác sĩ của
            chúng tôi đã được tiêm vaccine phòng ngừa COVID-19 Đội ngũ Bác sĩ ưu
            tú với thâm niên trung bình 10 năm kinh nghiệm hiện công tác tại các
            Bệnh viện hàng đầu Việt Nam, thăm khám trên nhiều chuyên khoa đa dạng,
            tận tâm chăm sóc bạn cùng gia đình.
          </div>
        </div>
        <div className="lg:mx-24 pt-[480px] sm:max-lg:pt-[500px] sm:max-lg:px-8 max-sm:px-0">
          <p className="font-medium text-3xl mb-5 max-sm:px-5">
            Tìm bác sĩ của bạn
          </p>
          <hr className="w-24 max-sm:w-32 border-[1.5px] border-teal-700 rounded-lg mb-4"></hr>

          <div className="flex gap-7 mb-7 items-center max-sm:px-5">
            <div className="bg-slate-100 flex items-center col-span-2 h-[48px] lg:w-[30%] max-lg:w-[45%] rounded-lg hover:ring-1 hover:ring-teal-400">
              <input
                className="bg-slate-100 p-3 h-full w-full rounded-lg outline-none text-base"
                placeholder="Tìm theo tên..."
                value={keywordDoctor}
                onChange={(e)=>{setKeywordDoctor(e.target.value);setKeywordDisease("")}}
                onKeyDown={(e) => { 
                  if (e.key === "Enter") 
                    handleSearchDoctor(); 
                }} />
              <FiSearch className="mr-4 h-[24px] w-[24px] text-teal-300"></FiSearch>
            </div>
            <div className="bg-slate-100 flex items-center col-span-2 h-[48px] lg:w-[30%] max-lg:w-[45%] rounded-lg hover:ring-1 hover:ring-teal-400">
              <input
                className="bg-slate-100 p-3 h-full w-full rounded-lg outline-none text-base"
                placeholder="Tìm theo bệnh..."
                value={keywordDisease}
                onChange={(e)=>{setKeywordDisease(e.target.value);setKeywordDoctor("")}}
                onKeyDown={(e) => { 
                  if (e.key === "Enter") 
                    handleSearchMajor(); 
                }} />
              <FiSearch className="mr-4 h-[24px] w-[24px] text-teal-300"></FiSearch>
            </div>
            {isSearched == "search" && 
            <IoIosCloseCircleOutline className="h-8 w-8 text-rose-600 cursor-pointer" onClick={()=>{setIsSearched("");setKeywordDoctor("");setKeywordDisease("")}}></IoIosCloseCircleOutline>}
          </div>
          {loadingSearch ?
            <div className="spinner mt-12 mx-auto">
            </div>
          :
          <div>
            <div className="flex flex-wrap lg:w-full max-lg:w-full sm:gap-4 justify-center ">
              {slice.map((doctor) => (
              <div
                // key={doctor?.id}
                onClick={() =>
                  Navigate(
                    `/doctors/${path(
                      doctor?.FirstName + " " + doctor?.LastName,
                      doctor?.id
                    )}`
                  )
                }
                className="lg:w-[23.5%] max-sm:m-2 sm:max-lg:w-[47%] max-sm:w-[42%] grid grid-rows-1 gap-4 text-sm bg-white rounded-3xl justify-items-center drop-shadow-xl cursor-pointer transition-transform duration-500 hover:scale-105"
              >
                <div className="relative w-full max-sm:max-h-52 flex justify-center">
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
                  <div className="min-h-[70px] max-sm:flex-col  mx-3 p-4 mb-3 rounded-xl bg-teal-50 flex gap-3 max-sm:gap-1 items-center">
                    <div className="w-9 h-9 rounded-full bg-white drop-shadow-lg flex items-center justify-center">
                      <img
                        src={HospitalIcon}
                        className="w-5 h-5"
                        alt="HeartIcon"
                      />
                    </div>
                    <p className="w-[85%] max-sm:hidden text-base">
                      Chuyên khoa: {doctor?.Major}
                    </p>
                    <p className="w-[85%] sm:hidden max-sm:text-sm max-sm:text-center text-base">
                      Chuyên khoa {doctor?.Major}
                    </p>
                  </div>
                  <div className="min-h-[70px] max-sm:flex-col  mx-3 p-4 mb-3 rounded-xl bg-teal-50 flex sm:gap-3 max-sm:gap-1 items-center">
                    <div className="w-9 h-9 rounded-full bg-white drop-shadow-lg flex items-center justify-center">
                      <img
                        src={SpecialtiesIcon}
                        className="w-5 h-5"
                        alt="SpecialtiesIcon"
                      />
                    </div>
                    <p className="text-base max-sm:text-sm max-sm:text-center">
                      {doctor?.Experience} năm kinh nghiệm
                    </p>
                  </div>
                </div>
              </div>
              ))}
            </div>
            {doctor.length > 8 && numberElement < doctor.length &&
            <Button
              className="my-10 w-40 rounded-lg mx-auto h-10"
              outline gradientDuoTone="tealToLime"
              onClick={()=>{setNumberElement(numberElement+numberElement)}}
            >
              Xem thêm
            </Button>
            }
          </div>
          }
        </div>
      </div>
      }
    </div>
  );
};

export default Doctors;
