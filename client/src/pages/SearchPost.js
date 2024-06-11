import React, { useCallback, useEffect, useState,} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input } from 'antd';
import { Button } from "flowbite-react";

import { CiSearch } from "react-icons/ci";
import { searchPost } from "../redux-toolkit/postSlice";
const SearchPost = () => {
  const dispatch = useDispatch();
  const { allSearchPost, error, loading } = useSelector((state) => state.post);
  const [search, setSearch] = useState("")
  const [keywords, setKeywords] = useState("")
  const [isSearched, setIsSearched] = useState(false)
  const keyword = JSON.parse(localStorage.getItem("keyword"));

  const handleSearch = () => {
    setIsSearched(true)
    dispatch(searchPost({keywords: search})).then(()=>{
        setKeywords(search)
    })
  }
  useEffect(()=>{
    if(allSearchPost.length > 0)
    {
        setIsSearched(true)
        setKeywords(keyword)
        // localStorage.removeItem('keyword')
    }   
  },[keyword,allSearchPost.length])
  console.log(keywords)
  return (
    <div className="pt-[70px] min-h-screen mb-10">
        <div className="mt-16 flex justify-center items-center w-full">
            <div className="relative w-1/2 flex gap-3">
                <Input 
                    placeholder="Tìm kiếm theo triệu chứng hoặc theo bệnh" 
                    className="h-12 pl-14 rounded-lg border-slate-400"
                    value={search}
                    onChange={(e)=>{setSearch(e.target.value)}}
                    onKeyDown={(e) => { 
                        if (e.key === "Enter") 
                          handleSearch(); 
                      }} />
                <CiSearch className="h-7 w-7 absolute top-[10px] left-4"></CiSearch>
                <Button onClick={handleSearch} className="h-12 w-40 p-1" type="primary">Tìm kiếm</Button>
            </div>
        </div>
        {isSearched &&
        <div className="my-8">
            <p className="text-center text-2xl font-bold text-slate-600">{keywords}</p>
            <p className="text-center text-lg text-slate-500 font-medium">{allSearchPost.length} kết quả được tìm thấy</p>
        </div>
        }
        <div className="mt-2 flex flex-col gap-8 items-center justify-center w-full">
            {keywords !== "" && allSearchPost?.map((post) => 
            <div className="!flex gap-7 cursor-pointer w-2/3">
                <img
                className="h-[200px] w-[280px] rounded-xl mb-2 bg-cover drop-shadow-lg"
                src={post.FeaturedImage}
                alt=""
                ></img>
                <div className="max-w-[700px]">
                <div className="text-teal-500 mb-2">{post.Similar}</div>
                <div className="text-slate-800 text-lg font-medium mb-2">
                {post.Title}
                </div>
                <div className="h-[65px] text-[15px] text-ellipsis overflow-hidden mb-6">
                {post.Brief}
                </div>
                <div className="flex gap-2 text-base items-center">
                    <img
                    className="h-8 w-8 rounded-full bg-cover drop-shadow-md"
                    src={post.Avt}
                    alt=""
                    ></img>
                    <div className="font-medium">
                    {post.FirstName + " " + post.LastName} -
                    </div>
                    <div> Ngày đăng: {post.DatePost?.slice(0, 10)}</div>
                </div>
                </div>
            </div>
            )}
        </div>
    </div>
  );
};

export default SearchPost;
