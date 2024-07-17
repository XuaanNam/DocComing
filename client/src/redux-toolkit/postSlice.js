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
  filter: [],
  countPost: 0,
  detailPost: {},
  SimilarDoctor: [],
  major: [],
  category: [],
  post: [],
  allPost: [],
  allSearchPost: [],
  allSearchPostAdmin:[],
  allSearchData: [],
  comment: []
};

 const SERVER_URL =  "https://server.doccoming.online"
// const SERVER_URL =  "http://localhost:5001"

//admin
export const createPost = createAsyncThunk("createPost", async (body) => {
  const res = await fetch(SERVER_URL + "/api/post/create", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),  
    },
    body,
  });
  return await res.json();
});
export const updatePost = createAsyncThunk("updatePost", async (body) => {
  console.log(body)
  const res = await fetch(SERVER_URL + "/api/post/update", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    body,
  });
  return await res.json();
});
export const fetchPost = createAsyncThunk("fetchPost", async ({filter, orderby}) => {
  const res = await fetch(SERVER_URL + `/api/admin/post/${filter}/${orderby}`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return await res.json();
});
export const postsFilter = createAsyncThunk("postsFilter", async (body) => {
  const res = await fetch(SERVER_URL + `/api/admin/post/filter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const fetchDoctorPost = createAsyncThunk("fetchDoctorPost", async () => {
  const res = await fetch(SERVER_URL + "/api/doctor/post/get", {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return await res.json();
});
//user
export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  const res = await fetch(SERVER_URL + "/api/category", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
});
export const fetchMajor = createAsyncThunk("fetchMajor", async () => {
  const res = await fetch(SERVER_URL + "/api/major", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
});
export const getAllPost = createAsyncThunk("getAllPost", async () => {
  const res = await fetch(SERVER_URL + "/api/post", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
});
export const getPostByCategory = createAsyncThunk("getPostByCategory", async (body) => {
  const res = await fetch(SERVER_URL + `/api/post/categories/${body}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
});
export const getPostBySimilarCategory = createAsyncThunk("getPostBySimilarCategory", async (body) => {
  const res = await fetch(SERVER_URL + `/api/post/categories/similar/${body}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
});
export const getDetailPost = createAsyncThunk("getDetailPost", async (body) => {
  const res = await fetch( SERVER_URL + `/api/post/detail/${body}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
});
export const acceptPost = createAsyncThunk(
  "acceptPost",
  async (body) => {
    const res = await fetch(SERVER_URL + "/api/admin/post/accept", {
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
export const hidePost = createAsyncThunk(
  "hidePost",
  async (body) => {
    const res = await fetch(SERVER_URL + "/api/admin/post/status/change", {
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
export const fetchComment = createAsyncThunk(
  "fetchComment",
  async (body) => {
    const res = await fetch(SERVER_URL + `/api/comment/${body.idPost}/${body.idAccount}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  }
);
export const createComment = createAsyncThunk(
  "createComment",
  async (body) => {
    const res = await fetch(SERVER_URL + "/api/comment/create", {
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
export const updateComment = createAsyncThunk(
  "updateComment",
  async (body) => {
    const res = await fetch(SERVER_URL + "/api/comment/update", {
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
export const deleteComment = createAsyncThunk(
  "deleteComment",
  async (body) => {
    const res = await fetch(SERVER_URL + "/api/comment/delete", {
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
export const likeComment = createAsyncThunk(
  "likeComment",
  async (body) => {
    const res = await fetch(SERVER_URL + "/api/comment/love", {
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
export const searchPost = createAsyncThunk(
  "searchPost",
  async (body) => {
    const res = await fetch(SERVER_URL + "/api/search/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  }
);
export const searchPostAdmin = createAsyncThunk(
  "searchPostAdmin",
  async (body) => {
    const res = await fetch(SERVER_URL + "/api/admin/post/search", {
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
export const searchDoctor = createAsyncThunk(
  "searchDoctor",
  async (body) => {
    const res = await fetch(SERVER_URL + "/api/search/doctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  }
);
export const searchMajor = createAsyncThunk(
  "searchMajor",
  async (body) => {
    const res = await fetch(SERVER_URL + "/api/search/major", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  }
);
export const searchDisease = createAsyncThunk(
  "searchDisease",
  async (body) => {
    const res = await fetch(SERVER_URL + "/api/search/disease", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  }
);
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
      //updatePost
      .addCase(updatePost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        toast.success("Chỉnh sửa bài viết thành công!", {
          position: "top-right",
        });
        if (action.payload.checked === false) {
          state.message = action.payload.message;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = true;
      })
      //fetchMajor
      .addCase(fetchMajor.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchMajor.fulfilled, (state, action) => {
        state.major = action.payload.data;
      })
      .addCase(fetchMajor.rejected, (state, action) => {
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
      //fetchPost-Admin
      .addCase(fetchPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.countPost = action.payload.count
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.loading = true;
      })
      //postsFilter-Admin
      .addCase(postsFilter.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(postsFilter.fulfilled, (state, action) => {
        state.filter = action.payload.data;
        state.countPost = action.payload.count
      })
      .addCase(postsFilter.rejected, (state, action) => {
        state.loading = true;
      })
      //fetchPost-Doctor
      .addCase(fetchDoctorPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDoctorPost.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(fetchDoctorPost.rejected, (state, action) => {
        state.loading = true;
      })
      //getDetailPost
      .addCase(getDetailPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDetailPost.fulfilled, (state, action) => {
        state.detailPost = action.payload.data;
        state.SimilarDoctor = action.payload.SimilarDoctor
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
      })
      //getPostByCategory
      .addCase(getPostByCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPostByCategory.fulfilled, (state, action) => {
        state.post = action.payload.data;
        state.loading = false;
      })
      .addCase(getPostByCategory.rejected, (state, action) => {
        state.loading = true;
      })
      //getPostBySimilarCategory
      .addCase(getPostBySimilarCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPostBySimilarCategory.fulfilled, (state, action) => {
        state.post = action.payload.data;
        state.loading = false;
      })
      .addCase(getPostBySimilarCategory.rejected, (state, action) => {
        state.loading = true;
      })
      //acceptPost
      .addCase(acceptPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(acceptPost.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        state.loading = false;
      })
      .addCase(acceptPost.rejected, (state, action) => {
        state.loading = true;
      })
      //hidePost
      .addCase(hidePost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(hidePost.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        state.loading = false;
      })
      .addCase(hidePost.rejected, (state, action) => {
        state.loading = true;
      })
      //getComment
      .addCase(fetchComment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchComment.fulfilled, (state, action) => {
        state.comment = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchComment.rejected, (state, action) => {
        state.loading = true;
      })
      //createComment
      .addCase(createComment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        state.loading = false;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = true;
      })
      //updateComment
      .addCase(updateComment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        state.loading = false;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = true;
      })
      //deleteComment
      .addCase(deleteComment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        state.loading = false;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = true;
      })
      //likeComment
      .addCase(likeComment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        state.checked = action.payload.checked;
        state.loading = false;
      })
      .addCase(likeComment.rejected, (state, action) => {
        state.loading = true;
      })
      //searchPost
      .addCase(searchPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchPost.fulfilled, (state, action) => {
        state.allSearchPost = action.payload.data;
        state.loading = false;
      })
      .addCase(searchPost.rejected, (state, action) => {
        state.loading = true;
      })
      //searchPost
      .addCase(searchPostAdmin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchPostAdmin.fulfilled, (state, action) => {
        console.log(action.payload.data)
        state.allSearchPostAdmin = action.payload.data;
        state.loading = false;
      })
      .addCase(searchPostAdmin.rejected, (state, action) => {
        state.loading = true;
      })
      //searchDoctor
      .addCase(searchDoctor.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchDoctor.fulfilled, (state, action) => {
        state.allSearchData = action.payload.data;
        state.loading = false;
      })
      .addCase(searchDoctor.rejected, (state, action) => {
        state.loading = true;
      })
      //searchMajor
      .addCase(searchMajor.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchMajor.fulfilled, (state, action) => {
        console.log(action.payload.data)
        state.allSearchData = action.payload.data;
        state.loading = false;
      })
      .addCase(searchMajor.rejected, (state, action) => {
        state.loading = true;
      })
      //searchDisease
      .addCase(searchDisease.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchDisease.fulfilled, (state, action) => {
        state.allSearchData = action.payload.data;
        state.loading = false;
      })
      .addCase(searchDisease.rejected, (state, action) => {
        state.loading = true;
      })
      ;
  },
});
export const {} = postSlice.actions;
export default postSlice.reducer;
