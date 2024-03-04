import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const newsPublish = createAsyncThunk(
  "news/newsPublish",
  async (info, { rejectWithValue, fulfillWithValue }) => {
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

export const newsReducer = createSlice({
  name: "news",
  initialState: {
    successMessage: "",
    errorMessage: "",
    isLoading: false,
    newsInfo: "",
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
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