// Import Files and Method
import api from "@component/api/api";
import { jwtDecode } from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// User signup
export const userSignup = createAsyncThunk(
  "auth/userSignup",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/user/signup", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
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

// Forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/user/forgot-password", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Reset password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/user/reset-password", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// User login
export const principalInformation = createAsyncThunk(
  "auth/principalInformation",
  async ({ parPage, page }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/user/principal-info?page=${page}&&parPage=${parPage}`,
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

const returnRole = () => {
  let token_string = "";
  if (typeof document !== "undefined") {
    token_string = document.cookie;
    if (token_string?.length > 0) {
      const decodeToken = jwtDecode(token_string);
      return decodeToken.role;
    } else return "";
  } else return "";
};

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    isLoading: false,
    userInfo: "",
    role: "",
    principalInfo: [],
    totalData: 0
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    logOut: (state) => {
      state.role = "";
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1971 00:00:00 UTC; path=/;";
    },
  },
  extraReducers: (builder) => {
    // Signup action
    builder.addCase(userSignup.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userSignup.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload?.error;
    });
    builder.addCase(userSignup.fulfilled, (state, { payload }) => {
      state.userInfo = payload?.userInfo;
      state.role = returnRole() || payload?.userInfo?.role;
      state.successMessage = payload?.message;
      state.isLoading = false;
    });
    
    // Forget password
    builder.addCase(forgotPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(forgotPassword.rejected, (state, { payload }) => {
      state.errorMessage = payload?.error;
      state.isLoading = false;
    });
    builder.addCase(forgotPassword.fulfilled, (state, { payload }) => {
      state.successMessage = payload?.message;
      state.isLoading = false;
    });

    // Reset password
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resetPassword.rejected, (state, { payload }) => {
      state.errorMessage = payload?.error;
      state.isLoading = false;
    });
    builder.addCase(resetPassword.fulfilled, (state, { payload }) => {
      state.successMessage = payload?.message;
      state.isLoading = false;
    });

    // Login action
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {     
      state.errorMessage = payload?.error;
      state.isLoading = false;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {     
      state.userInfo = payload?.userInfo; 
      state.role = returnRole() || payload?.userInfo?.role;        
      state.successMessage = payload?.message;
      state.isLoading = false;
    });

    // Login action
    builder.addCase(principalInformation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(principalInformation.rejected, (state, { payload }) => {     
      state.principalInfo = [];
      state.totalData = 0;
      state.errorMessage = payload?.error;
      state.isLoading = false;
    });
    builder.addCase(principalInformation.fulfilled, (state, { payload }) => {      
      state.principalInfo = payload?.principal_info;
      // console.log(principalInfo);
      state.totalData = payload?.totalData;
      state.successMessage = payload?.message;
      state.isLoading = false;
    });
  },
});

export const { messageClear, logOut } = authReducer.actions;
export default authReducer.reducer;
