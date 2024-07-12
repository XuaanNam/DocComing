import React, { useCallback, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BsChevronCompactRight } from "react-icons/bs";
import HearIcon from "../Images/heart-icon.svg";
import ClinicIcon from "../Images/banner-clinic-icon.svg";
import HospitalIcon from "../Images/hospital-icon.svg";
import SpecialtiesIcon from "../Images/specialties-icon.svg";
import { IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile,getAllDoctors } from "../redux-toolkit/authSlice";
import { getAllPost } from "../redux-toolkit/postSlice";

const HomePage = () => {
  const { currentUser,doctors, auth, user, error, loading, updated } = useSelector(
    (state) => state.user
  );
  const { allPost } = useSelector((state) => state.post);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const slides = [
    {
      url: require("../Images/banner-01.jpg"),
    },
    {
      url: require("../Images/banner-02.jpg"),
    },
    {
      url: require("../Images/banner-03.jpg"),
    },
  ];
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    dispatch(getAllPost());
    dispatch(getAllDoctors());
  }, []);

  
  let heartDiseases = []
  let digestiveDiseases = []
  let diabetesDiseases = []

  for (let i = 0; i < allPost?.length; i++)
  {
    if(allPost[i].Categories === "Bệnh tim mạch")
      heartDiseases.push({...allPost[i]});
    else if(allPost[i].Categories === "Bệnh tiêu hóa")
      digestiveDiseases.push({...allPost[i]});
    else if(allPost[i].Categories === "Tiểu đường")
      diabetesDiseases.push({...allPost[i]});
  }
  const path = (name, id) => {
    const x = name + "_" + id;
    return x;
  };
  const handleNavigate = (fname,lname,id) => {
    if(id != 235523484)
      Navigate(`/doctors/${path(fname + lname, id)}`)
  }
  return (
    <div className="pt-[70px]">
      <div className="max-w-[92%] h-[726px] w-full max-sm:h-[560px] max-sm:pt-16 m-auto pb-[40px] px-4 relative group drop-shadow-md">
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className="w-full lg:h-full max-sm:h-1/3 transition-full rounded-3xl bg-center bg-cover duration-500"
        ></div>
        <div className="hidden group-hover:block absolute max-sm:top-[25%] top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className="flex top-4 justify-center py-2">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer"
            ></div>
          ))}
        </div>
        <div className="absolute top-[300px] max-sm:top-[300px] max-sm:left-[40px] h-[250px] lg:w-[420px] max-sm:h-[200px] max-sm:w-3/4 pt-8 bg-white bg-opacity-75 rounded-[32px] grid grid-rows-2 items-center justify-center">
          <img
            src={HearIcon}
            className="absolute left-[-14px] top-[-30px]"
            alt="HeartIcon"
          />
          <img
            src={ClinicIcon}
            className="absolute right-[-50px] bottom-[30px]"
            alt="HeartIcon"
          />
          <div className="text-4xl max-sm:text-2xl font-medium w-[380px] max-sm:w-[280px] text-[#059669]">
            Lựa chọn thông minh cho sức khỏe gia đình
          </div>
          <button className="w-[200px] h-[50px] rounded-3xl bg-gradient-to-r from-green-400 to-teal-500 text-white font-medium hover:drop-shadow-xl transition-transform duration-500 hover:scale-110">
            Đặt hẹn khám
          </button>
        </div>
      </div>
      <div className="lg:mx-12 max-sm:px-7 sm:px-7 mb-10">
        <div className="h-[44px] w-[150px] flex items-center justify-center p-1 mb-6 rounded-3xl bg-teal-50 text-teal-500 font-medium drop-shadow-lg">
          Bài viết mới nhất
        </div>

        <div className="w-full lg:flex gap-x-3">
          <div
            className="lg:w-3/5 max-sm:w-full cursor-pointer"
          >
            <img
              className="lg:h-[450px] max-sm:h-[230px] w-full rounded-xl object-cover drop-shadow-lg transition-transform duration-500 hover:scale-105 p-2"
              src={allPost[0]?.FeaturedImage}
              alt=""
              onClick={() => Navigate(`/blog/${allPost[0].id}`)}
            ></img>
            <div className="text-teal-500 mb-2" onClick={()=>Navigate(`/categories/${allPost[0]?.Categories}/${allPost[0]?.Similar}`)}>{allPost[0]?.Similar}</div>
            <div onClick={() => Navigate(`/blog/${allPost[0].id}`)}>
              <div className="text-slate-800 text-ellipsis text-xl font-medium mb-2">
                {allPost[0]?.Title}
              </div>
              <p className="h-[76px] text-slate-600 text-base text-justify text-ellipsis overflow-hidden mb-4">
                {allPost[0]?.Brief}
              </p>
            </div>
            <div className="flex gap-2 text-base items-center" onClick={()=>{handleNavigate(allPost[0].FirstName,allPost[0].LastName,allPost[0].idAuthor)}}>
              <img
                className="h-8 w-8 rounded-full object-cover drop-shadow-md"
                src={allPost[0]?.Avt}
                alt=""
              ></img>
              <div className="font-medium">
                {allPost[0]?.FirstName + " " + allPost[0]?.LastName} -
              </div>
              <div className="text-gray-400">Ngày đăng: {allPost[0]?.DatePost.slice(8,10)}/{allPost[0]?.DatePost.slice(5,7)}/{allPost[0]?.DatePost.slice(0,4)}</div>
            </div>
          </div>
          <div className="lg:grid max-sm:mt-5 max-sm:gap-3 lg:grid-rows-3 lg:w-2/5 max-sm:w-full">
            <div className="row-span-2 cursor-pointer w-full pb-3 border-b-[1.5px]">
              <img
                className="h-[280px] w-full rounded-xl object-cover drop-shadow-lg transition-transform duration-500 hover:scale-105 p-2"
                src={allPost[1]?.FeaturedImage}
                alt=""
                onClick={() => Navigate(`/blog/${allPost[1].id}`)}
              ></img>
              <div className="text-teal-500 mb-4" onClick={()=>Navigate(`/categories/${allPost[1]?.Categories}/${allPost[1]?.Similar}`)}>{allPost[1]?.Similar}</div>
              <div className="text-slate-800 text-lg text-ellipsis font-medium mb-4"
                   onClick={() => Navigate(`/blog/${allPost[1].id}`)}>
                {allPost[1]?.Title}
              </div>
              <div className="flex gap-2 text-base items-center" onClick={()=>{handleNavigate(allPost[1].FirstName,allPost[1].LastName,allPost[1].idAuthor)}}>
                <img
                  className="h-8 w-8 rounded-full object-cover drop-shadow-md"
                  src={allPost[1]?.Avt}
                  alt=""
                ></img>
                <div className="font-medium">
                  {allPost[1]?.FirstName + " " + allPost[1]?.LastName}  
                </div>
                <div className="text-gray-400">Ngày đăng: {allPost[1]?.DatePost.slice(8,10)}/{allPost[1]?.DatePost.slice(5,7)}/{allPost[1]?.DatePost.slice(0,4)}</div>
              </div>
            </div>

            <div className="cursor-pointer w-full pt-5">
              <div className=" flex gap-3">
                <div className="w-3/5">
                  <div className="text-teal-500 mb-4" onClick={()=>Navigate(`/categories/${allPost[2]?.Categories}/${allPost[2]?.Similar}`)}>
                    {allPost[2]?.Similar}
                  </div>
                  <div className="text-slate-800 text-lg max-sm:mb-3 font-medium lg:mb-8 text-ellipsis overflow-hidden" onClick={() => Navigate(`/blog/${allPost[2].id}`)}>
                    {allPost[2]?.Title}
                  </div>
                  <div className="flex gap-2 text-base items-center self-end" onClick={()=>{handleNavigate(allPost[2].FirstName,allPost[2].LastName,allPost[2].idAuthor)}}>
                    <img
                      className="h-8 w-8 rounded-full object-cover drop-shadow-md"
                      src={allPost[2]?.Avt}
                      alt=""
                    ></img>
                    <div className="overflow-hidden text-ellipsis font-medium">
                      {allPost[2]?.FirstName + " " + allPost[2]?.LastName}  
                    </div>
                    <div className="text-gray-400">Ngày đăng: {allPost[2]?.DatePost.slice(8,10)}/{allPost[2]?.DatePost.slice(5,7)}/{allPost[2]?.DatePost.slice(0,4)}</div>
                  </div>
                </div>
                <img
                  className="h-[140px] w-2/5 rounded-xl object-cover drop-shadow-lg transition-transform duration-500 hover:scale-105 p-2"
                  src={allPost[2]?.FeaturedImage}
                  alt=""
                  onClick={() => Navigate(`/blog/${allPost[2].id}`)}
                ></img>
              </div>
            </div>
          </div>
        </div>
        <hr className="w-full mt-5 mb-7"></hr>
        <Slider {...settings}>
          {allPost?.slice(3).map((disease) => 
          <div className="md:!flex gap-7 max-sm:mb-7 w-[775px] p-2 rounded-xl" key={disease.id}>
            <img
              className="h-[200px] w-[280px] max-sm:w-full rounded-xl object-cover drop-shadow-lg cursor-pointer transition-transform duration-500 hover:scale-105"
              src={disease.FeaturedImage}
              alt=""
              onClick={() => Navigate(`/blog/${disease.id}`)}
            ></img>
            <div className="max-w-[700px]">
              <div className="text-teal-500 mb-2 cursor-pointer" onClick={()=>Navigate(`/categories/${disease.Categories}/${disease.Similar}`)}>{disease.Similar}</div>
              <div className="cursor-pointer">
                <div className="text-slate-800 text-lg font-medium mb-2">
                  {disease.Title}
                </div>
                <div className="h-[65px] text-[15px] text-ellipsis overflow-hidden mb-3">
                  {disease.Brief}
                </div>
                <div className="flex gap-2 text-base items-center" onClick={()=>{handleNavigate(disease.FirstName,disease.LastName,disease.idAuthor)}}>
                  <img
                    className="h-8 w-8 rounded-full object-cover drop-shadow-md"
                    src={disease.Avt}
                    alt=""
                  ></img>
                  <div className="font-medium">
                    {disease.FirstName + " " + disease.LastName}  
                  </div>
                  <div className="text-gray-400">Ngày đăng: {disease.DatePost.slice(8,10)}/{disease.DatePost.slice(5,7)}/{disease.DatePost.slice(0,4)}</div>
                </div>
              </div>
            </div>
          </div>
          )}
        </Slider>
        <div className="text-2xl font-medium text-slate-800 mb-3 mt-10">
          Đội ngũ chuyên gia của Doctor Coming
        </div>
        <div className="md:flex gap-x-7 mb-15">
          <div className="w-[58%] max-sm:w-full max-sm:pb-7">
            <p className="block text-slate-600 text-[17px] mb-5 text-justify rounded-xl italic">
              Đội ngũ cố vấn của Doctor Coming gồm các chuyên gia sức khỏe và y
              bác sĩ từ nhiều chuyên khoa, với đầy đủ chứng nhận, chứng chỉ hành
              nghề, hỗ trợ xây dựng và củng cố nội dung theo chuyên môn của
              mình. Trách nhiệm của chuyên gia là bảo đảm tính chính xác về mặt
              y học ở những nội dung đăng tải trên Doctor Coming, thường xuyên
              cập nhật các thông tin mới về khoa học, nghiên cứu và sức khỏe.
              Đội ngũ của chúng tôi làm việc không mệt mỏi để những thông tin
              hữu ích có thể dễ dàng tiếp cận đến bạn đọc, giúp bạn chủ động hơn
              trong các quyết định chăm sóc sức khỏe.
            </p>
            <div className="h-[50px] w-[200px] flex items-center justify-center p-1 rounded-3xl bg-gradient-to-r from-green-400 to-teal-500 text-white font-medium hover:drop-shadow-xl cursor-pointer transition-transform duration-500 hover:scale-105"
                 onClick={() => Navigate("/doctors")}>
              Xem thêm chuyên gia
            </div>
          </div>
          <div className="flex gap-4 w-[42%] max-sm:w-full max-sm:mb-7">
            {doctors?.slice(0,2).map((doctor) =>
            <div onClick={()=>Navigate(`/doctors/${path(doctor.FirstName + doctor.LastName, doctor.id)}`)} 
                 className="w-1/2 grid grid-rows-1 gap-2 text-sm bg-white rounded-3xl justify-items-center drop-shadow-xl cursor-pointer transition-transform duration-500 hover:scale-105">
              <div className="relative w-[100%] flex justify-center mb-3">
                <img
                  className="rounded-3xl w-full h-[150px] rol-start-1 shadow-lg"
                  src={require("../Images/backgroundDoctor.jpg")}
                  alt=""
                ></img>
                <img
                  className="absolute top-0 h-[150px] mx-auto object-contain"
                  src={doctor.Avt}
                  alt=""
                ></img>
              </div>
              <div className="w-full">
                <p className="font-medium text-base text-slate-800 mb-4 text-center">
                  ThS. BS. {doctor.FirstName + " " + doctor.LastName}
                </p>
                <div className="min-h-[50px] mx-3 p-4 mb-3 rounded-xl bg-teal-50 flex gap-3 items-center">
                  <div className="w-7 h-7 rounded-full bg-white drop-shadow-lg flex items-center justify-center">
                    <img
                      src={HospitalIcon}
                      className="w-5 h-5"
                      alt="HeartIcon"
                    />
                  </div>
                  <p className="w-[85%]">
                    Bác sĩ {doctor.Major}
                  </p>
                </div>
                <div className="min-h-[50px] mx-3 p-4 mb-3 rounded-xl bg-teal-50 flex gap-3 items-center">
                  <div className="w-7 h-7 rounded-full bg-white drop-shadow-lg flex items-center justify-center">
                    <img
                      src={SpecialtiesIcon}
                      className="w-5 h-5"
                      alt="SpecialtiesIcon"
                    />
                  </div>
                  <p className="w-[85%] gap-1">
                    <span className="font-medium">{doctor.Experience}</span> năm kinh nghiệm
                  </p>
                </div>
              </div>
            </div>
             )}
          </div>
        </div>
        <div className="mb-[50px]">
          <div className="flex gap-x-7 mb-3">
            <div className="text-2xl w-44 font-medium text-slate-800 flex items-center">
              Bệnh tim mạch
            </div>
            <div className=" flex items-center cursor-pointer" onClick={()=>Navigate("/categories/Bệnh tim mạch")}>
              <span className="text-base text-blue-500">Xem thêm </span>
              <IoIosArrowForward className="text-blue-500 mt-1 h-[15px] w-[15px]"></IoIosArrowForward>
            </div>
          </div>
          <Slider {...settings}>
            {heartDiseases.length > 0 && heartDiseases.map((disease) => 
            <div className="md:!flex gap-7 max-sm:mb-7 w-[590px] p-2 rounded-xl">
              <img
                className="h-[200px] max-sm:w-full w-[280px] rounded-xl object-cover drop-shadow-lg cursor-pointer transition-transform duration-500 hover:scale-105"
                src={disease.FeaturedImage}
                alt=""
                onClick={() => Navigate(`/blog/${disease.id}`)}
              ></img>
              <div className="max-w-[700px]">
                <div className="text-teal-500 mb-2 cursor-pointer" onClick={()=>Navigate(`/categories/Bệnh tim mạch/${disease.Similar}`)}>{disease.Similar}</div>
                <div className="cursor-pointer">
                  <div className="text-slate-800 text-lg font-medium mb-2">
                    {disease.Title}
                  </div>
                  <div className="h-[65px] text-[15px] text-ellipsis overflow-hidden mb-5">
                    {disease.Brief}
                  </div>
                  <div className="flex gap-2 text-base items-center" onClick={()=>{handleNavigate(disease.FirstName,disease.LastName,disease.idAuthor)}}>
                    <img
                      className="h-8 w-8 rounded-full object-cover drop-shadow-md"
                      src={disease.Avt}
                      alt=""
                    ></img>
                    <div className="font-medium">
                      {disease.FirstName + " " + disease.LastName}  
                    </div>
                    <div className="text-gray-400">Ngày đăng: {disease.DatePost.slice(8,10)}/{disease.DatePost.slice(5,7)}/{disease.DatePost.slice(0,4)}</div>
                  </div>
                </div>
              </div>
            </div>
            )}
          </Slider>
        </div>
        <div className="mb-[50px]">
          <div className="flex gap-x-7 mb-3">
            <div className="text-2xl w-44 font-medium text-slate-800 flex items-center">
              Bệnh tiêu hóa
            </div>
            <div className=" flex items-center cursor-pointer" onClick={()=>Navigate("/categories/Bệnh tiêu hóa")}>
              <span className="text-base text-blue-500">Xem thêm </span>
              <IoIosArrowForward className="text-blue-500 mt-1 h-[15px] w-[15px]"></IoIosArrowForward>
            </div>
          </div>
          <Slider {...settings}>
            {digestiveDiseases.length > 0 && digestiveDiseases.map((disease) => 
            <div className="md:!flex gap-7 max-sm:mb-7 w-[590px] p-2 rounded-xl">
              <img
                className="h-[200px] w-[280px] max-sm:w-full rounded-xl object-cover drop-shadow-lg cursor-pointer transition-transform duration-500 hover:scale-105"
                src={disease.FeaturedImage}
                alt=""
                onClick={() => Navigate(`/blog/${disease.id}`)}
              ></img>
              <div className="max-w-[700px]">
                <div className="text-teal-500 mb-2 cursor-pointer" onClick={()=>Navigate(`/categories/Bệnh tiêu hóa/${disease.Similar}`)}>{disease.Similar}</div>
                <div className="cursor-pointer">
                  <div className="text-slate-800 text-lg font-medium mb-2">
                    {disease.Title}
                  </div>
                  <div className="h-[65px] text-[15px] text-ellipsis overflow-hidden mb-3">
                    {disease.Brief}
                  </div>
                  <div className="flex gap-2 text-base items-center" onClick={()=>{handleNavigate(disease.FirstName,disease.LastName,disease.idAuthor)}}>
                    <img
                      className="h-8 w-8 rounded-full object-cover drop-shadow-md"
                      src={disease.Avt}
                      alt=""
                    ></img>
                    <div className="font-medium">
                      {disease.FirstName + " " + disease.LastName}  
                    </div>
                    <div className="text-gray-400">Ngày đăng: {disease.DatePost.slice(8,10)}/{disease.DatePost.slice(5,7)}/{disease.DatePost.slice(0,4)}</div>
                  </div>
                </div>
              </div>
            </div>
            )}
          </Slider>
        </div>
        <div className="mb-[50px]">
          <div className="flex gap-x-7 mb-3">
            <div className="text-2xl w-44 font-medium text-slate-800 flex items-center">
              Tiểu đường
            </div>
            <div className=" flex items-center cursor-pointer" onClick={()=>Navigate("/categories/Tiểu đường")}>
              <span className="text-base text-blue-500">Xem thêm </span>
              <IoIosArrowForward className="text-blue-500 mt-1 h-[15px] w-[15px]"></IoIosArrowForward>
            </div>
          </div>
          <Slider {...settings}>
            {diabetesDiseases.length > 0 && diabetesDiseases.map((disease) => 
            <div className="md:!flex gap-7 max-sm:mb-7 w-[590px] p-2 rounded-xl">
              <img
                className="h-[200px] w-[280px] max-sm:w-full rounded-xl object-cover drop-shadow-lg cursor-pointer transition-transform duration-500 hover:scale-105"
                src={disease.FeaturedImage}
                alt=""
                onClick={() => Navigate(`/blog/${disease.id}`)}
              ></img>
              <div className="max-w-[700px]">
                <div className="text-teal-500 mb-2 cursor-pointer" onClick={()=>Navigate(`/categories/Tiểu đường/${disease.Similar}`)}>{disease.Similar}</div>
                <div className="cursor-pointer">
                  <div className="text-slate-800 text-lg font-medium mb-2">
                    {disease.Title}
                  </div>
                  <div className="h-[65px] text-[15px] text-ellipsis overflow-hidden mb-3">
                    {disease.Brief}
                  </div>
                  <div className="flex gap-2 text-base items-center" onClick={()=>{handleNavigate(disease.FirstName,disease.LastName,disease.idAuthor)}}>
                    <img
                      className="h-8 w-8 rounded-full object-cover drop-shadow-md"
                      src={disease.Avt}
                      alt=""
                    ></img>
                    <div className="font-medium">
                      {disease.FirstName + " " + disease.LastName}  
                    </div>
                    <div className="text-gray-400">Ngày đăng: {disease.DatePost.slice(8,10)}/{disease.DatePost.slice(5,7)}/{disease.DatePost.slice(0,4)}</div>
                  </div>
                </div>
              </div>
            </div>
            )}
          </Slider>
        </div>

        <div className="flex items-center justify-center text-2xl text-slate-800 font-medium py-10 ">
          Doctor Coming đem đến thông tin sức khỏe mà bạn cần
        </div>
        <div className="grid md:grid-cols-4 max-sm:grid-rows-4 gap-4 justify-items-center">
          <div className="bg-lime-50 rounded-xl drop-shadow-xl">
            <img
              className="mb-3"
              src={require("../Images/Research.webp")}
              alt=""
            ></img>
            <div className="px-5 mb-3 h-14 font-medium text-lg flex items-center text-center text-slate-800">
              Dựa trên nguồn thông tin xác thực
            </div>
            <p className="px-5 mb-3 text-justify text-base text-slate-600">
              Tất cả bài viết của Doctor Coming đều được viết dựa trên những tin
              tức y khoa, nghiên cứu và báo cáo khoa học đến từ các tổ chức giáo
              dục, y tế hàng đầu.
            </p>
          </div>

          <div className="bg-lime-50 rounded-xl drop-shadow-xl">
            <img
              className="mb-3"
              src={require("../Images/Reviewed.webp")}
              alt=""
            ></img>
            <div className="px-5 mb-3 h-14 font-medium text-lg flex items-center justify-center text-slate-800">
              Được tham vấn y khoa
            </div>
            <p className="px-5 mb-3 text-justify text-base text-slate-600">
              Bài viết trên trang Doctor Coming được đội ngũ bác sĩ và chuyên
              gia y tế của chúng tôi cẩn trọng tư vấn và kiểm duyệt.
            </p>
          </div>

          <div className="bg-lime-50 rounded-xl drop-shadow-xl">
            <img
              className="mb-3"
              src={require("../Images/Monitored.webp")}
              alt=""
            ></img>
            <div className="px-5 mb-3 h-14 font-medium text-lg flex items-center justify-center text-slate-800">
              Được cập nhật thường xuyên
            </div>
            <p className="px-5 mb-3 text-justify text-base text-slate-600">
              Chúng tôi làm việc với các bác sĩ và chuyên gia y tế để liên tục
              cập nhật các bài viết đảm bảo độ chính xác.
            </p>
          </div>

          <div className="bg-lime-50 rounded-xl drop-shadow-xl">
            <img
              className="mb-3"
              src={require("../Images/Trustworthy.webp")}
              alt=""
            ></img>
            <div className="px-5 mb-3 h-14 font-medium text-lg flex items-center justify-center text-slate-800">
              Đáng tin cậy
            </div>
            <p className="px-5 mb-3 text-justify text-base text-slate-600">
              Tại Doctor Coming, trang thông tin y tế, sức khỏe hàng đầu thị
              trường, chúng tôi cam kết đem đến những bài viết chính xác, dễ
              dàng tiếp cận và cập nhật nhất, giúp bạn đọc có thể đưa ra quyết
              định đúng đắn nhất cho sức khỏe của bản thân và gia đình.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
