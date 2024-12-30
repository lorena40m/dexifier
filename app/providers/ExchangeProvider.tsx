'use client'

// This file defines a React context for managing the state related to a cryptocurrency exchange process.
// It provides an ExchangeContext, an ExchangeProvider component to wrap the application, 
// and a custom hook (useExchange) to access the context values easily within components.

import { createContext, useContext, ReactNode, useState, SetStateAction, Dispatch, useEffect } from "react";
import { Currency, ExTxInfo, RateResponse } from "../types/exolix";

type Address = string; // Define a type alias for a withdrawal address

// Define the type for the context
interface ExchangeContextType {
  rateData?: RateResponse,                                          // Exchange rate information
  setRateData: Dispatch<SetStateAction<RateResponse | undefined>>,  // Setter for rateData
  txData?: ExTxInfo,                                                // Transaction information
  setTxData: Dispatch<SetStateAction<ExTxInfo | undefined>>,        // Setter for txData
  withdrawalAddress: Address,                                       // User's withdrawal address
  setWithdrawalAddress: Dispatch<SetStateAction<Address>>,          // Setter for withdrawalAddress
  currencyFrom?: Currency,                                          // Selected currency to exchange from
  setCurrencyFrom: Dispatch<SetStateAction<Currency | undefined>>,  // Setter for currencyFrom
  currencyTo?: Currency,                                            // Selected currency to exchange to
  setCurrencyTo: Dispatch<SetStateAction<Currency | undefined>>,    // Setter for currencyTo
}

// Create the context with an initial value
const ExchangeContext: React.Context<ExchangeContextType | undefined> = createContext<ExchangeContextType | undefined>(undefined);

export const ExchangeProvider = ({ children }: { children: ReactNode }) => {
  const [rateData, setRateData] = useState<RateResponse>();
  const [txData, setTxData] = useState<ExTxInfo>();
  const [withdrawalAddress, setWithdrawalAddress] = useState<Address>('');
  const [currencyFrom, setCurrencyFrom] = useState<Currency>();
  const [currencyTo, setCurrencyTo] = useState<Currency>();

  useEffect(() => {
    try {
      const exchange = localStorage.getItem("dexifier/exchange");
      if (exchange) {
        const { currencyFrom, currencyTo, rateData, txData, withdrawalAddress } = JSON.parse(exchange)
        if (currencyFrom) setCurrencyFrom(currencyFrom)
        if (currencyTo) setCurrencyTo(currencyTo)
        if (rateData) setRateData(rateData)
        if (txData) setTxData(txData)
        if (withdrawalAddress) setWithdrawalAddress(withdrawalAddress)
      }
    } catch (error) { }
  }, []);

  useEffect(() => {
    localStorage.setItem("dexifier/exchange", JSON.stringify({
      currencyFrom,
      currencyTo,
      rateData,
      txData,
      withdrawalAddress,
    }));
  }, [currencyFrom, currencyTo, rateData, txData, withdrawalAddress])

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
  // Throw an error if the hook is used outside of the ExchangeProvider
  if (!context) {
    throw new Error("useExchange must be used within a ExchangeProvider");
  }
  return context;
};
