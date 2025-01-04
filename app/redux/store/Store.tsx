// app/Redux/Store.tsx

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Slices import
import CurrentSurahSlice from "../reducers/CurrentSurahReducer";
import CurrentHadithSlice from "../reducers/CurrentHadithReducer";

// Combine reducers
const rootReducer = combineReducers({
  CurrentSurahSlice_key: CurrentSurahSlice,
  CurrentHadithSlice_key: CurrentHadithSlice,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    // (want to persist)
    "CurrentSurahSlice_key",
    "CurrentHadithSlice_key",
  ],
  // blacklist: [
  //   // (want to persist)
  //   "SoloSurahSliceKey",
  // ],
};

// persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store configuration
export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// persistor
export const persistor = persistStore(Store);
