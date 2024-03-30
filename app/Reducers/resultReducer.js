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


export const specificSchoolResult = createAsyncThunk(
  "result/specificSchoolResult",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    const code = parseInt(info.school_code);

    try {
      const { data } = await api.get(`result/school-display/${code}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const specificStudentResult = createAsyncThunk(
  "result/specificResultDisplay",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    const roll = parseInt(info.roll);
    
    try {
      const { data } = await api.get(`result/student-display/${roll}`, {
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
    const index = info.index;
    const id = info.id;
    const writtenPractical = info.writtenPractical;

    try {
        const { data } = await api.patch(`result/result-update/${id}`,writtenPractical, {
          withCredentials: true,
        });
        
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
    studentResultInfo: {}
  },
  reducers: {
    messageClear: (state) => {
        state.errorMessage = "";
        state.successMessage = "";
    }
  },
  extraReducers: (builder) => {

    // Role: Admin
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


    // Role: Principal
    builder.addCase(specificSchoolResult.pending , (state) => {
        state.isLoading = true;
    });
    builder.addCase(specificSchoolResult.fulfilled , (state, {payload}) => {       
        state.successMessage = payload.message;       
        state.resultInfo = payload?.resultInfo;
        state.isLoading = false;
    });
    builder.addCase(specificSchoolResult.rejected , (state, {payload}) => {    
         state.resultInfo = [];
        state.errorMessage = payload?.error;
        state.isLoading = false;
    });

    
    // Role: Student
    builder.addCase(specificStudentResult.pending , (state) => {
        state.isLoading = true;
    });
    builder.addCase(specificStudentResult.fulfilled , (state, {payload}) => {       
        state.successMessage = payload?.message;       
        state.studentResultInfo = payload?.studentResultInfo;
        state.isLoading = false;
    });
    builder.addCase(specificStudentResult.rejected , (state, {payload}) => {    
        state.studentResultInfo = {};
        state.errorMessage = payload?.error;
        state.isLoading = false;
    });
    

    builder.addCase(updateWrittenPracticalMarks.pending , (state) => {
        state.isLoading = true;
    });
    builder.addCase(updateWrittenPracticalMarks.fulfilled , (state, {payload}) => {      
        const index = payload.index;
        const writtenPractical = payload.data.updatedResult;

        let parentObj = { ...state.resultInfo[index] };
        parentObj = { ...parentObj, writtenPractical: writtenPractical };
        let parentArray = [...state.resultInfo];
        parentArray[index] = parentObj;
        
        // Set value to state variable
        state.resultInfo = parentArray;
        state.successMessage = payload.message;
        state.isLoading = false;

    });
    builder.addCase(updateWrittenPracticalMarks.rejected , (state, {payload}) => {
        state.isLoading = false;
        state.errorMessage = payload.error;
    });
  }
});

export default resultReducer.reducer;
export const {messageClear} = resultReducer.actions;
