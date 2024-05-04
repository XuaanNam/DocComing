import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  currentUser: null,
  auth: "",
  username: "",
  loading: false,
  error: "",
  checked: true,
  token: "",
  data: [],
  user: {},
  updated: false,
};
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

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    auth: (state, action) => {},
    logout: (state, action) => {
      state.token = null;
      state.currentUser = null;
      state.user = {};
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    // [emailChecked.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [emailChecked.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.emailChecked = payload.checked;
    //   if (payload.checked === false) {
    //     state.msg = payload.message;
    //   }
    // },
    // [emailChecked.rejected]: (state, action) => {
    //   state.loading = true;
    // },
    // [signUpUser.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [signUpUser.fulfilled]: (
    //   state,
    //   { payload: { error, message, checked } }
    // ) => {
    //   state.loading = false;
    //   if (error) {
    //     state.error = error;
    //     state.signupmsg = message;
    //   } else {
    //     if (checked) {
    //       state.signupmsg = message;
    //       state.checked = checked;
    //     }
    //   }
    // },
    // [signUpUser.rejected]: (state, action) => {
    //   state.loading = true;
    // },

    // [signInUser.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [signInUser.fulfilled]: (
    //   state,
    //   { payload: { error, authentication, token, username, checked, message } }
    // ) => {
    //   if (error) {
    //     state.error = error;
    //     state.loading = true;
    //   } else {
    //     if (checked) {
    //       state.loading = false;
    //       state.auth = authentication;
    //       state.token = token;
    //       state.username = username;
    //       localStorage.setItem("auth", authentication);
    //       localStorage.setItem("token", token);
    //       localStorage.setItem("user", username);
    //       state.signinmsg = "";
    //       if (authentication !== 1) {
    //         window.location.reload();
    //       }
    //     } else {
    //       state.signinmsg = message;
    //     }
    //   }
    // },
    // [signInUser.rejected]: (state, action) => {
    //   state.loading = true;
    // },
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
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
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
        state.checked = payload;
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
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = true;
      });

    // [changeProfile.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [changeProfile.fulfilled]: (state, { payload }) => {
    //   if (payload.checked === true) {
    //     state.checked = payload.checked;
    //     toast.success("Cập nhật thông tin thành công", {
    //       position: "bottom-right",
    //     });
    //   } else {
    //     state.message = payload.message;
    //   }
    // },
    // [changeProfile.rejected]: (state, action) => {
    //   state.loading = true;
    // },
  },
});
export const { addToken, addUser, logout } = authSlice.actions;

export default authSlice.reducer;
