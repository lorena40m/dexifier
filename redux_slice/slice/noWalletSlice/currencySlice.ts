import { CurrencyType, SelectedCurrencyType } from "@/app/types/noWalletInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Currency = SelectedCurrencyType & {
  value: string;
};

const initialCurrencyState: { fromCurrency: Currency; toCurrency: Currency, isFixed: boolean } = {
  fromCurrency: {
    code: "",
    name: "",
    icon: "",
    notes: "",
    value: "",
    network: undefined
  },

  toCurrency: {
    code: "",
    name: "",
    icon: "",
    notes: "",
    value: "",
    network: undefined
  },

  isFixed: false

};

const initialState: Currency = {
  code: "",
  name: "",
  icon: "",
  notes: "",
  value: "",
  network: undefined
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
        return { ...state, toCurrency: { ...state.toCurrency, value: value } };
      }
    },
    resetCurrency(state, action: PayloadAction<{ isFromCurrency: boolean }>) {
      if (action.payload.isFromCurrency)
        return { ...state, fromCurrency: initialState };
      else return { ...state, toCurrency: initialState };
    },

    updateFixedState(state, action: PayloadAction<{ isFixed: boolean }>) {
      return { ...state, isFixed: action.payload.isFixed }
    }
  },
});

export const { resetCurrency, updateCurrency, updateCurrencyValue, updateFixedState } = currencySlice.actions;
