import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token } from "@/app/types/interface";

const initialTokenState: { fromToken: Token; toToken: Token } = {
  fromToken: {
    blockchain: "",
    symbol: "",
    image: "",
    address: "",
    name: "",
    coinSource: "",
    coinSourceUrl: "",
    usdPrice: 0,
    decimals: 0,
    isPopular: false,
    isSecondaryCoin: false,
    supportedSwappers: [],
    value: "",
  },

  toToken: {
    blockchain: "",
    symbol: "",
    image: "",
    address: "",
    name: "",
    coinSource: "",
    coinSourceUrl: "",
    usdPrice: 0,
    decimals: 0,
    isPopular: false,
    isSecondaryCoin: false,
    supportedSwappers: [],
    value: "",
  },
};

const initialState: Token = {
  blockchain: "",
  symbol: "",
  image: "",
  address: "",
  name: "",
  coinSource: "",
  coinSourceUrl: "",
  usdPrice: 0,
  decimals: 0,
  isPopular: false,
  isSecondaryCoin: false,
  supportedSwappers: [],
  value: "",
};

export const tokenSlice = createSlice({
  name: "tokens",
  initialState: initialTokenState,
  reducers: {
    updateToken(
      state,
      action: PayloadAction<{ token: Token; isFromToken: boolean }>
    ) {
      const { isFromToken, token } = action.payload;
      if (isFromToken) {
        return { ...state, fromToken: token };
      } else {
        return { ...state, toToken: token };
      }
    },
    updateTokenValue(
      state,
      action: PayloadAction<{ isFromToken: boolean; value: string }>
    ) {
      const { isFromToken, value } = action.payload;
      if (isFromToken) {
        return { ...state, fromToken: { ...state.fromToken, value: value } };
      } else {
        return { ...state, toToken: { ...state.toToken, value: value } };
      }
    },
    resetToken(state, action: PayloadAction<{ isFromToken: boolean }>) {
      if (action.payload.isFromToken)
        return { ...state, fromToken: initialState };
      else return { ...state, toToken: initialState };
    },
  },
});

export const { resetToken, updateToken, updateTokenValue } = tokenSlice.actions;
