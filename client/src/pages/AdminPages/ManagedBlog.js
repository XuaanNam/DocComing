import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Editor from "./Editor";

const ManagedBlog = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  return (
    <div className="p-5">
      {/* <form onSubmit={createNewPost}> */}
      <div className="text-2xl font-bold opacity-70 mb-5">Tạo Blog</div>
      <form className="">
        <div className="flex items-center p-3 h-[48px] w-[70%] border rounded-lg mb-3 bg-white">
          <input
            className="outline-none rounded-lg w-full"
            type="text"
            placeholder="Tiêu đề"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </div>
        <div className="flex items-center p-3 h-[48px] w-[70%] border rounded-lg mb-3 bg-white">
          <input
            className="outline-none rounded-lg w-full"
            type="text"
            placeholder="Tóm tắt"
            value={summary}
            onChange={(ev) => setSummary(ev.target.value)}
          />
        </div>
        <div className="flex items-center p-3 h-[48px] w-[70%] border rounded-lg mb-3 bg-white">
          <input
            className="outline-none w-full"
            type="file"
            onChange={(ev) => setFiles(ev.target.files)}
          />
        </div>
        <Editor value={content} onChange={setContent} />
        <button className="h-12 w-[70%] border rounded-xl py-2 cursor-pointer text-white text-lg text-center font-medium bg-gradient-to-r from-green-400 to-teal-500 hover:drop-shadow-lg">
          Đăng
        </button>
      </form>
    </div>
  );
};

export default ManagedBlog;
