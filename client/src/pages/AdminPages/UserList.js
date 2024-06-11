import { Modal, Table, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { fetchUsers } from "../../redux-toolkit/authSlice";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const allUsers = useSelector((state) => state.user.data);
  console.log(allUsers);
  return (
    <div className="lg:pt-[70px] h-screen table-auto md:mx-auto p-10 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {/* {currentUser.isAdmin && users.length > 0 ? ( 
        <>*/}
        <div className="lg:pt-[30px]">
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
        {allUsers?.map((user) => (
          <Table.Body className="divide-y" key={user._id}>
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
                    setUserIdToDelete(user._id);
                  }}
                  className="font-medium text-red-500 hover:underline cursor-pointer"
                >
                  Delete
                </span>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
      {showMore && (
        <button
          // onClick={handleShowMore}
          className="w-full text-teal-500 self-center text-sm py-7"
        >
          Show more
        </button>
      )}
      {/* </>
      ) : (
        <p>You have no users yet!</p>
      )} */}
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
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                // onClick={handleDeleteUser}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      </div>
    </div>
  );
};

export default UserList;
