import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDetailPost } from "../redux-toolkit/postSlice";

const BlogPage = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { detailPost, error, loading } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getDetailPost(18));
  }, [dispatch]);
  console.log(detailPost);
  const post = detailPost[0];
  console.log(post);
  return (
    <div className="bg-white">
      <div className="mx-[48px] pt-[100px] pl-16">
        <div className="flex gap-7 pb-20">
          <div className="w-[75%]">
            <p className="h-[44px] bg-white max-w-64 flex items-center justify-center p-1 mb-5 cursor-pointer rounded-3xl  text-teal-400 font-medium drop-shadow-lg  transition-transform duration-500 hover:scale-105">
              {post?.Categories}
            </p>
            <div className="mb-5">
              {/* Bệnh tiêu hóa {">"} Các vấn đề tiêu hóa khác */}
            </div>
            <div className="text-4xl font-bold text-slate-800 w-full mb-5">
              {post?.Title}
            </div>
            <div>
              <img
                className="rounded-lg h-[450px] w-full object-cover mb-3 shadow-lg"
                src={post?.FeaturedImage}
                alt=""
              ></img>
            </div>
            <p className="text-lg text-slate-700 font-bold mb-3">
              {post?.Brief}
            </p>
            {/* <div className="text-lg mb-3 text-justify">{post?.Content}</div> */}
            <div
              className="text-lg mb-3 text-justify"
              dangerouslySetInnerHTML={{ __html: post?.Content }}
            />
          </div>

          <div className="bg-white border rounded-xl drop-shadow-lg w-[25%] max-h-[180px] px-2 grid grid-rows-3 justify-items-center">
            <img
              className="rounded-full w-[60px] h-[60px] mt-2 object-contain drop-shadow-sm"
              src={require("../Images/doctor1.jpg")}
              alt=""
            ></img>
            <div className="grid place-items-center py-2">
              <span className="">Tác giả:</span>
              <div className="text-slate-800 text-lg font-medium">
                {post?.FirstName + " " + post?.LastName}
              </div>
            </div>
            <div className="grid place-items-center w-full py-2">
              <hr className="w-[90%]"></hr>
              <div className="text-sm text-center">
                <div>Ngày đăng: {post?.DatePost.slice(0, 10)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
