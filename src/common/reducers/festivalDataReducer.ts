import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialFestivalData, Items } from "../Interface/festivalDataInterface";
import getDecimalDay from "../../features/Compute/getDecimalDay";
import getIsPassedDate from "../../features/Compute/getIsPassedDate";

const initialState = {
  items: [],
  status: "",
  clickedFestival: {},
  selectedCategories: [],
  selectedItems: []
};

export const festivalDataReducer = createSlice({
  name: "festivalDataReducer",
  initialState: initialState as InitialFestivalData,
  reducers: {
    addSelectedCategories: (state, { payload }: PayloadAction<string>) => {
      const location = payload.split("/");
      state.selectedCategories!.push(...location);
    },
    deleteSelectedCategories: (state, { payload }: PayloadAction<string>) => {
      const location = payload.split("/");
      state.selectedCategories = state.selectedCategories!.filter(
        (category) => !location.includes(category)
      );
    },
    filterLocation: (state) => {
      state.selectedItems = state.items.filter((item: Items) =>
        state.selectedCategories!.includes(item.location!)
      );
    },
    storeFestivalData: (state, { payload }: PayloadAction<Items[]>) => {
      const addItems = payload.map((item) => {
        item.isPassedDate = getIsPassedDate(item.fstvlEndDate);
        item.decimalDay = getDecimalDay(item.fstvlStartDate);
        return item;
      });
      const sortedItems = addItems.sort(function (a, b) {
        const prevDate = Number(new Date(a.fstvlStartDate));
        const followDate = Number(new Date(b.fstvlStartDate));
        return followDate - prevDate;
      });
      state.items = sortedItems;
    },
  },
});
