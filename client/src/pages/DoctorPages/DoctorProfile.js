import React, { useEffect, useRef, useState, useContext } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { LuCalendarDays, LuCalendarCheck } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { CiCamera } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "flowbite-react";
import { fetchProfile, updateProfile } from "../../redux-toolkit/authSlice";
import { useNavigate } from "react-router-dom";
import { DatePicker, Space, Input, Select } from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const dateFormat = "DD/MM/YYYY";
  const { currentUser, user, checked, auth, error, loading, updated } =
    useSelector((state) => state.user);
  const [isSubmited, setIsSubmited] = useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({});
  const [FullName, setFullName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
  useEffect(() => {
    console.log("1");
    if (!currentUser) {
      Navigate("/");
    } else {
      if (currentUser.authentication == 2) {
        setData(user?.data);
        setFullName(
          user?.data?.FirstName + " " + user?.data?.LastName ||
            currentUser?.FullName
        );
      } else Navigate("/");
    }
    if (checked && isSubmited) {
      toast.success("Cập nhật thành công", {
        position: "top-right",
      });
    }
  }, [currentUser, user.data]);
  console.log(FullName);
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
  const handleSelectBox = (value) => {
    setFormData({ ...formData, Gender: value });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleUpdate = (e) => {
    setIsSubmited(true);
    const body = new FormData();
    body.append("FullName", FullName);
    body.append("Phone", data.Phone);
    body.append("Address", data.Address);
    body.append("BirthDate", data.BirthDate);
    body.append("Gender", data.Gender || "Nam");
    body.append("Avt", imageFile);

    dispatch(updateProfile(body)).then(() => {
      dispatch(fetchProfile());
    });
    setEdit(false);
    setFormData({});
  };
  const onChange = (date, dateString) => {
    setData({ ...data, BirthDate: dateString });
    setFormData({ ...formData, BirthDate: dateString });
  };
  return (
    <div className="">
      {currentUser?.authentication == 2 ? (
        <div className="mx-16 text-gray-700 flex gap-10 ">
          <div className="my-7 w-full rounded-xl bg-lime-50 shadow-xl py-5 px-8">
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

            <div className="grid grid-cols-5 gap-8 w-full">
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
                  src={data?.Avt || require("../../Images/pattientavt.png")}
                  alt="userImage"
                  className="rounded-full w-full h-full object-cover border-4 border-[lightgray]"
                />
                <div className="absolute w-8 h-8 rounded-full bg-gray-300 right-1 bottom-1  flex justify-center items-center">
                  <CiCamera></CiCamera>
                </div>
                <div className="font-medium text-lg text-center w-full">
                  {data?.FirstName + " " + data?.LastName || currentUser?.name}
                </div>
              </div>
              <form className="col-span-4 mb-16">
                <div className="p-5 bg-white shadow-md rounded-lg">
                  <div className="flex gap-5 mb-5">
                    <div className="w-1/2">
                      <p className="font-medium text-sm mb-2">Họ và tên</p>
                      <Input
                        className={` ${
                          edit && "focus:border-sky-500 "
                        } w-[90%] bg-white rounded-lg px-2 border-gray-300 h-[44px]`}
                        id="FullName"
                        placeholder="--"
                        value={FullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          handleChange(e);
                        }}
                        disabled={!edit}
                      ></Input>
                    </div>
                    <div className="w-1/2">
                      <p className="font-medium text-sm mb-2">Email</p>
                      <Input
                        className={` ${
                          edit && "focus:border-sky-500 "
                        } w-[90%] bg-white rounded-lg px-3 border-gray-300 h-[44px]`}
                        id="Email"
                        placeholder="--"
                        value={data?.Email || ""}
                        disabled={true}
                      ></Input>
                    </div>
                  </div>

                  <div className="flex gap-5 mb-5">
                    <div className="w-1/2">
                      <p className="font-medium text-sm mb-2">Số điện thoại</p>
                      <Input
                        className={` ${
                          edit && "focus:border-sky-500 "
                        } w-[90%] bg-white rounded-lg px-3 border-gray-300 h-[44px]`}
                        id="Phone"
                        placeholder="--"
                        value={
                          !data?.Phone || data?.Phone == "null"
                            ? ""
                            : data?.Phone
                        }
                        onChange={(e) => {
                          setData({ ...data, [e.target.id]: e.target.value });
                          handleChange(e);
                        }}
                        disabled={!edit}
                      ></Input>
                    </div>
                    <div className="w-1/2">
                      <p className="font-medium text-sm mb-2">Địa chỉ</p>
                      <Input
                        className={` ${
                          edit && "focus:border-sky-500 "
                        } w-[90%] bg-white rounded-lg px-3 border-gray-300 h-[44px]`}
                        id="Address"
                        placeholder="--"
                        value={
                          !data?.Address || data?.Address == "null"
                            ? ""
                            : data?.Address
                        }
                        onChange={(e) => {
                          setData({ ...data, [e.target.id]: e.target.value });
                          handleChange(e);
                        }}
                        disabled={!edit}
                      ></Input>
                    </div>
                  </div>

                  <div className="flex gap-5 mb-5">
                    <div className="w-1/2">
                      <p className="font-medium text-sm mb-2">Ngày sinh</p>
                      <DatePicker
                        id="BirthDate"
                        className="w-[90%] h-[44px] text-lg bg-white border-gray-300 text-gray-900 rounded-lg"
                        placeholder="--"
                        value={
                          data?.BirthDate
                            ? dayjs(data?.BirthDate, dateFormat)
                            : ""
                        }
                        format={dateFormat}
                        disabled={!edit}
                        onChange={onChange}
                      />
                    </div>
                    <div className="w-1/2">
                      <p className="font-medium text-sm mb-2">Giới tính</p>
                      <Select
                        className="w-[90%] h-[44px] text-lg bg-white border-gray-300 text-gray-900 "
                        id="Gender"
                        value={data?.Gender}
                        onChange={(value) => {
                          setData({ ...data, Gender: value });
                          handleSelectBox(value);
                        }}
                        disabled={!edit}
                      >
                        <option value="" disabled className="">
                          --
                        </option>

                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                      </Select>
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
      ) : (
        <div className="h-screen bg-white"></div>
      )}
    </div>
  );
};

export default DoctorProfile;
