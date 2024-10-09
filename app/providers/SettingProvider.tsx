import { createContext, useContext, ReactNode, useState } from "react";
import { WALLET } from "../types/interface";

// Define the type for the context
interface SettingContextType {
  wallet: WALLET;
  setWallet: (value: WALLET) => void;
}

// Create the context with an initial value of undefined
const SettingContext: React.Context<SettingContextType | undefined> = createContext<SettingContextType | undefined>(undefined);

export const SettingProvider = ({ children }: { children: ReactNode }) => {
  const [wallet, setWallet] = useState<WALLET>(WALLET.BROWSE)

  return (<SettingContext.Provider
    value={
      { wallet, setWallet }
    }
  >
    {children}
  </SettingContext.Provider>)
};

// Custom hook to use the Filter context
export const useSetting = () => {
  const context = useContext(SettingContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
