import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout } from "../redux-toolkit/authSlice";
import { persistor } from "../redux-toolkit/configureStore";
import { MdManageSearch, MdOutlinePostAdd } from "react-icons/md";
import { FaRegUserCircle, FaUsersCog } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

import { AiOutlineDashboard, AiOutlineSchedule } from "react-icons/ai";

const DashSidebar = ({ param }) => {
  const dispatch = useDispatch();
  const [actived, setActived] = useState("");
  useEffect(() => {
    if (param === "manage-post" || param === "create-post") {
      setActived("blog");
    } else {
      setActived(param);
    }
  }, [param]);
  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      persistor.purge();
    }, 200);
  };
  return (
    <div className="shadow-xl lg:min-h-screen">
      <div className="w-full lg:w-56 max-lg:flex max-lg:flex-col max-lg:gap-2 font-medium lg:pt-[70px] max-lg:pt-[80px] max-lg:px-2">
        <div className="px-12 py-4 lg:mb-4 max-lg:mb-1">
          <div
            className="text-2xl max-lg:items-center max-lg:justify-center max-lg:flex max-lg:gap-3 font-semibold uppercase text-white hover:text-gray-300"
          >
            <span className="text-left">Doctor</span>
            <span className="flex justify-end">Coming</span>
          </div>
        </div>
        <div className="max-lg:overflow-x-auto max-lg:w-[100vw]">
          <div className="flex lg:flex-col max-lg:w-[96%] gap-1 font-medium">
            
            <Link
              className={` ${
                param === "dashboard" && actived === "dashboard" &&
                "bg-gradient-to-r from-green-400 to-teal-500 text-white"
              } bg-white max-lg:text-sm w-48 h-11 rounded-lg shadow-md flex items-center px-4 mb-3`}
              to="/admin/dashboard"
            >
              <div className="flex gap-2 items-center">
                <AiOutlineDashboard className="h-5 w-5"></AiOutlineDashboard>
                <p>Dashboard</p>
              </div>

            </Link>
            
            <Link
              className={` ${
                param === "profile" && actived === "profile" &&
                "bg-gradient-to-r from-green-400 to-teal-500 text-white"
              } bg-white max-lg:text-sm w-48 h-11 rounded-lg shadow-md flex items-center px-4 mb-3`}
              to="/admin/profile"
            >
              <div className="flex gap-2 items-center">
                <FaRegUserCircle className="h-5 w-5"></FaRegUserCircle>
                <p>Profile</p>
              </div>
            </Link>
            
            <Link
              className={` ${
                param === "appointment" && actived === "appointment" &&
                "bg-gradient-to-r from-green-400 to-teal-500 text-white"
              } bg-white max-lg:text-sm w-48 h-11 rounded-lg shadow-md flex items-center px-4 mb-3`}
              to="/admin/appointment"
            >
              <div className="flex gap-2 items-center">
                <AiOutlineSchedule className="h-5 w-5"></AiOutlineSchedule>
                Appointment
              </div>

            </Link>
            
            <Link
              className={` ${
                param === "users" && actived === "users" &&
                "bg-gradient-to-r from-green-400 to-teal-500 text-white"
              } bg-white max-lg:text-sm w-48 h-11 rounded-lg shadow-md flex items-center px-4 mb-3`}
              to="/admin/users"
            >
              <div className="flex gap-2 items-center">
                <FaUsersCog className="h-5 w-5"></FaUsersCog>
                User
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
              } ${actived === "blog" && "max-lg:hidden"} bg-white max-lg:text-sm w-48 h-11 rounded-lg shadow-md flex items-center px-4  cursor-pointer`}
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
                  } bg-white max-lg:text-sm lg:w-40 lg:h-9 max-lg:w-48 max-lg:h-11 rounded-lg shadow-md flex items-center px-4 `}
                  to="/admin/create-post"
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
                  } bg-white max-lg:text-sm lg:w-40 lg:h-9 max-lg:w-48 max-lg:h-11 rounded-lg shadow-md flex items-center px-4 mt-1`}
                  to="/admin/manage-post"
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
              to="/admin/login"
              className=" bg-white max-lg:hidden w-48 h-11 rounded-lg cursor-pointer shadow-md flex items-center px-4 mt-3 mb-10 cursor-pointet"
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

export default DashSidebar;
