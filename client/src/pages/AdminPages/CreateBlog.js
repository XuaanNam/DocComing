import React, { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Editor from "./Editor";
import { useDispatch, useSelector } from "react-redux";
import { createPost, fetchCategories, fetchMajor } from "../../redux-toolkit/postSlice";
import { Select, Input } from "antd";
import { FileInput } from "flowbite-react";
const CreateBlog = () => {
  const dispatch = useDispatch();
  const { category,major, checked } = useSelector((state) => state.post);
  const [filled, setFilled] = useState(true);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [majorId, setMajorId] = useState("")
  const [categoryId, setCategoryId] = useState("");
  const [similarCategoryId, setSimilarCategoryId] = useState("");
  const [classify, setClassify] = useState("")
  const [isValid, setIsValid] = useState(true)
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
  console.log(files)
  const handleCreatePost = () => {
    const data = new FormData();
    data.append("Title", title);
    data.append("Brief", summary);
    data.append("Content", content);
    data.append("idClassify", classify);
    data.append("idMajor", majorId);
    data.append("idCategories", categoryId);
    data.append("idSimilar", similarCategoryId);
    data.append("FeaturedImage", files);
    if (
      title !== "" &&
      summary !== "" &&
      content.length > 0 &&
      classify !== "" &&
      similarCategoryId !== "" &&
      files?.name
    ) {
      if((classify == "1" && majorId != "") || classify == "2"){
        dispatch(createPost(data)).then(() => {
          setFilled(true)
          setIsValid(true)
          setTitle("");
          setSummary("");
          setContent("");
          setClassify("")
          setMajorId("")
          setSimilarCategoryId("");
          setFiles(null);
          ref.current.value = null;
        });
      }
      else
        setIsValid(false)
    } else {
      setFilled(false);
    }
  };
  console.log(majorId)
  return (
    <div className="lg:pt-[70px] min-h-screen bg-gray-50 md:flex md:items-center md:justify-center ">
      <div className="lg:my-5 max-lg:my-5 bg-white flex flex-col items-center justify-center md:w-3/4 max-md:w-[90%] md:p-4 max-md:p-3 max-md:mx-5 rounded-lg shadow-xl shadow-violet-200">
        <div className="text-2xl font-bold opacity-70 mb-5">
          Thêm bài viết
        </div>
        <div className="h-11 md:w-[90%] max-md:w-full border rounded-md mb-4 bg-white">
          <Input
            className={` ${
              !filled && title === "" && "border-red-400 border-[1.5px]"
            } outline-none rounded-md h-full p-3 w-full`}
            type="text"
            placeholder="Tiêu đề" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="h-11 md:w-[90%] max-md:w-full border rounded-md mb-4 bg-white">
          <Input
            className={` ${
              !filled && summary === "" && "border-red-400 border-[1.5px]"
            } outline-none rounded-md h-full p-3 w-full`}
            type="text"
            placeholder="Tóm tắt"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
        <Select
            id="classify"
            className={` ${
              !filled && classify === ""
                ? "border-red-400 border-[1.5px]"
                : "border-gray-400"
            } h-11 md:w-[90%] max-md:w-full border rounded-md mb-4 bg-white text-slate-800 cursor-pointer`}
            value={classify}
            onChange={(value)=>{setClassify(value)}}
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
            !filled && similarCategoryId === ""
              ? "border-red-400 border-[1.5px]"
              : "border-gray-400"
          } h-11 md:w-[90%] max-md:w-full border rounded-md mb-4 bg-white text-slate-800 cursor-pointer`}
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
        
        <Select
          id="major"
          className={` ${
            !isValid && majorId === ""
              ? "border-red-400 border-[1.5px]"
              : "border-gray-400"
          } border-gray-400 h-11 md:w-[90%] max-md:w-full border rounded-md mb-4 bg-white text-slate-800 cursor-pointer`}
          value={majorId}
          onChange={(value)=>{setMajorId(value)}}
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

        <div
          className={` ${
            !filled && !files?.name ? "border-red-400" : "border-teal-500"
          } md:w-[90%] max-md:w-full mb-4  justify-between border-2 border-dotted p-3`}
        >
          <FileInput
            className="cursor-pointer h-11 w-full !text-white"
            type="file"
            accept="image/*"
            onChange={(e) => setFiles(e.target.files[0])}
            ref={ref}
          />
        </div>
        <div className="w-full flex items-center justify-center">
        <Editor
          className={` ${!filled && content === "" && "ql-error"} mb-5` }
          value={content}
          onChange={setContent}
        />
        </div>
        
        <button
          onClick={handleCreatePost}
          className="h-11 w-[90%] border rounded-xl py-2 cursor-pointer text-white text-lg text-center font-medium bg-gradient-to-r from-green-400 to-teal-500 hover:drop-shadow-lg"
        >
          Đăng
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
