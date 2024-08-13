"use client";
import BridgeExchangeTemplate from "./bridge-exchage-template";
import React, { ReactNode, useEffect, useState } from "react";
import { getBridges } from "@/app/api/rango-api";
import { Bridge, BridgeEnum, Exchange } from "@/app/types/interface";
import { useAppDispatch } from "@/redux_slice/provider";
import { updateTotalBridges } from "@/redux_slice/slice/settingsSlice";

const BridgesPopup = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const [bridgesData, setBridgesData] = useState<Bridge[]>([]);
  useEffect(() => {
    getBridges().then((data) => {
      setBridgesData(data);
      dispatch(updateTotalBridges({ value: data?.length }));
    });
  }, [dispatch]);

  return (
    <BridgeExchangeTemplate
      title="Bridges"
      data={bridgesData}
      type={BridgeEnum.BRIDGE}
    >
      {children}
    </BridgeExchangeTemplate>
  );
};

export default BridgesPopup;
