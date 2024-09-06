"use client";

import Image from "next/image";
import { Swap } from "@/app/types/interface";
import { cancelSwap } from "@rango-dev/queue-manager-rango-preset";
import { useAppSelector } from "@/redux_slice/provider";
import { FC, useEffect, useState } from "react";
import { PendingSwap } from "rango-types";
import { getPendingSwaps } from "@/app/utils/queue";
import { useManager } from "@rango-dev/queue-manager-react";
import { getStepState, getSwapDate, getSwapMessages } from "@/app/utils/catch-data";
import { resetSwap, updateSwapMade, updateSwapStatus } from "@/redux_slice/slice/browserSlice/swapSlice";
import { useDispatch } from "react-redux";
import { updateTokenValue } from "@/redux_slice/slice/browserSlice/tokenSlice";
import { resetRoute } from "@/redux_slice/slice/browserSlice/routeSlice";
import ButtonCopyIcon from "../common/coypButtonIcon";
import ShadowDecoration from "../common/shadowDecoration";
import ImageWrapper from "../common/imageWrapper";
import TooltipTemplate from "../common/tooltip-template";
import Link from "next/link";

interface SwapTokenProps {
  swapData: Swap,
  isFrom: boolean,
  className?: string
}

interface StepStateProps {
  swap: PendingSwap | undefined,
  currentStep: number
}

const SwapDetailsCard = ({ isWalletConnected }: { isWalletConnected: boolean }) => {
  const { manager, state } = useManager();
  const dispatch = useDispatch();

  const { isSwapMade, confirmResponse } = useAppSelector((state) => state.swap);
  const { selectedRoute } = useAppSelector((state) => state.routes);
  const swaps = selectedRoute?.swaps;
  const pendingSwaps = getPendingSwaps(manager);
  const list: PendingSwap[] = getPendingSwaps(manager).map(({ swap }) => swap);

  console.log("state=>", state, confirmResponse);

  const selectedSwap = confirmResponse?.result?.requestId
    ? pendingSwaps.find(({ swap }) => swap.requestId === confirmResponse?.result?.requestId)
    : undefined;

  const onCancel = () => {
    if (selectedSwap?.id) {
      const swap = manager?.get(selectedSwap.id);
      if (swap) {
        cancelSwap(swap);
      }
    }
  };

  const onDelete = async () => {
    if (selectedSwap?.id) {
      try {
        manager?.deleteQueue(selectedSwap.id);
        dispatch(updateTokenValue({ isFromToken: true, value: "0" }))
        dispatch(updateSwapStatus({ isInProcess: false }))
        dispatch(resetRoute());
        dispatch(resetSwap());
      } catch (e) {
        console.log("delete Error", e);
      }
    }
  };
  const pendingSwap = selectedSwap?.swap;

  const getMessage = (index: number) => {
    if (pendingSwap === undefined) {
      return
    }

    const currentStep = pendingSwap.steps[index];

    const stepMessage = getSwapMessages(pendingSwap, currentStep);
    const stepDetailMessage =
      stepMessage.detailedMessage.content || stepMessage.shortMessage;
    console.log("stepMessage.detailedMessage.content", stepMessage.detailedMessage.content, "stepMessage.shortMessage", stepMessage.shortMessage);

    return stepDetailMessage
  }

  useEffect(() => {
    if (selectedSwap?.swap.status === "success" || selectedSwap?.swap.status === "failed") {
      dispatch(updateSwapMade({ isSwapMade: true }));
      dispatch(updateSwapStatus({ isInProcess: false }));
    }
  }, [selectedSwap?.swap.status])

  const StepMessage: FC<StepStateProps> = ({ swap, currentStep }) => {
    const [message, setMessage] = useState<string>();

    // Move useEffect out of the conditional
    useEffect(() => {
      if (swap !== undefined) {
        const state = getStepState(swap.steps[currentStep]);
        if (state !== "default") {
          setMessage(getMessage(currentStep));
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

  const StepState: FC<StepStateProps> = ({ swap, currentStep }) => {
    if (swap === undefined) {
      return
    }
    const state = getStepState(swap.steps[currentStep]);
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
  }

  console.log("list==>", list);

  const SwapToken: FC<SwapTokenProps> = ({ className, swapData, isFrom }) => {
    return (
      <div className={`${className} flex flex-col items-center`}>
        <div className="w-[60px] h-[60px] p-3 border border-white border-dashed rounded-full">
          <div className="relative">
            <ImageWrapper>
              <Image src={swapData[isFrom ? "from" : "to"].logo || ""} width={35} height={35} alt={`${swapData[isFrom ? "from" : "to"].symbol}'s icon`} />
            </ImageWrapper>
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
          {parseFloat(swapData[isFrom ? "fromAmount" : "toAmount"]).toFixed(3)}
        </span>
        <span className="text-sm">
          {swapData[isFrom ? "from" : "to"].symbol}
        </span>
      </div>
    )
  }

  const SwapSteps: FC<SwapTokenProps> = ({ className, swapData, isFrom }) => {
    return (
      <div className={`${className} flex justify-center gap-2  items-center`}>
        <div className="relative">
          <ImageWrapper>
            <Image src={swapData[isFrom ? "from" : "to"].logo || ""}
              width={25}
              height={25}
              alt={`${swapData[isFrom ? "from" : "to"].symbol}'s icon`}
            />
          </ImageWrapper>
          <Image
            className="absolute bottom-[-6px] left-[15px]"
            src={swapData[isFrom ? "from" : "to"].blockchainLogo || ""}
            width={15}
            height={15}
            alt={`${swapData[isFrom ? "from" : "to"].blockchain}'s blockchainIcon`}
          />
        </div>
        <span className="text-xs">
          {parseFloat(swapData[isFrom ? "fromAmount" : "toAmount"]).toFixed(3)}
        </span>
        <span className="text-xs">
          {swapData[isFrom ? "from" : "to"].symbol}
        </span>
      </div>
    )
  }

  return (
    isWalletConnected && selectedRoute && (
      <div className="relative !bg-[#0b4b2f26] lg:h-[34.0625rem] lg:w-full py-[1.8125rem] px-[1.1875rem] rounded-3xl border border-seperator bg-black bg-opacity-5 backdrop-filter backdrop-blur-lg shadow-lg">
        <div className="z-0">
          <div className="flex justify-between">
            <h1 className="text-2xl mb-5">Swap Details</h1>
            <button
              className="text-red-700 hover:opacity-80 mx-[20px] text-lg font-bold"
              onClick={onDelete}
              disabled={selectedSwap?.id === undefined}>
              delete
            </button>
          </div>
          <div className="relative">
            {/* <ShadowDecoration /> */}
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
                    <Link href={`https://explorer.rango.exchange/swap/${selectedRoute?.requestId}`} target="_blank">
                      <Image src={"/assets/icons/search-list.png"} width={22} height={22} alt="explorer" />
                    </Link>
                  </div>
                </h2>
              </div>

              {confirmResponse?.result && swaps && <div className="mb-7 flex flex-col items-center text-xs">
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
                          <SwapSteps className={"col-span-3"} swapData={swap} isFrom={true} />

                          <div className="relative col-span-3 border-t border-dashed w-full mt-[12px]" >
                            <div className="absolute top-[-10px] right-[45%]">
                              <TooltipTemplate content={swap.swapperId}>
                                <Image src={swap.swapperLogo} width={21} height={21} alt="swapLogo" />
                              </TooltipTemplate>
                            </div>

                          </div>
                          <SwapSteps className={"col-span-3"} swapData={swap} isFrom={false} />

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
              className={`m-auto border border-primary rounded-xl p-6 py-2 ${isSwapMade ? "opacity-80" : "hover:opacity-80"}`}
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
