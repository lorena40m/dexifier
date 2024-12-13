import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token } from "rango-types/mainApi";

const initialTokenState: { tokens: Token[] } = {
  tokens: [
    {
      blockchain: "",
      symbol: "",
      image: "",
      address: "",
      usdPrice: 0,
      decimals: 0,
      name: "",
      isPopular: false,
      isSecondaryCoin: false,
      coinSource: "",
      coinSourceUrl: "",
      supportedSwappers: [""],
    },
  ],
};

export const alltokenSlice = createSlice({
  name: "allToken",
  initialState: initialTokenState,
  reducers: {
    setAllToken(state, action: PayloadAction<{ allToken: Token[] }>) {
        return { tokens: action.payload.allToken };
    },
  },
});

export const { setAllToken } = alltokenSlice.actions;
