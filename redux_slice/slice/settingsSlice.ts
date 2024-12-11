import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bridge, Exchange, Settings, WALLET } from "@/app/types/interface";

const initialSettingsState: Settings & { wallet: WALLET } = {
  slippage: 1,
  infiniteApproval: false,
  bridges: [],
  selectedBridgesCounter: 0,
  totalBridges: 0,
  exchanges: [],
  selectedExchangesCounter: 0,
  totalExchanges: 0,
  wallet: WALLET.NONE
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: initialSettingsState,
  reducers: {
    updateSlippage(state, action: PayloadAction<{ value: number }>) {
      return { ...state, slippage: action.payload.value };
    },

    updateInfiniteApproval(state, action: PayloadAction<{ value: boolean }>) {
      return { ...state, infiniteApproval: action.payload.value };
    },

    updateBridges(state, action: PayloadAction<{ bridgeID: string }>) {
      const { bridgeID } = action.payload;

      const isToBeRemoved = state.bridges.includes(bridgeID);

      if (isToBeRemoved) {
        const newBridges = state.bridges.filter((b) => b !== bridgeID);
        return {
          ...state,
          bridges: newBridges,
          selectedBridgesCounter: state.selectedBridgesCounter - 1,
        };
      } else
        return {
          ...state,
          bridges: [...state.bridges, bridgeID],
          selectedBridgesCounter: state.selectedBridgesCounter + 1,
        };
    },

    updateTotalBridges(state, action: PayloadAction<{ value: number }>) {
      return { ...state, totalBridges: action.payload.value };
    },

    toggleSelectAllBridges(
      state,
      action: PayloadAction<{ bridges: Bridge[] }>
    ) {
      const { bridges } = action.payload;

      if (state.selectedBridgesCounter === bridges.length)
        return { ...state, bridges: [], selectedBridgesCounter: 0 };
      else {
        const tempBridges = bridges!.map((item) => item.id);
        return {
          ...state,
          bridges: tempBridges,
          selectedBridgesCounter: tempBridges.length,
        };
      }
    },

    updateExchanges(state, action: PayloadAction<{ exchangeId: string }>) {
      const { exchangeId } = action.payload;

      const isToBeRemoved = state.exchanges.includes(exchangeId);

      if (isToBeRemoved) {
        const newExchanges = state.exchanges.filter((e) => e !== exchangeId);
        return {
          ...state,
          exchanges: newExchanges,
          selectedExchangesCounter: state.selectedExchangesCounter - 1,
        };
      } else
        return {
          ...state,
          exchanges: [...state.exchanges, exchangeId],
          selectedExchangesCounter: state.selectedExchangesCounter + 1,
        };
    },

    updateTotalExchanges(state, action: PayloadAction<{ value: number }>) {
      return { ...state, totalExchanges: action.payload.value };
    },

    toggleSelectAllExchanges(
      state,
      action: PayloadAction<{ exchanges: Exchange[] }>
    ) {
      const { exchanges } = action.payload;
      if (state.selectedExchangesCounter === exchanges.length)
        return { ...state, exchanges: [], selectedExchangesCounter: 0 };
      else {
        const tempExchanges = exchanges!.map((item) => item.id);
        return {
          ...state,
          exchanges: tempExchanges,
          selectedExchangesCounter: tempExchanges.length,
        };
      }
    },
    updateManner(
      state,
      action: PayloadAction<{ wallet: WALLET }>
    ) {
      return {
        ...state,
        wallet: action.payload.wallet
      };
    },

    resetSettings() {
      return initialSettingsState;
    },
  },
});

export const {
  resetSettings,
  updateSlippage,
  updateInfiniteApproval,
  updateBridges,
  updateTotalBridges,
  toggleSelectAllBridges,
  updateExchanges,
  updateTotalExchanges,
  toggleSelectAllExchanges,
  updateManner,
} = settingsSlice.actions;
