"use client";
// This component displays the details of a swap transaction, including the tokens involved, swap status, and swap steps. 
// It provides functionality to cancel or delete a swap, and shows detailed information about each step of the swap process.
import Image from "next/image";
import Link from "next/link";
import { cancelSwap } from "@rango-dev/queue-manager-rango-preset";
import { FC, useEffect, useState } from "react";
import { PendingSwap } from "rango-types";
import { useManager } from "@rango-dev/queue-manager-react";
import ButtonCopyIcon from "../common/coyp-button-icon";
import TooltipTemplate from "../common/tooltip-template";
import { ConfirmRouteResponse, MultiRouteSimulationResult, SwapResult } from "rango-types/mainApi";
import { getSwapMessages, getSwapDate, getStepState, getPendingSwaps } from "@/app/utils/swap";
import TokenIcon from "../common/token-icon";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useDexifier } from "@/app/providers/DexifierProvider";

interface SwapTokenProps {
  swapData: SwapResult, // Data related to the token being swapped
  isFrom: boolean, // Flag indicating if it's the 'from' token
  className?: string
}

interface StepStateProps {
  swap: PendingSwap | undefined, // Pending swap data
  currentStep: number // Current step of the swap process
}

type RangoData = {
  swapData: ConfirmRouteResponse;
  selectedRoute: MultiRouteSimulationResult;
};


const DexifierDetailRango = () => {
  const { manager } = useManager(); // Manager from the Rango queue

  const isSwapMade = false;
  const { selectedRoute, swapData } = useDexifier() as RangoData;
  const { initialize } = useDexifier();
  const swaps = selectedRoute.swaps; // List of swaps involved in the current route
  const pendingSwaps = getPendingSwaps(manager); // Fetch pending swaps from the manager

  const selectedSwap = swapData.result?.requestId
    ? pendingSwaps.find(({ swap }) => swap.requestId === swapData.result?.requestId)
    : undefined;
  const pendingSwap = selectedSwap?.swap; // Get the selected swap from the pending swaps

  // Handle canceling the swap
  const onCancel = () => {
    if (selectedSwap && manager) {
      const swap = manager.get(selectedSwap.id);
      if (swap) {
        cancelSwap(swap);
        initialize();
      }
    }
  };

  // Handle deleting the swap
  const onDelete = async () => {
    if (selectedSwap && manager) {
      manager.deleteQueue(selectedSwap.id);
      initialize();
    }
  };

  // Fetch the message for a particular step of the swap process
  const getMessage = (index: number) => {
    if (!pendingSwap) return;
    const currentStep = pendingSwap.steps[index];
    const stepMessage = getSwapMessages(pendingSwap, currentStep); // Get message for the current step
    const stepDetailMessage = stepMessage.detailedMessage.content || stepMessage.shortMessage;
    return stepDetailMessage;
  };

  // Component to display the step message of the swap
  const StepMessage: FC<StepStateProps> = ({ swap, currentStep }) => {
    const [message, setMessage] = useState<string>();

    useEffect(() => {
      if (swap !== undefined) {
        const state = getStepState(swap.steps[currentStep]); // Get the state of the current step
        if (state !== "default") {
          setMessage(getMessage(currentStep)); // Set the message for the step
        }
      }
    }, [swap, currentStep]);

    if (swap === undefined || !message) {
      return null;
    }

    return (
      <div className="flex items-center justify-center p-3">
        <span className="text-white/50 text-center">{message.replace('Rango', 'Dexifier')}</span>
      </div>
    );
  };

  return selectedRoute && (
    <Card className="max-w-[650px] min-h-[540px] w-full h-full bg-modal/5 border border-[#AAA]/20 backdrop-blur-lg p-2 rounded-[2rem] shadow-lg text-white">
      <CardHeader className="flex flex-row justify-between items-center">
        <h1 className="text-2xl">Swap Details</h1>
        <button
          className="text-red-700 hover:opacity-50 text-lg font-bold"
          onClick={onDelete}
          disabled={!selectedSwap?.id}
        >
          delete
        </button>
      </CardHeader>
      <CardContent className="overflow-auto h-[380px] px-6">
        <div className="mb-8">
          {pendingSwap && <div className="flex justify-between">
            <span className="text-lg font-semibold">
              {`${pendingSwap.finishTime ? "Finished at" : "Created at"}:`}
            </span>
            <span className="text-sm text-white/50">
              {getSwapDate(pendingSwap)}
            </span>
          </div>}
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Requested ID:</span>
            <div className="flex gap-2">
              <span className="text-sm text-white/50">
                {selectedRoute.requestId.length > 40 ? (
                  <>{selectedRoute.requestId.slice(0, 40)}...</>
                ) : (
                  selectedRoute.requestId
                )}
              </span>
              <ButtonCopyIcon text={selectedRoute.requestId} />
              <Link href={`https://explorer.dexifier.com/swap/${selectedRoute.requestId}`} target="_blank">
                <Image src={"/assets/icons/search-list.png"} width={22} height={22} alt="explorer" />
              </Link>
            </div>
          </div>
        </div>

        {(swapData as ConfirmRouteResponse).result && swaps && <div className="mb-7 flex flex-col items-center text-xs">
          <div className="flex gap-1">
            <SwapToken swapData={swaps[0]} isFrom={true} />
            <div className="relative border-t border-dashed min-w-24 flex-grow mt-8">
              {swaps && swaps.map((swap, index) => {
                const percentage = ((index + 1) / (swaps.length + 1)) * 100; // Calculate percentage for left
                return (
                  <div
                    key={index}
                    className="absolute top-[-12px]"
                    style={{
                      left: `${percentage}%`,
                      transform: 'translateX(-50%)', // Center each element on its left position
                    }}
                  >
                    <TooltipTemplate content={swap.swapperId}>
                      <Image src={swap.swapperLogo} width={25} height={25} alt="swapLogo" />
                    </TooltipTemplate>
                  </div>
                );
              })}
            </div>
            <SwapToken swapData={swaps[swaps.length - 1]} isFrom={false} />
          </div>
          <div className="w-full mt-4">
            <span className="text-lg font-semibold">Swap Steps:</span>
          </div>
          <div>
            {swaps && swaps.map((swap, index) => {
              return (
                <div key={index} className="mt-4">
                  <div className="flex items-center gap-1">
                    <SwapSteps swapData={swap} isFrom={true} />
                    <div className="relative border-t border-dashed w-full min-w-24 h-[1px] flex-grow" >
                      <div className="absolute w-full -top-3 flex justify-center">
                        <TooltipTemplate content={swap.swapperId}>
                          <TokenIcon
                            token={{ image: swap.swapperLogo, className: "size-6" }}
                          />
                        </TooltipTemplate>
                      </div>
                    </div>
                    <SwapSteps swapData={swap} isFrom={false} />
                    <div className="text-white/50 ml-2 col-span-2">
                      {swap && <StepState swap={pendingSwap} currentStep={index} />}
                    </div>
                  </div>
                  {swap && <StepMessage swap={pendingSwap} currentStep={index} />}
                </div>
              )
            })}
          </div>
        </div>}
      </CardContent>
      <CardFooter>
        <Button
          className={cn('h-12 mx-auto', isSwapMade ? 'opacity-80' : 'hover:opacity-80')}
          variant="outline"
          onClick={onCancel}
          disabled={isSwapMade}
        >
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}

// Component to display token details for the swap
const SwapToken: FC<SwapTokenProps> = ({ className, swapData, isFrom }) => {
  return (
    <div className={`${className} flex flex-col items-center`}>
      <div className="size-16 p-2 border border-white border-dashed rounded-full">
        <TokenIcon
          token={{
            image: swapData[isFrom ? "from" : "to"].logo,
            alt: swapData[isFrom ? "from" : "to"].symbol,
          }}
          blockchain={{
            image: swapData[isFrom ? "from" : "to"].blockchainLogo,
            alt: swapData[isFrom ? "from" : "to"].blockchain,
            className: "size-6",
          }}
        />
      </div>
      <span className="text-xs">
        {parseFloat(swapData[isFrom ? "fromAmount" : "toAmount"]).toFixed(2)}
      </span>
      <span className="text-sm">
        {swapData[isFrom ? "from" : "to"].symbol}
      </span>
    </div>
  );
};

// Component to display the step state of the swap (in-progress, completed, etc.)
const StepState: FC<StepStateProps> = ({ swap, currentStep }) => {
  if (swap === undefined) {
    return null;
  }
  const state = getStepState(swap.steps[currentStep]); // Get the state of the current step
  return (
    state && <div className="flex justify-center items-center">{
      state === "in-progress" ?
        <div className="px-3.5 py-1 border border-primary text-primary w-fit rounded-full flex items-center gap-x-2.5">
          <div className="flex items-center justify-center gap-x-2.5">
            <Image
              src={"/assets/loader.png"}
              width={10}
              height={10}
              alt="Loader"
              className="animate-spin"
            />
            <span>Running</span>
          </div>
        </div> :
        (
          state !== "default" &&
          <div className="px-3.5 py-1 border border-primary text-primary w-fit rounded-full flex items-center gap-x-2.5">
            <div className="flex items-center justify-center gap-x-2.5">
              {state === "completed" &&
                <Image
                  src={"/assets/icons/check-filled.png"}
                  width={11}
                  height={11}
                  alt="checked icon"
                />}
              <span>{state}</span>
            </div>
          </div>
        )
    }
    </div>
  )
};

// Component to display the steps of the swap, showing each step's details
const SwapSteps: FC<SwapTokenProps> = ({ className, swapData, isFrom }) => {
  return (
    <div className={`${className} flex justify-center gap-2  items-center`}>
      <TokenIcon
        token={{
          image: swapData[isFrom ? "from" : "to"].logo,
          alt: swapData[isFrom ? "from" : "to"].symbol,
          className: "size-8",
        }}
        blockchain={{
          image: swapData[isFrom ? "from" : "to"].blockchainLogo,
          alt: swapData[isFrom ? "from" : "to"].blockchain,
          className: "size-4",
        }}
      />
      <span className="text-xs">
        {parseFloat(swapData[isFrom ? "fromAmount" : "toAmount"]).toFixed(2)}
      </span>
      <span className="text-xs">
        {swapData[isFrom ? "from" : "to"].symbol}
      </span>
    </div>
  );
};

export default DexifierDetailRango;