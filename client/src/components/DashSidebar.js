import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout } from "../redux-toolkit/authSlice";
import { persistor } from "../redux-toolkit/configureStore";

const DashSidebar = ({ param }) => {
  const { currentUser, user, auth } = useSelector((state) => state.user);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [blogActived, setBlogActived] = useState(false);
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
    <div className="shadow-xl bg-white lg:min-h-screen">
      <div className="w-full lg:w-56 max-lg:flex max-lg:flex-col max-lg:gap-2 font-medium lg:pt-[70px] max-lg:pt-[80px] max-lg:px-2">
        <div className="px-12 py-4 lg:mb-4 max-lg:mb-1">
          <a
            href="/admin/dashboard"
            className="text-2xl max-lg:items-center max-lg:justify-center max-lg:flex max-lg:gap-3 font-semibold uppercase text-teal-400 hover:text-gray-300"
          >
            <span className="text-left">Doctor</span>
            <span className="flex justify-end">Coming</span>
          </a>
        </div>
        <div className="max-lg:overflow-x-auto max-lg:w-[100vw]">
          <div className="flex lg:flex-col max-lg:w-[96%] gap-1 font-medium">
            {/* {currentUser && currentUser.isAdmin && ( */}
            <Link
              onClick={() => {
                setActived("dashboard");
              }}
              className={` ${
                param === "dashboard" &&
                "bg-gradient-to-r from-green-400 to-teal-500 text-white"
              } max-lg:text-sm w-48 h-11 rounded-lg shadow-md flex items-center justify-center mb-3`}
              to="/admin/dashboard"
            >
              Dashboard
            </Link>
            <Link
              onClick={() => {
                setActived("profile");
              }}
              className={` ${
                param === "profile" &&
                "bg-gradient-to-r from-green-400 to-teal-500 text-white"
              } max-lg:text-sm w-48 h-11 rounded-lg shadow-md flex items-center justify-center mb-3`}
              to="/admin/profile"
            >
              Profile
            </Link>
            <Link
              onClick={() => {
                setActived("appointment");
              }}
              className={` ${
                param === "appointment" &&
                "bg-gradient-to-r from-green-400 to-teal-500 text-white"
              } max-lg:text-sm w-48 h-11 rounded-lg shadow-md flex items-center justify-center mb-3`}
              to="/admin/appointment"
            >
              Appointment
            </Link>
            <Link
              onClick={() => {
                setActived("users");
              }}
              className={` ${
                param === "users" &&
                "bg-gradient-to-r from-green-400 to-teal-500 text-white"
              } max-lg:text-sm w-48 h-11 rounded-lg shadow-md flex items-center justify-center mb-3`}
              to="/admin/users"
            >
              User
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
              } ${actived === "blog" && "max-lg:hidden"} max-lg:text-sm w-48 h-11 rounded-lg shadow-md flex items-center justify-center  cursor-pointer`}
            >
              Blog
            </div>
            {actived === "blog" && (
              <div className="transition-all duration-500 max-lg:flex max-lg:gap-2">
                <Link
                  className={` ${
                    param === "manage-post" &&
                    "bg-gradient-to-r from-green-400 to-teal-400 text-white"
                  } max-lg:text-sm lg:w-40 lg:h-9 max-lg:w-48 max-lg:h-11 rounded-lg shadow-md flex items-center justify-center mb-1`}
                  to="/admin/manage-post"
                >
                  <div>Manage Blog</div>
                </Link>
                <Link
                  className={` ${
                    param === "create-post" &&
                    "bg-gradient-to-r from-green-400 to-teal-400 text-white"
                  } max-lg:text-sm lg:w-40 lg:h-9 max-lg:w-48 max-lg:h-11 rounded-lg shadow-md flex items-center justify-center `}
                  to="/admin/create-post"
                >
                  <div>Create Blog</div>
                </Link>
              </div>
            )}
            <Link
              onClick={handleLogout}
              to="/admin/login"
              className="
              max-lg:hidden w-48 h-11 rounded-lg cursor-pointer shadow-md flex items-center justify-center mt-3 mb-10 cursor-pointet"
            >
              Log out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashSidebar;
