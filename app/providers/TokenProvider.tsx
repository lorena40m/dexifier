import { createContext, useContext, ReactNode, useState } from "react";
import { Token, WALLET } from "../types/interface";

// Define the type for the context
interface TokenListContextType {
  tokenList: Token[];
  setTokenList: (value: Token[]) => void;
}

// Create the context with an initial value of undefined
const TokenListContext: React.Context<TokenListContextType | undefined> = createContext<TokenListContextType | undefined>(undefined);

export const TokenListProvider = ({ children }: { children: ReactNode }) => {
  const [tokenList, setTokenList] = useState<Token[]>([])

  return (<TokenListContext.Provider
    value={
      { tokenList, setTokenList }
    }
  >
    {children}
  </TokenListContext.Provider>)
};

// Custom hook to use the Filter context
export const useTokenList = () => {
  const context = useContext(TokenListContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
