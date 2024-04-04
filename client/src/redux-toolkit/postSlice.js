import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  postId: "",
  loading: false,
  error: "",
  img: "",
  checked: false,
};
export const createPost = createAsyncThunk("createPost", async (body) => {
  const res = await fetch("http://localhost:5000/api/post/create", {
    method: "POST",
    body,
  });
  console.log(body);
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
      });
  },
});
export const {} = postSlice.actions;
export default postSlice.reducer;
