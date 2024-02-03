// Import Files and Method
import api from "@component/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// User signup
export const userSignup = createAsyncThunk(
  "auth/userSignup",
  async (info, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data} = await api.post("/user/signup" , info, {
        withCredentials: true,
      })
      return fulfillWithValue(data);
  }
  catch(error){
    return rejectWithValue(error.response.data);
  }
}
);


// User login
export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/user/login", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    isLoading: false,
    userInfo: "",
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {

    // Signup action
    builder.addCase(userSignup.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userSignup.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.errorMessage = payload.error;
    });
    builder.addCase(userSignup.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.userInfo = payload.userInfo;
      state.successMessage = payload.message;
    });
    
    // Login action
     builder.addCase(userLogin.pending, (state) => {
       state.isLoading = true;
     });
     builder.addCase(userLogin.rejected, (state, { payload }) => {
       state.isLoading = false;
       state.errorMessage = payload.error;
     });
     builder.addCase(userLogin.fulfilled, (state, { payload }) => {
       state.isLoading = false;
       state.userInfo = payload.userInfo;
       state.successMessage = payload.message;
     });
  },
});

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
