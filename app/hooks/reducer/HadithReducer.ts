interface HadithState {
  scroll_to_first_hadith: boolean;
}
type HadithAction =
  | { type: "scroll_to_first_hadith_true" }
  | { type: "scroll_to_first_hadith_false" };

export const hadithReducer_initialState: HadithState = {
  scroll_to_first_hadith: false,
};

export const hadith_Reducer = (
  state: HadithState = hadithReducer_initialState,
  action: HadithAction
): HadithState => {
  switch (action.type) {
    case "scroll_to_first_hadith_true":
      return {
        ...state,
        scroll_to_first_hadith: true,
      } as HadithState;

    case "scroll_to_first_hadith_false":
      return {
        ...state,
        scroll_to_first_hadith: false,
      } as HadithState;

    default:
      return state;
  }
};

export default hadith_Reducer;
