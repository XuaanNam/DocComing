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
  const Navigate = useNavigate()
  const { currentUser,dashboardData } = useSelector((state) => state.user);
  const {data} = useSelector((state) => state.post);
  const allUsers = useSelector((state) => state.user.data);
  const { AppointmentData, error, loading } = useSelector((state) => state.appointment);
  const currentDate = new Date();

  useEffect(() => {
    const Users = {
      filter : "CreatedAt",
      orderby: "asc"
    }
    const Posts = {
      filter: "DatePost",
      orderby: "asc"
    }
    dispatch(fetchUsers(Users)); 
    dispatch(fetchPost(Posts));
    dispatch(fetchAdminAppointment())
  }, [currentUser]);
  return (
    <div className="pt-[80px] h-screen flex flex-col justify-center md:mx-auto p-6 border-collapse">
      {loading ?
      <div className="h-screen">
        <div className="spinner mt-12 mx-auto">
        </div>
      </div>
      :
      <div>
      <div className="pt-3 flex flex-wrap gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-96 w-full rounded-md bg-white shadow-lg  cursor-pointer hover:bg-slate-50"
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
              {dashboardData[11]?.TotalAcc}
            </span>
            <div className="text-gray-500">Tháng này</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-96 w-full rounded-md bg-white shadow-lg  cursor-pointer hover:bg-slate-50"
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
              {dashboardData[11]?.TotalPost}
            </span>
            <div className="text-gray-500">Tháng này</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-96 w-full rounded-md bg-white shadow-lg  cursor-pointer hover:bg-slate-50"
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
              {dashboardData[11]?.TotalApptn}
            </span>
            <div className="text-gray-500">Tháng này</div>
          </div>
        </div>
      </div>
      <GridItem title={`Thống kê năm ${currentDate.getMonth() + 1 < 12 ? parseInt(currentDate.getFullYear() - 1) + " - " + parseInt(currentDate.getFullYear()) : parseInt(currentDate.getFullYear())}`}>
        <BarChart />
      </GridItem>
      </div>
      }
    </div>
  );
}

function GridItem({ title, children }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 mt-6 border shadow-lg  border-white bg-white rounded-xl h-[450px] transition-all">
      <h3 className="text-2xl font-semibold text-black mb-4">{title}</h3>
      {children}
    </div>
  );
}