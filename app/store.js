import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./Reducers/authReducer";

const store = configureStore({
    reducer:{
        auth: authReducer,
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
})
export default store;