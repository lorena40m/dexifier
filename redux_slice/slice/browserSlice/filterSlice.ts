import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialFilterList: {
  filterChainList: string[],
  filterWalletList: string[]
} = {
  filterWalletList: [],
  filterChainList: []
}

export const filterSlice = createSlice({
  name: "filter",
  initialState: initialFilterList,
  reducers: {

    updateFilterWallet(
      state,
      action: PayloadAction<{ filterWalletList: string[] }>
    ) {
      return { ...state, filterWalletList: action.payload.filterWalletList }
    },

    updateFilterChain(
      state,
      action: PayloadAction<{ filterChainList: string[] }>
    ) {
      return { ...state, filterChainList: action.payload.filterChainList }
    },
  }
});

export const {
  updateFilterWallet,
  updateFilterChain
} = filterSlice.actions;
