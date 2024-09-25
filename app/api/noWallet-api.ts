import { axiosNoWalletClient } from "@/lib/axios-client";
import { AxiosResponse } from "axios";
import { CurrencyResponse, RateResponse, TransacionRequest, TransactionData } from "../types/noWalletInterface";

export async function getCurrencies(): Promise<CurrencyResponse> {
  let count: number;
  let remainder: number;
  let currencies: CurrencyResponse;

  const data: AxiosResponse = await axiosNoWalletClient.get(
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

  //     const tempdata: AxiosResponse = await axiosNoWalletClient.get(
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


export async function getRate({ coinFrom, networkFrom, coinTo, networkTo, amount, rateType }: {
  coinFrom: string,
  networkFrom: string,
  coinTo: string,
  networkTo: string,
  amount: string,
  rateType: string
}
): Promise<RateResponse> {
  const data: AxiosResponse = await axiosNoWalletClient.get(
    `/rate?coinFrom=${coinFrom}&coinTo=${coinTo}&networkFrom=${networkFrom}&networkTo=${networkTo}&amount=${amount}&rateType=${rateType}`
  );
  const rateResponse = data.data as RateResponse
  console.log("rateResponse==>", rateResponse);

  return rateResponse;
}

export async function createTransaction(
  transactionRequest:
    TransacionRequest

): Promise<TransactionData> {
  const data: AxiosResponse = await axiosNoWalletClient.post(
    "/transactions", transactionRequest
  );
  const transactionResponse = data.data;

  console.log("transactionResponse==>", transactionResponse)

  return transactionResponse
}

export async function fetchConfirm(
  transactionId: string
): Promise<TransactionData> {
  const data: AxiosResponse = await axiosNoWalletClient.get(
    `/transactions/${transactionId}`
  );
  const confirmResponse = data.data;

  console.log("confirmResponse==>", confirmResponse)

  return confirmResponse
}