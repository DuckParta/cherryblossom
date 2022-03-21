import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialFestivalData } from '../../common/festivalDataInterface';
import { fetchFestivalData } from '../async/fetchFestivalData';

const initialState = {
  header: {},
  body: {},
  isLoading: false
}

export const festivalDataReducer = createSlice({
  name: 'festivalDataReducer',
  initialState: initialState as InitialFestivalData,
  reducers: {
    storeData: ((state, { payload }: PayloadAction<string>) => {
      
    })
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFestivalData.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchFestivalData.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      const {header, body} = payload;
      state.header = header;
      state.body = body;
    })
    .addCase(fetchFestivalData.rejected, (state, { payload }) => {
      state.isLoading = false;
    })
  }
});
