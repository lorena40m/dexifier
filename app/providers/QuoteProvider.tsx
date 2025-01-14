'use client'

import { createContext, useContext, ReactNode, SetStateAction, Dispatch, useState, useRef, useEffect } from "react";
import { AssetData, Quote, QuoteResponseV2, SwapStatusResponseV2 } from "@chainflip/sdk/swap";
import { swapSDK } from "@/lib/utils";
import { DepositAddressResponseV2 } from "../types/chainflip";

interface QuoteContextType {
  srcAsset?: AssetData,
  setSrcAsset: Dispatch<SetStateAction<AssetData | undefined>>,
  destAsset?: AssetData,
  setDestAsset: Dispatch<SetStateAction<AssetData | undefined>>,
  quoteData?: QuoteResponseV2,
  setQuoteData: Dispatch<SetStateAction<QuoteResponseV2 | undefined>>,
  selectedQuote?: Quote,
  setSelectedQuote: Dispatch<SetStateAction<Quote | undefined>>,
  depositResponse?: DepositAddressResponseV2,
  setDepositResponse: Dispatch<SetStateAction<DepositAddressResponseV2 | undefined>>,
  depositData?: SwapStatusResponseV2,
  setDepositData: Dispatch<SetStateAction<SwapStatusResponseV2 | undefined>>,
  initializeQuote: () => void,
}

const QuoteContext: React.Context<QuoteContextType | undefined> = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider = ({ children }: { children: ReactNode }) => {
  const [quoteData, setQuoteData] = useState<QuoteResponseV2>();
  const [selectedQuote, setSelectedQuote] = useState<Quote>();
  const [depositData, setDepositData] = useState<SwapStatusResponseV2>();
  const [depositResponse, setDepositResponse] = useState<DepositAddressResponseV2>();
  const [srcAsset, setSrcAsset] = useState<AssetData>();
  const [destAsset, setDestAsset] = useState<AssetData>();
  const confirmIntervalRef = useRef<NodeJS.Timeout>();
  
  const initializeQuote = () => {
    setSelectedQuote(undefined)
    setDepositResponse(undefined)
    setDepositData(undefined)
  }

  const stopConfirming = () => {
    clearInterval(confirmIntervalRef.current);
    confirmIntervalRef.current = undefined;
  }

  useEffect(() => {
    if (depositResponse) {
      // Clear any existing interval before starting a new one
      stopConfirming();

      confirmIntervalRef.current = setInterval(async () => {
        try {
          const statusData = await swapSDK.getStatusV2({
            id: depositResponse.depositChannelId
          });
          setDepositData(statusData);
          if (statusData.state === "COMPLETED" || statusData.state === "FAILED") {
            stopConfirming();
          }
        } catch (error) { }
      }, 10000); // Poll every 10 seconds (adjust as needed)
    } else {
      stopConfirming();
    }
  }, [depositResponse])

  return (
    <QuoteContext.Provider
      value={{
        quoteData, setQuoteData, selectedQuote, setSelectedQuote, depositData, setDepositData, srcAsset, setSrcAsset, destAsset, setDestAsset, depositResponse, setDepositResponse, initializeQuote,
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
