import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashSidebar from "../../components/DashSidebar";
import CreateBlog from "./CreateBlog";
import UserList from "./UserList";
import ManageBlog from "./ManageBlog";
import EditBlog from "./EditBlog";
import Dashboard from "./Dashboard";
import AdminProfile from "./AdminProfile";
import { useDispatch, useSelector } from "react-redux";
import AdminAppointment from "./AdminAppointment";

const AdminPage = () => {
  const { currentUser, error, loading } = useSelector(
    (state) => state.user
  );
  const { adminpage } = useParams();
  const [actived, setActived] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser) {
      if (currentUser.authentication !== 0) Navigate("/");
    } else Navigate("/");
  }, [currentUser]);

  return (
    <div>
      {currentUser?.authentication === 0 ? (
        <div className="lg:flex">
          <DashSidebar param={adminpage}></DashSidebar>
          <div className="w-full flex flex-col">
            <div
              className="w-full min-h-screen"
              onClick={() => setActived(false)}
            >
              {adminpage === "profile" && <AdminProfile />}
              {adminpage === "appointment" && <AdminAppointment />}
              {adminpage === "create-post" && <CreateBlog />}
              {adminpage === "manage-post" && <ManageBlog />}
              {adminpage === "dashboard" && <Dashboard />}
              {adminpage === "users" && <UserList />}

            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen bg-white"></div>
      )}
    </div>
  );
};

export default AdminPage;
