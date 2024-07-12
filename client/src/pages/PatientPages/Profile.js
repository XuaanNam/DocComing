import React, { useEffect, useRef, useState, useContext } from "react";
import { CiCamera } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "flowbite-react";
import { fetchProfile, updateProfile,logout, changePassword, getAllNotification } from "../../redux-toolkit/authSlice";
import { useNavigate,Link } from "react-router-dom";
import { DatePicker, Space, Input, Select } from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const Profile = () => {
  const dateFormat = "DD/MM/YYYY";
  const date = new Date();
  const maxDate =
    (date.getDate() < 10 ? "0" + (date.getDate() - 1) : (date.getDate() - 1))
    + "/" +
    (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) 
    + "/" +
    date.getFullYear();
  const { currentUser, user, checked, auth, error, loading, updated } =
    useSelector((state) => state.user);
  const [isSubmited, setIsSubmited] = useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({});
  const [FullName, setFullName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  console.log(currentUser, data)
  useEffect(() => {
    if (!currentUser) {
      Navigate("/");
    } else {
      if (currentUser.authentication == 1) {
        setData(user?.data);
        setFullName(
          user?.data?.FullName || currentUser?.FullName
        );
      } else Navigate("/");
    }
    if (checked && isSubmited) {
      toast.success("Cập nhật thành công", {
        position: "top-right",
      });
    }
  }, [user.data, currentUser]);
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
  const handleChangePassword = () => {
    const data = {
      OldPassWord: oldPassword,
      NewPassWord: newPassword
    }
    if(newPassword.length < 6)
      setErrorMessage("Mật khẩu phải chứa ít nhất 6 kí tự!")
    else
      dispatch(changePassword(data)).then((result) => {
        if(result.payload.message == "Đổi mật khẩu thành công!"){
          dispatch(getAllNotification())
          handleClose()
        }
        else
          setErrorMessage(result.payload.message);
      })
  }
  const handleClose = () => {
    setOldPassword("")
    setNewPassword("")
    setErrorMessage("");
    setShowModal(false)
  }
  return (
    <div className="my-7 lg:w-full max-lg:full rounded-xl bg-white shadow-lg shadow-violet-200 py-5 px-8">
      <div className="mb-5 grid grid-cols-5 items-center">
        <p className="font-semibold text-2xl max-lg:col-start-1 max-lg:col-span-2 col-span-1">Hồ sơ</p>
        {edit === false && (
          <div
            onClick={handleEdit}
            className="flex gap-1 justify-end items-center max-lg:col-start-4 max-lg:col-span-2 col-start-5 text-sky-500 cursor-pointer"
          >
            <p className="font-medium">Chỉnh sửa</p>
            <MdEdit />
          </div>
        )}
      </div>

      <div className="lg:grid lg:grid-cols-5 justify-center lg:gap-8 w-full">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          disabled={!edit}
          hidden
        />
        <div className="lg:col-span-1 flex flex-col items-center gap-3">
          <div
            className="max-lg:w-full relative lg:w-32 lg:h-32 cursor-pointer shadow-md rounded-full"
            onClick={() => filePickerRef.current.click()}
          >
            <img
              src={data?.Avt || require("../../Images/pattientavt.png")}
              alt="userImage"
              className=" rounded-full w-full h-full object-cover border-4 border-[lightgray]"
            />
            <div className="absolute w-8 h-8 rounded-full bg-gray-300 right-1 bottom-1  flex justify-center items-center">
              <CiCamera></CiCamera>
            </div>
          </div>
          <div className=" max-lg:text-left max-lg:text-base max-lg:flex max-lg:items-center max-lg:justify-center font-medium lg:text-lg lg:text-center w-full">
            {data?.FullName || currentUser?.name}
          </div>
          <Button className="h-9 w-36" size="sm" outline gradientDuoTone="purpleToPink" onClick={()=>setShowModal(true)}>Đổi mật khẩu</Button>
        </div>
        <form className="lg:col-span-4 mb-16">
          <div className="p-5 bg-white shadow-md rounded-lg">
            <div className="lg:flex lg:gap-5 mb-5">
              <div className="lg:w-1/2">
                <p className="font-medium text-sm mb-2">Họ và tên</p>
                <Input
                  className={` ${
                    edit && "focus:border-sky-500 "
                  } lg:w-[90%] bg-white rounded-lg px-3 border-gray-300 max-lg:mb-4 h-[44px]`}
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
              <div className="lg:w-1/2">
                <p className="font-medium text-sm mb-2">Email</p>
                <Input
                  className={` ${
                    edit && "focus:border-sky-500 "
                  } lg:w-[90%] bg-white rounded-lg px-3 border-gray-300  h-[44px]`}
                  id="Email"
                  placeholder="--"
                  value={
                    !data?.Email || data?.Email == "null"
                      ? ""
                      : data?.Email
                  }
                  disabled={true}
                ></Input>
              </div>
            </div>

            <div className="lg:flex lg:gap-5 mb-5">
              <div className="lg:w-1/2">
                <p className="font-medium text-sm mb-2">Số điện thoại</p>
                <Input
                  className={` ${
                    edit && "focus:border-sky-500 "
                  } lg:w-[90%] bg-white rounded-lg px-3 max-lg:mb-4 border-gray-300 h-[44px]`}
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
              <div className="lg:w-1/2">
                <p className="font-medium text-sm mb-2">Địa chỉ</p>
                <Input
                  className={` ${
                    edit && "focus:border-sky-500 "
                  } lg:w-[90%] bg-white rounded-lg px-3  border-gray-300 h-[44px]`}
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

            <div className="lg:flex lg:gap-5 mb-5">
              <div className="lg:w-1/2">
                <p className="font-medium text-sm mb-2">Ngày sinh</p>
                <DatePicker
                  id="BirthDate"
                  className="max-lg:w-full lg:w-[90%] h-[44px] text-lg max-lg:mb-4 bg-white border-gray-300 text-gray-900 rounded-lg"
                  placeholder="--"
                  value={
                    data?.BirthDate
                      ? dayjs(data?.BirthDate, dateFormat)
                      : ""
                  }
                  format={dateFormat}
                  disabled={!edit}
                  onChange={onChange}
                  maxDate={dayjs(maxDate, dateFormat)}
                />
              </div>
              <div className="lg:w-1/2">
                <p className="font-medium text-sm mb-2">Giới tính</p>
                <Select
                  className="max-lg:w-full lg:w-[90%] h-[44px] text-lg bg-white border-gray-300 text-gray-900 "
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
            <div className="flex max-lg:justify-end gap-4 mt-5">
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
      <Modal
        className="transition-all duration-500"
        show={showModal}
        onClose={handleClose}
        popup
        size="xl"
      >
      <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col gap-3 items-center justify-center">
            <h3 className="mb-5 text-lg font-medium dark:text-gray-400">
              Đổi mật khẩu
            </h3>
            <Input type="password" className="h-11 w-[90%] px-4 rounded-md border-gray-300" placeholder="Mật khẩu cũ" value={oldPassword} onChange={(e)=> setOldPassword(e.target.value)}></Input>
            <Input type="password" className="h-11 w-[90%] px-4 rounded-md border-gray-300" placeholder="Mật khẩu mới" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)}></Input>
            <p className="text-rose-500">{errorMessage}</p>
            <Button
              disabled={oldPassword === "" || newPassword === ""}
              className="w-[90%] h-11"
              gradientDuoTone="purpleToPink"
              onClick={handleChangePassword}
            >
              Xác nhận
            </Button>
            <hr className="w-[90%] border-[1px] border-lime-100 rounded-lg"></hr>
            <Button
            className="mt-3 w-[90%] h-11"
            outline gradientDuoTone="tealToLime"
            onClick={handleClose}
            >
              Để sau
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default Profile;
