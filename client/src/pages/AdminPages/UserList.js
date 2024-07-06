import { Modal, Table, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaArrowLeftLong } from "react-icons/fa6";
import { fetchUsers, deleteAccount, searchUser, usersFilter } from "../../redux-toolkit/authSlice";
import { FiSearch } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TbFilterSearch  } from "react-icons/tb";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const UserList = () => {
  const dateFormat = "DD/MM/YYYY";
  const allUsers = useSelector((state) => state.user.data);
  const {allSearchUsers, filter} = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [numberElement, setNumberElement] = useState(6)
  const [keywordUser, setKeywordUser] = useState("")
  const [isSearched, setIsSearched] = useState("")
  const [showFilterModal,setShowFilterModal] = useState(false)
  const [roleUser, setRoleUser] = useState("all")
  const [arrange, setArrange] = useState("desc")
  const [date, setDate] = useState("")
  const [profile, setProfile] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    const data = {
      filter : "CreatedAt",
      orderby: "desc"
    }
    dispatch(fetchUsers(data));
  }, [dispatch]);
  useEffect(() => {
    if(allUsers?.length > 0){
      setUsers(allUsers)
    }
  }, [allUsers]);
  let user
  if(isSearched == "search"){
    user = allSearchUsers
  }
  else if(isSearched == "filter"){
    user = filter
  }
  else{
    user = users
  }
  const slice = user.slice(0,numberElement);
  const handleSearchUser = () => {
    dispatch(searchUser({keywords: keywordUser}))
    setIsSearched("search")
  }
  const handleDeleteAccount = () => {
    setShowModal(false)
    dispatch(deleteAccount({id:userIdToDelete}))
    let userData = []
    for(let i = 0; i < users.length; i++) {
      if(users[i].id !== userIdToDelete){
        userData.push({ ...users[i] })
      }
      if(i === users.length - 1)
        setUsers(userData)
    }
  }
  const handleFilterUsers = () => {
    let data = {};
    data = {...data,
      Sort: arrange
    }
    if(date != ""){
      data = {...data,
        StartDate: date[0],
        EndDate: date[1]
      }
    }
    if(roleUser != "all"){
      data = {...data,
        Role: roleUser
      }
    }
    dispatch(usersFilter(data)).then(() =>{
      setIsSearched("filter")
      setShowFilterModal(false)
    })
  }
  const handleClose = () => {
    setShowFilterModal(false)
    setRoleUser("Tất cả")
    setArrange("desc")
    setDate("")
  }
  console.log(filter)
  const handleDatePickerChange = (date, dateString) => {
    setDate(dateString);
  };
  const role = [
    {
      id: "all",
      label: "Tất cả"
    },
    {
      id: "Doctor",
      label: "Bác sĩ"
    },
    {
      id: "Patient",
      label: "Bệnh nhân"
    }
  ]
  return (
    <div className="lg:pt-[70px] h-screen table-auto md:mx-auto px-10 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {profile ?
      <div className="mt-5 py-7 w-full h-[94%] rounded-xl bg-white shadow-lg shadow-violet-200 max-lg:px-6 lg:px-8">
        <FaArrowLeftLong className="h-6 w-8 hover:text-gray-600 cursor-pointer transition-transform duration-500"
                  onClick={()=>setProfile(false)}
        />
        <div className="lg:grid lg:grid-cols-5 lg:gap-8 h-full w-full">
          <div className="lg:col-span-1 flex flex-col items-center gap-3">
            <p className="font-semibold text-2xl mb-5">Hồ sơ</p>
            <img
              src={require("../../Images/pattientavt.png")}
              alt="userImage"
              className=" rounded-full w-32 h-32 object-cover border-4 border-[lightgray]"
            />
            <div className=" max-lg:text-left max-lg:text-base max-lg:flex max-lg:items-center max-lg:justify-center font-medium lg:text-lg lg:text-center w-full">
              Quoc Anh
            </div>
          </div>
          <div className={`lg:col-span-4 flex flex-col h-2/3`}>
            <Button className="mb-5 self-end" gradientMonochrome="failure">Xóa người dùng</Button>
            <div className="flex flex-col w-full self-center py-8 px-16 bg-white shadow-md rounded-lg">
              <div className="lg:flex lg:gap-5 mb-5">
                <div className="lg:w-1/2">
                  <p className="font-medium text-sm">Họ và tên</p>
                  <div className="lg:w-2/3 border-b-2 text-gray-700 border-b-teal-400 flex items-center bg-white border-gray-300 max-lg:mb-4 h-10">Quoc Anh</div>
                </div>
                <div className="lg:w-1/2">
                  <p className="font-medium text-sm">Email</p>
                  <div className="lg:w-2/3 border-b-2 text-gray-700 border-b-teal-400 flex items-center bg-white border-gray-300 max-lg:mb-4 h-10">oruku8888@gmail.com</div>
                </div>
              </div>
              <div className="lg:flex lg:gap-5 mb-5">
                <div className="lg:w-1/2">
                  <p className="font-medium text-sm">Số điện thoại</p>
                  <div className="lg:w-2/3 border-b-2 text-gray-700 border-b-teal-400 flex items-center bg-white border-gray-300 max-lg:mb-4 h-10">123456789</div>
                </div>
                <div className="lg:w-1/2">
                  <p className="font-medium text-sm">Địa chỉ</p>
                  <div className="lg:w-2/3 border-b-2 text-gray-700 border-b-teal-400 flex items-center bg-white border-gray-300 max-lg:mb-4 h-10">420 võ văn ngân</div>
                </div>
              </div>
              <div className="lg:flex lg:gap-5 mb-5">
                <div className="lg:w-1/2">
                  <p className="font-medium text-sm">Ngày sinh</p>
                  <div className="lg:w-2/3 border-b-2 text-gray-700 border-b-teal-400 flex items-center bg-white border-gray-300 max-lg:mb-4 h-10">11/11/2001</div>
                </div>
                <div className="lg:w-1/2">
                  <p className="font-medium text-sm">Giới tính</p>
                  <div className="lg:w-2/3 border-b-2 text-gray-700 border-b-teal-400 flex items-center bg-white border-gray-300 max-lg:mb-4 h-10">Nữ</div>
                </div>
              </div>
              {/* <>
                <div className="lg:flex lg:gap-5 mb-5">
                  <div className="lg:w-1/2">
                    <p className="font-medium text-sm">Chuyên khoa</p>
                    <div className="lg:w-2/3 border-b-2 text-gray-700 border-b-teal-400 flex items-center bg-white border-gray-300 max-lg:mb-4 h-10">Nhãn khoa</div>
                  </div>
                  <div className="lg:w-1/2">
                    <p className="font-medium text-sm">Bằng cấp</p>
                    <div className="lg:w-2/3 border-b-2 text-gray-700 border-b-teal-400 flex items-center bg-white border-gray-300 max-lg:mb-4 h-10">Thạc sĩ y khoa</div>                      
                  </div>
                </div>
                <div className="lg:flex lg:gap-5 mb-5">
                  <div className="lg:w-1/2">
                    <p className="font-medium text-sm">Năm kinh nghiệm</p>
                    <div className="lg:w-2/3 border-b-2 text-gray-700 border-b-teal-400 flex items-center bg-white border-gray-300 max-lg:mb-4 h-10">12</div>
                  </div>
                  <div className="lg:w-1/2">
                    <p className="font-medium text-sm">Nơi đào tạo</p>
                    <div className="lg:w-2/3 border-b-2 text-gray-700 border-b-teal-400 flex items-center bg-white border-gray-300 max-lg:mb-4 h-10">Đại học y dược</div>
                  </div>
                </div>
                <p className="font-medium text-sm mb-2">Giới thiệu</p>
                <div>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged
                </div>
              </> */}
              {/* <div
                className="text-lg mb-3 text-justify content"
                dangerouslySetInnerHTML={{ __html: detailPost[0]?.Content }}
              /> */}
            </div>
          </div>
        </div>
      </div>
      :
      <div className="lg:py-8">
        <div className="flex gap-4 mb-5 items-center">
          <div className="bg-slate-100 flex items-center col-span-2 h-11 lg:w-[30%] max-lg:w-[45%] rounded-lg hover:ring-1 hover:ring-teal-400">
            <input
              className="bg-slate-100 p-3 h-full w-full rounded-lg outline-none text-base"
              placeholder="Tìm theo tên..."
              value={keywordUser}
              onChange={(e)=>{setKeywordUser(e.target.value)}}
              onKeyDown={(e) => { 
                if (e.key === "Enter") 
                  handleSearchUser(); 
              }} />
            <FiSearch className="mr-4 h-[24px] w-[24px] text-teal-300"></FiSearch>
          </div>
          {(isSearched) && <IoIosCloseCircleOutline className="h-6 w-6 text-rose-500 cursor-pointer" onClick={()=>{handleClose();setIsSearched("");setKeywordUser("")}}/>}
          {!showFilterModal &&
          <TbFilterSearch className="h-6 w-6 text-teal-500 cursor-pointer transition-transform duration-500 hover:scale-110"
                          onClick={()=>setShowFilterModal(true)}
          />
          }
        </div>
        <Table hoverable className="shadow-lg shadow-violet-200">
          <Table.Head>
            <Table.HeadCell>Ngày tạo</Table.HeadCell>
            <Table.HeadCell>Avatar</Table.HeadCell>
            <Table.HeadCell>Họ và tên</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Số điện thoại</Table.HeadCell>
            <Table.HeadCell>Phân quyền</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          {slice?.map((user) => (
            <Table.Body className="divide-y" key={user.id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer" onClick={()=>setProfile(true)}>
                <Table.Cell>
                  {new Date(user.CreatedAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <img
                    src={user.Avt || require("../../Images/pattientavt.png") }
                    alt={user.username}
                    className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                  />
                </Table.Cell>
                <Table.Cell>{user.FirstName + " " + user.LastName}</Table.Cell>
                <Table.Cell>{user.Email}</Table.Cell>
                <Table.Cell>{user.Phone}</Table.Cell>
                <Table.Cell>{user.Role}</Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => {
                      setShowModal(true);
                      setUserIdToDelete(user.id);
                    }}
                    className="font-medium text-red-500 hover:underline cursor-pointer"
                  >
                    Xóa
                  </span>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
        {users?.length > 6 && !isSearched &&
        <Button
          className="mt-3 w-32 mx-auto rounded-lg h-11"
          outline gradientDuoTone="tealToLime"
          onClick={()=>{setNumberElement(numberElement+numberElement)}}
        >
          Xem thêm
        </Button>
        }
        {user?.length > 6 && isSearched &&
        <Button
          className="mt-3 w-32 mx-auto rounded-lg h-11"
          outline gradientDuoTone="tealToLime"
          onClick={()=>{setNumberElement(numberElement+numberElement)}}
        >
          Xem thêm
        </Button>
        }  
      </div>
      } 
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Bạn chắc chắn muốn xóa người dùng này?
            </h3>
            <div className="flex justify-center gap-4">              
              <Button color="gray" onClick={() => setShowModal(false)}>
                Hủy
              </Button>
              <Button
                color="failure"
                onClick={handleDeleteAccount}
              >
                Xóa
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showFilterModal}
        onClose={handleClose}
        popup
        size="lg"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col gap-3 px-4 items-center justify-center">
            <h3 className="mb-2 text-lg font-medium dark:text-gray-400">
              Bộ lọc
            </h3>
            <div className="flex items-center w-full">
              <p className="font-medium min-w-[35%]">Chọn ngày</p>
              <RangePicker className="w-full h-10 md:w-[65%] max-md:w-[65%]" 
                           format={dateFormat}
                           onChange={handleDatePickerChange}
              />
            </div>
            <div className="flex items-center w-full">
              <p className="font-medium min-w-[35%]">Phân quyền</p>
              <Select
              id="role"
              className="h-10 md:w-[65%] max-md:w-[65%] border rounded-md bg-white text-slate-800 cursor-pointer"
              value={roleUser}
              onChange={(value)=>{setRoleUser(value)}}
            >
              {role?.map((role) => (
                <Select
                  id="role"
                  value={role.id}
                  label={role.label}
                  key={role.id}
                >
                  {role.label}
                </Select>
              ))}
            </Select>
            </div>
            <div className="flex items-center w-full">
              <p className="font-medium min-w-[35%]">Sắp xếp theo</p>
              <Select
              id="arrange"
              className="h-10 md:w-[65%] max-md:w-[65%] border rounded-md bg-white text-slate-800 cursor-pointer"
              value={arrange}
              onChange={(value)=>{setArrange(value)}}
              options={[
                {
                  value: "desc",
                  label: 'Mới nhất xếp trước',
                },
                {
                  value: "asc",
                  label: 'Cũ nhất xếp trước',
                },
              ]}
            />
            </div>
                       
            <Button
              // disabled={record === "" || recordNote === ""}
              className="w-full h-10 mt-2"
              gradientDuoTone="purpleToPink"
              onClick={() => {
                handleFilterUsers()         
              }}
            >
              Xác nhận
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserList;
