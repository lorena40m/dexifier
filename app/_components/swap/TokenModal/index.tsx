import Image from "next/image";
import React, { Dispatch, PropsWithChildren, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { Check, X } from "lucide-react";
import { isEqual } from "lodash";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import TooltipTemplate from "../../common/tooltip-template";
import Search from "../../common/search";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import _ from 'lodash';
import { BlockchainMeta, Token } from "rango-types/mainApi";
import { useWidget } from "@rango-dev/widget-embedded";
import Blockchains from "./Blockchains";
import { toastSuccess } from "@/lib/utils";
import { getAbbrAddress, getContrastRatio } from "@/app/utils";

const PAGE_SIZE = 50;

interface TokenModalProps {
  selectedToken: Token | undefined;
  setToken: Dispatch<SetStateAction<Token | undefined>>;
}

const TokenModal: React.FC<PropsWithChildren<TokenModalProps>> = ({ children, selectedToken, setToken }) => {
  const page = useRef<number>(1);
  const [search, setSearch] = useState<string>('');
  const [selectedBlockchain, setSelectedBlockchain] = useState<BlockchainMeta>();
  const [blockchainTokens, setBlockChainTokens] = useState<Token[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);

  const { meta } = useWidget();
  const { tokens } = meta;

  useEffect(() => {
    if (selectedBlockchain) setBlockChainTokens(tokens.filter((token: Token) => token.blockchain === selectedBlockchain.name))
  }, [selectedBlockchain])

  useEffect(() => {
    setFilteredTokens(blockchainTokens.filter((token: Token) => token.name?.toLowerCase().includes(search.toLowerCase())).slice(0, PAGE_SIZE))
  }, [blockchainTokens, search])

  const fetchMoreTokens = useCallback(() => {
    page.current += 1;
    setFilteredTokens(blockchainTokens.filter((token: Token) => token.name?.toLowerCase().includes(search.toLowerCase())).slice(0, PAGE_SIZE * page.current))
  }, [blockchainTokens, search])

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-transparent max-h-[90vh] max-w-[90vw] p-4 md:p-6 bg-gradient-to-b from-black to-[#042214] border border-separator !rounded-3xl">
        <DialogHeader className="flex flex-row justify-between">
          <DialogTitle className="text-2xl">Swap Source</DialogTitle>
          <DialogClose>
            <X className="w-7 h-7 p-1 bg-primary rounded-full font-bold text-black hover:bg-primary-dark transition-colors duration-300" />
          </DialogClose>
        </DialogHeader>
        <Separator className="bg-separator" />
        <Label className="text-lg">Select Blockchain</Label>
        <Blockchains selectedBlockchain={selectedBlockchain} setSelectedBlockchain={setSelectedBlockchain} />
        {selectedBlockchain &&
          <>
            <Label className="text-lg">Select Token</Label>
            <Search value={search} onChange={(e) => setSearch(e.target.value)} />
            <div id="scrollableDiv" className="max-h-72 overflow-scroll">
              <InfiniteScroll
                dataLength={filteredTokens.length}
                next={fetchMoreTokens}
                hasMore={true}
                loader={undefined}
                scrollableTarget="scrollableDiv"
              >
                {filteredTokens.map((token, index) => {
                  const isSelected: boolean = isEqual(token, selectedToken);
                  return (
                    <DialogClose
                      className={`mt-2.5 px-3.5 py-2 border rounded-3xl w-full cursor-pointer bg-transparent hover:bg-white/5 transition-colors duration-300 ${isSelected ? "border-primary" : "border-seperator"
                        }`}
                      onClick={() => {
                        setToken(token);
                        toastSuccess(`${token.symbol}'s selected as token`);
                      }}
                      key={index}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center justify-center gap-6 capitalize">
                          <Avatar className="size-8">
                            <AvatarImage src={token.image} />
                            <AvatarFallback>{token.symbol}</AvatarFallback>
                          </Avatar>

                          <div className="flex flex-col">
                            <TooltipTemplate
                              content={token.name}
                              className="!-mb-1"
                              key={`${index}-${name}`}
                            >
                              <div>
                                <span className="text-base px-1">{token.symbol}</span>
                                <span className={`text-[14px] font-bold`} style={{ color: selectedBlockchain?.color ? getContrastRatio(selectedBlockchain?.color, "#02140c00") ? selectedBlockchain?.color : "white" : "white" }}>
                                  ({selectedBlockchain?.displayName})
                                </span>
                              </div>
                            </TooltipTemplate>
                            <TooltipTemplate content={token.address}>
                              <span className="text-[12px] opacity-40">
                                {getAbbrAddress(token.address)}
                              </span>
                            </TooltipTemplate>
                          </div>
                        </div>
                        <div className="flex gap-3 items-center">
                          <div className="flex flex-col">
                            {/* <span className="text-sm">{parseFloat(getTokenAmount(address, symbol)?.assetsAmount || "0") > 0 && getTokenAmount(address, symbol)?.assetsAmount + " " + symbol}</span>
                    <span className="text-sm text-border">{parseFloat(getTokenAmount(address, symbol)?.usdAmount || "0") > 0 && getTokenAmount(address, symbol)?.usdAmount + "$"}</span> */}
                          </div>
                          {token.isPopular ? <Image src={"/assets/icons/medal.png"} width={25} height={25} alt="medal" /> : <div className="w-[25px] h-[25px]" />}
                          {isSelected ? (
                            <Check className="w-[1.175rem] h-[1.175rem] p-0.5 bg-primary rounded-full font-bold text-black" />
                          ) : (
                            <div className="w-[1.175rem] h-[1.175rem] border-2 rounded-full" />
                          )}
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
