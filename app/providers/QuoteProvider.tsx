'use client'

import { createContext, useContext, ReactNode, SetStateAction, Dispatch, useState } from "react";
import { DepositAddressResponse, Quote, QuoteResponseV2 } from "@chainflip/sdk/swap";

interface QuoteContextType {
  quoteData?: QuoteResponseV2,
  setQuoteData: Dispatch<SetStateAction<QuoteResponseV2 | undefined>>,
  selectedQuote?: Quote,
  setSelectedQuote: Dispatch<SetStateAction<Quote | undefined>>,
  depositData?: DepositAddressResponse,
  setDepositData: Dispatch<SetStateAction<DepositAddressResponse | undefined>>,
}

const QuoteContext: React.Context<QuoteContextType | undefined> = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider = ({ children }: { children: ReactNode }) => {
  const [quoteData, setQuoteData] = useState<QuoteResponseV2>();
  const [selectedQuote, setSelectedQuote] = useState<Quote>();
  const [depositData, setDepositData] = useState<DepositAddressResponse>();

  return (
    <QuoteContext.Provider
      value={{
        quoteData, setQuoteData, selectedQuote, setSelectedQuote, depositData, setDepositData,
      }}
    >
      {children}
    </QuoteContext.Provider>
  )
};

// Custom hook to use the Quote context
export const useQuote = () => {
  const context = useContext(QuoteContext);
  // Throw an error if the hook is used outside of a QuoteProvider
  if (!context) {
    throw new Error("useQuote must be used within a QuoteProvider");
  }
  return context;
};
