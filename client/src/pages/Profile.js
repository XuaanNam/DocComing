import React, { useEffect, useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { LuCalendarDays, LuCalendarCheck } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { CiCamera } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "flowbite-react";
import Datepicker from "flowbite-datepicker/Datepicker";
import { fetchProfile, updateProfile } from "../redux-toolkit/authSlice";
const Profile = () => {
  const { currentUser, user, error, loading, updated } = useSelector(
    (state) => state.user
  );
  const [actived, setActived] = useState(1);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({});
  const [FullName, setFullName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    setData(user?.data);
    setFullName(user?.data?.FirstName + user?.data?.LastName);
    const datepickerEl = document?.getElementById("BirthDate");
    new Datepicker(datepickerEl, {
      // autohide: true,
      // format: "dd/mm/yyyy",
    });
  }, [user.data]);

  console.log(data);
  const handleEdit = () => {
    setEdit(true);
  };
  const handleCancel = () => {
    setEdit(false);
    setFormData({});
    setData(user?.data);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setData({ ...data, Avt: URL.createObjectURL(file) });
      setFormData({ ...formData, avt: file });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleUpdate = (e) => {
    const body = new FormData();
    body.append("FullName", FullName);
    body.append("Phone", data.Phone);
    body.append("Address", data.Address);
    body.append("BirthDate", data.BirthDate);
    body.append("Gender", data.Gender);
    body.append("Avt", imageFile);

    console.log(body);
    dispatch(updateProfile(body)).then(() => {
      dispatch(fetchProfile());
    });
    setEdit(false);
    setFormData({});
  };
  // console.log(update);

  return (
    <div className="pt-[70px] mx-20 text-gray-700 flex gap-10">
      <div className="my-7 w-1/5 h-44 bg-white rounded-lg shadow-lg">
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
        {/* <div className="flex gap-4 account-link items-center hover:text-white px-4 py-2 cursor-pointer">
          <LuCalendarCheck className="h-7 w-7"></LuCalendarCheck>
          <a href="/" className="block py-2 w-full">
            Kết quả khám
          </a>
        </div> */}
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
      <div className="my-7 w-4/5">
        <div className="mb-5 grid grid-cols-5 items-center">
          <p className="font-semibold text-2xl col-span-1">Hồ sơ</p>
          {edit === false && (
            <div
              onClick={handleEdit}
              className="flex gap-1 justify-end items-center col-start-5 text-sky-500 cursor-pointer"
            >
              <p className="font-medium">Chỉnh sửa</p>
              <MdEdit />
            </div>
          )}
        </div>

        <div className="grid grid-cols-5 gap-10 w-full">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            disabled={!edit}
            hidden
          />
          <div
            className="relative w-32 h-32 cursor-pointer shadow-md rounded-full col-span-1"
            onClick={() => filePickerRef.current.click()}
          >
            <img
              src={data?.Avt || currentUser?.googlePhotoUrl}
              alt="userImage"
              className="rounded-full w-full h-full object-cover border-4 border-[lightgray]"
            />
            <div className="absolute w-8 h-8 rounded-full bg-slate-300 right-1 bottom-1  flex justify-center items-center">
              <CiCamera></CiCamera>
            </div>
            <div className="font-medium text-lg text-center w-full">
              {data?.FirstName + data?.LastName || currentUser?.name}
            </div>
          </div>
          <form className="col-span-4 h-screen">
            <div className="p-5 bg-white shadow-lg rounded-lg">
              <div className="flex gap-5 mb-5">
                <div className="w-1/2">
                  <p className="font-medium text-sm">Họ và tên</p>
                  <input
                    className={` ${
                      edit && "focus:border-sky-500 focus:border-b-2"
                    } w-[90%] bg-white outline-none px-2 h-[48px] border-b`}
                    id="name"
                    placeholder="--"
                    value={FullName ? FullName : currentUser?.name}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      handleChange(e);
                    }}
                    disabled={!edit}
                  ></input>
                </div>
                <div className="w-1/2">
                  <p className="font-medium text-sm">Email</p>
                  <input
                    className={` ${
                      edit && "focus:border-sky-500 focus:border-b-2"
                    } w-[90%] bg-white outline-none px-2 h-[48px] border-b`}
                    id="email"
                    placeholder="--"
                    value={data?.Email || ""}
                    disabled={true}
                  ></input>
                </div>
              </div>

              <div className="flex gap-5 mb-5">
                <div className="w-1/2">
                  <p className="font-medium text-sm">Số điện thoại</p>
                  <input
                    className={` ${
                      edit && "focus:border-sky-500 focus:border-b-2"
                    } w-[90%] bg-white outline-none px-2 h-[48px] border-b`}
                    id="Phone"
                    placeholder="--"
                    value={data?.Phone || ""}
                    onChange={(e) => {
                      setData({ ...data, [e.target.id]: e.target.value });
                      handleChange(e);
                    }}
                    disabled={!edit}
                  ></input>
                </div>
                <div className="w-1/2">
                  <p className="font-medium text-sm">Địa chỉ</p>
                  <input
                    className={` ${
                      edit && "focus:border-sky-500 focus:border-b-2"
                    } w-[90%] bg-white outline-none px-2 h-[48px] border-b`}
                    id="Address"
                    placeholder="--"
                    value={data?.Address || ""}
                    // value={Address}
                    onChange={(e) => {
                      setData({ ...data, [e.target.id]: e.target.value });
                      handleChange(e);
                    }}
                    disabled={!edit}
                  ></input>
                </div>
              </div>

              <div className="flex gap-5 mb-5">
                <div className="w-1/2">
                  <p className="font-medium text-sm">Ngày sinh</p>
                  <div className="relative max-w-sm">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                    <input
                      id="BirthDate"
                      datepicker
                      datepicker-autohide
                      datepicker-title="Ngày sinh"
                      value={data?.BirthDate}
                      type="text"
                      className="w-[90%] h-[40px] mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="--"
                      onSelect={(e) => {
                        setData({ ...data, [e.target.id]: e.target.value });
                        handleChange(e);
                      }}
                      title="Ngày sinh"
                      disabled={!edit}
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <p className="font-medium text-sm">Giới tính</p>
                  <div className="max-w-md w-[90%] h-[40px] mt-2">
                    <select
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      id="Gender"
                      value={data?.Gender}
                      onChange={(e) => {
                        setData({ ...data, [e.target.id]: e.target.value });
                        handleChange(e);
                      }}
                      disabled={!edit}
                    >
                      <option value="" disabled className=""></option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {edit && (
              <div className="flex gap-4 mt-5">
                <Button
                  outline
                  gradientDuoTone="cyanToBlue"
                  onClick={handleCancel}
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleUpdate}
                  gradientDuoTone="greenToBlue"
                  disabled={!(Object.keys(formData).length > 0)}
                >
                  Lưu thay đổi
                </Button>
              </div>
            )}
          </form>
        </div>

        {/* {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )} */}
      </div>
    </div>
  );
};

export default Profile;
