import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DoctorProfile from "./DoctorProfile";
import CreateBlog from "../AdminPages/CreateBlog";
import ManageBlog from "../AdminPages/ManageBlog";
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
      if (currentUser.authentication !== 2){
        Navigate("/");
      }
    } else{
      Navigate("/");
    }
  }, [currentUser]);

  return (
    <div>
      {currentUser?.authentication == 2 ? (
        <div className="lg:flex ">
          <DoctorSidebar param={doctorpage}></DoctorSidebar>
          <div className="w-full flex flex-col h-screen">
            <div className="overflow-auto w-full">
              {doctorpage === "profile" && <DoctorProfile />}
              {doctorpage === "create-post" && <CreateBlog />}
              {doctorpage === "manage-post" && <ManageBlog />}
              {doctorpage === "schedule" && <DoctorSchedule />}
              {doctorpage === "appointment" && <DoctorAppointment />}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen bg-white"></div>
      )}
    </div>
  );
};

export default DoctorPage;
