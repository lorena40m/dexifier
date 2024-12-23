import { axiosRango } from "@/lib/axios";
import {
  DiagnosticMessage,
} from "../types/interface";
import axios, { AxiosResponse } from "axios";
import {
  BlockchainMeta,
  Token,
  CompactToken,
  SwapperMeta,
  CheckApprovalResponse,
  WalletDetailsResponse,
  TokenBalanceRequest,
  TokenBalanceResponse,
  CheckTxStatusRequest,
  TransactionStatusResponse,
  ConfirmRouteRequest,
  ConfirmRouteResponse,
  CreateTransactionRequest,
  CreateTransactionResponse,
  BestRouteRequest,
  BestRouteResponse,
  MultiRouteRequest,
  MultiRouteResponse,
  WalletDetail,
  Asset,
} from "rango-types/mainApi";
import {
  SwapRequest,
  SwapResponse,
} from "rango-types/basicApi";
import { toastError } from "@/lib/utils";

export async function getBlockchains(): Promise<BlockchainMeta[]> {
  const response: AxiosResponse = await axiosRango.get('/meta/blockchains');
  const blockchains = response.data as BlockchainMeta[];
  return blockchains && blockchains.filter((blockchain) =>
    blockchain.enabled && blockchain.name !== "BOBA_BNB"
  );
}

export async function getBlockchainTokens(blockchain: string): Promise<Token[]> {
  const response: AxiosResponse = await axiosRango.get('/meta', {
    params: {
      blockchains: blockchain
    }
  });
  const { tokens }: { tokens: Token[] } = response.data;
  return tokens;
}

export async function getAllTokens(): Promise<Token[]> {
  const response: AxiosResponse = await axiosRango.get('/meta');
  const { tokens }: { tokens: Token[] } = response.data;
  return tokens;
}

export async function getCompactBlockchainTokens(): Promise<Token[]> {
  const response: AxiosResponse = await axiosRango.get('/meta/compact');
  const { tokens: compactTokens }: { tokens: CompactToken[] } = response.data;
  const tokens: Token[] = compactTokens && compactTokens.map((tm) => ({
    blockchain: tm.b,
    address: tm.a || null,
    symbol: tm.s,
    name: tm.n || null,
    decimals: tm.d,
    image: tm.i,
    usdPrice: tm.p || null,
    isSecondaryCoin: tm.is || false,
    coinSource: tm.c || null,
    coinSourceUrl: tm.cu || null,
    isPopular: tm.ip || false,
    supportedSwappers: tm.ss,
  }))
  return tokens;
}

export async function getBridges(): Promise<SwapperMeta[]> {
  const response: AxiosResponse = await axiosRango.get("/meta/swappers");
  const swappers = response.data as SwapperMeta[];
  const bridges = swappers.filter((swapper) =>
    swapper.types.includes("BRIDGE")
  );
  return bridges;
}

export async function getExchanges(): Promise<SwapperMeta[]> {
  const response: AxiosResponse = await axiosRango.get("/meta/swappers");
  const swappers = response.data as SwapperMeta[];
  const exchanges = swappers.filter((swapper) =>
    swapper.types.includes("DEX")
  );
  return exchanges;
}

export async function getTokenBalance(
  request: TokenBalanceRequest
): Promise<TokenBalanceResponse> {
  const response: AxiosResponse = await axiosRango.get('wallets/token-balance', {
    params: request
  });
  const tokenBalance = response.data as TokenBalanceResponse;
  return tokenBalance;
}

export async function getWalletBalance(
  walletAddresses: string[],
): Promise<WalletDetail[]> {
  const response: AxiosResponse = await axiosRango.get('wallets/details', {
    params: {
      address: walletAddresses
    }
  });
  const { wallets }: { wallets: WalletDetail[] } = response.data;
  return wallets;
}

export async function getTokenData(
  asset: Asset
): Promise<Token> {
  const response: AxiosResponse = await axiosRango.get('meta/custom-token', {
    params: asset
  });
  const { token }: { token: Token } = response.data;
  return token;
}

function handleError(error: unknown): string {
  const defaultError: DiagnosticMessage = {
    status: "error",
    message: "An unknown error occurred",
  };

  // Check if the error is an instance of Error
  if (error instanceof Error) {
    defaultError.message = error.message;

    // Check if the error is an Axios error and has response data
    if (axios.isAxiosError(error) && error.response?.data) {
      const { message, actionUrl } = error.response.data;
      defaultError.message = message || defaultError.message;

      if (actionUrl) {
        defaultError.actionUrl = actionUrl;
      }
    }
  }

  return defaultError.message;
}

export async function getBestMultiRoutes(
  request: MultiRouteRequest
): Promise<MultiRouteResponse> {
  try {
    const response: AxiosResponse = await axiosRango.post('routing/bests', request);
    const multiRouteResponse = response.data as MultiRouteResponse;

    if (multiRouteResponse.results.length === 0) {
      throw new Error("No routes found")
    }

    return multiRouteResponse;
  } catch (error: unknown) {
    throw handleError(error);
  }
}

export async function createSwap(
  request: SwapRequest
): Promise<SwapResponse> {
  try {
    const response: AxiosResponse = await axiosRango.get('basic/swap', {
      params: request
    });

    const swapResponse = response.data as SwapResponse;

    if (swapResponse.resultType !== "OK") {
      throw new Error(swapResponse.error || "An unknown error occurred");
    }

    return swapResponse;
  } catch (error: unknown) {
    throw handleError(error);
  }
}

export async function createTransaction(
  request: CreateTransactionRequest,
): Promise<CreateTransactionResponse> {
  try {
    const response: AxiosResponse = await axiosRango.post('tx/create', request);

    const txResponse = response.data as CreateTransactionResponse;

    if (!txResponse.ok) {
      throw new Error(txResponse.error || "An unknown error occurred");
    }

    return txResponse;
  } catch (error: unknown) {
    throw handleError(error);
  }
}

export async function checkApproval(
  requestId: string,
  txId?: string,
): Promise<CheckApprovalResponse> {
  try {
    const response: AxiosResponse = await axiosRango.get(`tx/${requestId}/check-approval`, {
      params: { txId }
    });

    const approvalResponse = response.data as CheckApprovalResponse;

    return approvalResponse;
  } catch (error: unknown) {
    throw handleError(error);
  }
}

export async function checkTxStatus(
  request: CheckTxStatusRequest,
): Promise<TransactionStatusResponse> {
  try {
    const response: AxiosResponse = await axiosRango.post('tx/check-status', request);

    const checkTxStatusResponse = response.data as TransactionStatusResponse;

    if (checkTxStatusResponse.status === null) {
      throw new Error("An unknown error occurred");
    }

    return checkTxStatusResponse;
  } catch (error: unknown) {
    throw handleError(error);
  }
}

export async function confirmRoute(
  request: ConfirmRouteRequest
): Promise<ConfirmRouteResponse> {
  try {
    const response: AxiosResponse = await axiosRango.post('routing/confirm', request);

    const confirmRouteResponse = response.data as ConfirmRouteResponse;

    return confirmRouteResponse;
  } catch (error: unknown) {
    throw handleError(error);
  }
}
