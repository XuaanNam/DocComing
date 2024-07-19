import React, { useCallback, useEffect, useState,} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input } from 'antd';
import { Button } from "flowbite-react";

import { CiSearch } from "react-icons/ci";
import { searchPost } from "../redux-toolkit/postSlice";
const SearchPost = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { allSearchPost, error, loading } = useSelector((state) => state.post);
  const [search, setSearch] = useState(JSON.parse(localStorage.getItem("keyword")))
  const [keywords, setKeywords] = useState("")
  const [isSearched, setIsSearched] = useState(false)
  const keyword = JSON.parse(localStorage.getItem("keyword"));
  
  const handleSearch = () => {
    setIsSearched(true)
    dispatch(searchPost({keywords: search})).then(()=>{
      setKeywords(search)
      localStorage.setItem("keyword", JSON.stringify(search))
    })
  }
  useEffect(()=>{
    if(keyword != null){
      setIsSearched(true)
      setKeywords(keyword)
    }
  },[keyword])
  return (
    <div className="pt-[70px] max-sm:pt-[75px] min-h-screen mb-10">
        <div className="mt-16 flex justify-center items-center w-full">
            <div className="relative w-1/2 max-sm:w-full max-sm:px-5 flex items-center gap-3">
                <Input 
                    placeholder="Tìm kiếm theo triệu chứng hoặc theo bệnh" 
                    className="h-12 pl-16 rounded-lg border-slate-400"
                    value={search}
                    onChange={(e)=>{setSearch(e.target.value)}}
                    onKeyDown={(e) => { 
                        if (e.key === "Enter") 
                          handleSearch(); 
                      }} />
                <CiSearch className="h-6 w-6 font-medium text-teal-300 absolute top-[12px] left-8"></CiSearch>

                <Button onClick={handleSearch} className="h-12 w-40 p-1" type="primary">Tìm kiếm</Button>
            </div>
        </div>
        {isSearched &&
        <div className="my-8">
            <p className="text-center text-2xl font-bold">{keywords}</p>
            <p className="text-center text-lgfont-medium">{allSearchPost.length} kết quả được tìm thấy</p>
        </div>
        }
        {loading ?
        <div className="h-screen">
          <div className="spinner mt-12 mx-auto">
          </div>
        </div>
        :
        <div className="mt-2 flex flex-col gap-8 items-center justify-center w-full">
            {keywords !== "" && allSearchPost?.map((post) => 
            <div className="!flex max-sm:flex-col gap-7  cursor-pointer w-2/3 max-sm:w-[80%] max-sm:"
                 onClick={()=>{Navigate(`/blog/${post.id}`)}}>
                <img
                  className="h-[200px] w-[280px] max-sm:w-auto rounded-xl mb-2 bg-cover drop-shadow-lg"
                  src={post.FeaturedImage}
                  alt=""
                ></img>
                <div className="max-w-[700px] max-sm:mb-3">
                  <div className="text-teal-800 mb-2">{post.Similar}</div>
                  <div className="text-slate-800 text-justify text-lg font-medium mb-2">
                  {post.Title}
                  </div>
                  <div className="h-[65px] text-justify text-[15px] text-ellipsis overflow-hidden mb-6">
                  {post.Brief}
                  </div>
                  <div className="flex gap-2 text-base items-center">
                      <img
                      className="h-8 w-8 rounded-full bg-cover drop-shadow-md"
                      src={post.Avt}
                      alt=""
                      ></img>
                      <div className="font-medium max-sm:w-[60%]">
                      {post.FirstName + " " + post.LastName} 
                      </div>
                      <div className="text-gray-800 text-center">  Ngày đăng: {post?.DatePost.slice(8,10)}/{post?.DatePost.slice(5,7)}/{post?.DatePost.slice(0,4)}</div>
                  </div>
                </div>
            </div>
            )}
        </div>
        }
    </div>
  );
};

export default SearchPost;
