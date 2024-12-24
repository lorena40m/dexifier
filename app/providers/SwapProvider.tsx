'use client'

// This file defines a React context for managing state related to a token swap page.
// It includes a SwapContext and a SwapProvider component to wrap swapp page and 
// make the state accessible through the React Context API. Additionally, a custom hook
// (useSwap) is provided for easier consumption of the context in components.

import { createContext, useContext, ReactNode, SetStateAction, Dispatch, useState } from "react";
import { ConfirmRouteResponse, MultiRouteResponse, MultiRouteSimulationResult, Token } from "rango-types/mainApi"
import { Settings } from "../types/rango";

// Define the type for the context
interface SwapContextType {
  tokenFrom?: Token,                                                                  // The token being swapped from
  setTokenFrom: Dispatch<SetStateAction<Token | undefined>>,                          // Setter for tokenFrom
  tokenTo?: Token,                                                                    // The token being swapped to
  setTokenTo: Dispatch<SetStateAction<Token | undefined>>,                            // Setter for tokenTo
  routeData?: MultiRouteResponse,                                                     // Data for available swap routes
  setRouteData: Dispatch<SetStateAction<MultiRouteResponse | undefined>>,             // Setter for routeData
  selectedRoute?: MultiRouteSimulationResult,                                         // The currently selected swap route
  setSelectedRoute: Dispatch<SetStateAction<MultiRouteSimulationResult | undefined>>, // Setter for selectedRoute
  confirmData?: ConfirmRouteResponse,                                                 // Confirmation data for a swap route
  setConfirmData: Dispatch<SetStateAction<ConfirmRouteResponse | undefined>>,         // Setter for confirmData
  settings: Settings,                                                                 // Settings for the swap (e.g., slippage, infinite approval)
  setSettings: Dispatch<SetStateAction<Settings>>,                                    // Setter for settings
}

// Create the context with an initial value
const SwapContext: React.Context<SwapContextType | undefined> = createContext<SwapContextType | undefined>(undefined);

// Define default settings for the swap
const DEFAULT_SETTINS: Settings = {
  slippage: '1',           // Default slippage value for transactions
  swappers: [],            // Array of available swap providers
  infiniteApproval: false, // Indicates whether infinite approval is enabled
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
  // Throw an error if the hook is used outside of a SwapProvider
  if (!context) {
    throw new Error("useSwap must be used within a SwapProvider");
  }
  return context;
};
