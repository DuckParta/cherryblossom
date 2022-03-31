import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../features/reducers";

export const store = configureStore({
  reducer: rootReducer,
});
