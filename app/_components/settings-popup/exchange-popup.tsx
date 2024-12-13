"use client";
import BridgeExchangeTemplate from "./bridge-exchage-template";
import React, { ReactNode, useEffect, useState } from "react";
import { BridgeEnum } from "@/app/types/interface";
import { getExchanges } from "@/app/api/rango";
import { useAppDispatch } from "@/redux_slice/provider";
import { updateTotalExchanges } from "@/redux_slice/slice/settingsSlice";
import { SwapperMetaExtended } from "rango-sdk/lib/types";

const ExchangePopup = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const [exchangesData, setExchangesData] = useState<SwapperMetaExtended[]>([]);
  useEffect(() => {
    getExchanges().then((data) => {
      console.log("SwapperMetaExtended", data);

      setExchangesData(data);
      dispatch(updateTotalExchanges({ value: data?.length }));
    });
  }, [dispatch]);
  return (
    <BridgeExchangeTemplate
      title="Exchanges"
      exhangeData={exchangesData}
      type={BridgeEnum.EXCHANGE}
    >
      {children}
    </BridgeExchangeTemplate>
  );
};

export default ExchangePopup;
