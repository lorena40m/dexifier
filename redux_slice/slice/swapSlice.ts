import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result, TxSwapResponse } from "@/app/types/interface";
import { ConfirmRouteResponse } from "rango-types/mainApi";

const initialSwapState: {
  isSwapMade: boolean;
  isInProcess: boolean;
  swapResponse: TxSwapResponse;
  confirmResponse: ConfirmRouteResponse | undefined;
  customAddress: string | null;
} = {
  isSwapMade: false,
  isInProcess: false,
  swapResponse: {
    requestId: "",
    resultType: "",
    tx: {
      type: "",
      from: "",
      blockChain: "",
      data: {
        chainId: "",
        account_number: 0,
        sequence: 0,
        msgs: [],
        protoMsgs: [],
        memo: "",
        source: 0,
        fee: {
          gas: "",
          amount: [],
        },
        signType: "",
        rpcUrl: "",
      },
      rawTransfer: {
        method: "",
        asset: {
          blockchain: "",
          symbol: "",
          address: "",
          ticker: "",
        },
        amount: 0,
        decimals: 0,
        recipient: "",
        memo: "",
      },
    },
  },
  confirmResponse: undefined,
  customAddress: null
};

export const swapSlice = createSlice({
  name: "swap",
  initialState: initialSwapState,
  reducers: {
    updateSwapStatus(state, action: PayloadAction<{ isInProcess: boolean }>) {
      return {
        ...state,
        isInProcess: action.payload.isInProcess,
      };
    },
    updateSwapResponse(
      state,
      action: PayloadAction<{ swapResponse: TxSwapResponse }>
    ) {
      return {
        ...state,
        swapResponse: action.payload.swapResponse,
      };
    },
    updateSwapMade(state, action: PayloadAction<{ isSwapMade: boolean }>) {
      return {
        ...state,
        isSwapMade: action.payload.isSwapMade,
      };
    },
    updateCustomAddress(state, action: PayloadAction<{ customAddress: string | null }>) {
      return {
        ...state,
        customAddress: action.payload.customAddress,
      };
    },

    updateConfirmResponse(state, action: PayloadAction<{ confirmResponse: ConfirmRouteResponse }>) {
      return {
        ...state,
        confirmResponse: action.payload.confirmResponse,
      };
    },

    resetSwap(_) {
      return initialSwapState;
    },
  },
});

export const {
  resetSwap,
  updateSwapStatus,
  updateSwapMade,
  updateSwapResponse,
  updateConfirmResponse,
  updateCustomAddress,
} = swapSlice.actions;
