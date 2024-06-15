import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { fetchUsers} from "../../redux-toolkit/authSlice";
import { fetchPost} from "../../redux-toolkit/postSlice";

export default function Dashboards() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(1);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser,countUser} = useSelector((state) => state.user);
  const {data,countPost} = useSelector((state) => state.post);
  const allUsers = useSelector((state) => state.user.data);
  console.log(data, allUsers)
  useEffect(() => {
    dispatch(fetchUsers()); 
    dispatch(fetchPost());
  }, [currentUser]);
  return (
    <div className="pt-[70px] m-3 md:mx-auto p-6 border-collapse">
      <div className="pt-3 flex flex-wrap gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-96 w-full rounded-md shadow-lg shadow-violet-200">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Tất cả người dùng</h3>
              <p className="text-2xl">{allUsers?.length}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {countUser}
            </span>
            <div className="text-gray-500">Tháng này</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-96 w-full rounded-md shadow-lg shadow-violet-200">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Tất cả bài viết</h3>
              <p className="text-2xl">{data?.length}</p>
            </div>
            <HiDocumentText className="bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {countPost}
            </span>
            <div className="text-gray-500">Tháng này</div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 max-md:grid-rows-3 gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-lg shadow-violet-200 p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-1 text-sm font-semibold">
            <h3 className="text-center p-2">Người dùng mới</h3>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/admin/users"}>Xem tất cả</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Avatar</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Họ tên</Table.HeadCell>
            </Table.Head>
            {allUsers &&
              allUsers.slice(0,5).map((user) => (
                <Table.Body key={user.id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img
                        src={user.Avt}
                        alt="user"
                        className="w-10 h-10 rounded-full bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.Email}</Table.Cell>
                    <Table.Cell>{user.FirstName + " " + user.LastName}</Table.Cell>

                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-lg shadow-violet-200 p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-1 text-sm font-semibold">
            <h3 className=" p-2">Bài viết gần đây</h3>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/admin/manage-post"}>Xem tất cả</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Ảnh bài viết</Table.HeadCell>
              <Table.HeadCell>Tiêu đề</Table.HeadCell>
              <Table.HeadCell>Chuyên mục</Table.HeadCell>
            </Table.Head>
            {data &&
              data.slice(0,5).map((post) => (
                <Table.Body key={post.id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img
                        src={post.FeaturedImage}
                        alt="user"
                        className="w-14 h-10 rounded-md bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell className="max-w-96">{post.Title}</Table.Cell>
                    <Table.Cell className="max-w-28">{post.Similar}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
