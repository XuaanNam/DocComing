import React, { useEffect, useState } from "react";
import {fetchCategories,getPostByCategory,getPostBySimilarCategory} from "../redux-toolkit/postSlice"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const SimilarPost = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const {cgr, similar} = useParams();
  const { category,post, error, loading } = useSelector((state) => state.post);
  let categories = []
  for (let i = 0; i < category?.length; i++)
    if(category[i].Categories === cgr)
    {   
        if(similar) {
            for(let j=0;j<category[i].Similar.length;j++) {
                if(category[i].Similar[j].SimilarCategories === similar)
                    categories.push({
                        Image: category[i].Similar[j].ImageSimilar,
                        Categories: category[i].Similar[j].SimilarCategories,
                        Description: category[i].Similar[j].DescriptionSimilar,
                        id: category[i].Similar[j].id
                    });  
            }
        }
        else
            categories.push({...category[i]});
    }
    useEffect(()=>{    
        dispatch(fetchCategories())
    },[])
    useEffect(()=>{
        for (let i = 0; i < category?.length; i++)
            if(category[i].Categories === cgr)
            {
                if(similar){
                    for(let j=0;j<category[i].Similar.length;j++)
                        if(category[i].Similar[j].SimilarCategories === similar)
                            dispatch(getPostBySimilarCategory(category[i].Similar[j].id))
                }
                else
                    dispatch(getPostByCategory(category[i].id))
            }
      },[cgr, similar])
  
  return (
    <div className="pt-[70px] min-h-screen flex justify-center">
    {loading ?
    <div className="h-screen">
        <div className="spinner mt-12 mx-auto">
        </div>
    </div>
    :
      <div className="my-4 w-[80%] max-sm:w-full p-8 rounded-xl bg-white shadow-lg">
        {similar &&
            <div className="flex gap-2 items-center mb-5">
                <Link to={`/categories/${cgr}`} className="text-slate-700 font-medium cursor-pointer">{cgr}</Link>
                <IoIosArrowForward></IoIosArrowForward>
                <Link to={`/categories/${cgr}/${similar}`} className="text-slate-700 font-medium cursor-pointer">{similar}</Link>
            </div>
        }
        <div className="flex flex-col gap-6 sm:px-40 mb-5">
            <div className="flex gap-8 max-sm:gap-4 items-center">
                <div className="h-32 w-32 max-sm:h-24 max-sm:w-24 rounded-3xl shadow-lg shadow-violet-200 bg-lime-50 flex items-center justify-center">
                    <img className="w-28 h-28" src={categories[0]?.Image} alt=""></img>
                </div>
                <p className="sm:mt-10 text-slate-600 text-2xl font-bold">{categories[0]?.Categories}</p>
            </div>
            <div className="p-5 rounded-xl shadow-lg shadow-violet-200 text-lg italic text-slate-600">{categories[0]?.Description}</div>
        </div>
        <p className="text-2xl text-slate-700 font-medium mb-5">Kiến thức chung </p>
        <div className="w-full flex max-sm:flex-col max-sm:gap-2 gap-x-7 mb-10">
          <div
            className="w-2/5 max-sm:w-full cursor-pointer"
            onClick={() => Navigate(`/blog/${post[0]?.id}`)}
            >
                <img
                className="h-72 w-full rounded-xl mb-3 bg-cover drop-shadow-lg"
                src={post[0]?.FeaturedImage}
                alt=""
                ></img>
                <div className="text-teal-500 mb-2">{post[0]?.Similar}</div>
                <div className="text-slate-800 text-xl font-medium mb-2">
                {post[0]?.Title}
                </div>
                <p className="h-[76px] text-slate-600 text-base text-justify text-ellipsis overflow-hidden mb-4">
                {post[0]?.Brief}
                </p>
                <div className="flex gap-2 text-base items-center">
                <img
                    className="h-8 w-8 rounded-full bg-cover drop-shadow-md"
                    src={post[0]?.Avt}
                    alt=""
                ></img>
                <div className="font-medium">
                    {post[0]?.FirstName + " " + post[0]?.LastName} -
                </div>
                <div>{post[0]?.DatePost?.slice(0, 10)}</div>
                </div>
          </div>
          <div className="flex flex-wrap gap-5 max-sm:gap-1 gap-y-7 w-3/5 max-sm:w-full">
            {post?.slice(1, 5).map((item) => 
            <div
                className="cursor-pointer flex flex-col gap-3 w-[48%] max-sm:w-full sm:max-h-[80%] p-3 rounded-xl shadow-md shadow-violet-200 bg-lime-50"
                onClick={() => Navigate(`/blog/${item.id}`)}
            >
                <img
                className="sm:h-48 w-full rounded-xl bg-cover drop-shadow-md"
                src={item?.FeaturedImage}
                alt=""
                ></img>
                <div className="text-teal-500">{item?.Similar}</div>
                <div className="text-slate-800 h-20 text-ellipsis overflow-hidden text-xl font-medium">
                {item?.Title}
                </div>
                <div className="flex gap-2 text-base items-center">
                    <img
                        className="h-8 w-8 rounded-full bg-cover drop-shadow-md"
                        src={item?.Avt}
                        alt=""
                    ></img>
                    <div className="font-medium">
                        {item?.FirstName + " " + item?.LastName} -
                    </div>
                    <div>{item?.DatePost?.slice(0, 10)}</div>
                </div>
            </div>
            )}
          </div>
        </div>
        {!similar &&
        <div>
            <p className="text-2xl text-slate-700 font-medium mb-4">Khám phá thêm các mục về {categories[0]?.Categories}</p>
            <div className="flex max-sm:flex-wrap max-sm:gap-1 gap-5 mb-10">
                {categories[0]?.Similar?.map((item) => 
                <Link
                    key={item.id}
                    className="w-40 min-h-40 p-3 cursor-pointer rounded-3xl bg-lime-50 shadow-xl flex flex-col items-center justify-center transition-transform duration-500 hover:scale-110"
                    to={`/categories/${categories[0]?.Categories}/${item.SimilarCategories}`}
                >
                    <img className="h-20 w-20 mb-2" alt="" src={item.ImageSimilar}></img>
                    <p className="font-medium text-gray-500 h-14 flex items-center text-center">
                    {item.SimilarCategories}
                    </p>
                </Link>
                )}
            </div>
        </div>
        }
        <p className="text-2xl text-slate-700 font-medium mb-5">Xem thêm về {similar || cgr} </p>
        {post?.slice(6).map((item) => 
        <div className="flex gap-7 mb-7 cursor-pointer w-full">
            <img
            className="h-[200px] w-[280px] rounded-xl mb-2 bg-cover drop-shadow-lg"
            src={item.FeaturedImage}
            alt=""
            ></img>
            <div className="max-w-[750px]">
                <div className="text-teal-500 mb-2">{item.Similar}</div>
                <div className="text-slate-800 text-lg font-medium mb-2 ">
                    {item.Title}
                </div>
                <div className="h-[65px] text-[15px] text-ellipsis overflow-hidden mb-5 text-justify">
                    {item.Brief}
                </div>
                <div className="flex gap-2 text-base items-center">
                    <img
                    className="h-8 w-8 rounded-full bg-cover drop-shadow-md"
                    src={item.Avt}
                    alt=""
                    ></img>
                    <div className="font-medium">
                    {item.FirstName + " " + item.LastName} -
                    </div>
                    <div> {item.DatePost?.slice(0, 10)}</div>
                </div>
            </div>
        </div>
        )}
      </div>
    }
    </div>
  );
};

export default SimilarPost;
