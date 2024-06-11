import React, { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Editor from "./Editor";
import { useDispatch, useSelector } from "react-redux";
import { createPost, fetchCategories } from "../../redux-toolkit/postSlice";
import { Select, Input } from "antd";
import { FileInput } from "flowbite-react";
const CreateBlog = () => {
  const dispatch = useDispatch();
  const { category, checked } = useSelector((state) => state.post);
  const [filled, setFilled] = useState(true);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [similarCategoryId, setSimilarCategoryId] = useState("");

  const ref = useRef();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const handleChange = (value) => {
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

  const handleCreatePost = () => {
    const data = new FormData();
    data.append("Title", title);
    data.append("Brief", summary);
    data.append("Content", content);
    data.append("idCategories", categoryId);
    data.append("idSimilar", similarCategoryId);
    data.append("FeaturedImage", files);
    if (
      title !== "" &&
      summary !== "" &&
      content.length > 0 &&
      similarCategoryId !== "" &&
      files?.name
    ) {
      dispatch(createPost(data)).then(() => {
        // setTitle("");
        // setSummary("");
        // setContent("");
        // setsimilarCategoryId("");
        // setFiles(null);
        // ref.current.value = null;
      });
    } else {
      setFilled(false);
    }
  };
  return (
    <div className="lg:pt-[70px] min-h-screen md:flex md:items-center md:justify-center ">
      <div className="lg:mt-10 max-lg:mt-5 mb-20 flex flex-col items-center justify-center md:w-3/4 max-md:w-[90%] md:p-8 max-md:p-3 max-md:mx-5 rounded-lg shadow-xl shadow-violet-200 border">
        <div className="text-2xl font-bold opacity-70 mb-5">
          Thêm bài viết
        </div>
        <div className="h-[48px] md:w-[90%] max-md:w-full border rounded-md mb-4 bg-white">
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
        <div className="h-[48px] md:w-[90%] max-md:w-full border rounded-md mb-4 bg-white">
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
          id="categories"
          className={` ${
            !filled && categoryId === ""
              ? "border-red-400 border-[1.5px]"
              : "border-gray-400"
          } h-[48px] md:w-[90%] max-md:w-full border rounded-md mb-4 bg-white text-slate-800 cursor-pointer`}
          value={similarCategoryId}
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

        <div
          className={` ${
            !filled && !files?.name ? "border-red-400" : "border-teal-500"
          } md:w-[90%] max-md:w-full mb-4  justify-between border-2 border-dotted p-3`}
        >
          <FileInput
            className="cursor-pointer h-[48px] w-full !text-white"
            type="file"
            accept="image/*"
            onChange={(e) => setFiles(e.target.files[0])}
            ref={ref}
          />
        </div>

        <Editor
          className={` ${!filled && content === "" && "ql-error"}`}
          value={content}
          onChange={setContent}
        />
        <button
          onClick={handleCreatePost}
          className="h-12 w-[90%] border rounded-xl py-2 cursor-pointer text-white text-lg text-center font-medium bg-gradient-to-r from-green-400 to-teal-500 hover:drop-shadow-lg"
        >
          Đăng
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
