import { Modal, Table, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { fetchUsers, deleteAccount, searchUser } from "../../redux-toolkit/authSlice";
import { FiSearch } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TbFilterSearch  } from "react-icons/tb";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const UserList = () => {
  const dateFormat = "DD/MM/YYYY";
  const allUsers = useSelector((state) => state.user.data);
  const {allSearchUsers} = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [numberElement, setNumberElement] = useState(6)
  const [keywordUser, setKeywordUser] = useState("")
  const [isSearched, setIsSearched] = useState(false)
  const [filter, setFilter] = useState("CreatedAt")
  const [orderby, setOrderby] = useState("asc")
  const [showFilterModal,setShowFilterModal] = useState(false)
  const [roleUser, setRoleUser] = useState("Tất cả")
  const [arrange, setArrange] = useState("Mới nhất xếp trước")
  const dispatch = useDispatch();
  useEffect(() => {
    const data = {
      filter,
      orderby
    }
    dispatch(fetchUsers(data));
  }, [dispatch]);
  useEffect(() => {
    if(allUsers?.length > 0){
      setUsers(allUsers)
    }
  }, [allUsers]);
  const slice1 = users?.slice(0,numberElement);
  const slice2 = allSearchUsers?.data?.slice(0,numberElement);

  const handleSearchUser = () => {
    dispatch(searchUser({keywords: keywordUser}))
    setIsSearched(true)
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
  const handleClose = () => {
    setShowFilterModal(false)
  }
  const handleDatePickerChange = (date, dateString) => {
    console.log(dateString);
  };
  const role = [
    {
      id: 1,
      label: "Tất cả"
    },
    {
      id: 2,
      label: "Bác sĩ"
    },
    {
      id: 3,
      label: "Bệnh nhân"
    }
  ]
  return (
    <div className="lg:pt-[70px] h-screen table-auto md:mx-auto p-10 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <div className="lg:py-8">
      <div className="flex gap-4 mb-5 items-center">
        <div className="bg-slate-100 flex items-center col-span-2 h-[48px] lg:w-[30%] max-lg:w-[45%] rounded-lg hover:ring-1 hover:ring-teal-400">
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
        {(isSearched) && <IoIosCloseCircleOutline className="h-6 w-6 text-rose-500 cursor-pointer" onClick={()=>{setIsSearched(false);setKeywordUser("")}}/>}
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
        {isSearched ? slice2?.map((user) => (
          <Table.Body className="divide-y" key={user.id}>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
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

              <Table.Cell>
                {/* {user.isAdmin ? (
                  <FaCheck className="text-green-500" />
                ) : (
                  <FaTimes className="text-red-500" />
                )} */}
                {user.Role}
              </Table.Cell>
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
        ))
        :
        slice1?.map((user) => (
          <Table.Body className="divide-y" key={user._id}>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
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

              <Table.Cell>
                {/* {user.isAdmin ? (
                  <FaCheck className="text-green-500" />
                ) : (
                  <FaTimes className="text-red-500" />
                )} */}
                {user.Role}
              </Table.Cell>
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
      {allSearchUsers?.data?.length > 6 && isSearched &&
      <Button
        className="mt-3 w-32 mx-auto rounded-lg h-11"
        outline gradientDuoTone="tealToLime"
        onClick={()=>{setNumberElement(numberElement+numberElement)}}
      >
        Xem thêm
      </Button>
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
                  value={role.label}
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
                  value: 1,
                  label: 'Mới nhất xếp trước',
                },
                {
                  value: 2,
                  label: 'Cũ nhất xếp trước',
                },
              ]}
            />
            </div>
                       
            <Button
              // disabled={record === "" || recordNote === ""}
              className="w-full h-10 mt-2"
              gradientDuoTone="purpleToPink"
              // onClick={() => {
              //   idRecord !== null ? handleUpdateHealthRecord() : handleHealthRecord()         
              // }}
            >
              Xác nhận
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      </div>
    </div>
  );
};

export default UserList;
