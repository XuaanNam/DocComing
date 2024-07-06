import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegCalendarPlus, FaHome } from "react-icons/fa";
import { RiServiceFill } from "react-icons/ri";
import { BsCash } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { TbFileDescription } from "react-icons/tb";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { MdOutlineNoteAlt } from "react-icons/md";
import { Modal, Button } from "flowbite-react";
import { Rate, Input, Badge, Calendar } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointment,cancelAppointment, ratingDoctor,
  updateRatingDoctor,
  acceptNoteAppointment,
  cancelNoteAppointment,
  createAppointment,
} from "../../redux-toolkit/appointmentSlice";
import { getAllNotification } from "../../redux-toolkit/authSlice";

const { TextArea } = Input;
const description = ['Quá tệ', 'Chưa tốt', 'Bình thường', 'Tốt', 'Tuyệt vời'];

const Appointment = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { AppointmentData, healthRecordData, error, loading } = useSelector((state) => state.appointment);
  const { currentUser,allNoti} = useSelector((state) => state.user);  
  const [showModal, setShowModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [passed, setPassed] = useState(1);
  const [idAppointment, setIdAppointment] = useState();
  const [idDoctor, setIdDoctor] = useState();
  const [rating,setRating] = useState(0)
  const [comment,setComment] = useState("")
  const [isRated,setIsRated] = useState(false)
  const [editRating,setEditRating] = useState(0)
  
  useEffect(() => {
    dispatch(fetchAppointment());
  }, []);
  useEffect(() => {
    if (currentUser) {
      if (currentUser.authentication != 1) Navigate("/");
    } else Navigate("/");
  }, [currentUser]);
  const handleRatingDoctor = () => {
    const data = {
      idAppointment,
      Star: rating,
      Comment: comment,
    }
    dispatch(ratingDoctor(data)).then(() => {
      setComment("")
      setRating(0)
      setIsRated(true)
      dispatch(fetchAppointment());
    })
  }

  const handleUpdateRatingDoctor = ({id,iddoctor}) => {
    const data = {
      idAppointment: id,
      Star: rating,
      Comment: comment,
    }
    dispatch(updateRatingDoctor(data)).then(() => {
      setComment("")
      setRating(0)
      setEditRating(0)
      dispatch(fetchAppointment());
    })
  }

  const handleCancelAppointment = (id) => {
    const data = { id, idAccount: idDoctor };
    dispatch(cancelAppointment(data)).then(() => {
      dispatch(getAllNotification())
      dispatch(fetchAppointment());
    });
    setShowModal(false);
  };
  const handleAcceptNoteAppointment = ({idAppointment,idService,idDoctor,Price,DateBooking,TimeBooking,Information}) => {
    const body = {
      idService,
      idDoctor,
      Price,
      DateBooking,
      TimeBooking,
      Information,
    };
    dispatch(createAppointment(body))
    dispatch(acceptNoteAppointment({idAppointment})).then(() => {
      dispatch(getAllNotification())
      dispatch(fetchAppointment());
    });
  };
  const handleCancelNoteAppointment = (idAppointment) => {
    dispatch(cancelNoteAppointment({idAppointment})).then(() => {
      dispatch(getAllNotification())
      dispatch(fetchAppointment());
    });
  };
  let appointment = [];
  for (let i = 0; i < AppointmentData?.length; i++) {
    if (AppointmentData[i].Status === passed)
      appointment.push({ ...AppointmentData[i] });
    if (AppointmentData[i].Status === 4 && passed === 1)
      appointment.push({ ...AppointmentData[i] });
    if (AppointmentData[i].Status === 3 && passed === 2)
      appointment.push({ ...AppointmentData[i] });
  }

  const getListData = (value) => {
    let listData = [];
    for (let i = 0; i < AppointmentData?.length; i++) {
      let db = AppointmentData[i]?.DateBooking?.split("/");
      if (
        value.date() == db[0] &&
        value.month() + 1 == db[1] &&
        value.year() == db[2]
      ) {
        listData = [
          ...listData,
          {
            type: AppointmentData[i].Type,
            content: AppointmentData[i].TimeBooking + " - " + AppointmentData[i].Service,
          },
        ];
      }
    }
    return listData || [];
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };
  return (
    <div className="">
        <div className="my-7 lg:w-full max-lg:h-full max-lg:px-3 rounded-xl bg-white shadow-lg text-slate-600 shadow-violet-200 py-5 lg:px-8">
          <div className="mb-5 h-10 grid grid-cols-5 max-lg:grid-cols-10 gap-3 font-semibold">
            <p className="text-2xl lg:col-span-2 max-lg:col-start-1 max-lg:col-span-4">Lịch khám</p>
            <div
              onClick={() => {
                setPassed(0);
              }}
              className={` ${
                passed === 0 && "bg-white shadow-md shadow-violet-300"
              } col-start-3 max-lg:col-start-4 max-lg:col-span-3 rounded-lg text-center hover:bg-slate-50 cursor-pointer py-2 w-full h-full`}
            >
              TỔNG QUÁT
            </div>
            <div
              onClick={() => {
                setPassed(1);
              }}
              className={` ${
                passed === 1 && "bg-white shadow-md shadow-violet-300"
              } col-start-4 max-lg:col-start-5 max-lg:col-span-3 rounded-lg text-center hover:bg-slate-50 cursor-pointer py-2 w-full h-full`}
            >
              SẮP TỚI
            </div>
            <div
              onClick={() => {
                setPassed(2);
              }}
              className={` ${
                passed === 2 && "bg-white shadow-md shadow-violet-300"
              } col-start-5 max-lg:col-start-8 max-lg:col-span-3 rounded-lg text-center hover:bg-slate-50 cursor-pointer py-2 w-full h-full`}
            >
              ĐÃ QUA
            </div>
          </div>
          {passed === 0 ?
            <Calendar
              className="shadow-lg shadow-blue-300 p-3 rounded-lg border font-medium"
              cellRender={cellRender}
            />
          :
          appointment?.length > 0 ? (
            appointment?.map((appointment) => (
            <div key={appointment.id} className="w-full rounded-xl shadow-lg mb-5 border">
              <div className="p-1 rounded-t-xl bg-teal-200 w-full h-10 grid grid-cols-3 place-items-center">
                <div className="max-lg:text-base lg:text-lg font-medium">{appointment.TimeBooking}</div>
                <div className="max-lg:text-base lg:text-lg font-medium flex gap-2 items-center">
                  <FaRegCalendarPlus />
                  <div>{appointment.DateBooking}</div>
                </div>
                <div className={` ${appointment.Status == 3 ? "text-red-500" : appointment.Status == 2 && "text-green-500"} max-lg:text-base lg:text-lg font-medium`}>
                    {appointment.Status == 1
                      ? "Đã xác nhận"
                      : appointment.Status == 4
                      ? "Chưa xác nhận"
                      : appointment.Status == 2
                      ? "Đã hoàn thành"
                      : appointment.Status == 3 && "Đã hủy"}
                  </div>
              </div>
              <div className="p-5">
                <div className="lg:flex lg:gap-5">
                  <img
                    className="h-14 w-14 rounded-full object-contain border border-lime-200"
                    alt=""
                    src={appointment.Avt !== null ? appointment.Avt : require("../../Images/pattientavt.png")}
                  ></img>              
                  <div className="w-[90%]">
                    <div className="relative flex items-center">
                    <p className="font-medium lg:text-lg max-lg:mt-3 max-lg:text-base text-gray-600 mb-3">
                      {appointment.FirstName + " " + appointment.LastName}
                    </p>
                    {appointment.Status === 2 && appointment.Star === null && 
                      <Button
                        outline 
                        size="xs"
                        gradientDuoTone="tealToLime"
                        className="w-28 absolute right-0"
                        onClick={() => {
                          setShowRatingModal(true);
                          setIdAppointment(appointment.id);
                        }}
                      >
                        Đánh giá
                      </Button>
                    }
                    </div>
                    <div className="lg:flex w-full gap-10 mb-3">
                      <div className="flex gap-2 items-center max-lg:mb-3 lg:w-1/2">
                        <RiServiceFill className="h-5 min-w-5 text-red-500"></RiServiceFill>
                        <p>Dịch vụ:</p>
                        <p className="font-medium">{appointment.Service}</p>
                      </div>
                      <div className="flex gap-2 items-center lg:w-1/2">
                        <BsCash className="h-5 min-w-5 text-green-400"></BsCash>
                        <p>Giá dịch vụ:</p>
                        <p className="font-medium text-green-400">{appointment.Price} đ</p>
                      </div>
                    </div>
                    
                    <div className="lg:flex w-full gap-10 mb-3">
                      <div className="flex gap-2 items-center max-lg:mb-3 lg:w-1/2">
                        <FaHome className="h-5 min-w-5 text-teal-600" />
                        <p>Nơi khám:</p>
                        <div className="font-medium">
                          Khám tại nhà
                        </div>
                      </div>
                      <div className="flex gap-2 items-center lg:w-1/2">
                        <FaPhoneAlt className="h-4 min-w-5 text-teal-600" />
                        <p>Số điện thoại:</p>
                        <div className="font-medium text-teal-500">{appointment.Phone}</div>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center mb-3">
                        <TbFileDescription className="h-5 min-w-5 text-teal-600" />
                        <p className="min-w-fit">Triệu chứng:</p>
                        <div className="font-medium text-red-500">
                          {appointment.Information}
                        </div>
                    </div>
                    {appointment?.Advice &&
                      <div className="flex gap-2 mb-3">
                        <MdOutlineNoteAlt className="h-5 mt-1 min-w-5 text-teal-600" />
                        <p className="font-medium min-w-fit">Dặn dò của bác sĩ:</p>
                        <div className="font-medium italic text-red-500">
                          {appointment.Advice}
                        </div>                  
                      </div>
                    }
                  </div>     
                </div>
                {appointment.Status === 2 && (
                  <div className="flex flex-col gap-4">
                    {appointment.NoteRecord !== null && appointment.ReExaminationDate !== null &&
                      <hr className="w-[98%] mx-auto border-[1px] border-lime-50 rounded-lg"></hr>
                    }
                    <div className="grid grid-cols-2 gap-5">
                      {appointment.NoteRecord !== null && 
                        <div className="flex flex-col col-start-1 gap-3 h-full w-full p-4 bg-white shadow-md shadow-violet-200 rounded-lg">
                          <p className="font-medium text-black text-lg w-1/2">Bệnh án</p>   
                          <div className="flex gap-3">
                            <div className="flex flex-col gap-1 w-full">
                              <p>Chẩn đoán: <span className="text-teal-600 font-medium">{appointment.Record}</span></p>
                              <p>Mô tả: <span className="text-teal-600 font-medium">{appointment.NoteRecord}</span></p>
                            </div>
                          </div>
                        </div>
                      }
                      {appointment.ReExaminationDate !== null &&
                        <div className="w-full flex flex-col self-end gap-3">
                          <div className="flex flex-col col-start-2 gap-3 h-full w-full p-4 bg-white shadow-md shadow-violet-200 rounded-lg">
                            <div className="flex items-center">
                              <p className="font-medium text-black text-lg w-1/2">Lịch hẹn tái khám từ bác sĩ</p>
                              {appointment.NoteStatus === 1 && 
                                <div className="w-1/2 mr-4 flex justify-end text-green-500 font-medium">Đã xác nhận</div>
                              }
                              {appointment.NoteStatus === 2 && 
                                <div className="w-1/2 mr-4 flex justify-end text-rose-500 font-medium">Đã hủy</div>
                              }
                            </div>
                            <div className="flex gap-3">
                              <div className="flex flex-col gap-1 w-3/4">
                                <p>Ngày tái khám: <span className="text-green-500 font-medium">{appointment.ReExaminationDate.slice(0,10)}</span></p>
                                <p>Thời gian: <span className="text-green-500 font-medium">{appointment.ReExaminationDate.slice(11,16)}</span></p>
                                <p>Chi phí dự kiến: <span className="text-green-500 font-medium">{appointment.ReExaminationPrice} đ</span></p>
                              </div>
                              {(appointment.NoteStatus !== 1 && appointment.NoteStatus !== 2) &&
                              <div className="flex flex-col gap-3 w-1/4">
                                <Button className="h-8 w-24 p-0" size="sm" gradientDuoTone="tealToLime"
                                onClick={()=>{handleAcceptNoteAppointment({idAppointment: appointment.id,idService: appointment.idService,idDoctor: appointment.idDoctor, Price: appointment.ReExaminationPrice,DateBooking: appointment.ReExaminationDate.slice(0,10),TimeBooking: appointment.ReExaminationDate.slice(11,16),Information: appointment.Information})}}>Đồng ý</Button>
                                <Button className="h-8 w-24 p-0" size="sm" gradientDuoTone="pinkToOrange" onClick={()=>{handleCancelNoteAppointment(appointment.id)}}>Từ chối</Button>
                              </div>
                              }
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                    {appointment.Star !== null &&
                    <div className="relative">
                      <hr className="w-[98%] mx-auto mb-3 border-[1px] border-lime-50 rounded-lg"></hr>
                      {editRating === appointment.id ?
                      <div className="flex flex-col items-center justify-center">
                        <Rate className="w-fit flex gap-2"
                              value={rating}
                              style={{ fontSize: 24}}
                              tooltips={description}
                              onChange={(value)=>{setRating(value)}}>
                        </Rate>
                        <Input
                          maxLength={100}
                          value={comment}
                          onChange={(e) =>{setComment(e.target.value)}}
                          className="p-3 text-slate-600 mt-2 h-10 w-3/4 rounded-lg"
                        />
                        <div className="flex absolute top-0 right-0 text-sm ">
                        <p className="cursor-pointer text-center w-16 h-8 py-1 px-2 rounded-lg hover:bg-slate-100"
                          onClick={()=>{setEditRating(0);setComment("");setRating(0)}}>Hủy
                        </p>
                        <p className="cursor-pointer text-center w-24 h-8 py-1 px-2 rounded-lg hover:bg-slate-100"
                          onClick={()=>{handleUpdateRatingDoctor({id: appointment.id})}}>Xác nhận
                        </p>
                        </div>
                      </div>
                      :
                      <div className="flex flex-col items-center justify-center">
                        <Rate className="w-fit flex gap-2"
                              value={appointment.Star}
                              style={{ fontSize: 24}}
                              disabled={true}
                        ></Rate>
                        <p className="text-lg text-slate-600 mt-2">{appointment.Comment}</p>
                        <p className="absolute top-3 right-0 text-sm cursor-pointer text-center w-24 h-8 py-1 px-2 rounded-lg hover:bg-slate-100"
                          onClick={()=>{setEditRating(appointment.id);setComment(appointment.Comment);setRating(appointment.Star)}}>Chỉnh sửa
                        </p>
                      </div>
                      } 
                    </div>
                    }
                  </div>
                )}
                {appointment.Status !== 2 && appointment.Status !== 3 && (
                  <Button
                    className="w-40 mx-auto rounded-2xl"
                    gradientMonochrome="failure"
                    onClick={() => {
                      setShowModal(true);
                      setIdAppointment(appointment.id);
                      setIdDoctor(appointment.idDoctor)
                    }}
                  >
                    Hủy
                  </Button>
                )}
              </div>
            </div>
            ))
          ) : (
            <p className="py-10 w-full text-center text-2xl font-medium">
              Bạn chưa có cuộc hẹn mới
            </p>
          )
          }
        </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Bạn chắc chắn muốn hủy cuộc hẹn này chứ?
            </h3>
            <div className="flex justify-center gap-10 transition-all">
              <Button
                className="w-28"
                color="gray"
                onClick={() => setShowModal(false)}
              >
                Đóng
              </Button>
              <Button
                className="w-28"
                color="failure"
                onClick={() => {
                  handleCancelAppointment(idAppointment);
                }}
              >
                Hủy
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showRatingModal}
        onClose={() => {setShowRatingModal(false); setIsRated(false);setRating(0);setComment("")}}
        popup
        size="xl"
      >
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>
        {isRated ? 
        <div className="bg-white h-80 rounded-lg p-5 flex flex-col gap-3 justify-center items-center">
          <p className="p-2 text-3xl font-medium text-teal-400">Cảm ơn!</p>
          <p className="text-lg text-teal-500 mb-2">Chúng tôi đã ghi nhận phản hồi của bạn</p>
          <img
          className="h-40 w-44"
          src={require("../../Images/BookingSuccess.png")}
          alt=""
        ></img>
        </div> :     
        <div>
          <div className="h-80 text-center bg-slate-50 rounded-lg p-5">
            <h3 className="p-5 text-lg text-gray-500 dark:text-gray-400">
              Bạn hài lòng về dịch vụ này chứ?
            </h3>
            <Rate className="w-full flex gap-6 justify-center mb-5" 
                  style={{ fontSize: 32}}
                  tooltips={description}
                  onChange={(value)=>{setRating(value)}}></Rate>
            <TextArea
              maxLength={100}
              value={comment}
              onChange={(e) =>{setComment(e.target.value)}}
              placeholder="Để lại nhận xét"
              className="p-3 mb-4 h-28 w-3/4 rounded-lg"
              style={{
                height: 72,
                resize: 'none',
              }}
            />
            <Button
              disabled={rating===0}
              className="w-3/4 h-11 mx-auto"
              gradientDuoTone="purpleToPink"
              onClick={() => {
                handleRatingDoctor();
              }}
            >
              Gửi
            </Button>
          </div>
          <Button
            className="mt-3 w-full mx-auto h-11"
            outline gradientDuoTone="tealToLime"
            onClick={() => setShowRatingModal(false)}
          >
            Để sau
          </Button>
        </div>  
          }  
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Appointment;
