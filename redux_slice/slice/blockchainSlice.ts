import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Blockchain } from "@/app/types/interface";

const initialBlockchainState: {
  fromBlockchain: Blockchain;
  toBlockchain: Blockchain;
} = {
  fromBlockchain: {
    name: "",
    type: "",
    chainId: "",
    logo: "",
    displayName: "",
    shortName: "",
    color: "",
    sort: 0,
    defaultDecimals: 0,
    addressPatterns: [],
    feeAssets: [],
    enabled: false,
    info: null,
  },

  toBlockchain: {
    name: "",
    type: "",
    chainId: "",
    logo: "",
    displayName: "",
    shortName: "",
    color: "",
    sort: 0,
    defaultDecimals: 0,
    addressPatterns: [],
    feeAssets: [],
    enabled: false,
    info: null,
  },
};

const initialState: Blockchain = {
  name: "",
  type: "",
  chainId: "",
  logo: "",
  displayName: "",
  shortName: "",
  color: "",
  sort: 0,
  defaultDecimals: 0,
  addressPatterns: [],
  feeAssets: [],
  enabled: false,
  info: null,
};

export const blockchainSlice = createSlice({
  name: "blockchains",
  initialState: initialBlockchainState,
  reducers: {
    updateFromBlockchain(
      state,
      action: PayloadAction<{ blockchain: Blockchain }>
    ) {
      return { ...state, fromBlockchain: action.payload.blockchain };
    },
    updateToBlockchain(
      state,
      action: PayloadAction<{ blockchain: Blockchain }>
    ) {
      return { ...state, toBlockchain: action.payload.blockchain };
    },
    resetBlockchain(
      state,
      action: PayloadAction<{ isFromBlockchain: boolean }>
    ) {
      if (action.payload.isFromBlockchain) {
        return { ...state, fromBlockchain: initialState };
      } else {
        return { ...state, toBlockchain: initialState };
      }
    },
  },
});

export const { resetBlockchain, updateFromBlockchain, updateToBlockchain } =
  blockchainSlice.actions;
