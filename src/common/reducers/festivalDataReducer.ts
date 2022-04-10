import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  name: "festivalData",
  initialState: initialState as InitialFestivalData,
  reducers: {
    addSelectedCategories: (state, { payload }: PayloadAction<string>) => {
      const location = payload.split("/");
      state.selectedCategories!.push(...location);
    },
    deleteSelectedCategories: (state, { payload }: PayloadAction<string>) => {
      const location = payload.split("/");
      state.selectedCategories = state.selectedCategories!.filter((category) => {
          return !location.includes(category)
        }
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

const selectItems = (state: InitialFestivalData) => state.items;
const selectSelectedCategories = (state: InitialFestivalData) => 
  state.selectedCategories;

export const getSelectedList = createSelector(
  selectItems,
  selectSelectedCategories,
  (items, selectedCategories) => {
    return items.filter((item: Items) =>
      selectedCategories?.includes(item.location)
    );
  }
);
