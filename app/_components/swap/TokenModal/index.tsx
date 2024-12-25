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
import { BlockchainMeta, Token } from "rango-types/mainApi";
import { useWidget } from "@rango-dev/widget-embedded";
import Blockchains from "./Blockchains";
import { getAbbrAddress, getContrastRatio } from "@/app/utils";
import TokenIcon from "../../common/token-icon";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 50; // Number of tokens to load per page for infinite scrolling

// Props for the TokenModal component
interface TokenModalProps {
  selectedToken: Token | undefined; // The currently selected token
  setToken: Dispatch<SetStateAction<Token | undefined>>; // Function to update the selected token
}

const TokenModal: React.FC<PropsWithChildren<TokenModalProps>> = ({ children, selectedToken, setToken }) => {
  const page = useRef<number>(1); // Ref to keep track of the current page for infinite scroll
  const [search, setSearch] = useState<string>(''); // State to store the search query
  const [selectedBlockchain, setSelectedBlockchain] = useState<BlockchainMeta>(); // State to store the selected blockchain
  const [blockchainTokens, setBlockChainTokens] = useState<Token[]>([]); // State to store tokens filtered by blockchain
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]); // State to store the filtered list of tokens based on search query

  const { meta } = useWidget(); // Fetch the metadata using the custom hook
  const { tokens } = meta; // Extract tokens from the metadata

  // Effect to filter tokens based on the selected blockchain
  useEffect(() => {
    if (selectedBlockchain) {
      setBlockChainTokens(tokens.filter((token: Token) => token.blockchain === selectedBlockchain.name)
        .sort((a, b) => b.isPopular - a.isPopular)); // Sort tokens by popularity
    }
  }, [selectedBlockchain]);

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

  return (
    <Dialog>
      {/* Trigger to open the dialog */}
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-transparent max-h-[90vh] max-w-[90vw] p-4 md:p-6 bg-gradient-to-b from-black to-[#042214] border border-separator !rounded-3xl">
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
                  return (
                    <DialogClose
                      className={cn("p-2 border rounded-[2rem] w-full cursor-pointer bg-transparent hover:bg-white/5 transition-colors duration-300",
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
                              content={token.name || "Null"} // Show token name in a tooltip
                              className="!-mb-1"
                            >
                              <span className="text-base font-bold">
                                {token.symbol}
                                <span className="text-sm" style={{ color: selectedBlockchain.color ? getContrastRatio(selectedBlockchain.color, "#02140c00") ? selectedBlockchain.color : "white" : "white" }}>
                                  ({selectedBlockchain.displayName})
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
                          {/* Display medal if token is popular */}
                          {token.isPopular && <Image src={"/assets/icons/medal.png"} width={25} height={25} alt="medal" />}
                          {/* Display check mark if the token is selected */}
                          {isSelected ?
                            <Check className="w-[1.175rem] h-[1.175rem] p-0.5 bg-primary rounded-full font-bold text-black" />
                            :
                            <div className="w-[1.175rem] h-[1.175rem] border-2 rounded-full" />}
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