import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { Items } from '../../common/festivalDataInterface';

export const fetchFestivalData = createAsyncThunk(
  'fetchFestivalData', 
  async ({item}: {item: Items},thunkAPI) => {
    const URL = `http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=PsnPqBdiFYqwLlJF6wAm8TjrIHmfHqIpRoH0Pch%2B8%2FYdNtxltESW1eKpCM1RvH3nbTXwl7JFWQE8bdKNnuPtag%3D%3D&pageNo=0&numOfRows=1004&type=json`;
    try {
      const response = await axios.get(URL, {
        params: {
          body: {
            items: {
                ...item
            }
          }
        }
      });
      return response.config.params.body;
    } catch(error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)
