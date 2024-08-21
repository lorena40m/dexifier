import { TokenBalance } from "@/app/types/interface";
import { Wallet, WidgetConfig } from "@/app/wallet/types";
import { ProviderInterface } from "@rango-dev/wallets-react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConnectedWallet extends Wallet {
  balances: TokenBalance[] | null;
  explorerUrl: string | null;
  selected: boolean;
  loading: boolean;
  error: boolean;
}

const initialWalletList: {
  connectedWallets: ConnectedWallet[]
  config: WidgetConfig
  providers: ProviderInterface[]
} = {
  connectedWallets: [{
    balances: null,
    explorerUrl: null,
    selected: false,
    loading: false,
    error: false,
    chain: "",
    address: "",
    walletType: ""
  }],
  config: { apiKey: "" },
  providers: []
}

export const walletSlice = createSlice({
  name: "wallet",
  initialState: initialWalletList,
  reducers: {
    updateConnectedWallet(
      state,
      action: PayloadAction<{ walletList: ConnectedWallet[] }>
    ) {
      return { ...state, connectedWallets: action.payload.walletList };
    },
    updateWalletProvider(
      state,
      action: PayloadAction<{ providers: ProviderInterface[] }>
    ) {
      return { ...state, providers: action.payload.providers };
    },
  }
});

export const { updateConnectedWallet, updateWalletProvider } =
  walletSlice.actions;
