import SwapSourcePopup from "../exchange-card/swap-source-popup";
import { Input } from "@/components/ui/input";
import { Blockchain, Result, RouteData, Token } from "@/app/types/interface";
import { updateTokenValue } from "@/redux_slice/slice/browserSlice/tokenSlice";
import { useAppDispatch, useAppSelector } from "@/redux_slice/provider";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { getBananceOfToken, getBestRoutes } from "@/app/api/rango-api";
import {
  getRoutes,
  setError,
  setRouteProcess,
  setSelectedRoute,
  updateRouteFetched,
} from "@/redux_slice/slice/browserSlice/routeSlice";
import { toastError } from "@/lib/utils";
import useDebounce from "@/app/utils/debounce";
import { sortQuotesBy } from "@/app/utils/catch-data";

interface Props {
  label: string;
  blockchains: Blockchain[];
  isFromToken?: boolean;
  isWalletConnected?: boolean;
}

const CustomCryptoField: React.FC<Props> = ({
  label,
  blockchains,
  isFromToken = false,
  isWalletConnected
}) => {

  // redux hook
  const dispatch = useAppDispatch();

  const { isInProcess, isSwapMade } = useAppSelector((state) => state.swap);
  const selectedTokenData = useAppSelector((state) => state?.tokens);
  const selectedToken = useAppSelector((state) =>
    isFromToken ? state?.tokens?.fromToken : state?.tokens?.toToken
  );
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
  const refetchRoutes = () => {
    const routeData: RouteData = {
      ...savedRouteData,
      amount: selectedTokenData.fromToken.value,
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
      !isFromToken ||
      routeData.from.blockchain == "" ||
      routeData.to.blockchain == "" ||
      routeData.amount == "" ||
      routeData.amount == 0 ||
      routeData.amount == undefined ||
      isExchangeButtonClicked
    ) {
      console.log("fetch failed because of data", routeData, isExchangeButtonClicked);
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
    const { blockchain, symbol, address, decimals } = selectedTokenData.fromToken;

    if (!isFromToken || blockchain === "" || symbol === "") {
      setTokenBalance("_");
      return;
    }

    const allChainAddresses = connectedWallets
      .filter(wallet => wallet.chain === blockchain)
      .map(wallet => wallet.address);

    const fetchBalances = async () => {
      try {
        const balances = await Promise.all(
          allChainAddresses.map(async (walletAddress) => {
            const result = await getBananceOfToken(walletAddress, blockchain, symbol, address);

            if (result.balance === null || result.balance === "0") {
              return 0;
            } else {
              const num = BigInt(result.balance); // BigInt for large token balances
              const divisor = BigInt(10 ** decimals); // Handle the decimals properly
              const integerPart = num / divisor;
              const remainder = num % divisor;
              // Convert fractional part to correct length based on decimals
              let fractionalPart = remainder.toString().padStart(decimals, "0");
              if (decimals > 0) {
                fractionalPart = fractionalPart.slice(0, 4); // Adjust this based on how many decimal places you need to show
              } else {
                fractionalPart = "0";
              }
              // Handle the case for very small balances that could round to zero
              let tokenPrice = integerPart.toString();
              if (decimals > 0) {
                tokenPrice += "." + fractionalPart;
              }
              // Remove trailing zeros after the decimal point, if any
              tokenPrice = tokenPrice.replace(/\.?0+$/, "");
              return parseFloat(tokenPrice);
            }
          })
        );


        const tokenTotalPrice = balances.reduce((total, balance) => total + balance, 0);
        setTokenBalance(tokenTotalPrice.toString());
      } catch (err) {
        console.log("Error from walletBalance", err);
        setTokenBalance("_");
      }
    };

    fetchBalances().catch(console.log);
  }, [selectedFromTokenDataMemo]);

  //Event Function

  const fromInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTokenValue({ isFromToken, value: e.target.value }));
  };

  const setInputAmountByPercent = (amount: number) => {
    dispatch(updateTokenValue({ isFromToken, value: String(amount) }));
  }

  const calculateUSDPrice = (selectedToken: Token, isFromToken: boolean, selectedRoute: Result | undefined) => {
    if (selectedRoute === undefined || selectedToken.value === undefined || selectedToken.usdPrice === null) {
      return 0;
    }
    if (isFromToken) {
      if (selectedToken.value === "" || selectedToken.value === 0) {
        return 0;
      }
    } else if (isRouteProcess || !isRoutesFetched) {
      return 0;
    }

    const usdValue = isFromToken
      ? Number(selectedToken.value) * selectedToken.usdPrice
      : Number(selectedRoute.outputAmount) * selectedToken.usdPrice
    return usdValue.toFixed(2)
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <label className="text-lg mb-1">{label}</label>

        {isWalletConnected && isFromToken && (
          <label>
            <span>Balance: {tokenBalance} &nbsp; {selectedTokenData.fromToken.symbol}</span>
            <div>
              {tokenBalance !== "_" && tokenBalance !== "0" && <div className="text-primary justify-end flex gap-2">
                <button className="flex hover:opacity-80" onClick={() => setInputAmountByPercent(parseFloat(tokenBalance) * 0.25)}>25%</button><span>|</span>
                <button className="flex hover:opacity-80" onClick={() => setInputAmountByPercent(parseFloat(tokenBalance) * 0.5)}>50%</button><span>|</span>
                <button className="flex hover:opacity-80" onClick={() => setInputAmountByPercent(parseFloat(tokenBalance))}>Max</button>
              </div>
              }
            </div>
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
                  ? Number.parseFloat(selectedRoute.outputAmount).toFixed(2)
                  : 0
            }
            min={1}
            max={42000000}
            onChange={(e) => fromInputChangeHandler(e)}
            placeholder={isFromToken ? "Please enter 1-42000000" : "0"}
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
