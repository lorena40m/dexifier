import { axiosChainflip } from "@/lib/axios";
import { Asset, ChainflipError, ChainflipQuote, ChainflipSwapRequest, ChainflipSwapResponse, ChainflipSwapStatus, Network } from "../types/chainflip";
import { SwapStatusResponseV2 } from "@chainflip/sdk/swap";
import { AxiosError } from "axios";

export async function getNetworks(): Promise<Network[]> {
  try {
    const response = await axiosChainflip.get("/networks");

    const { networks }: { networks: Network[] } = response.data;

    return networks;
  } catch (error) {
    return [];
  }
}

export async function getAssets(network?: string): Promise<Asset[]> {
  try {
    const endpoint = network ? `/assets/${network}` : "/assets";
    const response = await axiosChainflip.get(endpoint);

    const { assets }: { assets: Asset[] } = response.data;

    return assets;
  } catch (error) {
    return [];
  }
}

export async function createQuotes(params: { sourceAsset: string, destinationAsset: string, amount: string, commissionBps?: number }): Promise<ChainflipQuote[]> {
  try {
    const response = await axiosChainflip.get(
      "/quotes",
      {
        params: params,
      }
    );

    return response.data;
  } catch (error) {
    return [];
  }
}

export async function createSwap(params: ChainflipSwapRequest): Promise<ChainflipSwapResponse> {
  const response = await axiosChainflip.get(
    "/swap",
    {
      params: params,
    }
  );

  return response.data as ChainflipSwapResponse;
}

export async function getSwapStatus(id: number): Promise<ChainflipSwapStatus> {
  const response = await axiosChainflip.get(
    "/status-by-id",
    {
      params: {
        swapId: id,
      },
    }
  );

  return response.data.status as ChainflipSwapStatus;
}
