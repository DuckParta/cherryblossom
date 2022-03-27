import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IContent {
  fstvlNm: string;
  fstvlCo: string;
  fstvlStartDate: string;
  fstvlEndDate: string;
  opar: string;
  phoneNumber: string;
  rdnmadr: string;
  latitude: string;
  longitude: string;
  homepageUrl: string;
}

export const contentReducer = createSlice({
  name: "festContent",
  initialState: {
    fstvlNm: "",
    fstvlCo: "",
    fstvlStartDate: "",
    fstvlEndDate: "",
    opar: "",
    phoneNumber: "",
    rdnmadr: "",
    latitude: "",
    longitude: "",
    homepageUrl: "",
  },
  reducers: {
    setFestival(state, { payload }: PayloadAction<IContent>) {
      if (localStorage.getItem("contents") !== null && state.fstvlNm === "") {
        // localStorage 에 다른 축제가 있거나 새로 고침 했을 때
        const contents = JSON.parse(localStorage.getItem("contents") || "");

        state.fstvlNm = contents.fstvlNm;
        state.fstvlCo = contents.fstvlCo;
        state.fstvlStartDate = contents.fstvlStartDate;
        state.fstvlEndDate = contents.fstvlEndDate;
        state.opar = contents.opar;
        state.phoneNumber = contents.phoneNumber;
        state.rdnmadr = contents.rdnmadr;
        state.latitude = contents.latitude;
        state.longitude = contents.longitude;
        state.homepageUrl = contents.homepageUrl;
      } else {
        // 축제 페이지에 들어갔을 때
        state.fstvlNm = payload.fstvlNm;
        state.fstvlCo = payload.fstvlCo;
        state.fstvlStartDate = payload.fstvlStartDate;
        state.fstvlEndDate = payload.fstvlEndDate;
        state.opar = payload.opar;
        state.phoneNumber = payload.phoneNumber;
        state.rdnmadr = payload.rdnmadr;
        state.latitude = payload.latitude;
        state.longitude = payload.longitude;
        state.homepageUrl = payload.homepageUrl;

        localStorage.setItem("contents", JSON.stringify(payload));
      }
    },
  },
});

export const { setFestival } = contentReducer.actions;
