import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SelectForm from "../../components/SelectForm";
import Appointment from "./Appointment";
import Profile from "./Profile";
import HealthRecord from "./HealthRecord";
const PatientPage = () => {
  const { currentUser, user, isLogin, error, loading } = useSelector(
    (state) => state.user
  );
  const { patientpage } = useParams();
  const [actived, setActived] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser) {
      if (currentUser.authentication != 1) Navigate("/");
    } else Navigate("/");
  }, [currentUser]);

  return (
    <div className="bg-white pt-[90px] max-lg:pt-[80px] min-h-screen">
      {currentUser?.authentication == 1 ? (
        <div className="lg:mx-16 max-lg:px-4 text-gray-700 lg:flex lg:gap-10">
          <SelectForm param={patientpage}></SelectForm>
          <div className="w-full">
              {patientpage === "appointment" && <Appointment />}
              {patientpage === "profile" && <Profile />}
              {patientpage === "health-record" && <HealthRecord />}
          </div>
        </div>
      ) : (
        <div className="h-screen bg-white"></div>
      )}
    </div>
  );
};

export default PatientPage;
