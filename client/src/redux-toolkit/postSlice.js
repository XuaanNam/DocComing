import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  postId: "",
  loading: false,
  error: "",
  checked: true,
};
export const createPost = createAsyncThunk("createPost", async () => {
  const res = await fetch("http://localhost:5000/api/post/create", {
    method: "POST",
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
        // state.auth = payload.authentication;
        state.loading = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = true;
      });
  },
});
export const {} = postSlice.actions;
export default postSlice.reducer;
