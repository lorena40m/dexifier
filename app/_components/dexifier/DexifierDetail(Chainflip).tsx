"use client";

import Image from "next/image";
import { FC, useEffect, useMemo, useState } from "react";
import TooltipTemplate from "../common/tooltip-template";
import { BlockchainMeta, Token } from "rango-types/mainApi";
import TokenIcon from "../common/token-icon";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn, toastError } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Asset, Chain, Quote, SwapStatusResponseV2 } from "@chainflip/sdk/swap";
import { useWidget } from "@rango-dev/widget-embedded";
import { formatChainName } from "@/app/utils/chainflip";
import { useDexifier } from "@/app/providers/DexifireProvider";
import { Skeleton } from "@/components/ui/skeleton";
import QrCodeGenerator from "../common/qr-generator";
import CopyText from "../common/copy-text";
import { MdOutlineCancel } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import { RiLoader5Line } from "react-icons/ri";

interface SwapTokenProps {
  asset: Asset, // Data related to the token being swapped
  chain: Chain,
  amount: string,
  className?: string,
  variant: "default" | "primary",
}

interface StepStateProps {
  state: SwapStatusResponseV2['state'], // Pending swap state
  color: string,
  content?: string,
}

type ChainflipData = {
  swapStatus: SwapStatusResponseV2 | undefined;
  selectedRoute: Quote | undefined;
};

const DexifierDetailChainflip = () => {
  const { swapStatus, selectedRoute } = useDexifier() as ChainflipData;
  const { walletFrom, initialize, sendTx, stopConfirming } = useDexifier();
  const isFinished = useMemo(() => swapStatus && swapStatus.state === "SENT", [swapStatus])
  const isFailed = useMemo(() => swapStatus && swapStatus.state === "FAILED", [swapStatus])

  const [message, setMessage] = useState<StepStateProps>({ state: 'WAITING', color: 'text-white/50' });
  const depositAddress = useMemo(() => swapStatus?.depositChannel?.depositAddress || '', [swapStatus]);

  const colors: Record<StepStateProps['state'], string> = {
    FAILED: 'text-red-500',
    WAITING: 'text-white/50',
    RECEIVING: 'text-white/50',
    SWAPPING: 'text-white/50',
    SENDING: 'text-white/50',
    SENT: 'text-green-600',
    COMPLETED: 'text-green-600',
  }

  useEffect(() => {
    const initializeTx = async () => {
      if (depositAddress) {
        const resp = await sendTx(depositAddress)
        if (resp?.success === false) {
          stopConfirming()
          toastError(resp.data.root)
          setMessage({
            state: 'FAILED',
            color: colors['FAILED'],
            content: resp.data.root
          })
        }
      }
    }
    initializeTx()
  }, [depositAddress])

  const handleRetry = () => {

  }

  return (
    <Card className="max-w-[650px] min-h-[540px] w-full h-full bg-modal/5 border border-[#AAA]/20 backdrop-blur-lg p-2 rounded-[2rem] shadow-lg text-white">
      <CardHeader className="flex flex-row justify-between items-center">
        <h1 className="text-2xl">Swap Details</h1>
      </CardHeader>
      <CardContent className="overflow-auto h-[380px] px-6">
        {swapStatus ?
          <>
            {(typeof walletFrom === 'string') &&
              <div className="w-full mb-4">
                <span className="text-lg font-semibold">Deposit Address:</span>
                <div id="deposit" className={`relative flex max-w-full overflow-hidden justify-between items-center p-3 shadow-md max-h-[3.3125rem] bg-transparent`}>
                  <CopyText text={depositAddress} className="flex max-w-full">
                    <span className="w-full pr-6 text-primary text-base bg-transparent rounded-md cursor-pointer truncate">
                      {depositAddress}
                    </span>
                  </CopyText>
                  <div className="absolute right-2 place-items-center">
                    <QrCodeGenerator text={depositAddress} />
                  </div>
                </div>
              </div>
            }

            <div className="w-full mb-4">
              <span className="text-lg font-semibold">Withdrawal Address:</span>
              <div id="withdraw" className={`relative flex max-w-full overflow-hidden p-3 shadow-md max-h-[3.3125rem] bg-transparent`}>
                <span className="w-full pr-6 text-primary text-base bg-transparent rounded-md cursor-pointer truncate">
                  {swapStatus.destAddress}
                </span>
              </div>
            </div>

            {selectedRoute && <div className="mb-7 flex flex-col items-center text-xs">
              <div className="flex gap-1">
                <SwapToken
                  asset={swapStatus.srcAsset}
                  chain={swapStatus.srcChain}
                  amount={selectedRoute.depositAmount}
                  variant={`default`}
                  className="flex flex-col"
                />
                <div className="relative border-t border-dashed min-w-24 flex-grow mt-8">
                  <div
                    className="absolute -top-3"
                    style={{
                      left: `50%`,
                      transform: 'translateX(-50%)', // Center each element on its left position
                    }}
                  >
                    <TooltipTemplate content={`Chainflip`}>
                      <TokenIcon
                        token={{ image: `https://docs.chainflip.io/chainfliplogo.png`, className: "size-6" }}
                      />
                    </TooltipTemplate>
                  </div>
                </div>
                <SwapToken
                  asset={swapStatus.destAsset}
                  chain={swapStatus.destChain}
                  amount={selectedRoute.egressAmount}
                  variant={`default`}
                  className="flex flex-col"
                />
              </div>
              <div className="w-full mt-4">
                <span className="text-lg font-semibold">Swap Steps:</span>
              </div>
              <div className="mt-4 flex items-center gap-1">
                <SwapToken
                  asset={swapStatus.srcAsset}
                  chain={swapStatus.srcChain}
                  amount={selectedRoute.depositAmount}
                  variant={`primary`}
                  className="flex justify-center gap-2"
                />
                <div className="relative border-t border-dashed w-full min-w-24 h-[1px] flex-grow" >
                  <div className="absolute w-full -top-2 flex justify-center">
                    <TooltipTemplate content={`Chainflip`}>
                      <TokenIcon
                        token={{ image: `https://docs.chainflip.io/chainfliplogo.png`, className: "size-4" }}
                      />
                    </TooltipTemplate>
                  </div>
                </div>
                <SwapToken
                  asset={swapStatus.destAsset}
                  chain={swapStatus.destChain}
                  amount={selectedRoute.egressAmount}
                  variant={`primary`}
                  className="flex justify-center gap-2"
                />
                <div className="text-white/50 ml-2 col-span-2">
                  <StepState {...message} />
                </div>
              </div>
              <div className="flex items-center justify-center p-3 text-sm">
                <span className={cn(message.color, 'text-center first-letter:uppercase')}>{message.content}</span>
              </div>
            </div>}
          </>
          :
          <div className="grid gap-4">
            <Skeleton className="h-8 w-1/3 rounded-lg" />
            <Skeleton className="h-6 w-2/3 rounded-lg" />
            <div className="flex justify-center items-center gap-2 my-6">
              <Skeleton className="size-16 rounded-full" />
              <Skeleton className="h-4 w-1/5 rounded-lg" />
              <Skeleton className="size-16 rounded-full" />
            </div>
            <div className="flex justify-center items-center gap-2 my-4">
              <Skeleton className="size-12 rounded-full" />
              <Skeleton className="h-3 w-1/4 rounded-lg" />
              <Skeleton className="size-12 rounded-full" />
              <Skeleton className="h-8 w-16 rounded-lg" />
            </div>
            <Skeleton className="h-4 w-32 rounded-lg justify-self-center" />
          </div>
        }
      </CardContent>
      <CardFooter>
        <Button
          className={cn('h-12 mx-auto')}
          variant="outline"
          onClick={isFailed ? handleRetry
            :
            isFinished ? initialize
              :
              initialize
          }
        >
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

// Component to display token details for the swap
const SwapToken: FC<SwapTokenProps> = ({ asset, chain, amount, className, variant }) => {
  const { meta } = useWidget();  // Getting metadata
  const { tokens, blockchains } = meta;  // Extracting tokens & blockchains from the metadata

  const token: Token = tokens.find((token: Token) => formatChainName(token.blockchain) === chain && token.name === asset)
  const blockchain: BlockchainMeta = blockchains.find((blockchain: BlockchainMeta) => formatChainName(blockchain.name) === chain)

  return (
    <div className={`${className} items-center`}>
      <div className={cn(variant === "default" && "size-16 p-2 border border-white border-dashed rounded-full")}>
        <TokenIcon
          token={{
            image: token.image,
            alt: token.symbol,
            className: variant === "default" ? "size-10" : "size-8"
          }}
          blockchain={{
            image: blockchain.logo,
            alt: blockchain.name,
            className: variant === "default" ? "size-6" : "size-4"
          }}
        />
      </div>
      <span className="text-xs">
        {(Number(amount) / (10 ** token.decimals)).toFixed(2)}
      </span>
      <span className={cn(variant === "default" ? "text-sm" : "text-xs")}>
        {token.symbol}
      </span>
    </div>
  );
};

// Component to display the step state of the swap
const StepState: FC<StepStateProps> = ({ state, color }) => {
  const renderIcon = () => {
    switch (state) {
      case 'SENT':
        return <GiCheckMark className={cn("size-4", color)} strokeWidth={4} />
      case 'FAILED':
        return <MdOutlineCancel className={cn("size-4", color)} />
      default:
        return <RiLoader5Line className={cn("size-3 animate-spin")} strokeWidth={4} />;
    }
  }

  return (
    <div className="flex justify-center items-center">
      <div className="px-3.5 py-1 border border-primary text-primary w-fit rounded-full flex items-center gap-x-2.5">
        <div className="flex items-center justify-center gap-x-2.5">
          {renderIcon()}
          <span className={cn("uppercase", color)}>{state}</span>
        </div>
      </div>
    </div>
  )
};

export default DexifierDetailChainflip;