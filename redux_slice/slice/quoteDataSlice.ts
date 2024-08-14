import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result, RouteData } from "@/app/types/interface";

const initialRouteState: RouteData = {
  from: {
    blockchain: "",
    symbol: "",
    address: null,
  },
  to: {
    blockchain: "",
    symbol: "",
    address: null,
  },
  amount: 0,
  connectedWallets: [],
  slippage: 1,
  selectedWallets: {},
  swapperGroups: [],
  swappersGroupsExclude: false,
};

export const quoteDataSlice = createSlice({
  name: "quoteData",
  initialState: initialRouteState,
  reducers: {
    setQuotedata(state, action: PayloadAction<{ quoteData: RouteData }>) {
      return { ...action.payload.quoteData };
    },
    updateQuoteData(
      state,
      action: PayloadAction<{ value: number | string | undefined }>
    ) {
      return { ...state, value: action.payload.value };
    },
    resetQutoteData(_) {
      return initialRouteState;
    },
  },
});

export const { setQuotedata, updateQuoteData, resetQutoteData } =
quoteDataSlice.actions;
