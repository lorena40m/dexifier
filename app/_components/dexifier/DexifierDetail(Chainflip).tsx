"use client";

import Image from "next/image";
import { FC, useMemo } from "react";
import TooltipTemplate from "../common/tooltip-template";
import { BlockchainMeta, Token } from "rango-types/mainApi";
import TokenIcon from "../common/token-icon";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Asset, Chain, Quote, SwapStatusResponseV2 } from "@chainflip/sdk/swap";
import { useWidget } from "@rango-dev/widget-embedded";
import { formatChainName } from "@/app/utils/chainflip";
import { useDexifier } from "@/app/providers/DexifireProvider";

interface SwapTokenProps {
  asset: Asset, // Data related to the token being swapped
  chain: Chain,
  amount: string,
  className?: string,
  variant: "default" | "primary",
}

interface StepStateProps {
  state: string, // Pending swap state
}

type ChainflipData = {
  swapStatus: SwapStatusResponseV2;
  selectedRoute: Quote;
};

const DexifierDetailChainflip = () => {
  const { swapStatus, selectedRoute } = useDexifier() as ChainflipData;
  const { initialize } = useDexifier();
  const isFinished = useMemo(() => swapStatus && (swapStatus.state === "COMPLETED" || swapStatus.state === "FAILED"), [swapStatus])

  return (
    <Card className="max-w-[650px] min-h-[540px] w-full h-full bg-modal/5 border border-[#AAA]/20 backdrop-blur-lg p-2 rounded-[2rem] shadow-lg text-white">
      <CardHeader className="flex flex-row justify-between items-center">
        <h1 className="text-2xl">Swap Details</h1>
      </CardHeader>
      <CardContent className="overflow-auto h-[380px] px-6">
        <div className="mb-8">
          {swapStatus && <div className="flex justify-between">
            <span className="text-lg font-semibold">
              {`${swapStatus.state === "COMPLETED" ? "Finished at" : "Created at"}:`}
            </span>
            {/* <span className="text-sm text-white/50">
              {getSwapDate(pendingSwap)}
            </span> */}
          </div>}
        </div>

        {swapStatus && selectedRoute && <div className="mb-7 flex flex-col items-center text-xs">
          <div className="flex gap-1">
            <SwapToken
              asset={selectedRoute.srcAsset.asset}
              chain={selectedRoute.srcAsset.chain}
              amount={selectedRoute.depositAmount}
              variant={`default`}
              className="flex flex-col"
            />
            <div className="relative border-t border-dashed min-w-24 flex-grow mt-8">
              <div
                className="absolute top-[-12px]"
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
              asset={selectedRoute.destAsset.asset}
              chain={selectedRoute.destAsset.chain}
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
              asset={selectedRoute.srcAsset.asset}
              chain={selectedRoute.srcAsset.chain}
              amount={selectedRoute.depositAmount}
              variant={`primary`}
              className="flex justify-center gap-2"
            />
            <div className="relative border-t border-dashed w-full min-w-24 h-[1px] flex-grow" >
              <div className="absolute w-full -top-3 flex justify-center">
                <TooltipTemplate content={`Chainflip`}>
                  <TokenIcon
                    token={{ image: `https://docs.chainflip.io/chainfliplogo.png`, className: "size-4" }}
                  />
                </TooltipTemplate>
              </div>
            </div>
            <SwapToken
              asset={selectedRoute.destAsset.asset}
              chain={selectedRoute.destAsset.chain}
              amount={selectedRoute.egressAmount}
              variant={`primary`}
              className="flex justify-center gap-2"
            />
            <div className="text-white/50 ml-2 col-span-2">
              <StepState state={swapStatus.state} />
            </div>
          </div>
        </div>}
      </CardContent>
      <CardFooter>
        <Button
          className={cn('h-12 mx-auto', isFinished ? 'opacity-80' : 'hover:opacity-80')}
          variant="outline"
          onClick={initialize}
          disabled={isFinished}
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
const StepState: FC<StepStateProps> = ({ state }) => {
  return (
    state && <div className="flex justify-center items-center">
      <div className="px-3.5 py-1 border border-primary text-primary w-fit rounded-full flex items-center gap-x-2.5">
        <div className="flex items-center justify-center gap-x-2.5">
          {state === "COMPLETED" ?
            <Image
              src={"/assets/icons/check-filled.png"}
              width={11}
              height={11}
              alt="checked icon"
            /> :
            <Image
              src={"/assets/loader.png"}
              width={10}
              height={10}
              alt="Loader"
              className="animate-spin"
            />
          }
          <span>{state}</span>
        </div>
      </div>
    </div>
  )
};

export default DexifierDetailChainflip;