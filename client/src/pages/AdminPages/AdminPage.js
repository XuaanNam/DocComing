import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ManagedBlog from "./ManagedBlog";
import UserList from "./UserList";
const AdminPage = () => {
  const Navigate = useNavigate();
  const { adminpage } = useParams();
  const [actived, setActived] = useState(false);
  return (
    <div className="flex">
      <aside className="relative bg-white h-screen w-64 sm:block drop-shadow-lg">
        <div className="p-6">
          <a
            href="/admin/dashboard"
            className="text-3xl font-semibold uppercase text-[#0f766e] hover:text-gray-300"
          >
            Doctor Coming
          </a>
          {/* <button
            className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center"
            onClick={() => Navigate("/admin/blog")}
          >
            <i className="fas fa-plus mr-3"></i>
            Thêm bài viết
          </button> */}
        </div>
        <nav className="text-base font-semibold justify-center">
          <div
            onClick={() => Navigate("/admin/dashboard")}
            className={`${
              adminpage === "dashboard"
                ? "bg-emerald-400 text-white"
                : "text-emerald-500 bg-white"
            } w-[80%] h-[40px] mx-auto flex items-center justify-center border rounded-xl cursor-pointer drop-shadow-md mb-3 hover:opacity-80`}
          >
            Dashboard
          </div>
          <div
            onClick={() => Navigate("/admin/blog")}
            className={`${
              adminpage === "blog"
                ? "bg-emerald-500 text-white"
                : "text-emerald-500 bg-white"
            } w-[80%] h-[40px] mx-auto flex items-center justify-center border rounded-xl cursor-pointer drop-shadow-md mb-3 hover:opacity-80`}
          >
            Blog
          </div>
          <div
            onClick={() => Navigate("/admin/user")}
            className={`${
              adminpage === "user"
                ? "bg-emerald-500 text-white"
                : "text-emerald-500 bg-white"
            } w-[80%] h-[40px] mx-auto flex items-center justify-center border rounded-xl cursor-pointer drop-shadow-md mb-3 hover:opacity-80`}
          >
            User
          </div>
          <div
            onClick={() => Navigate("/admin/form")}
            className={`${
              adminpage === "form"
                ? "bg-emerald-500 text-white"
                : "text-emerald-500 bg-white"
            } w-[80%] h-[40px] mx-auto flex items-center justify-center border rounded-xl cursor-pointer drop-shadow-md mb-3 hover:opacity-80`}
          >
            Form
          </div>
          {/* <a
            href="tabs.html"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
          >
            <i className="fas fa-tablet-alt mr-3"></i>
            Tabbed Content
          </a>
          <a
            href="calendar.html"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
          >
            <i className="fas fa-calendar mr-3"></i>
            Calendar
          </a> */}
        </nav>
      </aside>

      <div className="w-full flex flex-col h-screen bg-gradient-to-r from-white to-emerald-50">
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
        <div className="w-full overflow-auto" onClick={() => setActived(false)}>
          {adminpage === "blog" && <ManagedBlog />}
          {adminpage === "user" && <UserList />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
