import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { AiOutlineSchedule } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { fetchUsers} from "../../redux-toolkit/authSlice";
import { fetchPost} from "../../redux-toolkit/postSlice";
import BarChart from '../../components/BarChart';
import { fetchAdminAppointment } from "../../redux-toolkit/appointmentSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentUser,countUser} = useSelector((state) => state.user);
  const {data,countPost} = useSelector((state) => state.post);
  const allUsers = useSelector((state) => state.user.data);
  const { AppointmentData,countAppointment, error, loading } = useSelector((state) => state.appointment);
  const Navigate = useNavigate()
  console.log(AppointmentData, countAppointment)
  useEffect(() => {
    dispatch(fetchUsers()); 
    dispatch(fetchPost());
    dispatch(fetchAdminAppointment())
  }, [currentUser]);
  return (
    <div className="pt-[80px] bg-gray-50 h-screen flex flex-col justify-center m-3 md:mx-auto p-6 border-collapse">
      <div className="pt-3 flex flex-wrap gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-96 w-full rounded-md bg-white shadow-lg shadow-violet-200 cursor-pointer hover:bg-slate-50"
             onClick={()=>Navigate("/admin/users")}
        >
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Tất cả người dùng</h3>
              <p className="text-2xl">{allUsers?.length}</p>
            </div>
            <HiOutlineUserGroup className="bg-[#5C88C4]  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {countUser}
            </span>
            <div className="text-gray-500">Tháng này</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-96 w-full rounded-md bg-white shadow-lg shadow-violet-200 cursor-pointer hover:bg-slate-50"
             onClick={()=>Navigate("/admin/manage-post")}
        >
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Tất cả bài viết</h3>
              <p className="text-2xl">{data?.length}</p>
            </div>
            <HiDocumentText className="bg-[#E2BBE9]  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {countPost}
            </span>
            <div className="text-gray-500">Tháng này</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-96 w-full rounded-md bg-white shadow-lg shadow-violet-200 cursor-pointer hover:bg-slate-50"
             onClick={()=>Navigate("/admin/appointment")}
        >
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Tất cả lịch hẹn</h3>
              <p className="text-2xl">{AppointmentData?.length}</p>
            </div>
            <AiOutlineSchedule className="bg-[#40A578]  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {countPost}
            </span>
            <div className="text-gray-500">Tháng này</div>
          </div>
        </div>
      </div>
      <GridItem title="Bar Chart">
          <BarChart />
        </GridItem>
    </div>
  );
}

function GridItem({ title, children }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 mt-12 border shadow-lg shadow-violet-200 border-white bg-white rounded-xl h-[400px]">
      <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}