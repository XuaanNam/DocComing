import React, { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Editor from "./Editor";
import { useDispatch, useSelector } from "react-redux";
import { createPost,updatePost, fetchCategories,getDetailPost } from "../../redux-toolkit/postSlice";
import { Select, Input } from "antd";
import { FileInput, Button } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import DashSidebar from "../../components/DashSidebar";
const EditBlog = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { currentUser, error, loading } = useSelector(
    (state) => state.user
  );
  const { detailPost, category, checked } = useSelector((state) => state.post);
  const [actived, setActived] = useState(false);
  const [filled, setFilled] = useState(true);
  const [data,setData] = useState({});
  const [files, setFiles] = useState(null);
  const {postId} = useParams();
  const ref = useRef();
  useEffect(() => {
    dispatch(getDetailPost(postId));
  }, [dispatch,postId]);
  useEffect(() => {
    dispatch(fetchCategories());
    setData(detailPost[0])
  }, [detailPost]);
  console.log(data);

  useEffect(() => {
    for (let i = 0; i < category?.length; i++) {
      if(data?.Categories == category[i].Categories){
        for (let j = 0; j < category[i]?.Similar?.length; j++) {
          if (category[i].Similar[j].SimilarCategories == data?.Similar) {
            setData({...data, Similar: category[i].Similar[j].id, Categories: category[i].id})
            break;
          }
        }
      }
    }
    if (currentUser) {
      if (currentUser.authentication !== 0) Navigate("/");
    } else Navigate("/");
  }, [currentUser,category]);
  const handleChange = (value) => {
    for (let i = 0; i < category?.length; i++) {
      for (let j = 0; j < category[i]?.Similar?.length; j++) {
        if (category[i].Similar[j].id === value) {
          setData({ ...data, Categories: category[i].id, Similar: value })
          break;
        }
      }
    }
  };
  const handleCreatePost = () => {
    const body = new FormData();
    body.append("Title", data.Title);
    body.append("Brief", data.Brief);
    body.append("Content", data.Content);
    body.append("idCategories", data.Categories);
    body.append("idSimilar", data.Similar);
    body.append("id", postId); //id post
    if(files != null )
      body.append("FeaturedImage", files);
    if (
      data.Title !== "" &&
      data.Brief !== "" &&
      data.Content !== ""
    ) {
      dispatch(updatePost(body)).then(()=>{
        Navigate("/admin/manage-post")
      });
    } else {
      setFilled(false);
    }
  };
  return (
    <div>
        {currentUser?.authentication === 0 ? (
        <div className="min-h-screen flex">
            <DashSidebar param="manage-post"></DashSidebar>
            <div className="overflow-auto pt-[70px] w-full">
              <div className="md:flex md:items-center md:justify-center">
                  <div className="lg:mt-10 max-lg:mt-5 mb-20 flex flex-col items-center justify-center md:w-3/4 max-md:md:w-[90%] max-md:w-full md:p-8 max-md:p-3 max-md:mx-5 rounded-lg shadow-xl shadow-violet-200 border">
                      <div className="text-2xl font-bold opacity-70 mb-5">Chỉnh sửa bài viết</div>
                      <div className="h-[48px] md:w-[90%] max-md:w-full border rounded-md mb-4 bg-white">
                      <Input
                          className={` ${
                          !filled && data.Title === "" && "border-red-400 border-[1.5px]"
                          } outline-none rounded-md h-full p-3 w-full`}
                          type="text"
                          placeholder="Tiêu đề" 
                          value={data?.Title}
                          onChange={(e) => {setData({ ...data, Title: e.target.value })}}
                      />
                      </div>
                      <div className="h-[48px] md:w-[90%] max-md:w-full border rounded-md mb-4 bg-white">
                      <Input
                          className={` ${
                          !filled && data.Brief === "" && "border-red-400 border-[1.5px]"
                          } outline-none rounded-md h-full p-3 w-full`}
                          type="text"
                          placeholder="Tóm tắt"
                          value={data?.Brief}
                          onChange={(e) => {setData({ ...data, Brief: e.target.value });}}
                      />
                      </div>
                      <Select
                      id="categories"
                      className={` ${
                          !filled && data?.Similar === ""
                          ? "border-red-400 border-[1.5px]"
                          : "border-gray-400"
                      } h-[48px] md:w-[90%] max-md:w-full border rounded-md mb-4 bg-white text-slate-800 cursor-pointer`}
                      value={data?.Similar}
                      onChange={handleChange}
                      >
                      <option disabled value="" className="text-white">
                          Chọn chuyên mục
                      </option>

                      {category?.map((category) => (
                          <Select.OptGroup
                          id="category"
                          value={category.id}
                          label={category.Categories}
                          key={category.id}
                          >
                          {category.Similar?.map((item) => (
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
                      {actived ? (
                      <div
                      className="md:w-[90%] max-md:w-full mb-4 justify-between border-2 border-dotted border-teal-500 p-3 cursor-pointer"
                      >
                      <FileInput
                          className="cursor-pointer h-[48px] w-full !text-white"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setFiles(e.target.files[0])}
                          ref={ref}
                      />
                      </div>
                      ):(
                      <div className="relative md:w-[90%] max-md:w-full block mb-4">
                        <img className="w-full h-[360px] rounded-md mb-4 object-cover" src={data?.FeaturedImage} alt=""></img>
                        {data?.FeaturedImage &&
                        <Button
                          onClick={()=>{setActived(true)}}
                          className="absolute top-5 right-10 w-32 h-[36px] mx-auto text-center shadow-md shadow-purple-300 rounded-xl"
                          gradientDuoTone="purpleToPink"
                        >
                          <p className="">Đổi ảnh</p>
                        </Button>
                        }
                      </div>
                      )}
                      <Editor
                      className={` ${!filled && data.Content === "" && "ql-error"}`}
                      value={data?.Content}
                      onChange={(value) => {setData({ ...data, Content: value })}}
                      />
                      <button
                      onClick={handleCreatePost}
                      className="h-12 w-[90%] border rounded-xl py-2 cursor-pointer text-white text-lg text-center font-medium bg-gradient-to-r from-green-400 to-teal-500 hover:drop-shadow-lg"
                      >
                        Đăng
                      </button>
                  </div>
              </div>
            </div>

        </div>
        ) : (
            <div className="h-screen bg-white"></div>
        )}
    </div>

  );
};

export default EditBlog;
