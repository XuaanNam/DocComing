import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  currentUser: null,
  auth: "",
  username: "",
  loading: false,
  error: "",
  checked: false,
  token: "",
  data: [],
  user: {},
  updated: false,
  message: "",
  doctors: [],
  detailDoctor: {},
};

export const userRegister = createAsyncThunk("userRegister", async (body) => {
  const res = await fetch("http://localhost:5000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const loginGoogle = createAsyncThunk("loginGoogle", async (body) => {
  const res = await fetch("http://localhost:5000/api/auth/google/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const login = createAsyncThunk("login", async (body) => {
  const res = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const authentication = createAsyncThunk("authentication", async () => {
  const res = await fetch("http://localhost:5000/api/isauth", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  return await res.json();
});
export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const res = await fetch("http://localhost:5000/api/admin/account", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJEb2Njb21pbmciLCJpZCI6MjM1NTIzNDg0LCJBdXRob3JpemF0aW9uIjowLCJpYXQiOjE3MTM5NTczNDMsImV4cCI6MTk3MzE1NzM0M30.H15KHG8BZ8rSbAbRDEvfpf8knUKw32iZ8Elr544AOH8",
    },
  });
  return await res.json();
});
export const fetchProfile = createAsyncThunk("fetchProfile", async () => {
  const res = await fetch("http://localhost:5000/api/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  return await res.json();
});
export const updateProfile = createAsyncThunk("updateProfile", async (body) => {
  console.log("body", body);
  const res = await fetch("http://localhost:5000/api/profile/update", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    body,
  });
  return await res.json();
});
export const getAllDoctors = createAsyncThunk("getAllDoctors", async () => {
  const res = await fetch("http://localhost:5000/api/doctor", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
});
export const getDetailDoctor = createAsyncThunk(
  "getDetailDoctor",
  async (body) => {
    const res = await fetch(`http://localhost:5000/api/doctor/${body}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  }
);
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    auth: (state, action) => {},
    logout: (state, action) => {
      state.token = null;
      state.currentUser = null;
      state.user = {};
      state.isLogin = false;
      state.auth = "";
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginGoogle.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginGoogle.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.token = action.payload?.token;
        localStorage.setItem("token", action.payload?.token);
      })
      .addCase(loginGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload?.checked === false) {
          state.checked = action.payload.checked;
          state.message = action.payload.message;
        } else {
          state.message = "";
          state.loading = false;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload?.token);
          state.currentUser = action.payload;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(authentication.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(authentication.fulfilled, (state, { payload }) => {
        state.auth = payload.authentication.Authorization;
      })
      .addCase(authentication.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        console.log(action.payload.data);
        state.updated = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.checked = payload.checked;
        toast.success("Cập nhật thành công", {
          position: "top-right",
        });
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, { payload }) => {
        state.user = payload;
        localStorage.setItem("userInfo", JSON.stringify(payload));
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(userRegister.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        if (action.payload.checked) {
          toast.success(action.payload.message, {
            position: "top-right",
          });
        } else {
          toast.error(action.payload.message, {
            position: "top-right",
          });
          state.message = action.payload.message;
        }
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllDoctors.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllDoctors.fulfilled, (state, { payload }) => {
        state.doctors = payload.data;
        state.loading = false;
      })
      .addCase(getAllDoctors.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(getDetailDoctor.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDetailDoctor.fulfilled, (state, { payload }) => {
        state.detailDoctor = payload.data;
        state.loading = false;
      })
      .addCase(getDetailDoctor.rejected, (state, action) => {
        state.loading = true;
      });
  },
});
export const { addToken, addUser, logout } = authSlice.actions;

export default authSlice.reducer;
