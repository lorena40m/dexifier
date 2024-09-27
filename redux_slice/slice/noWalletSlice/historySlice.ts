import { TransactionData } from "@/app/types/noWalletInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialRateState: {
  history: TransactionData[];
} = {
  history: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState: initialRateState,
  reducers: {
    addHistory(state, action: PayloadAction<{ newHistory: TransactionData }>) {
      // Add the new history item at the beginning of the array
      state.history.unshift(action.payload.newHistory);
    },

    deleteHistory(
      state,
      action: PayloadAction<{ deleteHistory: TransactionData }>
    ) {
      const indexToRemove = state.history.findIndex(
        (item) => item.id === action.payload.deleteHistory.id // Compare by a unique property, e.g., id
      );
      if (indexToRemove !== -1) {
        state.history.splice(indexToRemove, 1); // Remove the element at the found index
      } else {
        console.log("Error: Transaction not found in history.");
      }
    },
  },
});

export const { addHistory, deleteHistory } = historySlice.actions;
export default historySlice.reducer;
