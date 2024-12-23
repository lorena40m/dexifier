import type {
  BestRouteRequest,
  MultiRouteSimulationResult,
  SwapResult,
  Token,
} from 'rango-types/mainApi';
import { ConnectedWallet, PendingSwap, PendingSwapStep } from '@rango-dev/widget-embedded';
import type { WalletType } from '@rango-dev/wallets-shared';
import { PreferenceType } from 'rango-types/mainApi';
import BigNumber from 'bignumber.js';
import { PendingSwapNetworkStatus } from 'rango-types';
import { i18n } from '@lingui/core';
import type { StepDetailsProps } from '@rango-dev/ui';
import type { Manager } from '@rango-dev/queue-manager-core';
import type {
  PendingSwapWithQueueID,
  SwapStorage,
} from '@rango-dev/queue-manager-rango-preset';

export interface Wallet {
  chain: string;
  address: string;
  walletType: WalletType;
}

const ZERO = new BigNumber(0);
const GAS_FEE_MIN_DECIMALS = 2;
const GAS_FEE_MAX_DECIMALS = 2;

export function createQuoteRequestBody(params: {
  fromToken: Token;
  toToken: Token;
  inputAmount: string;
  wallets?: ConnectedWallet[];
  selectedWallets?: Wallet[];
  liquiditySources?: string[];
  excludeLiquiditySources?: boolean;
  disabledLiquiditySources: string[];
  slippage: number;
  affiliateRef: string | null;
  affiliatePercent: number | null;
  affiliateWallets: { [key: string]: string } | null;
  destination?: string;
}): BestRouteRequest {
  const {
    fromToken,
    toToken,
    inputAmount,
    wallets,
    selectedWallets,
    disabledLiquiditySources,
    liquiditySources,
    excludeLiquiditySources,
    slippage,
    affiliateRef,
    affiliatePercent,
    affiliateWallets,
    destination,
  } = params;
  const selectedWalletsMap = selectedWallets?.reduce(
    (
      selectedWalletsMap: BestRouteRequest['selectedWallets'],
      selectedWallet
    ) => (
      (selectedWalletsMap[selectedWallet.chain] = selectedWallet.address),
      selectedWalletsMap
    ),
    {}
  );

  const connectedWallets: BestRouteRequest['connectedWallets'] = [];

  wallets?.forEach((wallet) => {
    connectedWallets.push({
      blockchain: wallet.chain,
      addresses: [wallet.address],
    });
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const requestBody: BestRouteRequest = {
    amount: inputAmount.toString(),
    affiliateRef: affiliateRef ?? undefined,
    affiliatePercent: affiliatePercent ?? undefined,
    affiliateWallets: affiliateWallets ?? undefined,
    from: {
      address: fromToken.address,
      blockchain: fromToken.blockchain,
      symbol: fromToken.symbol,
    },
    to: {
      address: toToken.address,
      blockchain: toToken.blockchain,
      symbol: toToken.symbol,
    },
    connectedWallets,
    selectedWallets: selectedWalletsMap ?? {},
    slippage: slippage.toString(),
    ...(destination && { destination: destination }),
    ...(excludeLiquiditySources && {
      swapperGroups: disabledLiquiditySources.concat(liquiditySources ?? []),
      swappersGroupsExclude: true,
    }),
    ...(!excludeLiquiditySources && {
      swapperGroups: liquiditySources?.filter(
        (liquiditySource) => !disabledLiquiditySources.includes(liquiditySource)
      ),
      swappersGroupsExclude: false,
    }),
  };
  return requestBody;
}

export const sortQuotesBy = (
  strategy: PreferenceType,
  quotes: MultiRouteSimulationResult[]
): MultiRouteSimulationResult[] => {
  return [...quotes].sort((quote1, quote2) => {
    const getScore = (route: MultiRouteSimulationResult, strategy: string) =>
      route.scores?.find((score) => score.preferenceType === strategy)?.score ??
      0;

    let quote1Score = getScore(quote1, strategy);
    let quote2Score = getScore(quote2, strategy);

    if (strategy === "PRICE") {
      const quote1Step = quote1.swaps.length;
      const quote2Step = quote2.swaps.length;

      if (quote1Step !== quote2Step) {
        return quote1Step - quote2Step; // Sort by length in ascending order
      } else {
        quote1Score = getScore(quote1, "FEE");
        quote2Score = getScore(quote2, "FEE");

        if (quote1Score !== quote2Score) {
          return quote2Score - quote1Score; // Sort by fee in ascending order
        }
      }
    }

    if (quote1Score !== quote2Score) {
      return quote2Score - quote1Score; // Sort by strategy score in descending order
    }

    const lowerQuoteId1 = quote1.requestId.toLowerCase();
    const lowerQuoteId2 = quote2.requestId.toLowerCase();

    return lowerQuoteId1.localeCompare(lowerQuoteId2);
  });
}

const roundedSecondsToString = (s: number): string => {
  const seconds = Math.floor((s % 60) / 15) * 15;
  const minutes = parseInt((s / 60).toString());
  if (minutes >= 60) {
    return `${Math.floor(minutes / 5) * 5}:00`;
  }
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function getUsdPrice(
  blockchain: string,
  symbol: string,
  address: string | null,
  allTokens: Token[]
): number | null {
  const token = allTokens?.find(
    (t) =>
      t.blockchain === blockchain &&
      t.symbol?.toUpperCase() === symbol?.toUpperCase() &&
      t.address === address
  );
  return token?.usdPrice || null;
}

function getUsdFeeOfStep(step: SwapResult, allTokens: Token[]): BigNumber {
  let totalFeeInUsd = ZERO;
  for (let i = 0; i < step.fee.length; i++) {
    const fee = step.fee[i];
    if (fee.expenseType === "DECREASE_FROM_OUTPUT") {
      continue;
    }

    const unitPrice = getUsdPrice(
      fee.asset.blockchain,
      fee.asset.symbol,
      fee.asset.address,
      allTokens
    );
    totalFeeInUsd = totalFeeInUsd.plus(
      new BigNumber(fee.amount).multipliedBy(unitPrice || 0)
    );
  }

  return totalFeeInUsd;
}

function getTotalFeeInUsd(swaps: any[], allTokens: Token[]): BigNumber {
  return swaps.reduce(
    (totalFee: BigNumber, step) =>
      totalFee.plus(getUsdFeeOfStep(step, allTokens)),
    ZERO
  );
}

const totalArrivalTime = (
  data: { estimatedTimeInSeconds: number | null }[] | undefined
) => data?.reduce((a, b) => a + (b.estimatedTimeInSeconds ?? 0), 0) || 0;

function numberToString(
  number: BigNumber | string | number | null | undefined,
  minDecimals: number | null = null,
  maxDecimals: number | null = null
): string | undefined {
  if (number === null || number === undefined) {
    return "";
  }
  if (number === "") {
    return "";
  }
  const n = new BigNumber(number);
  const roundingMode = 1;
  let maxI = 1000;
  for (let i = 0; i < 60; i++) {
    if (new BigNumber(n.toFixed(i, roundingMode)).eq(n)) {
      maxI = i;
      break;
    }
  }

  if (n.gte(10000)) {
    return n.toFormat(0, roundingMode);
  }
  if (n.gte(1000)) {
    return n.toFormat(
      Math.min(
        maxI,
        Math.min(maxDecimals || 100, Math.max(minDecimals || 0, 1))
      ),
      roundingMode
    );
  }
  if (n.gte(100)) {
    return n.toFormat(
      Math.min(
        maxI,
        Math.min(maxDecimals || 100, Math.max(minDecimals || 0, 1))
      ),
      roundingMode
    );
  }
  if (n.gte(1)) {
    return n.toFormat(
      Math.min(
        maxI,
        Math.min(maxDecimals || 100, Math.max(minDecimals || 0, 2))
      ),
      roundingMode
    );
  }
  if (n.gte(0.01)) {
    return n.toFormat(
      Math.min(
        maxI,
        Math.min(maxDecimals || 100, Math.max(minDecimals || 0, 4))
      ),
      roundingMode
    );
  }
  for (let i = minDecimals || 4; i < 17; i++) {
    if (n.gte(Math.pow(10, -i))) {
      return n.toFormat(
        Math.min(
          maxI,
          Math.min(maxDecimals || 100, Math.max(minDecimals || 0, i))
        ),
        roundingMode
      );
    }
  }
  if (n.isEqualTo(0)) {
    return "0";
  }
}

export const catchDataFromQuote = (quote: MultiRouteSimulationResult, tokens: Token[]) => {
  const totalTime = roundedSecondsToString(totalArrivalTime(quote?.swaps));
  const totalFee = getTotalFeeInUsd(quote?.swaps ?? [], tokens);
  const fee = numberToString(
    totalFee,
    GAS_FEE_MIN_DECIMALS,
    GAS_FEE_MAX_DECIMALS
  );
  return { totalTime, fee };
}

export function isNetworkStatusInWarningState(
  pendingSwapStep: PendingSwapStep | null
): boolean {
  return (
    !!pendingSwapStep &&
    pendingSwapStep.networkStatus !== null &&
    pendingSwapStep.networkStatus !== PendingSwapNetworkStatus.NetworkChanged
  );
}

export function getSwapMessages(
  pendingSwap: PendingSwap,
  currentStep: PendingSwapStep | null
): {
  shortMessage: string;
  detailedMessage: { content: string; long: boolean };
} {
  const textForRemove = 'bellow button or';
  let message = pendingSwap.extraMessage;
  let detailedMessage = pendingSwap.extraMessageDetail;

  if (pendingSwap.networkStatusExtraMessageDetail?.includes(textForRemove)) {
    pendingSwap.networkStatusExtraMessageDetail =
      pendingSwap.networkStatusExtraMessageDetail.replace(textForRemove, '');
  }

  const networkWarningState = isNetworkStatusInWarningState(currentStep);

  if (networkWarningState) {
    message = pendingSwap.networkStatusExtraMessage || '';
    detailedMessage = pendingSwap.networkStatusExtraMessageDetail || '';
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    switch (currentStep?.networkStatus) {
      case PendingSwapNetworkStatus.WaitingForConnectingWallet:
        message = message || i18n.t('Waiting for connecting wallet');
        break;
      case PendingSwapNetworkStatus.WaitingForQueue:
        message =
          message || i18n.t('Waiting for other running tasks to be finished');
        break;
      case PendingSwapNetworkStatus.WaitingForNetworkChange:
        message = message || i18n.t('Waiting for changing wallet network');
        break;
      default:
        message = message || '';
        break;
    }
  }
  detailedMessage = detailedMessage || '';
  message = message || '';
  const isRpc =
    message?.indexOf('code') !== -1 && message?.indexOf('reason') !== -1;

  return {
    shortMessage: message,
    detailedMessage: { content: detailedMessage, long: isRpc },
  };
}

const daysOfWeek = [
  i18n.t('Sunday'),
  i18n.t('Monday'),
  i18n.t('Tuesday'),
  i18n.t('Wednesday'),
  i18n.t('Thursday'),
  i18n.t('Friday'),
  i18n.t('Saturday'),
];

export function timeSince(millisecond: number) {
  const date = new Date(millisecond);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const isToday = date.getDay() === new Date().getDay();
  const formattedDate = isToday
    ? i18n.t('Today')
    : `${daysOfWeek[date.getDay()]} ${day} ${month} ${year}`;

  return `${formattedDate}, ${new Date(millisecond).toLocaleTimeString()}`;
}

export function getSwapDate(pendingSwap: PendingSwap) {
  const time = pendingSwap.finishTime
    ? timeSince(parseInt(pendingSwap.finishTime))
    : timeSince(parseInt(pendingSwap.creationTime));
  return time;
}

export function getStepState(step: PendingSwapStep): StepDetailsProps['state'] {
  if (
    isNetworkStatusInWarningState(step) &&
    step.status !== 'failed' &&
    step.status !== 'success'
  ) {
    return 'warning';
  }

  switch (step.status) {
    case 'created':
      return 'default';
    case 'approved':
    case 'waitingForApproval':
    case 'running':
      return 'in-progress';
    case 'failed':
      return 'error';
    case 'success':
      return 'completed';
  }
}

export const getPendingSwaps = (manager: Manager | undefined) => {
  const result: PendingSwapWithQueueID[] = [];

  manager?.getAll().forEach((q, id) => {
    const storage = q.list.getStorage() as SwapStorage;

    if (storage?.swapDetails) {
      result.push({
        id,
        swap: storage?.swapDetails,
      });
    }
  });

  return result.sort(
    (a, b) => Number(b.swap.creationTime) - Number(a.swap.creationTime)
  );
};

export function getWalletsForNewSwap(selectedWallets: Wallet[]) {
  const wallets = selectedWallets.reduce(
    (
      selectedWalletsMap: {
        [p: string]: { address: string; walletType: WalletType };
      },
      selectedWallet
    ) => (
      (selectedWalletsMap[selectedWallet.chain] = {
        address: selectedWallet.address,
        walletType: selectedWallet.walletType,
      }),
      selectedWalletsMap
    ),
    {}
  );

  return wallets;
}
