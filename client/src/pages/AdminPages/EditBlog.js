import React, { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Editor from "./Editor";
import { useDispatch, useSelector } from "react-redux";
import { createPost,updatePost, fetchCategories,getDetailPost, fetchMajor } from "../../redux-toolkit/postSlice";
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
  const { detailPost, category,major, checked } = useSelector((state) => state.post);
  const [actived, setActived] = useState(false);
  const [filled, setFilled] = useState(true);
  const [data,setData] = useState({});
  const [content,setContent] = useState("")
  const [files, setFiles] = useState(null);
  const {postId} = useParams();
  const ref = useRef();
  const classifies = [
    {
      value: 1,
      label: 'Bệnh lý',
    },
    {
      value: 2,
      label: 'Thông tin sức khỏe',
    },
]
  useEffect(() => {
    dispatch(getDetailPost(postId)).then(results => {
      setData(results.payload.data[0])
      setContent(results.payload.data[0]?.Content)
    })
  }, []);
  useEffect(() => {
    if (currentUser) {
      if (currentUser.authentication != 0) Navigate("/");
    } else Navigate("/");
  }, [currentUser]);

  const handleChange = (value) => {
    for (let i = 0; i < category?.length; i++) {
      for (let j = 0; j < category[i]?.Similar?.length; j++) {
        if (category[i].Similar[j].id === value) {
          setData({ ...data, idCategories: category[i].id, idSimilar: value })
          break;
        }
      }
    }
  };
  const handleCreatePost = () => {
    const body = new FormData();
    body.append("Title", data.Title);
    body.append("Brief", data.Brief);
    body.append("Content", content);
    body.append("idClassify", data.idClassify);
    body.append("idCategories", data.idCategories);
    body.append("idMajor", data.idMajor);
    body.append("idSimilar", data.idSimilar);
    body.append("id", postId); //id post
    if(files != null )
      body.append("FeaturedImage", files);
    if (
      data.Title !== "" &&
      data.Brief !== "" &&
      content !== ""
    ) {
      dispatch(updatePost(body))
      .then(()=>{
        Navigate("/admin/manage-post")
      });
    } else {
      setFilled(false);
    }
  };
  return (
    <div>
        {currentUser?.authentication == 0 ? (
        <div className="min-h-screen flex">
            <DashSidebar param="manage-post"></DashSidebar>
            <div className="overflow-auto pt-[70px] w-full">
              <div className="md:flex md:items-center md:justify-center">
                  <div className="lg:my-5 max-lg:my-5 bg-white flex flex-col items-center justify-center md:w-3/4 max-md:md:w-[90%] max-md:w-full md:p-4 max-md:p-3 max-md:mx-5 rounded-lg shadow-xl">
                      <div className="text-2xl font-bold opacity-70 mb-5">Chỉnh sửa bài viết</div>
                      <div className="h-11 md:w-[90%] max-md:w-full border rounded-md mb-4 bg-white">
                      <Input
                          className={` ${
                          !filled && data?.Title === "" && "border-red-400 border-[1.5px]"
                          } outline-none rounded-md h-full p-3 w-full`}
                          type="text"
                          placeholder="Tiêu đề" 
                          value={data?.Title}
                          onChange={(e) => {setData({ ...data, Title: e.target.value })}}
                      />
                      </div>
                      <div className="h-11 md:w-[90%] max-md:w-full border rounded-md mb-4 bg-white">
                      <Input
                          className={` ${
                          !filled && data?.Brief === "" && "border-red-400 border-[1.5px]"
                          } outline-none rounded-md h-full p-3 w-full`}
                          type="text"
                          placeholder="Tóm tắt"
                          value={data?.Brief}
                          onChange={(e) => {setData({ ...data, Brief: e.target.value });}}
                      />
                      </div>
                      <Select
                        id="classify"
                        className={` ${
                          !filled && data?.idClassify === ""
                            ? "border-red-400 border-[1.5px]"
                            : "border-gray-400"
                        } h-11 md:w-[90%] max-md:w-full border rounded-md mb-4 bg-white text-slate-800 cursor-pointer`}
                        value={data?.idClassify}
                        onChange={(value)=>{setData({ ...data, idClassify: value})}}
                      >    
                        <option disabled value="" className="text-white">
                          Phân loại bài viết
                        </option>
                        {classifies.map((item) => 
                        <Select
                          id="classify"
                          value={item.value}
                          label={item.label}
                          key={item.value}
                        >
                          {item.label}
                        </Select>
                        )}
                      </Select>
                      <Select
                        id="categories"
                        className={` ${
                            !filled && data?.idSimilar === ""
                            ? "border-red-400 border-[1.5px]"
                            : "border-gray-400"
                        } h-11 md:w-[90%] max-md:w-full border rounded-md mb-4 bg-white text-slate-800 cursor-pointer`}
                        value={data?.idSimilar}
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
                      <Select
                        id="major"
                        className={` ${
                          !filled && data?.idMajor === ""
                            ? "border-red-400 border-[1.5px]"
                            : "border-gray-400"
                        } h-11 md:w-[90%] max-md:w-full border rounded-md mb-4 bg-white text-slate-800 cursor-pointer`}
                        value={data?.idMajor}
                        onChange={(value)=>{setData({ ...data, idMajor: value})}}
                      >
                        <option disabled value="" className="text-white">
                          Chọn chuyên khoa
                        </option>

                        {major?.map((major) => (
                          <Select
                            id="major"
                            value={major.id}
                            label={major.Major}
                            key={major.id}
                          >
                            {major.Major}
                          </Select>
                        ))}
                      </Select>
                      {actived ? (
                      <div
                      className="md:w-[90%] max-md:w-full mb-4 justify-between border-2 border-dotted border-teal-500 p-3 cursor-pointer"
                      >
                      <FileInput
                          className="cursor-pointer h-11 w-full !text-white"
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
                      className={` ${!filled && content === "" && "ql-error"}`}
                      value={content}
                      onChange={setContent}
                      />
                      <button
                      onClick={handleCreatePost}
                      className="h-11 mt-5 w-[90%] border rounded-xl py-2 cursor-pointer text-white text-lg text-center font-medium bg-gradient-to-r from-green-400 to-teal-500 hover:drop-shadow-lg"
                      >
                        Cập nhật
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
