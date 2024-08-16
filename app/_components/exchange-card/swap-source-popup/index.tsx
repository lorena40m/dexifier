import PopupTemplate from "../../common/popup-template";
import BlockchainSection from "./blockchain-section";
import TokenSection from "./token-section";
import Image from "next/image";
import React, { Suspense } from "react";
import { Blockchain } from "@/app/types/interface";
import { useAppSelector } from "@/redux_slice/provider";
import CustomLoader from "../../common/loader";

const SwapSourcePopup: React.FC<{
  blockchains: Blockchain[];
  isFromToken: boolean;
}> = ({ blockchains, isFromToken }) => {
  const { isInProcess, isSwapMade } = useAppSelector((state) => state.swap);

  const selectedBlockchain = useAppSelector((state) =>
    isFromToken
      ? state?.blockchains?.fromBlockchain
      : state?.blockchains?.toBlockchain
  );

  const selectedToken = useAppSelector((state) =>
    isFromToken ? state?.tokens?.fromToken : state?.tokens?.toToken
  );

  const triggerButton = (
    <button
      className="w-[150px] bg-transparent focus:ring-0 border-none focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-0 focus-visible:ring-offset-0 flex items-center justify-center gap-[.5625rem] text-sm disabled:cursor-not-allowed disabled:opacity-50"
      disabled={isInProcess || isSwapMade}
    >
      {selectedToken?.image && (
        <div className="relative">
          <Image
            className="relative"
            src={selectedToken?.image}
            width={30}
            height={30}
            alt={`${selectedToken?.symbol}'s icon`}
          />
          <Image
            className="absolute bottom-[-6px] left-[18px]"
            src={selectedBlockchain?.logo}
            width={18}
            height={18}
            alt={`${selectedBlockchain?.name}'s icon`}
          />
        </div>
      )}

      {selectedToken?.symbol !== "" ? (
        <div className="flex flex-col">
          <span>{selectedToken?.symbol}</span>

          <span className="text-xs opacity-80">
            {selectedBlockchain?.displayName}
          </span>
        </div>
      ) : (
        "Select Token"
      )}
    </button>
  );

  return (
    <PopupTemplate title="Swap source" triggerButton={triggerButton}>
      <main>
        <BlockchainSection
          blockchains={blockchains}
          selectedBlockchain={selectedBlockchain}
          isFromBlockchain={isFromToken}
        />

        {selectedBlockchain !== null && (
          <Suspense fallback={<CustomLoader />}>
            <TokenSection
              selectedBlockchain={selectedBlockchain}
              isFromToken={isFromToken}
            />
          </Suspense>
        )}
      </main>
    </PopupTemplate>
  );
};

export default SwapSourcePopup;
