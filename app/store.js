import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./Reducers/authReducer";
import studentReducer from "./Reducers/studentReducer";
import resultReducer from "./Reducers/resultReducer";
import schoolReducer from "./Reducers/schoolReducer";
import newsReducer from "./Reducers/newsReducer";

const store = configureStore({
    reducer:{
        auth: authReducer,
        student: studentReducer,
        result: resultReducer,
        school: schoolReducer,
        news: newsReducer,
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
})
export default store;