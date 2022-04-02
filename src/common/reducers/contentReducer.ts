import { createSlice } from "@reduxjs/toolkit";

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
