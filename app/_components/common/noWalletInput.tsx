import SwapSourcePopup from "../exchange-card/no-wallet-swap-source-popup";
import { Input } from "@/components/ui/input";
import { Blockchain, Result, RouteData, Token } from "@/app/types/interface";
import { updateTokenValue } from "@/redux_slice/slice/browserSlice/tokenSlice";
import { useAppDispatch, useAppSelector } from "@/redux_slice/provider";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { getBananceOfToken, getBestRoutes } from "@/app/api/rango-api";
import {
  getRoutes,
  resetRoute,
  setError,
  setRouteProcess,
  setSelectedRoute,
  updateRouteFetched,
} from "@/redux_slice/slice/browserSlice/routeSlice";
import { toastError } from "@/lib/utils";
import useDebounce from "@/app/utils/debounce";
import { updateSwapStatus } from "@/redux_slice/slice/browserSlice/swapSlice";
import { setEngine } from "crypto";
import { sortQuotesBy } from "@/app/utils/catch-data";
import { updateCurrencyValue } from "@/redux_slice/slice/noWalletSlice/currencySlice";
import { getRate } from "@/app/api/noWallet-api";
import { updateRateResult } from "@/redux_slice/slice/noWalletSlice/rateSlice";

interface Props {
  label: string;
  currencies: CurrencyResponse;
  isFromCurrency?: boolean;
  isWalletConnected?: boolean;
}

const NoWalletInput: React.FC<Props> = ({
  label,
  currencies,
  isFromCurrency = false,
  isWalletConnected
}) => {

  // redux hook
  const dispatch = useAppDispatch();

  const selectedTokenData = useAppSelector((state) => state?.tokens);
  const selectedCurrencyData = useAppSelector((state) => state?.currency);
  const selectedCurrency = useAppSelector((state) =>
    isFromCurrency
      ? state?.currency?.fromCurrency
      : state?.currency?.toCurrency
  );
  const { rateResult } = useAppSelector((state) => state.rate);

  const selectedRoute = useAppSelector((state) => state.routes.selectedRoute);
  const savedRouteData = useAppSelector((state) => state.quoteData);
  const { isRouteProcess, isRoutesFetched, isExchangeButtonClicked } = useAppSelector(
    (state) => state.routes
  );
  const { connectedWallets } = useAppSelector((state) => state.wallet);

  //react State
  const [tokenBalance, setTokenBalance] = useState<string>("_");

  //use Memo
  const { blockchain, symbol } = selectedTokenData.fromToken;
  const selectedFromTokenDataMemo = useMemo(
    () => ({ blockchain, symbol, connectedWallets }),
    [blockchain, symbol, connectedWallets]
  );

  const { fromToken, toToken } = selectedTokenData;
  const selectedTokenDataMemo = useMemo(
    () => ({ fromToken, toToken }),
    [fromToken, toToken]
  );

  //fetch route funtion
  const getRateData = () => {
    const rateData = {
      coinFrom: selectedCurrencyData.fromCurrency.code,
      networkFrom: selectedCurrencyData.fromCurrency.networks?.[0].network || "",
      coinTo: selectedCurrencyData.toCurrency.code,
      networkTo: selectedCurrencyData.toCurrency.networks?.[0].network || "",
      amount: selectedCurrency.value,

    }
    if (rateData.coinFrom === "" || rateData.coinTo === "" || rateData.amount === "") {
      console.log("rate fetch fail with request data error");
      return
    }

    getRate(rateData).then((result) => {
      dispatch(updateRateResult({ rateResult: result }))
      console.log(result);
    })
  };

  const debouncedRefetchRoutes = useDebounce(getRateData, 1000);

  //useEffect

  useEffect(() => {
    debouncedRefetchRoutes();
  }, [selectedCurrencyData]);


  //Event Function

  const fromInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

    dispatch(updateCurrencyValue({ isFromCurrency, value: e.target.value }));
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <label className="text-lg mb-1">{label}</label>

        {isWalletConnected && isFromCurrency && (
          <label>
            Balance: {tokenBalance} &nbsp; {selectedTokenData.fromToken.symbol}
          </label>
        )}
      </div>
      <div className="flex items-center justify-between bg-[#000]/30  backdrop-filter backdrop-blur-lg border border-[#695F5F] border-opacity-40 rounded-lg p-2 shadow-md max-h-[3.3125rem]">
        <div className="flex flex-col w-full">
          <Input
            type="number"
            value={
              isFromCurrency
                ? selectedCurrency.value
                : rateResult !== undefined ? rateResult.toAmount : "0"
            }
            min={1}
            max={42000000}
            onChange={(e) => fromInputChangeHandler(e)}
            placeholder={isFromCurrency ? "Please enter 1-42000000" : "0"}
            className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:outline-0 focus-visible:ring-offset-0"
            style={{ outline: "none" }}
            disabled={!isFromCurrency}
          />
        </div>
        <div className="border-l-2 border-[#ffffff33]">
          <SwapSourcePopup
            currencies={currencies}
            isFromCurrency={isFromCurrency}
          />
        </div>
      </div>
    </div>
  );
};

export default NoWalletInput;
