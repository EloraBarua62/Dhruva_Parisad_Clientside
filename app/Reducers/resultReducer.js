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
    const index = info.index;
    const id = info.id;
    const writtenPractical = info.writtenPractical;

    try {
        const { data } = await api.patch(`result/result-update/${id}`,writtenPractical, {
          withCredentials: true,
        });
        console.log(data)
        return fulfillWithValue({index, data});
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
        
        state.successMessage = payload.message;
        // state.resultInfo = payload.resultInfo;
        const index = payload.index;
        const writtenPractical = payload.data.updatedResult;
        console.log(index, writtenPractical);
        let parentObj = { ...state.resultInfo[index] };
        parentObj = { ...parentObj, writtenPractical: writtenPractical };
        console.log(parentObj);
        let parentArray = [...state.resultInfo];
        parentArray[index] = parentObj;
        state.resultInfo = parentArray;
        state.isLoading = false;

    });
    builder.addCase(updateWrittenPracticalMarks.rejected , (state, {payload}) => {
        state.isLoading = false;
        state.errorMessage = payload.error;
    });
  }
});

export const {messageClear} = resultReducer.actions;
export default resultReducer.reducer;