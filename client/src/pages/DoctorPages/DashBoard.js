import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { fetchProfile } from "../../redux-toolkit/authSlice";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentUser, user, auth, error, loading, updated } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (currentUser) {
      dispatch(fetchProfile());
    }
  }, [currentUser]);
  return <div>aaa</div>;
};

export default Dashboard;
