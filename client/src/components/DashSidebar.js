import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Sidebar } from "flowbite-react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
  HiDocumentAdd,
  HiDocumentReport,
} from "react-icons/hi";

const DashSidebar = ({ param }) => {
  const [blogActived, setBlogActived] = useState(false);

  return (
    <div>
      <Sidebar className="w-full md:w-56 font-medium pt-[70px]">
        <div className="px-5 py-3">
          <a
            href="/admin/dashboard"
            className="text-2xl font-semibold uppercase text-[#0f766e] hover:text-gray-300"
          >
            Doctor Coming
          </a>
        </div>
        <Sidebar.Items className="">
          <Sidebar.ItemGroup className="flex flex-col gap-1 font-medium">
            {/* {currentUser && currentUser.isAdmin && ( */}
            <Link to="/dashboard/dash">
              <Sidebar.Item
                active={param === "dash"}
                icon={HiChartPie}
                as="div"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
            {/* )} */}
            <Link to="/dashboard/profile">
              <Sidebar.Item
                active={param === "profile"}
                icon={HiUser}
                //   label={currentUser.isAdmin ? 'Admin' : 'User'}
                labelColor="dark"
                as="div"
              >
                Profile
              </Sidebar.Item>
            </Link>
            {/* {currentUser.isAdmin && ( */}
            <div
              className="cursor-pointer"
              onClick={() => setBlogActived(!blogActived)}
            >
              <Sidebar.Item active="" icon={HiDocumentText} as="div">
                Bài viết
              </Sidebar.Item>
            </div>
            {blogActived && (
              <div className="flex flex-col gap-1 pl-1">
                <Link to="/dashboard/create-post">
                  <Sidebar.Item
                    className="w-[90%]"
                    active={param === "create-post"}
                    icon={HiDocumentAdd}
                    as="div"
                  >
                    Tạo bài viết
                  </Sidebar.Item>
                </Link>
                <Link to="/dashboard/manage-post">
                  <Sidebar.Item
                    className="w-[90%]"
                    active={param === "manage-post"}
                    icon={HiDocumentReport}
                    as="div"
                  >
                    Quản lý bài viết
                  </Sidebar.Item>
                </Link>
              </div>
            )}
            {/* )} */}
            {/* {currentUser.isAdmin && ( */}
            <>
              <Link to="/dashboard/users">
                <Sidebar.Item
                  active={param === "users"}
                  icon={HiOutlineUserGroup}
                  as="div"
                >
                  Users
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard/create-blog">
                <Sidebar.Item
                  active={param === "comments"}
                  icon={HiAnnotation}
                  as="div"
                >
                  Comments
                </Sidebar.Item>
              </Link>
            </>
            {/* )} */}
            <Sidebar.Item
              icon={HiArrowSmRight}
              className="cursor-pointer"
              //   onClick={handleSignout}
            >
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default DashSidebar;
