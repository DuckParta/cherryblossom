import { combineReducers } from "redux";
import { festivalDataReducer } from "./festivalDataReducer";

const rootReducer = combineReducers({
  festivalDataReducer: festivalDataReducer.reducer
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
