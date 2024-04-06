import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Editor from "./Editor";
import { useDispatch, useSelector } from "react-redux";
import { createPost, fetchCategories } from "../../redux-toolkit/postSlice";
import Select from "react-select";
const ManagedBlog = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.post.data);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [categories, setCategories] = useState([{ id: "", Categories: "" }]);
  const [categoryId, setCategoryId] = useState("");

  const data = new FormData();
  data.append("Title", title);
  data.append("Brief", summary);
  data.append("Content", content);
  data.append("idCategories", categoryId);
  data.append("FeaturedImage", files[0]);
  useEffect(() => {
    dispatch(fetchCategories());
    setCategories(category);
  }, [dispatch]);
  const handleChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleCreatePost = () => {
    console.log(data);
    dispatch(createPost(data));
  };

  return (
    <div className="p-5">
      <div className="text-2xl font-bold opacity-70 mb-5">Tạo Blog</div>
      <div className="">
        <div className="flex items-center h-[48px] w-[70%] border rounded-lg mb-3 bg-white">
          <input
            className="outline-none rounded-lg h-full p-3 w-full"
            type="text"
            placeholder="Tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center h-[48px] w-[70%] border rounded-lg mb-3 bg-white">
          <input
            className="outline-none rounded-lg h-full p-3 w-full"
            type="text"
            placeholder="Tóm tắt"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
        <select
          className="flex items-center h-[48px] w-[70%] border rounded-lg mb-3 bg-white p-2 text-slate-800 opacity-60 cursor-pointer"
          value={categoryId}
          onChange={handleChange}
        >
          <option disabled value="" className="text-white">
            Chọn chuyên mục
          </option>

          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.Categories}
            </option>
          ))}
        </select>

        <div className="flex items-center p-3 h-[48px] w-[70%] border rounded-lg mb-3 bg-white">
          <input
            className="outline-none w-full"
            type="file"
            onChange={(e) => setFiles(e.target.files)}
          />
        </div>
        <Editor value={content} onChange={setContent} />
        <button
          onClick={handleCreatePost}
          className="h-12 w-[70%] border rounded-xl py-2 cursor-pointer text-white text-lg text-center font-medium bg-gradient-to-r from-green-400 to-teal-500 hover:drop-shadow-lg"
        >
          Đăng
        </button>
        {/* {content && (
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )} */}
      </div>
    </div>
  );
};

export default ManagedBlog;
