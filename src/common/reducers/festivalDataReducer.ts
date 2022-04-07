import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialFestivalData, Items } from "../Interface/festivalDataInterface";
import getDecimalDay from "../../features/Compute/getDecimalDay";

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
    getClickedFestival: (state, { payload }: PayloadAction<string>) => {
      const targetId = payload
      const [targetName, targetStartDate] = targetId!.split("--");
      // firestore에서 id와 일치하는 축제 찾아오기
      
      state.clickedFestival = state.items.filter((item: Items) => {
        if (item.fstvlNm === targetName) {
          if (item.fstvlStartDate === targetStartDate) {
            return true;
          }
        }
      })[0];
    },
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
      const today = new Date();
      const addItems = payload.map((item) => {
        const formattedFestivalEndDate = new Date(item.fstvlEndDate);
        item.isPassedDate = today > formattedFestivalEndDate;
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
