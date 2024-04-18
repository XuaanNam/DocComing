import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  error: "",
  checked: true,
  token: "",
  data: [],
  user: {},
  service: [],
  schedule: {},
  AppointmentData: [],
  ScheduleData: [],
};
export const fetchService = createAsyncThunk("fetchService", async (body) => {
  const res = await fetch("http://localhost:5000/api/service/doctors", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const fetchSchedule = createAsyncThunk("fetchSchedule", async (body) => {
  const res = await fetch("http://localhost:5000/api/doctor/schedule", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchService.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchService.fulfilled, (state, action) => {
        state.service = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSchedule.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchSchedule.fulfilled, (state, action) => {
        state.AppointmentData = action.payload.AppointmentData;
        state.ScheduleData = action.payload.ScheduleData;
        state.loading = false;
      })
      .addCase(fetchSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const {} = appointmentSlice.actions;

export default appointmentSlice.reducer;
