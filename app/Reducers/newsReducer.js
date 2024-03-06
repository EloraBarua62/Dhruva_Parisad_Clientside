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
    // console.log(info)
    try {
      const { data } = await api.get("/news/display", info, {
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
    newsList: [],
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(displayNews.pending, (state)=> {
        state.isLoading = true;
    });
    builder.addCase(displayNews.rejected, (state, {payload})=> {
        state.errorMessage = payload.error;
        state.isLoading = false;
    });
    builder.addCase(displayNews.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
      state.newsList = payload.newsList;
      state.isLoading = false;
    });

    builder.addCase(newsPublish.pending, (state)=> {
        state.isLoading = true;
    });
    builder.addCase(newsPublish.rejected, (state, {payload})=> {
        state.errorMessage = payload.error;
        state.isLoading = false;
    });
    builder.addCase(newsPublish.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
      state.isLoading = false;
    });
  }
});

export const { messageClear } = newsReducer.actions;
export default newsReducer.reducer;