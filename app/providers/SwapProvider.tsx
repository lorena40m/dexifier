'use client'

import { createContext, useContext, ReactNode, SetStateAction, Dispatch, useState } from "react";
import { ConfirmRouteResponse, MultiRouteResponse, MultiRouteSimulationResult, Token } from "rango-types/mainApi"
import { Settings } from "../types/rango";

// Define the type for the context
interface SwapContextType {
  tokenFrom?: Token,
  setTokenFrom: Dispatch<SetStateAction<Token | undefined>>,
  tokenTo?: Token,
  setTokenTo: Dispatch<SetStateAction<Token | undefined>>,
  routeData?: MultiRouteResponse,
  setRouteData: Dispatch<SetStateAction<MultiRouteResponse | undefined>>,
  selectedRoute?: MultiRouteSimulationResult,
  setSelectedRoute: Dispatch<SetStateAction<MultiRouteSimulationResult | undefined>>,
  confirmData?: ConfirmRouteResponse,
  setConfirmData: Dispatch<SetStateAction<ConfirmRouteResponse | undefined>>,
  settings: Settings,
  setSettings: Dispatch<SetStateAction<Settings>>,
}

// Create the context with an initial value
const SwapContext: React.Context<SwapContextType | undefined> = createContext<SwapContextType | undefined>(undefined);

const DEFAULT_SETTINS: Settings = {
  slippage: '1',
  swappers: [],
  infiniteApproval: false,
}

export const SwapProvider = ({ children }: { children: ReactNode }) => {
  const [tokenFrom, setTokenFrom] = useState<Token>();
  const [tokenTo, setTokenTo] = useState<Token>();
  const [routeData, setRouteData] = useState<MultiRouteResponse>();
  const [selectedRoute, setSelectedRoute] = useState<MultiRouteSimulationResult>();
  const [confirmData, setConfirmData] = useState<ConfirmRouteResponse>();
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINS);

  return (
    <SwapContext.Provider
      value={{
        tokenFrom, setTokenFrom, tokenTo, setTokenTo, routeData, setRouteData, selectedRoute, setSelectedRoute, confirmData, setConfirmData, settings, setSettings,
      }}
    >
      {children}
    </SwapContext.Provider>
  )
};

// Custom hook to use the Swap context
export const useSwap = () => {
  const context = useContext(SwapContext);
  if (!context) {
    throw new Error("useSwap must be used within a SwapProvider");
  }
  return context;
};
