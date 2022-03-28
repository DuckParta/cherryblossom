import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { Items } from '../../common/festivalDataInterface';

export const fetchFestivalData = createAsyncThunk(
  'fetchFestivalData', 
  async ({ param }: { param: Items },thunkAPI) => {
    const URL = `http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=PsnPqBdiFYqwLlJF6wAm8TjrIHmfHqIpRoH0Pch%2B8%2FYdNtxltESW1eKpCM1RvH3nbTXwl7JFWQE8bdKNnuPtag%3D%3D&pageNo=1&type=json&fstvlNm=${param.fstvlNm}`;
    try {
      const response = await axios.get(URL);
      console.log(response.data.response.body.items);
      return response.data.response.body.items[0];
    } catch(error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const fetchSlice = createSlice({
  name: "contents",
  initialState: {
    content: {} as Items,
    status: "",
  },
  reducers: {
    setContents() {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFestivalData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchFestivalData.fulfilled, (state, { payload }: PayloadAction<Items>) => {
      state.status = "success";
      state.content = { ...payload };
    });
    builder.addCase(fetchFestivalData.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export default fetchSlice;
// export const { setContents } = fetchSlice.actions;
