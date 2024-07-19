import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaRegCalendarPlus, FaHome } from "react-icons/fa";
import { LuCalendarDays, LuCalendarCheck } from "react-icons/lu";
import { RiServiceFill } from "react-icons/ri";
import { BsCash } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import { TbFileDescription } from "react-icons/tb";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Modal, Table, Button } from "flowbite-react";
import { Rate,Input  } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointment,cancelAppointment, ratingDoctor,
  updateRatingDoctor,
  acceptNoteAppointment,
  cancelNoteAppointment,
  fetchHealthRecord
} from "../../redux-toolkit/appointmentSlice";
import { logout } from "../../redux-toolkit/authSlice";
import { persistor } from "../../redux-toolkit/configureStore";
import SelectForm from "../../components/SelectForm";

const { TextArea } = Input;
const description = ['Quá tệ', 'Chưa tốt', 'Bình thường', 'Tốt', 'Tuyệt vời'];

const HealthRecord = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { HealthRecordData, error, loading } = useSelector((state) => state.appointment);
  const { currentUser,allNoti} = useSelector((state) => state.user); 
  const [numberElement, setNumberElement] = useState(10)
  
  useEffect(() => {
    dispatch(fetchAppointment());
    dispatch(fetchHealthRecord());
  }, []);
  const slice = HealthRecordData?.slice(0,numberElement);
  return (
    <div>
      {loading ?
        <div className="spinner mt-12 mx-auto">
        </div>
      :
        <div className="my-7 lg:w-full max-lg:h-full max-lg:px-3 rounded-xl min-h-[85vh] bg-white shadow-lg text-slate-600 py-5 lg:px-8">  
        <p className="text-2xl mb-3 font-medium">Bệnh án</p>
          {HealthRecordData?.length > 0 ?
          <>
            <Table hoverable className="shadow-lg shadow-violet-200 max-sm:p-1">
              <Table.Head>
                <Table.HeadCell className="max-sm:p-1">Chẩn đoán</Table.HeadCell>
                <Table.HeadCell className="max-sm:p-1">Triệu chứng</Table.HeadCell>
                <Table.HeadCell className="max-sm:p-1">Bác sĩ phụ trách</Table.HeadCell>
                <Table.HeadCell className="max-sm:p-1">Ngày khám</Table.HeadCell>
              </Table.Head>
              {slice?.map((healthRecord) => 
              <Table.Body className="divide-y" key={healthRecord.id}>
                <Table.Row className="bg-white max-sm:p-1 dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="max-sm:p-1 font-medium text-teal-600">
                    {healthRecord.Record}
                  </Table.Cell>
                  <Table.Cell className="max-sm:p-1 text-teal-600 italic">
                    {healthRecord.Note}
                  </Table.Cell>
                  <Table.Cell className="max-sm:p-1">
                    {healthRecord.FullNameDoctor}
                  </Table.Cell>
                  <Table.Cell className="max-sm:p-1">
                    {healthRecord.IllnessDate}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
              )}
            </Table>       
            {HealthRecordData.length > 10 &&
              <Button
                className="mt-5 w-32 mx-auto rounded-lg h-11"
                outline gradientDuoTone="tealToLime"
                onClick={()=>{setNumberElement(numberElement+numberElement)}}
              >
                Xem thêm
              </Button>
            }
          </>
          : 
            <p className="py-10 w-full text-center text-2xl font-medium">
              Bạn hiện chưa có bệnh án
            </p>
          }
        </div>
      } 
    </div>
  );
};

export default HealthRecord;
