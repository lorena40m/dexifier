import { axiosBrowserClient } from "@/lib/axios-client";
import { reformatTokens } from "./api-utils";
import {
  Bridge,
  Token,
  Exchange,
  BestRoutesResponse,
  DiagnosticMessage,
  RouteData,
  TxSwapRequest,
  TxSwapResponse,
  TokenBalance,
  walletAssetsBalance,
} from "../types/interface";
import axios, { AxiosResponse } from "axios";
import { BestRouteResponse, BlockchainMeta, CheckApprovalResponse, CheckTxStatusRequest, ConfirmRouteRequest, ConfirmRouteResponse, CreateTransactionRequest, CreateTransactionResponse, ReportTransactionRequest, TransactionStatusResponse } from "rango-types/mainApi";
import { RequestOptions } from "rango-sdk/lib/types";

export async function getBlockchains(): Promise<BlockchainMeta[]> {
  const data: AxiosResponse = await axiosBrowserClient.get(
    "/meta/blockchains?apiKey=" + process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC
  );
  const blockchains = data.data as BlockchainMeta[];
  return blockchains;
}
export async function getBlockchainTokens(blockchainName: string) {
  const data: AxiosResponse = await axiosBrowserClient.get(
    `/meta?blockchains=${blockchainName}&apiKey=` +
    process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC
  );
  const tokens = data.data.tokens as Token[];
  return tokens;
}

export async function getCompactBlockchainTokens() {
  const data: AxiosResponse = await axiosBrowserClient.get(
    `/meta/compact?apiKey=` + process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC
  );
  const tokens = reformatTokens(data.data.tokens) as Token[];
  return tokens;
}

export async function getBridges(): Promise<Bridge[]> {
  const response: AxiosResponse = await axiosBrowserClient.get(
    "/meta/swappers?apiKey=" + process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC
  );
  const swappers = response.data as Bridge[];
  const bridges = swappers.filter((swapper) =>
    swapper.types.includes("BRIDGE")
  );
  return bridges;
}

export async function getExchanges(): Promise<Exchange[]> {
  const response: AxiosResponse = await axiosBrowserClient.get(
    "/meta/swappers?apiKey=" + process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC
  );
  const swappers = response.data as Exchange[];
  const exchanges = swappers.filter((swapper) => swapper.types.includes("DEX"));
  return exchanges;
}

export async function getBananceOfToken(
  address: string,
  blockchain: string,
  symbol: string,
  tokenAddress: string | null
): Promise<TokenBalance> {
  console.log(address, "|", blockchain, "|", symbol, "|", tokenAddress);
  const response: AxiosResponse = await axiosBrowserClient.get(
    `wallets/token-balance?walletAddress=${address}&blockchain=${blockchain}&symbol=${symbol}${tokenAddress === null ? "" : "&address=" + tokenAddress
    }&apiKey=${process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC}`
  );
  const tokenBalanceData = response.data;
  console.log("tokenBalanceData", tokenBalanceData);
  return tokenBalanceData;
}

export async function getBananceOfWallet(
  addressWithBlockchian: string[],
): Promise<walletAssetsBalance[]> {
  let requestQuery;
  if (addressWithBlockchian.length !== 0) {
    requestQuery = addressWithBlockchian.map((address, index) => {
      if (index === 0) {
        return `address=${address}`
      } else {
        return `&address=${address}`
      }
    }).join('');
  }
  const response: AxiosResponse = await axiosBrowserClient.get(
    `wallets/details?${requestQuery}&apiKey=${process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC}`
  );
  const walletBalanceData = response.data.wallets;
  console.log("walletBalanceData", walletBalanceData);
  return walletBalanceData;
}

export async function getBestRoutes(
  data: RouteData
): Promise<BestRoutesResponse> {
  try {
    const response: AxiosResponse = await axiosBrowserClient.post(
      `https://api.rango.exchange/routing/bests?apiKey=${process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC}`,
      data
    );
    const bestRoutesResponse = response.data as BestRoutesResponse;

    // Validate the results data
    if (
      !bestRoutesResponse.results ||
      bestRoutesResponse.results.length === 0
    ) {
      throw new Error("No routes found");
    }
    console.log("bestRoutesResponse", bestRoutesResponse);
    return bestRoutesResponse;
  } catch (error: unknown) {
    let diagnosticMessage: DiagnosticMessage = {
      status: "error",
      message: "An unknown error occurred",
    };

    if (error instanceof Error) {
      diagnosticMessage.message = error.message;

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        diagnosticMessage.message = error.response.data.message;
        if (error.response.data.actionUrl) {
          diagnosticMessage.actionUrl = error.response.data.actionUrl;
        }
      }
    }

    console.error("Error fetching best routes:", diagnosticMessage);
    throw diagnosticMessage;
  }
}

export async function createTransaction(
  params: TxSwapRequest
): Promise<TxSwapResponse> {
  try {
    const response: AxiosResponse = await axiosBrowserClient.get(
      `https://api.rango.exchange/basic/swap?from=${params.from}&to=${params.to}&amount=${params.amount}&slippage=${params.slippage}&fromAddress=${params.fromAddress}&toAddress=${params.toAddress}&apiKey=${process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC}`
    );

    const swapResponse = response.data as TxSwapResponse;

    if (swapResponse.resultType != "OK") {
      console.log(swapResponse);

      throw new Error(swapResponse.error || "Unknown error occurred");
    }

    return swapResponse;
  } catch (error: unknown) {
    let diagnosticMessage: DiagnosticMessage = {
      status: "error",
      message: "An unknown error occurred",
    };

    if (error instanceof Error) {
      diagnosticMessage.message = error.message;

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        diagnosticMessage.message = error.response.data.message;
        if (error.response.data.actionUrl) {
          diagnosticMessage.actionUrl = error.response.data.actionUrl;
        }
      }
    }

    console.error("Error creating swap transaction:", diagnosticMessage);
    throw diagnosticMessage;
  }
}

export async function createMultiStepTransaction(
  requestBody: CreateTransactionRequest,
  options?: RequestOptions
): Promise<CreateTransactionResponse> {
  try {
    const response: AxiosResponse = await axiosBrowserClient.post(
      `https://api.rango.exchange/tx/create?&apiKey=${process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC}`,
      requestBody,
      { ...options }
    );

    const swapResponse = response.data as CreateTransactionResponse;

    if (!swapResponse.ok) {
      console.log(swapResponse);

      throw new Error(swapResponse.error || "Unknown error occurred");
    }
    return swapResponse;
  } catch (error: unknown) {
    let diagnosticMessage: DiagnosticMessage = {
      status: "error",
      message: "An unknown error occurred",
    };

    if (error instanceof Error) {
      diagnosticMessage.message = error.message;

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        diagnosticMessage.message = error.response.data.message;
        if (error.response.data.actionUrl) {
          diagnosticMessage.actionUrl = error.response.data.actionUrl;
        }
      }
    }

    console.error("Error creating swap transaction:", diagnosticMessage);
    throw diagnosticMessage;
  }
}

export async function checkApproval(
  requestId: string,
  txId?: string,
  options?: RequestOptions
): Promise<CheckApprovalResponse> {
  try {
    const response: AxiosResponse = await axiosBrowserClient.get(
      `https://api.rango.exchange/tx/${requestId}/check-approval?&apiKey=${process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC}`,
      { params: { txId }, ...options },
    );

    const approvalResponse = response.data as CheckApprovalResponse;

    return approvalResponse;
  } catch (error: unknown) {
    let diagnosticMessage: DiagnosticMessage = {
      status: "error",
      message: "An unknown error occurred",
    };

    if (error instanceof Error) {
      diagnosticMessage.message = error.message;

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        diagnosticMessage.message = error.response.data.message;
        if (error.response.data.actionUrl) {
          diagnosticMessage.actionUrl = error.response.data.actionUrl;
        }
      }
    }

    console.error("Error creating swap transaction:", diagnosticMessage);
    throw diagnosticMessage;
  }
}

export async function checkStatus(
  requestBody: CheckTxStatusRequest,
  options?: RequestOptions
): Promise<TransactionStatusResponse> {
  try {
    const response: AxiosResponse = await axiosBrowserClient.post(
      `https://api.rango.exchange/tx/check-status?&apiKey=${process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC}`,
      requestBody,
      { ...options }
    );

    const checkStatusResponse = response.data as TransactionStatusResponse;

    if (checkStatusResponse.status === null) {
      console.log(checkStatusResponse);

      throw new Error("Unknown error occurred");
    }
    return checkStatusResponse;
  } catch (error: unknown) {
    let diagnosticMessage: DiagnosticMessage = {
      status: "error",
      message: "An unknown error occurred",
    };

    if (error instanceof Error) {
      diagnosticMessage.message = error.message;

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        diagnosticMessage.message = error.response.data.message;
        if (error.response.data.actionUrl) {
          diagnosticMessage.actionUrl = error.response.data.actionUrl;
        }
      }
    }

    console.error("Error creating swap transaction:", diagnosticMessage);
    throw diagnosticMessage;
  }
}

export async function reportFailure(
  requestBody: ReportTransactionRequest,
  options?: RequestOptions
): Promise<void> {
  try {
    await axiosBrowserClient.post(
      `https://api.rango.exchange/tx/report-tx?&apiKey=${process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC}`,
      requestBody,
      { ...options }
    );
  } catch (err: unknown) {
    console.log("err", err);
  }
}

export async function confirmRoute(
  data: ConfirmRouteRequest
): Promise<ConfirmRouteResponse> {
  try {
    const response: AxiosResponse = await axiosBrowserClient.post(
      `https://api.rango.exchange/routing/confirm?apiKey=${process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC}`,
      data
    );
    const confirmRouteResponse = response.data as ConfirmRouteResponse;
    if (confirmRouteResponse.ok === false) {
      throw new Error(confirmRouteResponse.error || "Error while confirm wallet");
    }
    console.log("confirmRouteResponse", confirmRouteResponse);
    return confirmRouteResponse;
  } catch (err: unknown) {
    console.log("err", err);
    return {
      ok: false,
      result: null,
      error: err instanceof Error ? err.message : 'Unknown error',
      errorCode: null,
      traceId: null,
    };
  }
}
