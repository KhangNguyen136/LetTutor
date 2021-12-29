import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./redux/userInfoSlice";
import authSlice from "./redux/authSlice";
export default configureStore({
    reducer: {
        authState: authSlice,
        userInfoState: userInfoSlice,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
})