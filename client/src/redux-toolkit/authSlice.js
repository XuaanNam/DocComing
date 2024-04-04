import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

const initialState = {
  currentUser: null,
  auth: "",
  username: "",
  loading: false,
  error: "",
  checked: true,
};
export const loginGoogle = createAsyncThunk("loginGoogle", async () => {
  const res = await fetch("http://localhost:5000/api/auth/google", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
});
// export const signInUser = createAsyncThunk("signinuser", async (body) => {
//   const res = await fetch("http://localhost:5000/api/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   });
//   return await res.json();
// });
// export const signUpUser = createAsyncThunk("signupuser", async (body) => {
//   console.log("body", body);
//   const res = await fetch("http://localhost:5000/api/register", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   });
//   return await res.json();
// });
export const getProfile = createAsyncThunk("getProfile", async () => {
  const res = await fetch("http://localhost:5000/api/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  return await res.json();
});
// export const changeProfile = createAsyncThunk("changeProfile", async (body) => {
//   console.log("body", body);
//   const res = await fetch("http://localhost:5000/api/profile/update", {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: localStorage.getItem("token"),
//     },
//     body: JSON.stringify(body),
//   });
//   return await res.json();
// });
// export const emailChecked = createAsyncThunk("emailChecked", async (body) => {
//   console.log("body", body);
//   const res = await fetch("http://localhost:5000/api/check/email", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   });
//   return await res.json();
// });
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    auth: (state, action) => {},
    logout: (state, action) => {
      state.token = null;
      localStorage.clear();
    },
    loginPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginFulfilled: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginRejected: (state, action) => {
      state.loading = false;
      state.error = action.payload;
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
      })
      .addCase(loginGoogle.fulfilled, (state, action) => {
        // state.auth = payload.authentication;
        state.loading = false;
      })
      .addCase(loginGoogle.rejected, (state, action) => {
        state.loading = true;
      });
    // .addCase(getProfile.pending, (state, action) => {
    //   state.loading = true;
    // })
    // .addCase(getProfile.fulfilled, (state, { payload }) => {
    //   state.auth = payload.authentication;
    // })
    // .addCase(getProfile.rejected, (state, action) => {
    //   state.loading = true;
    // });
    // [getProfile.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [getProfile.fulfilled]: (state, { payload }) => {
    //   if (payload.results) state.items = { ...payload.results[0] };
    //   else {
    //     state.message = payload.message;
    //   }
    // },
    // [getProfile.rejected]: (state, action) => {
    //   state.loading = true;
    // },

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
export const { addToken, addUser, logout,
  loginPending,
  loginFulfilled,
  loginRejected,} = authSlice.actions;

export default authSlice.reducer;
