import { combineReducers } from "redux";
import { festivalDataReducer } from "./festivalDataReducer";
import { userReducer } from "./userReducer";
import { contentReducer } from "./contentReducer";
import fetchContents from '../async/fetchFestivalData'

const rootReducer = combineReducers({
  festivalDataReducer: festivalDataReducer.reducer,
  userReducer: userReducer.reducer,
  contentReducer: contentReducer.reducer,
  fetchReducer: fetchContents.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
