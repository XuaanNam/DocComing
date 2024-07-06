import React, {useState } from "react";
import { Link} from "react-router-dom";
import { logout } from "../redux-toolkit/authSlice";
import { persistor } from "../redux-toolkit/configureStore";
import { MdOutlineNoteAlt } from "react-icons/md";
import { useDispatch } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";


const SelectForm = ({ param }) => {
  const dispatch = useDispatch();  
  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      persistor.purge();
    }, 200);
  };
  console.log(param)
  return (
    <div className="flex flex-col lg:gap-1 my-7 lg:w-1/4 sm:max-lg:w-[30%] lg:h-60 bg-white shadow-lg shadow-violet-200 rounded-lg">
        <div
            className={` ${
            param === "profile" && "bg-[#14b8a6] text-white"
            } flex gap-4 account-link rounded-lg items-center hover:text-white px-4 py-2 cursor-pointer`}
        >
            <FaRegUserCircle className="h-7 w-7"></FaRegUserCircle>
            <Link to="/patient/profile" className="block py-2 w-full">
            Hồ sơ
            </Link>
        </div>
        <div 
            className={` ${
                param === "appointment" && "bg-[#14b8a6] text-white"
                } flex gap-4 account-link rounded-lg items-center hover:text-white px-4 py-2 cursor-pointer`}
        >
            <LuCalendarDays className="h-7 w-7"></LuCalendarDays>
            <Link to="/patient/appointment" className="block py-2 w-full">
                Lịch khám của tôi
            </Link>
        </div>
        <div
            className={` ${
                param === "health-record" && "bg-[#14b8a6] text-white"
            } flex gap-4 account-link rounded-lg items-center hover:text-white px-4 py-2 cursor-pointer`}
            >
            <MdOutlineNoteAlt className="h-7 w-7"></MdOutlineNoteAlt>
            <Link to="/patient/health-record" className="block py-2 w-full">
                Bệnh án
            </Link>
        </div>
        <div
            className="max-lg:hidden flex gap-4 account-link rounded-lg items-center hover:text-white px-4 py-2 cursor-pointer"
            onClick={handleLogout}
        >
            <FiLogOut className="h-7 w-7"></FiLogOut>
            <div className="block py-2 w-full">
            Đăng xuất
            </div>
        </div>
    </div>
  );
};

export default SelectForm;
