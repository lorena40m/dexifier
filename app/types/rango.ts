import { WalletType } from "@rango-dev/wallets-shared";
import { SwapperMeta } from "rango-types/mainApi";

export enum ConfirmMessage {
  'FEE' = "transaction fee",
  'FEE_AND_INPUT_ASSET' = "transaction fee and swap amount",
  'INPUT_ASSET' = "swap amount for transacion"
}

export interface DiagnosticMessage {
  status: string;
  message: string;
  actionUrl?: string;
}

export interface Settings {
  slippage: string;
  swappers: SwapperMeta[];
  infiniteApproval: boolean;
}

export interface Wallet {
  chain: string;
  address: string;
  walletType: WalletType;
}