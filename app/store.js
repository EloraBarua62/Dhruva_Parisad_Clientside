import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./Reducers/authReducer";
import studentReducer from "./Reducers/studentReducer";
import resultReducer from "./Reducers/resultReducer";

const store = configureStore({
    reducer:{
        auth: authReducer,
        student: studentReducer,
        result: resultReducer,
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
})
export default store;