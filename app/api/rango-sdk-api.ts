import { RangoClient } from "rango-sdk";

let rango: RangoClient | undefined = undefined;

const DEFAULT_API_KEY = "c6381a79-2817-4602-83bf-6a641a409e32";

export const httpService = () => {
  if (rango) {
    return rango;
  }
  rango = new RangoClient(
    process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC || DEFAULT_API_KEY, 
    process.env.NEXT_PUBLIC_RANGO_API_URL);
  return rango;
};
