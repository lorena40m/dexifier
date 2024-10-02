import { TransactionData } from "@/app/types/noWalletInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type RecipientAddressError = { isError: boolean, error: string }

const initialRateState: {
  recipientAddress: string;
  recipientAddressError: RecipientAddressError;
  depositAddress: string;
  transactionData: TransactionData | undefined;
  isTransactionLoading: boolean;
  isHistoryLoading: boolean;
  confirmIntervalId: NodeJS.Timeout | null;
} = {
  recipientAddress: "",
  depositAddress: "",
  transactionData: undefined,
  recipientAddressError: { isError: false, error: "" },
  isTransactionLoading: false,
  isHistoryLoading: false,
  confirmIntervalId: null
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: initialRateState,
  reducers: {
    updateRecipientAddress(
      state,
      action: PayloadAction<{ recipientAddress: string }>
    ) {
      return { ...state, recipientAddress: action.payload.recipientAddress };
    },

    updateDepositAddress(
      state,
      action: PayloadAction<{ depositAddress: string }>
    ) {
      return { ...state, depositAddress: action.payload.depositAddress }
    },

    updateAddressError(
      state,
      action: PayloadAction<{ recipientAddressError: RecipientAddressError }>
    ) {
      return { ...state, recipientAddressError: action.payload.recipientAddressError }
    },

    updateTransactionData(
      state,
      action: PayloadAction<{ transactionData: any }>
    ) {
      return { ...state, transactionData: action.payload.transactionData }
    },

    updateTransactionLoading(
      state,
      action: PayloadAction<{ isTransactionLoading: boolean }>
    ) {
      return { ...state, isTransactionLoading: action.payload.isTransactionLoading }
    },

    updateHistoryLoading(
      state,
      action: PayloadAction<{ isHistoryLoading: boolean }>
    ) {
      return { ...state, isHistoryLoading: action.payload.isHistoryLoading }
    },

    setConfirmIntervalId(
      state,
      action: PayloadAction<{ confirmIntervalId: NodeJS.Timeout | null }>
    ) {
      return { ...state, confirmIntervalId: action.payload.confirmIntervalId }
    }
  },
});

export const {
  updateRecipientAddress,
  updateDepositAddress,
  updateTransactionData,
  updateAddressError,
  updateTransactionLoading,
  setConfirmIntervalId,
  updateHistoryLoading
} = transactionSlice.actions;
