'use client'

import { createContext, useContext, ReactNode, SetStateAction, Dispatch, useState } from "react";
import { AssetData, DepositAddressResponse, Quote, QuoteResponseV2, SwapStatusResponseV2 } from "@chainflip/sdk/swap";

interface QuoteContextType {
  srcAsset?: AssetData,
  setSrcAsset: Dispatch<SetStateAction<AssetData | undefined>>,
  destAsset?: AssetData,
  setDestAsset: Dispatch<SetStateAction<AssetData | undefined>>,
  quoteData?: QuoteResponseV2,
  setQuoteData: Dispatch<SetStateAction<QuoteResponseV2 | undefined>>,
  selectedQuote?: Quote,
  setSelectedQuote: Dispatch<SetStateAction<Quote | undefined>>,
  depositData?: SwapStatusResponseV2,
  setDepositData: Dispatch<SetStateAction<SwapStatusResponseV2 | undefined>>,
}

const QuoteContext: React.Context<QuoteContextType | undefined> = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider = ({ children }: { children: ReactNode }) => {
  const [quoteData, setQuoteData] = useState<QuoteResponseV2>();
  const [selectedQuote, setSelectedQuote] = useState<Quote>();
  const [depositData, setDepositData] = useState<SwapStatusResponseV2>();
  const [srcAsset, setSrcAsset] = useState<AssetData>();
  const [destAsset, setDestAsset] = useState<AssetData>();

  return (
    <QuoteContext.Provider
      value={{
        quoteData, setQuoteData, selectedQuote, setSelectedQuote, depositData, setDepositData, srcAsset, setSrcAsset, destAsset, setDestAsset,
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
