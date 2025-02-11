"use client";

import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useWidget } from "@rango-dev/widget-embedded";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  DEXIFIER_MODERATOR,
  DEXIFIER_STATE,
  useDexifier,
} from "@/app/providers/DexifireProvider";
import TokenInput from "../swap/TokenInput";
import WalletConnectModal from "../swap/WalletConnectModal";
import ConfirmModal from "./ConfirmModal";
import TooltipTemplate from "../common/tooltip-template";
import SettingModal from "../swap/SettingModal";
import { cn } from "@/lib/utils";

const DexifierCard: React.FC = () => {
  // Use custom hook to get connected wallet details
  const { wallets } = useWidget();
  const { details: connectedWallets } = wallets;
  const isWalletConnected = connectedWallets.length > 0;

  // Swap state management from the SwapProvider context
  const {
    tokenFrom,
    setTokenFrom,
    tokenTo,
    setTokenTo,
    amountFrom,
    setAmountFrom,
    amountTo,
    selectedRoute,
    swapData,
    isMobile,
    setState,
  } = useDexifier();
  const [tokenFromBalance, setTokenFromBalance] = useState<number>(0);

  // Update tokenFrom balance whenever tokenFrom changes or wallet balance is updated
  useEffect(() => {
    if (!tokenFrom) return;
    setTokenFromBalance(
      connectedWallets.reduce((total, connectedWallet) => {
        const walletBalance =
          connectedWallet.balances?.reduce((sum, balance) => {
            // Check if the balance matches the specific chain and address
            if (
              balance.chain === tokenFrom.blockchain &&
              balance.address === tokenFrom.address
            ) {
              return sum + parseFloat(balance.amount);
            }
            return sum;
          }, 0) || 0;
        return total + walletBalance;
      }, 0)
    );
  }, [tokenFrom, connectedWallets]);

  // Reverse the token pair (swap 'from' and 'to' tokens)
  const reverseTokenPair = () => {
    setTokenFrom(tokenTo);
    setTokenTo(tokenFrom);
  };

  return (
    <Card
      className={cn(
        "w-full border border-[#AAA]/20 backdrop-blur-lg rounded-[2rem] shadow-lg text-white",
        isMobile ? "p-0 bg-primary/10" : "max-w-[650px] p-6 h-full bg-modal/5"
      )}
    >
      {!isMobile && (
        <>
          <CardHeader className="p-4">
            <div className="h-auto bg-transparent flex w-full justify-between items-center">
              <CardTitle>Swap</CardTitle>
              <SettingModal>
                <Button className="bg-transparent hover:bg-transparent">
                  <TooltipTemplate content="Settings" className="!mb-1">
                    <Image
                      src={"/assets/icons/setting.png"}
                      alt="button-icon"
                      width={18}
                      height={18}
                    />
                  </TooltipTemplate>
                </Button>
              </SettingModal>
            </div>
          </CardHeader>
          <Separator className="hidden md:block bg-[#AAA]/20" />
        </>
      )}
      <CardContent
        className={cn(
          "flex flex-col justify-around",
          isMobile ? "px-5 py-[31px]" : "px-[31px] py-10"
        )}
      >
        <div className="w-full flex flex-col justify-evenly gap-2">
          {/* Token From Section */}
          <div className="flex justify-between items-end">
            <Label htmlFor="tokenFrom" className="text-lg">
              {isMobile ? "You send" : "From"}
            </Label>
            {isWalletConnected && tokenFrom && (
              <div>
                <Label className="text-sm">
                  Balance:{" "}
                  {tokenFromBalance
                    ? `${tokenFromBalance} ${tokenFrom.symbol}`
                    : "_"}
                </Label>
                {tokenFromBalance > 0 && (
                  <div className="flex gap-1 justify-end text-primary">
                    <button
                      className="hover:text-primary-dark text-sm"
                      onClick={() =>
                        setAmountFrom((tokenFromBalance * 0.25).toString())
                      }
                    >
                      25%
                    </button>
                    <span>|</span>
                    <button
                      className="hover:text-primary-dark text-sm"
                      onClick={() =>
                        setAmountFrom((tokenFromBalance * 0.5).toString())
                      }
                    >
                      50%
                    </button>
                    <span>|</span>
                    <button
                      className="hover:text-primary-dark text-sm"
                      onClick={() => setAmountFrom(tokenFromBalance.toString())}
                    >
                      Max
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <TokenInput
            type="number"
            id="tokenFrom"
            placeholder="Please enter 1-42000000"
            className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:outline-0 focus-visible:ring-offset-0 placeholder:text-white/50"
            value={amountFrom}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              e.target.value = parseFloat(e.target.value).toString();
              setAmountFrom(e.target.value);
            }}
            token={tokenFrom}
            setToken={setTokenFrom}
          />

          {/* Reverse Swap Button */}
          <Button
            variant="outline"
            className="bg-transparent self-center border-separator mt-7 mb-1 rounded-full h-[54px] w-[54px] p-1 hover:bg-primary-dark"
            onClick={reverseTokenPair}
          >
            <Image
              src={"/assets/icons/swap.png"}
              alt="Swap Icon"
              height={28}
              width={28}
            />
          </Button>

          {/* Token To Section */}
          <Label htmlFor="tokenTo" className="text-lg">
            {isMobile ? "You get" : "To"}
          </Label>
          <TokenInput
            type="number"
            id="tokenTo"
            className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:outline-0 focus-visible:ring-offset-0"
            disabled
            token={tokenTo}
            setToken={setTokenTo}
            value={amountTo}
          />
        </div>
      </CardContent>
      {!isMobile && (
        <CardFooter className="text-base md:text-xl p-0">
          {/* Footer Section: Handles the swap confirmation or wallet connection */}
          {selectedRoute?.moderator !== DEXIFIER_MODERATOR.Rango ? (
            <Button
              className={`bg-primary hover:bg-primary-dark text-black w-full md:max-w-[75%] lg:max-w-[67%] font-semibold h-[3.125rem] mx-auto text-xl disabled:cursor-not-allowed cursor-pointer transition duration-300 ease-out`}
              disabled={!selectedRoute || !!swapData}
              onClick={() => {
                setState(DEXIFIER_STATE.WITHDRAWAL_ADDRESS)
              }}
            >
              Swap Now
            </Button>
          ) : !isWalletConnected ? (
            <WalletConnectModal>
              <Button
                className="h-[50px] w-3/4 lg:w-[67%] mx-auto"
                variant="primary"
              >
                Connect Wallet
              </Button>
            </WalletConnectModal>
          ) : (
            <ConfirmModal>
              <Button
                className={`bg-primary hover:bg-primary-dark text-black w-full md:max-w-[75%] lg:max-w-[67%] font-semibold h-[3.125rem] mx-auto text-xl disabled:cursor-not-allowed cursor-pointer transition duration-300 ease-out`}
                disabled={!selectedRoute || !!swapData}
              >
                Swap Now
              </Button>
            </ConfirmModal>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default DexifierCard;
