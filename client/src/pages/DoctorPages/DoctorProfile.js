import React, { useEffect, useRef, useState, useContext } from "react";
import { CiCamera } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "flowbite-react";
import { fetchProfile, updateProfile } from "../../redux-toolkit/authSlice";
import { useNavigate } from "react-router-dom";
import { DatePicker, Space, Input, Select } from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import Editor from "../AdminPages/Editor";

const DoctorProfile = () => {
  const dateFormat = "DD/MM/YYYY";
  const date = new Date();
  const maxDate =
    (date.getDate() < 10 ? "0" + (date.getDate()) : (date.getDate()))
    + "/" +
    (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) 
    + "/" + (date.getFullYear() - 23);
    console.log(maxDate)
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
    if (!currentUser) {
      Navigate("/");
    } else {
      if (currentUser.authentication == 2) {
        setData(user?.data);
        setFullName(
          user?.data?.FullName ||
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
    body.append("Degree", data.Degree);
    body.append("Introduce", data.Introduce);
    body.append("idMajor", data.idMajor);
    body.append("Experience", data.Experience);
    body.append("Training", data.Training);
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
  const majors = [
    {
      id: 1,
      name: "Bác sĩ gia đình",
    },
    {
      id: 2,
      name: "Bệnh truyền nhiễm",
    },
    {
      id: 3,
      name: "Chẩn đoán hình ảnh",
    },
    {
      id: 4,
      name: "Da liễu",
    },
    {
      id: 5,
      name: "Điều dưỡng",
    },
    {
      id: 6,
      name: "Dinh dưỡng",
    },
    {
      id: 7,
      name: "Hồi sức cấp cứu",
    },
    {
      id: 8,
      name: "Huyết học",
    },
    {
      id: 9,
      name: "Lão khoa",
    },
    {
      id: 10,
      name: "Ngoại khoa",
    },
    {
      id: 11,
      name: "Nha khoa",
    },
    {
      id: 12,
      name: "Nhãn khoa",
    },
    {
      id: 13,
      name: "Nhi khoa",
    },
    {
      id: 14,
      name: "Nội hô hấp",
    },
    {
      id: 15,
      name: "Sản/Phụ khoa",
    },
    {
      id: 16,
      name: "Tai mũi họng",
    },
    {
      id: 17,
      name: "Tâm thần học",
    },
    {
      id: 18,
      name: "Tim mạch",
    },
    {
      id: 19,
      name: "Ung bướu",
    },
    {
      id: 20,
      name: "Đa khoa",
    },
  ]
  return (
    <div className="lg:pt-[70px] lg:min-h-screen">
      {currentUser?.authentication == 2 ? (
        <div className="lg:mx-16 max-lg:px-4 text-gray-700 lg:flex lg:gap-10">
          <div className="my-7 w-full rounded-xl bg-white shadow-lg shadow-violet-200 py-5 max-lg:px-6 lg:px-8">
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

            <div className="lg:grid lg:grid-cols-5 lg:gap-8 w-full">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={filePickerRef}
                disabled={!edit}
                hidden
              />
              <div
                className="max-lg:grid max-lg:grid-cols-2 max-lg:gap-1 max-lg:w-full relative lg:w-32 lg:h-32 cursor-pointer shadow-md rounded-full lg:col-span-1"
                onClick={() => filePickerRef.current.click()}
              >
                <img
                  src={data?.Avt || require("../../Images/pattientavt.png")}
                  alt="userImage"
                  className="max-lg:col-start-1 max-lg:col-span-1 rounded-full w-full h-full object-cover border-4 border-[lightgray]"
                />
                <div className="absolute w-8 h-8 rounded-full bg-gray-300 right-1 bottom-1  flex justify-center items-center">
                  <CiCamera></CiCamera>
                </div>
                <div className="max-lg:col-start-2 max-lg:col-span-1 max-lg:text-left max-lg:text-base max-lg:flex max-lg:items-center max-lg:justify-center font-medium lg:text-lg lg:text-center w-full">
                  {data?.FullName || currentUser?.name}
                </div>
              </div>
              <form className="lg:col-span-4 mb-16 ">
                <div className="p-5 overflow-auto bg-white shadow-md rounded-lg">
                  <div className="lg:flex lg:gap-10 mb-5">
                    <div className="lg:w-1/2">
                      <p className="font-medium text-sm mb-2">Họ và tên</p>
                      <Input
                        className={` ${
                          edit && "focus:border-sky-500 "
                        } lg:w-full bg-white rounded-lg px-3 border-gray-300 max-lg:mb-4 h-[44px]`}
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
                        } lg:w-full bg-white rounded-lg px-3 border-gray-300 h-[44px]`}
                        id="Email"
                        placeholder="--"
                        value={data?.Email || ""}
                        disabled={true}
                      ></Input>
                    </div>
                  </div>

                  <div className="lg:flex lg:gap-10 mb-5">
                    <div className="lg:w-1/2">
                      <p className="font-medium text-sm mb-2">Số điện thoại</p>
                      <Input
                        className={` ${
                          edit && "focus:border-sky-500 "
                        } lg:w-full bg-white rounded-lg max-lg:mb-4 px-3 border-gray-300 h-[44px]`}
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
                        } lg:w-full bg-white rounded-lg px-3 border-gray-300 h-[44px]`}
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

                  <div className="lg:flex lg:gap-10 mb-5">
                    <div className="lg:w-1/2">
                      <p className="font-medium text-sm mb-2">Ngày sinh</p>
                      <DatePicker
                        id="BirthDate"
                        className="max-lg:w-full lg:w-full h-[44px] text-lg max-lg:mb-4 bg-white border-gray-300 text-gray-900 rounded-lg"
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
                        className="max-lg:w-full lg:w-full h-[44px] text-lg bg-white border-gray-300 text-gray-900 "
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

                  <div className="lg:flex lg:gap-10 mb-5">
                    <div className="lg:w-1/2">
                      <p className="font-medium text-sm mb-2">Chuyên khoa</p>
                      <Select
                        className="max-lg:w-full lg:w-full h-[44px] text-lg rounded-lg bg-white border-gray-300 text-gray-900 "
                        id="idMajor"
                        value={
                          !data?.idMajor || data?.idMajor == "null"
                            ? ""
                            : data?.idMajor
                        }
                        onChange={(value) => {
                          setData({ ...data, idMajor: value });
                          setFormData({ ...formData, idMajor: value });
                        }}
                        disabled={!edit}
                      >
                        <option value="" disabled className="">
                          --
                        </option>
                        {majors?.map((major) =>
                          <option value={major.id}>{major.name}</option>
                        )}
                      </Select>
                    </div>
                    <div className="lg:w-1/2">
                      <p className="font-medium text-sm mb-2">Bằng cấp</p>
                      <Select
                        className="max-lg:w-full lg:w-full h-[44px] text-lg bg-white rounded-lg border-gray-300 text-gray-900 "
                        id="Degree"
                        value={
                          !data?.Degree || data?.Degree == "null"
                            ? ""
                            : data?.Degree
                        }
                        onChange={(value) => {
                          setData({ ...data, Degree: value });
                          setFormData({ ...formData, Degree: value });
                        }}
                        disabled={!edit}
                      >
                        <option value="" disabled className="">
                          --
                        </option>

                        <option value="Thạc sĩ y khoa">Thạc sĩ y khoa</option>
                        <option value="Tiến sĩ y khoa">Tiến sĩ y khoa</option>
                      </Select>
                    </div>
                  </div>

                  <div className="lg:flex lg:gap-10 mb-5">
                    <div className="lg:w-1/2">
                      <p className="font-medium text-sm mb-2">Năm kinh nghiệm</p>
                      <Input type="number" className={` ${
                          edit && "focus:border-sky-500 "
                        } lg:w-full bg-white rounded-lg px-3 border-gray-300 max-lg:mb-4 h-[44px]`}
                        id="Experience"
                        placeholder="--"
                        value={
                          !data?.Experience || data?.Experience == "null"
                            ? ""
                            : data?.Experience
                        }
                        onChange={(e) => {
                          setData({ ...data, [e.target.id]: e.target.value });
                          handleChange(e);
                        }}
                        disabled={!edit}></Input>
                    </div>
                    <div className="lg:w-1/2">
                      <p className="font-medium text-sm mb-2">Nơi đào tạo</p>
                      <Input type="text" className={` ${
                          edit && "focus:border-sky-500 "
                        } lg:w-full bg-white rounded-lg px-3 border-gray-300 max-lg:mb-4 h-[44px]`}
                        id="Training"
                        placeholder="--"
                        value={
                          !data?.Training || data?.Training == "null"
                            ? ""
                            : data?.Training
                        }
                        onChange={(e) => {
                          setData({ ...data, [e.target.id]: e.target.value });
                          handleChange(e);
                        }}
                        disabled={!edit}></Input>
                    </div>
                    
                  </div>
                  <p className="font-medium text-sm mb-3">Giới thiệu</p>
                  <div className={`${edit ? "border-teal-400" : "border-gray-400"} w-full border-2 border-dotted  p-3 flex items-center justify-center`}>
                    <Editor
                      className="w-full text-lg bg-white rounded-lg border-gray-300 text-gray-900"
                      value={data?.Introduce}
                      onChange={(value) => {
                        setData({ ...data, Introduce: value });
                        setFormData({ ...formData, Introduce: value });
                      }}
                      readOnly={!edit}
                    />
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
