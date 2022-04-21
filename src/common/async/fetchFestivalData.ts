import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import getDecimalDay from "../../features/Compute/getDecimalDay";
import getFestivalLocation from "../../features/Compute/getFestivalLocation";
import getIsPassedDate from "../../features/Compute/getIsPassedDate";
import { Items } from "../Interface/festivalDataInterface";

export const fetchFestivalData = createAsyncThunk(
  "fetchFestivalData",
  async (param: { fstvlId: string }, thunkAPI) => {
    const [targetName, targetStartDate] = param.fstvlId.split("--");
    const URL = `/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=PsnPqBdiFYqwLlJF6wAm8TjrIHmfHqIpRoH0Pch%2B8%2FYdNtxltESW1eKpCM1RvH3nbTXwl7JFWQE8bdKNnuPtag%3D%3D&pageNo=1&type=json&fstvlNm=${targetName}&fstvlStartDate=${targetStartDate}`;
    try {
      const response = await axios.get(URL);
      const temp = await axios.get("/api").then((res) => {
        console.log(res);
        return res;
      });
      console.log(temp);
      const item = response.data.response.body.items[0];
      return item;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const fetchSlice = createSlice({
  name: "contents",
  initialState: {
    contents: {
      fstvlId: "",
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
    status: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFestivalData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchFestivalData.fulfilled,
      (state, { payload }: PayloadAction<Items>) => {
        state.status = "success";
        const addId = {
          ...payload,
          fstvlId: `${payload.fstvlNm}--${payload.fstvlStartDate}`,
          isPassedDate: getIsPassedDate(payload.fstvlEndDate),
          decimalDay: getDecimalDay(payload.fstvlStartDate),
          location: getFestivalLocation(payload),
        };
        state.contents = { ...addId };
      }
    );
    builder.addCase(fetchFestivalData.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default fetchSlice;
