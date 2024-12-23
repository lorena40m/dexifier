"use client";
import BridgeExchangeTemplate from "./bridge-exchage-template";
import React, { ReactNode, useEffect, useState } from "react";
import { Bridge, BridgeEnum, Exchange } from "@/app/types/interface";
import { useWidget } from "@rango-dev/widget-embedded";
import { SwapperMeta } from "rango-types/mainApi";

const BridgesPopup = ({ children }: { children: ReactNode }) => {
  const { meta } = useWidget();
  const { swappers } = meta;
  const bridges = swappers.filter((swapper: SwapperMeta) => swapper.types.includes('BRIDGE'))
  
  return (
    <BridgeExchangeTemplate
      title="Bridges"
      data={bridges}
      type={BridgeEnum.BRIDGE}
    >
      {children}
    </BridgeExchangeTemplate>
  );
};

export default BridgesPopup;
