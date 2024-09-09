import PopupTemplate from "../../common/popup-template";
import TokenSection from "./currency-section";
import Image from "next/image";
import React, { Suspense } from "react";
import { Blockchain } from "@/app/types/interface";
import { useAppSelector } from "@/redux_slice/provider";
import CustomLoader from "../../common/loader";
import ImageWrapper from "../../common/imageWrapper";

const SwapSourcePopup: React.FC<{
  currencies: CurrencyResponse;
  isFromCurrency: boolean;
}> = ({ currencies, isFromCurrency }) => {
  const { isInProcess, isSwapMade } = useAppSelector((state) => state.swap);

  const selectedCurrency = useAppSelector((state) =>
    isFromCurrency
      ? state?.currency?.fromCurrency
      : state?.currency?.toCurrency
  );

  const selectedBlockchain = useAppSelector((state) =>
    isFromCurrency
      ? state?.blockchains?.fromBlockchain
      : state?.blockchains?.toBlockchain
  );

  const selectedToken = useAppSelector((state) =>
    isFromCurrency ? state?.tokens?.fromToken : state?.tokens?.toToken
  );

  const triggerButton = (
    <button
      className="w-[150px] bg-transparent focus:ring-0 border-none focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-0 focus-visible:ring-offset-0 flex items-center justify-center gap-[.5625rem] text-sm disabled:cursor-not-allowed disabled:opacity-50"
      disabled={isInProcess || isSwapMade}
    >
      {selectedCurrency.icon && (
        <div className="relative">
          <ImageWrapper>
            <Image
              className="relative"
              src={selectedCurrency.icon}
              width={30}
              height={30}
              alt={`${selectedCurrency?.code}'s icon`}
            />
          </ImageWrapper>
        </div>
      )}

      {selectedCurrency.code !== "" ? (
        <div className="flex flex-col">
          <span>{selectedCurrency.code}</span>

          <span className="text-xs opacity-80">
            {selectedCurrency.name}
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
        {selectedBlockchain !== null && (
          <Suspense fallback={<CustomLoader />}>
            <TokenSection
              currencies={currencies}
              isFromCurrency={isFromCurrency}
            />
          </Suspense>
        )}
      </main>
    </PopupTemplate>
  );
};

export default SwapSourcePopup;
