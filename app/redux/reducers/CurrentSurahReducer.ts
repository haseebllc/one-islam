import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the state
interface SecLang {
  lang: string;
  vrsn: string;
}

interface CurrentSurahState {
  lang: string;
  vrsn: string;
  id: number;
  secLang: SecLang;
}

const initialState: CurrentSurahState = {
  lang: "Arabic",
  vrsn: "original",
  id: 1,
  secLang: {
    lang: "English",
    vrsn: "original",
  },
};

const CurrentSurahSlice = createSlice({
  name: "current-surah-slice",
  initialState,
  reducers: {
    changeSurahId: (
      state: CurrentSurahState,
      action: PayloadAction<number>
    ) => {
      state.id = action.payload;
    },
    // second-language --
    changeSecSurahLang: (
      state: CurrentSurahState,
      action: PayloadAction<string>
    ) => {
      state.secLang.lang = action.payload;
    },
    changeSecSurahLangVrsn: (
      state: CurrentSurahState,
      action: PayloadAction<string>
    ) => {
      state.secLang.vrsn = action.payload;
    },
  },
});

export default CurrentSurahSlice.reducer;
export const { changeSurahId, changeSecSurahLang, changeSecSurahLangVrsn } =
  CurrentSurahSlice.actions;
