import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BodyData, HeaderData, InitialFestivalData, Items } from '../../common/festivalDataInterface';
import { fetchFestivalData } from '../async/fetchFestivalData';

const initialState = {
  // header: {},
  // body: {},
  // isLoading: false,
  // pageNumber: 1
  items: []
}

export const festivalDataReducer = createSlice({
  name: 'festivalDataReducer',
  initialState: initialState as InitialFestivalData,
  reducers: {
    getFestivalData: ((state, { payload }: PayloadAction<Items[]>) => {
      state.items.push(...payload);
    }),
  },
});
