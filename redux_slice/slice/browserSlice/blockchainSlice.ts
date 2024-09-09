import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Blockchain } from "@/app/types/interface";
import { BlockchainMeta } from "rango-types";

const initialBlockchainState: {
  blockchains: BlockchainMeta[]
  fromBlockchain: Blockchain;
  toBlockchain: Blockchain;
} = {
  blockchains: [],
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
    setBlockchains(
      state,
      action: PayloadAction<{ blockchain: BlockchainMeta[] }>
    ) {
      return { ...state, blockchains: action.payload.blockchain };
    },
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

export const { resetBlockchain, updateFromBlockchain, updateToBlockchain, setBlockchains } =
  blockchainSlice.actions;
