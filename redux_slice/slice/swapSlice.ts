import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result, TxSwapResponse } from "@/app/types/interface";

const initialSwapState: {
  isSwapMade: boolean;
  isInProcess: boolean;
  swapResponse: TxSwapResponse;
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
} = swapSlice.actions;
