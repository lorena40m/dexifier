import { axiosExolix } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { RateRequest, RateResponse, TxRequest, ExTxInfo, Currency, CurrencyResponse, Network } from "../types/exolix";

export async function getCurrencies(search: string, page: number = 1): Promise<Currency[]> {
  try {
    const response = await axiosExolix.get(`/currencies?&withNetworks=true&page=${page}&search=${search}`);

    const { data, count }: { data: CurrencyResponse[], count: number } = response.data;

    const currencies: Currency[] = [];
    data.forEach((currency: CurrencyResponse) => {
      const { networks, ...currencyMeta } = currency;
      currency.networks.forEach((network: Network) => {
        currencies.push({
          ...currencyMeta,
          network,
        })
      })
    })

    return currencies;
  } catch (error) {
    return [];
  }
}

export async function getRate(
  request: RateRequest
): Promise<RateResponse | undefined> {
  return axiosExolix.get('/rate', {
    params: request
  }).then(response => {
    return response.data as RateResponse
  }).catch(error => {
    if (error.response.data.message) {
      return error.response.data as RateResponse
    }
  });
}

export async function createTransaction(
  request: TxRequest
): Promise<ExTxInfo> {
  const data: AxiosResponse = await axiosExolix.post('/transactions', request);
  const transactionResponse = data.data as ExTxInfo;
  return transactionResponse;
}

export async function getTxInfo(
  txId: string
): Promise<ExTxInfo> {
  const data: AxiosResponse = await axiosExolix.get(`/transactions/${txId}`);
  const confirmResponse = data.data as ExTxInfo;
  return confirmResponse
}