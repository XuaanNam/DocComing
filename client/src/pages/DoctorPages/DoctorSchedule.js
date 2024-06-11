import React, { useEffect, useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { LuCalendarDays, LuCalendarCheck } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Badge, Calendar } from "antd";
import {
  fetchDoctorSchedule,
  fetchService,
  fetchAllService,
  fetchAppointment,
  addService,
  deleteService,
  updateSchedule,
} from "../../redux-toolkit/appointmentSlice";
import { fetchProfile } from "../../redux-toolkit/authSlice";

import { useDispatch, useSelector } from "react-redux";
import { DatePicker, Space, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import { Table, Button } from "flowbite-react";
import { IoIosClose } from "react-icons/io";
const DoctorSchedule = () => {
  const dispatch = useDispatch();
  const { currentUser, user } = useSelector((state) => state.user);
  const { AppointmentData, ScheduleData, allService, service, error, loading } =
    useSelector((state) => state.appointment);
  const [actived, setActived] = useState(false);
  const [editService, setEditService] = useState(false);
  const [serviceData, setServiceData] = useState([]);
  const [scheduleData, setScheduleData] = useState({});
  const [date, setDate] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [optimized, setOptimized] = useState(false);
  const [serviceChange, setServiceChange] = useState(false)
  const [scheduleChange, setScheduleChange] = useState(false)

  const dateFormat = "DD/MM/YYYY";
  const currentDate = new Date();
  const today =
    currentDate.getDate() +
    "/" +
    (currentDate.getMonth() + 1 < 10
      ? "0" + (currentDate.getMonth() + 1)
      : currentDate.getMonth() + 1) +
    "/" +
    currentDate.getFullYear();
  const options = [];
  for (let i = 0; i < allService?.length; i++) {
    options.push({
      value: allService[i]?.id,
      label: allService[i]?.Service,
    });
  }
  let sv = [];
  for (let i = 0; i < service?.length; i++)
    sv.push({
      value: service[i]?.id,
      label: service[i]?.Service,
      EstimatedTime: service[i]?.EstimatedTime,
      Price: service[i]?.Price,
    });
  const time1 = ["7:00:00", "8:00:00", "9:00:00", "10:00:00", "11:00:00"];
  const time2 = ["13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00"];
  const time3 = ["18:00:00", "19:00:00", "20:00:00", "21:00:00", "22:00:00"];
  const handleChange = (value) => {
    setServiceChange(true);
    let service = [];
    let newService = [];
    let temp = 0;
    for (let i = 0; i < value.length; i++) {
      for (let j = 0; j < allService.length; j++) {
        if (value[i] == allService[j]?.id) {
          service.push({
            value: allService[j].id,
            label: allService[j].Service,
            EstimatedTime: "",
            Price: "",
          });
        }
      }
      if (i == value.length - 1) temp = 1;
    }
    if (temp != 0) {
      for (let i = 0; i < service.length; i++) {
        let temp1 = 0;
        for (let j = 0; j < sv.length; j++) {
          if (service[i].value == sv[j]?.value) {
            newService.push({
              value: sv[j].value,
              label: sv[j].label,
              EstimatedTime: sv[j].EstimatedTime,
              Price: sv[j].Price,
            });
            temp1 = 1;
            break;
          }
        }
        if (temp1 == 0) {
          newService.push({
            value: service[i].value,
            label: service[i].label,
            EstimatedTime: service[i].EstimatedTime,
            Price: service[i].Price,
          });
        }
      }
    }
    setServiceData(newService);
  };
  const handleAddService = () => {
    let data = [];
    let addData = [];
    let deleteData = [];
    let check = true;
    for(let i = 0 ; i < serviceData.length; i++)
      {
        data.push({...serviceData[i]});
        if(serviceData[i].EstimatedTime == "" && serviceData[i].Price == "")
          {
          data[i] = {...serviceData[i],checkTime: false,checkPrice: false};
          check = false;
          } 
        else if(serviceData[i].EstimatedTime == "")
          {
          data[i] = {...serviceData[i],checkTime: false};
          check = false;
          } 
         else if(serviceData[i].Price == "")
          {
          data[i] = {...serviceData[i],checkPrice: false};
          check = false;
          }   
      }
    if(check == true){
      if(sv.length == 0){
        for (let i = 0; i < serviceData.length; i++){
          addData.push({
            idService: serviceData[i].value,
            EstimatedTime: serviceData[i].EstimatedTime,
            Price: serviceData[i].Price,
          });
        }
        let data1 = { data: [...addData] };
        dispatch(addService(data1));
      }
      else{
        for (let j = 0; j < sv.length; j++) {
          let check = 0;
          for (let i = 0; i < serviceData.length; i++) {
            if (j == sv.length - 1) {
              addData.push({
                idService: serviceData[i].value,
                EstimatedTime: serviceData[i].EstimatedTime,
                Price: serviceData[i].Price,
              });
              let data1 = { data: [...addData] };
    
              if (i == serviceData.length - 1) {
                dispatch(addService(data1));
              }
            }
            if (serviceData[i].value == sv[j].value) check = 1;
            if (i == serviceData.length - 1 && check == 0)
              deleteData.push(sv[j].value);
          }
        }
      }
      setEditService(false);
      setServiceChange(false);
    }
    else{
      setServiceData(data)
    }
    
    let data2 = { idService: [...deleteData] };
    if (data2?.idService.length > 0) {
      dispatch(deleteService(data2));
    }
  };
  const handleDatePickerChange = (date, dateString) => {
    setDate(dateString);
  };
  const handleUpdateSchedule = () => {
    let schedule = {
      FirstShiftStart: scheduleData.FirstShiftStart,
      FirstShiftEnd: scheduleData.FirstShiftEnd,
      SecondShiftStart: scheduleData.SecondShiftStart,
      SecondShiftEnd: scheduleData.SecondShiftEnd,
      ThirdShiftStart: scheduleData.ThirdShiftStart,
      ThirdShiftEnd: scheduleData.ThirdShiftEnd,
    };
    if (optimized) {
      schedule = { ...schedule, SpecificDay: date };
      dispatch(updateSchedule(schedule));
    } else {
     dispatch(updateSchedule(schedule));
    }
    setDisabled(true);
    setOptimized(false);
    setScheduleChange(false)
  };
  const parse = (time) => {
    const split = time.split(":");
    let curr = parseInt(split[0]) + parseInt(split[1]) / 60;
    return curr;
  };
  useEffect(() => {
    setDate(today);
    dispatch(fetchDoctorSchedule(today)); //bệnh nhân -> idDOctor, ngày  {appointment{timebdau, 1:30:00} , schedule }
    dispatch(fetchService({ idDoctor: currentUser?.id }));
    dispatch(fetchAllService());
    dispatch(fetchAppointment()); // doctor -> appointment {cuộc hẹn 1{}, cuọ<!--  --> 2}
    if (currentUser) {
      dispatch(fetchProfile());
    }
  }, [currentUser]);
  useEffect(() => {
    if (service && sv.length > 0) {
      setServiceData(sv);
      setActived(true);
    }
    if (ScheduleData) {
      setScheduleData(ScheduleData[0]);
    }
  }, [service, ScheduleData]);

  const getListData = (value) => {
    let listData = [];
    for (let i = 0; i < AppointmentData.length; i++) {
      let db = AppointmentData[i]?.DateBooking?.split("-");
      if (
        value.date() == db[2] &&
        value.month() + 1 == db[1] &&
        value.year() == db[0]
      ) {
        listData = [
          ...listData,
          {
            type: AppointmentData[i].Type,
            content: AppointmentData[i].TimeBooking,
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
    <div className="lg:pt-[70px] max-md:pt-[20px] min-h-screen">
      <div className=" md:mx-16 max-md:px-7 text-gray-700 flex gap-7">
        <div className="md:my-7 max-md:mt-5 max-md:mb-7 w-full rounded-xl bg-white border shadow-lg shadow-violet-300 py-5 md:px-8 max-md:px-2">
          <div className="w-full">
            <div className="flex gap-5">
              <p className="font-semibold max-md:pl-5 text-2xl max-md:w-[40%] md:w-[30%] mb-5">Dịch vụ</p>
              {!editService && (
                <div className="mb-5 flex max-md:w-[60%] md:w-[70%] justify-end">
                  <Button
                    className="h-[40px] w-32 shadow-md shadow-emerald-200"
                    gradientDuoTone="greenToBlue"
                    onClick={() => {
                      setEditService(true);
                    }}
                  >
                    Thêm dịch vụ
                  </Button>
                </div>
              )}
            </div>
            {editService && (
              <div className="flex max-md:flex-col mb-5 gap-5">
                <Select
                  className="md:w-2/3 md:max-lg:w-7/10 max-md:w-full max-md:p-2"
                  mode="multiple"
                  size="large"
                  placeholder="Chọn dịch vụ"
                  defaultValue={serviceData}
                  onChange={handleChange}
                  options={options}
                />
                <div className="flex md:max-lg:flex-col lg:justify-end max-lg:items-center max-lg:justify-center max-md:w-full md:max-lg:w-1/5 lg:w-1/3 lg:gap-5 max-lg:gap-2">
                  <Button
                    className="h-[40px] lg:w-28 max-lg:w-24 flex self-end shadow-m shadow-emerald-200"
                    gradientMonochrome="failure"
                    onClick={() => {
                      setEditService(false);
                    }}
                  >
                    Hủy
                  </Button>
                  <Button
                    className="h-[40px] lg:w-32 max-lg:w-24 flex self-end shadow-md shadow-emerald-200"
                    gradientDuoTone="greenToBlue"
                    disabled={!serviceChange}
                    onClick={handleAddService}
                  >
                    Xác nhận
                  </Button>
                </div>
              </div>
            )}

            <Table hoverable className="shadow-md mb-5 rounded-lg">
              <Table.Head>
                <Table.HeadCell className="max-lg:px-2">Dịch vụ</Table.HeadCell>
                <Table.HeadCell className="max-lg:px-2">Thời gian thực hiện</Table.HeadCell>
                <Table.HeadCell className="max-lg:px-2">Giá dịch vụ (VND)</Table.HeadCell>
              </Table.Head>
              {serviceData?.map((item) => (
                <Table.Body className="divide-y" key={item.value}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="max-lg:px-2 max-lg:w-1/3 lg:w-2/4">{item.label}</Table.Cell>
                    <Table.Cell className="max-lg:px-2 max-lg:w-1/3 lg:w-1/4">
                      <Select
                        id={item.value}
                        className="w-full"
                        status={item?.checkTime == false ? "error" : ""}
                        size="large"
                        value={item?.EstimatedTime}
                        disabled={!editService}
                        onChange={(value) => {
                          let newArr = [...serviceData];
                          for (let i = 0; i < serviceData.length; i++) {
                            if (serviceData[i].value == item.value) {
                              newArr[i] = {
                                value: serviceData[i].value,
                                label: serviceData[i].label,
                                EstimatedTime: value,
                                Price: serviceData[i]?.Price || "",
                              };
                            }
                          }
                          setServiceData(newArr);
                        }}
                      >
                        <option value="01:00:00" label="01:00:00"></option>
                        <option value="01:30:00" label="01:30:00"></option>
                        <option value="02:00:00" label="02:00:00"></option>
                        <option value="02:30:00" label="02:30:00"></option>
                      </Select>
                    </Table.Cell>
                    <Table.Cell className="max-lg:px-2 max-lg:w-1/3 lg:w-1/4">
                      <InputNumber
                        className={`${item?.checkPrice === false && "border-red-500"} w-full`}
                        size="large"
                        value={item.Price}
                        disabled={!editService}
                        onChange={(value) => {
                          let newArr = [...serviceData];
                          for (let i = 0; i < serviceData.length; i++) {
                            if (serviceData[i].value == item.value) {
                              newArr[i] = {
                                value: serviceData[i].value,
                                label: serviceData[i].label,
                                EstimatedTime:
                                  serviceData[i]?.EstimatedTime || "",
                                Price: value,
                              };
                            }
                          }
                          setServiceData(newArr);
                        }}
                      ></InputNumber>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          </div>
          <hr className="bg-gray-200 my-10"></hr>
          <div>
            <div className="flex gap-5 mb-5 w-full">
              <p className="font-semibold max-md:pl-5 max-lg:w-[50%] lg:w-[30%] text-2xl">Lịch làm việc</p>
              {disabled ? (
                <div className="flex max-md:w-[50%] md:w-[70%] gap-5 justify-end">
                  <Button
                    className="h-[40px] w-32 shadow-md shadow-emerald-200"
                    gradientDuoTone="greenToBlue"
                    onClick={() => {
                      setDisabled(false);
                    }}
                  >
                    Cập nhật lịch
                  </Button>
                </div>
              ) : (
                <div className="flex max-md:w-[50%] md:w-[70%] gap-5 justify-end">
                  <Button
                    className="h-[40px] w-28 flex self-end shadow-m shadow-emerald-200"
                    gradientMonochrome="failure"
                    onClick={() => {
                      setScheduleData(ScheduleData[0]);
                      setDisabled(true);
                      setOptimized(false);
                      setScheduleChange(false)
                    }}
                  >
                    Hủy
                  </Button>
                  <Button
                    className="h-[40px] w-32 shadow-md shadow-emerald-200"
                    gradientDuoTone="greenToBlue"
                    disabled={!scheduleChange}
                    onClick={handleUpdateSchedule}
                  >
                    Xác nhận
                  </Button>
                </div>
              )}
            </div>
            <div className="">
              <div className="flex gap-10 w-full">
                <div className="flex gap-3 items-center mb-5 w-full">
                  <p className="text-lg font-medium text-gray-600 w-20">
                    Ca sáng
                  </p>
                  <Select
                    className="h-[40px] w-32"
                    size="large"
                    placeholder="--"
                    value={scheduleData?.FirstShiftStart}
                    disabled={disabled}
                    onChange={(value) => {
                      setScheduleData({
                        ...scheduleData,
                        FirstShiftStart: value,
                      });
                      setScheduleChange(true);
                    }}
                  >
                    {time1?.map((item) => (
                      <option
                        disabled={
                          scheduleData?.FirstShiftEnd &&
                          parse(item) >= parse(scheduleData?.FirstShiftEnd)
                        }
                        value={item}
                        label={item}
                      ></option>
                    ))}
                  </Select>
                  <FaLongArrowAltRight />
                  <Select
                    className="h-[40px] w-32"
                    size="large"
                    placeholder="--"
                    value={scheduleData?.FirstShiftEnd}
                    disabled={disabled}
                    onChange={(value) => {
                      setScheduleData({
                        ...scheduleData,
                        FirstShiftEnd: value,
                      });
                      setScheduleChange(true);
                    }}
                  >
                    {time1?.map((item) => (
                      <option
                        disabled={
                          scheduleData?.FirstShiftStart &&
                          parse(item) <= parse(scheduleData?.FirstShiftStart)
                        }
                        value={item}
                        label={item}
                      ></option>
                    ))}
                  </Select>
                  {!disabled &&
                    (scheduleData?.FirstShiftStart ||
                      scheduleData?.FirstShiftEnd) && (
                      <IoIosClose
                        onClick={() => {
                          setScheduleData({
                            ...scheduleData,
                            FirstShiftStart: null,
                            FirstShiftEnd: null,
                          });
                        setScheduleChange(true);
                        }}
                        className="text-red-400 cursor-pointer transition-transform duration-500 hover:scale-125 h-8 w-8 "
                      ></IoIosClose>
                    )}
                </div>
                {optimized && (
                  <div className="flex gap-3 w-[45%] items-center mb-5">
                    <DatePicker
                      id="DateBooking"
                      className="h-[40px] w-[90%] bg-white border border-gray-300 !text-lg rounded-lg px-5 p-1"
                      value={dayjs(date, dateFormat)}
                      format={dateFormat}
                      onChange={handleDatePickerChange}
                      minDate={dayjs(today, dateFormat)}
                    />
                    <IoIosClose
                      onClick={() => {
                        setOptimized(false);
                      }}
                      className="text-red-400 cursor-pointer transition-transform duration-500 hover:scale-125 h-8 w-8 "
                    ></IoIosClose>
                  </div>
                )}
                {!disabled && !optimized && (
                  <div className="flex w-[45%] justify-end">
                    <button
                      className="h-[36px] w-32 text-sm font-medium shadow-md shadow-emerald-200 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white"
                      onClick={() => {
                        setOptimized(true);
                      }}
                    >
                      Chọn ngày
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-3 items-center mb-5">
                <p className="text-lg font-medium text-gray-600 w-20">
                  Ca chiều
                </p>
                <Select
                  className="h-[40px] w-32"
                  size="large"
                  placeholder="--"
                  value={scheduleData?.SecondShiftStart}
                  disabled={disabled}
                  onChange={(value) => {
                    setScheduleData({
                      ...scheduleData,
                      SecondShiftStart: value,
                    });
                    setScheduleChange(true);
                  }}
                >
                  {time2?.map((item) => (
                    <option
                      disabled={
                        scheduleData?.SecondShiftEnd &&
                        parse(item) >= parse(scheduleData?.SecondShiftEnd)
                      }
                      value={item}
                      label={item}
                    ></option>
                  ))}
                </Select>
                <FaLongArrowAltRight />
                <Select
                  className="h-[40px] w-32"
                  size="large"
                  placeholder="--"
                  value={scheduleData?.SecondShiftEnd}
                  disabled={disabled}
                  onChange={(value) => {
                    setScheduleData({
                      ...scheduleData,
                      SecondShiftEnd: value,
                    });
                    setScheduleChange(true);
                  }}
                >
                  {time2?.map((item) => (
                    <option
                      disabled={
                        scheduleData?.SecondShiftStart &&
                        parse(item) <= parse(scheduleData?.SecondShiftStart)
                      }
                      value={item}
                      label={item}
                    ></option>
                  ))}
                </Select>
                {!disabled &&
                  (scheduleData?.SecondShiftStart ||
                    scheduleData?.SecondShiftEnd) && (
                    <IoIosClose
                      onClick={() => {
                        setScheduleData({
                          ...scheduleData,
                          SecondShiftStart: null,
                          SecondShiftEnd: null,
                        });
                        setScheduleChange(true);
                      }}
                      className="text-red-400 cursor-pointer transition-transform duration-500 hover:scale-125 h-8 w-8 "
                    ></IoIosClose>
                  )}
              </div>

              <div className="flex gap-3 items-center mb-5">
                <p className="text-lg font-medium text-gray-600 w-20">Ca tối</p>
                <Select
                  className="h-[40px] w-32"
                  size="large"
                  placeholder="--"
                  value={scheduleData?.ThirdShiftStart}
                  disabled={disabled}
                  onChange={(value) => {
                    setScheduleData({
                      ...scheduleData,
                      ThirdShiftStart: value,
                    });
                    setScheduleChange(true);
                  }}
                >
                  {time3?.map((item) => (
                    <option
                      disabled={
                        scheduleData?.ThirdShiftEnd &&
                        parse(item) >= parse(scheduleData?.ThirdShiftEnd)
                      }
                      value={item}
                      label={item}
                    ></option>
                  ))}
                </Select>
                <FaLongArrowAltRight />
                <Select
                  className="h-[40px] w-32"
                  size="large"
                  placeholder="--"
                  value={scheduleData?.ThirdShiftEnd}
                  disabled={disabled}
                  onChange={(value) => {
                    setScheduleData({
                      ...scheduleData,
                      ThirdShiftEnd: value,
                    });
                    setScheduleChange(true);
                  }}
                >
                  {time3?.map((item) => (
                    <option
                      disabled={
                        scheduleData?.ThirdShiftStart &&
                        parse(item) <= parse(scheduleData?.ThirdShiftStart)
                      }
                      value={item}
                      label={item}
                    ></option>
                  ))}
                </Select>
                {!disabled &&
                  (scheduleData?.ThirdShiftStart ||
                    scheduleData?.ThirdShiftEnd) && (
                    <IoIosClose
                      onClick={() => {
                        setScheduleData({
                          ...scheduleData,
                          ThirdShiftStart: null,
                          ThirdShiftEnd: null,
                        });
                        setScheduleChange(true);
                      }}
                      className="text-red-400 cursor-pointer transition-transform duration-500 hover:scale-125 h-8 w-8 "
                    ></IoIosClose>
                  )}
              </div>
            </div>
          </div>

          <Calendar
            className="shadow-lg shadow-blue-300 p-3 rounded-lg border font-medium"
            cellRender={cellRender}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedule;
