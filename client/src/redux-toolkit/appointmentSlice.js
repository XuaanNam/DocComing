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
  ratingDoctor: [],
  HealthRecordData: []
};

// const SERVER_URL =  "https://server.doccoming.online"
const SERVER_URL =  "http://localhost:5001"

export const fetchService = createAsyncThunk("fetchService", async (body) => {
  const res = await fetch(SERVER_URL + "/api/doctor/service", {
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
    const res = await fetch(SERVER_URL + "/api/service", {
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
  const res = await fetch(SERVER_URL + "/api/doctor/service/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const deleteService = createAsyncThunk("deleteService", async (body) => {
  const res = await fetch(SERVER_URL + "/api/doctor/service/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const fetchSchedule = createAsyncThunk("fetchSchedule", async (body) => {
  const res = await fetch(
    SERVER_URL + `/api/schedule/${body.idDoctor}/${body.DateBooking}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await res.json();
});
export const updateSchedule = createAsyncThunk(
  "updateSchedule",
  async (body) => {
    const res = await fetch(SERVER_URL + "/api/schedule", {
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
export const fetchDoctorSchedule = createAsyncThunk(
  "fetchDoctorSchedule",
  async (body) => {
    const res = await fetch(
      SERVER_URL + `/api/doctor/schedule/${body}`,
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
export const fetchAppointment = createAsyncThunk(
  "fetchAppointment",
  async () => {
    const res = await fetch(SERVER_URL + "/api/appointment", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    return await res.json();
  }
);
export const fetchAdminAppointment = createAsyncThunk(
  "fetchAdminAppointment",
  async () => {
    const res = await fetch(SERVER_URL + "/api/admin/appointment", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    return await res.json();
  }
);
export const acceptAppointment = createAsyncThunk(
  "acceptAppointment",
  async (body) => {
    const res = await fetch(SERVER_URL + "/api/appointment/accept", {
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
export const completeAppointment = createAsyncThunk(
  "completeAppointment",
  async (body) => {
    const res = await fetch(SERVER_URL + "/api/appointment/complete", {
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
export const cancelAppointment = createAsyncThunk(
  "cancelAppointment",
  async (body) => { 
    const res = await fetch(SERVER_URL + "/api/appointment/cancel", {
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
export const createAppointment = createAsyncThunk(
  "createAppointment",
  async (body) => {
    const res = await fetch(SERVER_URL + "/api/appointment/create", {
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
export const ratingDoctor = createAsyncThunk(
  "ratingDoctor",
  async (body) => {
    const res = await fetch(SERVER_URL + "/api/rating", {
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
export const updateRatingDoctor = createAsyncThunk(
  "updateRatingDoctor",
  async (body) => {
    const res = await fetch(SERVER_URL + "/api/rating/update", {
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
export const getRatingDoctor = createAsyncThunk(
  "getRatingDoctor",
  async (body) => {
    const res = await fetch(SERVER_URL + `/api/rating/${body}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  }
);
export const noteAppointment = createAsyncThunk(
  "noteAppointment",
  async (body) => {
    const res = await fetch(SERVER_URL + "/api/appointment/note", {
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
export const editNoteAppointment = createAsyncThunk(
  "editNoteAppointment",
  async (body) => {
    const res = await fetch(SERVER_URL + "/api/appointment/note/update", {
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
export const acceptNoteAppointment = createAsyncThunk(
  "acceptNoteAppointment",
  async (body) => {
    const res = await fetch(SERVER_URL + "/api/appointment/note/accept", {
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
export const cancelNoteAppointment = createAsyncThunk(
  "cancelNoteAppointment",
  async (body) => {
    const res = await fetch(SERVER_URL + "/api/appointment/note/cancel", {
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
export const fetchHealthRecord = createAsyncThunk(
  "fetchHealthRecord",
  async () => {
    const res = await fetch(SERVER_URL + "/api/medical/record", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    return await res.json();
  }
);
export const healthRecord = createAsyncThunk(
  "healthRecord",
  async (body) => {
    const res = await fetch(SERVER_URL + "/api/medical/record", {
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
export const updateHealthRecord = createAsyncThunk(
  "updateHealthRecord",
  async (body) => {
    const res = await fetch(SERVER_URL + "/api/medical/record/update", {
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
        state.loading = true;
      })
      .addCase(fetchAllService.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllService.fulfilled, (state, action) => {
        state.allService = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchAllService.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(addService.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.add = action.payload;
        toast.success("Cập nhật dịch vụ thành công", {
          position: "top-right",
        });
        state.loading = false;
      })
      .addCase(addService.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteService.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.delete = action.payload;
        state.loading = false;
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = true;
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
        state.loading = true;
      })
      .addCase(fetchDoctorSchedule.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDoctorSchedule.fulfilled, (state, action) => {
        state.ScheduleData = action.payload.ScheduleData;
        state.loading = false;
      })
      .addCase(fetchDoctorSchedule.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(updateSchedule.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateSchedule.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        toast.success("Cập nhật lịch thành công", {
          position: "top-right",
        });
        state.loading = false;
      })
      .addCase(updateSchedule.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAppointment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAppointment.fulfilled, (state, action) => {
        state.AppointmentData = action.payload.AppointmentData;
        state.loading = false;
      })
      .addCase(fetchAppointment.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(fetchAdminAppointment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAdminAppointment.fulfilled, (state, action) => {
        state.countAppointment = action.payload.count
        state.AppointmentData = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchAdminAppointment.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(acceptAppointment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(acceptAppointment.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        state.loading = false;
      })
      .addCase(acceptAppointment.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(completeAppointment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(completeAppointment.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        state.loading = false;
      })
      .addCase(completeAppointment.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(cancelAppointment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        state.loading = false;
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(createAppointment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        state.loading = false;
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = true;
      })
      //ratingDoctor
      .addCase(ratingDoctor.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(ratingDoctor.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        state.loading = false;
      })
      .addCase(ratingDoctor.rejected, (state, action) => {
        state.loading = true;
      })
      //updateRatingDoctor
      .addCase(updateRatingDoctor.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateRatingDoctor.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        state.loading = false;
      })
      .addCase(updateRatingDoctor.rejected, (state, action) => {
        state.loading = true;
      })
      //getRatingDoctor
      .addCase(getRatingDoctor.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getRatingDoctor.fulfilled, (state, action) => {
        state.ratingDoctor = action.payload.data;
        state.loading = false;
      })
      .addCase(getRatingDoctor.rejected, (state, action) => {
        state.loading = true;
      })
      //noteAppointment
      .addCase(noteAppointment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(noteAppointment.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        state.loading = false;
      })
      .addCase(noteAppointment.rejected, (state, action) => {
        state.loading = true;
      })
      //editNoteAppointment
      .addCase(editNoteAppointment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editNoteAppointment.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        state.loading = false;
      })
      .addCase(editNoteAppointment.rejected, (state, action) => {
        state.loading = true;
      })
      //acceptNoteAppointment
      .addCase(acceptNoteAppointment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(acceptNoteAppointment.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        state.loading = false;
      })
      .addCase(acceptNoteAppointment.rejected, (state, action) => {
        state.loading = true;
      })
      //cancelNoteAppointment
      .addCase(cancelNoteAppointment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(cancelNoteAppointment.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        state.loading = false;
      })
      .addCase(cancelNoteAppointment.rejected, (state, action) => {
        state.loading = true;
      })
      //fetchHealthRecord
      .addCase(fetchHealthRecord.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchHealthRecord.fulfilled, (state, action) => {
        state.HealthRecordData = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchHealthRecord.rejected, (state, action) => {
        state.loading = true;
      })
      //healthRecord
      .addCase(healthRecord.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(healthRecord.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        state.loading = false;
      })
      .addCase(healthRecord.rejected, (state, action) => {
        state.loading = true;
      })
      //updateHealthRecord
      .addCase(updateHealthRecord.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateHealthRecord.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        state.loading = false;
      })
      .addCase(updateHealthRecord.rejected, (state, action) => {
        state.loading = true;
      })
      ;
  },
});
export const {} = appointmentSlice.actions;

export default appointmentSlice.reducer;
