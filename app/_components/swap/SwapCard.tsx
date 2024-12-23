"use client";

import Image from "next/image";
import SettingsPopup from "../settings-popup/settings-popup";
import HistoryPopup from "../settings-popup/history-popup";
import CustomLoader from "../common/loader";
import React, { ChangeEvent, useEffect, useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  getBestMultiRoutes,
} from "@/app/api/rango";
import { toastError } from "@/lib/utils";
import ConfirmModal from "./ConfirmModal";
import { useWidget } from "@rango-dev/widget-embedded";
import WalletConnectModal from "./WalletConnectModal";
import DexifierButton from "../common/button";
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
  const { wallets } = useWidget()
  const { details: connectedWallets } = wallets;
  const isWalletConnected = connectedWallets.length > 0;

  const { tokenFrom, setTokenFrom, tokenTo, setTokenTo, confirmData, setRouteData, selectedRoute, setSelectedRoute } = useSwap();
  const [amountFrom, setAmountFrom] = useState<string>('0');
  const [tokenFromBalance, setTokenFromBalance] = useState<number>(0);
  const [isFetchingRoute, fetchRoute] = useTransition();

  const { manager } = useManager();
  const pendingSwaps = getPendingSwaps(manager);

  const selectedSwap = confirmData?.result?.requestId
    ? pendingSwaps.find(({ swap }) => swap.requestId === confirmData?.result?.requestId)
    : undefined;
  const pendingSwap = selectedSwap?.swap;

  useEffect(() => {
    if (parseFloat(amountFrom)) fetchRouteDebounceHandler(amountFrom);
  }, [tokenFrom, tokenTo, amountFrom]);

  useEffect(() => {
    setAmountFrom('0')
    if (!tokenFrom) return
    setTokenFromBalance(
      connectedWallets.reduce((total, connectedWallet) => {
        const walletBalance = connectedWallet.balances?.reduce((sum, balance) => {
          // Check if the balance matches the specific chain and address
          if (balance.chain === tokenFrom.blockchain && balance.address === tokenFrom.address) {
            return sum + parseFloat(balance.amount);
          }
          return sum;
        }, 0) || 0; // Handle cases where balances might be undefined
        return total + walletBalance;
      }, 0)
    );
  }, [tokenFrom])

  const fetchRouteDebounceHandler = useMemo(() =>
    debounce((amount: string) => {
      if (!(tokenFrom && tokenTo)) return;
      setRouteData(undefined);
      setSelectedRoute(undefined);
      fetchRoute(async () => {
        const routeRequest = createQuoteRequestBody({
          fromToken: tokenFrom,
          toToken: tokenTo,
          inputAmount: amount,
          disabledLiquiditySources: [],
          slippage: 0.5,
          affiliateRef: null,
          affiliatePercent: null,
          affiliateWallets: null
        })
        try {
          setRouteData(await getBestMultiRoutes(routeRequest))
        } catch (error) {
          toastError(error as string)
        }
      })
    }, 1000),  // 1s delay
    [tokenFrom, tokenTo]
  );

  const reverseTokenPair = () => {
    setTokenFrom(tokenTo);
    setTokenTo(tokenFrom);
  }

  const handleAction = () => {
    if (selectedRoute) {

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
          <div className="flex justify-between items-end">
            <Label htmlFor="tokenFrom" className="text-lg">From</Label>
            {isWalletConnected && tokenFrom && <div>
              <Label className="text-sm">
                Balance: {tokenFromBalance ? `${tokenFromBalance} ${tokenFrom.symbol}` : '_'}
              </Label>
              {tokenFromBalance > 0 &&
                <div className="flex gap-1 justify-end">
                  <button className="hover:opacity-80 text-sm" onClick={() => setAmountFrom((tokenFromBalance * 0.25).toString())}>25%</button><span>|</span>
                  <button className="hover:opacity-80 text-sm" onClick={() => setAmountFrom((tokenFromBalance * 0.5).toString())}>50%</button><span>|</span>
                  <button className="hover:opacity-80 text-sm" onClick={() => setAmountFrom(tokenFromBalance.toString())}>Max</button>
                </div>}
            </div>}
          </div>
          <TokenInput
            type="number"
            id="tokenFrom"
            placeholder="Please enter 1-42000000"
            className="placeholder:text-white/50 flex-1 border-none bg-transparent bg-opacity-0 focus-visible:ring-0 disabled:cursor-not-allowed focus-visible:outline-0 focus-visible:ring-offset-0"
            value={amountFrom}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setAmountFrom(e.target.value)}
            token={tokenFrom}
            setToken={setTokenFrom}
          />

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

          <Label htmlFor="tokenTo" className="text-lg">To</Label>
          <TokenInput
            type="number"
            id="tokenTo"
            className="placeholder:text-white/50 flex-1 border-none bg-transparent bg-opacity-0 focus-visible:ring-0 disabled:cursor-not-allowed focus-visible:outline-0 focus-visible:ring-offset-0"
            disabled
            token={tokenTo}
            setToken={setTokenTo}
            value={selectedRoute ? selectedRoute.outputAmount : 0}
          />
        </div>
      </CardContent>
      <CardFooter>
        {isWalletConnected ?
          isFetchingRoute || pendingSwap ?
            <Button
              className={`bg-transparent text-primary border border-seperator hover:bg-black/30 w-full md:max-w-[75%] lg:max-w-[67%] font-semibold h-[3.125rem] mx-auto mt-[20px] md:mt-[10px] text-xl transition-colors duration-300`}
              onClick={handleAction}
              disabled={true}
            >
              {pendingSwap && 'Swapping'}
              < CustomLoader className="!w-[1.875rem] !h-[1.875rem]" />
            </Button>
            :
            <ConfirmModal>
              <DexifierButton className="w-full" disabled={!selectedRoute}>
                Swap Now
              </DexifierButton>
            </ConfirmModal>
          :
          <WalletConnectModal>
            <DexifierButton className="w-full">
              Connect Wallet
            </DexifierButton>
          </WalletConnectModal>
        }
      </CardFooter>
    </Card>
  );
};

export default SwapCard;
