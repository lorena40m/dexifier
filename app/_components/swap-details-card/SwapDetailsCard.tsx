"use client";

import Image from "next/image";
import { TxSwapResponse } from "@/app/types/interface";
import { useAppSelector } from "@/redux_slice/provider";
import { useAccount } from "wagmi";

const SwapDetailsCard = () => {
  const account = useAccount();
  const { isInProcess, swapResponse } = useAppSelector((state) => state.swap);

  const propertiesContainer = (title: string, value: string) => (
    <div className="mb-7 flex items-center text-xs">
      <div className="w-5/12 font-semibold">{title}</div>
      <div className="w-7/12 text-white/50 ">
        {value.length > 28 ? <>{value.slice(0, 28)}...</> : value}
      </div>
    </div>
  );

  return (
    account.isConnected && (
      <div className="relative lg:h-[34.0625rem] lg:w-full py-[1.8125rem] px-[1.1875rem] rounded-3xl border border-seperator bg-black bg-opacity-5 backdrop-filter backdrop-blur-lg shadow-lg">
        <div className="z-0">
          <h1 className="text-2xl mb-5">Swap Details</h1>

          <div className="mb-8 text-xs">
            <h2 className="mb-2">
              {isInProcess
                ? " "
                : `Swap from 
              ${swapResponse.route?.from.symbol} (on ${swapResponse.route?.from.blockchain}) 
              to 
              ${swapResponse.route?.to.symbol} (on ${swapResponse.route?.to.blockchain})`}
            </h2>

            <h2>
              <span className="font-semibold">Requested ID:</span>{" "}
              <span className="text-white/50">
                {swapResponse?.requestId?.length > 33 ? (
                  <>{swapResponse?.requestId?.slice(0, 33)}...</>
                ) : (
                  swapResponse?.requestId
                )}
              </span>
            </h2>
          </div>

          <div className="mb-7 flex items-center text-xs">
            <div className="w-5/12 font-semibold">Swap Status</div>
            <div className="w-7/12 text-white/50">
              <div className="px-3.5 py-1 border border-primary text-primary w-fit rounded-full flex items-center gap-x-2.5">
                {isInProcess ? (
                  <div className="flex items-center justify-center gap-x-2.5">
                    <Image
                      src={"/assets/loader.png"}
                      width={10}
                      height={10}
                      alt="Loader"
                      className="animate-spin"
                    />{" "}
                    <span>Running</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-x-2.5">
                    <Image
                      src={"/assets/icons/check-filled.png"}
                      width={11}
                      height={11}
                      alt="checked icon"
                    />

                    <span>Completed</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            {propertiesContainer(
              "Input Amount",
              `${swapResponse!.inputAmount ?? ""} ${
                swapResponse?.route?.from?.blockchain ?? ""
              }`
            )}
          </div>

          <div>
            {propertiesContainer(
              "Output Amount",
              `${swapResponse.route?.outputAmount ?? ""} ${
                swapResponse.route?.to?.blockchain ?? ""
              }`
            )}
          </div>

          <div>{propertiesContainer("Source Address", "1 KINE")}</div>

          <div>
            {propertiesContainer(
              "Source Token",
              `${swapResponse.route?.from?.symbol ?? ""}`
            )}
          </div>

          <div>
            {propertiesContainer(
              "Destination Address",
              `${swapResponse.tx?.from ?? ""}`
            )}
          </div>

          <div>
            {propertiesContainer(
              "Destination Token",
              `${swapResponse.route?.to?.symbol ?? ""}`
            )}
          </div>

          <div>
            {propertiesContainer(
              "Duration",
              `${swapResponse.route?.estimatedTimeInSeconds ?? "0"} sec`
            )}
          </div>
        </div>

        <div className="absolute lg:max-h-[32.875rem] lg:max-w-[23.875rem] bg-gradient-to-b from-transparent to-[#050F0F] z-10" />
      </div>
    )
  );
};

export default SwapDetailsCard;
