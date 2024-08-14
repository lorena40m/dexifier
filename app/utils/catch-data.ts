import { useAppSelector } from "@/redux_slice/provider";
import { getCompactBlockchainTokens } from "../api/rango-api";
import {
  NewPreferenceType,
  PreferenceType,
  Result,
  Token,
} from "../types/interface";
import BigNumber from "bignumber.js";

const ZERO = new BigNumber(0);
const GAS_FEE_MIN_DECIMALS = 2;
const GAS_FEE_MAX_DECIMALS = 2;

const roundedSecondsToString = (s: number): string => {
  const seconds = Math.floor((s % 60) / 15) * 15;
  const minutes = parseInt((s / 60).toString());
  if (minutes >= 60) {
    return `${Math.floor(minutes / 5) * 5}:00`;
  }
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const totalArrivalTime = (
  data: { estimatedTimeInSeconds: number | null }[] | undefined
) => data?.reduce((a, b) => a + (b.estimatedTimeInSeconds ?? 0), 0) || 0;

function getTotalFeeInUsd(swaps: any[], allTokens: Token[]): BigNumber {
  return swaps.reduce(
    (totalFee: BigNumber, step) =>
      totalFee.plus(getUsdFeeOfStep(step, allTokens)),
    ZERO
  );
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

function getUsdFeeOfStep(step: Result, allTokens: Token[]): BigNumber {
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

export const catchDataFromQuote = (quote: Result, tokens: Token[]) => {
  const totalTime = roundedSecondsToString(totalArrivalTime(quote?.swaps));
  const totalFee = getTotalFeeInUsd(quote?.swaps ?? [], tokens);
  const fee = numberToString(
    totalFee,
    GAS_FEE_MIN_DECIMALS,
    GAS_FEE_MAX_DECIMALS
  );
  return { totalTime, fee };
};

export const sortQuotesBy = (
  strategy: PreferenceType,
  quotes: Result[]
): Result[] => {
  return [...quotes].sort((quote1, quote2) => {
    const getScore = (route: Result, strategy: string) =>
      route.scores?.find((score) => score.preferenceType === strategy)?.score ??
      0;

    let quote1Score = getScore(quote1, strategy);
    let quote2Score = getScore(quote2, strategy);

    if (strategy === "RECOMMENDED") {
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
};

export const customStrategy = (strategy: NewPreferenceType): PreferenceType => {
  switch (strategy) {
    case "Fastest":
      return "SPEED";
    case "Cheapest":
      return "FEE";
    case "Smart":
      return "SMART";
    case "Recommended":
      return "RECOMMENDED";
    default:
      return "PRICE";
  }
};
