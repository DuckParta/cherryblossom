import { combineReducers } from "redux";
import { festivalDataReducer } from "./festivalDataReducer";
import { userReducer } from "./userReducer";
import fetchContents from "../async/fetchFestivalData";

const rootReducer = combineReducers({
  festivalData: festivalDataReducer.reducer,
  user: userReducer.reducer,
  fetchContents: fetchContents.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
