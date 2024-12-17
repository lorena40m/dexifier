'use client'

import { createContext, useContext, ReactNode, useState, SetStateAction, Dispatch } from "react";
import { Currency, ExTxInfo, RateResponse } from "../types/exolix";

type Address = string;

// Define the type for the context
interface ExchangeContextType {
  rateData?: RateResponse,
  setRateData: Dispatch<SetStateAction<RateResponse | undefined>>,
  txData?: ExTxInfo,
  setTxData: Dispatch<SetStateAction<ExTxInfo | undefined>>,
  withdrawalAddress: Address,
  setWithdrawalAddress: Dispatch<SetStateAction<Address>>,
  currencyFrom?: Currency,
  setCurrencyFrom: Dispatch<SetStateAction<Currency | undefined>>,
  currencyTo?: Currency,
  setCurrencyTo: Dispatch<SetStateAction<Currency | undefined>>,
}

// Create the context with an initial value
const ExchangeContext: React.Context<ExchangeContextType | undefined> = createContext<ExchangeContextType | undefined>(undefined);

export const ExchangeProvider = ({ children }: { children: ReactNode }) => {
  const [rateData, setRateData] = useState<RateResponse>();
  const [txData, setTxData] = useState<ExTxInfo>();
  const [withdrawalAddress, setWithdrawalAddress] = useState<Address>('');
  const [currencyFrom, setCurrencyFrom] = useState<Currency>();
  const [currencyTo, setCurrencyTo] = useState<Currency>();

  return (
    <ExchangeContext.Provider
      value={{
        rateData, setRateData, txData, setTxData, withdrawalAddress, setWithdrawalAddress, currencyFrom, setCurrencyFrom, currencyTo, setCurrencyTo,
      }}
    >
      {children}
    </ExchangeContext.Provider>
  )
};

// Custom hook to use the Exchange context
export const useExchange = () => {
  const context = useContext(ExchangeContext);
  if (!context) {
    throw new Error("useExchange must be used within a ExchangeProvider");
  }
  return context;
};
