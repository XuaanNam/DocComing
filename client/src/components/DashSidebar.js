import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const DashSidebar = ({ param }) => {
  useEffect(() => {
    if (param === "manage-post" || param === "create-post") {
      setActived("blog");
    } else {
      setActived(param);
    }
  }, []);

  const [blogActived, setBlogActived] = useState(false);
  const [actived, setActived] = useState("");
  return (
    <div className="shadow-xl bg-white min-h-screen">
      <div className="w-full md:w-56 font-medium pt-[70px]">
        <div className="px-12 py-4 mb-4">
          <a
            href="/admin/dashboard"
            className="text-2xl font-semibold uppercase text-[#0f766e] hover:text-gray-300"
          >
            <span className="text-left">Doctor</span>
            <span className="flex justify-end">Coming</span>
          </a>
        </div>
        <div className="">
          <div className="flex flex-col gap-1 font-medium">
            {/* {currentUser && currentUser.isAdmin && ( */}
            <Link
              onClick={() => {
                setActived("dashboard");
              }}
              className={` ${
                actived === "dashboard" &&
                "bg-gradient-to-r from-green-400 to-teal-500 text-white"
              } w-48 h-11 rounded-lg shadow-md flex items-center justify-center mb-3`}
              to="/admin/dashboard"
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
              } w-48 h-11 rounded-lg shadow-md flex items-center justify-center mb-3`}
              to="/admin/profile"
            >
              Profile
            </Link>
            <Link
              onClick={() => {
                setActived("users");
              }}
              className={` ${
                actived === "users" &&
                "bg-gradient-to-r from-green-400 to-teal-500 text-white"
              } w-48 h-11 rounded-lg shadow-md flex items-center justify-center mb-3`}
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
              } w-48 h-11 rounded-lg shadow-md flex items-center justify-center  cursor-pointer`}
              to="/admin/users"
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
                  to="/admin/manage-post"
                >
                  <div>Manage Blog</div>
                </Link>
                <Link
                  className={` ${
                    param === "create-post" &&
                    "bg-gradient-to-r from-green-400 to-teal-400 text-white"
                  } w-40 h-9 rounded-lg shadow-md flex items-center justify-center `}
                  to="/admin/create-post"
                >
                  <div>Create Blog</div>
                </Link>
              </div>
            )}
            <Link
              onClick={() => {
                setActived("comments");
              }}
              className={` ${
                actived === "comments" &&
                "bg-gradient-to-r from-green-400 to-teal-500 text-white"
              } w-48 h-11 rounded-lg shadow-md flex items-center justify-center mt-3`}
              to="/admin/comments"
            >
              Comments
            </Link>
            <div
              //  onClick={() => {
              //   }}
              className="
              w-48 h-11 rounded-lg shadow-md flex items-center justify-center mt-3 mb-10 cursor-pointet"
            >
              Log out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashSidebar;
