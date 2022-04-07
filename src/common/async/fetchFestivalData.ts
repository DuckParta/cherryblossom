import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Items } from "../Interface/festivalDataInterface";

export const fetchFestivalData = createAsyncThunk(
  "fetchFestivalData",
  async ({ param }: any, thunkAPI) => {
    const fstNm = param.festivalName.slice(0, param.festivalName.indexOf("-"));
    const URL = `http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=PsnPqBdiFYqwLlJF6wAm8TjrIHmfHqIpRoH0Pch%2B8%2FYdNtxltESW1eKpCM1RvH3nbTXwl7JFWQE8bdKNnuPtag%3D%3D&pageNo=1&type=json&fstvlNm=${fstNm}`;
    try {
      const response = await axios.get(URL);
      return response.data.response.body.items[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const fetchSlice = createSlice({
  name: "contents",
  initialState: {
    content: {
      fstvlId:"",
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
    } as Items,
    status: ""
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFestivalData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchFestivalData.fulfilled,
      (state, { payload }: PayloadAction<Items>) => {
        state.status = "success";
        payload = {...payload, fstvlId: payload.fstvlNm + payload.fstvlStartDate}
        state.content = { ...payload };
      }
    );
    builder.addCase(fetchFestivalData.rejected, (state) => {
      state.status = "failed";
    });
  }
});

export default fetchSlice;
