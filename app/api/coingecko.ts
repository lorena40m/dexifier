import { axiosCoingecko } from "@/lib/axios";
import { Chain } from "../types/coingecko";

export async function getChainList(): Promise<Chain[]> {
  try {
    const response = await axiosCoingecko.get(`/asset_platforms`);

    return response.data as Chain[];
  } catch (error) {
    return []
  }
}
