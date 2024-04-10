import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateBlog from "./CreateBlog";
import UserList from "./UserList";
import DashSidebar from "../../components/DashSidebar";
import ManageBlog from "./ManageBlog";
const AdminPage = () => {
  const Navigate = useNavigate();
  const { adminpage } = useParams();
  const [actived, setActived] = useState(false);
  const [blogActived, setBlogActived] = useState(false);
  return (
    <div className="flex">
      <DashSidebar param={adminpage}></DashSidebar>
      <div className="w-full flex flex-col h-screen bg-gradient-to-r">
        <div className="w-full items-center bg-white py-2 px-6 sm:flex border-b mb-2">
          <div className="w-1/2"></div>
          <div className="relative w-1/2 flex justify-end">
            <button
              onClick={() => setActived(!actived)}
              className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
            >
              <img
                alt=""
                src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400"
              />
            </button>
            {actived === true && (
              <div className="absolute w-32 bg-slate-50 rounded-lg shadow-lg py-2 mt-16 transition-all z-10">
                <a
                  href="/"
                  className="block w-full px-4 py-2 account-link hover:text-white"
                >
                  Account
                </a>
                <a
                  href="/"
                  className="block px-4 py-2 account-link hover:text-white"
                >
                  Support
                </a>
                <a
                  href="/"
                  className="block px-4 py-2 account-link hover:text-white"
                >
                  Sign Out
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="overflow-auto w-full" onClick={() => setActived(false)}>
          {adminpage === "create-post" && <CreateBlog />}
          {adminpage === "manage-post" && <ManageBlog />}

          {adminpage === "users" && <UserList />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
