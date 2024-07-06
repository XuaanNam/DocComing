import React, { useEffect, useState } from "react";
import { Modal, Table, Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { fetchPost,fetchDoctorPost, acceptPost,hidePost, fetchCategories } from "../../redux-toolkit/postSlice";
import { TbFilterSearch  } from "react-icons/tb";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const ManageBlog = () => {
  const dateFormat = "DD/MM/YYYY";
  const { currentUser } = useSelector((state) => state.user);
  const {data, category} = useSelector((state) => state.post);
  const [confirmedPost, setConfirmPost] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postId, setPostId] = useState();
  const [numberElement, setNumberElement] = useState(6)
  const [showFilterModal,setShowFilterModal] = useState(false)
  const [arrange, setArrange] = useState("Mới nhất xếp trước")
  const [categoryId, setCategoryId] = useState("");
  const [similarCategoryId, setSimilarCategoryId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if(currentUser.authentication == 2){
      dispatch(fetchDoctorPost())
    }
    else{
      const data = {
        filter: "DatePost",
        orderby: "asc"
      }
      dispatch(fetchPost(data));
      dispatch(fetchCategories());
    }
  }, [currentUser]);
  const handleAcceptPost = (id) => {
    const data = {id};
    dispatch(acceptPost(data)).then(() => {
      dispatch(fetchPost());
    })
  }
  const handleChangeCategory = (value) => {
    setSimilarCategoryId(value);
    for (let i = 0; i < category?.length; i++) {
      for (let j = 0; j < category[i]?.Similar?.length; j++) {
        if (category[i].Similar[j].id === value) {
          setCategoryId(category[i].id);
          break;
        }
      }
    }
  };
  const handleHidePost = (id) => {
    const data = {id};
    dispatch(hidePost(data)).then(() => {
      dispatch(fetchPost());
    })
    setShowModal(false)
  }
  const handleDatePickerChange = (date, dateString) => {
    console.log(dateString);
  };
  const handleClose = () => {
    setShowFilterModal(false)
  }
  let posts = [];
  for (let i = 0; i < data?.length; i++) {
    if (data[i].Status === confirmedPost)
      posts.push({ ...data[i] });
    if (data[i].Status === 2 && confirmedPost === 1)
      posts.push({ ...data[i] });
  }
  const slice = posts.slice(0,numberElement);
  console.log(data, confirmedPost);
  return (
    <div className="lg:pt-[70px] table-auto md:mx-auto md:p-10 max-md:px-5 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <div className="pt-[30px] grid grid-cols-3 items-center md:w-[50%] max-md:w-full gap-3 mb-5 font-medium text-base text-gray-500">
        <div
          onClick={() => setConfirmPost(1)}
          className={` ${
            confirmedPost === 1 ? "bg-gray-100" : "bg-white"
          } h-10 drop-shadow-md flex items-center justify-center w-full rounded-lg cursor-pointer hover:bg-gray-100`}
        >
          Bài viết đã được duyệt
        </div>
        <div
          onClick={() => setConfirmPost(0)}
          className={` ${
            confirmedPost === 0 ? "bg-gray-100" : "bg-white"
          } h-10 drop-shadow-md flex items-center justify-center w-full rounded-lg cursor-pointer hover:bg-gray-100`}
        >
          Bài viết đang chờ duyệt
        </div>
        {!showFilterModal &&
        <TbFilterSearch className="h-6 w-6 text-teal-500 cursor-pointer transition-transform duration-500 hover:scale-110"
                        onClick={()=>setShowFilterModal(true)}
        />
        }
      </div>
      <Table hoverable className="shadow-lg shadow-violet-200 rounded-lg">
        <Table.Head>
          <Table.HeadCell className="md:p-3 max-md:p-2 truncate max-md:text-xs">Ngày đăng</Table.HeadCell>
          <Table.HeadCell className="md:p-3 max-md:p-2 truncate max-md:text-xs">Ảnh</Table.HeadCell>
          <Table.HeadCell className="md:p-3 max-md:p-2 truncate max-md:text-xs">Tiêu đề</Table.HeadCell>
          <Table.HeadCell className="md:p-3 max-md:p-2 truncate max-md:text-xs">Chuyên mục</Table.HeadCell>
          {currentUser.authentication === 0 &&
          <Table.HeadCell className="md:p-3 max-md:p-2 truncate max-md:text-xs">Tác giả</Table.HeadCell>
          }
          <Table.HeadCell className="md:p-3 max-md:p-2 truncate max-md:text-xs"></Table.HeadCell>
          <Table.HeadCell className="md:p-3 max-md:p-2 truncate max-md:text-xs"></Table.HeadCell>
           {confirmedPost === 0 && (
            <Table.HeadCell className="md:p-3 max-md:p-2 truncate max-md:text-xs"></Table.HeadCell>
          )}
        </Table.Head>
        {slice?.map((post) => (
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
              <Table.Cell className="md:p-3 max-md:p-2 truncate max-md:text-xs ">
                {new Date(post?.DatePost).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell className="md:p-3 max-md:p-2 truncate max-md:text-xs">
                <Link to={`/blog/${post.id}`}>
                  <img
                    src={post.FeaturedImage}
                    alt={post.Title}
                    className="w-20 h-10 object-cover bg-gray-500"
                  />
                </Link>
              </Table.Cell>
              <Table.Cell className="md:p-3 max-md:p-2 truncate max-md:text-xs">
                <Link
                  className="font-medium text-gray-900 dark:text-white"
                  to={`/blog/${post.id}`}
                >
                  {post.Title}
                </Link>
              </Table.Cell>
              <Table.Cell className="md:p-3 max-md:p-2 truncate max-md:text-xs">{post.Similar}</Table.Cell>
              {currentUser.authentication === 0 && 
              <Table.Cell className="md:p-3 max-md:p-2 truncate max-md:text-xs">{post.FirstName + " " + post.LastName}</Table.Cell>
              }
              <Table.Cell className="md:p-3 max-md:p-2 truncate max-md:text-xs">
                {post.Status === 1 && (
                <div
                  onClick={() => {
                    setShowModal(true);
                    setPostId(post.id);
                  }}
                  className="font-medium text-red-500 hover:underline cursor-pointer"
                >
                  Ẩn bài viết
                </div>
                )}
                {post.Status === 2 && (
                <div
                  onClick={() => {
                    handleHidePost(post.id);
                  }}
                  className="font-medium text-green-500 hover:underline cursor-pointer"
                >
                  Hiện bài viết
                </div>
                )}
              </Table.Cell>
              {confirmedPost === 1 &&
              <Table.Cell className="md:p-3 max-md:p-2 truncate max-md:text-xs">
                {currentUser.authentication == 2 ? 
                <Link
                  className="font-medium text-teal-500 hover:underline cursor-pointer"
                  to={`/doctor/update-post/${post.id}`}
                >
                  Chỉnh sửa 
                </Link>
                :
                <Link
                  className="font-medium text-teal-500 hover:underline cursor-pointer"
                  to={`/admin/update-post/${post.id}`}
                >
                  Chỉnh sửa 
                </Link>
                }
              </Table.Cell>
              }
              {confirmedPost === 0 && 
              <Table.Cell className="md:p-3 max-md:p-2 truncate max-md:text-xs">
                <div
                  className="font-medium text-emerald-500 hover:underline cursor-pointer"
                  onClick={() => {handleAcceptPost(post.id)}}
                >
                  Duyệt
                </div>
              </Table.Cell>}
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
      {posts.length > 6 &&
      <Button
        className="mt-3 w-32 mx-auto rounded-lg h-11"
        outline gradientDuoTone="tealToLime"
        onClick={()=>{setNumberElement(numberElement+numberElement)}}
      >
        Xem thêm
      </Button>
      }
      {/* </>
      ) : (
        <p>You have no posts yet!</p>
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
              Bạn chắc chắn muốn ẩn bài viết này?
            </h3>
            <div className="flex justify-center gap-4">
            <Button color="gray" onClick={() => setShowModal(false)}>
                Đóng
              </Button>
              <Button
                color="failure"
                  onClick={()=>{handleHidePost(postId)}}
              >
                Ẩn
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
              <RangePicker className="h-10 md:w-[65%] max-md:w-[65%]" 
                           format={dateFormat}
                           onChange={handleDatePickerChange}
              />
            </div>
            <div className="flex items-center w-full">
              <p className="font-medium min-w-[35%]">Chuyên mục</p>
              <Select
                id="categories"
                className="h-10 md:w-[65%] max-md:w-[65%] border rounded-md bg-white text-slate-800 cursor-pointer"
                value={similarCategoryId}
                onChange={handleChangeCategory}
              >
                <option disabled value="" className="text-white">
                  Chọn chuyên mục
                </option>
                {category?.map((cgr) => (
                  <Select.OptGroup
                    id="category"
                    value={cgr.id}
                    label={cgr.Categories}
                    key={cgr.id}
                  >
                    {cgr.Similar?.map((item) => (
                      <Select.Option
                        value={item.id}
                        label={item.SimilarCategories}
                        key={item.id}
                      >
                        {item.SimilarCategories}
                      </Select.Option>
                    ))}
                  </Select.OptGroup>
                ))}
              </Select>
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
  );
};

export default ManageBlog;
