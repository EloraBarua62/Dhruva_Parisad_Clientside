import api from "@component/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { info } from "sass";

export const studentRegistration = createAsyncThunk(
  "student/studentRegistration",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post("/student/registration", info, {
        withCredentials: true,
      });
      console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const studentReducer = createSlice({
    name: "student",
    initialState: {
    successMessage: "",
    errorMessage: "",
    isLoading: false,
    studentInfo: [],
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    // Registration action
    builder.addCase(studentRegistration.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(studentRegistration.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload?.error;
    });
    builder.addCase(studentRegistration.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.studentInfo = payload.studentInfo;
      state.successMessage = payload?.message;
    });
}
})


export const { messageClear } = studentReducer.actions;
export default studentReducer.reducer;