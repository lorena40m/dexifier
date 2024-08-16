import SwapSourcePopup from "../exchange-card/swap-source-popup";
import { Input } from "@/components/ui/input";
import { Blockchain, Result, RouteData, Token } from "@/app/types/interface";
import { updateTokenValue } from "@/redux_slice/slice/tokenSlice";
import { useAppDispatch, useAppSelector } from "@/redux_slice/provider";
import { useAccount } from "wagmi";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { getBananceOfWallet, getBestRoutes } from "@/app/api/rango-api";
import {
  getRoutes,
  resetRoute,
  setError,
  setRouteProcess,
  setSelectedRoute,
  updateRouteFetched,
} from "@/redux_slice/slice/routeSlice";
import { toastError } from "@/lib/utils";
import useDebounce from "@/app/utils/debounce";
import { updateSwapStatus } from "@/redux_slice/slice/swapSlice";
import { setEngine } from "crypto";
import { sortQuotesBy } from "@/app/utils/catch-data";

interface Props {
  label: string;
  blockchains: Blockchain[];
  isFromToken?: boolean;
}

const CustomCryptoField: React.FC<Props> = ({
  label,
  blockchains,
  isFromToken = false,
}) => {
  const account = useAccount();

  // redux hook
  const dispatch = useAppDispatch();

  const { isInProcess, isSwapMade } = useAppSelector((state) => state.swap);
  const selectedTokenData = useAppSelector((state) => state?.tokens);
  const selectedToken = useAppSelector((state) =>
    isFromToken ? state?.tokens?.fromToken : state?.tokens?.toToken
  );
  const selectedRoute = useAppSelector((state) => state.routes.selectedRoute);
  const savedRouteData = useAppSelector((state) => state.quoteData);
  const { isRouteProcess, isRoutesFetched } = useAppSelector(
    (state) => state.routes
  );

  //react State
  const [tokenBalance, setTokenBalance] = useState("0");

  //use Memo
  const { blockchain, symbol } = selectedTokenData.fromToken;
  const selectedFromTokenDataMemo = useMemo(
    () => ({ blockchain, symbol }),
    [blockchain, symbol]
  );

  const { fromToken, toToken } = selectedTokenData;
  const selectedTokenDataMemo = useMemo(
    () => ({ fromToken, toToken }),
    [fromToken, toToken]
  );

  //fetch route funtion
  const refetchRoutes = () => {
    const routeData: RouteData = {
      ...savedRouteData,
      amount: selectedToken.value,
      from: {
        blockchain: selectedTokenData.fromToken.blockchain,
        symbol: selectedTokenData.fromToken.symbol,
        address: selectedTokenData.fromToken.address,
      },
      to: {
        blockchain: selectedTokenData.toToken.blockchain,
        symbol: selectedTokenData.toToken.symbol,
        address: selectedTokenData.toToken.address,
      },
    };
    if (
      routeData.from.blockchain == "" ||
      routeData.to.blockchain == "" ||
      routeData.amount == "" ||
      routeData.amount == 0 ||
      routeData.amount == undefined ||
      !account.isConnected
    ) {
      return;
    }
    console.log("newRouteFromInput:", routeData);
    dispatch(setRouteProcess({ isRouteProcess: true }));
    getBestRoutes(routeData)
      .then((data) => {
        const sortedResults = sortQuotesBy(
          "RECOMMENDED",
          data.results as Result[]
        );
        dispatch(setSelectedRoute({ route: sortedResults[0] }));
        dispatch(getRoutes({ routes: sortedResults }));
        dispatch(updateRouteFetched({ isRouteFetched: true }));
      })
      .catch((error) => {
        toastError("No routes found!");
        dispatch(setError({ isError: true }));
        dispatch(updateRouteFetched({ isRouteFetched: false }));
      })
      .finally(() => {
        dispatch(setRouteProcess({ isRouteProcess: false }));
      });
  };

  const debouncedRefetchRoutes = useDebounce(refetchRoutes, 1000);

  //useEffect

  useEffect(() => {
    debouncedRefetchRoutes();
  }, [selectedTokenDataMemo]);

  useEffect(() => {
    const { blockchain, symbol, address, decimals } =
      selectedTokenData.fromToken;
    if (!isFromToken || blockchain == "" || symbol == "") {
      setTokenBalance("0");
      return;
    }
    const walletAddress = "0x9639D6bD17073c2dC6209eecE12e2b714B0388aC";
    // account.address;

    getBananceOfWallet(walletAddress, blockchain, symbol, address)
      .then((result) => {
        console.log("wallet token data", result);
        if (result.balance == null) {
          setTokenBalance("0");
          return;
        } else {
          if (result.balance === "0") {
            setTokenBalance(result.balance);
          }
          const num = BigInt(result.balance);
          const divisor = BigInt(10 ** decimals);
          const integerPart = num / divisor;
          const remainder = num % divisor;
          let fractionalPart = remainder.toString().padStart(decimals, "0");
          fractionalPart = fractionalPart.slice(0, 3);
          let tokenPrice = integerPart.toString() + "." + fractionalPart;
          tokenPrice = tokenPrice.replace(/\.?0+$/, "");
          setTokenBalance(tokenPrice);
        }
      })
      .catch((err) => console.log("Error from walletBalance", err));
  }, [selectedFromTokenDataMemo]);

  //Event Function

  const fromInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTokenValue({ isFromToken, value: e.target.value }));
  };

  const calculateUSDPrice = (selectedToken: Token, isFromToken: boolean, selectedRoute: Result | undefined) => {
    if(selectedRoute === undefined || selectedToken.value === undefined || selectedToken.usdPrice === null){
      return 0;
    }
    if(isFromToken){
      if(selectedToken.value === "" || selectedToken.value === 0){
        return 0;
      }
    }else if(isRouteProcess || !isRoutesFetched){
return 0;
    }

    const usdValue = isFromToken
      ? Number(selectedToken.value) * selectedToken.usdPrice
      : Number(selectedRoute.outputAmount) * selectedToken.usdPrice
    return usdValue.toFixed(3)
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <label className="text-lg mb-1">{label}</label>

        {account.isConnected && isFromToken && (
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
              isFromToken
                ? selectedToken.value || ""
                : selectedRoute != undefined &&
                  !isRouteProcess &&
                  isRoutesFetched
                ? Number.parseFloat(selectedRoute.outputAmount).toFixed(3)
                : 0
            }
            min={1}
            max={42000000}
            onChange={(e) => fromInputChangeHandler(e)}
            placeholder="Please enter 1-42000000"
            className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:outline-0 focus-visible:ring-offset-0"
            style={{ outline: "none" }}
            disabled={!isFromToken || isInProcess || isSwapMade}
          />
          <span className="text-xs px-3 opacity-50">
            ~
            {calculateUSDPrice(selectedToken, isFromToken, selectedRoute)}
            $
          </span>
        </div>
        <div className="border-l-2 border-[#ffffff33]">
          <SwapSourcePopup
            blockchains={blockchains}
            isFromToken={isFromToken}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomCryptoField;
