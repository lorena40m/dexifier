import { type ClassValue, clsx } from "clsx";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { SwapSDK } from "@chainflip/sdk/swap";
import { RangoClient } from "rango-sdk";

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

export const rangoSDK = new RangoClient("30a7dc74-0886-4c5d-bc18-dc04e6280a96")