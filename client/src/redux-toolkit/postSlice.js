import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { toast } from "react-toastify";

const initialState = {
  postId: "",
  loading: false,
  error: "",
  img: "",
  checked: false,
  data: [],
  detailPost: {},
  category: [],
  allPost: [],
};
//admin
export const createPost = createAsyncThunk("createPost", async (body) => {
  const res = await fetch("http://localhost:5000/api/post/create", {
    method: "POST",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJEb2Njb21pbmciLCJpZCI6MjM1NTIzNDg0LCJBdXRob3JpemF0aW9uIjowLCJpYXQiOjE3MTIzOTExMjYsImV4cCI6MTk3MTU5MTEyNn0.vBtdi41gAY9MYeAT7E83d6RSWg7Eh-0JQxTXTCVkVqA",
    },
    body,
  });
  console.log(body);
  return await res.json();
});
export const fetchPost = createAsyncThunk("fetchPost", async () => {
  const res = await fetch("http://localhost:5000/api/admin/post", {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJEb2Njb21pbmciLCJpZCI6MjM1NTIzNDg0LCJBdXRob3JpemF0aW9uIjowLCJpYXQiOjE3MTIzOTExMjYsImV4cCI6MTk3MTU5MTEyNn0.vBtdi41gAY9MYeAT7E83d6RSWg7Eh-0JQxTXTCVkVqA",
    },
  });
  return await res.json();
});
//user
export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  const res = await fetch("http://localhost:5000/api/category", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
});
export const getAllPost = createAsyncThunk("getAllPost", async (body) => {
  const res = await fetch("http://localhost:5000/api/post", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
});
export const getDetailPost = createAsyncThunk("getDetailPost", async (body) => {
  const res = await fetch(`http://localhost:5000/api/post/detail/${body}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        toast.success("Tạo bài viết thành công!", {
          position: "top-right",
        });
        if (action.payload.checked === false) {
          state.message = action.payload.message;
        }
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = true;
      })
      //fetchCategories
      .addCase(fetchCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.category = action.payload.data;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = true;
      })
      //fetchPost
      .addCase(fetchPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.loading = true;
      })
      //getDetailPost
      .addCase(getDetailPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDetailPost.fulfilled, (state, action) => {
        state.detailPost = action.payload.data;
        state.loading = false;
      })
      .addCase(getDetailPost.rejected, (state, action) => {
        state.loading = true;
      })
      //getAllPosts
      .addCase(getAllPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllPost.fulfilled, (state, action) => {
        state.allPost = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllPost.rejected, (state, action) => {
        state.loading = true;
      });
  },
});
export const {} = postSlice.actions;
export default postSlice.reducer;
