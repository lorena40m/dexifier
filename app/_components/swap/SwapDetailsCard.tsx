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
import { SwapResult } from "rango-types/mainApi";
import { useSwap } from "@/app/providers/SwapProvider";
import { getSwapMessages, getSwapDate, getStepState, getPendingSwaps } from "@/app/utils/swap";

interface SwapTokenProps {
  swapData: SwapResult, // Data related to the token being swapped
  isFrom: boolean, // Flag indicating if it's the 'from' token
  className?: string
}

interface StepStateProps {
  swap: PendingSwap | undefined, // Pending swap data
  currentStep: number // Current step of the swap process
}

const SwapDetailsCard = () => {
  const { manager } = useManager(); // Manager from the Rango queue

  const isSwapMade = false;
  const { selectedRoute, confirmData, setConfirmData, setSelectedRoute } = useSwap();
  const swaps = selectedRoute?.swaps; // List of swaps involved in the current route
  const pendingSwaps = getPendingSwaps(manager); // Fetch pending swaps from the manager

  const selectedSwap = confirmData?.result?.requestId
    ? pendingSwaps.find(({ swap }) => swap.requestId === confirmData?.result?.requestId)
    : undefined;
  const pendingSwap = selectedSwap?.swap; // Get the selected swap from the pending swaps

  // Handle canceling the swap
  const onCancel = () => {
    if (selectedSwap && manager) {
      const swap = manager.get(selectedSwap.id);
      if (swap) {
        cancelSwap(swap);
        setConfirmData(undefined);
        setSelectedRoute(undefined);
      }
    }
  };

  // Handle deleting the swap
  const onDelete = async () => {
    if (selectedSwap && manager) {
      manager.deleteQueue(selectedSwap.id);
      setConfirmData(undefined);
      setSelectedRoute(undefined);
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
        <span className="text-white/50">{message}</span>
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

  // Component to display token details for the swap
  const SwapToken: FC<SwapTokenProps> = ({ className, swapData, isFrom }) => {
    return (
      <div className={`${className} flex flex-col items-center`}>
        <div className="w-[60px] h-[60px] p-3 border border-white border-dashed rounded-full">
          <div className="relative">
            <Image src={swapData[isFrom ? "from" : "to"].logo || ""} width={35} height={35} alt={`${swapData[isFrom ? "from" : "to"].symbol}'s icon`} />
            <Image
              className="absolute bottom-[-6px] left-[20px]"
              src={swapData[isFrom ? "from" : "to"].blockchainLogo || ""}
              width={20}
              height={20}
              alt={`${swapData[isFrom ? "from" : "to"].blockchain}'s blockchainIcon`}
            />
          </div>
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

  // Component to display the steps of the swap, showing each step's details
  const SwapSteps: FC<SwapTokenProps> = ({ className, swapData, isFrom }) => {
    return (
      <div className={`${className} flex justify-center gap-2  items-center`}>
        <div className="relative">
          <Image src={swapData[isFrom ? "from" : "to"].logo || ""}
            width={25}
            height={25}
            alt={`${swapData[isFrom ? "from" : "to"].symbol}'s icon`}
          />
          <Image
            className="absolute bottom-[-6px] left-[15px]"
            src={swapData[isFrom ? "from" : "to"].blockchainLogo || ""}
            width={15}
            height={15}
            alt={`${swapData[isFrom ? "from" : "to"].blockchain}'s blockchainIcon`}
          />
        </div>
        <span className="text-xs">
          {parseFloat(swapData[isFrom ? "fromAmount" : "toAmount"]).toFixed(2)}
        </span>
        <span className="text-xs">
          {swapData[isFrom ? "from" : "to"].symbol}
        </span>
      </div>
    );
  };

  return (
    selectedRoute && confirmData && (
      <div className="relative bg-modal max-w-[650px] min-h-[540px] p-6 rounded-3xl border border-[#AAA]/20 backdrop-blur-lg shadow-lg">
        <div className="z-0">
          <div className="flex justify-between">
            <h1 className="text-2xl mb-5">Swap Details</h1>
            <button
              className="text-red-700 disabled:cursor-not-allowed hover:opacity-80 mx-[20px] text-lg font-bold"
              onClick={onDelete}
              disabled={selectedSwap?.id === undefined}>
              delete
            </button>
          </div>
          <div className="relative">
            <div className="overflow-auto h-[380px] px-3">
              <div className="mb-8 text-xs">
                {pendingSwap && <div className="flex justify-between">
                  <span className="text-lg font-semibold">
                    {`${pendingSwap.finishTime ? "Finished at" : "Created at"}:`}
                  </span>
                  <span className="text-sm text-white/50 px-2">
                    {getSwapDate(pendingSwap)}
                  </span>
                </div>}

                <h2>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">Requested ID:</span>
                    <span className="text-sm text-white/50 px-2">
                      {selectedRoute?.requestId?.length > 40 ? (
                        <>{selectedRoute?.requestId?.slice(0, 40)}...</>
                      ) : (
                        selectedRoute?.requestId
                      )}
                    </span>
                    <ButtonCopyIcon text={selectedRoute?.requestId} />
                    <Link href={`https://explorer.dexifier.com/swap/${selectedRoute?.requestId}`} target="_blank">
                      <Image src={"/assets/icons/search-list.png"} width={22} height={22} alt="explorer" />
                    </Link>
                  </div>
                </h2>
              </div>

              {confirmData?.result && swaps && <div className="mb-7 flex flex-col items-center text-xs">
                <div className="flex">
                  <SwapToken swapData={swaps[0]} isFrom={true} />
                  <div className="relative border-t border-dashed w-[100px] mt-[30px] mx-2">
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
                        <div className="grid grid-cols-11">
                          <SwapSteps className={"md:col-span-3 col-span-4"} swapData={swap} isFrom={true} />

                          <div className="relative md:col-span-3 col-span-1 border-t border-dashed w-full mt-[12px]" >
                            <div className="absolute top-[-10px] right-[10%] md:right-[40%]">
                              <TooltipTemplate content={swap.swapperId}>
                                <Image src={swap.swapperLogo} width={21} height={21} alt="swapLogo" />
                              </TooltipTemplate>
                            </div>

                          </div>
                          <SwapSteps className={"md:col-span-3 col-span-4"} swapData={swap} isFrom={false} />

                          <div className="text-white/50 ml-2 col-span-2">
                            {swap && <StepState swap={pendingSwap} currentStep={index} />}
                          </div>
                        </div>
                        {swap && <StepMessage swap={pendingSwap} currentStep={index} />}
                      </div>
                    )
                  })}
                </div>
              </div>
              }
            </div>
          </div>
          <div className="flex my-2">
            <button
              className={`m-auto border disabled:cursor-not-allowed border-primary rounded-xl p-6 py-2 ${isSwapMade ? "opacity-80" : "hover:opacity-80"}`}
              onClick={onCancel}
              disabled={isSwapMade}>
              <span className="text-lg">Cancel</span>
            </button>
          </div>
        </div>
        <div className="absolute lg:max-h-[32.875rem] lg:max-w-[23.875rem] bg-gradient-to-b from-transparent to-[#050F0F] z-10" />
      </div >
    )
  );
};

export default SwapDetailsCard;