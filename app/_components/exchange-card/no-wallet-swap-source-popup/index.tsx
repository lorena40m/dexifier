import PopupTemplate from "../../common/popup-template";
import TokenSection from "./currency-section";
import Image from "next/image";
import React, { Suspense } from "react";
import { Blockchain } from "@/app/types/interface";
import { useAppSelector } from "@/redux_slice/provider";
import CustomLoader from "../../common/loader";
import ImageWrapper from "../../common/image-wrapper";
import { CurrencyResponse } from "@/app/types/noWalletInterface";

const SwapSourcePopup: React.FC<{
  currencies: CurrencyResponse;
  isFromCurrency: boolean;
}> = ({ currencies, isFromCurrency }) => {

  const selectedCurrency = useAppSelector((state) =>
    isFromCurrency
      ? state?.currency?.fromCurrency
      : state?.currency?.toCurrency
  );

  const triggerButton = (
    <button
      className="md:w-[150px] w-[80px] bg-transparent focus:ring-0 border-none focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-0 focus-visible:ring-offset-0 flex items-center justify-center gap-[.5625rem] text-sm disabled:cursor-not-allowed disabled:opacity-50"
      disabled={false}
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
            {selectedCurrency.network?.network}
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
        {(
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
