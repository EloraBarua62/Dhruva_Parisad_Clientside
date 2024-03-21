import api from "@component/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const studentRegistration = createAsyncThunk(
  "student/studentRegistration",
  async (info, { rejectWithValue, fulfillWithValue }) => {
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

export const updateInfo = createAsyncThunk(
  "student/updateInfo",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    const id = info._id;
    console.log(id, info)
    try {
      const { data } = await api.patch(`/student/update-info/${id}`, info, {
        withCredentials: true,
      });
      console.log(data)
      return fulfillWithValue({id, info, data});
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const studentDetails = createAsyncThunk(
  "student/studentDetails",
  async (_,{ rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/student/details", {
        withCredentials: true,
      });
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
    role: ''
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
      console.log('state clear')
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
      state.successMessage = payload?.message;
    });


    // Details Fetching action
    builder.addCase(studentDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(studentDetails.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload?.error;
    });
    builder.addCase(studentDetails.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.studentInfo = payload.studentInfo;
      state.successMessage = payload?.message;
    });

    // Details Fetching action
    builder.addCase(updateInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateInfo.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload?.error;
    });
    builder.addCase(updateInfo.fulfilled, (state, { payload }) => {
      let parentArray = state.studentInfo;
      const id = payload.id;
      for(let i=0 ; i < parentArray.length ; i++){
        if(parentArray[i]._id === id){
          parentArray[i] = payload.info;
          break;
        }
      }
      state.studentInfo = parentArray;
      state.successMessage = payload?.message;
      state.isLoading = false;
    });
}
})


export const { messageClear } = studentReducer.actions;
export default studentReducer.reducer;