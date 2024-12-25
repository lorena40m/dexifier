"use client";
/**
 * SwapCard Component
 * 
 * This component renders a card UI for users to perform token swaps between different cryptocurrencies. 
 * It interacts with the Rango API to fetch the best multi-route swap options and provides a user-friendly interface 
 * for selecting tokens, entering amounts, and confirming the swap transaction.
 * 
 * States and Logic:
 * - `amountFrom`: The amount of the "from" token the user wants to swap.
 * - `tokenFrom`: The selected token that the user is swapping from.
 * - `tokenTo`: The selected token the user wants to swap to.
 * - `tokenFromBalance`: The available balance of the "from" token in the connected wallet.
 * - `isFetchingRoute`: A loading state that tracks whether a swap route is being fetched.
 * - `fetchRoute`: A function triggered by a change in input fields to fetch the best route.
 * - `selectedRoute`: Stores the best swap route selected by the user.
 * - `pendingSwap`: If there is a pending swap, it is tracked to display the current state.
 * - `fetchRouteDebounceHandler`: A debounced function to prevent excessive API calls while fetching swap routes.
 * 
 */
import Image from "next/image";
import SettingsPopup from "../settings-popup/settings-popup";
import HistoryPopup from "../settings-popup/history-popup";
import CustomLoader from "../common/loader";
import React, { ChangeEvent, useEffect, useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  getBestMultiRoutes,
} from "@/app/api/rango";
import ConfirmModal from "./ConfirmModal";
import { useWidget } from "@rango-dev/widget-embedded";
import WalletConnectModal from "./WalletConnectModal";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useSwap } from "@/app/providers/SwapProvider";
import TokenInput from "./TokenInput";
import { Label } from "@/components/ui/label";
import { debounce } from "lodash";
import { createQuoteRequestBody, getPendingSwaps } from "@/app/utils/swap";
import { useManager } from "@rango-dev/queue-manager-react";

const SwapCard: React.FC = () => {
  // Use custom hook to get connected wallet details
  const { wallets } = useWidget();
  const { details: connectedWallets } = wallets;
  const isWalletConnected = connectedWallets.length > 0;

  // Swap state management from the SwapProvider context
  const { tokenFrom, setTokenFrom, tokenTo, setTokenTo, confirmData, setRouteData, selectedRoute, setSelectedRoute, settings } = useSwap();
  const [amountFrom, setAmountFrom] = useState<string>('0');
  const [tokenFromBalance, setTokenFromBalance] = useState<number>(0);
  const [error, setError] = useState<string>();
  const [isFetchingRoute, fetchRoute] = useTransition();

  // Manager for pending swaps
  const { manager } = useManager();
  const pendingSwaps = getPendingSwaps(manager);

  // Find the selected swap if available
  const selectedSwap = confirmData?.result?.requestId
    ? pendingSwaps.find(({ swap }) => swap.requestId === confirmData?.result?.requestId)
    : undefined;
  const pendingSwap = selectedSwap?.swap;

  // Fetch the route for swapping when amountFrom, tokenFrom, or tokenTo changes
  useEffect(() => {
    if (parseFloat(amountFrom)) fetchRouteDebounceHandler(amountFrom);
  }, [tokenFrom, tokenTo, amountFrom]);

  // Update tokenFrom balance whenever tokenFrom changes or wallet balance is updated
  useEffect(() => {
    setAmountFrom('0');
    if (!tokenFrom) return;
    setTokenFromBalance(
      connectedWallets.reduce((total, connectedWallet) => {
        const walletBalance = connectedWallet.balances?.reduce((sum, balance) => {
          // Check if the balance matches the specific chain and address
          if (balance.chain === tokenFrom.blockchain && balance.address === tokenFrom.address) {
            return sum + parseFloat(balance.amount);
          }
          return sum;
        }, 0) || 0;
        return total + walletBalance;
      }, 0)
    );
  }, [tokenFrom, connectedWallets]);

  // Debounced fetch for swap routes
  const fetchRouteDebounceHandler = useMemo(() =>
    debounce((amount: string) => {
      if (!(tokenFrom && tokenTo)) return;
      setRouteData(undefined);
      setSelectedRoute(undefined);
      fetchRoute(async () => {
        setError(undefined)
        const routeRequest = createQuoteRequestBody({
          fromToken: tokenFrom,
          toToken: tokenTo,
          inputAmount: amount,
          disabledLiquiditySources: [],
          slippage: parseFloat(settings.slippage),
          affiliateRef: null,
          affiliatePercent: null,
          affiliateWallets: null
        })
        try {
          setRouteData(await getBestMultiRoutes(routeRequest))
        } catch (error) {
          setError(error as string)
        }
      })
    }, 1000),  // 1s delay
    [tokenFrom, tokenTo]
  );

  // Reverse the token pair (swap 'from' and 'to' tokens)
  const reverseTokenPair = () => {
    setTokenFrom(tokenTo);
    setTokenTo(tokenFrom);
  }

  const handleAction = () => {
    if (selectedRoute) {
      // Action to handle swap logic (could be a swap transaction)
    }
  }

  return (
    <Card className="max-w-[650px] min-h-[540px] w-full h-full bg-modal/5 border border-[#AAA]/20 backdrop-blur-lg p-6 rounded-[2rem] shadow-lg text-white">
      <CardHeader className="p-4">
        <div className="h-auto bg-transparent flex w-full justify-between">
          <div className="flex gap-4 items-center">
            <Link href={'exchange'} className='border border-primary rounded-full py-1 px-4 hover:text-primary'>
              No Wallet
            </Link>
            <Link href={'swap'} className='border border-primary rounded-full py-1 px-4 text-black bg-primary'>
              Browser Wallet
            </Link>
          </div>
          <div className="flex items-center">
            <SettingsPopup />
            <HistoryPopup />
          </div>
        </div>
      </CardHeader>
      <Separator className="bg-[#AAA]/20" />
      <CardContent className="p-6 flex flex-col justify-around">
        <div className="w-full flex flex-col justify-evenly gap-3">
          {/* Token From Section */}
          <div className="flex justify-between items-end">
            <Label htmlFor="tokenFrom" className="text-lg">From</Label>
            {isWalletConnected && tokenFrom && <div>
              <Label className="text-sm">
                Balance: {tokenFromBalance ? `${tokenFromBalance} ${tokenFrom.symbol}` : '_'}
              </Label>
              {tokenFromBalance > 0 &&
                <div className="flex gap-1 justify-end text-primary">
                  <button className="hover:text-primary-dark text-sm" onClick={() => setAmountFrom((tokenFromBalance * 0.25).toString())}>25%</button><span>|</span>
                  <button className="hover:text-primary-dark text-sm" onClick={() => setAmountFrom((tokenFromBalance * 0.5).toString())}>50%</button><span>|</span>
                  <button className="hover:text-primary-dark text-sm" onClick={() => setAmountFrom(tokenFromBalance.toString())}>Max</button>
                </div>}
            </div>}
          </div>
          <TokenInput
            type="number"
            id="tokenFrom"
            placeholder="Please enter 1-42000000"
            className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:outline-0 focus-visible:ring-offset-0"
            value={amountFrom}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setAmountFrom(e.target.value)}
            token={tokenFrom}
            setToken={setTokenFrom}
          />

          {/* Reverse Swap Button */}
          <Button
            variant="outline"
            className="bg-transparent self-center border-separator mt-6 rounded-full h-12 w-12 p-3 hover:bg-primary-dark"
            onClick={reverseTokenPair}
          >
            <Image
              src={"/assets/icons/swap.png"}
              alt="Swap Icon"
              height={0}
              width={0}
              className="w-full aspect-square"
            />
          </Button>

          {/* Token To Section */}
          <Label htmlFor="tokenTo" className="text-lg">To</Label>
          <TokenInput
            type="number"
            id="tokenTo"
            className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:outline-0 focus-visible:ring-offset-0"
            disabled
            token={tokenTo}
            setToken={setTokenTo}
            value={selectedRoute ? selectedRoute.outputAmount : 0}
          />
        </div>
      </CardContent>
      <div className="text-error font-bold text-center tracking-wide">{error}</div>
      <CardFooter className="p-6">
        {/* Footer Section: Handles the swap confirmation or wallet connection */}
        {isFetchingRoute ?
          <Button className="h-12 w-2/3 mx-auto" variant="outline" disabled>
            <CustomLoader className="!w-[1.875rem] !h-[1.875rem]" />
          </Button>
          :
          isWalletConnected ?
            pendingSwap ?
              <Button className="h-12 w-2/3 mx-auto text-base xl:text-xl" variant="outline" disabled onClick={handleAction}>
                Swapping <CustomLoader className="ml-2 !w-[1.875rem] !h-[1.875rem]" />
              </Button>
              :
              <ConfirmModal>
                <Button className="h-12 w-2/3 mx-auto" disabled={!selectedRoute} variant="primary">
                  Swap Now
                </Button>
              </ConfirmModal>
            :
            <WalletConnectModal>
              <Button className="h-12 w-2/3 mx-auto" variant="primary">
                Connect Wallet
              </Button>
            </WalletConnectModal>
        }
      </CardFooter>
    </Card>
  );
};

export default SwapCard;