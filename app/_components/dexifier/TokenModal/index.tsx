// This component displays a modal where users can select a token from a list of tokens available for a specific blockchain.
// It supports searching, infinite scrolling for tokens, and selecting a token to be used in the application.
import Image from "next/image";
import React, { Dispatch, PropsWithChildren, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { isEqual } from "lodash";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TooltipTemplate from "../../common/tooltip-template";
import Search from "../../common/search";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import _ from 'lodash';
import { useWidget } from "@rango-dev/widget-embedded";
import Blockchains from "./Blockchains";
import { getAbbrAddress, getContrastRatio } from "@/app/utils";
import TokenIcon from "../../common/token-icon";
import { cn } from "@/lib/utils";
import { Blockchain, Token } from "@/app/types/dexifier";
import { useDexifier } from "@/app/providers/DexifierProvider";
import { MAP_BLOCKCHAIN_RANGO_2_EXOLIX } from "@/app/utils/exolix";

const PAGE_SIZE = 50; // Number of tokens to load per page for infinite scrolling

// Props for the TokenModal component
interface TokenModalProps {
  selectedToken: Token | undefined; // The currently selected token
  setToken: Dispatch<SetStateAction<Token | undefined>>; // Function to update the selected token
}

const TokenModal: React.FC<PropsWithChildren<TokenModalProps>> = ({ children, selectedToken, setToken }) => {
  const page = useRef<number>(1); // Ref to keep track of the current page for infinite scroll
  const [search, setSearch] = useState<string>(''); // State to store the search query
  const [selectedBlockchain, setSelectedBlockchain] = useState<Blockchain>(); // State to store the selected blockchain
  const [blockchainTokens, setBlockChainTokens] = useState<Token[]>([]); // State to store tokens filtered by blockchain
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]); // State to store the filtered list of tokens based on search query

  const { meta, wallets } = useWidget(); // Fetch the metadata using the custom hook
  // const { tokens } = meta; // Extract tokens from the metadata
  const { details: connectedWallets } = wallets;
  const { coins } = useDexifier();

  // Effect to filter tokens based on the selected blockchain
  useEffect(() => {
    if (selectedBlockchain) {
      setBlockChainTokens(coins.filter((coin: Token) => coin.blockchain === selectedBlockchain.name || coin.blockchain === MAP_BLOCKCHAIN_RANGO_2_EXOLIX[selectedBlockchain.name])
        .sort((a, b) => {
          // First, sort by popularity (popular coins come first)
          if (b.isPopular !== a.isPopular) {
            return b.isPopular ? 1 : -1;
          }

          // If both are popular, sort by address (null addresses come first)
          if (a.isPopular && b.isPopular) {
            if (a.address === null && b.address !== null) return -1; // a comes first
            if (a.address !== null && b.address === null) return 1;  // b comes first
          }

          // If both are not popular or have the same address status, maintain the original order
          return 0;
        })); // Sort tokens by popularity
    }
  }, [coins, selectedBlockchain]);

  // Effect to filter tokens based on the search query
  useEffect(() => {
    setFilteredTokens(blockchainTokens.filter((token: Token) => token.symbol.toLowerCase().includes(search.toLowerCase()))
      .slice(0, PAGE_SIZE)); // Limit results to the first PAGE_SIZE tokens
  }, [blockchainTokens, search]);

  // Callback to fetch more tokens when infinite scroll triggers
  const fetchMoreTokens = useCallback(() => {
    page.current += 1; // Increment the page number
    setFilteredTokens(blockchainTokens.filter((token: Token) => token.symbol.toLowerCase().includes(search.toLowerCase()))
      .slice(0, PAGE_SIZE * page.current)); // Append more tokens to the list
  }, [blockchainTokens, search]);

  const getTokenAmount = (token: Token, inUSD?: boolean): number => {
    return connectedWallets.reduce((total, connectedWallet) => {
      const walletBalance = connectedWallet.balances?.reduce((sum, balance) => {
        // Check if the balance matches the specific chain and address
        if (balance.chain === token.blockchain && balance.address === token.address) {
          return sum + parseFloat(balance.amount) * (inUSD ? balance.usdPrice || 0 : 1);
        }
        return sum;
      }, 0) || 0;
      return total + walletBalance;
    }, 0)
  }

  return (
    <Dialog>
      {/* Trigger to open the dialog */}
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col sm:max-w-md bg-transparent max-h-[90vh] max-w-[90vw] p-4 md:p-6 bg-gradient-to-b from-black to-[#042214] border border-separator !rounded-3xl">
        <DialogHeader className="flex flex-row justify-between">
          {/* Dialog header with title and close button */}
          <DialogTitle className="text-2xl">Swap Source</DialogTitle>
          <DialogClose>
            <X className="w-7 h-7 p-1 bg-primary rounded-full font-bold text-black hover:bg-primary-dark transition-colors duration-300" />
          </DialogClose>
        </DialogHeader>
        <Separator className="bg-separator" />
        <Label className="text-lg">Select Blockchain</Label>
        {/* Display blockchain options */}
        <Blockchains selectedBlockchain={selectedBlockchain} setSelectedBlockchain={setSelectedBlockchain} />
        {/* Show token selection if a blockchain is selected */}
        {selectedBlockchain &&
          <>
            <Label className="text-lg">Select Token</Label>
            {/* Search input for filtering tokens */}
            <Search value={search} onChange={(e) => setSearch(e.target.value)} />
            <div id="scrollableDiv" className="max-h-72 overflow-y-auto">
              {/* Infinite Scroll for displaying tokens */}
              <InfiniteScroll
                dataLength={filteredTokens.length} // Current length of displayed tokens
                next={fetchMoreTokens} // Fetch more tokens when scrolled to the bottom
                hasMore={true} // Always allow fetching more tokens
                loader={undefined} // Loader component for fetching more tokens
                scrollableTarget="scrollableDiv" // Scroll container ID: Ref => Line 89
                className="flex flex-col gap-2 pe-1"
              >
                {/* Map over the filtered tokens and display them */}
                {filteredTokens.map((token, index) => {
                  const isSelected: boolean = isEqual(token, selectedToken); // Check if the token is selected
                  const tokenAmount = getTokenAmount(token);
                  const tokenAmountInUSD = getTokenAmount(token, true);
                  return (
                    <DialogClose
                      className={cn("p-2 border rounded-3xl w-full cursor-pointer bg-transparent hover:bg-white/5 transition-colors duration-300",
                        isSelected ? "border-primary" : "border-separator"
                      )}
                      onClick={() => setToken(token)} // Update selected token
                      key={index}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center justify-center gap-6 capitalize">
                          {/* Display token logo and name */}
                          <TokenIcon
                            token={{
                              image: token.image,
                              alt: token.symbol,
                            }}
                          />
                          <div className="flex flex-col">
                            <TooltipTemplate
                              content={token.symbol || "Null"} // Show token name in a tooltip
                              className="!-mb-1"
                            >
                              <span className="text-base font-bold">
                                {token.symbol}
                                <span className="ml-1 text-sm" style={{ color: selectedBlockchain.color ? getContrastRatio(selectedBlockchain.color, "#02140c00") ? selectedBlockchain.color : "white" : "white" }}>
                                  ({selectedBlockchain.name})
                                </span>
                              </span>
                            </TooltipTemplate>
                            <TooltipTemplate content={token.address}>
                              <span className="text-[12px] opacity-40">
                                {getAbbrAddress(token.address)} {/* Display abbreviated address */}
                              </span>
                            </TooltipTemplate>
                          </div>
                        </div>
                        <div className="flex gap-3 items-center">
                          <div className="flex flex-col">
                            <span className="text-sm">{tokenAmount > 0 && `${tokenAmount} ${token.symbol}`}</span>
                            <span className="text-sm text-border">{tokenAmountInUSD > 0 && `${tokenAmountInUSD.toFixed(2)}$`}</span>
                          </div>
                          {/* Display medal if token is popular */}
                          {token.isPopular && <Image src={"/assets/icons/medal.png"} width={25} height={25} alt="medal" />}
                          {/* Display check mark if the token is selected */}
                          <div className="w-[1.175rem]">
                            {isSelected ?
                              <Check className="w-[1.175rem] h-[1.175rem] p-0.5 bg-primary rounded-full font-bold text-black" />
                              :
                              <div className="w-[1.175rem] h-[1.175rem] border-2 rounded-full" />}
                          </div>
                        </div>
                      </div>
                    </DialogClose>
                  )
                })}
              </InfiniteScroll>
            </div>
          </>
        }
      </DialogContent>
    </Dialog>
  );
};

export default TokenModal;