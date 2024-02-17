import api from "@component/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const enlistedZone = createAsyncThunk(
  "school/enlistedZone",
  async (_,{ rejectWithValue, fulfillWithValue }) => {
    // console.log(info);
    try {
      const { data } = await api.get("/school/zone-details", {
        withCredentials: true,
      });
     
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const schoolRegistration = createAsyncThunk(
  "school/schoolRegistration",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post("/school/registration", info, {
        withCredentials: true,
      });
      
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const enlistedSchools = createAsyncThunk(
  "school/enlistedSchools",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.get("/school/details", info, {
        withCredentials: true,
      });
      
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const schoolReducer = createSlice({
  name: "school",
  initialState: {
    successMessage: "",
    errorMessage: "",
    isLoading: false,
    zoneInfo: [],
    schoolInfo: [],
    role: "",
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    // Fetch enlisted school 
    builder.addCase(enlistedSchools.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(enlistedSchools.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload?.error;
    });
    builder.addCase(enlistedSchools.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.successMessage = payload?.message;
      state.schoolInfo = payload?.schoolInfo;
    });

    // Details Fetching action
    builder.addCase(enlistedZone.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(enlistedZone.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload?.error;
    });
    builder.addCase(enlistedZone.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.zoneInfo = payload.zone_list;
      state.successMessage = payload?.message;
    });
    // Details Fetching action
    builder.addCase(schoolRegistration.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(schoolRegistration.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload?.error;
    });
    builder.addCase(schoolRegistration.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.successMessage = payload?.message;
    });
  },
});

export const { messageClear } = schoolReducer.actions;
export default schoolReducer.reducer;
