import { axiosExolix } from "@/lib/axios-client";
import { AxiosResponse } from "axios";
import { CurrencyResponse, RateRequest, RateResponse, TxRequest, ExTxInfo } from "../types/noWalletInterface";

export async function getCurrencies(): Promise<CurrencyResponse> {
  let count: number;
  let remainder: number;
  let currencies: CurrencyResponse;

  const data: AxiosResponse = await axiosExolix.get(
    "/currencies?page=1&size=100&withNetworks=true"
  );
  const firstCurrencies = data.data as CurrencyResponse;
  currencies = firstCurrencies;

  // if (data.status === 200) {
  //   // Calculate the total number of full pages and the remainder
  //   count = Math.floor(firstCurrencies.count / 100);
  //   remainder = firstCurrencies.count % 100;

  //   // Initialize currencies with the data from the first page
  //   currencies = { ...firstCurrencies, data: [...firstCurrencies.data] };

  //   // Loop through and fetch additional pages
  //   for (let i = 1; i <= count; i++) {
  //     const pageSize = (i === count && remainder > 0) ? remainder : 100; // Handle remainder on the last page

  //     const tempdata: AxiosResponse = await axiosExolix.get(
  //       `/currencies?page=${i + 1}&size=${pageSize}&withNetworks=true`
  //     );

  //     if (tempdata.status === 200) {
  //       const tempCurrencies = tempdata.data as CurrencyResponse;
  //       // Merge the newly fetched data with the previous data
  //       currencies = {
  //         ...currencies,
  //         data: [...currencies.data, ...tempCurrencies.data] // Concatenate data arrays correctly
  //       };
  //     }
  //   }
  // } else {
  //   currencies = firstCurrencies;
  // }

  console.log("currencies==>", currencies);
  return currencies;
}


export async function getRate(
  request: RateRequest
): Promise<RateResponse> {
  const data: AxiosResponse = await axiosExolix.get('/rate', {
    params: request
  });
  const rateResponse = data.data as RateResponse
  return rateResponse;
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