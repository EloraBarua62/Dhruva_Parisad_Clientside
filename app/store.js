import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./Reducers/authReducer";
import studentReducer from "./Reducers/studentReducer";
import resultReducer from "./Reducers/resultReducer";
import schoolReducer from "./Reducers/schoolReducer";

const store = configureStore({
    reducer:{
        auth: authReducer,
        student: studentReducer,
        result: resultReducer,
        school: schoolReducer,
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
})
export default store;