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
