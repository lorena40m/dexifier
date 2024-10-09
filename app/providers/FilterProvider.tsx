import { createContext, useContext, ReactNode, useState } from "react";

// Define the type for the context
interface FilterContextType {
  isHideSmallBalance: boolean;
  setIsHideSmallBalance: (value: boolean) => void;
  isHideEmptyWallet: boolean;
  setIsHideEmptyWallet: (value: boolean) => void;
}

// Create the context with an initial value of undefined
const FilterContext: React.Context<FilterContextType | undefined> = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [isHideSmallBalance, setIsHideSmallBalance] = useState<boolean>(true);
  const [isHideEmptyWallet, setIsHideEmptyWallet] = useState<boolean>(false);

  return (<FilterContext.Provider
    value={
      { isHideSmallBalance, setIsHideSmallBalance, isHideEmptyWallet, setIsHideEmptyWallet }
    }
  >
    {children}
  </FilterContext.Provider>)
};

// Custom hook to use the Filter context
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
