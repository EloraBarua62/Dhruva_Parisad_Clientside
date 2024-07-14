import api from "@component/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const enlistedZone = createAsyncThunk(
  "school/enlistedZone",
  async (_,{ rejectWithValue, fulfillWithValue }) => {
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
  async (zone, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/school/details/${zone}`, {
        withCredentials: true,
      });      
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStatus = createAsyncThunk(
  "school/updateStatus",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    const id = info.id;
    const status = info.status;
    try {
      const { data } = await api.patch(`/school/update-status/${id}`,{status}, {
        withCredentials: true,
      });
      return fulfillWithValue({id,data});
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
); 

export const deleteInfo = createAsyncThunk(
  "school/deleteInfo",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    const id = info.id;
  
    try {
      const { data } = await api.delete(`/school/delete-info/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue({id,data});
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
); 

export const schoolInformation = createAsyncThunk(
  "school/schoolInformation",
  async ({ parPage, page }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `school/display?page=${page}&&parPage=${parPage}`,
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

export const schoolReducer = createSlice({
  name: "school",
  initialState: {
    successMessage: "",
    errorMessage: "",
    isLoading: false,
    zoneInfo: [],
    schoolInfo: [],
    schoolList: [],
    totalData: 1000,
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
      state.errorMessage = payload?.error;
      state.isLoading = false;
    });
    builder.addCase(enlistedSchools.fulfilled, (state, { payload }) => {
      // state.successMessage = payload?.message;
      state.schoolInfo = payload?.schoolInfo;
      state.isLoading = false;
    });

    // Details Fetching action
    builder.addCase(enlistedZone.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(enlistedZone.rejected, (state, { payload }) => {
      state.errorMessage = payload?.error;
      state.isLoading = false;
    });
    builder.addCase(enlistedZone.fulfilled, (state, { payload }) => {
      state.zoneInfo = payload?.zone_list;
      state.schoolInfo = payload?.schoolInfo || [];
      // state.successMessage = payload?.message;
      state.isLoading = false;
    });

    // Details Fetching action
    builder.addCase(schoolRegistration.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(schoolRegistration.rejected, (state, { payload }) => {
      state.errorMessage = payload?.error;
      state.isLoading = false;
    });
    builder.addCase(schoolRegistration.fulfilled, (state, { payload }) => {
      state.successMessage = payload?.message;
      state.isLoading = false;
    });

    // Details Fetching action
    builder.addCase(updateStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateStatus.rejected, (state, { payload }) => {
      state.errorMessage = payload?.error;
      state.isLoading = false;
    });
    builder.addCase(updateStatus.fulfilled, (state, { payload }) => {
      let index = payload.id;
      let parentArray = state.schoolList;
      const size = parentArray.length;

      for (let i = 0; i < size; i++) {
        if (parentArray[i]?._id === index) {
          parentArray[i] = payload.data.schoolInfo;
          break;
        }
      }
      state.schoolList = parentArray;
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
      const parentArray = state.schoolList;
      const id = payload.id;
      const keep_parentArray = parentArray.filter((each) => each._id !== id);

      state.schoolList = keep_parentArray;
      state.successMessage = payload?.message;
      state.isLoading = false;
    });

    // Fetch enlisted school
    builder.addCase(schoolInformation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(schoolInformation.rejected, (state, { payload }) => {
      state.errorMessage = payload?.error;
      state.isLoading = false;
    });
    builder.addCase(schoolInformation.fulfilled, (state, { payload }) => {
      state.schoolList = payload?.schoolList;
      (state.totalData = payload?.totalData || 1000),
        (state.successMessage = payload?.message);
      state.isLoading = false;
    });
  },
});

export const { messageClear } = schoolReducer.actions;
export default schoolReducer.reducer;
