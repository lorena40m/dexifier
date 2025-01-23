import React, { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { debounce, isEqual } from "lodash";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import TooltipTemplate from "../common/tooltip-template";
import Search from "../common/search";
import { Currency } from "@/app/types/exolix";
import { getCurrencies } from "@/app/api/exolix";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import _ from 'lodash';
import CustomLoader from "../common/loader";
import TokenIcon from "../common/token-icon";

interface CurrencyModalProps {
  children: ReactNode;
  selectedCurrency: Currency | undefined;
  excludedCurrency: Currency | undefined;
  setCurrency: Dispatch<SetStateAction<Currency | undefined>>;
}

const CurrencyModal: React.FC<CurrencyModalProps> = ({ children, selectedCurrency, excludedCurrency, setCurrency }) => {
  const search = useRef<string>('');
  const page = useRef<number>(1);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  function sortBySearchTerm(arr: Currency[], searchTerm: string): Currency[] {
    const lowerSearchTerm = searchTerm.toLowerCase();

    // Return original if search is empty
    if (!lowerSearchTerm) return arr;

    // Helper to compute match score
    const getMatchScore = (value: string, search: string, weight: number) => {
      if (value === search) return 3 * weight; // Exact match
      if (_.startsWith(value, search)) return 2 * weight; // Starts with
      if (_.includes(value, search)) return 1 * weight; // Partial match
      return 0; // No match
    };

    // Compute the priority score for each Currency
    const computePriority = (currency: Currency): number => {
      const fields = [
        { value: currency.code.toLowerCase(), weight: 3 },
        { value: currency.name.toLowerCase(), weight: 2 },
        { value: currency.network.name.toLowerCase(), weight: 1 },
        { value: currency.network.network.toLowerCase(), weight: 0 },
      ];

      // Calculate the sum of match scores
      return _.sumBy(fields, (field) => getMatchScore(field.value, lowerSearchTerm, field.weight));
    };

    // Sort using Lodash
    return _.orderBy(
      arr,
      [
        (item) => computePriority(item), // Priority score
        "name", // Fallback alphabetical sort
      ],
      ["desc", "asc"] // Descending for score, ascending for name
    );
  }

  const fetchCurrenciesDebounceHandler = debounce(
    (search: string, page: number) => {
      getCurrencies(search, page).then(data => {
        setHasMore(!!data.length)
        setCurrencies(prev => {
          if (page === 1) return sortBySearchTerm(data, search)
          return prev.concat(sortBySearchTerm(data, search))
        });
      });
    }, 1000 // 1s delay
  );

  useEffect(() => {
    fetchCurrenciesDebounceHandler(search.current, page.current)
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col sm:max-w-md bg-transparent max-h-[90vh] max-w-[90vw] p-4 md:p-6 bg-gradient-to-b from-black to-[#042214] border border-separator !rounded-3xl">
        <DialogHeader className="flex flex-row justify-between">
          <DialogTitle className="text-2xl">Swap Source</DialogTitle>
          <DialogClose>
            <X className="w-7 h-7 p-1 bg-primary rounded-full font-bold text-black hover:bg-primary-dark transition-colors duration-300" />
          </DialogClose>
        </DialogHeader>
        <Separator className="bg-separator" />
        <Label className="text-lg">Select Currency</Label>
        <Search onChange={(e) => {
          search.current = e.target.value;
          page.current = 1
          fetchCurrenciesDebounceHandler(search.current, page.current)
        }} />
        <div id="scrollableDiv" className="max-h-96 overflow-y-auto">
          <InfiniteScroll
            dataLength={currencies.length}
            next={() => {
              page.current += 1
              fetchCurrenciesDebounceHandler(search.current, page.current)
            }}
            hasMore={hasMore}
            loader={<div className="h-16 mt-4"><CustomLoader /></div>}
            scrollableTarget="scrollableDiv"
            className="pe-1"
          >
            {currencies.length ?
              currencies.map((currency, index) => {
                const selected: boolean = isEqual(currency, selectedCurrency);
                if (isEqual(currency, excludedCurrency)) return
                return (
                  <DialogClose
                    className={`mt-2.5 px-3.5 py-2 border rounded-3xl w-full cursor-pointer bg-transparent hover:bg-white/5 transition-colors duration-300 ${selected ? "border-primary" : "border-separator"}`}
                    key={index}
                    onClick={() => setCurrency(currency)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center justify-center gap-6 capitalize">
                        <TokenIcon
                          token={{
                            image: currency.icon,
                            alt: currency.code,
                          }}
                        />
                        <div className="flex flex-col">
                          <TooltipTemplate
                            content={currency.name}
                            className="!-mb-1"
                            key={`${index}-${name}`}
                          >
                            <div>
                              <span className="text-base px-1">{currency.code}</span>
                              <span className={`hidden md:flex text-[14px] font-bold opacity-70`}>
                                ({currency.name})
                              </span>
                            </div>
                          </TooltipTemplate>
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <div className="flex gap-2 items-center">
                          <div className="flex flex-col">
                            <span className="flex justify-end text-2xs">{currency.network.network}</span>
                            <span className="flex justify-end text-xs text-primary">{currency.network.name}</span>
                          </div>
                          {selected ? (
                            <Check className="w-[1.175rem] h-[1.175rem] p-0.5 bg-primary rounded-full font-bold text-black" />
                          ) : (
                            <div className="w-[1.175rem] h-[1.175rem] border-2 rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  </DialogClose>
                )
              })
              :
              <div className="flex justify-center">No result</div>
            }
          </InfiniteScroll>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CurrencyModal;
