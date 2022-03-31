import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialFestivalData, Items } from "../Interface/festivalDataInterface";
import getDecimalDay from "../../features/Compute/getDecimalDay";
import { fetchFestivalData } from "../async/fetchFestivalData";

const initialState = {
  items: [],
  status: "",
  currentFestival: {},
  selectedCategories: [],
};

export const festivalDataReducer = createSlice({
  name: "festivalDataReducer",
  initialState: initialState as InitialFestivalData,
  reducers: {
    getFestivalData: (state, { payload }: PayloadAction<Items[]>) => {
      const today = new Date();
      const addItems = payload.map((item) => {
        const formattedFestivalEndDate = new Date(item.fstvlEndDate);
        item.isPassedDate = today > formattedFestivalEndDate;
        item.decimalDay = getDecimalDay(item.fstvlStartDate);
        item.location = item.rdnmadr.substring(0, 2);
        console.log(item.rdnmadr);
        item.id = `${item.fstvlNm}-${item.fstvlStartDate}`;
        return item;
      });
      state.items.push(...addItems);
      state.items.sort(function (a, b) {
        const prevDate = Number(new Date(a.fstvlStartDate));
        const followDate = Number(new Date(b.fstvlStartDate));
        return followDate - prevDate;
      });
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
      state.items = state.items.filter((item) =>
        state.selectedCategories!.includes(item.location!)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFestivalData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchFestivalData.fulfilled,
      (state, { payload }: PayloadAction<Items>) => {
        state.status = "success";
        state.currentFestival = payload;
      }
    );
    builder.addCase(fetchFestivalData.rejected, (state) => {
      state.status = "failed";
    });
  },
});
