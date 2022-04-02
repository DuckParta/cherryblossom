import { createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Items } from "../Interface/festivalDataInterface";

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
  reducers: {},
});
