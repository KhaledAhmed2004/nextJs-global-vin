import { configureStore } from "@reduxjs/toolkit";
 
import authReducer from "./features/auth/authSlice";
import { baseApi } from "./apis/baseApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
