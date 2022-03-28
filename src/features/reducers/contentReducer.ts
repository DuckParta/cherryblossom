import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Items } from "../../common/festivalDataInterface";

export const contentReducer = createSlice({
  name: "festContent",
  initialState: {
    contents: {
      auspcInstt: "",
      fstvlCo: "",
      fstvlEndDate: "",
      fstvlNm: "",
      fstvlStartDate: "",
      homepageUrl: "",
      insttCode: "",
      latitude: "",
      lnmadr: "",
      longitude: "",
      mnnst: "",
      opar: "",
      phoneNumber: "",
      rdnmadr: "",
      referenceDate: "",
      relateInfo: "",
      suprtInstt: "",
    } 
  },
  reducers: {
    setFestival(state, { payload }: PayloadAction<Items>) {
<<<<<<< HEAD
      // if (localStorage.getItem("contents") !== null && state.fstvlNm === "") {
      //   // localStorage 에 다른 축제가 있거나 새로 고침 했을 때
        const contents = JSON.parse(localStorage.getItem("contents") || "");
        state = {...contents}
      // } else {
      //   // 축제 페이지에 들어갔을 때
      //   state = {...payload}
      //   localStorage.setItem("contents", JSON.stringify(payload));
      // }
=======
>>>>>>> main
      state.contents = {...payload}
      console.log(state);
    },
  },
});

export const { setFestival } = contentReducer.actions;
