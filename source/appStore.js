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
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['your/action/type'],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
                // Ignore these paths in the state
                ignoredPaths: ['items.dates'],
            },
        }),
})