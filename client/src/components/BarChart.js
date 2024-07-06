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

const data = [
  {
    name: 'Tháng 1',
    user: 4000,
    post: 2400,
    appointment: 12,
  },
  {
    name: 'Tháng 2',
    user: 3000,
    post: 1398,
    appointment: 13,
  },
  {
    name: 'Tháng 3',
    user: 9800,
    post: 2000,
    appointment: 15,
  },
  {
    name: 'Tháng 4',
    user: 3908,
    post: 2780,
  },
  {
    name: 'Tháng 5',
    user: 4800,
    post: 1890,
    appointment: 18,
  },
  {
    name: 'Tháng 6',
    user: 3800,
    post: 2390,
    appointment: 10,

  },
  {
    name: 'Tháng 7',
    user: 3800,
    post: 2390,
    appointment: 100,
  },
  {
    name: 'Tháng 8',
    user: 3800,
    post: 2390,
    appointment: 120,

  },
  {
    name: 'Tháng 9',
    user: 3800,
    post: 2390,
    appointment: 112,

  },
  {
    name: 'Tháng 10',
    user: 3800,
    post: 2390,
    appointment: 123,

  },
  {
    name: 'Tháng 11',
    user: 3800,
    post: 2390,
    appointment: 132,

  },
  {
    name: 'Tháng 12',
    user: 3800,
    post: 2390,
    appointment: 212,
  },
];

const BarChartComponent = () => {
  const dispatch = useDispatch()
  const { currentUser,countUser, dashboardData} = useSelector((state) => state.user);
  useEffect(()=>{
    dispatch(getTotalDashboard())
  },[])
  // let data = [];
  // for (let i = 0; i < 12; i++)
  //   if(dashboardData[i])
  //   data.push({
  //     name: 'Tháng' + (i + 1),
  //     user: 4000,
  //     post: 2400,
  //     appointment: 12,
  //   });
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
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
  if (active && payload && payload.length) {
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