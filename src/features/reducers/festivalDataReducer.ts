import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialFestivalData, Items } from '../../common/festivalDataInterface';
import getDecimalDay from '../../common/getDecimalDay';

const initialState = {
  items: []
}

export const festivalDataReducer = createSlice({
  name: 'festivalDataReducer',
  initialState: initialState as InitialFestivalData,
  reducers: {
    getFestivalData: ((state, { payload }: PayloadAction<Items[]>) => {
      const today = new Date();
      const addItems = payload.map((item) => {
        const formattedFestivalEndDate = new Date(item.fstvlEndDate);
        item.isPassedDate = today > formattedFestivalEndDate;
        item.decimalDay = getDecimalDay(item.fstvlStartDate);
        item.location = item.rdnmadr.substring(0,2);
        item.id = item.fstvlNm + item.fstvlStartDate;
        return item;
      });
      state.items.push(...addItems);
    }),
    filterLocation: ((state, { payload }: PayloadAction<string>) => {
      const location = payload.split("/");
      state.items = state.items.filter((item) => location.includes(item.location!));
    }),
  },
});
