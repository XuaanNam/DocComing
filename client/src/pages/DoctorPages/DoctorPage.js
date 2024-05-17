import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./DashBoard";
import DoctorProfile from "./DoctorProfile";
import CreateBlog from "./CreateBlog";
import ManageBlog from "./ManageBlog";
import DoctorSchedule from "./DoctorSchedule";
import DoctorAppointment from "./DoctorAppointment";
import DoctorSidebar from "../../components/DoctorSidebar";
const DoctorPage = () => {
  const { currentUser, user, isLogin, error, loading } = useSelector(
    (state) => state.user
  );
  const { doctorpage } = useParams();
  const [actived, setActived] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser) {
      if (currentUser.authentication !== 2) Navigate("/");
    } else Navigate("/");
  }, [currentUser]);
  console.log(doctorpage);

  return (
    <div>
      {currentUser?.authentication === 2 ? (
        <div className="flex">
          <DoctorSidebar param={doctorpage}></DoctorSidebar>
          <div className="overflow-auto w-full pt-[70px]">
            {doctorpage === "profile" && <DoctorProfile />}
            {doctorpage === "create-post" && <CreateBlog />}
            {doctorpage === "manage-post" && <ManageBlog />}
            {doctorpage === "dashboard" && <Dashboard />}
            {doctorpage === "schedule" && <DoctorSchedule />}
            {doctorpage === "appointment" && <DoctorAppointment />}
          </div>
        </div>
      ) : (
        <div className="h-screen bg-white"></div>
      )}
    </div>
  );
};

export default DoctorPage;
