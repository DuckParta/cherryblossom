import { combineReducers } from "redux";
import { festivalDataReducer } from "./festivalDataReducer";
import {userReducer} from './userReducer'
import {contentReducer} from "./contentReducer";

const rootReducer = combineReducers({
  festivalDataReducer: festivalDataReducer.reducer,
  userReducer: userReducer.reducer,
  contentReducer: contentReducer.reducer,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
