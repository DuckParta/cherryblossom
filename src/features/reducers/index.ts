import { combineReducers } from "redux";
import { festivalDataReducer } from "./festivalDataReducer";
import {userReducer} from './userReducer'

const rootReducer = combineReducers({
  festivalDataReducer: festivalDataReducer.reducer,
  userReducer: userReducer.reducer
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
