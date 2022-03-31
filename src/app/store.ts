import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../common/reducers";

export const store = configureStore({
  reducer: rootReducer,
});
