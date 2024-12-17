'use client'

import { createContext, useContext, ReactNode } from "react";

// Define the type for the context
interface SwapContextType {
}

// Create the context with an initial value
const SwapContext: React.Context<SwapContextType> = createContext<SwapContextType>({});

export const SwapProvider = ({ children }: { children: ReactNode }) => {

  return (
    <SwapContext.Provider
      value={{}}
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
