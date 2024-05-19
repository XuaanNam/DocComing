import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  error: "",
  checked: false,
  message: "",
  token: "",
  user: {},
  allService: [],
  service: [],
  schedule: {},
  AppointmentData: [],
  ScheduleData: [],
};
export const fetchAppointment = createAsyncThunk(
  "fetchAppointment",
  async () => {
    const res = await fetch("http://localhost:5000/api/appointment", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    return await res.json();
  }
);
export const fetchService = createAsyncThunk("fetchService", async (body) => {
  const res = await fetch("http://localhost:5000/api/doctor/service", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const fetchAllService = createAsyncThunk(
  "fetchAllService",
  async (body) => {
    const res = await fetch("http://localhost:5000/api/service", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  }
);
export const addService = createAsyncThunk("addService", async (body) => {
  const res = await fetch("http://localhost:5000/api/doctor/service/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const fetchSchedule = createAsyncThunk("fetchSchedule", async (body) => {
  const res = await fetch(
    `http://localhost:5000/api/schedule/${body.idDoctor}/${body.DateBooking}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await res.json();
});

export const fetchDoctorSchedule = createAsyncThunk(
  "fetchDoctorSchedule",
  async (body) => {
    const res = await fetch(
      `http://localhost:5000/api/doctor/schedule/${body}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return await res.json();
  }
);

export const createAppointment = createAsyncThunk(
  "createAppointment",
  async (body) => {
    const res = await fetch("http://localhost:5000/api/appointment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  }
);
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
      })
      .addCase(fetchAllService.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllService.fulfilled, (state, action) => {
        state.allService = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchAllService.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addService.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addService.fulfilled, (state, action) => {
        // state.allService = action.payload.data;
        state.loading = false;
      })
      .addCase(addService.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchSchedule.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchSchedule.fulfilled, (state, action) => {
        state.AppointmentData = action.payload.AppointmentData;
        state.ScheduleData = action.payload.ScheduleData;
        state.loading = false;
        // state.checked = action.payload.checked;
      })
      .addCase(fetchSchedule.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchDoctorSchedule.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDoctorSchedule.fulfilled, (state, action) => {
        state.ScheduleData = action.payload.ScheduleData;
        state.loading = false;
      })
      .addCase(fetchDoctorSchedule.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchAppointment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAppointment.fulfilled, (state, action) => {
        state.AppointmentData = action.payload.AppointmentData;
        state.loading = false;
      })
      .addCase(fetchAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAppointment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        state.loading = false;
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export const {} = appointmentSlice.actions;

export default appointmentSlice.reducer;
