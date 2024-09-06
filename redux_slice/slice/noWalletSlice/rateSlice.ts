import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialRateState: {
  rateResult: RateResponse | undefined;
} = {
  rateResult: undefined,
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
    resetRate(
      state
    ) {
      return { ...state, rateResult: undefined }
    }
  },
});

export const { updateRateResult, resetRate } =
  rateSlice.actions;
