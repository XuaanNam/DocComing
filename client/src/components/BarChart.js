'use client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getTotalDashboard} from "../redux-toolkit/authSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const BarChartComponent = () => {
  const dispatch = useDispatch()
  const {dashboardData} = useSelector((state) => state.user);
  useEffect(()=>{
    dispatch(getTotalDashboard())
  },[])

  let data = [];
  for (let i = 0; i < 12; i++)
    if(dashboardData[i]){    
      data.push({
        name: 'Tháng' + " " + dashboardData[i].month,
        user: dashboardData[i].TotalAcc,
        post: dashboardData[i].TotalPost,
        appointment: dashboardData[i].TotalApptn,
      });
    }  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        className='transition-all'
        width={400}
        height={350}
        data={data?.length > 0 && data}
        margin={{
          right: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="user" fill="#5C88C4" />
        <Bar dataKey="post" fill="#E2BBE9" />
        <Bar dataKey="appointment" fill="#40A578" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload?.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          User:
          <span className="ml-2">{payload[0]?.value}</span>
        </p>
        <p className="text-sm text-indigo-400">
          Post:
          <span className="ml-2">{payload[1]?.value}</span>
        </p>
        <p className="text-sm text-indigo-400">
          Appointment:
          <span className="ml-2">{payload[2]?.value}</span>
        </p>
      </div>
    );
  }
};