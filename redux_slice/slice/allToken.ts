import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token } from "@/app/types/interface";

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
      value: "",
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
