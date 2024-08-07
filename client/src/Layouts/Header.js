import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";
import { GoBellFill } from "react-icons/go";
import { FaRegUserCircle,FaUsersCog  } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { GrSchedule } from "react-icons/gr";
import { AiOutlineSchedule, AiOutlineDashboard } from "react-icons/ai";
import { MdOutlinePostAdd, MdManageSearch } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { getAllDoctors, getAllNotification, logout, readNotification } from "../redux-toolkit/authSlice";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.png";
import { fetchProfile } from "../redux-toolkit/authSlice";
import { persistor } from "../redux-toolkit/configureStore";
import { fetchCategories, fetchMajor, searchDisease, searchPost } from "../redux-toolkit/postSlice";

import { Input } from 'antd';
import { Button } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { MdOutlineNoteAlt } from "react-icons/md";
const Header = () => {
  const { currentUser, user, allNoti } = useSelector((state) => state.user);
  const [actived, setActived] = useState(false);
  const [noti, setNoti] = useState(false);
  const [numberElement, setNumberElement] = useState(6)
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const authentication = currentUser?.authentication;
  const [keywordDisease, setKeywordDisease] = useState("")

  const handleSearchMajor = () => {
    localStorage.setItem("keywordDiseases", JSON.stringify(keywordDisease))
    dispatch(searchDisease({keywords: keywordDisease})).then(() => {
      Navigate("/doctors")
      setKeywordDisease("")
    })
  }
  const handleLogout = () => {
    if (authentication == 0) Navigate("/admin/login");
    else Navigate("/");
    dispatch(logout());
    setTimeout(() => {
      persistor.purge();
    }, 200);
  };
  const handleRead = (id) => {
    dispatch(readNotification({id})).then(() => {
      dispatch(getAllNotification())
    })
  }
  const handleNavigate = (url) => {
    if(url == "Email")
      window.open("https://mail.google.com")
    else if(url != "None")
      Navigate(url)
  }

  useEffect(()=>{
    if(currentUser){
      dispatch(getAllNotification())
    }
    if(currentUser?.authentication == 0 || currentUser?.authentication == 2){
      dispatch(fetchCategories());
      dispatch(fetchMajor());
    }
  },[currentUser])
  useEffect(()=>{
    if(currentUser){
      const interval = setInterval(() => {
        dispatch(getAllNotification())
      }, 180000);
      return () => clearInterval(interval);
    }
  },[currentUser,dispatch])
  const slice = allNoti?.notification?.slice(0,numberElement);
  return (
    <div className="h-[70px] fixed w-screen z-50 max-sm:h-[80px]">
      {actived && (
        <div
          className="absolute inset-0 w-screen h-screen overlay"
          onClick={() => {
            setActived(false);
          }}
        ></div>
      )}
      {noti && (
        <div
          className="absolute inset-0 w-screen h-screen overlay"
          onClick={() => {
            setNoti(false);
          }}
        ></div>
      )}
      <div className="text-sm h-full px-5 font-medium text-teal-800 max-sm:px-2 bg-[#2d988a] grid grid-cols-4 max-lg:grid-cols-11 max-lg:gap-1 drop-shadow-lg">
        <div className="max-lg:col-start-1 max-lg:col-span-3 col-start-1 col-span-1 lg:pl-5 text-xl flex items-center font-bold text-teal-500">
          <img className="rounded-full border-2 border-white h-12 w-12 mr-3 max-sm:h-10 max-sm:w-10 max-sm:mr-1 object-cover" alt="logo" src={logo}></img>
          <Link className="text-gray-100 max-sm:text-sm" to="/">
            Doctor Coming
          </Link>
        </div>
        <div className="max-lg:hidden max-lg:col-start-4 max-lg:col-span-1 col-start-2 col-span-1 flex items-center justify-center">
            <div className="relative w-full flex lg:gap-3 items-center justify-center">
                <Input 
                    placeholder="Tìm bác sĩ theo bệnh" 
                    className="h-11 pl-14 rounded-lg border-slate-400" 
                    value={keywordDisease}
                    onChange={(e)=>{setKeywordDisease(e.target.value)}}
                    onKeyDown={(e) => { 
                      if (e.key === "Enter") 
                        handleSearchMajor(); 
                }} />
                <CiSearch className="h-6 w-6 text-teal-300 sm:absolute sm:top-[10px] lg:left-4 max-sm:bg-slate-100 max-sm:rounded-lg"></CiSearch>
            </div>
        </div>
        <div className="max-lg:col-start-4 max-lg:col-span-3 text-gray-100 lg:mr-4 flex gap-2 items-center col-start-3 justify-end font-medium cursor-pointer">
          <div
            onClick={() => {
              Navigate("/doctors");
            }}
            className="max-sm:text-xs lg:h-[34px] lg:w-[150px] lg:p-1.5 rounded-lg text-center transition-transform duration-500 hover:scale-125"
          >
            Đội ngũ bác sĩ
          </div>
          <div
            onClick={() => {
              Navigate("/categories");
            }}
            className="max-sm:text-xs lg:h-[34px] lg:w-[100px] lg:p-1.5 rounded-lg text-center transition-transform duration-500 hover:scale-125"
          >
            Chuyên mục
          </div>
        </div>

        <div className="max-sm:col-start-7 sm:max-lg:col-start-8 max-sm:col-span-5 sm:max-lg:col-span-4 relative flex lg:gap-3 w-full items-center lg:col-start-4">
          <div className="w-[1px] lg:h-[34px] max-sm:h-10 bg-gray-200"></div>
          {currentUser ? (
            <div className="flex sm:gap-1 items-center w-full">
              <div
                className="flex lg:gap-3 max-sm:w-[87%] items-center justify-center cursor-pointer lg:w-[81%] sm:max-lg:w-full"
                onClick={() => {setActived(!actived); setNoti(false)}}
              >
                <div className="rounded-full  h-[38px] w-[38px] max-sm:h-5 max-sm:w-5 bg-white flex items-center justify-center">
                  <img
                    className="rounded-full h-[34px] w-[34px] max-sm:h-4 max-sm:w-4 object-cover"
                    alt=""
                    src={user?.data?.Avt ? user?.data?.Avt.toString() : require("../Images/pattientavt.png")}
                  ></img>
                </div>

                <p className="max-sm:text-sm max-sm:pl-1 font-medium text-base text-center text-gray-100 truncate max-w-[65%]">
                  {user?.data
                    ? user?.data?.FullName
                    : currentUser?.FullName}
                </p>
                <IoMdArrowDropdown
                  className={`${
                    actived === true && " rotate-180 transition-all"
                  } text-gray-100 h-5 w-5 max-sm:h-4 max-sm:w-4`}
                ></IoMdArrowDropdown>
              </div>
              <div className="relative cursor-pointer"
                   onClick={() => {setNoti(!noti);setActived(false)}}
              >
                <GoBellFill
                  className="max-sm:h-5 max-sm:w-5 h-7 w-7 text-lime-100 cursor-pointer transition-all duration-500 hover:scale-110"
                >       
                </GoBellFill>
              {parseInt(allNoti?.Unread) > 0 &&
                <div>
                  <div className="animate-ping absolute top-0 right-1 inline-flex h-[10px] w-[10px] rounded-full bg-rose-500 transition-transform duration-700"></div>
                  <span className="absolute top-0 right-1 inline-flex rounded-full h-[10px] w-[10px] bg-rose-600"></span>
                </div>
              }
              </div>
              {noti && (
                <div className={`flex flex-col gap-2 h-[600px] max-sm:text-sm max-sm:w-[200px] max-sm:right-[0px] max-sm:top-[65px] absolute lg:top-[62px] lg:w-full py-3 sm:px-5 max-sm:px-2 font-medium text-teal-800 lg:text-base bg-white rounded-lg shadow-lg drop-shadow-lg transition ease-in-out duration-500 z-50`}>
                  <p className="max-sm:px-3 text-center">Thông báo</p>
                  <hr className="w-full"></hr>
                  <div className="h-[90%] overflow-auto">
                  {slice?.map((noti) =>(
                    <div className="flex flex-col gap-2">
                      <div className="hover:bg-slate-100 w-full sm:p-2 cursor-pointer rounded-lg flex flex-col gap-2"
                          onClick={() => {handleNavigate(noti.Type);setNoti(false);handleRead(noti.id)}}
                      >
                        <div className="flex sm:gap-3 max-sm:gap-[2px] items-center">
                          <div className={`w-[90%] max-sm:w-full ${noti.Status === 1 && "opacity-75"} `}>
                            <div className="sm:text-sm max-sm:text-[11.5px] mb-1 text-black">
                              {noti.Notification}
                            </div>
                            <p className="text-xs max-sm:text-[10px] font-normal self-start text-teal-700">{noti.NotiTime.slice(11,16)} {noti.NotiTime.slice(8,10)}/{noti.NotiTime.slice(5,7)}/{noti.NotiTime.slice(0,4)}</p>
                          </div>  
                          {noti.Status === 0 &&
                            <GoDotFill className="text-sky-600 h-4 w-4 max-sm:h-2 max-sm:w-2"/>
                          }
                        </div>
                      </div>
                      <hr className="w-[95%] max-sm:pb-2"></hr>
                    </div>
                  ))}
                  </div>
                  {allNoti?.notification?.length > 6 &&
                    <Button
                        className="my-3 w-32 max-sm:w-28 max-sm:text-xs rounded-2xl mx-auto h-9 text-slate-700"
                        gradientDuoTone="tealToLime"
                        onClick={()=>{setNumberElement(numberElement+numberElement)}}
                    >
                    Xem thêm
                    </Button>
                    }
                </div>
              )}

              {actived && (
                <div
                  className={`max-sm:text-sm max-sm:w-[165px] max-sm:right-[0px] max-sm:top-[65px] absolute sm:max-lg:left-8 sm:max-lg:top-[62px] sm:max-lg:w-64 lg:left-8 lg:top-[62px] lg:w-64 lg:text-base bg-white rounded-lg shadow-lg drop-shadow-lg transition-all duration-500 z-50`}
                >
                  {authentication == 2 && (
                    <>
                      <div
                        onClick={() => {
                          setActived(false);
                          Navigate("/doctor/profile");
                        }}
                        className="flex gap-3 account-link rounded-lg items-center hover:text-white px-5 font-medium text-teal-800 cursor-pointer"
                      >
                        <FaRegUserCircle className="h-5 w-5 "></FaRegUserCircle>
                        <div className="block py-3 max-sm:xs">Hồ sơ</div>
                      </div>
                      <div
                        onClick={() => {
                          setActived(false);
                          Navigate("/doctor/schedule");
                        }}
                        className="flex gap-3 account-link rounded-lg items-center hover:text-white px-5 font-medium text-teal-800 cursor-pointer"
                      >
                        <GrSchedule className="h-4 w-5 "></GrSchedule>
                        <div className="block py-3 max-sm:xs">Lịch làm việc</div>
                      </div>
                      <div
                        onClick={() => {
                          setActived(false);
                          Navigate("/doctor/appointment");
                        }}
                        className="flex gap-3 account-link rounded-lg items-center hover:text-white px-5 font-medium text-teal-800 cursor-pointer"
                      >
                        <AiOutlineSchedule className="h-5 w-5 "></AiOutlineSchedule>
                        <div className="block py-3 max-sm:xs">Lịch khám</div>
                      </div>
                      <div
                        onClick={() => {
                          setActived(false);
                          Navigate("/doctor/create-post");
                        }}
                        className="flex gap-3 account-link rounded-lg items-center hover:text-white px-5 font-medium text-teal-800 cursor-pointer"
                      >
                        <MdOutlinePostAdd className="h-5 w-5 "></MdOutlinePostAdd>
                        <div className="block py-3 max-sm:xs">Thêm bài viết</div>
                      </div>
                      <div
                        onClick={() => {
                          setActived(false);
                          Navigate("/doctor/manage-post");
                        }}
                        className="flex gap-3 account-link rounded-lg items-center hover:text-white px-5 font-medium text-teal-800 cursor-pointer"
                      >
                        <MdManageSearch className="h-5 w-5 "></MdManageSearch>
                        <div className="block py-3 max-sm:xs">Quản lý bài viết</div>
                      </div>
                  </>
                  )}
                  {authentication == 1 && (
                    <div>
                      <div
                        onClick={() => {
                          setActived(false);
                          Navigate("/patient/profile");
                        }}
                        className="flex gap-3 account-link rounded-lg items-center hover:text-white px-5 font-medium text-teal-800 cursor-pointer"
                      >
                        <FaRegUserCircle className="h-5 w-5"></FaRegUserCircle>
                        <div className="block py-3 max-sm:xs">Hồ sơ</div>
                      </div>
                      <div
                        onClick={() => {
                          setActived(false);
                          Navigate("/patient/appointment");
                        }}
                        className="flex gap-3 account-link rounded-lg items-center hover:text-white px-5 font-medium text-teal-800 cursor-pointer"
                      >
                        <LuCalendarDays className="h-5 w-5"></LuCalendarDays>
                        <div className="block py-3 max-sm:xs">Lịch khám</div>
                      </div>
                      <div
                        onClick={() => {
                          setActived(false);
                          Navigate("/patient/health-record");
                        }}
                        className="flex gap-3 account-link rounded-lg items-center hover:text-white px-5 font-medium text-teal-800 cursor-pointer"
                      >
                        <MdOutlineNoteAlt className="h-5 w-5"></MdOutlineNoteAlt>
                        <div className="block py-3 max-sm:xs">Bệnh án</div>
                      </div>
                    </div>
                  )}
                  {authentication == 0 && (
                    <>
                    <div
                      onClick={() => {
                        setActived(false);
                        Navigate("/admin/dashboard");
                      }}
                      className="flex gap-3 account-link rounded-lg items-center hover:text-white px-5 font-medium text-teal-800 cursor-pointer"
                    >
                      <AiOutlineDashboard className="h-5 w-5"></AiOutlineDashboard>
                      <div className="block py-3 max-sm:xs">Bảng điều khiển</div>
                    </div>
                    <div
                      onClick={() => {
                        setActived(false);
                        Navigate("/admin/profile");
                      }}
                      className="flex gap-3 account-link rounded-lg items-center hover:text-white px-5 font-medium text-teal-800 cursor-pointer"
                    >
                      <FaRegUserCircle className="h-5 w-5 "></FaRegUserCircle>
                      <div className="block py-3 max-sm:xs">Hồ sơ</div>
                    </div>
                    <div
                      onClick={() => {
                        setActived(false);
                        Navigate("/admin/appointment");
                      }}
                      className="flex gap-3 account-link rounded-lg items-center hover:text-white px-5 font-medium text-teal-800 cursor-pointer"
                    >
                      <AiOutlineSchedule className="h-5 w-5 "></AiOutlineSchedule>
                      <div className="block py-3 max-sm:xs">Lịch khám</div>
                    </div>
                    <div
                      onClick={() => {
                        setActived(false);
                        Navigate("/admin/users");
                      }}
                      className="flex gap-3 account-link rounded-lg items-center hover:text-white px-5 font-medium text-teal-800 cursor-pointer"
                    >
                      <FaUsersCog className="h-5 w-5 "></FaUsersCog>
                      <div className="block py-3 max-sm:xs">Quản lý người dùng</div>
                    </div>
                    <div
                      onClick={() => {
                        setActived(false);
                        Navigate("/admin/create-post");
                      }}
                      className="flex gap-3 account-link rounded-lg items-center hover:text-white px-5 font-medium text-teal-800 cursor-pointer"
                    >
                      <MdOutlinePostAdd className="h-5 w-5 "></MdOutlinePostAdd>
                      <div className="block py-3 max-sm:xs">Thêm bài viết</div>
                    </div>
                    <div
                      onClick={() => {
                        setActived(false);
                        Navigate("/admin/manage-post");
                      }}
                      className="flex gap-3 account-link rounded-lg items-center hover:text-white px-5 font-medium text-teal-800 cursor-pointer"
                    >
                      <MdManageSearch className="h-5 w-5 "></MdManageSearch>
                      <div className="block py-3 max-sm:xs">Quản lý bài viết</div>
                    </div>
                  </>
                  )}
                  <div
                    className="flex gap-3 account-link rounded-lg items-center hover:text-white px-5 font-medium text-teal-800 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="h-5 w-5"></FiLogOut>

                    <p className="block py-3 max-sm:xs">Đăng xuất</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="sm:ml-5 w-full flex gap-3 justify-center items-center text-base max-sm:pl-3">
              <div className="w-1/2 flex justify-center">
                <Link
                  to="/login"
                  className="max-sm:p-1 max-sm:text-xs sm:max-lg:w-full font-medium text-center text-gray-100 cursor-pointer transition-transform duration-500 hover:scale-110"
                >
                  Đăng nhập
                </Link>
              </div>
              <div className="w-1/2  flex justify-center">
                <Link
                  to="/register"
                  className="max-sm:text-xs sm:max-lg:h-[40px] flex justify-center items-center sm:max-lg:w-[90%] max-sm:h-[40px] max-sm:w-[80px] max-sm:p-1 lg:h-[38px] lg:w-[120px] text-center border-[1.5px] text-white bg-teal-400 lg:p-1.5 hover:bg-teal-500 transition-transform hover:duration-1000 rounded-lg cursor-pointer"
                >
                  Tạo tài khoản
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
