import { RateResponse } from "@/app/types/noWalletInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialRateState: {
  rateResult: RateResponse | undefined;
  isLoading: boolean;
} = {
  rateResult: undefined,
  isLoading: false
};

export const rateSlice = createSlice({
  name: "rate",
  initialState: initialRateState,
  reducers: {
    updateRateResult(
      state,
      action: PayloadAction<{ rateResult: RateResponse }>
    ) {
      return { ...state, rateResult: action.payload.rateResult };
    },

    updateLoadingState(
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) {
      return { ...state, isLoading: action.payload.isLoading }
    },

    resetRate(
      state
    ) {
      return { ...state, rateResult: undefined }
    }
  },
});

export const { updateRateResult, resetRate, updateLoadingState } =
  rateSlice.actions;
