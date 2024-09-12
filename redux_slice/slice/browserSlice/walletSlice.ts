import { WalletAssetsBalance, WalletData } from "@/app/types/interface";
import { Wallet, WidgetConfig } from "@/app/wallet/types";
import { ProviderInterface } from "@rango-dev/wallets-react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TokenBalance = {
  chain: string;
  symbol: string;
  ticker: string;
  address: string | null;
  rawAmount: string;
  decimal: number | null;
  amount: string;
  logo: string | null;
  usdPrice: number | null;
};

export interface ConnectedWallet extends Wallet {
  balances: TokenBalance[] | null;
  explorerUrl: string | null;
  selected: boolean;
  loading: boolean;
  error: boolean;
}

const initialWalletList: {
  connectedWallets: ConnectedWallet[]
  selectedWallets: Wallet[]
  walletBalances: WalletAssetsBalance[]
  refOfConnectButton: HTMLButtonElement | null
  config: WidgetConfig
  providers: ProviderInterface[]
  requiredChain: string
} = {
  connectedWallets: [],
  walletBalances: [],
  config: { apiKey: "" },
  providers: [],
  refOfConnectButton: null,
  selectedWallets: [],
  requiredChain: "",
}

export const walletSlice = createSlice({
  name: "wallet",
  initialState: initialWalletList,
  reducers: {
    updateConnectedWallet(
      state,
      action: PayloadAction<{ accounts: WalletData[] }>
    ) {
      const accounts = action.payload.accounts;
      const newState = state.connectedWallets
        .filter((wallet) => wallet.walletType !== accounts[0].walletType)
        .concat(
          accounts.map((account) => {
            const shouldMarkWalletAsSelected = !state.connectedWallets.find(
              (connectedWallet) =>
                connectedWallet.chain === account.chain && connectedWallet.selected,
            );
            return {
              balances: [],
              address: account.address,
              chain: account.chain,
              explorerUrl: null,
              walletType: account.walletType,
              selected: shouldMarkWalletAsSelected,
              loading: true,
              error: false,
            };
          }),
        )
      return { ...state, connectedWallets: newState };
    },

    setButtonRef(
      state,
      action: PayloadAction<{ refButton: HTMLButtonElement }>
    ) {
      return {
        ...state,
        refOfConnectButton: action.payload.refButton
      }
    },
    clearConnectedWallet(
      state,
      action: PayloadAction<{}>
    ) {
      return {
        ...state,
        connectedWallets: [],
        selectedWallets: []
      };
    },
    disconnectedWallet(
      state,
      action: PayloadAction<{ walletType: string }>
    ) {
      const walletType = action.payload.walletType
      const selectedWallets = state.connectedWallets
        .filter(
          (connectedWallet) =>
            connectedWallet.selected &&
            connectedWallet.walletType !== walletType,
        )
        .map((selectedWallet) => selectedWallet.chain);

      const connectedWallets = state.connectedWallets
        .filter(
          (connectedWallet) => connectedWallet.walletType !== walletType,
        )
        .map((connectedWallet) => {
          const anyWalletSelectedForBlockchain = selectedWallets.includes(
            connectedWallet.chain,
          );
          if (anyWalletSelectedForBlockchain) {
            return connectedWallet;
          }
          selectedWallets.push(connectedWallet.chain);
          return { ...connectedWallet, selected: true };
        });

      return { ...state, connectedWallets: connectedWallets };
    },

    updateSelectedWallets(
      state,
      action: PayloadAction<{ selectedWallets: Wallet[] }>
    ) {
      return { ...state, selectedWallets: action.payload.selectedWallets };
    },

    updateRequiredChain(
      state,
      action: PayloadAction<{ requiredChain: string }>
    ) {
      return { ...state, requiredChain: action.payload.requiredChain };
    },

    updateWalletBalances(
      state,
      action: PayloadAction<{ walletBalances: WalletAssetsBalance[] }>
    ) {
      return { ...state, walletBalances: action.payload.walletBalances }
    },

    updateWalletProvider(
      state,
      action: PayloadAction<{ providers: ProviderInterface[] }>
    ) {
      return { ...state, providers: action.payload.providers };
    },
  }
});

export const {
  updateConnectedWallet,
  updateWalletProvider,
  disconnectedWallet,
  clearConnectedWallet,
  setButtonRef,
  updateSelectedWallets,
  updateRequiredChain,
  updateWalletBalances,
} = walletSlice.actions;
