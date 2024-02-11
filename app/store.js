import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./Reducers/authReducer";
import studentReducer from "./Reducers/studentReducer";

const store = configureStore({
    reducer:{
        auth: authReducer,
        student: studentReducer,
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
})
export default store;