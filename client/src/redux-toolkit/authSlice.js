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
  filter: [],
  countUser: 0,
  allSearchUsers: [],
  user: {},
  updated: false,
  message: "",
  doctors: [],
  detailDoctor: {},
  allNoti: {},
  checkRead: false,
  dashboardData: []
};

const SERVER_URL =  "http://localhost:5001"

export const userRegister = createAsyncThunk("userRegister", async (body) => {
  const res = await fetch(SERVER_URL + "/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const doctorRegister = createAsyncThunk("doctorRegister", async (body) => {
  const res = await fetch(SERVER_URL + "/api/admin/account/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const loginGoogle = createAsyncThunk("loginGoogle", async (body) => {
  const res = await fetch(SERVER_URL + "/api/auth/google/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const login = createAsyncThunk("login", async (body) => {
  const res = await fetch(SERVER_URL + "/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const sendMail = createAsyncThunk("sendMail", async (body) => {
  const res = await fetch(SERVER_URL + "/api/send/mail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const changePassword = createAsyncThunk("changePassword", async (body) => {
  const res = await fetch(SERVER_URL + "/api/change/password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const resetPassword = createAsyncThunk("resetPassword", async (body) => {
  const res = await fetch(SERVER_URL + "/api/reset/password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const authentication = createAsyncThunk("authentication", async (body) => {
  const res = await fetch(SERVER_URL + "/api/isauth", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: body,
    },
  });
  return await res.json();
});
export const fetchUsers = createAsyncThunk("fetchUsers", async ({filter, orderby}) => {
  const res = await fetch( SERVER_URL + `/api/admin/account/${filter}/${orderby}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  return await res.json();
});
export const usersFilter = createAsyncThunk("usersFilter", async (body) => {
  const res = await fetch( SERVER_URL + `/api/admin/account/filter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const searchUser = createAsyncThunk(
  "searchUser",
  async (body) => {
    const res = await fetch(SERVER_URL + `/api/admin/account/search`, {
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
export const deleteAccount = createAsyncThunk("deleteAccount", async (body) => {
  const res = await fetch(SERVER_URL + "/api/admin/account/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const fetchProfile = createAsyncThunk("fetchProfile", async () => {
  const res = await fetch(SERVER_URL + "/api/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  return await res.json();
});
export const updateProfile = createAsyncThunk("updateProfile", async (body) => {
  const res = await fetch(SERVER_URL + "/api/profile/update", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    body,
  });
  return await res.json();
});
export const getAllDoctors = createAsyncThunk("getAllDoctors", async () => {
  const res = await fetch(SERVER_URL + "/api/doctor", {
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
    const res = await fetch(SERVER_URL + `/api/doctor/${body}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  }
);
export const getAllNotification = createAsyncThunk("getAllNotification", async () => {
  const res = await fetch(SERVER_URL + "/api/notification", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  return await res.json();
});
export const readNotification = createAsyncThunk("readNotification", async (body) => {
  const res = await fetch(SERVER_URL + "/api/notification/read", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const getTotalDashboard = createAsyncThunk("getTotalDashboard", async () => {
  const res = await fetch(SERVER_URL + "/api/admin/dashboard", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  return await res.json();
});
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
      state.allNoti = {}
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
        state.loading = true;
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
        state.loading = true;
      })

      .addCase(sendMail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sendMail.fulfilled, (state, action) => {
        state.sendMailMessage = action.payload.message;
        if (action.payload.checked) {
          toast.success(action.payload.message, {
            position: "top-right",
          });
        } else {
          toast.error(action.payload.message, {
            position: "top-right",
          });
        }
        state.loading = false;
      })
      .addCase(sendMail.rejected, (state, action) => {
        state.loading = true;
      })

      .addCase(resetPassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        if (action.payload.checked) {
          toast.success("Đổi mật khẩu thành công", {
            position: "top-right",
          });
        } 
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = true;
      })

      .addCase(changePassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.message = action.payload.message;
        if (action.payload.checked) {
          toast.success("Đổi mật khẩu thành công", {
            position: "top-right",
          });
        }
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = true;
      })

      .addCase(authentication.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(authentication.fulfilled, (state, { payload }) => {
        state.auth = payload.authentication;
        state.loading = false;
      })
      .addCase(authentication.rejected, (state, action) => {
        state.loading = true;
      })

      .addCase(fetchUsers.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.countUser = action.payload.count;
        state.updated = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      
      .addCase(usersFilter.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(usersFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.filter = action.payload.data;
      })
      .addCase(usersFilter.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })

      .addCase(searchUser.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.allSearchUsers = action.payload.data;
        state.updated = true;
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.loading = true;
        state.error = false;
      })

      .addCase(deleteAccount.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.checked = action.payload.checked;
        state.message = action.payload.message;
        if (action.payload.checked) {
          toast.success("Đã xóa người dùng", {
            position: "top-right",
          });
        }
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = true;
      })

      .addCase(updateProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.checked = payload.checked;
        state.message = payload.message;
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = true;
      })

      .addCase(fetchProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loading = false;
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
          toast.success("Tạo tài khoản thành công", {
            position: "top-right",
          });
        } else {
          toast.error(action.payload.message.sqlMessage, {
            position: "top-right",
          });
          state.message = action.payload.message.sqlMessage;
        }
        state.loading = false;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = true;
      })
      //doctorRegister
      .addCase(doctorRegister.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(doctorRegister.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        state.loading = false;
        if (action.payload.checked) {
          toast.success("Tạo tài khoản thành công", {
            position: "top-right",
          });
        } else {
          toast.error(action.payload.message.sqlMessage, {
            position: "top-right",
          });
          state.message = action.payload.message.sqlMessage;
        }
      })
      .addCase(doctorRegister.rejected, (state, action) => {
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
      })

      .addCase(getAllNotification.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllNotification.fulfilled, (state, { payload }) => {
        state.allNoti = payload;
        state.loading = false;
      })
      .addCase(getAllNotification.rejected, (state, action) => {
        state.loading = true;
      })

      .addCase(readNotification.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(readNotification.fulfilled, (state, { payload }) => {
        state.checkRead = payload.checked;
        state.loading = false;
      })
      .addCase(readNotification.rejected, (state, action) => {
        state.loading = true;
      })

      .addCase(getTotalDashboard.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTotalDashboard.fulfilled, (state, { payload }) => {
        state.dashboardData = payload.data;
        state.loading = false;
      })
      .addCase(getTotalDashboard.rejected, (state, action) => {
        state.loading = true;
      })
      ;
  },
});
export const { addToken, addUser, logout } = authSlice.actions;

export default authSlice.reducer;
