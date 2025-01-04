// Types
type hadithBooksTypes = {
  name: string;
  lastHadith: number;
};

export type StateType = {
  currentBook: string;
};

export type Action = { type: string };

// Actual code
export const hadithBooks: hadithBooksTypes[] = [
  { name: "sahih-muslim", lastHadith: 100 },
  { name: "sahih-bukhari", lastHadith: 101 },
  { name: "abu-dawud", lastHadith: 102 },
  { name: "sunan-tirmidhi", lastHadith: 103 },
  { name: "ibn-majah", lastHadith: 104 },
];

export const initialState: StateType = {
  currentBook: hadithBooks[0].name,
};

export const reducer = (state: StateType, action: Action): StateType => {
  const foundBook = hadithBooks.find((book) => book.name === action.type);
  return foundBook ? { currentBook: foundBook.name } : state;
};
