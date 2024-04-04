import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Editor from "./Editor";

const ManagedBlog = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  // const [redirect, setRedirect] = useState(false);
  const createPost = (ev) => {
    ev.preventDefault();
    const data = {
      title: title,
      summary: summary,
      content: content,
      files: files[0],
    };
    console.log(data);
  };
  const content1 = "";
  return (
    <div className="p-5">
      <div className="text-2xl font-bold opacity-70 mb-5">Tạo Blog</div>
      <form onSubmit={createPost} className="">
        <div className="flex items-center h-[48px] w-[70%] border rounded-lg mb-3 bg-white">
          <input
            className="outline-none rounded-lg h-full p-3 w-full"
            type="text"
            placeholder="Tiêu đề"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </div>
        <div className="flex items-center h-[48px] w-[70%] border rounded-lg mb-3 bg-white">
          <input
            className="outline-none rounded-lg h-full p-3 w-full"
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
        {content && (
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </form>
    </div>
  );
};

export default ManagedBlog;
