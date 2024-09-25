import { RateResponse } from "@/app/types/noWalletInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialRateState: {
  rateResult: RateResponse | undefined;
  isLoading: boolean;
  isConfirming: boolean;
} = {
  rateResult: undefined,
  isLoading: false,
  isConfirming: false
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

    updateConfirming(
      state,
      action: PayloadAction<{ isConfirming: boolean }>
    ) {
      return { ...state, isConfirming: action.payload.isConfirming }
    },

    resetRate(
      state
    ) {
      return { ...state, rateResult: undefined }
    }
  },
});

export const { updateRateResult, resetRate, updateLoadingState, updateConfirming } =
  rateSlice.actions;
