import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchFestivalData = createAsyncThunk(
  'fetchFestivalData', 
  async (_,thunkAPI) => {
    try {
      const response = await axios.get("http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=PsnPqBdiFYqwLlJF6wAm8TjrIHmfHqIpRoH0Pch%2B8%2FYdNtxltESW1eKpCM1RvH3nbTXwl7JFWQE8bdKNnuPtag%3D%3D&pageNo=0&numOfRows=100&type=json")
      return response.data.response;
    } catch(error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)
