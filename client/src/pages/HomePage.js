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
import { authentication, fetchProfile } from "../redux-toolkit/authSlice";
import { getAllPost } from "../redux-toolkit/postSlice";

const HomePage = () => {
  const { currentUser, auth, user, error, loading, updated } = useSelector(
    (state) => state.user
  );
  // console.log(auth);
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
    dots: true,
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
    if (currentUser) {
      dispatch(fetchProfile());
    }
    dispatch(getAllPost());
  }, [currentUser]);

  console.log(allPost);
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  return (
    <div className="">
      <div className="max-w-[95%] h-[740px] w-full m-auto pt-[70px] pb-[40px] px-4 relative group drop-shadow-md">
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className="w-full h-full transition-full rounded-3xl bg-center bg-cover duration-500"
        ></div>
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
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
        <div className="absolute top-[300px] h-[250px] w-[420px] pt-8 bg-white bg-opacity-75 rounded-[32px] grid grid-rows-2 items-center justify-center">
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
          <div className="text-4xl font-medium w-[380px] text-[#059669]">
            Lựa chọn thông minh cho sức khỏe gia đình
          </div>
          <button className="w-[200px] h-[50px] rounded-3xl bg-gradient-to-r from-green-400 to-teal-500 text-white font-medium hover:drop-shadow-xl transition-transform duration-500 hover:scale-110">
            Đặt hẹn khám
          </button>
        </div>
      </div>
      <div className="mx-[48px] mb-10">
        <div className="h-[44px] w-[150px] flex items-center justify-center p-1 mb-6 rounded-3xl bg-teal-50 text-blue-500 font-medium drop-shadow-lg">
          Bài viết mới nhất
        </div>

        <div className="w-full flex gap-x-7">
          <div
            className="w-3/5 cursor-pointer"
            onClick={() => Navigate(`/blog/${allPost[0].id}`)}
          >
            <img
              className="h-[450px] w-full rounded-xl mb-2 bg-cover drop-shadow-lg"
              src={allPost[0]?.FeaturedImage}
              alt=""
            ></img>
            <div className="text-teal-500 mb-2">{allPost[0]?.Similar}</div>
            <div className="text-slate-800 text-xl font-medium mb-2">
              {allPost[0]?.Title}
            </div>
            <p className="h-[76px] text-slate-600 text-base text-justify text-ellipsis overflow-hidden mb-2">
              {allPost[0]?.Brief}
            </p>
            <div className="flex gap-2 text-base items-center">
              <img
                className="h-[35px] w-[35px] rounded-full mb-2 bg-cover drop-shadow-md"
                src={require("../Images/doctor.webp")}
                alt=""
              ></img>
              <div className="font-medium">
                {allPost[0]?.FirstName + " " + allPost[0]?.LastName} -
              </div>
              <div> {allPost[0]?.DatePost.slice(0, 10)}</div>
            </div>
          </div>
          <div className="grid grid-rows-3 w-2/5">
            <div className="row-span-2 cursor-pointer w-full pb-5 border-b-[1.5px]">
              <img
                className="h-[280px] w-full rounded-xl mb-1 bg-cover drop-shadow-lg"
                src={allPost[1]?.FeaturedImage}
                alt=""
              ></img>
              <div className="text-teal-500 mb-1">{allPost[1]?.Similar}</div>
              <div className="text-slate-800 text-lg font-medium mb-2">
                {allPost[1]?.Title}
              </div>
              <div className="flex gap-2 text-base items-center">
                <img
                  className="h-[35px] w-[35px] rounded-full drop-shadow-md"
                  src={require("../Images/doctor.webp")}
                  alt=""
                ></img>
                <div className="font-medium">
                  {allPost[1]?.FirstName + " " + allPost[1]?.LastName} -
                </div>
                <div>{allPost[1]?.DatePost}</div>
              </div>
            </div>
            <div className="cursor-pointer w-full pt-5">
              <div className=" flex gap-2 ">
                <div>
                  <div className="text-teal-500 mb-2">
                    {allPost[2]?.Similar}
                  </div>
                  <div className="text-slate-800 text-lg font-medium mb-1">
                    {allPost[2]?.Title}
                  </div>
                </div>
                <img
                  className="h-[120px] w-[180px] rounded-xl mb-2 bg-cover drop-shadow-lg"
                  src={allPost[2]?.FeaturedImage}
                  alt=""
                ></img>
              </div>

              <div className="flex gap-2 text-base items-center">
                <img
                  className="h-[35px] w-[35px] rounded-full mb-2 drop-shadow-md"
                  src={require("../Images/doctor.webp")}
                  alt=""
                ></img>
                <div className="font-medium">
                  {allPost[2]?.FirstName + " " + allPost[2]?.LastName} -
                </div>
                <div>{allPost[2]?.DatePost}</div>
              </div>
            </div>
          </div>
        </div>
        <hr className="w-full mt-5 mb-10"></hr>
        <div className="text-2xl font-medium text-slate-800 mb-3">
          Đội ngũ chuyên gia của Doctor Coming
        </div>
        <div className="flex gap-x-7 mb-[60px]">
          <div className="w-[55%]">
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

            <div className="h-[50px] w-[200px] flex items-center justify-center p-1 rounded-3xl bg-gradient-to-r from-green-400 to-teal-500 text-white font-medium hover:drop-shadow-xl cursor-pointer transition-transform duration-500 hover:scale-105">
              Xem thêm chuyên gia
            </div>
          </div>
          <div className="flex gap-4 w-[50%]">
            <div className="w-1/2 grid grid-rows-1 gap-2 text-sm bg-white rounded-3xl justify-items-center drop-shadow-xl cursor-pointer transition-transform duration-500 hover:scale-105">
              <div className="relative w-[100%] flex justify-center mb-3">
                <img
                  className="rounded-3xl w-full h-[150px] rol-start-1 shadow-lg"
                  src={require("../Images/backgroundDoctor.jpg")}
                  alt=""
                ></img>
                <img
                  className="absolute top-0 h-[150px] mx-auto object-contain"
                  src={require("../Images/doctor1.jpg")}
                  alt=""
                ></img>
              </div>
              <div className="w-full">
                <p className="font-medium text-base text-slate-800 mb-4 text-center">
                  ThS. BS. Nguyễn Sơn Lâm
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
                    Bệnh viện Đại học Y Dược Thành Phố Hồ Chí Minh
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
                  <p className="w-[85%] flex gap-1">
                    <p className="font-medium">12</p> năm kinh nghiệm
                  </p>
                </div>
              </div>
            </div>
            <div className="w-1/2 grid grid-rows-1 gap-2 text-sm bg-white rounded-3xl justify-items-center drop-shadow-xl cursor-pointer transition-transform duration-500 hover:scale-105">
              <div className="relative w-[100%] flex justify-center mb-3">
                <img
                  className="rounded-3xl w-full h-[150px] rol-start-1 shadow-lg"
                  src={require("../Images/backgroundDoctor.jpg")}
                  alt=""
                ></img>
                <img
                  className="absolute top-0 h-[150px] mx-auto object-contain"
                  src={require("../Images/doctor1.jpg")}
                  alt=""
                ></img>
              </div>
              <div className="w-full ">
                <p className="font-medium text-base text-slate-800 mb-4 text-center">
                  ThS. BS. Nguyễn Sơn Lâm
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
                    Bệnh viện Đại học Y Dược Thành Phố Hồ Chí Minh
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
                  <p className="w-[85%] flex gap-1">
                    <p className="font-medium">12</p> năm kinh nghiệm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-[50px]">
          <div className="flex gap-x-7 mb-3">
            <div className="text-2xl font-medium text-slate-800 flex items-center">
              Bệnh tim mạch
            </div>
            <a className=" flex items-center" href="/">
              <span className="text-base text-blue-500">Xem thêm </span>
              <IoIosArrowForward className="text-blue-500 mt-1 h-[15px] w-[15px]"></IoIosArrowForward>
            </a>
          </div>
          <Slider {...settings}>
            {/* <div className="cursor-pointer w-full pt-5 flex gap-5"> */}
            <div className="!flex gap-7 cursor-pointer w-[575px]">
              <img
                className="h-[200px] w-[280px] rounded-xl mb-2 bg-cover drop-shadow-lg"
                src={require("../Images/banner-01.jpg")}
                alt=""
              ></img>
              <div className="max-w-[700px]">
                <div className="text-teal-500 mb-2">Bệnh cúm</div>
                <div className="text-slate-800 text-lg font-medium mb-2">
                  Cúm A có nguy hiểm không? Làm gì để phòng tránh biến chứng cúm
                  A?
                </div>
                <div className="h-[65px] text-[15px] text-ellipsis overflow-hidden mb-3">
                  Có 4 loại virus cúm: A, B, C và D. Trong đó, virus cúm A là
                  loại virus cúm duy nhất được biết là gây ra đại dịch cúm trên
                  toàn cầu. Vậy, cúm A có nguy hiểm không mà được coi là đại
                  dịch và làm cách nào để tránh các hậu quả nghiêm trọng?
                </div>
                <div className="flex gap-2 text-base items-center">
                  <img
                    className="h-[35px] w-[35px] rounded-full mb-2 drop-shadow-md"
                    src={require("../Images/doctor.webp")}
                    alt=""
                  ></img>
                  <div className="">
                    <span className="">Tham vấn y khoa:</span>
                    <span className="font-medium"> Bác sĩ Thu uyên</span>
                    <span> 11/03/2024</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="!flex gap-7 cursor-pointer w-[575px]">
              <img
                className="h-[200px] w-[280px] rounded-xl mb-2 bg-cover drop-shadow-lg"
                src={require("../Images/banner-01.jpg")}
                alt=""
              ></img>
              <div className="max-w-[700px]">
                <div className="text-teal-500 mb-2">Bệnh cúm</div>
                <div className="text-slate-800 text-lg font-medium mb-2">
                  Cúm A có nguy hiểm không? Làm gì để phòng tránh biến chứng cúm
                  A?
                </div>
                <div className="h-[65px] text-[15px] text-ellipsis overflow-hidden mb-3">
                  Có 4 loại virus cúm: A, B, C và D. Trong đó, virus cúm A là
                  loại virus cúm duy nhất được biết là gây ra đại dịch cúm trên
                  toàn cầu. Vậy, cúm A có nguy hiểm không mà được coi là đại
                  dịch và làm cách nào để tránh các hậu quả nghiêm trọng?
                </div>
                <div className="flex gap-2 text-base items-center">
                  <img
                    className="h-[35px] w-[35px] rounded-full mb-2 drop-shadow-md"
                    src={require("../Images/doctor.webp")}
                    alt=""
                  ></img>
                  <div className="">
                    <span className="">Tham vấn y khoa:</span>
                    <span className="font-medium"> Bác sĩ Thu uyên</span>
                    <span> 11/03/2024</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="!flex gap-7 cursor-pointer w-[575px]">
              <img
                className="h-[200px] w-[280px] rounded-xl mb-2 bg-cover drop-shadow-lg"
                src={require("../Images/banner-01.jpg")}
                alt=""
              ></img>
              <div className="max-w-[700px]">
                <div className="text-teal-500 mb-2">Bệnh cúm</div>
                <div className="text-slate-800 text-lg font-medium mb-2">
                  Cúm A có nguy hiểm không? Làm gì để phòng tránh biến chứng cúm
                  A?
                </div>
                <div className="h-[65px] text-[15px] text-ellipsis overflow-hidden mb-3">
                  Có 4 loại virus cúm: A, B, C và D. Trong đó, virus cúm A là
                  loại virus cúm duy nhất được biết là gây ra đại dịch cúm trên
                  toàn cầu. Vậy, cúm A có nguy hiểm không mà được coi là đại
                  dịch và làm cách nào để tránh các hậu quả nghiêm trọng?
                </div>
                <div className="flex gap-2 text-base items-center">
                  <img
                    className="h-[35px] w-[35px] rounded-full mb-2 drop-shadow-md"
                    src={require("../Images/doctor.webp")}
                    alt=""
                  ></img>
                  <div className="">
                    <span className="">Tham vấn y khoa:</span>
                    <span className="font-medium"> Bác sĩ Thu uyên</span>
                    <span> 11/03/2024</span>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
        <div className="mb-[50px]">
          <div className="flex gap-x-7 mb-3">
            <div className="text-2xl font-medium text-slate-800 flex items-center">
              Bệnh tiêu hóa
            </div>
            <a className=" flex items-center" href="/">
              <span className="text-base text-blue-500">Xem thêm </span>
              <IoIosArrowForward className="text-blue-500 mt-1 h-[15px] w-[15px]"></IoIosArrowForward>
            </a>
          </div>
          <Slider {...settings}>
            {/* <div className="cursor-pointer w-full pt-5 flex gap-5"> */}
            <div className="!flex gap-7 cursor-pointer w-[575px]">
              <img
                className="h-[200px] w-[280px] rounded-xl mb-2 bg-cover drop-shadow-lg"
                src={require("../Images/banner-01.jpg")}
                alt=""
              ></img>
              <div className="max-w-[700px]">
                <div className="text-teal-500 mb-2">Bệnh cúm</div>
                <div className="text-slate-800 text-lg font-medium mb-2">
                  Cúm A có nguy hiểm không? Làm gì để phòng tránh biến chứng cúm
                  A?
                </div>
                <div className="h-[65px] text-[15px] text-ellipsis overflow-hidden mb-3">
                  Có 4 loại virus cúm: A, B, C và D. Trong đó, virus cúm A là
                  loại virus cúm duy nhất được biết là gây ra đại dịch cúm trên
                  toàn cầu. Vậy, cúm A có nguy hiểm không mà được coi là đại
                  dịch và làm cách nào để tránh các hậu quả nghiêm trọng?
                </div>
                <div className="flex gap-2 text-base items-center">
                  <img
                    className="h-[35px] w-[35px] rounded-full mb-2 drop-shadow-md"
                    src={require("../Images/doctor.webp")}
                    alt=""
                  ></img>
                  <div className="">
                    <span className="">Tham vấn y khoa:</span>
                    <span className="font-medium"> Bác sĩ Thu uyên</span>
                    <span> 11/03/2024</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="!flex gap-7 cursor-pointer w-[575px]">
              <img
                className="h-[200px] w-[280px] rounded-xl mb-2 bg-cover drop-shadow-lg"
                src={require("../Images/banner-01.jpg")}
                alt=""
              ></img>
              <div className="max-w-[700px]">
                <div className="text-teal-500 mb-2">Bệnh cúm</div>
                <div className="text-slate-800 text-lg font-medium mb-2">
                  Cúm A có nguy hiểm không? Làm gì để phòng tránh biến chứng cúm
                  A?
                </div>
                <div className="h-[65px] text-[15px] text-ellipsis overflow-hidden mb-3">
                  Có 4 loại virus cúm: A, B, C và D. Trong đó, virus cúm A là
                  loại virus cúm duy nhất được biết là gây ra đại dịch cúm trên
                  toàn cầu. Vậy, cúm A có nguy hiểm không mà được coi là đại
                  dịch và làm cách nào để tránh các hậu quả nghiêm trọng?
                </div>
                <div className="flex gap-2 text-base items-center">
                  <img
                    className="h-[35px] w-[35px] rounded-full mb-2 drop-shadow-md"
                    src={require("../Images/doctor.webp")}
                    alt=""
                  ></img>
                  <div className="">
                    <span className="">Tham vấn y khoa:</span>
                    <span className="font-medium"> Bác sĩ Thu uyên</span>
                    <span> 11/03/2024</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="!flex gap-7 cursor-pointer w-[575px]">
              <img
                className="h-[200px] w-[280px] rounded-xl mb-2 bg-cover drop-shadow-lg"
                src={require("../Images/banner-01.jpg")}
                alt=""
              ></img>
              <div className="max-w-[700px]">
                <div className="text-teal-500 mb-2">Bệnh cúm</div>
                <div className="text-slate-800 text-lg font-medium mb-2">
                  Cúm A có nguy hiểm không? Làm gì để phòng tránh biến chứng cúm
                  A?
                </div>
                <div className="h-[65px] text-[15px] text-ellipsis overflow-hidden mb-3">
                  Có 4 loại virus cúm: A, B, C và D. Trong đó, virus cúm A là
                  loại virus cúm duy nhất được biết là gây ra đại dịch cúm trên
                  toàn cầu. Vậy, cúm A có nguy hiểm không mà được coi là đại
                  dịch và làm cách nào để tránh các hậu quả nghiêm trọng?
                </div>
                <div className="flex gap-2 text-base items-center">
                  <img
                    className="h-[35px] w-[35px] rounded-full mb-2 drop-shadow-md"
                    src={require("../Images/doctor.webp")}
                    alt=""
                  ></img>
                  <div className="">
                    <span className="">Tham vấn y khoa:</span>
                    <span className="font-medium"> Bác sĩ Thu uyên</span>
                    <span> 11/03/2024</span>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
        <div className="mb-[50px]">
          <div className="flex gap-x-7 mb-3">
            <div className="text-2xl font-medium text-slate-800 flex items-center">
              Bệnh tiểu đường
            </div>
            <a className=" flex items-center" href="/">
              <span className="text-base text-blue-500">Xem thêm </span>
              <IoIosArrowForward className="text-blue-500 mt-1 h-[15px] w-[15px]"></IoIosArrowForward>
            </a>
          </div>
          <Slider {...settings}>
            {/* <div className="cursor-pointer w-full pt-5 flex gap-5"> */}
            <div className="!flex gap-7 cursor-pointer w-[575px]">
              <img
                className="h-[200px] w-[280px] rounded-xl mb-2 bg-cover drop-shadow-lg"
                src={require("../Images/banner-01.jpg")}
                alt=""
              ></img>
              <div className="max-w-[700px]">
                <div className="text-teal-500 mb-2">Bệnh cúm</div>
                <div className="text-slate-800 text-lg font-medium mb-2">
                  Cúm A có nguy hiểm không? Làm gì để phòng tránh biến chứng cúm
                  A?
                </div>
                <div className="h-[65px] text-[15px] text-ellipsis overflow-hidden mb-3">
                  Có 4 loại virus cúm: A, B, C và D. Trong đó, virus cúm A là
                  loại virus cúm duy nhất được biết là gây ra đại dịch cúm trên
                  toàn cầu. Vậy, cúm A có nguy hiểm không mà được coi là đại
                  dịch và làm cách nào để tránh các hậu quả nghiêm trọng?
                </div>
                <div className="flex gap-2 text-base items-center">
                  <img
                    className="h-[35px] w-[35px] rounded-full mb-2 drop-shadow-md"
                    src={require("../Images/doctor.webp")}
                    alt=""
                  ></img>
                  <div className="">
                    <span className="">Tham vấn y khoa:</span>
                    <span className="font-medium"> Bác sĩ Thu uyên</span>
                    <span> 11/03/2024</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="!flex gap-7 cursor-pointer w-[575px]">
              <img
                className="h-[200px] w-[280px] rounded-xl mb-2 bg-cover drop-shadow-lg"
                src={require("../Images/banner-01.jpg")}
                alt=""
              ></img>
              <div className="max-w-[700px]">
                <div className="text-teal-500 mb-2">Bệnh cúm</div>
                <div className="text-slate-800 text-lg font-medium mb-2">
                  Cúm A có nguy hiểm không? Làm gì để phòng tránh biến chứng cúm
                  A?
                </div>
                <div className="h-[65px] text-[15px] text-ellipsis overflow-hidden mb-3">
                  Có 4 loại virus cúm: A, B, C và D. Trong đó, virus cúm A là
                  loại virus cúm duy nhất được biết là gây ra đại dịch cúm trên
                  toàn cầu. Vậy, cúm A có nguy hiểm không mà được coi là đại
                  dịch và làm cách nào để tránh các hậu quả nghiêm trọng?
                </div>
                <div className="flex gap-2 text-base items-center">
                  <img
                    className="h-[35px] w-[35px] rounded-full mb-2 drop-shadow-md"
                    src={require("../Images/doctor.webp")}
                    alt=""
                  ></img>
                  <div className="">
                    <span className="">Tham vấn y khoa:</span>
                    <span className="font-medium"> Bác sĩ Thu uyên</span>
                    <span> 11/03/2024</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="!flex gap-7 cursor-pointer w-[575px]">
              <img
                className="h-[200px] w-[280px] rounded-xl mb-2 bg-cover drop-shadow-lg"
                src={require("../Images/banner-01.jpg")}
                alt=""
              ></img>
              <div className="max-w-[700px]">
                <div className="text-teal-500 mb-2">Bệnh cúm</div>
                <div className="text-slate-800 text-lg font-medium mb-2">
                  Cúm A có nguy hiểm không? Làm gì để phòng tránh biến chứng cúm
                  A?
                </div>
                <div className="h-[65px] text-[15px] text-ellipsis overflow-hidden mb-3">
                  Có 4 loại virus cúm: A, B, C và D. Trong đó, virus cúm A là
                  loại virus cúm duy nhất được biết là gây ra đại dịch cúm trên
                  toàn cầu. Vậy, cúm A có nguy hiểm không mà được coi là đại
                  dịch và làm cách nào để tránh các hậu quả nghiêm trọng?
                </div>
                <div className="flex gap-2 text-base items-center">
                  <img
                    className="h-[35px] w-[35px] rounded-full mb-2 drop-shadow-md"
                    src={require("../Images/doctor.webp")}
                    alt=""
                  ></img>
                  <div className="">
                    <span className="">Tham vấn y khoa:</span>
                    <span className="font-medium"> Bác sĩ Thu uyên</span>
                    <span> 11/03/2024</span>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>

        <div className="flex items-center justify-center text-2xl text-slate-800 font-medium py-10 ">
          Doctor Coming đem đến thông tin sức khỏe mà bạn cần
        </div>
        <div className="grid grid-cols-4 gap-4 justify-items-center">
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
