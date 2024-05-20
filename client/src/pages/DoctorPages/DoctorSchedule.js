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
} from "../../redux-toolkit/appointmentSlice";

import { useDispatch, useSelector } from "react-redux";
import { DatePicker, Space, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import { Table, Button } from "flowbite-react";

const DoctorSchedule = () => {
  const dispatch = useDispatch();
  const { AppointmentData, ScheduleData, allService, service, error, loading } =
    useSelector((state) => state.appointment);
  const { user } = useSelector((state) => state.user);
  const [actived, setActived] = useState(false);
  const [editService, setEditService] = useState(false);
  const [serviceData, setServiceData] = useState([]);
  const [scheduleData, setScheduleData] = useState({});
  const [firstStart, setFirstStart] = useState("");
  const [secondStart, setSecondStart] = useState("");
  const [thirdStart, setThirdStart] = useState("");

  const dateFormat = "DD/MM/YYYY";
  const date = new Date();
  const today =
    date.getDate() +
    "/" +
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "/" +
    date.getFullYear();
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
  const handleChange = (e) => {
    for (let i = 0; i < e.length; i++) {
      for (let j = 0; j < allService.length; j++) {
        if (e[i] == allService[j].id && !sv[i]) {
          sv.push({
            value: allService[j].id,
            label: allService[j].Service,
            EstimatedTime: "",
            Price: "",
          });
        }
      }
    }
    setServiceData(sv);
  };
  const handleAddService = () => {
    let newData = [];
    for (let i = 0; i < serviceData.length; i++) {
      if (serviceData[i]?.value != service[i]?.id) {
        newData.push({
          idService: serviceData[i].value,
          EstimatedTime: serviceData[i].EstimatedTime,
          Price: serviceData[i].Price,
        });
        let data = { data: [...newData] };
        if (i == serviceData.length - 1)
          dispatch(addService(data)).then(() =>
            dispatch(fetchService({ idDoctor: user?.data.id }))
          );
      }
    }
    setEditService(false);
  };
  const parse = (time) => {
    const split = time.split(":");
    let curr = parseInt(split[0]) + parseInt(split[1]) / 60;
    return curr;
  };
  console.log(parse("8:00:00"));
  useEffect(() => {
    dispatch(fetchDoctorSchedule(today)); //bệnh nhân -> idDOctor, ngày  {appointment{timebdau, 1:30:00} , schedule }
    dispatch(fetchService({ idDoctor: user?.data.id }));
    dispatch(fetchAllService());
    dispatch(fetchAppointment()); // doctor -> appointment {cuộc hẹn 1{}, cuọ<!--  --> 2}
  }, []);
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
  console.log(serviceData);
  return (
    <div className="">
      <div className=" mx-16 text-gray-700 flex gap-7">
        <div className="my-7 w-full rounded-xl bg-white border shadow-lg shadow-violet-300 py-5 px-8">
          <div className="w-full">
            <div className="flex gap-5">
              <p className="font-semibold text-2xl w-[30%] mb-5">Dịch vụ</p>
              {!editService && (
                <div className="mb-5 flex w-[70%] justify-end">
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
            {actived && editService && (
              <div className="flex mb-5 gap-5">
                <Select
                  className="w-2/3"
                  mode="multiple"
                  size="large"
                  placeholder="Chọn dịch vụ"
                  defaultValue={serviceData}
                  onChange={handleChange}
                  options={options}
                />
                <div className="flex justify-end w-1/3">
                  <Button
                    className="h-[40px] w-32 flex self-end shadow-md shadow-emerald-200"
                    gradientDuoTone="greenToBlue"
                    onClick={handleAddService}
                  >
                    Xác nhận
                  </Button>
                </div>
              </div>
            )}

            <Table hoverable className="shadow-md mb-5 rounded-lg">
              <Table.Head>
                <Table.HeadCell>Dịch vụ</Table.HeadCell>
                <Table.HeadCell>Thời gian</Table.HeadCell>
                <Table.HeadCell>Giá dịch vụ (VND)</Table.HeadCell>
              </Table.Head>
              {serviceData?.map((item) => (
                <Table.Body className="divide-y" key={item.value}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="w-2/4">{item.label}</Table.Cell>
                    <Table.Cell className="w-1/4">
                      <Select
                        id={item.value}
                        className="w-full"
                        size="large"
                        value={item?.EstimatedTime}
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
                    <Table.Cell className="w-1/4">
                      <InputNumber
                        className="w-full"
                        size="large"
                        value={item.Price}
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
          <hr className="bg-gray-200 mb-5"></hr>
          <div>
            <p className="font-semibold text-2xl mb-5">Lịch làm việc</p>
            <div className="">
              <div className="flex gap-3 items-center mb-5">
                <p className="text-lg font-medium text-gray-600 w-20">
                  Ca sáng
                </p>
                <Select
                  className="h-[40px] w-32"
                  size="large"
                  placeholder="--"
                  value={scheduleData?.FirstShiftStart}
                  onChange={(value) => {
                    setScheduleData({
                      ...scheduleData,
                      FirstShiftStart: value,
                    });
                    setFirstStart(value);
                  }}
                >
                  {time1?.map((item) => (
                    <option value={item} label={item}></option>
                  ))}
                </Select>
                <FaLongArrowAltRight />
                <Select
                  className="h-[40px] w-32"
                  size="large"
                  placeholder="--"
                  value={scheduleData?.FirstShiftEnd}
                  onChange={(value) => {
                    setScheduleData({
                      ...scheduleData,
                      FirstShiftEnd: value,
                    });
                  }}
                >
                  {time1?.map((item) => (
                    <option
                      disabled={firstStart && parse(item) <= parse(firstStart)}
                      value={item}
                      label={item}
                    ></option>
                  ))}
                </Select>
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
                  onChange={(value) => {
                    setScheduleData({
                      ...scheduleData,
                      SecondShiftStart: value,
                    });
                    setSecondStart(value);
                  }}
                >
                  {time2?.map((item) => (
                    <option value={item} label={item}></option>
                  ))}
                </Select>
                <FaLongArrowAltRight />
                <Select
                  className="h-[40px] w-32"
                  size="large"
                  placeholder="--"
                  value={scheduleData?.SecondShiftEnd}
                  onChange={(value) => {
                    setScheduleData({
                      ...scheduleData,
                      SecondShiftEnd: value,
                    });
                  }}
                >
                  {time2?.map((item) => (
                    <option
                      disabled={
                        secondStart && parse(item) <= parse(secondStart)
                      }
                      value={item}
                      label={item}
                    ></option>
                  ))}
                </Select>
              </div>

              <div className="flex gap-3 items-center mb-5">
                <p className="text-lg font-medium text-gray-600 w-20">Ca tối</p>
                <Select
                  className="h-[40px] w-32"
                  size="large"
                  placeholder="--"
                  value={scheduleData?.ThirdShiftStart}
                  onChange={(value) => {
                    setScheduleData({
                      ...scheduleData,
                      ThirdShiftStart: value,
                    });
                    setThirdStart(value);
                  }}
                >
                  {time3?.map((item) => (
                    <option value={item} label={item}></option>
                  ))}
                </Select>
                <FaLongArrowAltRight />
                <Select
                  className="h-[40px] w-32"
                  size="large"
                  placeholder="--"
                  value={scheduleData?.ThirdShiftEnd}
                  onChange={(value) => {
                    setScheduleData({
                      ...scheduleData,
                      ThirdShiftEnd: value,
                    });
                  }}
                >
                  {time3?.map((item) => (
                    <option
                      disabled={thirdStart && parse(item) <= parse(thirdStart)}
                      value={item}
                      label={item}
                    ></option>
                  ))}
                </Select>
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
