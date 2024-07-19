import React, { useEffect, useState } from "react";
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
import { Rate,Input } from 'antd';
import StarIcon from '@mui/icons-material/Star';
import { yellow,grey } from '@mui/material/colors';

const DoctorDetail = () => {
  const { detailDoctor, error, loading } = useSelector((state) => state.user);
  const { ratingDoctor } = useSelector((state) => state.appointment);
  const loadingDoctor = useSelector((state) => state.user.loading)
  const loadingRating = useSelector((state) => state.appointment.loading)
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { doctorId } = useParams();
  const Id = doctorId?.slice(-9);
  const path = (name, id) => {
    const x = name + "_" + id;
    return x;
  };
  const [rating,setRating] = useState([0,0,0,0,0])
  const [count ,setCount] = useState(0)
  const [star,setStar] = useState(0)
  const max = Math.max(...rating);
  useEffect(() => {
    dispatch(getDetailDoctor(Id));
    dispatch(getRatingDoctor(Id))
  }, [Id, dispatch]);
  useEffect(()=>{
    let rate = [];
    let count = 0;
    if(ratingDoctor){
      for(let i=ratingDoctor.length-1;i>=0;i--){
        rate.push(ratingDoctor[i].Rate.length);
        count += ratingDoctor[i].Rate.length
        if(i === 0){
          setRating(rate)
          setCount(count)
        }
      }
    }
  },[ratingDoctor]);
  const TransferDegree = (degree) => {
    let res = ""
    if(degree == "Thạc sĩ y khoa")
      res = "ThS.BS."
    else if(degree == "Tiến sĩ y khoa")
      res = "TS.BS."
    else if(degree == "Cử nhân điều dưỡng")
      res = "ĐD."
    else 
      res = "BS.CK1."
    return res;
  }
  return (
    <div className="pt-[70px]">
      {(loadingDoctor || loadingRating) ?
      <div className="h-screen">
        <div className="spinner mt-12 mx-auto">
        </div>
      </div>
      :
      <div>
        <div className="relative w-full block">
          <img
            className="absolute  w-full sm:h-[480px] object-cover shadow-xl"
            src={require("../Images/backgroundDoctor.jpg")}
            alt=""
          ></img>

          <img
            className="sm:h-[440px] max-sm:h-[200px] object-cover absolute top-10 right-80 z-10 max-sm:top-5 max-sm:left-2"
            src={detailDoctor[0]?.Avt}
            alt=""
          ></img>
          <img
            src={HearIcon}
            className="absolute sm:w-[100px] sm:h[100px] right-40 top-40 max-sm:top-5 max-sm:left-1"
            alt="HeartIcon"
          />
          <img
            src={ClinicIcon}
            className="absolute sm:w-[120px] sm:h[120px] right-1/2 top-24  max-sm:top-5 max-sm:right-6"
            alt="ClinicIcon"
          />
          <div className="absolute left-20 top-20 h-16 p-4 rounded-3xl bg-white bg-opacity-90 shadow-lg text-slate-700 text-3xl font-bold z-10 max-w-[500px] max-sm:w-auto max-sm:text-base max-sm:left-32 max-sm:top-10 max-sm:py-2 max-sm:h-auto">
            {TransferDegree(detailDoctor[0]?.Degree)} {detailDoctor[0]?.FullName}
          </div>
          <div className="absolute left-20 top-40 min-h-12 p-3 mb-3 rounded-3xl bg-white bg-opacity-90 shadow-lg text-slate-700 flex gap-3 items-center max-w-[500px] max-sm:z-20 max-sm:w-auto max-sm:text-base max-sm:left-32 max-sm:top-24 max-sm:py-2 max-sm:h-auto">
            <div className="w-9 h-9 max-sm:w-7 max-sm:h-7 rounded-full bg-white drop-shadow-lg flex items-center justify-center">
              <img
                src={SpecialtiesIcon}
                className="w-5 h-5 max-sm:w-4 max-sm:h-4"
                alt="SpecialtiesIcon"
              />
            </div>
            <p className="w-[85%] flex gap-1 text-lg">
              <p className="font-medium">{detailDoctor[0]?.Experience}</p> năm kinh nghiệm
            </p>
          </div>
          <div className="absolute left-20 top-60 min-h-12 px-5 py-3 mb-3 rounded-3xl bg-white bg-opacity-90 shadow-lg text-slate-700 flex gap-3 items-center max-sm:w-auto max-sm:text-base max-sm:left-32 max-sm:top-40 max-sm:py-2 max-sm:h-auto">
            <Rate className="w-52 flex gap-2 max-sm:hidden"
                  value={parseFloat(detailDoctor[0]?.Star)}
                  allowHalf
                  style={{ fontSize: 28}}
                  disabled={true}
            ></Rate>
            <Rate className="sm:hidden flex max-sm:gap-1 max-sm:w-auto"
                  value={parseFloat(detailDoctor[0]?.Star)}
                  allowHalf
                  style={{ fontSize: 24}}
                  disabled={true}
            ></Rate>
            <div className="w-12 max-sm:w-auto flex gap-2 items-center">
              <p className="font-medium text-xl text-teal-600">{detailDoctor[0]?.Star?.slice(0,3) ? detailDoctor[0]?.Star?.slice(0,3) : "0.00" }</p>
            </div>
          </div>
          <Button
            onClick={() => {
              Navigate(`/booking/${path(detailDoctor[0]?.FullName, Id)}`);
            }}
            className="absolute left-20 top-80 max-sm:top-60 shadow-lg shadow-purple-500 z-10 w-60 my-5 mx-auto h-[52px] rounded-3xl drop-shadow-lg transition-transform duration-500 hover:scale-105"
            gradientDuoTone="purpleToPink"
          >
            <p className="text-lg">Đặt khám tại nhà</p>
          </Button>
        </div>
        <div className="pt-[520px] max-sm:pt-[360px] mx-20 max-sm:mx-1.5 mb-20">
          <div className="flex flex-wrap gap-7 mb-10 justify-center">
            <div className="w-60 h-48 max-sm:w-[45%] max-sm:h-auto bg-white p-3 rounded-3xl shadow-lg flex flex-col gap-2 justify-center items-center">
              <div className="rounded-full w-16 h-16 shadow-lg shadow-violet-400 bg-white flex justify-center items-center">
                <img
                  src={SpecialtiesIcon}
                  className="w-10 h-10"
                  alt="SpecialtiesIcon"
                />
              </div>

              <p className="text-lg  text-teal-800 font-medium">Chuyên khoa</p>
              <p className="h-12  text-gray-700 w-[90%] text-center">
                {detailDoctor[0]?.Major}
              </p>
            </div>
            <div className="w-60 h-48 max-sm:w-[45%] max-sm:h-auto bg-white p-3 rounded-3xl shadow-lg flex flex-col gap-2 justify-center items-center">
              <div className="rounded-full w-16 h-16 shadow-lg shadow-violet-400 bg-white flex justify-center items-center">
                <img src={SchoolIcon} className="w-10 h-10" alt="SchoolIcon" />
              </div>

              <p className="text-lg text-teal-800 font-medium">Nơi đào tạo</p>
              <p className="h-12 max-sm:h-auto  text-gray-700 w-[90%] text-center">
                {detailDoctor[0]?.Training}
              </p>
            </div>
            <div className="w-60 h-48 max-sm:w-[45%] max-sm:h-auto bg-white p-3 rounded-3xl shadow-lg flex flex-col gap-2 justify-center items-center">
              <div className="rounded-full w-16 h-16 shadow-lg shadow-violet-400 bg-white flex justify-center items-center">
                <img src={DegreeIcon} className="w-10 h-10" alt="DegreeIcon" />
              </div>
              <p className="text-lg text-teal-800 font-medium">Bằng cấp</p>
              <p className="h-12  text-gray-700 w-[90%] text-center">
                {detailDoctor[0]?.Degree}
              </p>
            </div>
            <div className="w-60 h-48 max-sm:w-[45%] max-sm:h-auto bg-white p-3 rounded-3xl shadow-lg flex flex-col gap-2 justify-center items-center">
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
          <p className="text-2xl text-teal-900 font-bold mb-5 max-sm:px-3">
            Học vấn và kinh nghiệm
          </p>
          <hr className="w-24 max-sm:w-32 max-sm:ml-3 border-[1.5px] border-teal-800 rounded-lg mb-5"></hr>
          <div
            className="text-base mb-8 text-justify text-slate-600 bg-white p-10 max-sm:p-3 rounded-xl shadow-lg"
            dangerouslySetInnerHTML={{ __html: detailDoctor[0]?.Introduce }}
          ></div>
          <p className="text-2xl max-sm:px-3 text-teal-900 font-bold mb-5">
            Phản hồi từ bệnh nhân
          </p>
          <hr className="w-24 max-sm:ml-3 border-[1.5px] border-teal-800 rounded-lg mb-5"></hr>
          <div className="text-base mb-8 text-slate-600 bg-white p-10 max-sm:p-3  rounded-xl shadow-lg ">
              <p className="italic mb-5 text-slate-500">
                "Phản hồi từ bệnh nhân đã qua các lần hẹn khám hoàn thành"
              </p>
              {count > 0 ?
              <>
                <div className="w-[50%] max-sm:w-full">
                  <div className="">
                  <div className="flex gap-8 max-sm:flex-col items-center mb-5">
                    <div className={` bg-white rounded-xl drop-shadow-lg max-sm:w-full max-sm:mx-6 h-full p-3`}>
                      <div className="flex flex-col h-full gap-3 items-center justify-center">
                        <p className="text-2xl text-pink-500 font-medium">{detailDoctor[0]?.Star?.slice(0,3) ? detailDoctor[0]?.Star?.slice(0,3) : "0.00" }</p>
                        <div>
                          <Rate className="w-full flex gap-1"
                                value={parseFloat(detailDoctor[0]?.Star?.slice(0,3))}
                                allowHalf
                                style={{ fontSize: 24}}
                                disabled={true} 
                          />
                        </div>
                        <p className={` text-lg`}>{count} đánh giá</p>
                      </div>
                    </div>
                    <table className="w-[80%]">
                      <tbody>
                        {rating.map((item, itemIndex) => {
                          let style = {
                            backgroundColor: item > 0 ? yellow[600] : grey[200],
                            width: (item / max) * 100 + '%',
                            height: '12px',
                            borderRadius: '8px',
                          }

                          return (
                            <tr className="flex items-center gap-3 w-full" key={itemIndex}>
                              <td className={`w-2 font-medium`}>
                                {5 - itemIndex} 
                              </td>
                              <td>
                                  <StarIcon className="text-gray-400 h-4" />
                              </td>
                              <td className='w-[80%]'>
                                  <div className="w-full h-3 rounded-lg bg-[#eeeeee]">
                                      <div style={style}>
                                      </div>
                                  </div>
                              </td>
                              <td>
                                  <span className={` text-slate-600`}>{item}</span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 max-sm:gap-4 mb-8">
                  {rating.map((item,index) => (
                  <div className="flex gap-1 items-center justify-center w-20 h-8 bg-white hover:bg-slate-100 rounded-2xl shadow-md cursor-pointer"
                      onClick={()=>{setStar(index+1)}}
                  >
                    {index + 1}
                    <StarIcon className="text-[#fdd835] h-4" />
                  </div>
                  ))}
                  <div className="flex gap-1 items-center justify-center w-20 h-8 bg-white hover:bg-slate-100 rounded-2xl shadow-md cursor-pointer"
                      onClick={()=>{setStar(0)}}
                  >
                    Tất cả
                  </div>
                </div>
                {star === 0 ?
                ratingDoctor?.map((item) => (
                  item.Rate.map((rate) => 
                    <div className="mb-5">
                      <div className="flex gap-3 mb-3">
                        <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center">
                          <img
                            className="rounded-full h-10 w-10 object-cover"
                            alt=""
                            src={rate.Avt || require("../Images/pattientavt.png")}
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
                              src={rate.Avt || require("../Images/pattientavt.png")}
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
              </>
              :
              <div className="text-xl font-medium text-teal-700 italic">Bác sĩ hiện chưa nhận được đánh giá</div>
              }
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default DoctorDetail;
