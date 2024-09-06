import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token } from "@/app/types/interface";

export type Currency = CurrencyType & {
  value: string;
};

const initialCurrencyState: { fromCurrency: Currency; toCurrency: Currency } = {
  fromCurrency: {
    code: "",
    name: "",
    icon: "",
    notes: "",
    value: ""
  },

  toCurrency: {
    code: "",
    name: "",
    icon: "",
    notes: "",
    value: ""
  },
};

const initialState: Currency = {
  code: "",
  name: "",
  icon: "",
  notes: "",
  value: ""
}

export const currencySlice = createSlice({
  name: "currency",
  initialState: initialCurrencyState,
  reducers: {
    updateCurrency(
      state,
      action: PayloadAction<{ currency: Currency; isFromCurrency: boolean }>
    ) {
      const { isFromCurrency, currency } = action.payload;
      if (isFromCurrency) {
        return { ...state, fromCurrency: currency };
      } else {
        return { ...state, toCurrency: currency };
      }
    },
    updateCurrencyValue(
      state,
      action: PayloadAction<{ isFromCurrency: boolean; value: string }>
    ) {
      const { isFromCurrency, value } = action.payload;
      if (isFromCurrency) {
        return { ...state, fromCurrency: { ...state.fromCurrency, value: value } };
      } else {
        return { ...state, fromCurrency: { ...state.toCurrency, value: value } };
      }
    },
    resetCurrency(state, action: PayloadAction<{ isFromCurrency: boolean }>) {
      if (action.payload.isFromCurrency)
        return { ...state, fromCurrency: initialState };
      else return { ...state, toCurrency: initialState };
    },
  },
});

export const { resetCurrency, updateCurrency, updateCurrencyValue } = currencySlice.actions;
