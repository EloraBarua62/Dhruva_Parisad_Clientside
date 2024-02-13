import api from "@component/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const resultDisplay = createAsyncThunk("result/resultDisplay", 
    async(_, {rejectWithValue, fulfillWithValue}) => {
        try {
            const { data } = await api.get("result/display", {
                withCredentials: true,
            });
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateWrittenPracticalMarks = createAsyncThunk(
  "result/updateWrittenPracticalMarks",
  async(info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
        const { data } = await api.patch("result/result-update", {
          withCredentials: true,
        });
        return fulfillWithValue(data);
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
  }
);

export const resultReducer = createSlice({
  name: "result",
  initialState: {
    successMessage: "",
    errorMessage: "",
    isLoading: false,
    resultInfo: [],
  },
  reducers: {
    messageClear: (state) => {
        state.errorMessage = "";
        state.successMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(resultDisplay.pending , (state) => {
        state.isLoading = true;
    });
    builder.addCase(resultDisplay.fulfilled , (state, {payload}) => {
        state.isLoading = false;
        state.successMessage = payload.message;
        state.resultInfo = payload.resultInfo;
    });
    builder.addCase(resultDisplay.rejected , (state, {payload}) => {
        state.isLoading = false;
        state.errorMessage = payload.error;
    });
    
    builder.addCase(updateWrittenPracticalMarks.pending , (state) => {
        state.isLoading = true;
    });
    builder.addCase(updateWrittenPracticalMarks.fulfilled , (state, {payload}) => {
        state.isLoading = false;
        state.successMessage = payload.message;
        state.resultInfo = payload.resultInfo;
    });
    builder.addCase(updateWrittenPracticalMarks.rejected , (state, {payload}) => {
        state.isLoading = false;
        state.errorMessage = payload.error;
    });
  }
});

export const {messageClear} = resultReducer.actions;
export default resultReducer.reducer;