import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout } from "../redux-toolkit/authSlice";
import { persistor } from "../redux-toolkit/configureStore";
import { MdManageSearch, MdOutlinePostAdd } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { GrSchedule } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

const DoctorSidebar = ({param}) => {
  const dispatch = useDispatch();
  const [actived, setActived] = useState("");
  useEffect(() => {
    if (param === "manage-post" || param === "create-post") {
      setActived("blog");
    }
    else
      setActived(param)
  }, [param]);
  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      persistor.purge();
    }, 200);
  };

  return (
    <div className="shadow-lg bg-white ">
      <div className="w-full lg:w-56 max-lg:flex max-lg:flex-col max-lg:gap-2 font-medium lg:pt-[70px] max-lg:pt-[80px] max-lg:px-2">
        <div className="px-12 py-4 lg:mb-4 max-lg:mb-1">
          <div
            className="text-2xl max-lg:items-center max-lg:justify-center max-lg:flex max-lg:gap-3 font-semibold uppercase text-teal-400 hover:text-gray-300"
          >
            <span className="lg:text-left">Doctor </span>
            <span className="lg:flex justify-end">Coming</span>
          </div>
        </div>
        <div className="max-lg:overflow-x-auto max-lg:w-[100vw]">
          <div className="flex lg:flex-col max-lg:w-[96%] gap-1 font-medium">
            <Link
              className={` ${
                param === "profile" && actived === "profile" &&
                "bg-gradient-to-r from-green-400 to-teal-500 text-white"
              } max-lg:text-sm w-48 h-11 bg-white rounded-lg shadow-lg flex items-center px-4 mb-3`}
              to="/doctor/profile"
            >
              <div className="flex gap-2 items-center">
                <FaRegUserCircle className="h-5 w-5"></FaRegUserCircle>
                <p>Profile</p>
              </div>
            </Link>
            <Link
              className={` ${
                param === "schedule" && actived === "schedule" &&
                "bg-gradient-to-r from-green-400 to-teal-500 text-white"
              } max-lg:text-sm w-48 h-11 bg-white rounded-lg shadow-lg flex items-center px-4 mb-3`}
              to="/doctor/schedule"
            >
              <div className="flex gap-2 items-center">
                <GrSchedule className="h-5 w-5"></GrSchedule>
                <p>Schedule</p>
              </div>
            </Link>
            <Link
              className={` ${
                param === "appointment" && actived === "appointment" &&
                "bg-gradient-to-r from-green-400 to-teal-500 text-white"
              } max-lg:text-sm w-48 h-11 bg-white rounded-lg shadow-lg flex items-center px-4 mb-3`}
              to="/doctor/appointment"
            >
              <div className="flex gap-2 items-center">
                <AiOutlineSchedule className="h-5 w-5"></AiOutlineSchedule>
                <p>Appointment</p>
              </div>
            </Link>            
            <div
              onClick={() => {
                setActived("blog");
              }}
              className={` ${
                (actived === "blog" ||
                  param === "manage-post" ||
                  param === "create-post") &&
                "bg-gradient-to-r from-green-400 to-teal-500 text-white"
              } ${actived === "blog" && "max-lg:hidden"} max-lg:text-sm w-48 h-11 bg-white rounded-lg shadow-lg flex items-center px-4  cursor-pointer`}
            >
              <div className="flex gap-2 items-center">
                <BsPostcard className="h-5 w-5"></BsPostcard>
                <p>Blog</p>
              </div>
            </div>
            {actived === "blog" && (
              <div className="transition-all duration-500 max-lg:flex max-lg:gap-2">
                <Link
                  className={` ${
                    param === "create-post" &&
                    "bg-gradient-to-r from-green-400 to-teal-400 text-white"
                  } max-lg:text-sm lg:w-40 lg:h-9 max-lg:w-48 max-lg:h-11 rounded-lg shadow-lg flex items-center px-4 `}
                  to="/doctor/create-post"
                >
                  <div className="flex gap-2 items-center">
                    <MdOutlinePostAdd className="h-5 w-5"></MdOutlinePostAdd>
                    <p>Create Blog</p>
                  </div>
                </Link>
                <Link
                  className={` ${
                    param === "manage-post" &&
                    "bg-gradient-to-r from-green-400 to-teal-400 text-white"
                  } max-lg:text-sm lg:w-40 lg:h-9 max-lg:w-48 max-lg:h-11 rounded-lg shadow-lg flex items-center px-4 mb-1`}
                  to="/doctor/manage-post"
                >
                  <div className="flex gap-2 items-center">
                    <MdManageSearch className="h-5 w-5"></MdManageSearch>
                    <p>Manage Blog</p>
                  </div>
                </Link>
                
              </div>
            )}
            <Link
              onClick={handleLogout}
              to="/doctor/login"
              className="
              max-lg:hidden w-48 h-11 bg-white rounded-lg cursor-pointer shadow-lg flex items-center px-4 mt-3 mb-10 cursor-pointet"
            >
              <div className="flex gap-2 items-center">
                <FiLogOut className="h-5 w-5"></FiLogOut>
                <p>Log out</p>
              </div> 
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSidebar;
