import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialFestivalData, Items } from '../../common/festivalDataInterface';

const initialState = {
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
