import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BodyData, HeaderData, InitialFestivalData } from '../../common/festivalDataInterface';
import { fetchFestivalData } from '../async/fetchFestivalData';

const initialState = {
  header: {},
  body: {},
  isLoading: false,
  pageNumber: 1
}

export const festivalDataReducer = createSlice({
  name: 'festivalDataReducer',
  initialState: initialState as InitialFestivalData,
  reducers: {
    getFestivalData: ((state, { payload }: PayloadAction<{header: HeaderData, body: BodyData}>) => {
      const {header, body} = payload;
      state.header = header;
      state.body = body;
    }),
    getPageNumber: ((state, { payload }: PayloadAction<[number, boolean]>) => {
      const [number, isIncrease] = payload;
      state.pageNumber = number;
    }),
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
