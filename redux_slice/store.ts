import storage from "redux-persist/lib/storage"; // Import default storage (localStorage for web)
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

// Import your slice reducers
import { alltokenSlice } from "./slice/browserSlice/allToken";
import { tokenSlice } from "./slice/browserSlice/tokenSlice";
import { blockchainSlice } from "./slice/browserSlice/blockchainSlice";
import { quoteDataSlice } from "./slice/browserSlice/quoteDataSlice";
import { routeSlice } from "./slice/browserSlice/routeSlice";
import { settingsSlice } from "./slice/settingsSlice";
import { swapSlice } from "./slice/browserSlice/swapSlice";
import { walletSlice } from "./slice/browserSlice/walletSlice";
import { currencySlice } from "./slice/noWalletSlice/currencySlice";
import { rateSlice } from "./slice/noWalletSlice/rateSlice";
import { filterSlice } from "./slice/browserSlice/filterSlice";
import { transactionSlice } from "./slice/noWalletSlice/transactionSlice";
import { historySlice } from "./slice/noWalletSlice/historySlice";

// Configuration for redux-persist
const persistConfig = {
  key: "root", // Key for the root reducer
  storage, // Storage method (localStorage for web)
  blacklist: ["routes", "swap", "wallet"], // These slices won't be persisted
};

// Combine all slice reducers into a root reducer
const rootReducer = combineReducers({
  tokens: tokenSlice.reducer,
  blockchains: blockchainSlice.reducer,
  routes: routeSlice.reducer,
  settings: settingsSlice.reducer,
  swap: swapSlice.reducer,
  allToken: alltokenSlice.reducer,
  quoteData: quoteDataSlice.reducer,
  wallet: walletSlice.reducer,
  currency: currencySlice.reducer,
  rate: rateSlice.reducer,
  filter: filterSlice.reducer,
  transaction: transactionSlice.reducer,
  history: historySlice.reducer
});

// Persist the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer and middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: ['persist/PERSIST'], // Ignore specific redux-persist actions
      //   ignoredPaths: ['register', 'rehydrate'], // Ignore paths that may contain non-serializable values
      // },
    }),
});

// Create the persistor for the store
export const persistor = persistStore(store);

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
