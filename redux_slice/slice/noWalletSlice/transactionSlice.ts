import { TransactionData } from "@/app/types/noWalletInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type RecipientAddressError = { isError: boolean, error: string }

const initialRateState: {
  recipientAddress: string;
  recipientAddressError: RecipientAddressError;
  depositAddress: string;
  transactionData: TransactionData | undefined;
  isTransactionLoading: boolean
} = {
  recipientAddress: "",
  depositAddress: "",
  transactionData: undefined,
  recipientAddressError: { isError: false, error: "" },
  isTransactionLoading: false
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
    }
  },
});

export const { updateRecipientAddress, updateDepositAddress, updateTransactionData, updateAddressError, updateTransactionLoading } =
  transactionSlice.actions;
