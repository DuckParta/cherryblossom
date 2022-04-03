import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  userId: string;
  name: string;
  isLogin: boolean;
}

export const userReducer = createSlice({
  name: "userInfo",
  initialState: {
    userId: "",
    name: "",
    isLogin: false
  },
  reducers: {
    setInfo(state, { payload }: PayloadAction<IUser>) {
      if (payload.userId !== "") {
        state.userId = payload.userId;
        state.name = payload.name;
        localStorage.setItem("userInfo", JSON.stringify(payload));
      } else if (localStorage.getItem("userInfo") !== null) {
        state.isLogin = true;
        const user = JSON.parse(localStorage.getItem("userInfo") || "");
        state.userId = user.userId;
        state.name = user.name;
      } else {
        state.isLogin = true;
        state.userId = payload.userId;
        state.name = payload.name;
        localStorage.setItem("userInfo", JSON.stringify(payload));
      }
    },
    setLogout(state) {
      state.userId = "";
      state.name = "";
      state.isLogin = false;
      localStorage.setItem("userInfo", JSON.stringify(""));
    },
  },
});

export const { setInfo, setLogout } = userReducer.actions;
