import React, { useEffect, useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { LuCalendarDays, LuCalendarCheck } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Modal, ModalBody, TextInput } from "flowbite-react";
import { CircularProgressbar } from "react-circular-progressbar";
import { CiCamera } from "react-icons/ci";

const Profile = () => {
  const [actived, setActived] = useState(1);
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  //   const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = () => {
    console.log("uploading...");
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);
  return (
    <div className="pt-[70px] mx-20 text-gray-700 flex gap-10">
      <div className="my-7 w-64 h-64 bg-white rounded-lg shadow-lg">
        <div
          onClick={() => setActived(1)}
          className={` ${
            actived === 1 && "bg-[#14b8a6] text-white"
          } flex gap-4 account-link rounded-t-lg items-center hover:text-white px-4 py-2 cursor-pointer`}
        >
          <FaRegUserCircle className="h-7 w-7"></FaRegUserCircle>
          <a href="/patient/profile" className="block py-2 w-full">
            Hồ sơ
          </a>
        </div>
        <div className="flex gap-4 account-link items-center hover:text-white px-4 py-2 cursor-pointer">
          <LuCalendarDays className="h-7 w-7"></LuCalendarDays>
          <a href="/" className="block py-2 w-full">
            Lịch khám của tôi
          </a>
        </div>
        <div className="flex gap-4 account-link items-center hover:text-white px-4 py-2 cursor-pointer">
          <LuCalendarCheck className="h-7 w-7"></LuCalendarCheck>
          <a href="/" className="block py-2 w-full">
            Kết quả khám
          </a>
        </div>
        <div
          className="flex gap-4 account-link items-center hover:text-white px-4 py-2 cursor-pointer"
          // onClick={handleLogout}
        >
          <FiLogOut className="h-7 w-7"></FiLogOut>
          <a href="/" className="block py-2 w-full">
            Đăng xuất
          </a>
        </div>
      </div>
      <div className="my-7 w-full">
        <p className="mb-5 font-semibold text-2xl ">Hồ sơ</p>
        <div className="flex gap-10">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden
          />
          <div
            className="relative w-28 h-28 cursor-pointer shadow-md rounded-full"
            onClick={() => filePickerRef.current.click()}
          >
            <img
              src={imageFileUrl || currentUser.googlePhotoUrl}
              alt="userImage"
              className="rounded-full w-full h-full object-cover border-4 border-[lightgray]"
            />
            <div className="absolute w-8 h-8 rounded-full bg-slate-200 right-1 bottom-1 z-50 flex justify-center items-center">
              <CiCamera></CiCamera>
            </div>
            <div className="font-medium text-lg text-center">
              {currentUser.name}
            </div>
          </div>
          <div className="w-1/2 p-4 bg-white shadow-lg">
            <p className="font-medium text-sm">Họ và tên</p>
            <input
              className="w-full h-[48px] outline-none border-b mb-2"
              id="name"
              placeholder="--"
              defaultValue={currentUser.name}
              onChange={handleChange}
            ></input>

            <p className="font-medium text-sm">Email</p>
            <input
              className="w-full h-[48px] outline-none border-b mb-2"
              id="email"
              placeholder="--"
              defaultValue={currentUser.email || null}
              onChange={handleChange}
            ></input>

            <p className="font-medium text-sm">Ngày sinh</p>
            <input
              className="w-full h-[48px] outline-none border-b mb-2"
              id="date"
              placeholder="--"
              defaultValue={currentUser.date || null}
              onChange={handleChange}
            ></input>

            <p className="font-medium text-sm">Giới tính</p>
            <input
              className="w-full h-[48px] outline-none border-b mb-2"
              id="gender"
              placeholder="--"
              defaultValue={currentUser.gender || null}
              onChange={handleChange}
            ></input>

            <p className="font-medium text-sm">Số điện thoại</p>
            <input
              className="w-full h-[48px] outline-none border-b mb-2"
              id="gender"
              placeholder="--"
              defaultValue={currentUser.phone || null}
              onChange={handleChange}
            ></input>
          </div>
        </div>

        {/* {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )} */}
      </div>
    </div>
  );
};

export default Profile;
