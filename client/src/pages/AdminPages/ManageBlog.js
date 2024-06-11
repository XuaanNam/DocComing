import React, { useEffect, useState } from "react";
import { Modal, Table, Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { fetchPost,fetchDoctorPost, acceptPost,hidePost } from "../../redux-toolkit/postSlice";
const ManageBlog = () => {
  const { currentUser } = useSelector((state) => state.user);
  const {data} = useSelector((state) => state.post);
  const [confirmedPost, setConfirmPost] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postId, setPostId] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if(currentUser.authentication == 2)
      {
      dispatch(fetchDoctorPost())
    }
    else
      dispatch(fetchPost());
  }, [currentUser]);
  const handleAcceptPost = (id) => {
    const data = {id};
    dispatch(acceptPost(data)).then(() => {
      dispatch(fetchPost());
    })
  }
  const handleHidePost = (id) => {
    const data = {id};
    dispatch(hidePost(data)).then(() => {
      dispatch(fetchPost());
    })
    setShowModal(false)
  }
  let posts = [];
  for (let i = 0; i < data?.length; i++) {
    if (data[i].Status === confirmedPost)
      posts.push({ ...data[i] });
    if (data[i].Status === 2 && confirmedPost === 1)
      posts.push({ ...data[i] });
  }
  console.log(data, confirmedPost);
  return (
    <div className="lg:pt-[70px] table-auto md:mx-auto md:p-10 max-md:px-5 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {/* {currentUser.isAdmin && userPosts.length > 0 ? (
        <> */}
      <div className="pt-[30px] flex md:w-[50%] max-md:w-full gap-3 mb-5 font-medium text-base text-gray-500">
        <div
          onClick={() => setConfirmPost(1)}
          className={` ${
            confirmedPost === 1 ? "bg-gray-100" : "bg-white"
          } h-[40px]  drop-shadow-md flex items-center justify-center w-full rounded-lg cursor-pointer hover:bg-gray-100`}
        >
          Bài viết đã được duyệt
        </div>
        <div
          onClick={() => setConfirmPost(0)}
          className={` ${
            confirmedPost === 0 ? "bg-gray-100" : "bg-white"
          } h-[40px]  drop-shadow-md flex items-center justify-center w-full rounded-lg cursor-pointer hover:bg-gray-100`}
        >
          Bài viết đang chờ duyệt
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
          <Table.HeadCell className="md:p-3 max-md:p-2 truncate max-md:text-xs"></Table.HeadCell>
          <Table.HeadCell className="md:p-3 max-md:p-2 truncate max-md:text-xs"></Table.HeadCell>
           {confirmedPost === 0 && (
            <Table.HeadCell className="md:p-3 max-md:p-2 truncate max-md:text-xs"></Table.HeadCell>
          )}
        </Table.Head>
        {posts?.map((post) => (
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
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
      {showMore && (
        <button
          //   onClick={handleShowMore}
          className="w-full text-teal-500 self-center text-sm py-7"
        >
          Show more
        </button>
      )}
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
    </div>
  );
};

export default ManageBlog;
