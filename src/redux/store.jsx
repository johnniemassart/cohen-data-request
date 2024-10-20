import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./apiSlice";
import { testingApi } from "./testingApi";

export default configureStore({
  reducer: {
    userInput: apiReducer,
    [testingApi.reducerPath]: testingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(testingApi.middleware),
});
