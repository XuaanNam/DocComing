import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout } from "../redux-toolkit/authSlice";
import { persistor } from "../redux-toolkit/configureStore";

const DoctorSidebar = ({ param }) => {
  const { currentUser, user, auth } = useSelector((state) => state.user);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [actived, setActived] = useState("");
  useEffect(() => {
    if (param === "manage-post" || param === "create-post") {
      setActived("blog");
    } else {
      setActived(param);
    }
  }, []);
  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      persistor.purge();
    }, 200);
  };

  return (
    <div className="shadow-lg bg-white min-h-screen">
      <div className="w-full md:w-56 font-medium pt-[70px]">
        <div className="px-12 py-4 mb-4">
          <a
            href="/doctor/dashboard"
            className="text-2xl font-semibold uppercase text-teal-400 hover:text-gray-300"
          >
            <span className="text-left">Doctor</span>
            <span className="flex justify-end">Coming</span>
          </a>
        </div>
        <div className="">
          <div className="flex flex-col gap-1 font-medium">
            {/* {currentUser && currentUser.isdoctor && ( */}
            <Link
              onClick={() => {
                setActived("dashboard");
              }}
              className={` ${
                actived === "dashboard" &&
                "bg-gradient-to-r from-green-400 to-teal-500 text-white"
              } w-48 h-11 bg-white rounded-lg shadow-md flex items-center justify-center mb-3`}
              to="/doctor/dashboard"
            >
              Dashboard
            </Link>
            <Link
              onClick={() => {
                setActived("profile");
              }}
              className={` ${
                actived === "profile" &&
                "bg-gradient-to-r from-green-400 to-teal-500 text-white"
              } w-48 h-11 bg-white rounded-lg shadow-md flex items-center justify-center mb-3`}
              to="/doctor/profile"
            >
              Profile
            </Link>
            <Link
              onClick={() => {
                setActived("schedule");
              }}
              className={` ${
                actived === "schedule" &&
                "bg-gradient-to-r from-green-400 to-teal-500 text-white"
              } w-48 h-11 bg-white rounded-lg shadow-md flex items-center justify-center mb-3`}
              to="/doctor/schedule"
            >
              Schedule
            </Link>
            <Link
              onClick={() => {
                setActived("appointment");
              }}
              className={` ${
                actived === "appointment" &&
                "bg-gradient-to-r from-green-400 to-teal-500 text-white"
              } w-48 h-11 bg-white rounded-lg shadow-md flex items-center justify-center mb-3`}
              to="/doctor/appointment"
            >
              Appointment
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
              } w-48 h-11 bg-white rounded-lg shadow-md flex items-center justify-center  cursor-pointer`}
            >
              Blog
            </div>
            {actived === "blog" && (
              <div className="transition-all duration-500 ">
                <Link
                  className={` ${
                    param === "manage-post" &&
                    "bg-gradient-to-r from-green-400 to-teal-400 text-white"
                  } w-40 h-9 rounded-lg shadow-md flex items-center justify-center mb-1`}
                  to="/doctor/manage-post"
                >
                  <div>Manage Blog</div>
                </Link>
                <Link
                  className={` ${
                    param === "create-post" &&
                    "bg-gradient-to-r from-green-400 to-teal-400 text-white"
                  } w-40 h-9 rounded-lg shadow-md flex items-center justify-center `}
                  to="/doctor/create-post"
                >
                  <div>Create Blog</div>
                </Link>
              </div>
            )}
            <Link
              onClick={handleLogout}
              to="/doctor/login"
              className="
              w-48 h-11 bg-white rounded-lg cursor-pointer shadow-md flex items-center justify-center mt-3 mb-10 cursor-pointet"
            >
              Log out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSidebar;
