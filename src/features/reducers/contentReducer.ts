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
    },
  },
  reducers: {
    setFestival(state, { payload }: PayloadAction<Items>) {
      // state.contents = {...payload}
      // console.log(state);
    },
  },
});

// export const { setFestival } = contentReducer.actions;
