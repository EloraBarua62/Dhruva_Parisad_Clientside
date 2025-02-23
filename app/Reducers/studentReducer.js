import api from "@component/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const newStudentRegistration = createAsyncThunk(
  "student/newStudentRegistration",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/student/new-registration", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const previousStudentRegistration = createAsyncThunk(
  "student/previousStudentRegistration",
  async ({roll, info}, { rejectWithValue, fulfillWithValue }) => {

    try {
      const { data } = await api.patch(`/student/previous-registration/${roll}`, info, {
        withCredentials: true,
      });
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
    
    try {
      const { data } = await api.patch(`/student/update-info/${id}`, info, {
        withCredentials: true,
      });
      
      return fulfillWithValue({id, info, data});
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const deleteInfo = createAsyncThunk(
  "student/deleteInfo",
  async (data, { rejectWithValue, fulfillWithValue }) => {
    const id = data.id;
    
    try {
      const { data } = await api.delete(`/student/delete-info/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue({id, data});
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const studentDetails = createAsyncThunk(
  "student/studentDetails",
  async (
    { parPage, page, searchValue, searchNumber },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `student/details?page=${page}&&searchValue=${searchValue}&&searchNumber=${searchNumber}&&parPage=${parPage}`,
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

export const studentReducer = createSlice({
  name: "student",
  initialState: {
    successMessage: "",
    errorMessage: "",
    isLoading: false,
    studentInfo: [],
    role: "",
    studentDetail: {},
    totalData: 1000,
    exam_date: ""
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
      
    },
  },
  extraReducers: (builder) => {
    // Registration action
    builder.addCase(newStudentRegistration.pending, (state) => {
      state.studentDetail= {},
      state.isLoading = true;
    });
    builder.addCase(newStudentRegistration.rejected, (state, { payload }) => {    
      state.errorMessage = payload?.error;
      state.studentDetail = {},
      state.exam_date = "",
      state.isLoading = false;
    });
    builder.addCase(newStudentRegistration.fulfilled, (state, { payload }) => {
      state.studentDetail = payload?.studentDetail;
      state.exam_date = payload?.exam_date;
      state.successMessage = payload?.message;
      state.isLoading = false;
    });


    // Registration action
    builder.addCase(previousStudentRegistration.pending, (state) => {
      state.studentDetail= {},
      state.isLoading = true;
    });
    builder.addCase(previousStudentRegistration.rejected, (state, { payload }) => {    
      state.errorMessage = payload?.error;
      state.studentDetail = {},
      state.exam_date = "",
      state.isLoading = false;
    });
    builder.addCase(previousStudentRegistration.fulfilled, (state, { payload }) => {
      state.studentDetail = payload?.studentDetail;
      state.exam_date = payload?.exam_date;
      state.successMessage = payload?.message;
      state.isLoading = false;
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
      state.totalData = payload?.totalData || 1000,
      state.successMessage = payload?.message;
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
      let parentArray = state.studentInfo;
      const id = payload.id;
      for (let i = 0; i < parentArray.length; i++) {
        if (parentArray[i]._id === id) {
          parentArray[i] = payload.info;
          break;
        }
      }
      state.studentInfo = parentArray;
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
      const parentArray = state.studentInfo;
      const id = payload.id;
      const keep_parentArray = parentArray.filter(each => each._id !== id );
      
      state.studentInfo = keep_parentArray;
      state.successMessage = payload?.message;
      state.isLoading = false;
    });
  },
});


export const { messageClear } = studentReducer.actions;
export default studentReducer.reducer;