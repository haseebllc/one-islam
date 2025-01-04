import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface hadithSliceStateType {
  book: string;
  chapter: number;
}

const initialState: hadithSliceStateType = {
  book: "abudawud",
  chapter: 1,
};
const CurrentHadithSlice = createSlice({
  name: "current-surah-slice",
  initialState,
  reducers: {
    changeHadithBook: (
      state: hadithSliceStateType,
      action: PayloadAction<string>
    ) => {
      state.book = action.payload;
    },
    changeHadithChapter: (
      state: hadithSliceStateType,
      action: PayloadAction<number>
    ) => {
      state.chapter = action.payload;
    },
  },
});

export const { changeHadithBook, changeHadithChapter } =
  CurrentHadithSlice.actions;
export default CurrentHadithSlice.reducer;
