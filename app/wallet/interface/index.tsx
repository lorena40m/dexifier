// import type {
//   Namespace,
//   Network,
//   WalletInfo,
//   WalletType,
// } from '@rango-dev/wallets-shared';
import type { InstallObjects, WalletType } from "@rango-dev/wallets-shared";
import { SwapperType, TransactionType } from "rango-types";
export type StepDetailsType = {
  key?: any;
  step?: any;
  type?: any;
  ref?: any;
  state?: any;
  hasSeparator?: any;
  tabIndex?: any;
  isFocused?: any;
  tooltipContainer?: any;
};

export type IconButtonType = {
  variant: string;
  onClick: any;
};

export enum WalletState {
  NOT_INSTALLED = "not_installed",
  DISCONNECTED = "disconnected",
  CONNECTING = "connecting",
  CONNECTED = "connected",
}
import type { ReactNode } from "react";

export type PriceImpactWarningLevel = "low" | "high" | undefined;

export type PriceImpactPropTypes = {
  size: any;
  outputUsdValue?: string;
  outputColor?: string;
  realOutputUsdValue?: string;
  error?: string;
  percentageChange?: string | null;
  warningLevel?: PriceImpactWarningLevel;
  tooltipProps?: {
    container?: any;
    side?: any;
  };
};

export type BaseProps = {
  chain: {
    displayName: string;
    image: string;
  };
  token: {
    displayName: string;
    image: string;
  };
  price: {
    value: string;
    usdValue?: string;
    realValue?: string;
    realUsdValue?: string;
    error?: string;
  };
  loading?: boolean;
  error?: boolean;
  disabled?: boolean;
  label: string;
  sharpBottomStyle?: boolean;
  onClickToken: () => void;
  tooltipContainer?: HTMLElement;
};

type FromProps = {
  mode: "From";
  balance?: string;
  loadingBalance: boolean;
  onSelectMaxBalance: () => void;
  onInputChange: (inputAmount: string) => void;
};

type ToProps = {
  mode: "To";
  fetchingQuote?: boolean;
  percentageChange: string | null;
  warningLevel: PriceImpactWarningLevel;
};

export type SwapInputPropTypes = BaseProps & (FromProps | ToProps);

type BaseStep = Pick<SwapInputPropTypes, "chain" | "token" | "price">;
type BaseInternalStep = {
  chain: BaseStep["chain"];
} & Partial<Pick<BaseStep, "token" | "price">>;

type SwapperInfo = SwapInputPropTypes["chain"] & {
  type?: SwapperType;
};

export type InternalSwap = {
  swapper: SwapperInfo;
  from: BaseInternalStep;
  to: BaseInternalStep;
};

export type Step = {
  swapper: SwapperInfo;
  from: BaseStep;
  to: BaseStep;
  error?: {
    title?: string;
    description?: string;
  };
  alerts?: ReactNode;
  state?: "error" | "warning";
  time?: string;
  fee?: string;
  internalSwaps?: InternalSwap[];
};

export type StepDetailsProps = {
  step: Step;
  hasSeparator: boolean;
  type: "quote-details" | "swap-progress";
  state?: "default" | "in-progress" | "completed" | "warning" | "error";
  isFocused?: boolean;
  tabIndex?: number;
  tooltipContainer?: HTMLElement;
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

export interface Info {
  color: string;
  description: string;
  tooltipText: string;
}

export interface ContentProps {
  image: string;
  title: string;
  description: string;
  descriptionColor?: string;
}

export interface WalletPropTypes {
  state: WalletState;
  title: string;
  image: string;
  link: InstallObjects | string;
  type: WalletType;
  onClick: (type: WalletType) => void;
  selected?: boolean;
  description?: string;
  isLoading?: boolean;
  container?: HTMLElement;
  disabled?: boolean;
}

export type SelectablePropTypes = WalletPropTypes & {
  selected: boolean;
  disabled?: boolean;
};

interface TypographyType {
  children: React.ReactNode;
  variant: string;
  size: string;
  className?: string;
  color?: string;
  align?: string;
}
// export { Namespace, Network, WalletInfo, WalletType }
export type { TypographyType };
