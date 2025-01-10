import axios from "axios";
import { DiagnosticMessage } from "../types/rango";
import { DepositAddressRequest, DepositAddressRequestV2, DepositAddressResponse, QuoteRequest, QuoteResponseV2 } from "@chainflip/sdk/swap";
import { swapSDK } from "@/lib/utils";

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

export async function getQuoteV2(
  request: QuoteRequest
): Promise<QuoteResponseV2> {
  try {
    const quoteResponse = await swapSDK.getQuoteV2(request)

    return quoteResponse;
  } catch (error: unknown) {
    throw handleError(error);
  }
}

export async function requestDepositAddress(
  request: DepositAddressRequestV2
): Promise<any> {
  try {
    const depositAddressResponse = await swapSDK.requestDepositAddressV2(request)

    return depositAddressResponse;
  } catch (error: unknown) {
    throw handleError(error);
  }
}