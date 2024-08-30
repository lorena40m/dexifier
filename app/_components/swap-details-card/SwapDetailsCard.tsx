"use client";

import Image from "next/image";
import { Swap, TxSwapResponse } from "@/app/types/interface";
import { cancelSwap, getCurrentStep } from "@rango-dev/queue-manager-rango-preset";
import { useAppSelector } from "@/redux_slice/provider";
import { useAccount } from "wagmi";
import { FC, useEffect, useState } from "react";
import { PendingSwap } from "rango-types";
import { getPendingSwaps } from "@/app/utils/queue";
import { useManager } from "@rango-dev/queue-manager-react";
import { getStepState, getSwapDate, getSwapMessages } from "@/app/utils/catch-data";

interface SwapTokenProps {
  swapData: Swap,
  isFrom: boolean
}

interface StepStateProps {
  swap: PendingSwap | undefined,
  currentStop: number
}

const SwapDetailsCard = () => {
  // const account = useAccount();
  const account = { isConnected: true }
  const { manager, state } = useManager();

  const { isInProcess, swapResponse, confirmResponse } = useAppSelector((state) => state.swap);
  const { selectedRoute } = useAppSelector((state) => state.routes);
  const swaps = selectedRoute?.swaps;
  const pendingSwaps = getPendingSwaps(manager);
  const currentStop: number = 1;
  const list: PendingSwap[] = getPendingSwaps(manager).map(({ swap }) => swap);

  console.log("state=>", state);


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
      } catch (e) {
        console.log(e);
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
    return stepDetailMessage
  }

  const StepMessage: FC<StepStateProps> = ({ swap, currentStop }) => {
    const [message, setMessage] = useState<string>();

    // Move useEffect out of the conditional
    useEffect(() => {
      if (swap !== undefined) {
        const state = getStepState(swap.steps[currentStop]);
        if (state !== "default") {
          setMessage(getMessage(currentStop));
        }
      }
    }, [swap, currentStop]);

    if (swap === undefined || !message) {
      return null;
    }

    return (
      <div className="flex items-center justify-center p-3">
        <span className="text-white/50">{message}</span>
      </div>
    );
  };

  const StepState: FC<StepStateProps> = ({ swap, currentStop }) => {

    if (swap === undefined) {
      return
    }
    const state = getStepState(swap.steps[currentStop]);
    return (
      state && <div>{
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
          (state !== "default" && <div className="px-3.5 py-1 border border-primary text-primary w-fit rounded-full flex items-center gap-x-2.5">
            <div className="flex items-center justify-center gap-x-2.5">
              {state === "completed" && <Image
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

  const propertiesContainer = (title: string, value: string) => (
    <div className="mb-7 flex items-center text-xs">
      <div className="w-5/12 font-semibold">{title}</div>
      <div className="w-7/12 text-white/50 ">
        {value.length > 28 ? <>{value.slice(0, 28)}...</> : value}
      </div>
    </div>
  );

  const SwapToken: FC<SwapTokenProps> = ({ swapData, isFrom }) => {
    return (
      <div className="flex flex-col items-center">
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
        <span className="text-xs">{parseFloat(swapData[isFrom ? "fromAmount" : "toAmount"]).toFixed(3)}</span>
        <span className="text-sm">{swapData[isFrom ? "from" : "to"].symbol}</span>
      </div>
    )
  }

  const SwapSteps: FC<SwapTokenProps> = ({ swapData, isFrom }) => {
    return (
      <div className="flex justify-between items-center">
        <div className="relative">
          <Image src={swapData[isFrom ? "from" : "to"].logo || ""} width={25} height={25} alt={`${swapData[isFrom ? "from" : "to"].symbol}'s icon`} />
          <Image
            className="absolute bottom-[-6px] left-[15px]"
            src={swapData[isFrom ? "from" : "to"].blockchainLogo || ""}
            width={15}
            height={15}
            alt={`${swapData[isFrom ? "from" : "to"].blockchain}'s blockchainIcon`}
          />
        </div>
        <span className="text-xs">{parseFloat(swapData[isFrom ? "fromAmount" : "toAmount"]).toFixed(3)}</span>
        <span className="text-xs">{swapData[isFrom ? "from" : "to"].symbol}</span>
      </div>
    )
  }

  return (
    account.isConnected && selectedRoute && (
      <div className="relative lg:h-[34.0625rem] lg:w-full py-[1.8125rem] px-[1.1875rem] rounded-3xl border border-seperator bg-black bg-opacity-5 backdrop-filter backdrop-blur-lg shadow-lg">
        <div className="z-0">
          <h1 className="text-2xl mb-5">Swap Details</h1>
          <div className="overflow-auto h-[435px] px-3">
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
                <span className="text-lg font-semibold">Requested ID:</span>
                <span className="text-sm text-white/50 px-2">
                  {selectedRoute?.requestId?.length > 33 ? (
                    <>{selectedRoute?.requestId?.slice(0, 33)}...</>
                  ) : (
                    selectedRoute?.requestId
                  )}
                </span>
              </h2>
            </div>

            {confirmResponse?.result && swaps && <div className="mb-7 flex flex-col items-center text-xs">
              <div className="flex">
                <SwapToken swapData={swaps[0]} isFrom={true} />
                <div className="border-t border-dashed w-[100px] mt-[30px] mx-2" />
                <SwapToken swapData={swaps[swaps.length - 1]} isFrom={false} />
              </div>
              <div className="w-full mt-4"><span className="text-lg font-semibold">Swap Steps:</span></div>
              <div>
                {swaps && swaps.map((swap, index) => {
                  return (
                    <div key={index} className="mt-4">
                      <div className="grid grid-cols-4 gap-2">
                        <SwapSteps swapData={swap} isFrom={true} />
                        <div className="border-t border-dashed w-[100px] mt-[12px] mx-2" />
                        <SwapSteps swapData={swap} isFrom={false} />

                        <div className="text-white/50 ml-2">
                          {swap && <StepState swap={pendingSwap} currentStop={index} />}
                        </div>
                      </div>
                      {swap && <StepMessage swap={pendingSwap} currentStop={index} />}
                    </div>
                  )
                })}
              </div>
            </div>
            }

          </div>
        </div>
        <div className="absolute lg:max-h-[32.875rem] lg:max-w-[23.875rem] bg-gradient-to-b from-transparent to-[#050F0F] z-10" />
      </div >
    )
  );
};

export default SwapDetailsCard;
