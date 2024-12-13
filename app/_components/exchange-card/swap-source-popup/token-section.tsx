import Search from "../../common/search";
import Image from "next/image";
import CustomLoader from "../../common/loader";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Blockchain, RootState, Token } from "@/app/types/interface";
import { toastSuccess } from "@/lib/utils";
import { useSelector } from "react-redux";
import { resetToken, updateToken } from "@/redux_slice/slice/browserSlice/tokenSlice";
import { useAppDispatch, useAppSelector } from "@/redux_slice/provider";
import { DialogClose } from "@/components/ui/dialog";
import TooltipTemplate from "../../common/tooltip-template";
import ShadowDecoration from "../../common/shadow-decoration";
import ImageWrapper from "../../common/image-wrapper";
import { getAbbrAddress, getAmountFromString, getContrastRatio } from "@/app/utils/catch-data";
import FallBackImage from "../../common/fall-backImage";
import { useTokenList } from "@/app/providers/TokenProvider";

const TokenSection: React.FC<{
  selectedBlockchain: Blockchain | null;
  isFromToken: boolean;
}> = ({ selectedBlockchain, isFromToken }) => {
  const INITIALNUMBER = 5;

  // redux hook
  const dispatch = useAppDispatch();
  const { tokenList } = useTokenList();

  const storedToken: Token = useSelector((state: RootState) =>
    isFromToken ? state?.tokens?.fromToken : state?.tokens?.toToken
  );

  const savedRouteData = useAppSelector((state) => state.quoteData);
  const { wallets } = useAppSelector((state) => state.wallet);

  // react state
  const [tokenData, setTokenData] = useState<Token[]>([]);
  const [displayData, setDisplayData] = useState<Token[]>([]);
  const [itemsToShow, setItemsToShow] = useState(INITIALNUMBER);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<Token[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  function filteredTokens(tokens: Token[]): Token[] {
    try {
      return tokens.sort((a, b) => {
        if (isSame(storedToken, a) && !isSame(storedToken, b)) {
          return -1;
        }
        if (!isSame(storedToken, a) && isSame(storedToken, b)) {
          return 1;
        }
        if (a.address === null && b.address !== null) {
          return -1;
        }
        if (a.address !== null && b.address === null) {
          return 1;
        }
        if (a.isPopular && !b.isPopular) {
          return -1;
        }
        if (!a.isPopular && b.isPopular) {
          return 1;
        }
        if (a.supportedSwappers === undefined || b.supportedSwappers === undefined) {
          return 0;
        }
        return b.supportedSwappers?.length - a.supportedSwappers?.length; // keep original order if both conditions are the same
      });
    } catch {
      throw new Error("Function not implemented.");
    }
  }

  function isSame(a: Object, b: Object): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  const getTokenAmount = (address: string | null, symbol: string) => {
    if (selectedBlockchain === null) {
      return
    }
    let tokenAmount = 0;
    let assetAmount = 0;
    wallets.filter((wallet) => wallet.blockChain === selectedBlockchain?.name).map((wallet) => {
      wallet.balances?.filter((balance) => balance.asset.symbol === symbol && balance.asset.address === address).forEach((balance) => {
        tokenAmount += 0;
        assetAmount += parseFloat(getAmountFromString(balance.amount.amount, balance.amount.decimals))
      });
    })
    return { usdAmount: tokenAmount.toFixed(2), assetsAmount: assetAmount.toFixed(4) }
  }

  const selectedBlockchainMemo = useMemo(() => selectedBlockchain, [selectedBlockchain]);

  //  use Effect
  useEffect(() => {
    const tokenLister = async () => {
      if (selectedBlockchain && selectedBlockchain !== null) {
        setLoading(true);
        try {
          const tokens = tokenList.filter((tokens) => tokens.blockchain === selectedBlockchain!.name);
          const sortedTokens = filteredTokens(tokens);
          setTokenData(sortedTokens);
          setFilteredData(sortedTokens);
          setDisplayData(sortedTokens.slice(0, itemsToShow));
        }
        catch (err) {
          console.log(err);
        }
        setLoading(false);

        // getBlockchainTokens(selectedBlockchain!.name)
        //   .then((tokens) => {
        //     const sortedTokens = filteredTokens(tokens);

        //     setTokenData(sortedTokens);
        //     setFilteredData(sortedTokens);
        //     setDisplayData(sortedTokens.slice(0, itemsToShow));
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   }).finally(() => {
        //     setLoading(false);
        //   });
      }
    }

    tokenLister().catch(console.log)
    setItemsToShow(INITIALNUMBER);
  }, [selectedBlockchainMemo]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef === null || scrollContainerRef?.current === null) {
        return;
      }
      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef?.current;

      if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
        loadMoreData();
      }
    };

    if (scrollContainerRef === null || scrollContainerRef?.current === null) {
      return;
    }
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener("scroll", handleScroll);

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [loading, itemsToShow, filteredData]);

  useEffect(() => {
    const filteredTokens = tokenData.filter((tok) =>
      tok.symbol != null
        ? tok.symbol.toLowerCase().includes(search.toLowerCase())
        : false
    );
    setFilteredData(filteredTokens);
    setDisplayData(filteredTokens.slice(0, itemsToShow));
  }, [search, itemsToShow, tokenData]);

  const loadMoreData = () => {
    const nextItemsToShow = itemsToShow * 2;

    setTimeout(() => {
      setDisplayData((prevData) => [
        ...prevData,
        ...filteredData.slice(prevData.length, nextItemsToShow),
      ]);
      setItemsToShow(nextItemsToShow);
    }, 500);
  };

  const tokenTemplate = (
    token: Token
  ) => {
    const selected = isSame(storedToken, token);
    return (
      <DialogClose
        className={`mt-2.5 px-3.5 py-2 border rounded-3xl w-full cursor-pointer bg-transparent hover:bg-white/5 transition-colors duration-300 ${selected ? "border-primary" : "border-seperator"
          }`}
        onClick={() => {
          if (!selected) {
            const tempSelectedToken = tokenData.filter(
              (token) => token.address === token.address && token.symbol === token.symbol && token.name === token.name
            )[0];

            dispatch(
              updateToken({
                token: { ...tempSelectedToken, value: savedRouteData.amount },
                isFromToken,
              })
            );

            toastSuccess(`${tempSelectedToken.symbol}'s selected as token`);
          } else dispatch(resetToken({ isFromToken }));
        }}
        key={token.address}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center gap-6 capitalize">
            <ImageWrapper>
              <FallBackImage
                src={token.image}
                height={37}
                width={37}
                alt="Token Icon"
                className="text-sm"
                loading="lazy"
                fallbackSrc="/assets/icons/questionToken.png"
              />
            </ImageWrapper>

            <div className="flex flex-col">
              <TooltipTemplate
                content={token.name}
                className="!-mb-1"
                key={token.address}
              >
                <div>
                  <span className="text-base px-1">{token.symbol}</span>
                  {/* <div>
                textShadow: "1px 0px 1px #ffffff" 
                </div> */}
                  <span className={`text-[14px] font-bold`} style={{ color: selectedBlockchain?.color ? getContrastRatio(selectedBlockchain?.color, "#02140c00") ? selectedBlockchain?.color : "white" : "white" }}>
                    ({selectedBlockchain?.displayName})
                  </span>
                </div>
              </TooltipTemplate>
              <TooltipTemplate
                content={token.address || "null"}>
                <span className="text-[12px] opacity-40">
                  {token.address === null
                    ? "null"
                    : getAbbrAddress(token.address)}
                </span>
              </TooltipTemplate>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="flex flex-col">
              <span className="text-sm">{parseFloat(getTokenAmount(token.address, token.symbol)?.assetsAmount || "0") > 0 && getTokenAmount(token.address, token.symbol)?.assetsAmount + " " + token.symbol}</span>
              <span className="text-sm text-border">{parseFloat(getTokenAmount(token.address, token.symbol)?.usdAmount || "0") > 0 && getTokenAmount(token.address, token.symbol)?.usdAmount + "$"}</span>
            </div>
            {token.isPopular ? <Image src={"/assets/icons/medal.png"} width={25} height={25} alt="medal" /> : <div className="w-[25px] h-[25px]" />}
            {selected ? (
              <Check className="w-[1.175rem] h-[1.175rem] p-0.5 bg-primary rounded-full font-bold text-black" />
            ) : (
              <div className="w-[1.175rem] h-[1.175rem] border-2 rounded-full" />
            )}
          </div>
        </div>
      </DialogClose>
    )
  };

  return (
    <section>
      <h1 className="capitalize text-base sm:text-lg mb-4">select token</h1>
      {selectedBlockchain == null || selectedBlockchain?.name == "" ? (
        <div>Select blockchain first!</div>
      ) : (
        <>
          <Search search={search} setSearch={setSearch} />
          <div
            className="relative"
          >
            <div ref={scrollContainerRef} className="max-h-[35vh] pe-2.5 overflow-y-auto pb-2.5">
              {loading ? <CustomLoader /> : displayData && displayData.map((token, index) => {
                return (tokenTemplate(
                  token
                ))
              }
              )}
            </div>
            {!loading && <ShadowDecoration />}
          </div>
        </>
      )}
    </section>
  );
};

export default TokenSection;
