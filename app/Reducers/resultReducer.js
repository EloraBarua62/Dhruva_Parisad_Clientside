import api from "@component/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const resultDisplay = createAsyncThunk(
  "result/resultDisplay",
  async (
    { parPage, page },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `result/display?page=${page}&&parPage=${parPage}`,
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
    const roll = info.roll, year= info.year;
    
    try {
      const { data } = await api.get(`result/student-display?roll=${roll}&&year=${year}`, {
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

export const previousResult = createAsyncThunk(
  "result/previousResult",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    const id = info.id;
    try {
      const { data } = await api.post(
        'result/previous-result',
        info,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue( {data, id} );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const previousResultDisplay = createAsyncThunk(
  "result/previousResultDisplay",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `result/previous-display?page=${page}&&parPage=${parPage}&&searchValue=${searchValue}`,
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

export const resultReducer = createSlice({
  name: "result",
  initialState: {
    successMessage: "",
    errorMessage: "",
    isLoading: false,
    resultInfo: [],
    studentResultInfo: [],
    studentPersonalInfo: {},
    totalData: 1000,
    previousData: [],
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    // Role: Admin
    builder.addCase(resultDisplay.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resultDisplay.fulfilled, (state, { payload }) => {
      state.resultInfo = payload.resultInfo;
      (state.totalData = payload?.totalData || 1000),
        (state.successMessage = payload.message);
      state.isLoading = false;
    });
    builder.addCase(resultDisplay.rejected, (state, { payload }) => {     
      state.errorMessage = payload?.error;
      state.isLoading = false;
    });

    // Role: Principal
    builder.addCase(specificSchoolResult.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(specificSchoolResult.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
      state.resultInfo = payload?.resultInfo;
      state.isLoading = false;
    });
    builder.addCase(specificSchoolResult.rejected, (state, { payload }) => {
      state.resultInfo = [];
      state.errorMessage = payload?.error;
      state.isLoading = false;
    });

    // Role: Student
    builder.addCase(specificStudentResult.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(specificStudentResult.fulfilled, (state, { payload }) => {
      state.studentResultInfo = payload?.studentResultInfo;
      state.studentPersonalInfo = payload?.studentPersonalInfo;
      state.successMessage = payload?.message;
      state.isLoading = false;
    });
    builder.addCase(specificStudentResult.rejected, (state, { payload }) => {
      state.studentResultInfo = [];
      state.studentPersonalInfo = {};
      state.errorMessage = payload?.error;
      state.isLoading = false;
    });

    // Role: Admin
    builder.addCase(updateWrittenPracticalMarks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      updateWrittenPracticalMarks.fulfilled,
      (state, { payload }) => {
        const index = payload.index;
        const writtenPractical = payload.data.updatedResult;
        const averageLetterGrade = payload.data.final_letter_grade;
        const averageGradePoint = payload.data.final_grade_point;

        let parentObj = { ...state.resultInfo[index] };
        parentObj = {
          ...parentObj,
          writtenPractical,
          averageLetterGrade,
          averageGradePoint,
        };
        let parentArray = [...state.resultInfo];
        parentArray[index] = parentObj;

        // Set value to state variable
        state.resultInfo = parentArray;
        state.successMessage = payload.message;
        state.isLoading = false;
      }
    );
    builder.addCase(
      updateWrittenPracticalMarks.rejected,
      (state, { payload }) => {       
        state.errorMessage = payload.error;
        state.isLoading = false;
      }
    );

    // Role: Student
    builder.addCase(previousResult.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(previousResult.fulfilled, (state, { payload }) => {
      const keep_resultInfo = state.resultInfo;
      const pre_id = payload?.id;
      const result_info_length = keep_resultInfo.length;
      for(let i=0 ; i<result_info_length ;i++){
        if(keep_resultInfo[i]._id === pre_id){
          keep_resultInfo[i].resultStatus = "Finish";
          break;
        }
      }
      state.resultInfo = keep_resultInfo;
      state.successMessage = payload?.message;
      state.isLoading = false;
    });
    builder.addCase(previousResult.rejected, (state, { payload }) => {
      state.errorMessage = payload?.error;
      state.isLoading = false;
    });

    // Role: Student
    builder.addCase(previousResultDisplay.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(previousResultDisplay.fulfilled, (state, { payload }) => {
      state.previousData = payload?.final_parent_array;
      state.totalData = payload?.totalData;
      state.successMessage = payload?.message;
      state.isLoading = false;
    });
    builder.addCase(previousResultDisplay.rejected, (state, { payload }) => {
      state.previousData = [];
      state.totalData= 1000;
      state.errorMessage = payload?.error;
      state.isLoading = false;
    });
  },
});

export default resultReducer.reducer;
export const {messageClear} = resultReducer.actions;
