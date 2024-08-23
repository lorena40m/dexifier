import type { InstallObjects, Namespace, WalletType } from "@rango-dev/wallets-shared";
import { TransactionType } from "rango-types";

export interface Wallet {
  chain: string;
  address: string;
  walletType: WalletType;
}

export type Balance = {
  amount: string;
  decimals: number;
  usdValue: string;
};

type Blockchain = string;
type TokenSymbol = string;
type Address = string;

/** `blockchain-symbol-Address` */
export type TokenHash = `${Blockchain}-${TokenSymbol}-${Address}`;

export type TokensBalance = {
  [key: TokenHash]: Balance;
};

export type WalletInfoWithNamespaces = WalletInfo & {
  namespaces?: Namespace[];
  singleNamespace?: boolean;
};

export type WalletInfo = {
  state: WalletState;
  link: InstallObjects | string;
  title: string;
  image: string;
  type: string;
  showOnMobile?: boolean;
  blockchainTypes: TransactionType[];
};

export enum WalletState {
  NOT_INSTALLED = 'not_installed',
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
}