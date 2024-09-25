import Search from "../../common/search";
import Image from "next/image";
import CustomLoader from "../../common/loader";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Blockchain, RootState, Token } from "@/app/types/interface";
import { toastSuccess } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { resetToken, updateToken } from "@/redux_slice/slice/browserSlice/tokenSlice";
import { useAppDispatch, useAppSelector } from "@/redux_slice/provider";
import { DialogClose } from "@/components/ui/dialog";
import { resetSwap } from "@/redux_slice/slice/browserSlice/swapSlice";
import TooltipTemplate from "../../common/tooltip-template";
import ShadowDecoration from "../../common/shadowDecoration";
import ImageWrapper from "../../common/imageWrapper";
import { getAbbrAddress } from "@/app/utils/catch-data";
import { resetCurrency, updateCurrency } from "@/redux_slice/slice/noWalletSlice/currencySlice";
import { resetRate } from "@/redux_slice/slice/noWalletSlice/rateSlice";
import { CurrencyResponse, CurrencyType, Networks } from "@/app/types/noWalletInterface";

const CurrencySection: React.FC<{
  currencies: CurrencyResponse;
  isFromCurrency: boolean;
}> = ({ currencies, isFromCurrency }) => {
  const INITIALNUMBER = 10;
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<CurrencyType[]>([]);
  const [displayData, setDisplayData] = useState<CurrencyType[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [itemsToShow, setItemsToShow] = useState(INITIALNUMBER);

  const selectedCurrency = useAppSelector((state) =>
    isFromCurrency
      ? state?.currency?.fromCurrency
      : state?.currency?.toCurrency
  );

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
    const filteredTokens = currencies.data.filter((currency) =>
      currency.name.toLowerCase().includes(search.toLowerCase()) ||
      currency.code.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filteredTokens);
    setDisplayData(filteredTokens.slice(0, itemsToShow));
  }, [search, itemsToShow, currencies]);

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

  const currencyTemplate = (
    code: string,
    name: string,
    icon: string,
    notes: string,
    networks: Networks[],
    status = false,
    index: number
  ) => (
    networks && networks.map((network) => (<DialogClose
      className={`mt-2.5 px-3.5 py-2 border rounded-3xl w-full cursor-pointer bg-transparent hover:bg-white/5 transition-colors duration-300 ${status && selectedCurrency.network?.network === network.network ? "border-primary" : "border-seperator"
        }`}
      onClick={() => {
        if (!status || selectedCurrency.network?.network !== network.network) {
          const tempSelectedCurrency = currencies.data.filter(
            (currency) => currency.code === code && currency.name === name
          )[0];

          const selectedNetwork = tempSelectedCurrency.networks.filter((tempNetwork) => tempNetwork.name === network.name)[0];

          dispatch(
            updateCurrency({
              currency: {
                code: tempSelectedCurrency.code,
                name: tempSelectedCurrency.name,
                icon: tempSelectedCurrency.icon,
                notes: tempSelectedCurrency.notes,
                network: selectedNetwork,
                value: ""
              },
              isFromCurrency,
            })
          );
          dispatch(resetRate())
          // if (isRoutesFetched) {
          //   dispatch(resetRoute());
          //   dispatch(resetSwap());
          // }

          toastSuccess(`${tempSelectedCurrency.code}'s selected as token`);
        } else dispatch(resetCurrency({ isFromCurrency }));
      }}
      key={`${code}-${name}-${index}-${network.name}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center gap-6 capitalize">
          <ImageWrapper>
            <Image
              src={icon}
              height={37}
              width={37}
              alt="Token Icon"
              className="text-sm"
              loading="lazy"
            />
          </ImageWrapper>

          <div className="flex flex-col">
            <TooltipTemplate
              content={name}
              className="!-mb-1"
              key={`${index}-${name}`}
            >
              <div>
                <span className="text-base px-1">{code}</span>
                <span className={`text-[14px] font-bold opacity-70`}>
                  ({name})
                </span>
              </div>
            </TooltipTemplate>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <div className="flex flex-col">
              <span className="flex  justify-end text-2xs">{network.network}</span>
              <span className="flex  justify-end text-xs text-primary">{network.name}</span>
            </div>
            {status && selectedCurrency.network?.network === network.network ? (
              <Check className="w-[1.175rem] h-[1.175rem] p-0.5 bg-primary rounded-full font-bold text-black" />
            ) : (
              <div className="w-[1.175rem] h-[1.175rem] border-2 rounded-full" />
            )}
          </div>
        </div>
      </div>
    </DialogClose>))

  );


  return (
    <section>
      <h1 className="capitalize text-base sm:text-lg mb-4">select Currency</h1>
      <Search search={search} setSearch={setSearch} />
      <div
        className="relative"
      >
        <div ref={scrollContainerRef} className="max-h-[45vh] pe-2.5 overflow-y-auto pb-2.5">
          {loading ? <CustomLoader /> : displayData && displayData.map((currency, index) =>
            currencyTemplate(
              currency.code,
              currency.name,
              currency.icon,
              currency.notes,
              currency.networks,
              currency.code === selectedCurrency.code && currency.name === selectedCurrency.name,
              index
            )
          )}
        </div>
        {!loading && <ShadowDecoration />}
      </div>
    </section>
  );
};

export default CurrencySection;
