import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Items } from "../../common/festivalDataInterface";
import axios from "axios";

export const fetchFestivalData = createAsyncThunk(
  "fetchFestivalData",
  async ({ param }: any, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=PsnPqBdiFYqwLlJF6wAm8TjrIHmfHqIpRoH0Pch%2B8%2FYdNtxltESW1eKpCM1RvH3nbTXwl7JFWQE8bdKNnuPtag%3D%3D&pageNo=1&type=json&fstvlNm=${param.festivalName}`
      );
      return response.data.response.body.items[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  content: {}
}

const fetchSlice = createSlice({
  name: "contents",
  initialState: { content: {
    } as Items, status: "" },
  reducers: {
    setContents(state) {
      // const fesName = payload.params.festivalName;
      // console.log('state', state.content);
      // console.log("action.payload", payload.params.festivalName);
      // for (let i = 0; i < payload.content.length; i++) {
      //   if (fesName === payload.content[i].fstvlNm) {
      //     console.log("got it");
      //     state.content = { ...payload.content[i] };
      //   } else {
      //     // console.log("not found");
      //   }
      // }
      // console.log('state', state);
      // console.log("content", state.content);
      // console.log("status", state.status);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFestivalData.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchFestivalData.fulfilled, (state, action) => {
      state.status = "success";
      state.content = action.payload;
    });
    builder.addCase(fetchFestivalData.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export default fetchSlice;
export const { setContents } = fetchSlice.actions;
