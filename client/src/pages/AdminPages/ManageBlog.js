import React, { useEffect, useState } from "react";
import { Modal, Table, Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { fetchPost,fetchDoctorPost, acceptPost,hidePost, fetchCategories, searchPostAdmin, postsFilter } from "../../redux-toolkit/postSlice";
import { TbFilterSearch  } from "react-icons/tb";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { FiSearch } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
const { RangePicker } = DatePicker;

const ManageBlog = () => {
  const dateFormat = "DD/MM/YYYY";
  const { currentUser } = useSelector((state) => state.user);
  const {data, category,allSearchPostAdmin, filter} = useSelector((state) => state.post);
  const [confirmedPost, setConfirmPost] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [postId, setPostId] = useState();
  const [numberElement, setNumberElement] = useState(6)
  const [showFilterModal,setShowFilterModal] = useState(false)
  const [similarCategoryId, setSimilarCategoryId] = useState("");
  const [keywordUser, setKeywordUser] = useState("")
  const [isSearched, setIsSearched] = useState("")
  const [postStatus, setPostStatus] = useState(1)
  const [arrange, setArrange] = useState("desc")
  const [date, setDate] = useState("")
  const dispatch = useDispatch();
  const status = [
    {
      id: 1,
      label: "Bài viết đang xuất hiện"
    },
    {
      id: 2,
      label: "Bài viết đang bị ẩn"
    }
  ]
  useEffect(() => {
    if(currentUser.authentication == 2){
      dispatch(fetchDoctorPost())
    }
    else{
      const data = {
        filter: "DatePost",
        orderby: "desc"
      }
      dispatch(fetchPost(data));
      dispatch(fetchCategories());
    }
  }, [currentUser]);
  const handleAcceptPost = (id) => {
    const data = {
      filter: "DatePost",
      orderby: "desc"
    }
    dispatch(acceptPost({id})).then(() => {
      dispatch(fetchPost(data));
    })
  }
  const handleChangeCategory = (value) => {
    setSimilarCategoryId(value);
  };
  const handleHidePost = (id) => {
    const data = {
      filter: "DatePost",
      orderby: "desc"
    }
    dispatch(hidePost({id})).then(() => {
      dispatch(fetchPost(data));
    })
    setShowModal(false)
  }
  const handleDatePickerChange = (date, dateString) => {
    setDate(dateString);
  };
  const handleClose = () => {
    setShowFilterModal(false)
    setSimilarCategoryId("")
    setDate("")
  }
  const handleSearchPost = () => {
    dispatch(searchPostAdmin({keywords: keywordUser}))
    setIsSearched("search")
  }
  const handleFilterPosts = () => {
    let data = {};
    data = {...data,
      Sort: arrange,
      Status: postStatus
    }
    if(date != ""){
      data = {...data,
        StartDate: date[0],
        EndDate: date[1]
      }
    }
    if(similarCategoryId != ""){
      data = {...data,
        Similar: similarCategoryId
      }
    }
    dispatch(postsFilter(data)).then(() =>{
      setIsSearched("filter")
      setShowFilterModal(false)
    })
  }
  let posts
  if(isSearched == "search"){
    posts = allSearchPostAdmin
  }
  else if(isSearched == "filter"){
    posts = filter
  }
  else{
    posts = data
  }
  let post = [];
  for (let i = 0; i < posts?.length; i++) {
    if (posts[i].Status === confirmedPost)
      post.push({ ...posts[i] });
    if (posts[i].Status === 2 && confirmedPost === 1)
      post.push({ ...posts[i] });
  }
  const slice = post.slice(0,numberElement)
  return (
    <div className="lg:pt-[70px] table-auto md:mx-auto md:p-10 max-md:px-5 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <div className="pt-[30px] grid grid-cols-4 items-center md:w-[80%] max-md:w-full gap-3 mb-5 font-medium text-base text-gray-500">
        <div
          onClick={() => setConfirmPost(1)}
          className={` ${
            confirmedPost === 1 ? "bg-gray-100" : "bg-white"
          } h-11 drop-shadow-md flex items-center justify-center w-full rounded-lg cursor-pointer hover:bg-gray-100`}
        >
          Bài viết đã được duyệt
        </div>
        <div
          onClick={() => setConfirmPost(0)}
          className={` ${
            confirmedPost === 0 ? "bg-gray-100" : "bg-white"
          } h-11 drop-shadow-md flex items-center justify-center w-full rounded-lg cursor-pointer hover:bg-gray-100`}
        >
          Bài viết đang chờ duyệt
        </div>
        <div className="flex gap-2 items-center col-start-3 col-span-2">
          <div className="bg-slate-100 flex gap-2 items-center h-11 lg:w-[70%] max-lg:w-[70%] rounded-lg hover:ring-1 hover:ring-teal-400">
            <input
              className="bg-slate-100 p-3 h-full w-full font-normal rounded-lg outline-none text-base"
              placeholder="Tìm theo tên..."
              value={keywordUser}
              onChange={(e)=>{setKeywordUser(e.target.value)}}
              onKeyDown={(e) => { 
                if (e.key === "Enter") 
                  handleSearchPost(); 
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
          <Table.HeadCell className="md:p-3 max-md:p-2 truncate max-md:text-xs">Trạng thái</Table.HeadCell>
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
                {post.Status == 1 && (
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
                {post.Status == 2 && (
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
      {post.length > 6 &&
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
                  Tất cả chuyên mục
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
            <div className="flex items-center w-full">
              <p className="font-medium min-w-[35%]">Trạng thái</p>
              <Select
              id="status"
              className="h-10 md:w-[65%] max-md:w-[65%] border rounded-md bg-white text-slate-800 cursor-pointer"
              value={postStatus}
              onChange={(value)=>{setPostStatus(value)}}
              >
                {status?.map((status) => (
                  <Select
                    id="role"
                    value={status.id}
                    label={status.label}
                    key={status.id}
                  >
                    {status.label}
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
                handleFilterPosts()         
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

export default ManageBlog;
