import { axiosNoWalletClient } from "@/lib/axios-client";
import { AxiosResponse } from "axios";
import { CurrencyResponse, RateResponse, TransacionRequest, TransactionData } from "../types/noWalletInterface";

export async function getCurrencies(): Promise<CurrencyResponse> {
  try {
    // Fetch the first page of currencies
    const { data } = await axiosNoWalletClient.get("/currencies?page=1&size=100&withNetworks=true");

    // Calculate the total number of pages and remainder
    const { count, data: initialData } = data as CurrencyResponse;
    const totalPages = Math.ceil(count / 100);

    // Fetch remaining pages if any
    const pagePromises = Array.from({ length: totalPages - 1 }, (_, pageIndex) =>
      axiosNoWalletClient.get(`/currencies?page=${pageIndex + 2}&size=100&withNetworks=true`)
    );

    const pageResponses = await Promise.all(pagePromises);

    // Merge data from all pages into the final result
    const allCurrenciesData = pageResponses.reduce((acc, response) => {
      if (response.status === 200) {
        const { data } = response.data as CurrencyResponse;
        acc.push(...data);
      }
      return acc;
    }, initialData);

    return { count: count, data: allCurrenciesData };
  } catch (error) {
    return { count: 0, data: [] };
  }
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
  const transactionResponse = data.data as TransactionData;

  console.log("transactionResponse==>", transactionResponse)

  return transactionResponse
}

export async function fetchConfirm(
  transactionId: string
): Promise<TransactionData> {
  const data: AxiosResponse = await axiosNoWalletClient.get(
    `/transactions/${transactionId}`
  );
  const confirmResponse = data.data as TransactionData;

  console.log("confirmResponse==>", confirmResponse)

  return confirmResponse
}