import Search from "../../common/search";
import Image from "next/image";
import CustomLoader from "../../common/loader";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check } from "lucide-react";
import { getBlockchainTokens } from "@/app/api/rango-api";
import { Blockchain, RootState, Token } from "@/app/types/interface";
import { toastSuccess } from "@/lib/utils";
import { useSelector } from "react-redux";
import { resetToken, updateToken } from "@/redux_slice/slice/tokenSlice";
import { useAppDispatch, useAppSelector } from "@/redux_slice/provider";
import { DialogClose } from "@/components/ui/dialog";
import { resetSwap } from "@/redux_slice/slice/swapSlice";

const TokenSection: React.FC<{
  selectedBlockchain: Blockchain | null;
  isFromToken: boolean;
}> = ({ selectedBlockchain, isFromToken }) => {
  const INITIALNUMBER = 5;
  // redux hook
  const dispatch = useAppDispatch();

  const storedToken: Token = useSelector((state: RootState) =>
    isFromToken ? state?.tokens?.fromToken : state?.tokens?.toToken
  );
  const { isRoutesFetched } = useAppSelector((state) => state.routes);
  const savedRouteData = useAppSelector((state) => state.quoteData);

  // react state
  const [tokenData, setTokenData] = useState<Token[]>([]);
  const [displayData, setDisplayData] = useState<Token[]>([]);
  const [itemsToShow, setItemsToShow] = useState(INITIALNUMBER);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<Token[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  //  use Effect
  useEffect(() => {
    if (selectedBlockchain != null) {
      getBlockchainTokens(selectedBlockchain!.name)
        .then((tokens) => {
          setTokenData(tokens);
          setFilteredData(tokens);
          setDisplayData(tokens.slice(0, itemsToShow));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedBlockchain]);
  useEffect(() => {
    setItemsToShow(INITIALNUMBER);
  }, [selectedBlockchain]);

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
      tok.name != null
        ? tok.name.toLowerCase().includes(search.toLowerCase())
        : false
    );
    setFilteredData(filteredTokens);
    setDisplayData(filteredTokens.slice(0, itemsToShow));
  }, [search, itemsToShow, tokenData]);

  const loadMoreData = () => {
    setLoading(true);
    const nextItemsToShow = itemsToShow * 2;

    setTimeout(() => {
      setDisplayData((prevData) => [
        ...prevData,
        ...filteredData.slice(prevData.length, nextItemsToShow),
      ]);
      setItemsToShow(nextItemsToShow);
      setLoading(false);
    }, 500);
  };

  const tokenTemplate = (
    id: string | null,
    name: string,
    imageSrc: string,
    status: boolean = false,
    index: number
  ) => (
    <DialogClose
      className={`mb-2.5 px-3.5 py-3 border rounded-3xl w-full cursor-pointer bg-transparent hover:bg-white/5 transition-colors duration-300 ${
        status ? "border-primary" : "border-seperator"
      }`}
      onClick={() => {
        if (!status) {
          const tempSelectedToken = tokenData.filter(
            (tok) => tok.address == id
          )[0];

          dispatch(
            updateToken({
              token: { ...tempSelectedToken, value: savedRouteData.amount },
              isFromToken,
            })
          );
          // if (isRoutesFetched) {
          //   dispatch(resetRoute());
          //   dispatch(resetSwap());
          // }

          toastSuccess(`${tempSelectedToken.name}'s selected as token`);
        } else dispatch(resetToken({ isFromToken }));
      }}
      key={`${id}-${name}-${index}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center gap-6 capitalize">
          <Image
            src={imageSrc}
            height={37}
            width={37}
            alt="Token Icon"
            className="text-sm"
            loading="lazy"
          />

          {name}
        </div>

        {status ? (
          <Check className="w-[1.075rem] h-[1.075rem] p-0.5 bg-primary rounded-full font-bold text-black" />
        ) : (
          <div className="w-[1.075rem] h-[1.075rem] border rounded-full" />
        )}
      </div>
    </DialogClose>
  );


  // loading ? (
  //   <CustomLoader />
  // ) : 
  return (
    <section>
      <h1 className="capitalize text-base sm:text-lg mb-4">select token</h1>
      {selectedBlockchain == null ? (
        <div>Select blockchain first!</div>
      ) : (
        <>
          <Search search={search} setSearch={setSearch} />

          <div
            ref={scrollContainerRef}
            className="pe-2.5 max-h-[35vh] overflow-y-auto"
          >
            {displayData.map((token, index) =>
              tokenTemplate(
                token.address,
                token.name,
                token.image,
                storedToken?.address === token.address,
                index
              )
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default TokenSection;
function filteredTokens(): any {
  throw new Error("Function not implemented.");
}
