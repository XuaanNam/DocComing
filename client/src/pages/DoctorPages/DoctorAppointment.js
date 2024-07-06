import React, { useEffect, useRef, useState } from "react";
import { FaRegCalendarPlus, FaRegAddressBook, FaHome } from "react-icons/fa";
import { RiServiceFill } from "react-icons/ri";
import { BsCash } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { TbFileDescription } from "react-icons/tb";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Modal, Button } from "flowbite-react";
import { Badge, Calendar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointment,
  acceptAppointment,
  completeAppointment,
  cancelAppointment,
  fetchService,
  noteAppointment,
  editNoteAppointment,
  fetchHealthRecord,
  healthRecord,
  updateHealthRecord,
} from "../../redux-toolkit/appointmentSlice";
import { DatePicker, Input, TimePicker  } from "antd";
import dayjs from "dayjs";
import { getAllNotification } from "../../redux-toolkit/authSlice";
const { TextArea } = Input;

const DoctorAppointment = () => {
  const dispatch = useDispatch();
  const { AppointmentData, ScheduleData, healthRecordData, service, error, loading } =
    useSelector((state) => state.appointment);
  const { currentUser } = useSelector((state) => state.user);
  const [date, setDate] = useState("");
  const [passed, setPassed] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showExaminationModal, setShowExaminationModal] = useState(false);
  const [ReExaminationDate, setReExaminationDate] = useState(null)
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [record,setRecord] = useState("");
  const [recordNote,setRecordNote] = useState("");
  const [note, setNote] = useState("");
  const [editNote, setEditNote] = useState(false);
  const [idAppointment, setIdAppointment] = useState();
  const [idPatient, setIdPatient] = useState(null);
  const [idRecord, setIdRecord] = useState(null)
  const [time, setTime] = useState("");
  const [price,setPrice] = useState("")
  const format = 'HH:mm';
  const dateFormat = "DD/MM/YYYY";
  const currentDate = new Date();
  const today =
    (currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate())
    + "/" +
    (currentDate.getMonth() + 1 < 10 ? "0" + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1) 
    + "/" +
    currentDate.getFullYear();

  useEffect(() => {
    setDate(today);
    dispatch(fetchHealthRecord());
    dispatch(fetchAppointment());
    dispatch(fetchService({ idDoctor: currentUser?.id })); 
  }, []);
  let appointment = [];
  let isBooked = [];
  for (let i = 0; i < AppointmentData?.length; i++) {
    if (AppointmentData[i].Status === passed)
      appointment.push({ ...AppointmentData[i] });
    if (AppointmentData[i].Status === 3 && passed === 2)
      appointment.push({ ...AppointmentData[i] });
    if(AppointmentData[i].Status === 1)
      isBooked.push({DateBooking: AppointmentData[i].DateBooking, TimeBooking: AppointmentData[i].TimeBooking, EstimatedTime: AppointmentData[i].EstimatedTime})
  }
  const parse = (time) => {
    const split = time.split(":");
    let curr = parseInt(split[0]) + parseInt(split[1]) / 60;
    return curr;
  };
  const disabledMinutes = (selectedHour) => {
    let hour = selectedHour
    let disabledMin = []
    if(selectedHour < 10)
      hour = "0" + selectedHour
    for(let i=0;i<isBooked.length;i++){
      if(date === isBooked[i].DateBooking){
        let time = 0;
        for(let j=0;j<=45;j+=15){
          if(j===0)
            time = hour+":0"+ j +":00"
          else
            time = hour+":"+ j +":00"
          if(parse(time) < parse(isBooked[i].TimeBooking) + parse(isBooked[i].EstimatedTime) && parse(time) > parse(isBooked[i].TimeBooking) - parse(isBooked[i].EstimatedTime)){
            disabledMin.push(j)
          }
        }
      }
    }
    return disabledMin;
  };
  const handleBooking = () => {
    const data = {
      idAppointment,
      ReExaminationDate: date,
      ReExaminationTime: time,
      Price: price
    }
    if(note !== null)
      dispatch(editNoteAppointment(data)).then(() => {
        dispatch(getAllNotification())
        handleClose()
        dispatch(fetchAppointment())
      })
    else
      dispatch(noteAppointment(data)).then(() => {
        dispatch(getAllNotification())
        handleClose()
        dispatch(fetchAppointment())
      })
  }
  const handleNote = () => {
    const data = {
      idAppointment,
      Advice: note,
    }
    if(editNote || ReExaminationDate !== null)
      dispatch(editNoteAppointment(data)).then(() => {
        dispatch(getAllNotification())
        handleClose()
        dispatch(fetchAppointment())
      })
    else
      dispatch(noteAppointment(data)).then(() => {
        dispatch(getAllNotification())
        handleClose()
        dispatch(fetchAppointment())
      })
  }
  const handleHealthRecord = () => {
    const data = {
      idAppointment,
      Record: record,
      Note: recordNote,
      IllnessDate: date
    }
    dispatch(healthRecord(data)).then(() => {
      dispatch(getAllNotification())
      handleClose()
      dispatch(fetchAppointment())
    })
  }
  const handleUpdateHealthRecord = () => {
    const data = {
      idRecord,
      Record: record,
      Note: recordNote,
      IllnessDate: date
    }
    dispatch(updateHealthRecord(data)).then(() => {
      dispatch(getAllNotification())
      handleClose()
      dispatch(fetchAppointment())
    })
  }
  const handleClose = () => {
    setShowExaminationModal(false);
    setShowNoteModal(false);
    setShowRecordModal(false);
    setEditNote(false)
    setReExaminationDate(null)
    setNote("")
    setRecord("")
    setIdRecord(null)
    setRecordNote("")
    setPrice("")
    setTime("")
    setDate(today);
  }
  const handleDatePickerChange = (date, dateString) => {
    setDate(dateString);
  };
  const handleTimePickerChange = (time, timeString) => {
    setTime(timeString);
  }
  const handleAcceptAppointment = (id) => {
    const data = { id };
    dispatch(acceptAppointment(data)).then(() => {
      dispatch(fetchAppointment());
    });
  };
  const handleCompleteAppointment = (id) => {
    const data = { id };
    dispatch(completeAppointment(data)).then(() => {
      dispatch(fetchAppointment());
    });
  };
  const handleCancelAppointment = (id) => {
    const data = { id, idAccount: idPatient};
    dispatch(cancelAppointment(data)).then(() => {
      dispatch(fetchAppointment());
    });
    setShowModal(false);
    setIdPatient(null)
  };
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
    <div className="lg:pt-[70px] min-h-screen">
      <div className="lg:mx-16 max-lg:px-4 text-gray-700 lg:flex lg:gap-10">
        <div className="md:my-7 lg:max-xl:w-full max-lg:h-full max-lg:px-3 w-full rounded-xl bg-white text-slate-600 shadow-lg shadow-violet-200 py-5 lg:px-8">
          <div className="lg:mb-5 max-lg:my-5 lg:h-10 max-lg:h-auto grid lg:grid-cols-5 max-lg:grid-cols-12 lg:gap-3 max-lg:gap-1 font-semibold">
            <p className="max-md:mb-3 md:text-2xl max-md:text-3xl max-lg:col-start-1 max-lg:col-span-12">Lịch khám</p>
            <div
              onClick={() => {
                setPassed(0);
              }}
              className={` ${
                passed === 0 && "bg-white shadow-md shadow-violet-300"
              } col-start-2 max-lg:col-start-4 max-lg:col-span-3 rounded-lg text-center hover:bg-slate-50 cursor-pointer py-2 w-full h-full`}
            >
              TỔNG QUÁT
            </div>
            <div
              onClick={() => {
                setPassed(4);
              }}
              className={` ${
                passed === 4 && "bg-white shadow-md shadow-violet-300"
              } first-letter:max-md:flex max-md:justify-center max-md:items-center max-lg:text-sm max-lg:col-start-3 max-lg:col-span-5 lg:col-start-3 rounded-lg text-center hover:bg-slate-50 cursor-pointer py-2 max-lg:w-full w-full h-full`}
            > 
              CHƯA XÁC NHẬN
            </div>
            <div
              onClick={() => {
                setPassed(1);
              }}
              className={` ${
                passed === 1 && "bg-white shadow-md shadow-violet-300"
              } max-md:flex max-md:justify-center max-md:items-center max-lg:text-sm max-lg:col-start-7 max-lg:col-span-3 col-start-4 rounded-lg text-center hover:bg-slate-50 cursor-pointer py-2 w-full h-full`}
            >
              SẮP TỚI
            </div>
            <div
              onClick={() => {
                setPassed(2);
              }}
              className={` ${
                passed === 2 && "bg-white shadow-md shadow-violet-300"
              } max-md:flex max-md:justify-center max-md:items-center max-lg:text-sm max-lg:col-start-10 max-lg:col-span-3 col-start-5 rounded-lg text-center hover:bg-slate-50 cursor-pointer py-2 w-full h-full`}
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
              <div
                key={appointment.id}
                className="w-full rounded-xl shadow-lg mb-5 border"
              >
                <div className="p-1 rounded-t-xl bg-teal-200 w-full h-10 grid grid-cols-3 place-items-center">
                  <div className="max-lg:text-base lg:text-lg font-medium">
                    {appointment.TimeBooking}
                  </div>
                  <div className="max-lg:text-base lg:text-lg font-medium flex gap-2 items-center">
                    <FaRegCalendarPlus />
                    <div>{appointment.DateBooking}</div>
                  </div>
                  <div className={` ${appointment.Status == 3 && "text-red-600"} max-lg:text-base lg:text-lg font-medium`}>
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
                    <div className="flex md:w-[5%] max-md:w-full">
                      <img
                        className="h-14 w-14 rounded-full object-contain border border-lime-200"
                        alt=""
                        src={require("../../Images/doctorBackground2.jpg")}
                      ></img>
                    </div>
                    <div className="w-[80%]">
                      <p className="font-medium lg:text-lg max-lg:mt-3 max-lg:text-base text-gray-600 mb-3">
                        {appointment.FirstName + " " + appointment.LastName}
                      </p>
                      <div className="lg:flex w-full gap-5 mb-3">
                        <div className="flex gap-2 items-center max-lg:mb-3 lg:w-[40%]">
                          <RiServiceFill className="h-5 min-w-5 text-red-500"></RiServiceFill>
                          <p className="">Dịch vụ:</p>
                          <p className="font-medium">{appointment.Service}</p>
                        </div>
                        <div className="flex gap-2 items-center lg:w-[60%]">
                          <BsCash className="h-5 min-w-5 text-green-400"></BsCash>
                          <p className="">Giá dịch vụ:</p>
                          <p className="font-medium text-green-400">{appointment.Price} đ</p>
                        </div>
                      </div>

                      <div className="lg:flex w-full gap-5 mb-3">
                        <div className="flex gap-2 items-center lg:w-[40%]">
                          <FaPhoneAlt className="h-4 min-w-5 text-teal-600" />
                          <p className="min-w-20">Số điện thoại:</p>
                          <div className="font-medium text-teal-500">{appointment.Phone}</div>
                        </div>
                        <div className="flex gap-2 items-center max-lg:mb-3 lg:w-[60%]">
                          <FaHome className="h-5 min-w-5 text-teal-600" />
                          <p className="min-w-14">Địa chỉ:</p>
                          <div className="font-medium lg:w-full">
                            {appointment.Address}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mb-3">
                        <TbFileDescription className="h-5 min-w-5 text-teal-600" />
                        <p className="min-w-fit">Triệu chứng:</p>
                        <div className="font-medium text-red-500">
                          {appointment.Information}
                        </div>
                      </div>
                      {appointment?.Advice &&
                      <div className="flex gap-2 mb-3">
                        <TbFileDescription className="h-5 min-w-5 text-teal-600" />
                        <p className="font-medium">Ghi chú:</p>
                        <div className="font-medium italic text-red-500">
                          {appointment.Advice}
                        </div>                  
                      </div>
                      }
                    </div>
                    {appointment.Status == 2 && (
                      <div className="w-[15%] mx-auto flex flex-col gap-2 place-items-center relative">   
                        {appointment.Record === null &&   
                        <Button className="w-32" size="sm" outline gradientDuoTone="tealToLime" onClick={()=>{setShowRecordModal(true);setIdAppointment(appointment.id);setDate(appointment.DateBooking)}}>
                          Thêm bệnh án
                        </Button>
                        }
                        {appointment.ReExaminationDate === null &&
                        <Button className="w-32" size="sm" outline gradientDuoTone="tealToLime" onClick={()=>{setShowExaminationModal(true);setIdAppointment(appointment.id);setNote(appointment.Advice)}}>
                          Hẹn tái khám
                        </Button>
                        } 
                        {appointment.Advice === null ?
                          <Button className="w-32" size="sm" outline gradientDuoTone="tealToLime" onClick={()=>{setShowNoteModal(true);setIdAppointment(appointment.id);setReExaminationDate(appointment.ReExaminationDate)}}>
                            Ghi chú
                          </Button>
                        :
                          <p className="absolute bottom-1 text-sm cursor-pointer text-center w-24 h-8 py-1 px-2 rounded-lg hover:bg-slate-100"
                            onClick={()=>{setEditNote(true);setShowNoteModal(true);setIdAppointment(appointment.id);setNote(appointment.Advice)}}>Chỉnh sửa
                          </p>
                        }
                      </div>
                    )}
                  </div>
                  <div className="flex max-md:justify-center max-md:items-center mx-auto md:w-full max-md:w-full max-md:px-3 gap-10">
                    {appointment.Status === 2 && 
                      <div className="w-full flex flex-col gap-3">
                        {appointment.NoteRecord !== null && appointment.ReExaminationDate !== null &&
                          <hr className="w-[98%] mx-auto border-[1px] border-lime-50 rounded-lg"></hr>
                        }
                        <div className="grid grid-cols-2 gap-5">
                          {appointment.NoteRecord !== null &&
                            <div className="flex flex-col col-start-1 gap-3 h-full w-full p-4 bg-white shadow-md shadow-violet-200 rounded-lg">
                              <div className="flex items-center">                             
                                <p className="font-medium text-black text-lg w-1/2">Bệnh án</p>   
                                <div className="w-1/2 flex justify-end text-green-500 font-medium">
                                  <Button className="w-24" size="xs" outline gradientDuoTone="tealToLime" onClick={()=>{setShowRecordModal(true);setIdRecord(appointment.idMedicalRecord);setRecord(appointment.Record);setRecordNote(appointment.NoteRecord  )}}>
                                    Chỉnh sửa
                                  </Button>
                                </div>
                              </div>             
                              <div className="flex gap-3">
                                <div className="flex flex-col gap-1 w-full">
                                  <p>Chẩn đoán: <span className="text-teal-600 font-medium">{appointment.Record}</span></p>
                                  <p>Mô tả: <span className="text-teal-600 font-medium">{appointment.NoteRecord}</span></p>
                                </div>
                              </div>
                            </div>
                          }
                          {appointment.ReExaminationDate !== null &&
                            <div className="flex flex-col col-start-2 gap-3 h-full w-full p-4 bg-white shadow-md shadow-violet-200 rounded-lg">
                              <div className="flex items-center">
                                <p className="font-medium text-black text-lg w-1/2">Lịch hẹn tái khám</p>
                                {appointment.NoteStatus === 0 && 
                                  <div className="w-1/2 mr-4 flex justify-end text-green-500 font-medium">Chưa xác nhận</div>
                                }
                                {appointment.NoteStatus === 1 && 
                                  <div className="w-1/2 mr-4 flex justify-end text-green-500 font-medium">Đã xác nhận</div>
                                }
                                {appointment.NoteStatus === 2 && 
                                  <div className="w-1/2 mr-4 flex justify-end text-rose-500 font-medium">Đã hủy</div>
                                }
                              </div>
                              <div className="flex gap-3">
                                <div className="flex flex-col gap-1 w-full">
                                  <p>Ngày tái khám: <span className="text-green-500 font-medium">{appointment.ReExaminationDate.slice(0,10)}</span></p>
                                  <p>Thời gian: <span className="text-green-500 font-medium">{appointment.ReExaminationDate.slice(11,16)}</span></p>
                                  <p>Chi phí dự kiến: <span className="text-green-500 font-medium">{appointment.ReExaminationPrice} đ</span></p>
                                </div>
                              </div>
                            </div>
                          }
                        </div>
                      </div>
                    }
                    {appointment.Status != 2 && appointment.Status != 3 && (
                      <Button
                        className="md:w-40 max-md:w-48 md:mx-auto rounded-2xl"
                        gradientMonochrome="failure"
                        onClick={() => {
                          setShowModal(true);
                          setIdAppointment(appointment.id);
                          setIdPatient(appointment.idPatient)
                        }}
                      >
                        Hủy
                      </Button>
                    )}
                    {appointment.Status == 4 && (
                      <Button
                        className="md:w-40 max-md:w-48 mx-auto rounded-2xl"
                        gradientDuoTone="greenToBlue"
                        onClick={() => {
                          handleAcceptAppointment(appointment.id);
                        }}
                      >
                        xác nhận
                      </Button>
                    )}
                    {appointment.Status == 1 && (
                      <Button
                        className="md:w-40 max-md:w-48 mx-auto rounded-2xl"
                        gradientDuoTone="greenToBlue"
                        onClick={() => {
                          handleCompleteAppointment(appointment.id);
                        }}
                      >
                        Hoàn thành
                      </Button>
                    )}
                    
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="py-10 w-full text-center text-2xl font-medium">
              Bạn chưa có cuộc hẹn mới
            </p>
          )}
        </div>
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
        show={showExaminationModal}
        onClose={handleClose}
        popup
        size="xl"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col gap-3 items-center justify-center">
            <h3 className="mb-5 text-lg font-medium dark:text-gray-400">
              Lên lịch tái khám
            </h3>
            <DatePicker
              id="DateBooking"
              className="h-11 w-[90%] bg-white border border-gray-300 !text-lg rounded-lg px-4 p-1"
              value={dayjs(date, dateFormat)}
              format={dateFormat}
              onChange={handleDatePickerChange}
              minDate={dayjs(today, dateFormat)}
            />
            <TimePicker className="h-11 w-[90%] px-4" minuteStep={15} hourStep={1} format={format} disabledMinutes={disabledMinutes} onChange={handleTimePickerChange}  placeholder="Chọn thời gian"/>
            <Input className="h-11 w-[90%] px-4 rounded-md border-gray-300" placeholder="Chi phí dự kiến" value={price} onChange={(e)=> setPrice(e.target.value)}></Input>
            <Button
              disabled={date === "" || time === "" || price === ""}
              className="w-[90%] h-11"
              gradientDuoTone="purpleToPink"
              onClick={() => {
                handleBooking();
              }}
            >
              Xác nhận
            </Button>
            <hr className="w-[90%] border-[1px] border-lime-100 rounded-lg"></hr>
            <Button
            className="mt-3 w-[90%] h-11"
            outline gradientDuoTone="tealToLime"
            onClick={handleClose}
            >
              Để sau
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showNoteModal}
        onClose={handleClose}
        popup
        size="xl"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col gap-3 items-center justify-center">
            <h3 className="mb-5 text-lg font-medium dark:text-gray-400">
              {editNote ? "Chỉnh sửa ghi chú" : "Thêm ghi chú" }
            </h3>
            <TextArea
              maxLength={100}
              value={note}
              onChange={(e) =>{setNote(e.target.value)}}
              placeholder="Dặn dò của bác sĩ"
              className="h-28 w-[90%] px-4 rounded-md border-gray-300"
              style={{
                height: 72,
                resize: 'none',
              }}
            />
            <Button
              disabled={note === ""}
              className="w-[90%] h-11"
              gradientDuoTone="purpleToPink"
              onClick={() => {
                handleNote();
              }}
            >
              Xác nhận
            </Button>
            <hr className="w-[90%] border-[1px] border-lime-100 rounded-lg"></hr>
            <Button
            className="mt-3 w-[90%] h-11"
            outline gradientDuoTone="tealToLime"
            onClick={handleClose}
            >
              Để sau
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showRecordModal}
        onClose={handleClose}
        popup
        size="xl"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col gap-3 items-center justify-center">
            <h3 className="mb-5 text-lg font-medium dark:text-gray-400">
              {idRecord !== null ? "Chỉnh sửa bệnh án" : "Thêm bệnh án"}
            </h3>
            <Input className="h-11 w-[90%] px-4 rounded-md border-gray-300" placeholder="Bệnh án" value={record} onChange={(e)=> setRecord(e.target.value)}></Input>
            <TextArea
              maxLength={100}
              value={recordNote}
              onChange={(e) =>{setRecordNote(e.target.value)}}
              placeholder="Mô tả bệnh án"
              className="h-28 w-[90%] px-4 rounded-md border-gray-300"
              style={{
                height: 72,
                resize: 'none',
              }}
            />
            {/* <DatePicker
              id="DateBooking"
              className="h-11 w-[90%] bg-white border border-gray-300 !text-lg rounded-lg px-4 p-1"
              value={dayjs(date, dateFormat)}
              format={dateFormat}
              onChange={handleDatePickerChange}
              minDate={dayjs(today, dateFormat)}
            /> */}
            <Button
              disabled={record === "" || recordNote === ""}
              className="w-[90%] h-11"
              gradientDuoTone="purpleToPink"
              onClick={() => {
                idRecord !== null ? handleUpdateHealthRecord() : handleHealthRecord()         
              }}
            >
              Xác nhận
            </Button>
            <hr className="w-[90%] border-[1px] border-lime-100 rounded-lg"></hr>
            <Button
            className="mt-3 w-[90%] h-11"
            outline gradientDuoTone="tealToLime"
            onClick={handleClose}
            >
              Để sau
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DoctorAppointment; 
