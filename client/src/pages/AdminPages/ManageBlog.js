import React, { useEffect, useState } from "react";
import { Modal, Table, Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { fetchPost } from "../../redux-toolkit/postSlice";
const ManageBlog = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [confirmedPost, setConfirmPost] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPost());
  }, [dispatch]);
  const post = useSelector((state) => state.post.data);
  console.log(post, confirmedPost);
  return (
    <div className="table-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {/* {currentUser.isAdmin && userPosts.length > 0 ? (
        <> */}
      <div className="flex w-[50%] gap-3 mb-3 font-medium text-base text-gray-500">
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
      <Table hoverable className="shadow-md rounded-lg">
        <Table.Head>
          <Table.HeadCell>Date updated</Table.HeadCell>
          <Table.HeadCell>Post image</Table.HeadCell>
          <Table.HeadCell>Post title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          <Table.HeadCell>
            <span>Edit</span>
          </Table.HeadCell>
        </Table.Head>
        {post.map(
          (post) =>
            post.Status === confirmedPost && (
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(post?.DatePost).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.FeaturedImage}
                        alt={post.Title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/post/${post.slug}`}
                    >
                      {post.Title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.idCategories}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            )
        )}
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
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                //   onClick={handleDeletePost}
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
  );
};

export default ManageBlog;
