import { type ClassValue, clsx } from "clsx";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const toastDetails = {
  autoClose: 3000,
  pauseOnHover: true,
  theme: "dark",
};
export const toastSuccess = (text: string) => toast.success(text, toastDetails);

export const toastError = (text: string) => toast.error(text, toastDetails);

import { SwapSDK } from "@chainflip/sdk/swap";

const options = {
  network: "mainnet",
  backendUrl: "https://chainflip-swap.chainflip.io",
  // network: "perseverance", // Testnet
  // backendUrl: "https://perseverance.chainflip-swap.chainflip.io",
  broker: {
    url: `https://chainflip-broker.io/rpc/${process.env.NEXT_PUBLIC_CHAINFLIP_API_KEY}`,
    commissionBps: 0, // basis points, i.e. 100 = 1%
  },
};

export const swapSDK = new SwapSDK(options as any);