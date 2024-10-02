import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialFilterList: {
  filterChainList: string[],
  filterWalletList: string[],
  isHideSmallBalance: boolean,
  isHideEmptyWallet: boolean,
  isHideUnsupportedToken: boolean
  filterLoading: boolean
} = {
  filterWalletList: [],
  filterChainList: [],
  isHideSmallBalance: true,
  isHideEmptyWallet: false,
  isHideUnsupportedToken: true,
  filterLoading: false
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

    updateFilterSmallBalance(
      state,
      action: PayloadAction<{ isHideSmallBalance: boolean }>
    ) {
      return { ...state, isHideSmallBalance: action.payload.isHideSmallBalance }
    },

    updateFilterEmptyWallet(
      state,
      action: PayloadAction<{ isHideEmptyWallet: boolean }>
    ) {
      return { ...state, isHideEmptyWallet: action.payload.isHideEmptyWallet }
    },

    updateFilterUnsupportedToken(
      state,
      action: PayloadAction<{ isHideUnsupportedToken: boolean }>
    ) {
      return { ...state, isHideUnsupportedToken: action.payload.isHideUnsupportedToken }
    },
    updateFilterLoading(
      state,
      action: PayloadAction<{ filterLoading: boolean }>
    ) {
      return { ...state, filterLoading: action.payload.filterLoading }
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
  updateFilterChain,
  updateFilterSmallBalance,
  updateFilterEmptyWallet,
  updateFilterUnsupportedToken,
  updateFilterLoading
} = filterSlice.actions;
