"use client";
import BridgeExchangeTemplate from "./bridge-exchage-template";
import React, { ReactNode } from "react";
import { BridgeEnum } from "@/app/types/interface";
import { useWidget } from "@rango-dev/widget-embedded";
import { SwapperMeta } from "rango-types/mainApi";

const ExchangePopup = ({ children }: { children: ReactNode }) => {
  const { meta } = useWidget();
  const { swappers } = meta;
  const exchanges = swappers.filter((swapper: SwapperMeta) => swapper.types.includes('DEX'))

  return (
    <BridgeExchangeTemplate
      title="Exchanges"
      exhangeData={exchanges}
      type={BridgeEnum.EXCHANGE}
    >
      {children}
    </BridgeExchangeTemplate>
  );
};

export default ExchangePopup;
