import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialFestivalData, Items } from '../../common/festivalDataInterface';
import getDecimalDay from '../../common/getDecimalDay';
import { fetchFestivalData } from '../async/fetchFestivalData';

const initialState = {
  items: [],
  status: "",
  currentFestival: {}
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
      if (payload === "기타") {
        state.items = state.items.filter((item) => item.location === " ");
      }
      state.items = state.items.filter((item) => location.includes(item.location!));
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFestivalData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchFestivalData.fulfilled, (state,{ payload }: PayloadAction<Items>) => {
      state.status = "success";
      state.currentFestival = payload;

    });
    builder.addCase(fetchFestivalData.rejected, (state) => {
      state.status = "failed";
    });
  },
});
