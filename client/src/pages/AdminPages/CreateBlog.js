import React, { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Editor from "./Editor";
import { useDispatch, useSelector } from "react-redux";
import { createPost, fetchCategories } from "../../redux-toolkit/postSlice";
import Select from "react-select";
import { Alert, Button, FileInput } from "flowbite-react";
const CreateBlog = () => {
  const dispatch = useDispatch();
  const { category, checked } = useSelector((state) => state.post);
  const [filled, setFilled] = useState(true);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const ref = useRef();
  useEffect(() => {
    dispatch(fetchCategories());
    // setCategories(category);
  }, [dispatch]);
  const handleChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleCreatePost = () => {
    const data = new FormData();
    data.append("Title", title);
    data.append("Brief", summary);
    data.append("Content", content);
    data.append("idCategories", categoryId);
    data.append("FeaturedImage", files);
    if (
      title !== "" &&
      summary !== "" &&
      content.length > 0 &&
      categoryId !== "" &&
      files?.name
    ) {
      dispatch(createPost(data)).then(() => {
        // setTitle("");
        // setSummary("");
        // setContent("");
        // setCategoryId("");
        // setFiles(null);
        // ref.current.value = null;
      });
    } else {
      setFilled(false);
    }
  };
  console.log(files);
  return (
    <div className="pt-5 pl-16 ">
      <div className="text-2xl font-bold opacity-70 mb-5">Tạo Blog</div>
      <div className="mb-20">
        <div className="flex items-center h-[48px] w-[70%] border rounded-lg mb-3 bg-white">
          <input
            className={` ${
              !filled && title === "" && "border-red-400 border-[1.5px]"
            } outline-none rounded-lg h-full p-3 w-full`}
            type="text"
            placeholder="Tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center h-[48px] w-[70%] border rounded-lg mb-3 bg-white">
          <input
            className={` ${
              !filled && summary === "" && "border-red-400 border-[1.5px]"
            } outline-none rounded-lg h-full p-3 w-full`}
            type="text"
            placeholder="Tóm tắt"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
        <select
          className={` ${
            !filled && categoryId === "" && "border-red-400 border-[1.5px]"
          } flex items-center h-[48px] w-[70%] border rounded-lg mb-3 bg-white p-2 text-slate-800 cursor-pointer`}
          value={categoryId}
          onChange={handleChange}
        >
          <option disabled value="" className="text-white">
            Chọn chuyên mục
          </option>

          {category?.map((category) => (
            <option value={category.id} key={category.id}>
              {category.Categories}
            </option>
          ))}
        </select>
        {/* <Select
          defaultValue="lucy"
          style={{
            width: 200,
          }}
          onChange={handleChange}
          options={[
            {
              label: <span>manager</span>,
              title: "manager",
              options: [
                {
                  label: <span>Jack</span>,
                  value: "Jack",
                },
                {
                  label: <span>Lucy</span>,
                  value: "Lucy",
                },
              ],
            },
            {
              label: <span>engineer</span>,
              title: "engineer",
              options: [
                {
                  label: <span>Chloe</span>,
                  value: "Chloe",
                },
                {
                  label: <span>Lucas</span>,
                  value: "Lucas",
                },
              ],
            },
          ]}
        /> */}
        <div
          className={` ${
            !filled && !files?.name ? "border-red-400" : "border-teal-500"
          } flex gap-4 w-[70%] mb-3 items-center justify-between border-2 border-dotted p-3`}
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
          className="h-12 w-[70%] border rounded-xl py-2 cursor-pointer text-white text-lg text-center font-medium bg-gradient-to-r from-green-400 to-teal-500 hover:drop-shadow-lg"
        >
          Đăng
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
