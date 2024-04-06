import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  postId: "",
  loading: false,
  error: "",
  img: "",
  checked: false,
  data: [],
};
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
export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  const res = await fetch("http://localhost:5000/api/category", {
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
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = true;
      })
      //fetchCategories
      .addCase(fetchCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = true;
      });
  },
});
export const {} = postSlice.actions;
export default postSlice.reducer;
