import { axiosNoWalletClient } from "@/lib/axios-client";
import { AxiosResponse } from "axios";

export async function getCurrencies(): Promise<CurrencyResponse> {
  const data: AxiosResponse = await axiosNoWalletClient.get(
    "/currencies?page=1&size=100&withNetworks=true"
  );
  const currencies = data.data as CurrencyResponse;
  console.log("currencies==>", currencies);

  return currencies;
}

export async function getRate({ coinFrom, networkFrom, coinTo, networkTo, amount, rateType = "fixed" }: {
  coinFrom: string,
  networkFrom: string,
  coinTo: string,
  networkTo: string,
  amount: string,
  rateType?: string
}
): Promise<RateResponse> {
  const data: AxiosResponse = await axiosNoWalletClient.get(
    `rate?coinFrom=${coinFrom}&coinTo=${coinTo}&networkFrom=${networkFrom}&networkTo=${networkTo}&amount=${amount}&rateType=${rateType}`
  );
  const rateResponse = data.data as RateResponse
  console.log("rateResponse==>", rateResponse);

  return rateResponse;
}