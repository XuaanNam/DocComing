import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailPost, fetchComment, createComment, updateComment, deleteComment,likeComment } from "../redux-toolkit/postSlice";
import { BsSendArrowUpFill } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { FaRegHeart,FaHeart,FaRegCommentDots } from "react-icons/fa";

import { Input } from 'antd';
import { Button } from "flowbite-react";
const { TextArea } = Input;

const BlogPage = () => {
  const { currentUser, auth, user } = useSelector(
    (state) => state.user
  );
  const { detailPost,SimilarDoctor, comment, error, loading } = useSelector((state) => state.post);
  const { blogId } = useParams();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [cmtData, setCmtData] = useState("");
  const [repCmtData, setRepCmtData] = useState("");
  const [settingCmt, setSettingCmt] = useState(0)
  const [settingRepCmt, setSettingRepCmt] = useState(0)
  const [idComment, setIdComment] = useState(0)
  const [update,setUpdate] = useState("")
  const [status,setStatus] = useState("CMT")
  const [reply, setReply] = useState(0);
  const path = (name, id) => {
    const x = name + "_" + id;
    return x;
  };
  console.log(SimilarDoctor)
  useEffect(() => {
    const data = {
      idPost: blogId,
      idAccount: currentUser?.id || null,  
    }
    dispatch(getDetailPost(blogId));
    dispatch(fetchComment(data))
  }, [dispatch,blogId]);
  const handleAction = (id) => {
    if(currentUser)
      setReply(id);
    else{
      Navigate("/login")
      localStorage.setItem("blog", JSON.stringify(blogId))
    }
  } 
  const handleLike = ({id,status,idAccount}) => {
    if(currentUser)
    {
      const data = {
        id : id,
        Status: status,
        idPost: blogId,
      }
      dispatch(likeComment(data)).then(()=>{
        const data = {
          idPost: blogId,
          idAccount: currentUser?.id,  
        }
        dispatch(fetchComment(data))
      })
    }
    else{
      Navigate("/login")
      localStorage.setItem("blog", JSON.stringify(blogId))
    }
  }
  const handleCreateComment = () => {
    const data = {
      id : reply !== 0 ? reply : blogId,
      Cmt : reply !== 0 ? repCmtData : cmtData,
      Status: status,
    }
    dispatch(createComment(data)).then(()=>{
      const data = {
        idPost: blogId,
        idAccount: currentUser?.id,  
      }
      dispatch(fetchComment(data))
      setIdComment(0)
      setStatus("CMT")
      setCmtData("")
      setRepCmtData("")
      setReply(0)
    })
  }
  const handleUpdateComment = () => {
    const data = {
      id : idComment,
      Cmt : update,
      Status: status
    }
    dispatch(updateComment(data)).then(()=>{
      const data = {
        idPost: blogId,
        idAccount: currentUser?.id,  
      }
      dispatch(fetchComment(data))
      setSettingRepCmt(0)
      setSettingCmt(0)
      setIdComment(0)
      setStatus("CMT")
    })
  }
  const handleDeleteComment = () => {
    let id = settingCmt
    if(status === "REP")
      id = settingRepCmt
    let data = {
      id : id,
      Status: status
    }
    dispatch(deleteComment(data)).then(()=>{
      const data = {
        idPost: blogId,
        idAccount: currentUser?.id,  
      }
      dispatch(fetchComment(data))
      setSettingRepCmt(0)
      setSettingCmt(0)
      setStatus("CMT")
    })
  }
  const handleNavigate = (firstName,lastName,id) => {
    if(id !== 235523484)
      Navigate(`/doctors/${path(firstName + " " + lastName,id)}`)
  }
  return (
    <div className="relative bg-white">
      {(settingCmt !== 0 || settingRepCmt !== 0) && (
        <div
          className="absolute h-full w-full overlay"
          onClick={() => {
            setSettingCmt(0);
            setSettingRepCmt(0);
          }}
        ></div>
      )}
      <div className="lg:mx-[48px] max-lg:pt-[80px] lg:pt-[100px] lg:pl-16">
        <div className="lg:flex lg:gap-7 pb-20 max-lg:px-7">
          <div className="lg:w-[75%] ">
            <div className="h-10 max-lg:mx-auto max-lg:mt-7 bg-gray-50 w-32 max-w-64 flex items-center justify-center p-1 mb-5 rounded-3xl  text-teal-400 font-medium drop-shadow-lg"
            >
              {detailPost[0]?.Classify}
            </div>
            <div className="h-[44px] max-lg:mx-auto max-lg:mt-7 bg-white max-w-64 flex items-center justify-center p-1 mb-5 cursor-pointer rounded-3xl  text-teal-400 font-medium drop-shadow-lg  transition-transform duration-500 hover:scale-105"
               onClick={()=>Navigate(`/categories/${detailPost[0]?.Similar}`)}
            >
              {detailPost[0]?.Similar}
            </div> 
            <div className="text-4xl max-lg:text-3xl font-bold text-slate-800 w-full mb-5">
              {detailPost[0]?.Title}
            </div>
            <div>
              <img
                className="rounded-lg h-[450px] w-full object-cover mb-3 shadow-lg"
                src={detailPost[0]?.FeaturedImage}
                alt=""
              ></img>
            </div>
            <p className="text-lg text-slate-700 font-bold mb-3">
              {detailPost[0]?.Brief}
            </p>
            <div
              className="text-lg mb-3 text-justify content"
              dangerouslySetInnerHTML={{ __html: detailPost[0]?.Content }}
            />
            <div className="max-lg:my-5 w-full bg-lime-50 shadow-lg shadow-violet-200 rounded-xl p-5">
              
              <p className="font-medium text-lg text-slate-700 mb-5">Bình luận</p>
              {currentUser ? 
              <div>
                <TextArea className="p-3 mb-3" placeholder="Nhập bình luận" value={cmtData} onChange={(e) => {setStatus("CMT");setReply(0);setCmtData(e.target.value)}}></TextArea>
                <Button className="w-32 mb-5" type="primary" disabled={cmtData === ""} onClick={()=>{handleCreateComment()}}>
                  Đăng
                </Button>
              </div>
              :
              <p className="text-xl mb-5 italic">Vui lòng đăng nhập để bình luận</p>
              }
              <div className="w-full bg-white shadow-lg shadow-violet-200 rounded-xl p-5">
              {comment?.map((cmt) => 
                <div className="mb-5">
                  <div className="flex gap-4 items-center mb-3">
                    <img
                      className="h-12 w-12 rounded-full object-cover drop-shadow-md"
                      src={cmt.Avt !== null ? cmt.Avt : require("../Images/pattientavt.png")}
                      alt=""
                    ></img>
                    <div className="flex flex-col gap-1 w-96">
                      <div className="font-medium text-lg">
                        {cmt.FirstName + " " + cmt.LastName}
                      </div>
                      <div>{cmt.CmtTime}</div>
                    </div>
                    {cmt.idAccount === currentUser?.id &&
                    <div className="relative w-full">
                      <CiSettings className="absolute right-10 h-6 w-6 cursor-pointer" onClick={()=>{setStatus("CMT");setSettingCmt(cmt.id);setSettingRepCmt(0);setUpdate("")}}/>
                      {settingCmt === cmt.id &&
                      <div className="absolute right-20 flex flex-col gap-2 p-3 w-40 bg-slate-200 shadow-md shadow-violet-200 rounded-xl">
                        <div className="bg-white p-2 rounded-lg hover:bg-slate-100 text-center cursor-pointer" onClick={handleDeleteComment}>Xóa</div>
                        <div className="bg-white p-2 rounded-lg hover:bg-slate-100 text-center cursor-pointer" 
                          onClick={() => {setIdComment(cmt.id); setSettingCmt(0); setUpdate(cmt.Cmt)}}>
                            Chỉnh sửa
                        </div>
                      </div>
                      }
                    </div>
                    }                   
                  </div>
                  {idComment === cmt.id && status === "CMT"?
                  <div>
                    <Input className="mb-2 text-lg rounded-lg p-2" value={update} onChange={(e)=>{setUpdate(e.target.value)}}></Input>
                    <div className="flex gap-3 mb-2">
                      <Button gradientMonochrome="info" className="w-28 h-9 p-0" disabled={update === "" || update === cmt.Cmt} 
                        onClick={handleUpdateComment}>
                          xác nhận
                      </Button>
                      <Button gradientMonochrome="failure" className="w-20 h-9 p-0" onClick={()=>{setIdComment(0)}}>Hủy</Button>
                    </div>
                  </div>
                  :
                  <p className="mb-2 text-lg">{cmt.Cmt}</p>  
                  }
                  <div className="flex gap-5 mb-4">
                    <div className="flex gap-2">
                      {cmt.IsLoved ? 
                          <FaHeart className="cursor-pointer w-5 h-5 text-rose-500 transition-full" onClick={()=>{handleLike({id:cmt.id, status: "CMT", idAccount: cmt.idAccount})}}></FaHeart>
                          :
                          <FaRegHeart className="cursor-pointer w-5 h-5 text-gray-600 transition-full" onClick={()=>{handleLike({id:cmt.id, status: "CMT", idAccount: cmt.idAccount})}}></FaRegHeart>
                          } 
                      <p>{cmt.Love}</p>
                    </div>
                    <div className="w-full">
                      <FaRegCommentDots className="cursor-pointer w-5 h-6 text-slate-600" onClick={()=>{handleAction(cmt.id); setStatus("REP")}}></FaRegCommentDots>
                      {cmt.RepComment?.map((replyCmt) => 
                      <div className="flex flex-col gap-2 mt-3">
                        <div className="flex gap-4 text-base items-center">
                          <img
                            className="h-10 w-10 rounded-full object-cover drop-shadow-md"
                            src={replyCmt.repAvt !== null ? replyCmt.repAvt : require("../Images/pattientavt.png")}
                            alt=""
                          ></img>
                          <div className="flex flex-col gap-1 w-96">
                            <div className="font-medium text-lg">
                              {replyCmt.repFirstName + " " + replyCmt.repLastName}
                            </div>
                            <div>{replyCmt.repCmtTime}</div>
                          </div>
                          {replyCmt.repidAccount === currentUser?.id &&
                            <div className="relative w-full">
                              <CiSettings className="absolute right-10 h-6 w-6 cursor-pointer" onClick={()=>{setStatus("REP");setSettingRepCmt(replyCmt.repid);setSettingCmt(0);setUpdate("")}}/>
                              {settingRepCmt === replyCmt.repid &&
                              <div className="absolute right-20 flex flex-col gap-2 p-3 w-40 bg-slate-200 shadow-md shadow-violet-200 rounded-xl">
                                <div className="bg-white p-2 rounded-lg hover:bg-slate-100 text-center cursor-pointer" onClick={handleDeleteComment}>Xóa</div>
                                <div className="bg-white p-2 rounded-lg hover:bg-slate-100 text-center cursor-pointer" 
                                  onClick={() => {setIdComment(replyCmt.repid); setSettingRepCmt(0); setUpdate(replyCmt.repCmt)}}>
                                    Chỉnh sửa
                                </div>
                              </div>
                              }
                            </div>
                            }
                        </div>
                        {idComment === replyCmt.repid && status === "REP"?
                        <div>
                          <Input className="mb-2 text-lg rounded-lg p-2" value={update} onChange={(e)=>{setUpdate(e.target.value)}}></Input>
                          <div className="flex gap-3 mb-2">
                            <Button gradientMonochrome="info" className="w-28 h-9 p-0" disabled={update === "" || update === replyCmt.repCmt} 
                              onClick={handleUpdateComment}>
                                xác nhận
                            </Button>
                            <Button gradientMonochrome="failure" className="w-20 h-9 p-0" onClick={()=>{setIdComment(0)}}>Hủy</Button>
                          </div>
                        </div>
                        :
                        <p className="mb-2 text-lg">{replyCmt.repCmt}</p>  
                        }
                        <div className="flex gap-2">
                          {replyCmt.repIsLoved ? 
                          <FaHeart className="cursor-pointer w-5 h-5 text-rose-500 transition-full" onClick={()=>{handleLike({id:replyCmt.repid, status: "REP", idAccount: replyCmt.repidAccount})}}></FaHeart>
                          :
                          <FaRegHeart className="cursor-pointer w-5 h-5 text-gray-700 transition-full" onClick={()=>{handleLike({id:replyCmt.repid, status: "REP", idAccount: replyCmt.repidAccount})}}></FaRegHeart>
                          } 
                          <p>{replyCmt.repLove}</p>
                        </div>
                        <hr className="w-80"></hr>
                      </div>
                      )}
                      {reply === cmt.id && 
                      <div className="relative w-full mt-3 flex gap-3 items-center justify-center">
                        <img className="h-10 w-10 rounded-full object-cover drop-shadow-md" src={user?.data?.Avt || require("../Images/pattientavt.png")} alt=""></img>
                        <TextArea className="rounded-xl p-3 " placeholder="Nhập bình luận" value={repCmtData} onChange={(e) => setRepCmtData(e.target.value)}></TextArea>
                        <div className="absolute w-10 h-10 cursor-pointer right-20 flex items-center justify-center">
                          <BsSendArrowUpFill className="text-blue-500 rotate-45 h-6 w-6 " disabled={cmt === ""} onClick={handleCreateComment}></BsSendArrowUpFill>
                        </div>
                        <IoIosCloseCircleOutline className="h-8 w-8 text-red-400 cursor-pointer" onClick={()=>{setReply(0)}}/>
                      </div>
                      }
                    </div>
                  </div>
                  <hr className="w-full"></hr>
                </div>
              )}
              </div>  
            </div>
          </div>
          <div className="w-[25%]">
            <div className="max-lg:my-7 max-lg:w-full w-full mb-8 bg-white hover:bg-slate-50 cursor-pointer border rounded-xl drop-shadow-lg p-2 grid grid-rows-3 justify-items-center"
                 onClick={() => handleNavigate(detailPost[0]?.FirstName,detailPost[0]?.LastName,detailPost[0]?.idAuthor)}>
              <img
                className="rounded-full w-[60px] h-[60px] object-contain drop-shadow-sm"
                src={detailPost[0]?.Avt || require("../Images/pattientavt.png")}
                alt=""
              ></img>
              <div className="grid place-items-center">
                <span className="">Tác giả:</span>
                <div className="text-slate-800 text-lg font-medium">
                  {detailPost[0]?.FirstName + " " + detailPost[0]?.LastName}
                </div>
              </div>
              <div className="grid place-items-center w-full">
                <hr className="w-[90%]"></hr>
                <div className="text-sm text-center">
                  <div>Ngày đăng: {detailPost[0]?.DatePost.slice(0, 10)}</div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="text-xl font-medium text-black italic mb-4">Bác sĩ điều trị</div>
              {SimilarDoctor?.map((item) =>
              <div className="bg-white hover:bg-slate-50 cursor-pointer rounded-xl shadow-md p-4 flex gap-2 items-center"
                  onClick={()=> Navigate(`/doctors/${path(item.FirstName + " " + item.LastName,item.id)}`)}
              >
                <img
                  className="rounded-full w-14 h-14 object-contain drop-shadow-sm"
                  src={item.Avt}
                  alt=""
                ></img>
                <div>
                  <div className="font-medium  text-lg">{item.FirstName + " " + item.LastName}</div>
                  <div className="flex gap-1">
                    Chuyên khoa: <p className="font-medium">{detailPost[0]?.Major}</p>
                  </div>
                  <div>{item.Experience}</div>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
