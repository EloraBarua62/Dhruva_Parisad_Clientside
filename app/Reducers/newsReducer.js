import api from "@component/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const newsPublish = createAsyncThunk(
  "news/newsPublish",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    // console.log(info)
    try {
      const { data } = await api.post("/news/publish", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const displayNews = createAsyncThunk(
  "news/displayNews",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const {count} = info;
      const { data } = await api.get(`/news/all-news?count=${count}`, {
        withCredentials: true,
      });        
       
      return fulfillWithValue(data);  
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminDisplayNews = createAsyncThunk(
  "news/adminDisplayNews",
  async ({ parPage, page }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/news/admin-display?page=${page}&&parPage=${parPage}`,
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateInfo = createAsyncThunk(
  "news/updateInfo",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    const id = info._id;
    console.log(id, info);
    try {
      const { data } = await api.patch(`/news/update-info/${id}`, info, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue({ id, info, data });
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteInfo = createAsyncThunk(
  "news/deleteInfo",
  async (data, { rejectWithValue, fulfillWithValue }) => {
    const id = data.id;
    console.log(id);
    try {
      const { data } = await api.delete(`/news/delete-info/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue({ id, data });
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const examResultDate = createAsyncThunk(
  "news/examResultDate",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info)
    try {
      const { data } = await api.patch("/news/exam-result/", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const newsReducer = createSlice({
  name: "news",
  initialState: {
    successMessage: "",
    errorMessage: "",
    isLoading: false,
    important_date: "",
    newsList: [],
    adminNewsList: [],
    totalData: 1000,
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    // display news for general user
    builder.addCase(displayNews.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(displayNews.rejected, (state, { payload }) => {
      state.errorMessage = payload?.error;
      state.isLoading = false;
    });
    builder.addCase(displayNews.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.successMessage = payload?.message;
      state.newsList = payload?.newsList;
      state.important_date = payload?.important_date;
      state.isLoading = false;
    });

    // News display for admin
    builder.addCase(adminDisplayNews.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(adminDisplayNews.rejected, (state, { payload }) => {
      state.errorMessage = payload?.error;
      state.isLoading = false;
    });
    builder.addCase(adminDisplayNews.fulfilled, (state, { payload }) => {
      state.adminNewsList = payload?.adminNewsList;
      state.totalData = payload?.totalData;
      state.successMessage = payload?.message;
      state.isLoading = false;
    });

    // New news publish
    builder.addCase(newsPublish.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(newsPublish.rejected, (state, { payload }) => {
      state.errorMessage = payload?.error;
      state.isLoading = false;
    });
    builder.addCase(newsPublish.fulfilled, (state, { payload }) => {
      state.successMessage = payload?.message;
      state.isLoading = false;
    });

    // Details Fetching action
    builder.addCase(updateInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateInfo.rejected, (state, { payload }) => {
      state.errorMessage = payload?.error;
      state.isLoading = false;
    });
    builder.addCase(updateInfo.fulfilled, (state, { payload }) => {
      let parentArray = state.adminNewsList;
      const id = payload.id;
      for (let i = 0; i < parentArray.length; i++) {
        if (parentArray[i]._id === id) {
          parentArray[i] = payload.info;
          break;
        }
      }
      state.adminNewsList = parentArray;
      state.newsList = parentArray;
      state.successMessage = payload?.message;
      state.isLoading = false;
    });

    // Details Fetching action
    builder.addCase(deleteInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteInfo.rejected, (state, { payload }) => {
      state.errorMessage = payload?.error;
      state.isLoading = false;
    });
    builder.addCase(deleteInfo.fulfilled, (state, { payload }) => {
      const parentArray = state.adminNewsList;
      const id = payload.id;
      const keep_parentArray = parentArray.filter((each) => each._id !== id);
      state.adminNewsList = keep_parentArray;
      state.newsList = keep_parentArray;
      state.successMessage = payload?.message;
      state.isLoading = false;
    });

    // New news publish
    builder.addCase(examResultDate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(examResultDate.rejected, (state, { payload }) => {
      state.errorMessage = payload?.error;
      state.isLoading = false;
    });
    builder.addCase(examResultDate.fulfilled, (state, { payload }) => {
      state.successMessage = payload?.message;
      state.isLoading = false;
    });
  },
});

export const { messageClear } = newsReducer.actions;
export default newsReducer.reducer;
